import React, { useEffect } from 'react';
import { InputField, FAQBox } from '../components';
import styles from './Wizard.module.css';

const faqs = [
  { q: "What's the difference between Principal and Interest?", a: "Your EMI has two parts. The Interest portion goes under Section 24(b) (up to ₹2L for self-occupied). The Principal portion goes under Section 80C (up to ₹1.5L limit, shared with PF/LIC)." },
  { q: "What if I rent out my property?", a: "If it's 'Let Out', you must declare the rental income. However, there is NO ₹2 Lakh cap on the interest deduction for Let Out properties—you can claim the entire interest amount!" },
  { q: "What is Section 80EEA?", a: "It's an extra ₹1.5 Lakh interest deduction for first-time homebuyers if the property stamp value is under ₹45 Lakhs. Our engine will check this automatically for you." }
];

export default function Step05_HomeLoan({ inputs, setInputs, onValidationChange }) {
  useEffect(() => {
    let isValid = true;
    if (inputs.hasHomeLoan === null || inputs.hasHomeLoan === undefined) {
      isValid = false;
    }
    // If they have a home loan, ensure they've selected property type
    if (inputs.hasHomeLoan && !inputs.propertyType) {
      isValid = false;
    }
    // First time buyer logic
    if (inputs.hasHomeLoan && (inputs.isFirstTimeBuyer === undefined || inputs.isFirstTimeBuyer === null)) {
      isValid = false;
    }
    onValidationChange(isValid);
  }, [inputs.hasHomeLoan, inputs.propertyType, inputs.isFirstTimeBuyer, onValidationChange]);

  const setLoanStatus = (hasLoan) => {
    setInputs(prev => {
      const next = { ...prev, hasHomeLoan: hasLoan };
      if (!hasLoan) {
        next.homeLoanInterestAnnual = '';
        next.homeLoanPrincipalAnnual = '';
        next.propertyType = '';
        next.rentalIncomeAnnual = '';
        next.isFirstTimeBuyer = null;
        next.stampDutyValue = '';
      }
      return next;
    });
  };

  const handlePropertyType = (type) => {
    setInputs(prev => ({ ...prev, propertyType: type }));
  };

  const setFirstTimeBuyer = (isFirstTime) => {
    setInputs(prev => ({ ...prev, isFirstTimeBuyer: isFirstTime }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = value === '' ? '' : Number(value);
    setInputs(prev => ({ ...prev, [name]: val }));
  };

  return (
    <div className={styles.questionAreaInner}>
      <h2 className={styles.stepTitle}>Are you paying off a Home Loan?</h2>
      <p className={styles.stepSubLabel}>Home loans offer massive tax breaks under Section 24(b), 80C, and 80EEA.</p>

      <div style={{ marginTop: '2rem' }}>
        <div className={styles.radioGroup}>
          <div 
            className={`${styles.radioOption} ${inputs.hasHomeLoan === true ? styles.selected : ''}`}
            onClick={() => setLoanStatus(true)}
          >
            <input type="radio" checked={inputs.hasHomeLoan === true} readOnly />
            Yes, I have an active home loan
          </div>
          <div 
            className={`${styles.radioOption} ${inputs.hasHomeLoan === false ? styles.selected : ''}`}
            onClick={() => setLoanStatus(false)}
          >
            <input type="radio" checked={inputs.hasHomeLoan === false} readOnly />
            No home loan
          </div>
        </div>
      </div>

      {inputs.hasHomeLoan && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--color-surface-2)', borderRadius: '8px', border: '1px solid var(--color-surface-3)' }}>
          
          <div className={styles.label}>What type of property is this?</div>
          <div className={styles.radioGroup} style={{ marginBottom: '1.5rem' }}>
            <div 
              className={`${styles.radioOption} ${inputs.propertyType === 'selfOccupied' ? styles.selected : ''}`}
              onClick={() => handlePropertyType('selfOccupied')}
            >
              <input type="radio" checked={inputs.propertyType === 'selfOccupied'} readOnly />
              Self-Occupied
            </div>
            <div 
              className={`${styles.radioOption} ${inputs.propertyType === 'letOut' ? styles.selected : ''}`}
              onClick={() => handlePropertyType('letOut')}
            >
              <input type="radio" checked={inputs.propertyType === 'letOut'} readOnly />
              Let-Out (Rented)
            </div>
          </div>

          {inputs.propertyType === 'letOut' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <InputField
                label="Annual Rental Income Received"
                name="rentalIncomeAnnual"
                type="number"
                prefix="₹"
                value={inputs.rentalIncomeAnnual ?? ''}
                onChange={handleChange}
                placeholder="e.g., 300000"
              />
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>We'll automatically apply the standard 30% deduction on this income.</div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem', marginBottom: '1.5rem' }}>
            <InputField
              label="Annual Interest Paid (Section 24b)"
              name="homeLoanInterestAnnual"
              type="number"
              prefix="₹"
              value={inputs.homeLoanInterestAnnual ?? ''}
              onChange={handleChange}
              placeholder="e.g., 250000"
            />
            <InputField
              label="Annual Principal Paid (Section 80C)"
              name="homeLoanPrincipalAnnual"
              type="number"
              prefix="₹"
              value={inputs.homeLoanPrincipalAnnual ?? ''}
              onChange={handleChange}
              placeholder="e.g., 100000"
            />
          </div>

          <div className={styles.label}>Are you a first-time homebuyer?</div>
          <div className={styles.subLabel}>This checks if you qualify for the extra ₹1.5L deduction under 80EEA.</div>
          <div className={styles.radioGroup} style={{ marginBottom: '1.5rem' }}>
            <div 
              className={`${styles.radioOption} ${inputs.isFirstTimeBuyer === true ? styles.selected : ''}`}
              onClick={() => setFirstTimeBuyer(true)}
            >
              <input type="radio" checked={inputs.isFirstTimeBuyer === true} readOnly />
              Yes, it's my first house
            </div>
            <div 
              className={`${styles.radioOption} ${inputs.isFirstTimeBuyer === false ? styles.selected : ''}`}
              onClick={() => setFirstTimeBuyer(false)}
            >
              <input type="radio" checked={inputs.isFirstTimeBuyer === false} readOnly />
              No
            </div>
          </div>

          {inputs.isFirstTimeBuyer && (
            <InputField
              label="Stamp Duty Value of the House"
              name="stampDutyValue"
              type="number"
              prefix="₹"
              value={inputs.stampDutyValue ?? ''}
              onChange={handleChange}
              placeholder="e.g., 4200000"
            />
          )}

        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <FAQBox items={faqs} />
      </div>
    </div>
  );
}
