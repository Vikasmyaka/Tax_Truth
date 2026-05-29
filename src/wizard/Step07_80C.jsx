import React, { useEffect } from 'react';
import { InputField, FAQBox } from '../components';
import styles from './Wizard.module.css';

const faqs = [
  { q: "What is Section 80C?", a: "It is the most popular tax-saving bucket in the Old Regime. You can claim up to ₹1.5 Lakhs of deductions by investing in specific instruments like PPF, ELSS, or paying Life Insurance premiums." },
  { q: "Do I need to enter my PF and Home Loan Principal here?", a: "No! We've automatically pulled your Employee PF and Home Loan Principal from the previous steps and added them to your 80C bucket." },
  { q: "What happens if my total exceeds ₹1.5L?", a: "The tax engine will automatically cap your deduction at exactly ₹1,50,000 as per the law. Any amount above that does not save you extra tax." }
];

export default function Step07_80C({ inputs, setInputs, onValidationChange }) {
  useEffect(() => {
    onValidationChange(true); // All fields are optional
  }, [onValidationChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = value === '' ? '' : Number(value);
    setInputs(prev => ({ ...prev, [name]: val }));
  };

  // Calculate what's already in 80C
  const auto80C = (inputs.employeePFAnnual || 0) + (inputs.hasHomeLoan ? (inputs.homeLoanPrincipalAnnual || 0) : 0);

  return (
    <div className={styles.questionAreaInner}>
      <h2 className={styles.stepTitle}>Section 80C Investments</h2>
      <p className={styles.stepSubLabel}>This is the classic ₹1.5 Lakh deduction bucket. (Old Regime Only)</p>

      {auto80C > 0 && (
        <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: 'var(--color-surface-2)', borderRadius: '8px', borderLeft: '4px solid var(--color-brand-500)' }}>
          <div style={{ fontSize: '14px', color: 'var(--color-navy-900)' }}>
            <strong>Auto-detected:</strong> We already found <strong>₹{auto80C.toLocaleString('en-IN')}</strong> for your 80C bucket from your Employee PF and Home Loan. You only need to enter additional investments below.
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem', marginBottom: '1.5rem' }}>
        <InputField
          label="PPF (Public Provident Fund) (Annual)"
          name="ppfAnnual"
          type="number"
          prefix="₹"
          value={inputs.ppfAnnual ?? ''}
          onChange={handleChange}
        />
        <InputField
          label="ELSS Mutual Funds (Annual)"
          name="elssAnnual"
          type="number"
          prefix="₹"
          value={inputs.elssAnnual ?? ''}
          onChange={handleChange}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem', marginBottom: '1.5rem' }}>
        <InputField
          label="Life Insurance Premium (LIC) (Annual)"
          name="licPremiumAnnual"
          type="number"
          prefix="₹"
          value={inputs.licPremiumAnnual ?? ''}
          onChange={handleChange}
        />
        <InputField
          label="Children's Tuition Fees (Annual)"
          name="tuitionFeesAnnual"
          type="number"
          prefix="₹"
          value={inputs.tuitionFeesAnnual ?? ''}
          onChange={handleChange}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem', marginBottom: '1.5rem' }}>
        <InputField
          label="Tax Saving FD (5 Years) (Annual)"
          name="taxSavingFDAnnual"
          type="number"
          prefix="₹"
          value={inputs.taxSavingFDAnnual ?? ''}
          onChange={handleChange}
        />
        <InputField
          label="Sukanya Samriddhi Yojana (Annual)"
          name="sukanyaAnnual"
          type="number"
          prefix="₹"
          value={inputs.sukanyaAnnual ?? ''}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <FAQBox items={faqs} />
      </div>
    </div>
  );
}
