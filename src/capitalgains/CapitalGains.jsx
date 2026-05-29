import React, { useState } from 'react';
import styles from './CapitalGains.module.css';

export default function CapitalGains() {
  const [stcgStr, setStcgStr] = useState('50,000');
  const [ltcgStr, setLtcgStr] = useState('2,00,000');

  const stcg = parseInt(stcgStr.replace(/,/g, '') || '0', 10);
  const ltcg = parseInt(ltcgStr.replace(/,/g, '') || '0', 10);

  // STCG Calculation (20% flat rate)
  const stcgTax = stcg * 0.20;

  // LTCG Calculation (12.5% on amount over 1.25L)
  const ltcgExempt = Math.min(ltcg, 125000);
  const ltcgTaxable = Math.max(0, ltcg - 125000);
  const ltcgTax = ltcgTaxable * 0.125;

  const totalTax = stcgTax + ltcgTax;

  const handleStcgChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setStcgStr('');
      return;
    }
    setStcgStr(new Intl.NumberFormat('en-IN').format(parseInt(rawValue, 10)));
  };

  const handleLtcgChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setLtcgStr('');
      return;
    }
    setLtcgStr(new Intl.NumberFormat('en-IN').format(parseInt(rawValue, 10)));
  };

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="container">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Equity Capital Gains Tracker</h1>
          <p className={styles.subtitle}>
            Stocks and Mutual Funds are taxed differently from your salary. 
            Calculate your Short Term (STCG) and Long Term (LTCG) tax liability instantly.
          </p>
        </div>

        <div className={styles.grid}>
          {/* STCG Card */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>📈 Short Term (STCG)</div>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              Profits from equity sold within 1 year of buying. Taxed at a flat 20%.
            </p>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>TOTAL STCG PROFIT</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '12px', fontSize: '18px', color: 'var(--color-text-secondary)' }}>₹</span>
                <input 
                  type="text" 
                  className={styles.inputField} 
                  style={{ paddingLeft: '40px' }}
                  value={stcgStr} 
                  onChange={handleStcgChange} 
                />
              </div>
            </div>

            <div className={styles.resultBox}>
              <div className={styles.resultRow}>
                <span>Taxable Amount</span>
                <span>{formatCurrency(stcg)}</span>
              </div>
              <div className={styles.resultRow}>
                <span>Tax Rate</span>
                <span>20%</span>
              </div>
              <div className={`${styles.resultRow} ${styles.total} ${stcgTax > 0 ? styles.taxable : ''}`}>
                <span>STCG Tax</span>
                <span>{formatCurrency(stcgTax)}</span>
              </div>
            </div>
          </div>

          {/* LTCG Card */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>💎 Long Term (LTCG)</div>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              Profits from equity held for over 1 year. First ₹1.25 Lakh is tax-free!
            </p>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>TOTAL LTCG PROFIT</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '12px', fontSize: '18px', color: 'var(--color-text-secondary)' }}>₹</span>
                <input 
                  type="text" 
                  className={styles.inputField} 
                  style={{ paddingLeft: '40px' }}
                  value={ltcgStr} 
                  onChange={handleLtcgChange} 
                />
              </div>
            </div>

            <div className={styles.resultBox}>
              <div className={styles.resultRow}>
                <span>Total Profit</span>
                <span>{formatCurrency(ltcg)}</span>
              </div>
              <div className={`${styles.resultRow} ${styles.taxFree}`}>
                <span>Tax-Free Exemption</span>
                <span>- {formatCurrency(ltcgExempt)}</span>
              </div>
              <div className={styles.resultRow}>
                <span>Taxable Amount</span>
                <span>{formatCurrency(ltcgTaxable)}</span>
              </div>
              <div className={styles.resultRow}>
                <span>Tax Rate</span>
                <span>12.5%</span>
              </div>
              <div className={`${styles.resultRow} ${styles.total} ${ltcgTax > 0 ? styles.taxable : ''}`}>
                <span>LTCG Tax</span>
                <span>{formatCurrency(ltcgTax)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.totalTaxBanner}>
          <div style={{ color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>TOTAL CAPITAL GAINS TAX (PAYABLE VIA ADVANCE TAX OR ITR)</div>
          <div className={styles.totalTaxAmount}>{formatCurrency(totalTax)}</div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', margin: 0 }}>
            Note: This is separate from your salary tax and will not reflect in your Form 16.
          </p>
        </div>
      </div>
    </div>
  );
}
