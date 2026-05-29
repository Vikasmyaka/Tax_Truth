import React, { useState, useEffect } from 'react';
import { InputField, FAQBox } from '../components';
import styles from './Wizard.module.css';

const faqs = [
  { q: "What if my salary changes every month?", a: "Use your most recent month's salary. If you received a hike recently, use the new amount. You can model both scenarios later." },
  { q: "Should I include variable pay like bonus?", a: "Enter your fixed monthly take-home only. Bonus and variable pay are handled separately later. One step at a time." },
  { q: "I work part of the year. What do I enter?", a: "Enter your current monthly take-home. We'll ask about your start month next." },
];

export default function Step01_TakeHome({ inputs, setInputs, onValidationChange }) {
  const [takeHomeStr, setTakeHomeStr] = useState(inputs.monthlyTakeHome ? String(inputs.monthlyTakeHome) : '');
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  // Reverse calculate gross if takeHome is provided and we don't have slip details yet
  useEffect(() => {
    const val = Number(takeHomeStr.replace(/,/g, ''));
    let isValid = false;

    if (!val) {
      setError('');
      setWarning('');
    } else if (val < 10000) {
      setError('That seems very low — double-check');
      setWarning('');
    } else if (val > 50000000) {
      setError('Amount out of scope');
      setWarning('');
    } else {
      setError('');
      isValid = true;
      if (val > 1000000) {
        setWarning('Amount above ₹10L/month? Our tool works, but some high-income scenarios (surcharge) may not apply. Verify with a CA.');
      } else {
        setWarning('');
      }
    }

    if (isValid) {
      setInputs(prev => ({ ...prev, monthlyTakeHome: val }));
    } else {
      setInputs(prev => ({ ...prev, monthlyTakeHome: 0 }));
    }
    
    // Step is valid if we have a valid take home amount
    const isFullyValid = isValid;
    onValidationChange(isFullyValid);
  }, [takeHomeStr]);

  const handleChange = (e) => {
    // allow only numbers
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setTakeHomeStr('');
      return;
    }
    // format with commas (Indian number system is complex, but standard en-IN works)
    const num = parseInt(rawValue, 10);
    setTakeHomeStr(new Intl.NumberFormat('en-IN').format(num));
  };



  return (
    <div className={styles.questionAreaInner}>
      <h2 className={styles.stepTitle}>Let's start with what you actually earn.</h2>
      <p className={styles.stepSubLabel}>This is your salary after PF, professional tax, and income tax is already cut. Check your last month's bank credit.</p>

      <InputField
        label="What amount lands in your bank account every month?"
        prefix="₹"
        type="text"
        value={takeHomeStr}
        onChange={handleChange}
        placeholder="e.g., 65,000"
        error={error}
        warning={warning}
      />



      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--color-surface-2)', borderRadius: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
        <strong>Educational note:</strong> Why take-home and not CTC? CTC includes employer contributions, gratuity, and benefits that never hit your bank account. Tax is calculated on what you actually receive, not on CTC. We start where you start.
      </div>

      <FAQBox items={faqs} />
    </div>
  );
}
