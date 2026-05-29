import React, { useEffect } from 'react';
import { FAQBox } from '../components';
import styles from './Wizard.module.css';

const faqs = [
  { q: "What is a Perquisite?", a: "Perquisites (or 'Perks') are benefits you receive from your employer. Some of these are fully tax-exempt, while others are partially taxable. Our engine handles the math for you!" },
  { q: "Why do meal coupons matter?", a: "Meal coupons (like Sodexo or Zeta) are completely tax-free up to ₹50 per meal, which usually translates to an exemption of around ₹26,400 per year in the Old Regime." }
];

export default function Step12_Perks({ inputs, setInputs, onValidationChange }) {
  useEffect(() => {
    onValidationChange(true);
  }, [onValidationChange]);

  const setMealCouponStatus = (hasCoupons) => {
    setInputs(prev => ({ ...prev, hasMealCoupons: hasCoupons }));
  };

  const setEmployerGiftStatus = (hasGift) => {
    setInputs(prev => ({ ...prev, hasEmployerGift: hasGift }));
  };

  return (
    <div className={styles.questionAreaInner}>
      <h2 className={styles.stepTitle}>Corporate Perks & Allowances</h2>
      <p className={styles.stepSubLabel}>Do you receive any of these specific benefits from your employer?</p>

      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--color-surface-2)', borderRadius: '8px', border: '1px solid var(--color-surface-3)' }}>
        
        <div className={styles.label}>Do you receive Meal Coupons (like Sodexo/Zeta)?</div>
        <div className={styles.subLabel}>This unlocks up to ₹26,400 in tax-free income.</div>
        <div className={styles.radioGroup} style={{ marginBottom: '2rem' }}>
          <div 
            className={`${styles.radioOption} ${inputs.hasMealCoupons === true ? styles.selected : ''}`}
            onClick={() => setMealCouponStatus(true)}
          >
            <input type="radio" checked={inputs.hasMealCoupons === true} readOnly />
            Yes
          </div>
          <div 
            className={`${styles.radioOption} ${inputs.hasMealCoupons === false ? styles.selected : ''}`}
            onClick={() => setMealCouponStatus(false)}
          >
            <input type="radio" checked={inputs.hasMealCoupons === false} readOnly />
            No
          </div>
        </div>

        <div className={styles.label}>Did you receive Employer Gifts this year?</div>
        <div className={styles.subLabel}>Gifts up to ₹5,000 per year are tax-free.</div>
        <div className={styles.radioGroup}>
          <div 
            className={`${styles.radioOption} ${inputs.hasEmployerGift === true ? styles.selected : ''}`}
            onClick={() => setEmployerGiftStatus(true)}
          >
            <input type="radio" checked={inputs.hasEmployerGift === true} readOnly />
            Yes
          </div>
          <div 
            className={`${styles.radioOption} ${inputs.hasEmployerGift === false ? styles.selected : ''}`}
            onClick={() => setEmployerGiftStatus(false)}
          >
            <input type="radio" checked={inputs.hasEmployerGift === false} readOnly />
            No
          </div>
        </div>

      </div>

      <div style={{ marginTop: '2rem' }}>
        <FAQBox items={faqs} />
      </div>
    </div>
  );
}
