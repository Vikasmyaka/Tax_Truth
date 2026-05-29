import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useURLState } from '../hooks/useURLState';
import { calculateTax } from '../engine/taxCalculator';
import { DisclaimerFooter } from '../components';
import styles from './ITRAcademy.module.css';

const defaultInputs = {
  monthlyTakeHome: 0,
  hasSalarySlip: null,
  basicSalary: '',
  hraReceived: '',
  specialAllowance: '',
  lta: '',
  otherAllowances: '',
  employeePFMonthly: '',
  employeePFAnnual: '',
  professionalTax: '',
  ageCategory: 'below60',
  cityType: 'nonMetro',
  paysRent: null,
  monthlyRent: '',
  hasHomeLoan: null,
  homeLoanInterestAnnual: '',
  homeLoanPrincipalAnnual: '',
  propertyType: '',
  rentalIncomeAnnual: '',
  isFirstTimeBuyer: null,
  stampDutyValue: '',
  hasEmployerNPS: null,
  isGovtEmployee: null,
  employerNPSAnnual: '',
  ppfAnnual: '',
  elssAnnual: '',
  licPremiumAnnual: '',
  tuitionFeesAnnual: '',
  taxSavingFDAnnual: '',
  sukanyaAnnual: '',
  selfNPSAnnual: '',
  healthInsuranceSelfAnnual: '',
  healthInsuranceParentsAnnual: '',
  areParentsSenior: null,
  hasEducationLoan: null,
  educationLoanInterestAnnual: '',
  savingsInterestAnnual: '',
  fdInterestAnnual: '',
  otherIncome: '',
  hasMealCoupons: null,
  hasEmployerGift: null,
};

