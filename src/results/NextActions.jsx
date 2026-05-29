import React from 'react';
import styles from './Results.module.css';

export default function NextActions({ actions }) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className={styles.secretsSection}>
      <h2 className={styles.sectionTitle}>Next Actions</h2>
      <div className={styles.actionList}>
        {actions.map((action, index) => (
          <div key={index} className={styles.actionCard}>
            <div className={styles.actionIcon}>✅</div>
            <div>
              <div className={styles.actionTitle}>{action.title}</div>
              <div className={styles.actionBody}>{action.body}</div>
              <div className={styles.actionDeadline}>Deadline: {action.deadline}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
