import React from 'react';
import { Tooltip } from '../components';
import styles from './Results.module.css';

export default function ComparisonTable({ results }) {
  const formatAmt = (val) => val > 0 ? `₹${Math.round(val).toLocaleString('en-IN')}` : '₹0';
  const formatDeduct = (val) => val > 0 ? `(₹${Math.round(val).toLocaleString('en-IN')})` : '—';

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div></div>
        <div style={{ textAlign: 'right' }}>OLD REGIME</div>
        <div style={{ textAlign: 'right' }}>NEW REGIME</div>
      </div>

      <div className={styles.tableRow}>
        <div className={styles.rowLabel}>Gross Annual Income</div>
        <div className={styles.amountCol}>{formatAmt(results.old.grossIncome)}</div>
        <div className={styles.amountCol}>{formatAmt(results.new.grossIncome)}</div>
      </div>

      <div className={styles.tableSectionHeader}>Deductions</div>
      
      <div className={`${styles.tableRow} ${styles.deductionRow}`}>
        <div className={styles.rowLabel}>
          Standard Deduction
          <Tooltip text="A flat deduction available to all salaried employees, automatically applied.">
            <span className={styles.infoIcon}>[?]</span>
          </Tooltip>
        </div>
        <div className={styles.amountCol}>{formatDeduct(results.old.standardDeduction)}</div>
        <div className={styles.amountCol}>{formatDeduct(results.new.standardDeduction)}</div>
      </div>

      <div className={`${styles.tableRow} ${styles.deductionRow}`}>
        <div className={styles.rowLabel}>HRA Exemption</div>
        <div className={styles.amountCol}>{formatDeduct(results.old.hraExemption)}</div>
        <div className={styles.amountCol}>—</div>
      </div>

      <div className={`${styles.tableRow} ${styles.deductionRow}`}>
        <div className={styles.rowLabel}>Section 80C</div>
        <div className={styles.amountCol}>{formatDeduct(results.old.section80C)}</div>
        <div className={styles.amountCol}>—</div>
      </div>

      <div className={`${styles.tableRow} ${styles.deductionRow}`}>
        <div className={styles.rowLabel}>Section 80CCD(1B) Self NPS</div>
        <div className={styles.amountCol}>{formatDeduct(results.old.section80CCD1B)}</div>
        <div className={styles.amountCol}>—</div>
      </div>

      <div className={`${styles.tableRow} ${styles.deductionRow}`}>
        <div className={styles.rowLabel}>Section 80CCD(2) Employer NPS</div>
        <div className={styles.amountCol}>{formatDeduct(results.old.section80CCD2)}</div>
        <div className={styles.amountCol}>{formatDeduct(results.new.section80CCD2)}</div>
      </div>

      <div className={`${styles.tableRow} ${styles.deductionRow}`}>
        <div className={styles.rowLabel}>Section 80D Health Insurance</div>
        <div className={styles.amountCol}>{formatDeduct(results.old.section80D)}</div>
        <div className={styles.amountCol}>—</div>
      </div>

      <div className={`${styles.tableRow} ${styles.deductionRow}`}>
        <div className={styles.rowLabel}>Section 24(b) Home Loan</div>
        <div className={styles.amountCol}>{formatDeduct(results.old.section24b)}</div>
        <div className={styles.amountCol}>—</div>
      </div>
      
      <div className={`${styles.tableRow} ${styles.deductionRow}`}>
        <div className={styles.rowLabel}>Other Deductions (80E, 80TTA, etc.)</div>
        <div className={styles.amountCol}>{formatDeduct((results.old.section80E || 0) + (results.old.section80TTA || 0) + (results.old.section80GG || 0))}</div>
        <div className={styles.amountCol}>—</div>
      </div>

      <div className={`${styles.tableRow} ${styles.totalRow}`}>
        <div className={styles.rowLabel}>TOTAL DEDUCTIONS</div>
        <div className={styles.amountCol} style={{color: 'var(--color-success)'}}>{formatDeduct(results.old.totalDeductions)}</div>
        <div className={styles.amountCol} style={{color: 'var(--color-success)'}}>{formatDeduct(results.new.totalDeductions)}</div>
      </div>

      <div className={styles.tableRow}>
        <div className={styles.rowLabel} style={{fontWeight: 'bold'}}>TAXABLE INCOME</div>
        <div className={styles.amountCol} style={{fontWeight: 'bold'}}>{formatAmt(results.old.taxableIncome)}</div>
        <div className={styles.amountCol} style={{fontWeight: 'bold'}}>{formatAmt(results.new.taxableIncome)}</div>
      </div>

      <div className={styles.tableSectionHeader}>Tax Calculation</div>

      <div className={styles.tableRow}>
        <div className={styles.rowLabel}>Tax on Slabs</div>
        <div className={styles.amountCol}>{formatAmt(results.old.taxBeforeCess)}</div>
        <div className={styles.amountCol}>{formatAmt(results.new.taxBeforeCess)}</div>
      </div>

      <div className={`${styles.tableRow} ${styles.deductionRow}`}>
        <div className={styles.rowLabel}>
          Section 87A Rebate
          <Tooltip text="A tax rebate that effectively makes income up to ₹12 Lakhs (New Regime) or ₹5 Lakhs (Old Regime) tax-free.">
            <span className={styles.infoIcon}>[?]</span>
          </Tooltip>
        </div>
        <div className={styles.amountCol}>{formatDeduct(results.old.rebate87A)}</div>
        <div className={styles.amountCol}>{formatDeduct(results.new.rebate87A)}</div>
      </div>

      <div className={`${styles.tableRow} ${styles.deductionRow}`}>
        <div className={styles.rowLabel}>
          Marginal Relief
          <Tooltip text="Relief given when your tax exceeds the income earned above a certain threshold (e.g., just above ₹12 Lakhs).">
            <span className={styles.infoIcon}>[?]</span>
          </Tooltip>
        </div>
        <div className={styles.amountCol}>—</div>
        <div className={styles.amountCol}>{formatDeduct(results.new.marginalRelief)}</div>
      </div>

      <div className={styles.tableRow}>
        <div className={styles.rowLabel}>Tax After Rebate & Relief</div>
        <div className={styles.amountCol}>{formatAmt(results.old.taxAfterRebate)}</div>
        <div className={styles.amountCol}>{formatAmt(results.new.taxAfterRebate)}</div>
      </div>

      <div className={styles.tableRow}>
        <div className={styles.rowLabel}>
          Health & Education Cess (4%)
          <Tooltip text="A 4% additional tax applied on your base tax amount to fund health and education initiatives.">
            <span className={styles.infoIcon}>[?]</span>
          </Tooltip>
        </div>
        <div className={styles.amountCol}>{formatAmt(results.old.cess)}</div>
        <div className={styles.amountCol}>{formatAmt(results.new.cess)}</div>
      </div>

      <div className={`${styles.tableRow} ${styles.finalTaxRow}`}>
        <div className={styles.rowLabel}>TOTAL TAX PAYABLE</div>
        <div className={styles.amountCol}>{formatAmt(results.old.totalTax)}</div>
        <div className={styles.amountCol}>{formatAmt(results.new.totalTax)}</div>
      </div>

    </div>
  );
}
