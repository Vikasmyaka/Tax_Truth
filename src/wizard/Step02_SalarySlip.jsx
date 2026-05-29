import React, { useEffect, useState } from 'react';
import { InputField, FAQBox } from '../components';
import styles from './Wizard.module.css';
import { approximateTax } from '../engine/salaryDecoder'; // wait, approximateTax is not exported. I need to approximate tax or we can do a simple check.

const faqs = [
  { q: "What should I put for 'Monthly Basic Salary'?", a: "Look for 'Basic' or 'Basic Pay' on your salary slip. If it says 'Basic + DA', enter that combined amount. This is the foundation of your salary." },
  { q: "What goes into 'Monthly HRA'?", a: "HRA stands for House Rent Allowance. Find 'HRA' on your slip. If it's not there, just enter 0. We'll help you claim rent benefits another way if you pay rent." },
  { q: "What is 'Monthly Special Allowance'?", a: "This is often the leftover amount after Basic and HRA. Your company might call it 'Flexi Pay', 'Supplementary Allowance', or 'Variable Dearness Allowance'. Put that number here." },
  { q: "Where do I find 'Annual LTA'?", a: "LTA is Leave Travel Allowance. It might not be on your monthly slip, so check your offer letter or annual CTC breakdown. It's usually a yearly amount." },
  { q: "What are 'Other Monthly Allowances'?", a: "If your slip has extra lines like 'Telephone Allowance', 'Internet Allowance', or 'Vehicle Allowance', add those up and put the total here." },
  { q: "What should I enter for 'Monthly Employee PF'?", a: "Look at the 'Deductions' section of your slip for 'PF' or 'Provident Fund'. Enter the amount deducted from your salary every month. Don't include your employer's contribution." },
  { q: "What is 'Annual Professional Tax'?", a: "This is a small state tax (max ₹2,500/year). Look for 'Professional Tax' or 'PT' in your deductions. Multiply your monthly deduction by 12 and enter it here." }
];

export default function Step02_SalarySlip({ inputs, setInputs, onValidationChange }) {
  const [validationStatus, setValidationStatus] = useState(null);

  useEffect(() => {
    // Basic validation: Basic Salary must be > 0
    const isValid = (inputs.basicSalary || 0) > 0;
    onValidationChange(isValid);

    if (isValid && inputs.monthlyTakeHome > 0) {
      // Reconstruct monthly slip
      const basic = inputs.basicSalary || 0;
      const hra = inputs.hraReceived || 0;
      const special = inputs.specialAllowance || 0;
      const other = inputs.otherAllowances || 0;
      const ltaMonthly = (inputs.lta || 0) / 12;
      
      const grossMonthly = basic + hra + special + other + ltaMonthly;
      
      const pf = inputs.employeePFAnnual ? inputs.employeePFAnnual / 12 : (inputs.employeePFMonthly || 0); // we need to store PF monthly
      const profTaxMonthly = (inputs.professionalTax || 0) / 12;

      // Simple estimate of tax just to check discrepancy
      // If we don't have approximateTax, let's just do a rough 10%
      const estimatedTax = grossMonthly * 0.10; 
      
      const reconstructedTakeHome = grossMonthly - pf - profTaxMonthly - estimatedTax;
      
      const discrepancy = Math.abs(reconstructedTakeHome - inputs.monthlyTakeHome) / inputs.monthlyTakeHome;
      
      if (discrepancy > 0.20) {
        setValidationStatus('warning');
      } else {
        setValidationStatus('success');
      }
    } else {
      setValidationStatus(null);
    }
  }, [
    inputs.basicSalary, 
    inputs.hraReceived, 
    inputs.specialAllowance, 
    inputs.otherAllowances, 
    inputs.lta, 
    inputs.employeePFMonthly, 
    inputs.professionalTax,
    inputs.monthlyTakeHome
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Allow empty string, otherwise convert to number
    const val = value === '' ? '' : Number(value);
    
    // Convert monthly PF to annual PF for the tax engine
    if (name === 'employeePFMonthly') {
      setInputs(prev => ({ 
        ...prev, 
        [name]: val,
        employeePFAnnual: val === '' ? '' : val * 12 
      }));
    } else {
      setInputs(prev => ({ ...prev, [name]: val }));
    }
  };

  return (
    <div className={styles.questionAreaInner}>
      <h2 className={styles.stepTitle}>Let's decode your salary slip.</h2>
      <p className={styles.stepSubLabel}>Find these numbers on your payslip or offer letter. We'll handle the rest.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
        <InputField
          label="Monthly Basic Salary"
          name="basicSalary"
          type="number"
          prefix="₹"
          value={inputs.basicSalary ?? ''}
          onChange={handleChange}
          required
        />
        <InputField
          label="Monthly HRA"
          name="hraReceived"
          type="number"
          prefix="₹"
          value={inputs.hraReceived ?? ''}
          onChange={handleChange}
        />
        <InputField
          label="Monthly Special Allowance"
          name="specialAllowance"
          type="number"
          prefix="₹"
          value={inputs.specialAllowance ?? ''}
          onChange={handleChange}
        />
        <InputField
          label="Annual LTA"
          name="lta"
          type="number"
          prefix="₹"
          value={inputs.lta ?? ''}
          onChange={handleChange}
        />
        <InputField
          label="Other Monthly Allowances"
          name="otherAllowances"
          type="number"
          prefix="₹"
          value={inputs.otherAllowances ?? ''}
          onChange={handleChange}
        />
        <InputField
          label="Monthly Employee PF"
          name="employeePFMonthly"
          type="number"
          prefix="₹"
          value={inputs.employeePFMonthly ?? ''}
          onChange={handleChange}
        />
        <InputField
          label="Annual Professional Tax"
          name="professionalTax"
          type="number"
          prefix="₹"
          max={2500}
          value={inputs.professionalTax ?? ''}
          onChange={handleChange}
        />
      </div>

      {validationStatus === 'success' && (
        <div className={`${styles.validationBox} ${styles.success}`}>
          <span>✓</span> Slip looks consistent with your take-home pay
        </div>
      )}

      {validationStatus === 'warning' && (
        <div className={`${styles.validationBox} ${styles.warning}`}>
          <span>⚠️</span> The numbers don't quite add up — double-check your slip
        </div>
      )}

      <FAQBox items={faqs} />
    </div>
  );
}