export default function ITRAcademy() {
  const [activeSection, setActiveSection] = useState('itr-form-finder');
  const [inputs] = useURLState(defaultInputs);

  const results = useMemo(() => {
    try {
      const engineInputs = {
        ...inputs,
        receivesHRA: (inputs.hraReceived || 0) > 0
      };
      return calculateTax(engineInputs);
    } catch {
      return null;
    }
  }, [inputs]);

  const hasProfile = inputs.monthlyTakeHome > 0 || inputs.basicSalary > 0;

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const sectionIds = [
      'itr-form-finder',
      'playbook-hra',
      'playbook-medical',
      'playbook-losses',
      'playbook-savings',
      'itr-checklist',
      'itr-portal-guide',
      'itr-deadlines'
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

  // Form Finder State - Lazy initialization from tax profile inputs
  const [selectorAnswers, setSelectorAnswers] = useState(() => {
    const gross = results ? results.grossAnnualIncome : 0;
    const isBusiness = inputs.otherIncome > 0;
    return {
      incomeType: isBusiness ? 'business' : 'salary',
      foreignAssets: inputs.foreignAssets || false,
      directorInCompany: inputs.directorInCompany || false,
      unlistedShares: inputs.unlistedShares || false,
      agriculturalIncome: false,
      turnoverOver50L: gross > 5000000,
    };
  });

  // Calculate recommended form based on questions
  const getRecommendation = () => {
    const { incomeType, foreignAssets, directorInCompany, unlistedShares, agriculturalIncome, turnoverOver50L } = selectorAnswers;

    if (incomeType === 'business' || turnoverOver50L) {
      return {
        form: 'ITR-3 / ITR-4',
        desc: 'Recommended for Business Owners, Professionals (Freelancers), or Partners in a firm.',
        details: 'Use ITR-4 (Sugam) if you opt for presumptive taxation scheme under Section 44AD/44ADA. Otherwise, ITR-3 is mandatory for business income.',
        docs: ['P&L Statement', 'Balance Sheet', 'Form 16A (TDS on business payouts)', 'GST returns (if applicable)']
      };
    }

    if (incomeType === 'capitalGains' || foreignAssets || directorInCompany || unlistedShares || agriculturalIncome) {
      return {
        form: 'ITR-2',
        desc: 'Recommended for salaried individuals who also have Capital Gains, foreign investments, or hold company directorships.',
        details: 'ITR-2 is mandatory if you sold stocks/property, hold shares in unlisted companies, are a company director, or have any foreign assets/bank accounts.',
        docs: ['Capital Gains Statement from Brokers', 'Foreign Asset Details (Schedule FA)', 'Unlisted Shares transaction statement', 'Form 16']
      };
    }

    return {
      form: 'ITR-1 (Sahaj)',
      desc: 'Recommended for salaried individuals with simple income streams.',
      details: 'Applicable if total income is under ₹50 Lakhs, generated from Salary, one House Property, and other sources (Interest/Dividends).',
      docs: ['Form 16', 'Form 26AS (TDS summary)', 'AIS/TIS statement', 'Interest Certificates from Banks']
    };
  };

  const recommendation = getRecommendation();

  // Checklist state
  const [completedChecks, setCompletedChecks] = useState({});
  const checklistItems = [
    { id: 1, title: 'AIS & TIS Reconciliation', desc: 'Download the Annual Information Statement (AIS) from the portal and verify every dividend payout, interest income, and stock sale.' },
    { id: 2, title: 'Form 26AS TDS Match', desc: 'Ensure that the tax deducted at source (TDS) by your employer/banks matches the credits in your Form 26AS statement.' },
    { id: 3, title: 'Aadhaar-PAN Linking Check', desc: 'Ensure your Aadhaar and PAN are linked. Returns filed with unlinked PAN will be declared invalid by the CBDT.' },
    { id: 4, title: 'Bank Account Validation', desc: 'Verify that your primary bank account is pre-validated on the e-filing portal. Only validated accounts receive tax refunds.' },
    { id: 5, title: 'Form 10E Submission', desc: 'If claiming tax relief on salary arrears under Section 89(1), submit Form 10E online before uploading your return.' },
    { id: 6, title: 'Capital Gains Schedule', desc: 'Ensure capital gains from stock brokers are declared asset-wise (Short term 15%/20%, Long term 10%/12.5%).' },
    { id: 7, title: 'Advance Tax Verification', desc: 'Reconcile advance tax and self-assessment tax paid. Any shortfall might attract interest under sections 234A, B, and C.' },
    { id: 8, title: 'Schedule FA (Foreign Assets)', desc: 'If you own foreign shares (like US stocks or RSUs), you must file ITR-2 and declare them in Schedule FA, even if no income was generated.' },
    { id: 9, title: 'Crypto Taxation (Schedule VDA)', desc: 'Report any virtual digital asset transactions. Gains are taxed at 30% flat under Section 115BBH.' },
    { id: 10, title: 'Alternative Minimum Tax (AMT)', desc: 'High earners claiming specific exemptions must calculate and pay AMT if it exceeds normal tax liability.' }
  ];

  const handleCheckToggle = (id) => {
    setCompletedChecks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const checkedCount = Object.values(completedChecks).filter(Boolean).length;
  const readinessPercentage = Math.round((checkedCount / checklistItems.length) * 100);


  // Portal Guide state
  const [activeGuideStep, setActiveGuideStep] = useState(1);
  const guideSteps = [
    {
      id: 1,
      title: 'Log In and Access Return',
      desc: 'Visit incometax.gov.in and login using your PAN/Aadhaar and password. Go to e-File > Income Tax Returns > File Income Tax Return.'
    },
    {
      id: 2,
      title: 'Select Assessment Year & Mode',
      desc: 'Select Assessment Year 2026-27 (for Financial Year 2025-26). Select Mode of Filing as Online (direct portal inputs) or Offline (upload JSON utility).'
    },
    {
      id: 3,
      title: 'Verify Pre-Filled Information',
      desc: 'The portal will pre-fill salary, bank details, and TDS. Cross-reference this with your Form 16, AIS, and Form 26AS. Correct any mismatch.'
    },
    {
      id: 4,
      title: 'Apply Deductions & Compute Tax',
      desc: 'Claim optimized deductions (like parent medical bills or Section 80TTA interest) in the relevant schedules. The portal will compute your final refund or tax due.'
    },
    {
      id: 5,
      title: 'E-Verify Your Return (Crucial)',
      desc: 'After submitting the return, select e-Verify using Aadhaar OTP, Net Banking, or Demat Account. Your return is not processed until it is verified!'
    }
  ];

  // Dynamic ITR Form recommendation based on inputs
  const profileRecommendedForm = useMemo(() => {
    if (!results) return 'ITR-1 (Sahaj)';
    const gross = results.grossAnnualIncome;
    const isBusiness = inputs.otherIncome > 0;
    if (isBusiness || gross > 5000000) {
      return 'ITR-3 / ITR-4';
    }
    const hasCapGains = inputs.otherIncome > 0;
    if (hasCapGains || inputs.foreignAssets || inputs.directorInCompany || inputs.unlistedShares) {
      return 'ITR-2';
    }
    return 'ITR-1 (Sahaj)';
  }, [results, inputs]);

  // Dynamic diagnostics opportunities
  const diagnosticsOpportunities = useMemo(() => {
    const opportunities = [];
    if (!results) return opportunities;

    // Rent / HRA
    if (inputs.paysRent && results.old.hraExemption > 0) {
      const estimatedHraTaxSavings = Math.round(results.old.hraExemption * (results.recommendedRegime === 'new' ? 0.30 : 0.20));
      opportunities.push({
        title: `Claim ₹${results.old.hraExemption.toLocaleString('en-IN')} Rent Exemption (Sec 10(13A))`,
        desc: `You pay ₹${(inputs.monthlyRent * 12).toLocaleString('en-IN')} annual rent. Report this HRA deduction on the portal to secure approx. ₹${estimatedHraTaxSavings.toLocaleString('en-IN')} in tax savings.`,
        actionId: 'playbook-hra'
      });
    }

    // Senior Parent Health Bills
    if (inputs.healthInsuranceParentsAnnual > 0) {
      opportunities.push({
        title: `Claim ₹${Number(inputs.healthInsuranceParentsAnnual).toLocaleString('en-IN')} Parent Medical Exemption`,
        desc: `Ensure you fill Section 80D Schedule on the e-filing portal to receive full tax credit for your parental medical premiums or diagnostics bills.`,
        actionId: 'playbook-medical'
      });
    } else {
      opportunities.push({
        title: `Parental Medical Relief (Sec 80D)`,
        desc: `You haven't claimed deductions for senior parents. You can deduct up to ₹50,000 for their medical bills or insurance premiums.`,
        actionId: 'playbook-medical'
      });
    }

    // Savings Bank Interest
    if (inputs.savingsInterestAnnual > 0) {
      const limit = inputs.ageCategory === 'senior' || inputs.ageCategory === 'superSenior' ? 50000 : 10000;
      const claimAmount = Math.min(inputs.savingsInterestAnnual, limit);
      opportunities.push({
        title: `Deduct ₹${claimAmount.toLocaleString('en-IN')} Savings Account Interest`,
        desc: `Claim this under Section 80TTA/B to keep your savings interest tax-free. Declare the interest in 'Income from Other Sources' first!`,
        actionId: 'playbook-savings'
      });
    }

    // FD Interest Warnings
    if (inputs.fdInterestAnnual > 0) {
      opportunities.push({
        title: `⚠️ Declare ₹${Number(inputs.fdInterestAnnual).toLocaleString('en-IN')} FD Interest`,
        desc: `Banks report this interest directly to the tax department. Failing to declare this interest under 'Income from Other Sources' will trigger automated compliance notices.`,
        actionId: 'itr-checklist'
      });
    }

    return opportunities;
  }, [results, inputs]);

  return (
    <div className={styles.libraryContainer}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <Link to="/" className={styles.sidebarTitle}>← TaxTruth India</Link>
        
        <div className={styles.navSection}>
          <div className={styles.navHeading}>1. Form Selection</div>
          <ul className={styles.navList}>
            <li>
              <button 
                onClick={() => scrollToId('itr-form-finder')} 
                className={`${styles.navItemBtn} ${activeSection === 'itr-form-finder' ? styles.navItemBtnActive : ''}`}
              >
                ITR Form Finder
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navHeading}>2. Refund Playbook</div>
          <ul className={styles.navList}>
            <li>
              <button 
                onClick={() => scrollToId('playbook-hra')} 
                className={`${styles.navItemBtn} ${activeSection === 'playbook-hra' ? styles.navItemBtnActive : ''}`}
              >
                HRA Exemption Override {inputs.paysRent && <span style={{ color: 'var(--color-teal-400)', fontSize: '10px' }}>●</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('playbook-medical')} 
                className={`${styles.navItemBtn} ${activeSection === 'playbook-medical' ? styles.navItemBtnActive : ''}`}
              >
                Parent Medical bills
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('playbook-losses')} 
                className={`${styles.navItemBtn} ${activeSection === 'playbook-losses' ? styles.navItemBtnActive : ''}`}
              >
                Carry Forward Losses
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToId('playbook-savings')} 
                className={`${styles.navItemBtn} ${activeSection === 'playbook-savings' ? styles.navItemBtnActive : ''}`}
              >
                Savings Sec 80TTA/B {inputs.savingsInterestAnnual > 0 && <span style={{ color: 'var(--color-teal-400)', fontSize: '10px' }}>●</span>}
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navHeading}>3. Pre-Filing Prep</div>
          <ul className={styles.navList}>
            <li>
              <button 
                onClick={() => scrollToId('itr-checklist')} 
                className={`${styles.navItemBtn} ${activeSection === 'itr-checklist' ? styles.navItemBtnActive : ''}`}
              >
                10-Point Checklist
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navHeading}>4. Department Portal</div>
          <ul className={styles.navList}>
            <li>
              <button 
                onClick={() => scrollToId('itr-portal-guide')} 
                className={`${styles.navItemBtn} ${activeSection === 'itr-portal-guide' ? styles.navItemBtnActive : ''}`}
              >
                Portal Filing Guide
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navHeading}>5. Dates & Warnings</div>
          <ul className={styles.navList}>
            <li>
              <button 
                onClick={() => scrollToId('itr-deadlines')} 
                className={`${styles.navItemBtn} ${activeSection === 'itr-deadlines' ? styles.navItemBtnActive : ''}`}
              >
                Key Deadlines
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>ITR Filing Guide & Playbook</h1>
          <p className={styles.pageDescription}>
            A step-by-step masterclass covering Indian tax returns. Find your correct form, 
            learn hidden CA secrets to maximize refunds, and double-check your filing readiness.
          </p>
        </div>

        {/* ======================================= */}
        {/* PERSONALIZED DIAGNOSTICS & INSIGHTS     */}
        {/* ======================================= */}
        {hasProfile ? (
          <div className={styles.diagnosticsBox}>
            <div className={styles.diagnosticsHeader}>
              <div className={styles.diagnosticsTitle}>
                🧠 Personal ITR Diagnostics & Insights
              </div>
              <Link to="/calculate" style={{ fontSize: '13px', color: 'var(--color-teal-400)', fontWeight: 'bold', textDecoration: 'none' }}>
                ✏️ Edit Tax Profile
              </Link>
            </div>
            
            <div style={{ marginBottom: '20px', fontSize: '14px', lineHeight: '1.6' }}>
              We've scanned your active tax profile (Gross Annual Income: <strong>₹{results?.grossAnnualIncome.toLocaleString('en-IN')}</strong>).
              Based on your details, you are recommended to file <strong>{profileRecommendedForm}</strong>.
            </div>

            <div className={styles.diagnosticsGrid}>
              {diagnosticsOpportunities.map((opportunity, index) => (
                <div key={index} className={styles.diagCard}>
                  <div className={styles.diagCardTitle}>
                    {opportunity.title}
                  </div>
                  <div className={styles.diagCardText}>
                    {opportunity.desc}
                    <div style={{ marginTop: '8px' }}>
                      <span className={styles.diagActionLink} onClick={() => scrollToId(opportunity.actionId)}>
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px dashed var(--color-surface-4)', borderRadius: '12px', padding: '20px', marginBottom: '30px', textAlign: 'center' }}>
            <span style={{ fontSize: '24px', marginRight: '10px' }}>📝</span>
            <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              No tax profile detected. To unlock personalized ITR filing diagnostics, dynamic refund alerts, and custom checklist pre-fills,{' '}
              <Link to="/calculate" style={{ color: 'var(--color-teal-400)', fontWeight: 'bold' }}>
                calculate your taxes first →
              </Link>
            </span>
          </div>
        )}

        {/* ======================================= */}
        {/* CHAPTER 1: ITR FORM FINDER              */}
        {/* ======================================= */}
        <section id="itr-form-finder" className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Chapter 1: The ITR Form Finder</h2>
          <div className={styles.eli5Box}>
            <div className={styles.eli5Title}>ELI5 Summary</div>
            Filing the wrong ITR form makes your return defective and triggers automated income tax notices. Use the tool below to identify the exact form for your profile.
          </div>
          
          <div className={styles.gridSelector}>
            {/* Question Form */}
            <div className={styles.questionsPanel}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: 'var(--color-text-primary)' }}>Taxpayer Profiler</h3>
              <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: 'var(--color-text-secondary)' }}>Select the criteria that apply to your income for AY 2026-27:</p>
              
              <div className={styles.questionGroup}>
                <label>Primary Source of Income</label>
                <select 
                  value={selectorAnswers.incomeType}
                  onChange={(e) => setSelectorAnswers({...selectorAnswers, incomeType: e.target.value})}
                >
                  <option value="salary">Salary / Pension Only</option>
                  <option value="capitalGains">Salary + Stock/Property Capital Gains</option>
                  <option value="business">Business / Profession / Freelance</option>
                  <option value="multiple">Multiple House Properties / Other Income</option>
                </select>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox"
                    checked={selectorAnswers.foreignAssets}
                    onChange={(e) => setSelectorAnswers({...selectorAnswers, foreignAssets: e.target.checked})}
                  />
                  I hold US stocks, RSUs, or foreign bank accounts
                </label>

                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox"
                    checked={selectorAnswers.directorInCompany}
                    onChange={(e) => setSelectorAnswers({...selectorAnswers, directorInCompany: e.target.checked})}
                  />
                  I am a Director in an Indian/foreign company
                </label>

                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox"
                    checked={selectorAnswers.unlistedShares}
                    onChange={(e) => setSelectorAnswers({...selectorAnswers, unlistedShares: e.target.checked})}
                  />
                  I hold investments in unlisted equity shares
                </label>

                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox"
                    checked={selectorAnswers.agriculturalIncome}
                    onChange={(e) => setSelectorAnswers({...selectorAnswers, agriculturalIncome: e.target.checked})}
                  />
                  My agricultural income exceeds ₹5,000
                </label>

                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox"
                    checked={selectorAnswers.turnoverOver50L}
                    onChange={(e) => setSelectorAnswers({...selectorAnswers, turnoverOver50L: e.target.checked})}
                  />
                  My gross annual income exceeds ₹50 Lakhs
                </label>
              </div>
            </div>

            {/* Recommendation Panel */}
            <div className={styles.recPanel}>
              <span className={styles.formBadge}>{recommendation.form}</span>
              <h3 style={{ margin: '15px 0 10px 0', fontSize: '20px', color: 'var(--color-teal-300)' }}>{recommendation.desc}</h3>
              <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>{recommendation.details}</p>

              <div className={styles.docSection}>
                <h4>Required Documents Checklist:</h4>
                <ul>
                  {recommendation.docs.map((doc, idx) => (
                    <li key={idx} style={{ margin: '6px 0', fontSize: '13px' }}>📄 {doc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================= */}
        {/* CHAPTER 2: REFUND PLAYBOOK              */}
        {/* ======================================= */}
        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Chapter 2: Refund Maximizer Playbook</h2>
          
          <div id="playbook-hra" className={styles.card}>
            <h3 className={styles.cardTitle}>
              HRA Exemption Override (Section 10(13A))
              {inputs.paysRent && <span className={`${styles.badge} ${styles.newBadge}`}>Relevant to You</span>}
            </h3>
            <div className={styles.eli5Box}>
              <div className={styles.eli5Title}>CA Secrets</div>
              Did you forget to submit rent receipts to your HR department before payroll locked? You do not lose the deduction. You can recalculate your taxable salary and claim the HRA exemption directly in your ITR filing.
            </div>
            <div className={styles.cardText}>
              <p>When you file online, the salary section is pre-filled from your Form 16. However, this section is completely editable. You can reduce the pre-filled salary by your eligible HRA calculation and report it correctly.</p>
              <div className={styles.formulaBox}>
                Taxable Salary in ITR = Gross Salary - Eligible HRA Exemption
              </div>
              <p><strong>Note:</strong> Keep your lease agreement and rent payment receipts ready in case of a scrutiny notice. You only need your landlord's PAN if your annual rent exceeds ₹1,00,000.</p>
            </div>
          </div>

          <div id="playbook-medical" className={styles.card}>
            <h3 className={styles.cardTitle}>
              Parent Medical Bills Relief (Section 80D)
              {(!inputs.healthInsuranceParentsAnnual || inputs.healthInsuranceParentsAnnual === 0) && <span className={`${styles.badge} ${styles.bothBadge}`}>Optimization Opportunity</span>}
            </h3>
            <div className={styles.eli5Box}>
              <div className={styles.eli5Title}>CA Secrets</div>
              If your parents are senior citizens (aged 60+) and do not have health insurance, you can claim tax deductions for their medical bills, including medicines, diagnostics, and consultations, up to ₹50,000 per year.
            </div>
            <div className={styles.cardText}>
              <p>Many taxpayers assume Section 80D is only for insurance premiums. Under the law, if senior citizens do not have an active policy (often due to high cost or pre-existing conditions), the deduction is extended to cover actual medical expenses.</p>
              <ul>
                <li><strong>Example:</strong> Paid ₹30,000 for father's clinical consultations and prescriptions using credit cards or net banking. Claim under Section 80D directly to save up to ₹9,000 in taxes.</li>
                <li><strong>Important:</strong> Cash payments are not eligible. Always make digital payments for parent medical expenses to maintain audit trails.</li>
              </ul>
            </div>
          </div>

          <div id="playbook-losses" className={styles.card}>
            <h3 className={styles.cardTitle}>Set-off and Carry Forward Losses</h3>
            <div className={styles.eli5Box}>
              <div className={styles.eli5Title}>CA Secrets</div>
              If you made losses in stocks, mutual funds, or crypto in FY 2025-26, you must declare them. Capital losses can offset gains to reduce your current tax bill, and the remainder can be carried forward for 8 years.
            </div>
            <div className={styles.cardText}>
              <p>The rules for capital loss set-offs are highly specific:</p>
              <ul>
                <li><strong>Short Term Capital Losses (STCL):</strong> Can offset both Short Term and Long Term Capital Gains.</li>
                <li><strong>Long Term Capital Losses (LTCL):</strong> Can offset **only** Long Term Capital Gains.</li>
                <li><strong>Warning:</strong> You must file your ITR before the **July 31st** deadline to be allowed to carry forward capital losses. Late filings forfeit this carry-forward option.</li>
              </ul>
            </div>
          </div>

          <div id="playbook-savings" className={styles.card}>
            <h3 className={styles.cardTitle}>
              Deduction on Savings Interest (Section 80TTA/B)
              {inputs.savingsInterestAnnual > 0 && <span className={`${styles.badge} ${styles.newBadge}`}>Relevant to You</span>}
            </h3>
            <div className={styles.cardText}>
              <p>Do not pay tax on small savings accounts interest. You can claim exemptions as follows:</p>
              <ul>
                <li><strong>Section 80TTA (Under 60):</strong> Claim deduction up to <strong>₹10,000</strong> on interest earned from savings bank accounts (not FDs).</li>
                <li><strong>Section 80TTB (Seniors 60+):</strong> Claim deduction up to <strong>₹50,000</strong> on total interest earned across both savings accounts, FDs, and post office schemes.</li>
              </ul>
              <div className={styles.eli5Box}>
                <div className={styles.eli5Title}>Filing Step</div>
                Add the entire interest amount under "Income from Other Sources", then claim the corresponding deduction under Section 80TTA/B in the deductions schedule.
              </div>
            </div>
          </div>
        </section>

        {/* ======================================= */}
        {/* CHAPTER 3: PRE-FILING PREP              */}
        {/* ======================================= */}
        <section id="itr-checklist" className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Chapter 3: The 10-Point Checklist</h2>
          
          <div className={styles.checklistLayout}>
            {/* Scorecard banner */}
            <div className={styles.scoreBanner}>
              <div className={styles.scoreCircle}>
                <svg viewBox="0 0 36 36" className={styles.chart}>
                  <path className={styles.chartBg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className={styles.chartFill} strokeDasharray={`${readinessPercentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className={styles.chartText}>
                  <span>{readinessPercentage}%</span>
                </div>
              </div>

              <div className={styles.scoreInfo}>
                <h3 style={{ fontSize: '18px', color: 'var(--color-text-primary)', margin: '0 0 5px 0' }}>ITR Filing Readiness Score</h3>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Check off the items as you verify them to evaluate if your return is ready for submission.</p>
                <span className={styles.scoreLevel}>
                  {readinessPercentage === 100 && '🚀 Fully Ready to Submit!'}
                  {readinessPercentage >= 60 && readinessPercentage < 100 && '⚠️ Review remaining items'}
                  {readinessPercentage < 60 && '❌ High risk of verification failure'}
                </span>
              </div>
            </div>

            {/* Items List */}
            <div className={styles.itemsList}>
              {checklistItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`${styles.checkItem} ${completedChecks[item.id] ? styles.itemChecked : ''}`}
                  onClick={() => handleCheckToggle(item.id)}
                >
                  <div className={styles.checkIcon}>
                    {completedChecks[item.id] ? '✅' : '⬜'}
                  </div>
                  <div className={styles.checkDesc}>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================= */}
        {/* CHAPTER 4: PORTAL FILING GUIDE          */}
        {/* ======================================= */}
        <section id="itr-portal-guide" className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Chapter 4: Portal Filing Guide</h2>
          
          <div className={styles.guideLayout}>
            <div className={styles.guideStepsList}>
              {guideSteps.map((step) => (
                <div 
                  key={step.id}
                  className={`${styles.guideStepItem} ${activeGuideStep === step.id ? styles.guideStepActive : ''}`}
                  onClick={() => setActiveGuideStep(step.id)}
                >
                  <div className={styles.guideStepNum}>{step.id}</div>
                  <div className={styles.guideStepText}>
                    <h4>{step.title}</h4>
                    {activeGuideStep === step.id && <p>{step.desc}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.guideAction}>
              <div className={styles.portalActionCard}>
                <h4 style={{ margin: '0 0 10px 0', color: 'var(--color-text-primary)', fontSize: '16px' }}>Ready to File?</h4>
                <p style={{ margin: '0 0 20px 0', color: 'var(--color-text-secondary)', fontSize: '13px', lineHeight: '1.4' }}>Keep your Form 16, AIS, and Capital Gains statements handy. Log in to the official Income Tax portal to file online.</p>
                <a 
                  href="https://www.incometax.gov.in" 
                  target="_blank" 
                  rel="noreferrer" 
                  className={styles.portalLink}
                >
                  Launch Official Portal ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================= */}
        {/* CHAPTER 5: KEY DEADLINES                 */}
        {/* ======================================= */}
        <section id="itr-deadlines" className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Chapter 5: Key Deadlines & Penalties</h2>
          
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Crucial Dates to Remember</h3>
            <div className={styles.cardText}>
              <p>Timely filing is critical. Here is the schedule for AY 2026-27 (FY 2025-26):</p>
              <ul>
                <li><strong>July 31, 2026:</strong> Due date for filing ITR for individuals, HUF, and businesses not requiring tax audits.</li>
                <li><strong>October 31, 2026:</strong> Due date for corporate taxpayers and businesses requiring audit under Section 44AB.</li>
                <li><strong>December 31, 2026:</strong> Last date for filing a **Belated (Late)** or **Revised (Corrected)** return. After this, you cannot file online without special condonation.</li>
              </ul>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle} style={{ color: '#ef5350' }}>Penalties under Section 234F</h3>
            <div className={styles.cardText}>
              <p>Filing your return after July 31st attracts late fees:</p>
              <ul>
                <li><strong>Total Income under ₹5 Lakhs:</strong> Late fee is capped at <strong>₹1,000</strong>.</li>
                <li><strong>Total Income over ₹5 Lakhs:</strong> Late fee is <strong>₹5,000</strong>.</li>
                <li><strong>Interest under 234A:</strong> An additional interest of 1% per month on outstanding taxes is levied for every month of delay beyond the deadline.</li>
              </ul>
            </div>
          </div>
        </section>

        <div className={styles.backFooter}>
          <Link to="/" className={styles.backLink}>← Back to Dashboard</Link>
        </div>
      </main>
      <DisclaimerFooter />
    </div>
  );
}
