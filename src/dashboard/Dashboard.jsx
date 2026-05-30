import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { DisclaimerFooter, Logo } from '../components';

export default function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Logo />
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.welcomeTitle}>
              Welcome Buddy 👋
            </h1>
            <p className={styles.welcomeSubtitle}>Simple tax planning, CTC optimization, and step-by-step pre-filing guides.</p>
          </div>
        </div>

      <h2 style={{ fontSize: '24px', marginBottom: '24px', color: 'var(--color-navy-900)' }}>Smart Toolkit</h2>
      <div className={styles.toolsGrid}>
        
        <Link to="/calculate" className={styles.toolCard}>
          <div className={styles.toolIcon}>🧮</div>
          <div className={styles.toolTitle}>Tax Calculator</div>
          <div className={styles.toolDesc}>Compare Old vs. New regime in 60 seconds with instant optimization feedback.</div>
          <div className={styles.toolArrow}>Launch Tool →</div>
        </Link>

        <Link to="/upload" className={styles.toolCard}>
          <div className={styles.toolIcon}>📄</div>
          <div className={styles.toolTitle}>Form 16 Magic Fill</div>
          <div className={styles.toolDesc}>Drop your Form 16 PDF to auto-fill your profile instantly.</div>
          <div className={styles.toolArrow}>Launch Tool →</div>
        </Link>

        <Link to="/library" className={styles.toolCard}>
          <div className={styles.toolIcon}>📖</div>
          <div className={styles.toolTitle}>Tax Library</div>
          <div className={styles.toolDesc}>Complex Indian tax laws explained in plain, jargon-free English.</div>
          <div className={styles.toolArrow}>Launch Tool →</div>
        </Link>

        <Link to="/capital-gains" className={styles.toolCard}>
          <div className={styles.toolIcon}>📈</div>
          <div className={styles.toolTitle}>Capital Gains Tracker</div>
          <div className={styles.toolDesc}>Track and calculate exact tax liabilities on stocks, mutual funds, and crypto.</div>
          <div className={styles.toolArrow}>Launch Tool →</div>
        </Link>

        <Link to="/ctc-optimizer" className={styles.toolCard}>
          <div className={styles.toolIcon}>🛠️</div>
          <div className={styles.toolTitle}>CTC Optimizer</div>
          <div className={styles.toolDesc}>Restructure your CTC components to legally maximize your tax-free salary buckets.</div>
          <div className={styles.toolArrow}>Launch Tool →</div>
        </Link>

        <Link to="/itr" className={styles.toolCard}>
          <div className={styles.toolIcon}>🎓</div>
          <div className={styles.toolTitle}>ITR Library</div>
          <div className={styles.toolDesc}>Step-by-step pre-filing checklists, refund playbooks, and portal filing guides.</div>
          <div className={styles.toolArrow}>Launch Tool →</div>
        </Link>

      </div>
    </div>
    <DisclaimerFooter />
  </div>
  );
}
