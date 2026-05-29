import React, { useEffect } from 'react';
import { InputField, FAQBox } from '../components';
import styles from './Wizard.module.css';

const faqs = [
  { q: "Is Savings Account Interest taxable?", a: "Yes, but Section 80TTA allows you to deduct up to ₹10,000 of it from your taxable income. For Senior Citizens, Section 80TTB allows up to ₹50,000 (and includes FD interest too!)." },
  { q: "What should I include in 'Other Income'?", a: "Freelance income, dividends, capital gains (if you know them), and any other side income that hits your bank account." }
];

export default function Step11_OtherIncome({ inputs, setInputs, onValidationChange }) {
  useEffect(() => {
    onValidationChange(true); // Optional fields
  }, [onValidationChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = value === '' ? '' : Number(value);
    setInputs(prev => ({ ...prev, [name]: val }));
  };

  return (
    <div className={styles.questionAreaInner}>
      <h2 className={styles.stepTitle}>Do you have other sources of income?</h2>
      <p className={styles.stepSubLabel}>Things like interest from bank accounts or freelance work are fully taxable, but have some specific deductions.</p>

      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--color-surface-2)', borderRadius: '8px', border: '1px solid var(--color-surface-3)' }}>
        
        <InputField
          label="Savings Account Interest (Annual)"
          name="savingsInterestAnnual"
          type="number"
          prefix="₹"
          value={inputs.savingsInterestAnnual ?? ''}
          onChange={handleChange}
          placeholder="e.g., 5000"
        />
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', marginTop: '-0.5rem' }}>
          Qualifies for ₹10k deduction under 80TTA.
        </div>

        <InputField
          label="Fixed Deposit (FD) Interest (Annual)"
          name="fdInterestAnnual"
          type="number"
          prefix="₹"
          value={inputs.fdInterestAnnual ?? ''}
          onChange={handleChange}
          placeholder="e.g., 25000"
        />

        <InputField
          label="Any Other Income (Freelance, Dividends, etc.) (Annual)"
          name="otherIncome"
          type="number"
          prefix="₹"
          value={inputs.otherIncome ?? ''}
          onChange={handleChange}
          placeholder="e.g., 100000"
        />

      </div>

      <div style={{ marginTop: '2rem' }}>
        <FAQBox items={faqs} />
      </div>
    </div>
  );
}
