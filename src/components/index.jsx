import React from 'react';
import styles from './Components.module.css';

export { default as NumberTicker } from './NumberTicker';
export { default as Tooltip } from './Tooltip';

export function InputField({
  label,
  subLabel,
  prefix,
  type = 'text',
  value,
  onChange,
  name,
  placeholder,
  error,
  warning,
  min,
  max,
  required
}) {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label} htmlFor={name}>{label}</label>}
      {subLabel && <div className={styles.subLabel}>{subLabel}</div>}
      
      <div className={styles.inputWrapper}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          id={name}
          name={name}
          type={type}
          value={value === undefined || value === null || Number.isNaN(value) ? '' : value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.input} ${prefix ? styles.hasPrefix : ''}`}
          min={min}
          max={max}
          required={required}
        />
      </div>
      
      {error && <div className={styles.errorText}>{error}</div>}
      {!error && warning && <div className={styles.warningText}>{warning}</div>}
    </div>
  );
}

export function FAQBox({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className={styles.faqBox}>
      <div className={styles.faqTitle}>
        <span>❓</span> Common Questions
      </div>
      <div className={styles.faqList}>
        {items.map((item, i) => (
          <details key={i} className={styles.faqItem}>
            <summary className={styles.faqQuestion}>{item.q}</summary>
            <div className={styles.faqAnswer}>{item.a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}

export function ProgressBar({ currentStep, totalSteps }) {
  return (
    <div className={styles.progressContainer}>
      {Array.from({ length: totalSteps }).map((_, i) => {
        const stepNum = i + 1;
        let dotClass = styles.progressDot;
        if (stepNum === currentStep) dotClass += ` ${styles.active}`;
        else if (stepNum < currentStep) dotClass += ` ${styles.completed}`;

        return <div key={i} className={dotClass} />;
      })}
    </div>
  );
}

export function DisclaimerFooter() {
  return (
    <footer className={styles.disclaimerFooter}>
      <div className={styles.disclaimerFooterInner}>
        <div className={styles.disclaimerTitle}>
          ⚠️ Legal Disclaimer & terms of use
        </div>
        <p className={styles.disclaimerText}>
          Tax Buddy is an independent tax planning simulator for educational and estimation purposes only. We do not guarantee 100% mathematical or legal accuracy of calculations or pre-fills. This tool does not constitute professional tax, legal, or financial advice.
        </p>
        <p className={styles.disclaimerText}>
          <strong>User Responsibility & Liability:</strong> You are solely responsible for verifying all figures against official documents (such as Form 16, AIS, and Form 26AS) before filing. Tax Buddy, its developers, and its owners shall not be held liable for any tax, interest, penal fees, or legal disputes resulting from the use of, or reliance upon, the data and guidelines provided on this website.
        </p>
      </div>
    </footer>
  );
}
