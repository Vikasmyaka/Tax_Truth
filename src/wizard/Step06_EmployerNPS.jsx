import React, { useEffect } from 'react';
import { InputField, FAQBox } from '../components';
import styles from './Wizard.module.css';

const faqs = [
  { q: "Is Employer NPS different from my own NPS?", a: "Yes! Section 80CCD(2) allows your employer to contribute to your NPS, and it is 100% tax-free up to 10% of your Basic Salary (14% for Govt employees). This is OVER AND ABOVE the ₹1.5L 80C limit and the ₹50k 80CCD(1B) limit." },
  { q: "What if I don't know if I get Employer NPS?", a: "Check your salary slip or offer letter. It usually shows up under 'Deductions' or 'Retirals' as 'Employer Contribution to NPS'." }
];

export default function Step06_EmployerNPS({ inputs, setInputs, onValidationChange }) {
  useEffect(() => {
    let isValid = true;
    if (inputs.hasEmployerNPS === null || inputs.hasEmployerNPS === undefined) {
      isValid = false;
    }
    if (inputs.hasEmployerNPS && inputs.isGovtEmployee === null) {
      isValid = false;
    }
    onValidationChange(isValid);
  }, [inputs.hasEmployerNPS, inputs.isGovtEmployee, onValidationChange]);

  const setNpsStatus = (hasNps) => {
    setInputs(prev => {
      const next = { ...prev, hasEmployerNPS: hasNps };
      if (!hasNps) {
        next.employerNPSAnnual = '';
        next.isGovtEmployee = null;
      }
      return next;
    });
  };

  const setGovtStatus = (isGovt) => {
    setInputs(prev => ({ ...prev, isGovtEmployee: isGovt }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = value === '' ? '' : Number(value);
    setInputs(prev => ({ ...prev, [name]: val }));
  };

  return (
    <div className={styles.questionAreaInner}>
      <h2 className={styles.stepTitle}>Does your employer contribute to NPS?</h2>
      <p className={styles.stepSubLabel}>This is a massive hidden tax benefit under Section 80CCD(2) that works in BOTH regimes.</p>

      <div style={{ marginTop: '2rem' }}>
        <div className={styles.radioGroup}>
          <div 
            className={`${styles.radioOption} ${inputs.hasEmployerNPS === true ? styles.selected : ''}`}
            onClick={() => setNpsStatus(true)}
          >
            <input type="radio" checked={inputs.hasEmployerNPS === true} readOnly />
            Yes, they contribute to NPS
          </div>
          <div 
            className={`${styles.radioOption} ${inputs.hasEmployerNPS === false ? styles.selected : ''}`}
            onClick={() => setNpsStatus(false)}
          >
            <input type="radio" checked={inputs.hasEmployerNPS === false} readOnly />
            No / Not Sure
          </div>
        </div>
      </div>

      {inputs.hasEmployerNPS && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--color-surface-2)', borderRadius: '8px', border: '1px solid var(--color-surface-3)' }}>
          <div className={styles.label}>Are you a Government Employee?</div>
          <div className={styles.subLabel}>Govt employees get a higher 14% cap compared to the standard 10%.</div>
          <div className={styles.radioGroup} style={{ marginBottom: '1.5rem' }}>
            <div 
              className={`${styles.radioOption} ${inputs.isGovtEmployee === true ? styles.selected : ''}`}
              onClick={() => setGovtStatus(true)}
            >
              <input type="radio" checked={inputs.isGovtEmployee === true} readOnly />
              Yes, Govt Employee
            </div>
            <div 
              className={`${styles.radioOption} ${inputs.isGovtEmployee === false ? styles.selected : ''}`}
              onClick={() => setGovtStatus(false)}
            >
              <input type="radio" checked={inputs.isGovtEmployee === false} readOnly />
              No, Private Sector
            </div>
          </div>

          <InputField
            label="Annual Employer NPS Contribution"
            name="employerNPSAnnual"
            type="number"
            prefix="₹"
            value={inputs.employerNPSAnnual ?? ''}
            onChange={handleChange}
            placeholder="e.g., 50000"
          />
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <FAQBox items={faqs} />
      </div>
    </div>
  );
}
