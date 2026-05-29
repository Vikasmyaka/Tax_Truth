import React, { useEffect } from 'react';
import { InputField, FAQBox } from '../components';
import styles from './Wizard.module.css';

const faqs = [
  { q: "What is the limit for Section 80D?", a: "You can claim up to ₹25,000 for yourself/spouse/children. You can claim an ADDITIONAL ₹25,000 for parents. If your parents are Senior Citizens (60+), that limit doubles to ₹50,000!" },
  { q: "Can I claim preventive health checkups?", a: "Yes, up to ₹5,000 can be claimed under 80D for preventive health checkups, but it is included within the overall ₹25k/₹50k limit." }
];

export default function Step09_HealthInsurance({ inputs, setInputs, onValidationChange }) {
  useEffect(() => {
    let isValid = true;
    if (inputs.healthInsuranceParentsAnnual > 0 && inputs.areParentsSenior === null) {
      isValid = false; // Must specify if parents are senior if claiming for them
    }
    onValidationChange(isValid);
  }, [inputs.healthInsuranceParentsAnnual, inputs.areParentsSenior, onValidationChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = value === '' ? '' : Number(value);
    setInputs(prev => ({ ...prev, [name]: val }));
  };

  const setParentsSeniorStatus = (isSenior) => {
    setInputs(prev => ({ ...prev, areParentsSenior: isSenior }));
  };

  return (
    <div className={styles.questionAreaInner}>
      <h2 className={styles.stepTitle}>Do you pay for Health Insurance?</h2>
      <p className={styles.stepSubLabel}>Section 80D allows massive deductions for medical premiums. (Old Regime Only)</p>

      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--color-surface-2)', borderRadius: '8px', border: '1px solid var(--color-surface-3)' }}>
        <InputField
          label="Premiums for Self, Spouse & Children (Annual)"
          name="healthInsuranceSelfAnnual"
          type="number"
          prefix="₹"
          value={inputs.healthInsuranceSelfAnnual ?? ''}
          onChange={handleChange}
          placeholder="e.g., 18000"
        />
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
          Maximum limit: ₹25,000
        </div>

        <InputField
          label="Premiums paid for Parents (Annual)"
          name="healthInsuranceParentsAnnual"
          type="number"
          prefix="₹"
          value={inputs.healthInsuranceParentsAnnual ?? ''}
          onChange={handleChange}
          placeholder="e.g., 30000"
        />
        
        {((inputs.healthInsuranceParentsAnnual || 0) > 0) && (
          <div style={{ marginTop: '1.5rem' }}>
            <div className={styles.label}>Are any of your parents Senior Citizens (60+ years)?</div>
            <div className={styles.subLabel}>This doubles their deduction limit from ₹25k to ₹50k.</div>
            <div className={styles.radioGroup}>
              <div 
                className={`${styles.radioOption} ${inputs.areParentsSenior === true ? styles.selected : ''}`}
                onClick={() => setParentsSeniorStatus(true)}
              >
                <input type="radio" checked={inputs.areParentsSenior === true} readOnly />
                Yes, 60+
              </div>
              <div 
                className={`${styles.radioOption} ${inputs.areParentsSenior === false ? styles.selected : ''}`}
                onClick={() => setParentsSeniorStatus(false)}
              >
                <input type="radio" checked={inputs.areParentsSenior === false} readOnly />
                No
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <FAQBox items={faqs} />
      </div>
    </div>
  );
}
