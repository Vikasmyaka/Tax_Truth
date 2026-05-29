import React, { useEffect } from 'react';
import { FAQBox } from '../components';
import styles from './Wizard.module.css';

const faqs = [
  { q: "Why does my age matter?", a: "The Old Tax Regime offers higher basic exemption limits for senior citizens (60-79 years: ₹3L) and super senior citizens (80+ years: ₹5L). Under the New Regime, the limit is ₹3L for everyone regardless of age." },
  { q: "Which cities are considered Metro for HRA?", a: "For Income Tax purposes, ONLY four cities are classified as Metro: Mumbai, Delhi, Kolkata, and Chennai. If you live in Bangalore, Hyderabad, Pune, or anywhere else, you must select Non-Metro." },
];

export default function Step03_AgeCity({ inputs, setInputs, onValidationChange }) {
  // Step 3 is valid as soon as both category and city are selected.
  // We provide default values in WizardController, so it should be valid by default.
  useEffect(() => {
    const isValid = !!inputs.ageCategory && !!inputs.cityType;
    onValidationChange(isValid);
  }, [inputs.ageCategory, inputs.cityType, onValidationChange]);

  const handleAgeChange = (category) => {
    setInputs(prev => ({ ...prev, ageCategory: category }));
  };

  const handleCityChange = (city) => {
    setInputs(prev => ({ ...prev, cityType: city }));
  };

  return (
    <div className={styles.questionAreaInner}>
      <h2 className={styles.stepTitle}>A bit about you.</h2>
      <p className={styles.stepSubLabel}>These two simple details unlock specific tax slabs and HRA limits.</p>

      <div style={{ marginTop: '2rem' }}>
        <div className={styles.label}>Which age bracket do you fall into?</div>
        <div className={styles.radioGroup}>
          <div 
            className={`${styles.radioOption} ${inputs.ageCategory === 'below60' ? styles.selected : ''}`}
            onClick={() => handleAgeChange('below60')}
          >
            <input type="radio" checked={inputs.ageCategory === 'below60'} readOnly />
            Below 60 years
          </div>
          <div 
            className={`${styles.radioOption} ${inputs.ageCategory === 'senior' ? styles.selected : ''}`}
            onClick={() => handleAgeChange('senior')}
          >
            <input type="radio" checked={inputs.ageCategory === 'senior'} readOnly />
            60 to 79 years (Senior)
          </div>
          <div 
            className={`${styles.radioOption} ${inputs.ageCategory === 'superSenior' ? styles.selected : ''}`}
            onClick={() => handleAgeChange('superSenior')}
          >
            <input type="radio" checked={inputs.ageCategory === 'superSenior'} readOnly />
            80+ years (Super Senior)
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div className={styles.label}>Where do you live?</div>
        <div className={styles.subLabel}>This determines if your HRA limit is 50% or 40% of Basic.</div>
        <div className={styles.radioGroup}>
          <div 
            className={`${styles.radioOption} ${inputs.cityType === 'metro' ? styles.selected : ''}`}
            onClick={() => handleCityChange('metro')}
          >
            <input type="radio" checked={inputs.cityType === 'metro'} readOnly />
            Metro (Mumbai, Delhi, Kolkata, Chennai ONLY)
          </div>
          <div 
            className={`${styles.radioOption} ${inputs.cityType === 'nonMetro' ? styles.selected : ''}`}
            onClick={() => handleCityChange('nonMetro')}
          >
            <input type="radio" checked={inputs.cityType === 'nonMetro'} readOnly />
            Non-Metro (Bangalore, Hyderabad, Pune, etc.)
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <FAQBox items={faqs} />
      </div>
    </div>
  );
}
