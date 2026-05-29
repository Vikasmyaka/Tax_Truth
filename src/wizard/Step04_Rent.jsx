import React, { useEffect } from 'react';
import { InputField, FAQBox } from '../components';
import styles from './Wizard.module.css';

const faqs = [
  { q: "What if I live with my parents?", a: "You can still claim rent if you officially pay rent to your parents. They must declare this as rental income on their tax return, and you should use formal banking channels to pay them." },
  { q: "I get HRA but I don't pay rent. Can I claim it?", a: "No. If you live in your own house or live rent-free, your entire HRA is fully taxable." },
  { q: "I don't get HRA, but I pay rent. Can I get a deduction?", a: "Yes! If you don't receive HRA but pay rent, the app will automatically use Section 80GG to give you a deduction (capped at ₹60,000/year)." }
];

export default function Step04_Rent({ inputs, setInputs, onValidationChange }) {
  useEffect(() => {
    let isValid = true;
    if (inputs.paysRent && (!inputs.monthlyRent || inputs.monthlyRent <= 0)) {
      isValid = false;
    }
    if (inputs.paysRent === null || inputs.paysRent === undefined) {
      isValid = false; // Must select yes or no
    }
    onValidationChange(isValid);
  }, [inputs.paysRent, inputs.monthlyRent, onValidationChange]);

  const setRentStatus = (pays) => {
    setInputs(prev => {
      const next = { ...prev, paysRent: pays };
      if (!pays) {
        next.monthlyRent = ''; // Clear rent if they select No
      }
      return next;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = value === '' ? '' : Number(value);
    setInputs(prev => ({ ...prev, [name]: val }));
  };

  // Determine if we should show HRA or 80GG text
  const receivesHRA = (inputs.hraReceived || 0) > 0;

  return (
    <div className={styles.questionAreaInner}>
      <h2 className={styles.stepTitle}>Do you pay rent?</h2>
      <p className={styles.stepSubLabel}>Rent is one of the biggest tax-saving components available.</p>

      <div style={{ marginTop: '2rem' }}>
        <div className={styles.radioGroup}>
          <div 
            className={`${styles.radioOption} ${inputs.paysRent === true ? styles.selected : ''}`}
            onClick={() => setRentStatus(true)}
          >
            <input type="radio" checked={inputs.paysRent === true} readOnly />
            Yes, I pay rent
          </div>
          <div 
            className={`${styles.radioOption} ${inputs.paysRent === false ? styles.selected : ''}`}
            onClick={() => setRentStatus(false)}
          >
            <input type="radio" checked={inputs.paysRent === false} readOnly />
            No, I don't pay rent
          </div>
        </div>
      </div>

      {inputs.paysRent && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--color-surface-2)', borderRadius: '8px', border: '1px solid var(--color-surface-3)' }}>
          <InputField
            label="What is your monthly rent?"
            name="monthlyRent"
            type="number"
            prefix="₹"
            value={inputs.monthlyRent ?? ''}
            onChange={handleChange}
            placeholder="e.g., 25000"
          />
          
          <div style={{ marginTop: '1rem', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            {receivesHRA ? (
              <span>✨ We'll use the <strong>Triple Lock Rule (Section 10(13A))</strong> to calculate your HRA exemption automatically.</span>
            ) : (
              <span>✨ Since you don't receive HRA, we will automatically claim the <strong>Section 80GG</strong> deduction for you!</span>
            )}
          </div>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <FAQBox items={faqs} />
      </div>
    </div>
  );
}
