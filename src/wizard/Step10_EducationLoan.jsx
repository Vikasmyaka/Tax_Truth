import React, { useEffect } from 'react';
import { InputField, FAQBox } from '../components';
import styles from './Wizard.module.css';

const faqs = [
  { q: "Is there a limit to how much interest I can claim?", a: "No! Section 80E is one of the only sections in the Income Tax Act with NO UPPER LIMIT. You can claim 100% of the interest paid on an education loan." },
  { q: "Does the principal repayment qualify?", a: "No, Section 80E only covers the interest component of your EMI. The principal does not qualify for any deduction." },
  { q: "Who can the loan be for?", a: "The loan can be for your own education, your spouse's, or your children's. It must be taken from a bank or recognized financial institution." }
];

export default function Step10_EducationLoan({ inputs, setInputs, onValidationChange }) {
  useEffect(() => {
    let isValid = true;
    if (inputs.hasEducationLoan === null || inputs.hasEducationLoan === undefined) {
      isValid = false;
    }
    if (inputs.hasEducationLoan && (!inputs.educationLoanInterestAnnual || inputs.educationLoanInterestAnnual <= 0)) {
      isValid = false;
    }
    onValidationChange(isValid);
  }, [inputs.hasEducationLoan, inputs.educationLoanInterestAnnual, onValidationChange]);

  const setLoanStatus = (hasLoan) => {
    setInputs(prev => {
      const next = { ...prev, hasEducationLoan: hasLoan };
      if (!hasLoan) {
        next.educationLoanInterestAnnual = '';
      }
      return next;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = value === '' ? '' : Number(value);
    setInputs(prev => ({ ...prev, [name]: val }));
  };

  return (
    <div className={styles.questionAreaInner}>
      <h2 className={styles.stepTitle}>Are you paying an Education Loan?</h2>
      <p className={styles.stepSubLabel}>Section 80E offers an UNLIMITED deduction on the interest paid for higher education. (Old Regime Only)</p>

      <div style={{ marginTop: '2rem' }}>
        <div className={styles.radioGroup}>
          <div 
            className={`${styles.radioOption} ${inputs.hasEducationLoan === true ? styles.selected : ''}`}
            onClick={() => setLoanStatus(true)}
          >
            <input type="radio" checked={inputs.hasEducationLoan === true} readOnly />
            Yes, paying off an education loan
          </div>
          <div 
            className={`${styles.radioOption} ${inputs.hasEducationLoan === false ? styles.selected : ''}`}
            onClick={() => setLoanStatus(false)}
          >
            <input type="radio" checked={inputs.hasEducationLoan === false} readOnly />
            No
          </div>
        </div>
      </div>

      {inputs.hasEducationLoan && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--color-surface-2)', borderRadius: '8px', border: '1px solid var(--color-surface-3)' }}>
          <InputField
            label="Annual Interest Paid (Section 80E)"
            name="educationLoanInterestAnnual"
            type="number"
            prefix="₹"
            value={inputs.educationLoanInterestAnnual ?? ''}
            onChange={handleChange}
            placeholder="e.g., 120000"
          />
          <div style={{ marginTop: '1rem', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Remember to only enter the <strong>interest</strong> portion of your EMI.
          </div>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <FAQBox items={faqs} />
      </div>
    </div>
  );
}
