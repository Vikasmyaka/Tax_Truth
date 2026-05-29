import React, { useEffect } from 'react';
import { InputField, FAQBox } from '../components';
import styles from './Wizard.module.css';

const faqs = [
  { q: "Is this different from the 80C ₹1.5L limit?", a: "Yes! Section 80CCD(1B) provides an exclusive, additional ₹50,000 deduction just for voluntary NPS contributions. This is on top of your 80C limit." },
  { q: "Does this work in the New Tax Regime?", a: "No. Voluntary NPS contributions under 80CCD(1B) only provide tax benefits in the Old Tax Regime. (However, Employer NPS under 80CCD(2) works in both!)" }
];

export default function Step08_NPSSelf({ inputs, setInputs, onValidationChange }) {
  useEffect(() => {
    onValidationChange(true); // Optional
  }, [onValidationChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = value === '' ? '' : Number(value);
    setInputs(prev => ({ ...prev, [name]: val }));
  };

  return (
    <div className={styles.questionAreaInner}>
      <h2 className={styles.stepTitle}>Do you invest in NPS on your own?</h2>
      <p className={styles.stepSubLabel}>Section 80CCD(1B) gives you an extra ₹50,000 deduction on top of 80C.</p>

      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--color-surface-2)', borderRadius: '8px', border: '1px solid var(--color-surface-3)' }}>
        <InputField
          label="Annual Voluntary NPS Contribution"
          name="selfNPSAnnual"
          type="number"
          prefix="₹"
          value={inputs.selfNPSAnnual ?? ''}
          onChange={handleChange}
          placeholder="e.g., 50000"
        />
        <div style={{ marginTop: '1rem', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          Note: This is your personal contribution, not your employer's contribution.
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <FAQBox items={faqs} />
      </div>
    </div>
  );
}
