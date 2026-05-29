import React, { useEffect } from 'react';
import styles from './Wizard.module.css';

export default function Step04_SmartMenu({ inputs, setInputs, onValidationChange }) {
  useEffect(() => {
    // This step is always valid
    onValidationChange(true);
    
    // Mark smart menu as seen
    if (!inputs.smartMenuCompleted) {
      setInputs(prev => ({ ...prev, smartMenuCompleted: true }));
    }
  }, [inputs.smartMenuCompleted, setInputs, onValidationChange]);

  const handleToggle = (field) => {
    setInputs(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const options = [
    { id: 'smRent', label: 'I pay rent (HRA / 80GG)', icon: '🏠' },
    { id: 'smHomeLoan', label: 'I have a Home Loan', icon: '🏦' },
    { id: 'smEmployerNPS', label: 'My Employer contributes to NPS', icon: '🏢' },
    { id: 'sm80C', label: 'I invest in 80C (PPF, ELSS, LIC, Tuition)', icon: '💰' },
    { id: 'smSelfNPS', label: 'I invest in NPS myself (80CCD1B)', icon: '📈' },
    { id: 'smHealth', label: 'I pay Health Insurance premiums', icon: '🏥' },
    { id: 'smEducation', label: 'I am paying an Education Loan', icon: '🎓' },
    { id: 'smOtherIncome', label: 'I earn from FD, Savings, or Rental Income', icon: '💵' },
    { id: 'smPerks', label: 'I receive Meal Coupons or Employer Gifts', icon: '🎁' }
  ];

  return (
    <div className={styles.questionAreaInner}>
      <h2 className={styles.stepTitle}>Let's save you some time.</h2>
      <p className={styles.stepSubLabel}>
        Most people don't use every tax deduction. Uncheck what doesn't apply to you, and we'll skip those pages.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem' }}>
        {options.map(opt => (
          <label 
            key={opt.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              padding: '1rem', 
              backgroundColor: inputs[opt.id] ? 'var(--color-surface-2)' : 'var(--color-surface-1)', 
              border: `1px solid ${inputs[opt.id] ? 'var(--color-teal-500)' : 'var(--color-surface-3)'}`, 
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              opacity: inputs[opt.id] ? 1 : 0.6
            }}
          >
            <input 
              type="checkbox" 
              checked={inputs[opt.id] || false}
              onChange={() => handleToggle(opt.id)}
              style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--color-teal-500)' }}
            />
            <span style={{ fontSize: '1.2rem' }}>{opt.icon}</span>
            <span style={{ color: inputs[opt.id] ? 'var(--color-navy-900)' : 'var(--color-text-secondary)', fontWeight: inputs[opt.id] ? '600' : '400' }}>
              {opt.label}
            </span>
          </label>
        ))}
      </div>
      
      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '14px', color: 'var(--color-text-muted)' }}>
        If you uncheck everything, you'll go straight to your Results!
      </div>
    </div>
  );
}
