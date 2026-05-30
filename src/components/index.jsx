import React from 'react';
import { Link } from 'react-router-dom';
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

export function Logo({ className, to = '/' }) {
  const content = (
    <>
      <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#logo-grad)" />
        {/* Math symbol eyes: Plus (+) and Multiply (x) */}
        <line x1="6.5" y1="10.5" x2="10.5" y2="10.5" stroke="#0B0D11" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="8.5" y1="8.5" x2="8.5" y2="12.5" stroke="#0B0D11" strokeWidth="2.5" strokeLinecap="round" />
        
        <line x1="13.5" y1="8.5" x2="17.5" y2="12.5" stroke="#0B0D11" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="17.5" y1="8.5" x2="13.5" y2="12.5" stroke="#0B0D11" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M7.5 15C8.5 16.5 10 17.5 12 17.5C14 17.5 15.5 16.5 16.5 15" stroke="#0B0D11" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient id="logo-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00e5c5" />
            <stop offset="1" stopColor="#00b4d8" />
          </linearGradient>
        </defs>
      </svg>
      <span>Tax Buddy</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${styles.logoWrapper} ${className || ''}`}>
        {content}
      </Link>
    );
  }

  return (
    <div className={`${styles.logoWrapper} ${className || ''}`}>
      {content}
    </div>
  );
}
