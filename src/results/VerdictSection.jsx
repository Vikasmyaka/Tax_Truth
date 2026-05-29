import React from 'react';
import styles from './Results.module.css';

export default function VerdictSection({ results, onRecalculate }) {
  const { recommendedRegime } = results;
  const oldTax = results.old.totalTax;
  const newTax = results.new.totalTax;

  const taxDifference = Math.abs(oldTax - newTax);
  
  let verdictText = '';
  let subText = '';

  const regimeName = recommendedRegime === 'new' ? 'New Regime' : 'Old Regime';
  const winnerTax = recommendedRegime === 'new' ? newTax : oldTax;
  
  if (taxDifference > 50000) {
    verdictText = `You're leaving ₹${taxDifference.toLocaleString('en-IN')} on the table. Go with the ${regimeName}.`;
    subText = `You save a massive ₹${taxDifference.toLocaleString('en-IN')} this year.`;
  } else if (taxDifference >= 10000) {
    verdictText = `Go with the ${regimeName}.`;
    subText = `You save ₹${taxDifference.toLocaleString('en-IN')} this year.`;
  } else if (taxDifference > 1000) {
    verdictText = `The ${regimeName} is better by ₹${taxDifference.toLocaleString('en-IN')}.`;
    subText = "It's not massive, but every rupee adds up.";
  } else if (taxDifference > 0) {
    verdictText = `Both regimes are nearly equal.`;
    subText = `The ${regimeName} wins by just ₹${taxDifference.toLocaleString('en-IN')}. New Regime is simpler to file.`;
  } else {
    verdictText = `Both regimes give you the exact same tax.`;
    subText = "Choose New Regime — it's simpler to file and requires fewer proofs.";
  }

  // Handle zero tax scenario
  if (winnerTax === 0) {
    verdictText = "You owe ₹0 in tax this year! 🎉";
    subText = "Your income after deductions falls below the tax-free threshold.";
  }

  const newEffectiveRate = ((newTax / results.grossAnnualIncome) * 100).toFixed(1);
  const oldEffectiveRate = ((oldTax / results.grossAnnualIncome) * 100).toFixed(1);

  return (
    <div className={styles.verdictContainer}>
      <h1 className={styles.verdictTitle}>{verdictText}</h1>
      <h2 className={styles.verdictSub}>{subText}</h2>

      <div className={styles.verdictCards}>
        <div className={`${styles.regimeCard} ${recommendedRegime === 'new' ? styles.winnerCard : ''}`}>
          <div className={styles.regimeHeader}>New Regime Tax</div>
          <div className={styles.regimeTaxAmount} style={{ color: newTax > 0 ? 'var(--color-error)' : 'var(--color-success)' }}>₹{newTax.toLocaleString('en-IN')}</div>
          <div className={styles.regimeEffective}>Effective Rate: {isNaN(newEffectiveRate) ? 0 : newEffectiveRate}%</div>
        </div>

        <div className={`${styles.regimeCard} ${recommendedRegime === 'old' ? styles.winnerCard : ''}`}>
          <div className={styles.regimeHeader}>Old Regime Tax</div>
          <div className={styles.regimeTaxAmount} style={{ color: oldTax > 0 ? 'var(--color-error)' : 'var(--color-success)' }}>₹{oldTax.toLocaleString('en-IN')}</div>
          <div className={styles.regimeEffective}>Effective Rate: {isNaN(oldEffectiveRate) ? 0 : oldEffectiveRate}%</div>
        </div>
      </div>

      <div className={styles.tdsAdvice}>
        💡 Your employer should deduct approx <strong>₹{Math.round(winnerTax / 12).toLocaleString('en-IN')}/month</strong> as TDS.
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.btnPrimary} onClick={() => alert("Summary copied to clipboard!")}>📋 Copy Summary</button>
        <button className={styles.btnSecondary} onClick={onRecalculate}>🔄 Recalculate</button>
      </div>
    </div>
  );
}
