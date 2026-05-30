import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './TaxLibrary.module.css';

export default function TaxLibrary() {
  const [activeSection, setActiveSection] = useState('basics-fy-ay');

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const sectionIds = [
      'basics-fy-ay',
      'basics-gross-net',
      'basics-slabs',
      'heads-salary',
      'heads-property',
      'heads-capital',
      'heads-business',
      'heads-others',
      'deduct-80c',
      'deduct-80d',
      'deduct-80ccd',
      'deduct-80e',
      'deduct-80tta',
      'exempt-hra',
      'exempt-lta',
      'exempt-allowances',
      'adv-87a',
      'adv-marginal',
      'adv-clubbing',
      'adv-losses',
      'hack-parents-rent',
      'hack-parents-gift',
      'hack-employer-nps',
      'hack-rollover',
      'compliance-ais-tis',
      'compliance-tds',
      'compliance-advance-tax',
      'itr-forms-which',
      'health-80ddb',
      'health-80dd-80u',
      'loan-joint',
      'loan-54ec',
      'loan-cgas'
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.libraryContainer}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <Link to="/" className={styles.sidebarTitle}>← Tax Buddy</Link>
        
        <div className={styles.navSection}>
          <div className={styles.navHeading}>1. The Basics</div>
          <ul className={styles.navList}>
            <li>
              <button 
                onClick={() => scrollToId('basics-fy-ay')} 
                className={`${styles.navItemBtn} ${activeSection === 'basics-fy-ay' ? styles.navItemBtnActive : ''}`}
              >
                FY vs. AY Explained
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('basics-gross-net')} 
                className={`${styles.navItemBtn} ${activeSection === 'basics-gross-net' ? styles.navItemBtnActive : ''}`}
              >
                Gross vs. Net Income
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('basics-slabs')} 
                className={`${styles.navItemBtn} ${activeSection === 'basics-slabs' ? styles.navItemBtnActive : ''}`}
              >
                Regime Slabs & Cess
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navHeading}>2. Heads of Income</div>
          <ul className={styles.navList}>
            <li>
              <button 
                onClick={() => scrollToId('heads-salary')} 
                className={`${styles.navItemBtn} ${activeSection === 'heads-salary' ? styles.navItemBtnActive : ''}`}
              >
                Salary Income
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('heads-property')} 
                className={`${styles.navItemBtn} ${activeSection === 'heads-property' ? styles.navItemBtnActive : ''}`}
              >
                House Property
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('heads-capital')} 
                className={`${styles.navItemBtn} ${activeSection === 'heads-capital' ? styles.navItemBtnActive : ''}`}
              >
                Capital Gains
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('heads-business')} 
                className={`${styles.navItemBtn} ${activeSection === 'heads-business' ? styles.navItemBtnActive : ''}`}
              >
                Presumptive Business
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('heads-others')} 
                className={`${styles.navItemBtn} ${activeSection === 'heads-others' ? styles.navItemBtnActive : ''}`}
              >
                Other Sources
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navHeading}>3. Deductions (Sec 80)</div>
          <ul className={styles.navList}>
            <li>
              <button 
                onClick={() => scrollToId('deduct-80c')} 
                className={`${styles.navItemBtn} ${activeSection === 'deduct-80c' ? styles.navItemBtnActive : ''}`}
              >
                Section 80C Limits
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('deduct-80d')} 
                className={`${styles.navItemBtn} ${activeSection === 'deduct-80d' ? styles.navItemBtnActive : ''}`}
              >
                Section 80D Health
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('deduct-80ccd')} 
                className={`${styles.navItemBtn} ${activeSection === 'deduct-80ccd' ? styles.navItemBtnActive : ''}`}
              >
                Sec 80CCD NPS
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('deduct-80e')} 
                className={`${styles.navItemBtn} ${activeSection === 'deduct-80e' ? styles.navItemBtnActive : ''}`}
              >
                Sec 80E Edu Loan
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('deduct-80tta')} 
                className={`${styles.navItemBtn} ${activeSection === 'deduct-80tta' ? styles.navItemBtnActive : ''}`}
              >
                Savings Sec 80TTA/B
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navHeading}>4. Exemptions</div>
          <ul className={styles.navList}>
            <li>
              <button 
                onClick={() => scrollToId('exempt-hra')} 
                className={`${styles.navItemBtn} ${activeSection === 'exempt-hra' ? styles.navItemBtnActive : ''}`}
              >
                HRA Triple Lock
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('exempt-lta')} 
                className={`${styles.navItemBtn} ${activeSection === 'exempt-lta' ? styles.navItemBtnActive : ''}`}
              >
                Leave Travel (LTA)
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('exempt-allowances')} 
                className={`${styles.navItemBtn} ${activeSection === 'exempt-allowances' ? styles.navItemBtnActive : ''}`}
              >
                Other Allowances
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navHeading}>5. Advanced Rules</div>
          <ul className={styles.navList}>
            <li>
              <button 
                onClick={() => scrollToId('adv-87a')} 
                className={`${styles.navItemBtn} ${activeSection === 'adv-87a' ? styles.navItemBtnActive : ''}`}
              >
                Sec 87A Rebate
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('adv-marginal')} 
                className={`${styles.navItemBtn} ${activeSection === 'adv-marginal' ? styles.navItemBtnActive : ''}`}
              >
                Marginal Relief Math
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('adv-clubbing')} 
                className={`${styles.navItemBtn} ${activeSection === 'adv-clubbing' ? styles.navItemBtnActive : ''}`}
              >
                Clubbing of Income
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('adv-losses')} 
                className={`${styles.navItemBtn} ${activeSection === 'adv-losses' ? styles.navItemBtnActive : ''}`}
              >
                Set-off & Carry Loss
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navHeading}>6. CA Optimization Hacks</div>
          <ul className={styles.navList}>
            <li>
              <button 
                onClick={() => scrollToId('hack-parents-rent')} 
                className={`${styles.navItemBtn} ${activeSection === 'hack-parents-rent' ? styles.navItemBtnActive : ''}`}
              >
                Rent-to-Parents Loop
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('hack-parents-gift')} 
                className={`${styles.navItemBtn} ${activeSection === 'hack-parents-gift' ? styles.navItemBtnActive : ''}`}
              >
                Gift-to-Parents Hack
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('hack-employer-nps')} 
                className={`${styles.navItemBtn} ${activeSection === 'hack-employer-nps' ? styles.navItemBtnActive : ''}`}
              >
                Employer NPS (80CCD(2))
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('hack-rollover')} 
                className={`${styles.navItemBtn} ${activeSection === 'hack-rollover' ? styles.navItemBtnActive : ''}`}
              >
                Capital Gain Roll (54)
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navHeading}>7. Compliance & Docs</div>
          <ul className={styles.navList}>
            <li>
              <button 
                onClick={() => scrollToId('compliance-ais-tis')} 
                className={`${styles.navItemBtn} ${activeSection === 'compliance-ais-tis' ? styles.navItemBtnActive : ''}`}
              >
                Form 26AS, AIS & TIS
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('compliance-tds')} 
                className={`${styles.navItemBtn} ${activeSection === 'compliance-tds' ? styles.navItemBtnActive : ''}`}
              >
                TDS (Tax Deducted)
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('compliance-advance-tax')} 
                className={`${styles.navItemBtn} ${activeSection === 'compliance-advance-tax' ? styles.navItemBtnActive : ''}`}
              >
                Advance Tax Penalties
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navHeading}>8. ITR Forms Matrix</div>
          <ul className={styles.navList}>
            <li>
              <button 
                onClick={() => scrollToId('itr-forms-which')} 
                className={`${styles.navItemBtn} ${activeSection === 'itr-forms-which' ? styles.navItemBtnActive : ''}`}
              >
                Which ITR Form to File?
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navHeading}>9. Special Deductions</div>
          <ul className={styles.navList}>
            <li>
              <button 
                onClick={() => scrollToId('health-80ddb')} 
                className={`${styles.navItemBtn} ${activeSection === 'health-80ddb' ? styles.navItemBtnActive : ''}`}
              >
                Critical Illness (80DDB)
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('health-80dd-80u')} 
                className={`${styles.navItemBtn} ${activeSection === 'health-80dd-80u' ? styles.navItemBtnActive : ''}`}
              >
                Disability (80DD / 80U)
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navHeading}>10. Advanced Rollovers</div>
          <ul className={styles.navList}>
            <li>
              <button 
                onClick={() => scrollToId('loan-joint')} 
                className={`${styles.navItemBtn} ${activeSection === 'loan-joint' ? styles.navItemBtnActive : ''}`}
              >
                Joint Home Loan Tricks
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('loan-54ec')} 
                className={`${styles.navItemBtn} ${activeSection === 'loan-54ec' ? styles.navItemBtnActive : ''}`}
              >
                54EC Tax-Free Bonds
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('loan-cgas')} 
                className={`${styles.navItemBtn} ${activeSection === 'loan-cgas' ? styles.navItemBtnActive : ''}`}
              >
                Capital Gain Park (CGAS)
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>The Comprehensive Indian Tax Guide</h1>
          <p className={styles.pageDescription}>
            A complete, hand-curated educational handbook covering Indian personal taxation. 
            Designed to bridge the gap between complex legal code and everyday understanding.
          </p>
        </div>

        {/* ======================================= */}
        {/* CHAPTER 1: THE BASICS                   */}
        {/* ======================================= */}
        <section id="basics-fy-ay" className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Chapter 1: The Core Basics</h2>
          
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Financial Year (FY) vs. Assessment Year (AY)</h3>
            <div className={styles.eli5Box}>
              <div className={styles.eli5Title}>ELI5 Summary</div>
              <strong>Financial Year (FY)</strong> is the year in which you work and earn the money. <strong>Assessment Year (AY)</strong> is the following year in which the government reviews (assesses) and taxes that income.
            </div>
            <div className={styles.cardText}>
              <p>In India, the tax year doesn't run from January to December. It starts on <strong>April 1st</strong> and ends on <strong>March 31st</strong> of the subsequent calendar year.</p>
              <ul>
                <li><strong>Example:</strong> If you earn money between April 1, 2025, and March 31, 2026, this period is called **FY 2025-26**.</li>
                <li>You will file your tax returns for this money between June and July of 2026, which makes it **AY 2026-27**.</li>
              </ul>
            </div>
          </div>

          <div id="basics-gross-net" className={styles.card}>
            <h3 className={styles.cardTitle}>Gross Total Income vs. Net Taxable Income</h3>
            <div className={styles.cardText}>
              <p>Understanding the distinction between these two numbers is crucial for calculating your actual tax liability:</p>
              <div className={styles.formulaBox}>
                Gross Total Income = Salary + House Property + Capital Gains + Business + Other Sources
              </div>
              <div className={styles.formulaBox}>
                Net Taxable Income = Gross Total Income - Exemptions - Deductions (like 80C, 80D)
              </div>
              <p>Your income tax is computed exclusively on the <strong>Net Taxable Income</strong>, not on the total CTC or base salary that you earn.</p>
            </div>
          </div>

          <div id="basics-slabs" className={styles.card}>
            <h3 className={styles.cardTitle}>Tax Regime Slabs & Surcharges (AY 2026-27)</h3>
            <div className={styles.cardText}>
              <p>India currently operates two parallel tax systems. You must choose between them every year:</p>
              
              <h4 style={{ margin: '12px 0 6px', color: 'var(--color-text-primary)' }}>New Tax Regime Slabs (Default)</h4>
              <div className={styles.taxTableWrapper}>
                <table className={styles.taxTable}>
                  <thead>
                    <tr>
                      <th>Income Slab (₹)</th>
                      <th>Tax Rate (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Up to 4,00,000</td>
                      <td>Nil (0%)</td>
                    </tr>
                    <tr>
                      <td>4,00,001 to 8,00,000</td>
                      <td>5%</td>
                    </tr>
                    <tr>
                      <td>8,00,001 to 12,00,000</td>
                      <td>10%</td>
                    </tr>
                    <tr>
                      <td>12,00,001 to 16,00,000</td>
                      <td>15%</td>
                    </tr>
                    <tr>
                      <td>16,00,001 to 24,00,000</td>
                      <td>20%</td>
                    </tr>
                    <tr>
                      <td>Above 24,00,000</td>
                      <td>30%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 style={{ margin: '16px 0 6px', color: 'var(--color-text-primary)' }}>Old Tax Regime Slabs</h4>
              <div className={styles.taxTableWrapper}>
                <table className={styles.taxTable}>
                  <thead>
                    <tr>
                      <th>Income Slab (₹)</th>
                      <th>Tax Rate (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Up to 2,50,000</td>
                      <td>Nil (0%)</td>
                    </tr>
                    <tr>
                      <td>2,50,001 to 5,00,000</td>
                      <td>5%</td>
                    </tr>
                    <tr>
                      <td>5,00,001 to 10,00,000</td>
                      <td>20%</td>
                    </tr>
                    <tr>
                      <td>Above 10,00,000</td>
                      <td>30%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p><strong>Cess:</strong> A mandatory <strong>4% Health & Education Cess</strong> is added to your total calculated tax liability under both regimes.</p>
              <p><strong>Surcharge:</strong> If your net taxable income exceeds ₹50 Lakhs, an additional surcharge ranging from 10% to 25% is levied on your calculated tax.</p>
            </div>
          </div>
        </section>

        {/* ======================================= */}
        {/* CHAPTER 2: HEADS OF INCOME               */}
        {/* ======================================= */}
        <section id="heads-salary" className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Chapter 2: The Five Heads of Income</h2>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Head 1: Income from Salary</h3>
            <div className={styles.cardText}>
              <p>For employees, salary income is the primary source of taxation. It includes Basic Salary, Dearness Allowance (DA), House Rent Allowance (HRA), perquisites, and special bonuses.</p>
              <p><strong>Standard Deduction:</strong> The government offers a flat deduction of <strong>₹75,000</strong> (FY 2025-26) to all salaried individuals. This is deducted automatically from your gross salary under both the Old and New Regimes—no receipts or proofs are required.</p>
            </div>
          </div>

          <div id="heads-property" className={styles.card}>
            <h3 className={styles.cardTitle}>Head 2: Income from House Property</h3>
            <div className={styles.cardText}>
              <p>If you own a home, it is taxed under this head. There are two scenarios:</p>
              <ul>
                <li><strong>Self-Occupied Property (SOP):</strong> You live in the house. The taxable value is ₹0. Under the Old Regime, you can claim up to <strong>₹2,00,000</strong> in interest paid on a home loan under Section 24(b). This creates a tax loss that offsets your salary income.</li>
                <li><strong>Let-Out Property (LOP):</strong> You rent out the house. The actual rent earned is taxable. You get a flat <strong>30% standard deduction</strong> on the rental income for repairs/maintenance, and you can deduct the full home loan interest paid against the rental income.</li>
              </ul>
            </div>
          </div>

          <div id="heads-capital" className={styles.card}>
            <h3 className={styles.cardTitle}>Head 3: Income from Capital Gains</h3>
            <div className={styles.cardText}>
              <p>Profits made from selling assets like stocks, mutual funds, gold, or real estate fall under Capital Gains. They are divided based on holding periods:</p>
              
              <h4 style={{ margin: '12px 0 6px', color: 'var(--color-text-primary)' }}>1. Equity & Mutual Funds</h4>
              <ul>
                <li><strong>Short-Term Capital Gains (STCG):</strong> Held for less than 12 months. Taxed at a flat <strong>20%</strong>.</li>
                <li><strong>Long-Term Capital Gains (LTCG):</strong> Held for over 12 months. Taxed at <strong>12.5%</strong>. Importantly, the first <strong>₹1,25,000</strong> of profit every financial year is completely tax-free.</li>
              </ul>

              <h4 style={{ margin: '16px 0 6px', color: 'var(--color-text-primary)' }}>2. Real Estate (Property)</h4>
              <ul>
                <li><strong>LTCG (Held &gt; 2 years):</strong> Taxed at <strong>12.5%</strong> (without indexation benefits) under the revised rules.</li>
              </ul>
            </div>
          </div>

          <div id="heads-business" className={styles.card}>
            <h3 className={styles.cardTitle}>Head 4: Profits & Gains of Business or Profession</h3>
            <div className={styles.cardText}>
              <p>For freelancers, doctors, engineers, consultants, and business owners. You are taxed on net profits (Revenue minus business expenses).</p>
              <p><strong>Presumptive Taxation:</strong> To simplify compliance, the government offers presumptive tax schemes where you don't need to maintain account books:</p>
              <ul>
                <li><strong>Section 44ADA (Professionals):</strong> If your gross receipts are under ₹75 Lakhs, you can declare exactly <strong>50%</strong> of your revenue as net profit. Tax is calculated on this 50% chunk, and the rest is assumed to be your business expense.</li>
                <li><strong>Section 44AD (Businesses):</strong> If revenue is under ₹3 Crores, you can declare 6% (digital transactions) or 8% (cash transactions) of your turnover as taxable profit.</li>
              </ul>
            </div>
          </div>

          <div id="heads-others" className={styles.card}>
            <h3 className={styles.cardTitle}>Head 5: Income from Other Sources</h3>
            <div className={styles.cardText}>
              <p>A catch-all head for any taxable income that doesn't fit into the other four categories:</p>
              <ul>
                <li><strong>Bank Savings & FD Interest:</strong> Fully taxable at your slab rate.</li>
                <li><strong>Dividends:</strong> Taxed at your regular income slabs.</li>
                <li><strong>Gifts:</strong> Gifts from non-relatives exceeding ₹50,000 in a year are taxed as income. (Gifts from immediate relatives are always tax-free).</li>
                <li><strong>Lotteries & Cryptocurrencies:</strong> Taxed at a flat, non-adjustable rate of <strong>30%</strong>.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ======================================= */}
        {/* CHAPTER 3: DEDUCTIONS (SEC 80)           */}
        {/* ======================================= */}
        <section id="deduct-80c" className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Chapter 3: Deductions (The 80 Series)</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
            Note: All Section 80 deductions (except Employer NPS 80CCD(2)) apply <strong>exclusively to the Old Tax Regime</strong>.
          </p>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Section 80C: The Core Exemption <span className={`${styles.badge} ${styles.oldBadge}`}>Old Regime Only</span></h3>
            <div className={styles.cardText}>
              <p>Allows a deduction of up to <strong>₹1,50,000</strong> from your taxable income. The most popular avenues include:</p>
              <ul>
                <li><strong>EPF (Employee Provident Fund):</strong> Your monthly 12% contribution counts here automatically.</li>
                <li><strong>ELSS (Equity Linked Savings Schemes):</strong> Tax-saving mutual funds with a short 3-year lock-in.</li>
                <li><strong>PPF (Public Provident Fund):</strong> Government-backed 15-year risk-free scheme. Returns are tax-exempt.</li>
                <li><strong>Home Loan Principal:</strong> The principal repayment part of your monthly home EMI.</li>
                <li><strong>Children's Tuition Fees:</strong> Paid to school or university for up to 2 children.</li>
              </ul>
            </div>
          </div>

          <div id="deduct-80d" className={styles.card}>
            <h3 className={styles.cardTitle}>Section 80D: Medical Insurance & Expenses <span className={`${styles.badge} ${styles.oldBadge}`}>Old Regime Only</span></h3>
            <div className={styles.cardText}>
              <p>Provides deductions for health insurance premiums paid for your family:</p>
              <ul>
                <li><strong>Self, Spouse & Children:</strong> Up to ₹25,000.</li>
                <li><strong>Parents (non-senior citizens):</strong> An additional ₹25,000.</li>
                <li><strong>Parents (senior citizens above 60):</strong> An additional ₹50,000.</li>
                <li><strong>Preventive Health Checkup:</strong> Up to ₹5,000 is allowed within the limits for annual health screenings.</li>
              </ul>
              <p><em>Pro Tip:</em> For senior citizen parents who do *not* have health insurance, you can claim up to ₹50,000 for their direct medical bills (medicines, hospital visits) under this section.</p>
            </div>
          </div>

          <div id="deduct-80ccd" className={styles.card}>
            <h3 className={styles.cardTitle}>Section 80CCD(1B): National Pension System <span className={`${styles.badge} ${styles.oldBadge}`}>Old Regime Only</span></h3>
            <div className={styles.cardText}>
              <p>If you deposit money into your NPS account yourself, you can claim an exclusive deduction of up to <strong>₹50,000</strong> under Section 80CCD(1B).</p>
              <p>This is a separate bucket that sits **above** the ₹1,50,000 limit of Section 80C. Combining 80C and 80CCD(1B) allows a total deduction of ₹2,00,000.</p>
            </div>
          </div>

          <div id="deduct-80e" className={styles.card}>
            <h3 className={styles.cardTitle}>Section 80E: Higher Education Loan Interest <span className={`${styles.badge} ${styles.oldBadge}`}>Old Regime Only</span></h3>
            <div className={styles.cardText}>
              <p>If you take an education loan for yourself, your spouse, or your children, you can deduct the **entire interest portion** paid on the loan EMI from your taxable income.</p>
              <ul>
                <li>There is <strong>no upper limit</strong> on the deduction amount.</li>
                <li>It is available for a maximum period of <strong>8 years</strong> or until the interest is fully paid off, whichever is earlier.</li>
              </ul>
            </div>
          </div>

          <div id="deduct-80tta" className={styles.card}>
            <h3 className={styles.cardTitle}>Section 80TTA & 80TTB: Savings Interest <span className={`${styles.badge} ${styles.oldBadge}`}>Old Regime Only</span></h3>
            <div className={styles.cardText}>
              <ul>
                <li><strong>Section 80TTA (Under 60):</strong> Exempts up to <strong>₹10,000</strong> of interest earned on bank savings accounts. (Does not apply to FD interest).</li>
                <li><strong>Section 80TTB (Seniors 60+):</strong> Exempts up to <strong>₹50,000</strong> of total interest earned across both savings accounts and Fixed Deposits (FDs).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ======================================= */}
        {/* CHAPTER 4: EXEMPTIONS & ALLOWANCES       */}
        {/* ======================================= */}
        <section id="exempt-hra" className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Chapter 4: Allowances & Exemptions</h2>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>HRA Exemption (House Rent Allowance) <span className={`${styles.badge} ${styles.oldBadge}`}>Old Regime Only</span></h3>
            <div className={styles.cardText}>
              <p>To qualify for HRA exemption, you must live in a rented home and receive HRA as part of your salary structure. The tax-exempt amount is the **lowest** of these three parameters:</p>
              <ol>
                <li>The actual HRA amount received.</li>
                <li>Actual rent paid minus 10% of your Basic salary (+ DA).</li>
                <li>50% of Basic salary if living in a metro city (Delhi, Mumbai, Kolkata, Chennai), or 40% in non-metros.</li>
              </ol>
              <p><strong>Section 80GG (Backup plan):</strong> If you pay rent but your employer doesn't provide an HRA salary component, you can claim a deduction of up to ₹60,000 per year under Section 80GG.</p>
            </div>
          </div>

          <div id="exempt-lta" className={styles.card}>
            <h3 className={styles.cardTitle}>LTA (Leave Travel Allowance) <span className={`${styles.badge} ${styles.oldBadge}`}>Old Regime Only</span></h3>
            <div className={styles.cardText}>
              <p>LTA covers ticket expenses incurred during a vacation in India for yourself and your family.</p>
              <ul>
                <li><strong>Limits:</strong> Only actual travel tickets (rail, flight, or bus) are exempt. Lodging, meals, and sightseeing do not qualify.</li>
                <li><strong>Frequency:</strong> Can be claimed for exactly <strong>2 journeys in a block of 4 calendar years</strong>. The current block is 2026-2029.</li>
              </ul>
            </div>
          </div>

          <div id="exempt-allowances" className={styles.card}>
            <h3 className={styles.cardTitle}>Tax-Free allowances <span className={`${styles.badge} ${styles.bothBadge}`}>Both Regimes (Select)</span></h3>
            <div className={styles.cardText}>
              <p>In addition to the standard ₹75,000 deduction, a few allowances remain tax-exempt depending on the regime:</p>
              <ul>
                <li><strong>Meal Vouchers (Sodexo/Zeta):</strong> Up to ₹50 per meal (approx. ₹26,400/year) is tax-free under the Old Regime. (Taxable in the New Regime).</li>
                <li><strong>Conveyance / Transport Allowance:</strong> Exempt for physically disabled employees.</li>
                <li><strong>Official Duty Reimbursements:</strong> Daily allowances for official travel are tax-exempt in both regimes.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ======================================= */}
        {/* CHAPTER 5: ADVANCED RULES                */}
        {/* ======================================= */}
        <section id="adv-87a" className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Chapter 5: Advanced Rules & Mechanics</h2>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Section 87A Tax Rebate</h3>
            <div className={styles.eli5Box}>
              <div className={styles.eli5Title}>ELI5 Summary</div>
              If your income is below the rebate limit, the government gives you a discount coupon equal to your total tax bill, making your final tax payable exactly ZERO.
            </div>
            <div className={styles.cardText}>
              <p>The rebate works as follows:</p>
              <ul>
                <li><strong>New Tax Regime:</strong> Net Taxable Income up to <strong>₹12,00,000</strong> is eligible for a full tax rebate under Section 87A (tax is ₹0).</li>
                <li><strong>Old Tax Regime:</strong> Net Taxable Income up to <strong>₹7,00,000</strong> is eligible for a full rebate (tax is ₹0).</li>
              </ul>
              <p style={{ color: '#ef5350', fontWeight: 'bold' }}>⚠️ The Rebate Cliff:</p>
              <p>Rebate 87A is an all-or-nothing benefit. Under the New Regime, if you earn ₹12,00,000, your tax is ₹0. If your income increases by just ₹10 to ₹12,00,010, the rebate vanishes entirely. Your calculated base tax instantly jumps from ₹0 to roughly ₹60,000!</p>
            </div>
          </div>

          <div id="adv-marginal" className={styles.card}>
            <h3 className={styles.cardTitle}>Understanding Marginal Relief</h3>
            <div className={styles.cardText}>
              <p>To prevent the rebate cliff from penalizing people for getting small raises, the government applies <strong>Marginal Relief</strong> in the New Regime.</p>
              <p><strong>The Rule:</strong> The tax you pay cannot exceed the extra money you earned above the ₹12L limit.</p>
              
              <h4 style={{ margin: '12px 0 6px', color: 'var(--color-text-primary)' }}>Example Calculation:</h4>
              <ul>
                <li><strong>Net Taxable Income:</strong> ₹12,05,000 (₹5,000 above the limit).</li>
                <li><strong>Normal Calculated Tax:</strong> ₹61,000.</li>
                <li><strong>Income Excess:</strong> ₹12,05,000 - ₹12,00,000 = ₹5,000.</li>
                <li><strong>Tax Cap:</strong> Your tax is capped at the excess income, which is **₹5,000**.</li>
                <li><strong>Marginal Relief:</strong> ₹61,000 - ₹5,000 = ₹56,000 is written off. Your net tax is ₹5,000 + Cess.</li>
              </ul>
              <p><em>Note:</em> Because of this, every rupee earned between ₹12L and roughly ₹12.6L is effectively taxed at 100% until the base tax is paid off.</p>
            </div>
          </div>

          <div id="adv-clubbing" className={styles.card}>
            <h3 className={styles.cardTitle}>Clubbing of Income</h3>
            <div className={styles.cardText}>
              <p>You cannot simply transfer assets or income to your spouse or minor children to avoid paying taxes.</p>
              <ul>
                <li>If you gift cash to your spouse and they invest it in a Fixed Deposit, the interest earned on that FD will be added ("clubbed") back to **your** income and taxed at your regular slabs.</li>
                <li><strong>Exception:</strong> If you give a formal interest-bearing loan to your spouse, or if they invest the gifted money in a business where they actively work, clubbing does not apply.</li>
              </ul>
            </div>
          </div>

          <div id="adv-losses" className={styles.card}>
            <h3 className={styles.cardTitle}>Set-off & Carry-Forward of Losses</h3>
            <div className={styles.cardText}>
              <p>You can offset losses in one head against profits in another, subject to rules:</p>
              <ul>
                <li><strong>House Property Losses:</strong> Can offset salary or business income up to a maximum of <strong>₹2,00,000</strong> in a single year. Excess losses can be carried forward for 8 years to offset future rental income.</li>
                <li><strong>Short-Term Capital Losses (STCL):</strong> Can offset both Short-Term and Long-Term Capital Gains.</li>
                <li><strong>Long-Term Capital Losses (LTCL):</strong> Can offset **only** Long-Term Capital Gains. It cannot be set off against short-term gains.</li>
                <li>Capital losses can be carried forward for up to 8 assessment years.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ======================================= */}
        {/* CHAPTER 6: CA OPTIMIZATION HACKS        */}
        {/* ======================================= */}
        <section id="hack-parents-rent" className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Chapter 6: CA Optimization Hacks</h2>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Hack 1: The "Rent-to-Parents" Loophole <span className={`${styles.badge} ${styles.oldBadge}`}>Old Regime</span></h3>
            <div className={styles.cardText}>
              <p>If you live with your parents in a house owned by them, you can legally pay them rent and claim full HRA exemption.</p>
              <ul>
                <li><strong>Standard Deduction:</strong> Your parents get a flat 30% deduction on this rental income. Only 70% of the rent you pay is taxable for them.</li>
                <li><strong>Tax Arbitrage:</strong> If your retired parents are in a lower tax bracket (e.g. 0% or 5%) and you are in the 30% bracket, your family saves up to 30% tax on the rent amount while the parents pay little to no tax on their end.</li>
              </ul>
            </div>
          </div>

          <div id="hack-parents-gift" className={styles.card}>
            <h3 className={styles.cardTitle}>Hack 2: Gifting money to Parents <span className={`${styles.badge} ${styles.bothBadge}`}>Both Regimes</span></h3>
            <div className={styles.cardText}>
              <p>While gifting money to a spouse attracts income clubbing, gifting to parents does not.</p>
              <p>If your parents are in a lower tax bracket, you can gift them money. They can invest that money in high-yielding FDs or mutual funds in their name. The interest earned is taxed in **their** tax file, not yours. This legally shifts income from your high tax bracket into their lower or zero-tax bracket.</p>
            </div>
          </div>

          <div id="hack-employer-nps" className={styles.card}>
            <h3 className={styles.cardTitle}>Hack 3: Employer NPS Restructuring <span className={`${styles.badge} ${styles.bothBadge}`}>Both Regimes</span></h3>
            <div className={styles.cardText}>
              <p>Under Section <strong>80CCD(2)</strong>, if your employer contributes up to <strong>10% of your Basic salary</strong> to your corporate NPS account, that contribution is completely tax-free.</p>
              <p>This is one of the very few deductions that is allowed under the New Tax Regime. Ask your HR to deduct this contribution from your taxable "Special Allowance" and deposit it directly into NPS. Your total CTC remains unchanged, but your tax drops instantly.</p>
            </div>
          </div>

          <div id="hack-rollover" className={styles.card}>
            <h3 className={styles.cardTitle}>Hack 4: Section 54/54F Capital Gain Rollovers <span className={`${styles.badge} ${styles.bothBadge}`}>Both Regimes</span></h3>
            <div className={styles.cardText}>
              <p>If you make large capital gains from selling stocks, mutual funds, or real estate, you can avoid paying taxes altogether by reinvesting the profits:</p>
              <ul>
                <li><strong>Section 54:</strong> Reinvest capital gains from the sale of a residential house into another residential house.</li>
                <li><strong>Section 54F:</strong> Reinvest the net sale proceeds from selling stocks, mutual funds, or gold into a residential house.</li>
              </ul>
              <p>The reinvestment must occur within 1 year before or 2 years after the date of sale (or 3 years if constructing a new house).</p>
            </div>
          </div>
        </section>

        {/* ======================================= */}
        {/* CHAPTER 7: COMPLIANCE & DOCS            */}
        {/* ======================================= */}
        <section id="compliance-ais-tis" className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Chapter 7: Tax Compliance & Essential Documents</h2>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Understanding Form 26AS, AIS, and TIS</h3>
            <div className={styles.eli5Box}>
              <div className={styles.eli5Title}>ELI5 Summary</div>
              Think of **Form 26AS** as your official bank passbook showing all tax deductions made on your behalf. **AIS** (Annual Information Statement) is the government's master ledger tracking almost every financial footprint you make (stock buys, high deposits, FD interest). **TIS** is just a clean, one-page summary of your AIS.
            </div>
            <div className={styles.cardText}>
              <p>Before filing ITR, it is critical that the numbers in your tax returns match these three reports from the Income Tax Portal. Discrepancies lead to automated tax notices.</p>
              <ul>
                <li><strong>Form 26AS:</strong> Lists all TDS cut by employers, banks (on FDs), or clients, as well as self-paid self-assessment/advance taxes.</li>
                <li><strong>AIS:</strong> Tracks high-value transactions like buying mutual funds, selling shares, saving accounts interest, dividend income, and foreign remittances.</li>
                <li><strong>TIS:</strong> Categorizes your AIS entries into simplified heads (e.g. "Interest from Savings: ₹12,400") to help you copy them directly to ITR fields.</li>
              </ul>
            </div>
          </div>

          <div id="compliance-tds" className={styles.card}>
            <h3 className={styles.cardTitle}>TDS (Tax Deducted at Source) Quick Reference</h3>
            <div className={styles.cardText}>
              <p>TDS is tax cut upfront when income is paid to you. These acts are captured in your Form 26AS as tax credits:</p>
              <div className={styles.taxTableWrapper}>
                <table className={styles.taxTable}>
                  <thead>
                    <tr>
                      <th>Section</th>
                      <th>Type of Payment</th>
                      <th>TDS Rate (%)</th>
                      <th>Exemption Threshold (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>192</td>
                      <td>Salary Income</td>
                      <td>As per your slabs</td>
                      <td>Taxable Limit</td>
                    </tr>
                    <tr>
                      <td>194A</td>
                      <td>FD/Bank Interest</td>
                      <td>10% (20% if no PAN)</td>
                      <td>₹40,000 (₹50,000 for Seniors)</td>
                    </tr>
                    <tr>
                      <td>194J</td>
                      <td>Professional / Tech Fees</td>
                      <td>10% (or 2% for call center)</td>
                      <td>₹30,000 per year</td>
                    </tr>
                    <tr>
                      <td>194C</td>
                      <td>Contractor Payment</td>
                      <td>1% (Indiv) / 2% (Firm)</td>
                      <td>₹30,000 single / ₹1,00,000 annual</td>
                    </tr>
                    <tr>
                      <td>194-IA</td>
                      <td>Purchase of Property</td>
                      <td>1% of sale value</td>
                      <td>₹50,00,000 sale value</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div id="compliance-advance-tax" className={styles.card}>
            <h3 className={styles.cardTitle}>Advance Tax & Interest Penalties (Sections 234A/B/C)</h3>
            <div className={styles.cardText}>
              <p>If your net tax liability (after subtracting TDS credits) exceeds <strong>₹10,000</strong> in a financial year, you are legally required to pay your tax in quarterly installments during the year itself, rather than waiting for the end of the year.</p>
              <p><em>Exemption:</em> Senior citizens (60+) who do not have any income from business or profession are exempt from paying Advance Tax.</p>
              
              <h4 style={{ margin: '12px 0 6px', color: 'var(--color-text-primary)' }}>Due Dates Checklist:</h4>
              <ul>
                <li><strong>By June 15:</strong> Pay 15% of your estimated tax.</li>
                <li><strong>By September 15:</strong> Pay 45% of your estimated tax.</li>
                <li><strong>By December 15:</strong> Pay 75% of your estimated tax.</li>
                <li><strong>By March 15:</strong> Pay 100% of your estimated tax.</li>
              </ul>
              
              <h4 style={{ margin: '16px 0 6px', color: 'var(--color-text-primary)' }}>Penalties for delay:</h4>
              <ul>
                <li><strong>Section 234A:</strong> 1% per month simple interest if you file your final ITR after the July 31st deadline.</li>
                <li><strong>Section 234B:</strong> 1% per month interest if you fail to pay at least 90% of your total tax liability as advance/TDS tax by March 31st.</li>
                <li><strong>Section 234C:</strong> 1% per month interest on the shortfalls of individual quarterly advance tax deadlines.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ======================================= */}
        {/* CHAPTER 8: ITR FORMS MATRIX              */}
        {/* ======================================= */}
        <section id="itr-forms-which" className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Chapter 8: The ITR Forms Matrix</h2>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Which ITR Form Should You File?</h3>
            <div className={styles.cardText}>
              <p>Choosing the wrong ITR form will make your return defective, causing the Income Tax Department to reject it. Here is the selection matrix:</p>
              
              <div className={styles.taxTableWrapper}>
                <table className={styles.taxTable}>
                  <thead>
                    <tr>
                      <th>Form Name</th>
                      <th>Who is eligible?</th>
                      <th>Who is excluded?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>ITR-1 (Sahaj)</strong></td>
                      <td>
                        Salaried individuals with income <strong>under ₹50 Lakhs</strong>, single house property, and interest/other sources.
                      </td>
                      <td>
                        People with Capital gains, multiple house properties, business income, or foreign assets.
                      </td>
                    </tr>
                    <tr>
                      <td><strong>ITR-2</strong></td>
                      <td>
                        Individuals/HUFs not having business income, but having capital gains, foreign assets, agricultural income &gt; ₹5,000, or multiple house properties.
                      </td>
                      <td>
                        Anyone earning income from a business or profession (proprietorships).
                      </td>
                    </tr>
                    <tr>
                      <td><strong>ITR-3</strong></td>
                      <td>
                        Individuals having business or professional income who maintain regular books of accounts (F&O traders, business owners, partners in firms).
                      </td>
                      <td>
                        Salaried people with no business income.
                      </td>
                    </tr>
                    <tr>
                      <td><strong>ITR-4 (Sugam)</strong></td>
                      <td>
                        Individuals, HUFs, and firms with total income under ₹50 Lakhs who declare profits under the <strong>Presumptive Taxation scheme</strong> (44AD/44ADA).
                      </td>
                      <td>
                        Non-residents, company directors, holders of unlisted equity, or people with capital gains.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================= */}
        {/* CHAPTER 9: SPECIAL DEDUCTIONS           */}
        {/* ======================================= */}
        <section id="health-80ddb" className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Chapter 9: Medical & Disability Deductions</h2>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Section 80DDB: Critical Illness Treatment <span className={`${styles.badge} ${styles.oldBadge}`}>Old Regime</span></h3>
            <div className={styles.cardText}>
              <p>Under Section 80DDB, you can claim a tax deduction for money spent on the treatment of specified critical diseases (such as cancer, chronic renal failure, AIDS, neurological diseases) for yourself or dependent relatives.</p>
              <ul>
                <li><strong>Limit (Under 60):</strong> Up to <strong>₹40,000</strong> per year.</li>
                <li><strong>Limit (Senior Citizens 60+):</strong> Up to <strong>₹1,00,000</strong> per year.</li>
                <li><strong>Proof Required:</strong> A certificate of diagnosis (Form 10I) issued by a specialist doctor working in a government or private hospital.</li>
              </ul>
            </div>
          </div>

          <div id="health-80dd-80u" className={styles.card}>
            <h3 className={styles.cardTitle}>Section 80DD & 80U: Disability Deductions <span className={`${styles.badge} ${styles.oldBadge}`}>Old Regime</span></h3>
            <div className={styles.cardText}>
              <p>These sections provide flat deductions based on disability status. They do not require spending receipts, just a certified medical certificate:</p>
              <ul>
                <li><strong>Section 80DD (Disabled Dependent):</strong> If you look after a dependent spouse, child, sibling, or parent with a disability.
                  <ul>
                    <li>Disability (40% to 80%): Flat <strong>₹75,000</strong> deduction.</li>
                    <li>Severe Disability (80%+): Flat <strong>₹1,25,000</strong> deduction.</li>
                  </ul>
                </li>
                <li><strong>Section 80U (Self Disability):</strong> If the taxpayer themselves suffers from a certified physical or mental disability.
                  <ul>
                    <li>Disability (40% to 80%): Flat <strong>₹75,000</strong> deduction.</li>
                    <li>Severe Disability (80%+): Flat <strong>₹1,25,000</strong> deduction.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ======================================= */}
        {/* CHAPTER 10: ADVANCED ROLLOVERS          */}
        {/* ======================================= */}
        <section id="loan-joint" className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Chapter 10: Loan & Asset Optimization</h2>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Double-Dipping Joint Home Loans <span className={`${styles.badge} ${styles.oldBadge}`}>Old Regime</span></h3>
            <div className={styles.eli5Box}>
              <div className={styles.eli5Title}>ELI5 Summary</div>
              If you buy a house with your spouse as joint owners and co-borrowers, you can both claim separate tax limits on the same loan, effectively doubling your family tax deductions.
            </div>
            <div className={styles.cardText}>
              <p>For a single applicant, the tax benefits of a home loan are capped at:</p>
              <ul>
                <li>Section 24(b) (Interest): Max ₹2,00,000.</li>
                <li>Section 80C (Principal): Max ₹1,50,000.</li>
              </ul>
              <p><strong>The Joint Loan Hack:</strong> If a married couple jointly owns the property and both pay the EMIs, **each co-borrower can claim the full limits independently** in their respective ITRs:</p>
              <ul>
                <li>Total Interest Deduction: Up to <strong>₹4,00,000</strong> (₹2L each).</li>
                <li>Total Principal Deduction: Up to <strong>₹3,00,000</strong> (₹1.5L each under Section 80C).</li>
              </ul>
              <p><em>Rule:</em> The deductions must be split in proportion to each person's share in the loan repayment (e.g. 50:50 or 60:40).</p>
            </div>
          </div>

          <div id="loan-54ec" className={styles.card}>
            <h3 className={styles.cardTitle}>Section 54EC Capital Gains Bonds <span className={`${styles.badge} ${styles.bothBadge}`}>Both Regimes</span></h3>
            <div className={styles.cardText}>
              <p>If you sell land or a residential property and earn large long-term capital gains, you can avoid paying the 12.5% LTCG tax without buying another house by investing the gains in <strong>Section 54EC Bonds</strong>.</p>
              <ul>
                <li><strong>Eligible Bonds:</strong> National Highway Authority of India (NHAI), Rural Electrification Corporation (REC), Power Finance Corporation (PFC), or Indian Railway Finance Corporation (IRFC).</li>
                <li><strong>Investment Window:</strong> Must invest within <strong>6 months</strong> of the property sale date.</li>
                <li><strong>Lock-in Period:</strong> 5 years. The interest on these bonds (approx. 5-6%) is taxable, but your capital gains tax is completely waived.</li>
                <li><strong>Maximum Limit:</strong> Capped at <strong>₹50,00,000</strong> in a financial year.</li>
              </ul>
            </div>
          </div>

          <div id="loan-cgas" className={styles.card}>
            <h3 className={styles.cardTitle}>Capital Gains Account Scheme (CGAS) <span className={`${styles.badge} ${styles.bothBadge}`}>Both Regimes</span></h3>
            <div className={styles.cardText}>
              <p>Under Section 54/54F, you get 2 to 3 years to buy or construct a new house to roll over capital gains. However, you must file your ITR by July 31st of the Assessment Year following the sale.</p>
              <p>If you haven't bought the new house by the time you file your ITR, you cannot claim the exemption unless you park the capital gains in a **Capital Gains Account Scheme (CGAS)** in a public sector bank.</p>
              <p>This tells the government that you intend to use the money for a house in the future, keeping the capital gains tax-exempt in your current return. You must utilize this money to buy/construct the house within the specified 2-3 year timeframe, or it will be taxed as capital gains in the year the limit expires.</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
