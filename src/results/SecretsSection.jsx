import React from 'react';
import styles from './Results.module.css';

export default function SecretsSection({ secrets }) {
  if (!secrets || secrets.length === 0) return null;

  return (
    <div className={styles.secretsSection}>
      <h2 className={styles.sectionTitle}>Your Tax Secrets</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
        Based on your inputs, we found some specific opportunities or warnings you should know about.
      </p>

      {secrets.map(secret => (
        <div key={secret.id} className={`${styles.secretCard} ${secret.priority === 'HIGH' ? styles.secretHigh : styles.secretMedium}`}>
          <div className={styles.secretTitle}>
            {secret.priority === 'HIGH' ? '🚨' : '💡'} {secret.title}
          </div>
          <div className={styles.secretBody}>
            {secret.body}
          </div>
        </div>
      ))}
    </div>
  );
}
