# TaxTruth India — Complete Product Requirements Document
### FY 2025-26 (AY 2026-27) | Salaried Individuals | Browser-Only Tax Calculator

**Version:** 1.0  
**Status:** Developer-Ready  
**Target:** Any developer, AI coding tool (Cursor, v0, Bolt, Claude Code) can build from this document alone  

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Technical Architecture](#2-technical-architecture)
3. [Design System & Tokens](#3-design-system--tokens)
4. [Data Model — Full Variable Registry](#4-data-model--full-variable-registry)
5. [Tax Engine — Complete Calculation Logic](#5-tax-engine--complete-calculation-logic)
6. [Landing Page](#6-landing-page)
7. [Input Wizard — All Screens](#7-input-wizard--all-screens)
8. [Live Preview Panel](#8-live-preview-panel)
9. [Results Page](#9-results-page)
10. [Component Tree](#10-component-tree)
11. [Error States & Empty States](#11-error-states--empty-states)
12. [Complete Copy Registry](#12-complete-copy-registry)
13. [Hidden Truths Logic — Secrets Engine](#13-hidden-truths-logic--secrets-engine)
14. [Feature Priority — MVP → V1 → V2](#14-feature-priority--mv-p--v1--v2)
15. [Wireframes — All Screens](#15-wireframes--all-screens)

---

## 1. PROJECT OVERVIEW

### 1.1 Mission Statement
TaxTruth India is a 100% browser-based Indian income tax calculator for salaried individuals for FY 2025-26 (AY 2026-27). It asks what hits your bank account — not your CTC. It tells you which regime saves you more money, what your employer is hiding, and what a CA would charge ₹2,000 to explain. Free. Always.

### 1.2 Target User
- Salaried employees in India, any age, any city
- First job holders who have never filed taxes
- Employees post-appraisal recalculating their tax
- Employees who switched jobs mid-year (two Form 16)
- Senior and super senior citizens on pension

### 1.3 Explicit Non-Scope
This version does NOT handle:
- Surcharge (income > ₹50 lakh)
- Capital gains (equity, debt, property)
- Freelance or business income
- ESOPs
- Foreign income or DTAA
- Crypto
- Agricultural income

### 1.4 Core Promises to User
1. No signup. No email. No account.
2. Zero data sent to any server. All calculations run in browser.
3. No ads. No loan/product recommendations.
4. Plain language. No jargon without explanation.
5. Free. Forever.

---

## 2. TECHNICAL ARCHITECTURE

### 2.1 Stack
```
Frontend:     React 18+ with hooks (or vanilla HTML/CSS/JS — see note)
Styling:      CSS Modules or Tailwind CSS
State:        React Context API + useReducer (no Redux needed)
Math:         Native JS — no external math library needed
Routing:      React Router v6 (hash-based for static hosting)
Hosting:      GitHub Pages / Netlify / Vercel (static only)
Build:        Vite
```

**Note for vanilla JS build:** If built without React, use a single HTML file with `<script type="module">` and CSS custom properties. Same logic applies, no framework dependency.

### 2.2 Architecture Principles
```
- Zero backend. Zero API calls. No network requests after initial load.
- All tax logic in a single pure function: calculateTax(inputs) → results
- URL state: encode user inputs in URL hash so calculation is shareable/bookmarkable
- No cookies. No localStorage for sensitive data. Session-only state.
- Offline-capable: works after first load with no internet
- Page load target: < 2 seconds on 3G
```

### 2.3 File Structure
```
/src
  /engine
    taxCalculator.js       ← Pure tax math. No UI dependencies.
    hraCalculator.js       ← HRA triple-lock formula
    deductionsEngine.js    ← All 80C, 80D, 80CCD logic
    perquisiteEngine.js    ← Exempt perquisite calculations
    marginalRelief.js      ← Marginal relief edge case handler
    regimeAdvisor.js       ← Which regime is better + why
    secretsEngine.js       ← Hidden insights trigger logic
    salaryDecoder.js       ← Reverse-calculate gross from take-home
  /wizard
    WizardController.jsx   ← Step routing + state management
    Step01_TakeHome.jsx
    Step02_SalarySlip.jsx
    Step03_AgeCity.jsx
    Step04_Rent.jsx
    Step05_HomeLoan.jsx
    Step06_PF.jsx
    Step07_Investments.jsx
    Step08_NPS.jsx
    Step09_HealthInsurance.jsx
    Step10_EducationLoan.jsx
    Step11_OtherIncome.jsx
    Step12_Perks.jsx
  /components
    LivePreviewPanel.jsx
    SlabBreakdown.jsx
    DeductionTracker.jsx
    RegimeBadge.jsx
    NumberTicker.jsx       ← Animated number transitions
    FAQBox.jsx
    ProgressBar.jsx
    InputField.jsx
    ToggleSwitch.jsx
    Tooltip.jsx
  /results
    ResultPage.jsx
    VerdictSection.jsx
    ComparisonTable.jsx
    SecretsSection.jsx
    EducationLayer.jsx
    NextActions.jsx
    Disclaimer.jsx
  /landing
    LandingPage.jsx
    AnimatedPreview.jsx
    PainPointCards.jsx
  /hooks
    useTaxCalculation.js
    useWizardState.js
    useURLState.js
  /styles
    tokens.css             ← All design tokens
    global.css
  /data
    taxSlabs.js            ← FY 2025-26 slab data
    deductionLimits.js     ← All section limits
    cityList.js            ← Metro/non-metro classification
    industryNorms.js       ← Salary estimation defaults
  App.jsx
  main.jsx
```

### 2.4 URL State Encoding
```javascript
// Encode state to URL hash on every input change
// Example: #s=75000&r=yes&rent=20000&city=mumbai&...
// On load: parse hash and pre-fill wizard
// This makes calculations bookmarkable and shareable
```

---

## 3. DESIGN SYSTEM & TOKENS

### 3.1 Color Palette
```css
:root {
  /* Primary */
  --color-navy-900:     #0A1628;   /* Primary dark navy */
  --color-navy-800:     #0F2044;   /* Card backgrounds */
  --color-navy-700:     #1A3260;   /* Borders, dividers */
  --color-navy-600:     #1E3A8A;   /* Secondary elements */

  /* Accent */
  --color-teal-500:     #00BFA5;   /* Primary CTA, active states */
  --color-teal-400:     #26D0BA;   /* Hover states */
  --color-teal-300:     #4DE8D5;   /* Light accents */
  --color-teal-100:     #E0FAF7;   /* Teal backgrounds */

  /* Surfaces */
  --color-white:        #FFFFFF;
  --color-surface-1:    #F8FAFC;   /* Page background */
  --color-surface-2:    #F1F5F9;   /* Card background */
  --color-surface-3:    #E2E8F0;   /* Input background */

  /* Text */
  --color-text-primary:   #0A1628;
  --color-text-secondary: #475569;
  --color-text-muted:     #94A3B8;
  --color-text-inverse:   #FFFFFF;

  /* Semantic */
  --color-success:      #10B981;   /* New regime wins, positive */
  --color-warning:      #F59E0B;   /* Watch out, alerts */
  --color-error:        #EF4444;   /* Validation errors */
  --color-info:         #3B82F6;   /* Informational */

  /* Tax Slabs (for slab visualization) */
  --slab-0:   #E2E8F0;   /* Zero tax */
  --slab-5:   #BBF7D0;   /* 5% */
  --slab-10:  #86EFAC;   /* 10% */
  --slab-15:  #FDE68A;   /* 15% */
  --slab-20:  #FCA5A5;   /* 20% */
  --slab-25:  #F87171;   /* 25% */
  --slab-30:  #DC2626;   /* 30% */
}
```

### 3.2 Typography
```css
:root {
  --font-family-primary: 'Plus Jakarta Sans', 'Inter', sans-serif;
  --font-family-mono:    'JetBrains Mono', 'Courier New', monospace;

  /* Scale */
  --text-xs:    0.75rem;    /* 12px */
  --text-sm:    0.875rem;   /* 14px */
  --text-base:  1rem;       /* 16px */
  --text-lg:    1.125rem;   /* 18px */
  --text-xl:    1.25rem;    /* 20px */
  --text-2xl:   1.5rem;     /* 24px */
  --text-3xl:   1.875rem;   /* 30px */
  --text-4xl:   2.25rem;    /* 36px */
  --text-5xl:   3rem;       /* 48px */

  /* Weights */
  --font-regular:   400;
  --font-medium:    500;
  --font-semibold:  600;
  --font-bold:      700;
  --font-extrabold: 800;
}
```

### 3.3 Spacing
```css
:root {
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
}
```

### 3.4 Breakpoints
```css
/* Mobile-first */
/* xs: 375px  — iPhone SE, base */
/* sm: 640px  — large phone */
/* md: 768px  — tablet */
/* lg: 1024px — small desktop */
/* xl: 1280px — large desktop */

@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg — show live preview panel */ }
@media (min-width: 1280px) { /* xl */ }
```

### 3.5 Component Tokens
```css
:root {
  --radius-sm:   0.375rem;   /* 6px */
  --radius-md:   0.5rem;     /* 8px */
  --radius-lg:   0.75rem;    /* 12px */
  --radius-xl:   1rem;       /* 16px */
  --radius-2xl:  1.5rem;     /* 24px */
  --radius-full: 9999px;

  --shadow-sm:   0 1px 2px rgba(0,0,0,0.05);
  --shadow-md:   0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg:   0 10px 15px rgba(0,0,0,0.1);
  --shadow-xl:   0 20px 25px rgba(0,0,0,0.1);

  --transition-fast:   150ms ease;
  --transition-base:   250ms ease;
  --transition-slow:   400ms ease;

  --input-height:  3rem;       /* 48px */
  --button-height: 3rem;       /* 48px */
  --button-height-lg: 3.5rem;  /* 56px */
}
```

---

## 4. DATA MODEL — FULL VARIABLE REGISTRY

### 4.1 User Input Object
```typescript
interface UserInputs {
  // Step 1 — Take Home
  monthlyTakeHome: number;           // ₹ monthly net salary
  hasPayslip: boolean;               // true = detailed entry, false = estimation

  // Step 2 — Salary Slip (if hasPayslip = true)
  basicSalary: number;               // ₹ monthly basic
  hraReceived: number;               // ₹ monthly HRA received
  specialAllowance: number;          // ₹ monthly special allowance
  lta: number;                       // ₹ annual LTA
  otherAllowances: number;           // ₹ monthly other allowances
  employeePF: number;                // ₹ monthly employee PF deduction
  professionalTax: number;           // ₹ annual professional tax (max 2500)
  
  // Step 3 — Demographics
  dateOfBirth: string;               // YYYY-MM-DD (for age calculation)
  ageCategory: 'below60' | 'senior' | 'superSenior';  // derived from DOB
  cityType: 'metro' | 'nonMetro';   // for HRA calculation
  financialYearMonth: number;        // month joined/starting (1-12), default 1

  // Step 4 — Rent
  paysRent: boolean;
  monthlyRent: number;               // ₹ monthly rent paid
  receivesHRA: boolean;              // derives from salary slip
  // Note: If receivesHRA = false and paysRent = true → 80GG applies

  // Step 5 — Home Loan
  hasHomeLoan: boolean;
  homeLoanInterestAnnual: number;    // ₹ annual interest paid
  homeLoanPrincipalAnnual: number;   // ₹ annual principal repaid
  propertyType: 'selfOccupied' | 'letOut';
  isFirstTimeBuyer: boolean;         // for 80EEA
  stampDutyValue: number;            // ₹ property stamp duty value (80EEA eligibility: ≤ 45L)
  rentalIncomeAnnual: number;        // ₹ if let-out property

  // Step 6 — PF & NPS
  hasPF: boolean;
  employeePFAnnual: number;          // ₹ annual (derived from monthly × 12)
  hasEmployerNPS: boolean;
  employerNPSAnnual: number;         // ₹ annual employer NPS contribution
  employerNPSPercent: number;        // % of basic+DA (for validation: max 10% private, 14% govt)
  isGovtEmployee: boolean;           // affects 80CCD(2) limit: 14% vs 10%

  // Step 7 — Investments (80C bucket)
  ppfAnnual: number;                 // ₹
  elssAnnual: number;                // ₹
  licPremiumAnnual: number;          // ₹
  nscAnnual: number;                 // ₹
  sukanyaAnnual: number;             // ₹
  taxSavingFDAnnual: number;         // ₹
  tuitionFeesAnnual: number;         // ₹
  ulipAnnual: number;                // ₹
  // Note: employeePFAnnual counts toward 80C. Sum all, cap at 1,50,000.

  // Step 8 — NPS Self
  selfNPSAnnual: number;             // ₹ self NPS contribution (80CCD(1B), max 50,000)

  // Step 9 — Health Insurance
  healthInsuranceSelfAnnual: number; // ₹ premium for self + family
  healthInsuranceParentsAnnual: number; // ₹ premium for parents
  areParentsSenior: boolean;         // affects limit: 25k vs 50k for parents

  // Step 10 — Education Loan
  hasEducationLoan: boolean;
  educationLoanInterestAnnual: number; // ₹ (80E — no cap, up to 8 years)

  // Step 11 — Other Income
  savingsInterestAnnual: number;     // ₹ SB interest (80TTA/80TTB)
  fdInterestAnnual: number;          // ₹ FD interest (fully taxable, no deduction)
  rentalIncomeOtherProperty: number; // ₹ rent from property not covered in Step 5
  otherIncome: number;               // ₹ any other income (to be declared)

  // Step 12 — Perks
  hasMealCoupons: boolean;
  mealCouponMonthlyValue: number;    // ₹ (exempt up to ₹26,400/year = ₹2,200/month)
  hasMobileReimbursement: boolean;
  mobileReimbursementAnnual: number; // ₹ (fully exempt if against bills)
  hasCabFacility: boolean;           // fully tax-free
  giftFromEmployerAnnual: number;    // ₹ (exempt up to ₹5,000)
  hasUniformAllowance: boolean;
  uniformAllowanceAnnual: number;    // ₹ (exempt if for official duty)
  childrenEducationAllowance: number; // ₹ monthly (₹100/child × 2 children max)
  numberOfChildren: number;          // for children education allowance (max 2)

  // Mode Flags
  mode: 'standard' | 'newJoiner' | 'midYearHike' | 'jobSwitch';
  joiningMonth: number;              // for newJoiner mode (1-12)

  // Mid-year hike
  salaryBeforeHike: number;
  salaryAfterHike: number;
  hikeMonth: number;

  // Job switch
  incomePreviousEmployer: number;    // ₹ taxable income from previous employer
  tdsDeductedPreviousEmployer: number; // ₹ TDS already cut
}
```

### 4.2 Calculation Results Object
```typescript
interface TaxResults {
  // Gross Income
  grossAnnualIncome: number;         // Reconstructed from take-home or slip
  grossFromSlip: number;             // If salary slip entered

  // Old Regime
  old: {
    grossIncome: number;
    standardDeduction: number;       // 50,000
    hraExemption: number;
    ltaExemption: number;
    professionalTax: number;
    section80C: number;              // Capped at 1,50,000
    section80CCD1B: number;          // NPS self, max 50,000
    section80CCD2: number;           // Employer NPS
    section80D: number;
    section80E: number;
    section24b: number;
    section80EEA: number;
    section80G: number;
    section80TTA: number;            // or 80TTB for senior
    section80GG: number;
    perquisiteExemptions: number;
    totalDeductions: number;
    taxableIncome: number;
    taxBeforeCess: number;
    rebate87A: number;               // max 12,500 if taxable ≤ 5L
    taxAfterRebate: number;
    cess: number;                    // 4%
    totalTax: number;
    effectiveRate: number;           // %
    monthlyTDS: number;
    slabBreakdown: SlabBreakdown[];
  };

  // New Regime
  new: {
    grossIncome: number;
    standardDeduction: number;       // 75,000
    section80CCD2: number;           // Employer NPS (allowed)
    professionalTax: number;         // allowed
    familyPensionDeduction: number;  // 25,000 or 1/3rd
    totalDeductions: number;
    taxableIncome: number;
    taxBeforeCess: number;
    rebate87A: number;               // max 60,000 if taxable ≤ 12L
    marginalRelief: number;          // if applicable
    taxAfterRebate: number;
    cess: number;
    totalTax: number;
    effectiveRate: number;
    monthlyTDS: number;
    slabBreakdown: SlabBreakdown[];
  };

  // Recommendation
  recommendedRegime: 'old' | 'new';
  savings: number;                   // ₹ saved by choosing recommended regime
  savingsPercent: number;            // % savings

  // Secrets
  secrets: Secret[];                 // Array of triggered insights
  nextActions: Action[];

  // 80C Summary
  total80C: number;                  // Sum of all 80C components
  remaining80C: number;              // 1,50,000 - total80C
}

interface SlabBreakdown {
  label: string;       // e.g., "₹8L – ₹12L"
  rate: number;        // e.g., 10
  incomeInSlab: number;
  taxInSlab: number;
}

interface Secret {
  id: string;
  title: string;
  body: string;
  potentialSaving: number;    // ₹ if applicable
  priority: 'high' | 'medium' | 'low';
}
```

---

## 5. TAX ENGINE — COMPLETE CALCULATION LOGIC

### 5.1 Constants
```javascript
// taxSlabs.js
export const NEW_REGIME_SLABS_FY2526 = [
  { min: 0,         max: 400000,  rate: 0   },
  { min: 400000,    max: 800000,  rate: 0.05 },
  { min: 800000,    max: 1200000, rate: 0.10 },
  { min: 1200000,   max: 1600000, rate: 0.15 },
  { min: 1600000,   max: 2000000, rate: 0.20 },
  { min: 2000000,   max: 2400000, rate: 0.25 },
  { min: 2400000,   max: Infinity, rate: 0.30 },
];

export const OLD_REGIME_SLABS_BELOW60 = [
  { min: 0,        max: 250000,   rate: 0    },
  { min: 250000,   max: 500000,   rate: 0.05 },
  { min: 500000,   max: 1000000,  rate: 0.20 },
  { min: 1000000,  max: Infinity, rate: 0.30 },
];

export const OLD_REGIME_SLABS_SENIOR = [  // 60-79
  { min: 0,        max: 300000,   rate: 0    },
  { min: 300000,   max: 500000,   rate: 0.05 },
  { min: 500000,   max: 1000000,  rate: 0.20 },
  { min: 1000000,  max: Infinity, rate: 0.30 },
];

export const OLD_REGIME_SLABS_SUPER_SENIOR = [  // 80+
  { min: 0,        max: 500000,   rate: 0    },
  { min: 500000,   max: 1000000,  rate: 0.20 },
  { min: 1000000,  max: Infinity, rate: 0.30 },
];

export const DEDUCTION_LIMITS = {
  STANDARD_DEDUCTION_NEW:    75000,
  STANDARD_DEDUCTION_OLD:    50000,
  SECTION_80C_CAP:           150000,
  SECTION_80CCD_1B:          50000,
  SECTION_80CCD_2_PRIVATE:   0.10,    // 10% of basic+DA
  SECTION_80CCD_2_GOVT:      0.14,    // 14% of basic+DA
  SECTION_80D_SELF:          25000,
  SECTION_80D_PARENTS:       25000,
  SECTION_80D_PARENTS_SR:    50000,
  SECTION_80TTA:             10000,
  SECTION_80TTB:             100000,  // senior only
  SECTION_24B_SELF_OCC:      200000,
  SECTION_80EEA:             150000,
  SECTION_80EEA_STAMP_MAX:   4500000,
  REBATE_87A_OLD:            12500,
  REBATE_87A_OLD_LIMIT:      500000,
  REBATE_87A_NEW:            60000,
  REBATE_87A_NEW_LIMIT:      1200000,
  CESS_RATE:                 0.04,
  GRATUITY_EXEMPT:           2000000,
  LEAVE_ENCASHMENT_EXEMPT:   2500000,
  MEAL_COUPON_ANNUAL:        26400,
  GIFT_EMPLOYER_ANNUAL:      5000,
  PROFESSIONAL_TAX_MAX:      2500,
  FAMILY_PENSION_STD_DED:    25000,
  FAMILY_PENSION_STD_PCT:    1/3,
  MARGINAL_RELIEF_THRESHOLD: 1200000,  // new regime
  MARGINAL_RELIEF_SALARIED:  1275000,  // 12L + 75K std deduction
};
```

### 5.2 Core Tax Computation Function
```javascript
/**
 * calculateSlabTax(income, slabs)
 * Pure function. Computes tax for given income against slab array.
 * Returns total tax and per-slab breakdown.
 */
function calculateSlabTax(income, slabs) {
  let totalTax = 0;
  const breakdown = [];

  for (const slab of slabs) {
    if (income <= slab.min) break;

    const taxableInSlab = Math.min(income, slab.max) - slab.min;
    const taxInSlab = taxableInSlab * slab.rate;
    totalTax += taxInSlab;

    breakdown.push({
      label: formatSlabLabel(slab),
      rate: slab.rate * 100,
      incomeInSlab: taxableInSlab,
      taxInSlab: taxInSlab,
    });
  }

  return { totalTax, breakdown };
}
```

### 5.3 HRA Calculation — Triple Lock Rule
```javascript
/**
 * calculateHRAExemption(inputs)
 * The Triple Lock Rule: exemption = MIN of three values.
 *
 * Lock 1: Actual HRA received from employer (annual)
 * Lock 2: Rent paid - 10% of basic salary (annual). If negative → 0
 * Lock 3: 50% of basic salary (metro) OR 40% of basic salary (non-metro)
 *
 * Edge cases:
 * - If rent ≤ 10% of annual basic → Lock 2 = 0 → HRA exemption = 0
 * - If employee doesn't receive HRA → 0 (use 80GG instead)
 * - Metro cities: Mumbai, Delhi, Chennai, Kolkata ONLY
 */
function calculateHRAExemption(inputs) {
  if (!inputs.receivesHRA || !inputs.paysRent) return 0;

  const annualHRA = inputs.hraReceived * 12;
  const annualBasic = inputs.basicSalary * 12;
  const annualRent = inputs.monthlyRent * 12;

  const lock1 = annualHRA;
  const lock2 = Math.max(0, annualRent - (0.10 * annualBasic));
  const lock3 = inputs.cityType === 'metro'
    ? 0.50 * annualBasic
    : 0.40 * annualBasic;

  const exemption = Math.min(lock1, lock2, lock3);

  return {
    exemption: Math.round(exemption),
    lock1,
    lock2,
    lock3,
    bindingLock: [lock1, lock2, lock3].indexOf(exemption) + 1,
    // bindingLock tells the UI which lock is limiting the exemption
  };
}
```

### 5.4 80C Aggregation with Cap
```javascript
function calculate80C(inputs) {
  const components = {
    employeePF:   inputs.employeePFAnnual || 0,
    ppf:          inputs.ppfAnnual || 0,
    elss:         inputs.elssAnnual || 0,
    lic:          inputs.licPremiumAnnual || 0,
    nsc:          inputs.nscAnnual || 0,
    sukanya:      inputs.sukanyaAnnual || 0,
    taxSavingFD:  inputs.taxSavingFDAnnual || 0,
    tuitionFees:  inputs.tuitionFeesAnnual || 0,
    ulip:         inputs.ulipAnnual || 0,
    // NOTE: Home loan principal also goes in 80C
    homeLoanPrincipal: inputs.hasHomeLoan ? inputs.homeLoanPrincipalAnnual || 0 : 0,
  };

  const rawTotal = Object.values(components).reduce((a, b) => a + b, 0);
  const claimedAmount = Math.min(rawTotal, DEDUCTION_LIMITS.SECTION_80C_CAP);
  const remainingLimit = Math.max(0, DEDUCTION_LIMITS.SECTION_80C_CAP - rawTotal);

  return { components, rawTotal, claimedAmount, remainingLimit };
}
```

### 5.5 80CCD(2) — Employer NPS (Works in BOTH Regimes)
```javascript
/**
 * CRITICAL: Employer NPS deduction under 80CCD(2) is available in BOTH regimes.
 * This is the most missed tax saving for salaried employees.
 *
 * Limit: 10% of (Basic + DA) for private employees
 *        14% of (Basic + DA) for government employees
 *
 * This is OVER AND ABOVE the 80C limit of ₹1.5L.
 */
function calculateEmployerNPS(inputs) {
  if (!inputs.hasEmployerNPS) return 0;

  const annualBasic = inputs.basicSalary * 12;
  const limitPercent = inputs.isGovtEmployee
    ? DEDUCTION_LIMITS.SECTION_80CCD_2_GOVT
    : DEDUCTION_LIMITS.SECTION_80CCD_2_PRIVATE;

  const maxAllowed = annualBasic * limitPercent;
  const actualContribution = inputs.employerNPSAnnual;

  return Math.min(actualContribution, maxAllowed);
}
```

### 5.6 80D — Health Insurance
```javascript
function calculate80D(inputs) {
  const selfLimit = DEDUCTION_LIMITS.SECTION_80D_SELF;         // 25,000
  const parentsLimit = inputs.areParentsSenior
    ? DEDUCTION_LIMITS.SECTION_80D_PARENTS_SR                  // 50,000
    : DEDUCTION_LIMITS.SECTION_80D_PARENTS;                    // 25,000

  const selfClaimed   = Math.min(inputs.healthInsuranceSelfAnnual || 0, selfLimit);
  const parentsClaimed = Math.min(inputs.healthInsuranceParentsAnnual || 0, parentsLimit);

  return {
    selfClaimed,
    parentsClaimed,
    total: selfClaimed + parentsClaimed,
    selfLimit,
    parentsLimit,
  };
}
```

### 5.7 Section 80GG — Rent without HRA
```javascript
/**
 * 80GG: For employees who pay rent but do NOT receive HRA in salary.
 * Cannot claim both HRA exemption AND 80GG — they are mutually exclusive.
 *
 * 80GG deduction = MINIMUM of:
 * (1) ₹5,000/month = ₹60,000/year
 * (2) 25% of total income (before this deduction)
 * (3) Rent paid - 10% of total income
 */
function calculate80GG(inputs, grossIncome) {
  if (inputs.receivesHRA) return 0;  // Can't claim both
  if (!inputs.paysRent) return 0;

  const annualRent = inputs.monthlyRent * 12;

  const lock1 = 60000;
  const lock2 = 0.25 * grossIncome;
  const lock3 = Math.max(0, annualRent - (0.10 * grossIncome));

  return Math.round(Math.min(lock1, lock2, lock3));
}
```

### 5.8 Section 24(b) — Home Loan Interest
```javascript
function calculateHomeLoanInterestDeduction(inputs) {
  if (!inputs.hasHomeLoan) return 0;

  if (inputs.propertyType === 'letOut') {
    // No cap on let-out property — deduct full interest
    // But rental income must also be added to income
    return inputs.homeLoanInterestAnnual;
  }

  // Self-occupied: cap at ₹2,00,000
  return Math.min(inputs.homeLoanInterestAnnual, DEDUCTION_LIMITS.SECTION_24B_SELF_OCC);
}
```

### 5.9 Section 80EEA — First-Time Buyer Additional Deduction
```javascript
/**
 * 80EEA eligibility:
 * - First-time home buyer
 * - Stamp duty value of property ≤ ₹45 lakh
 * - Additional deduction of ₹1.5L on home loan interest
 * - Over and above Section 24(b) ₹2L
 * - Only for old regime
 */
function calculate80EEA(inputs) {
  if (!inputs.isFirstTimeBuyer) return 0;
  if (inputs.stampDutyValue > DEDUCTION_LIMITS.SECTION_80EEA_STAMP_MAX) return 0;
  if (inputs.propertyType !== 'selfOccupied') return 0;

  // Only applies to interest beyond 24(b) cap
  const interestBeyond24b = Math.max(
    0,
    inputs.homeLoanInterestAnnual - DEDUCTION_LIMITS.SECTION_24B_SELF_OCC
  );

  return Math.min(interestBeyond24b, DEDUCTION_LIMITS.SECTION_80EEA);
}
```

### 5.10 Perquisite Exemptions
```javascript
function calculatePerquisiteExemptions(inputs) {
  const exemptions = {};

  // Meal coupons: ₹50 per meal × 2 meals × 22 working days × 12 months = ₹26,400
  if (inputs.hasMealCoupons) {
    const annual = inputs.mealCouponMonthlyValue * 12;
    exemptions.mealCoupons = Math.min(annual, DEDUCTION_LIMITS.MEAL_COUPON_ANNUAL);
    exemptions.mealCouponsTaxable = Math.max(0, annual - exemptions.mealCoupons);
  }

  // Mobile/internet reimbursement: fully exempt if against bills
  if (inputs.hasMobileReimbursement) {
    exemptions.mobileReimbursement = inputs.mobileReimbursementAnnual;
  }

  // Cab facility: fully tax-free (zero perquisite tax)
  if (inputs.hasCabFacility) {
    exemptions.cabFacility = 0; // No monetary value to enter, just flag
  }

  // Gifts from employer: exempt up to ₹5,000/year
  if (inputs.giftFromEmployerAnnual > 0) {
    exemptions.gifts = Math.min(inputs.giftFromEmployerAnnual, DEDUCTION_LIMITS.GIFT_EMPLOYER_ANNUAL);
    exemptions.giftsTaxable = Math.max(0, inputs.giftFromEmployerAnnual - exemptions.gifts);
  }

  // Children education allowance: ₹100/month per child, max 2 children
  const childrenCount = Math.min(inputs.numberOfChildren || 0, 2);
  exemptions.childrenEducation = childrenCount * 100 * 12;

  const totalExempt = Object.values(exemptions)
    .filter((_, i) => !['mealCouponsTaxable', 'giftsTaxable'].includes(Object.keys(exemptions)[i]))
    .reduce((a, b) => typeof b === 'number' ? a + b : a, 0);

  return { exemptions, totalExempt };
}
```

### 5.11 Marginal Relief — New Regime (Critical Edge Case)
```javascript
/**
 * MARGINAL RELIEF — New Regime
 *
 * Problem: At ₹12,00,000 taxable income → tax = 0 (after 87A rebate of ₹60,000)
 *          At ₹12,00,001 → 87A rebate is lost → tax = ₹80,000 suddenly
 *          This is a "cliff" — earning ₹1 extra costs ₹80,000 in tax.
 *
 * Marginal Relief Rule:
 *   Tax payable cannot EXCEED the income above ₹12,00,000.
 *   i.e., if taxableIncome = ₹12,10,000:
 *     - Normal tax (no rebate) = ~₹90,000
 *     - Income above ₹12L = ₹10,000
 *     - Tax is capped at ₹10,000 (marginal relief applies)
 *
 * For salaried (standard deduction ₹75,000):
 *   Zero-tax threshold extends to ₹12,75,000 gross.
 *   Marginal relief applies between ₹12,75,001 and some higher amount.
 *
 * Marginal relief = max(0, normalTax - (taxableIncome - 1200000))
 */
function calculateMarginalRelief(taxableIncome, taxBeforeRelief) {
  // Only applies in new regime when taxable income slightly exceeds ₹12L
  if (taxableIncome <= 1200000) return 0;

  // Calculate tax at exactly ₹12L (should be 0 due to rebate)
  const taxAt12L = 0; // rebate covers full tax at 12L

  // Income above 12L threshold
  const incomeAboveThreshold = taxableIncome - 1200000;

  // Marginal relief: tax cannot exceed income above threshold
  const relief = Math.max(0, taxBeforeRelief - incomeAboveThreshold);

  return Math.round(relief);
}
```

### 5.12 Main Tax Calculation Orchestrator
```javascript
/**
 * calculateTax(inputs) → TaxResults
 * This is the single entry point for all tax calculations.
 * Pure function — same inputs always produce same outputs.
 */
export function calculateTax(inputs) {
  // ── STEP 1: Build Gross Income ──────────────────────────────────────────────
  const annualBasic = inputs.basicSalary * 12;
  const annualHRA   = inputs.hraReceived * 12;
  const annualSpecial = inputs.specialAllowance * 12;
  const annualOther = inputs.otherAllowances * 12;

  let grossIncome = annualBasic + annualHRA + annualSpecial + annualOther + inputs.lta;

  // Add FD interest and other taxable income
  grossIncome += (inputs.fdInterestAnnual || 0);
  grossIncome += (inputs.otherIncome || 0);

  // Let-out rental income (net of 30% standard deduction)
  if (inputs.propertyType === 'letOut' && inputs.rentalIncomeAnnual > 0) {
    const netRentalIncome = inputs.rentalIncomeAnnual * 0.70; // 30% std ded on rental
    const netRentalAfterInterest = netRentalIncome - inputs.homeLoanInterestAnnual;
    grossIncome += Math.max(0, netRentalAfterInterest);
    // Note: if net rental is negative, it can offset other income (set-off)
  }

  // ── STEP 2: Old Regime Calculations ────────────────────────────────────────
  const hraResult    = calculateHRAExemption(inputs);
  const section80C   = calculate80C(inputs);
  const section80D   = calculate80D(inputs);
  const employerNPS  = calculateEmployerNPS(inputs);
  const selfNPS      = Math.min(inputs.selfNPSAnnual || 0, DEDUCTION_LIMITS.SECTION_80CCD_1B);
  const section80GG  = calculate80GG(inputs, grossIncome);
  const perquisites  = calculatePerquisiteExemptions(inputs);

  const homeLoanInterestDeduction = calculateHomeLoanInterestDeduction(inputs);
  const section80EEA = calculate80EEA(inputs);

  // 80TTA or 80TTB
  let interestDeduction = 0;
  if (inputs.ageCategory === 'superSenior' || inputs.ageCategory === 'senior') {
    interestDeduction = Math.min(
      (inputs.savingsInterestAnnual || 0) + (inputs.fdInterestAnnual || 0),
      DEDUCTION_LIMITS.SECTION_80TTB
    );
  } else {
    interestDeduction = Math.min(inputs.savingsInterestAnnual || 0, DEDUCTION_LIMITS.SECTION_80TTA);
  }

  const profTax = Math.min(inputs.professionalTax || 0, DEDUCTION_LIMITS.PROFESSIONAL_TAX_MAX);
  const educationLoanInterest = inputs.hasEducationLoan ? (inputs.educationLoanInterestAnnual || 0) : 0;

  const oldTotalDeductions =
    DEDUCTION_LIMITS.STANDARD_DEDUCTION_OLD +
    hraResult.exemption +
    (inputs.lta || 0) +  // LTA exempt (actual travel)
    profTax +
    section80C.claimedAmount +
    selfNPS +
    employerNPS +
    section80D.total +
    educationLoanInterest +
    homeLoanInterestDeduction +
    section80EEA +
    interestDeduction +
    section80GG +
    perquisites.totalExempt;

  let oldTaxableIncome = Math.max(0, grossIncome - oldTotalDeductions);

  // Determine correct slab set
  const oldSlabs = inputs.ageCategory === 'superSenior'
    ? OLD_REGIME_SLABS_SUPER_SENIOR
    : inputs.ageCategory === 'senior'
      ? OLD_REGIME_SLABS_SENIOR
      : OLD_REGIME_SLABS_BELOW60;

  const { totalTax: oldTaxBase, breakdown: oldBreakdown } = calculateSlabTax(oldTaxableIncome, oldSlabs);

  // Old regime 87A rebate
  let oldRebate = 0;
  if (oldTaxableIncome <= DEDUCTION_LIMITS.REBATE_87A_OLD_LIMIT) {
    oldRebate = Math.min(oldTaxBase, DEDUCTION_LIMITS.REBATE_87A_OLD);
  }

  const oldTaxAfterRebate = Math.max(0, oldTaxBase - oldRebate);
  const oldCess = Math.round(oldTaxAfterRebate * DEDUCTION_LIMITS.CESS_RATE);
  const oldTotalTax = oldTaxAfterRebate + oldCess;

  // ── STEP 3: New Regime Calculations ────────────────────────────────────────
  const newDeductions =
    DEDUCTION_LIMITS.STANDARD_DEDUCTION_NEW +
    employerNPS +         // 80CCD(2) — allowed in new regime
    profTax;              // allowed in new regime

  let newTaxableIncome = Math.max(0, grossIncome - newDeductions);

  const { totalTax: newTaxBase, breakdown: newBreakdown } = calculateSlabTax(newTaxableIncome, NEW_REGIME_SLABS_FY2526);

  // New regime 87A rebate
  let newRebate = 0;
  if (newTaxableIncome <= DEDUCTION_LIMITS.REBATE_87A_NEW_LIMIT) {
    newRebate = Math.min(newTaxBase, DEDUCTION_LIMITS.REBATE_87A_NEW);
  }

  let newTaxAfterRebate = Math.max(0, newTaxBase - newRebate);

  // Marginal relief
  const marginalRelief = calculateMarginalRelief(newTaxableIncome, newTaxAfterRebate);
  newTaxAfterRebate = Math.max(0, newTaxAfterRebate - marginalRelief);

  const newCess = Math.round(newTaxAfterRebate * DEDUCTION_LIMITS.CESS_RATE);
  const newTotalTax = newTaxAfterRebate + newCess;

  // ── STEP 4: Recommendation ─────────────────────────────────────────────────
  const recommendedRegime = newTotalTax <= oldTotalTax ? 'new' : 'old';
  const savings = Math.abs(oldTotalTax - newTotalTax);

  // ── STEP 5: Assemble Results ────────────────────────────────────────────────
  return {
    grossAnnualIncome: Math.round(grossIncome),
    old: {
      grossIncome: Math.round(grossIncome),
      standardDeduction: DEDUCTION_LIMITS.STANDARD_DEDUCTION_OLD,
      hraExemption: Math.round(hraResult.exemption),
      ltaExemption: inputs.lta || 0,
      professionalTax: profTax,
      section80C: section80C.claimedAmount,
      section80CCD1B: selfNPS,
      section80CCD2: Math.round(employerNPS),
      section80D: section80D.total,
      section80E: educationLoanInterest,
      section24b: Math.round(homeLoanInterestDeduction),
      section80EEA: section80EEA,
      section80TTA: interestDeduction,
      section80GG: section80GG,
      perquisiteExemptions: Math.round(perquisites.totalExempt),
      totalDeductions: Math.round(oldTotalDeductions),
      taxableIncome: Math.round(oldTaxableIncome),
      taxBeforeCess: Math.round(oldTaxBase),
      rebate87A: oldRebate,
      taxAfterRebate: Math.round(oldTaxAfterRebate),
      cess: oldCess,
      totalTax: oldTotalTax,
      effectiveRate: grossIncome > 0 ? ((oldTotalTax / grossIncome) * 100).toFixed(2) : 0,
      monthlyTDS: Math.round(oldTotalTax / 12),
      slabBreakdown: oldBreakdown,
    },
    new: {
      grossIncome: Math.round(grossIncome),
      standardDeduction: DEDUCTION_LIMITS.STANDARD_DEDUCTION_NEW,
      section80CCD2: Math.round(employerNPS),
      professionalTax: profTax,
      totalDeductions: Math.round(newDeductions),
      taxableIncome: Math.round(newTaxableIncome),
      taxBeforeCess: Math.round(newTaxBase),
      rebate87A: newRebate,
      marginalRelief: marginalRelief,
      taxAfterRebate: Math.round(newTaxAfterRebate),
      cess: newCess,
      totalTax: newTotalTax,
      effectiveRate: grossIncome > 0 ? ((newTotalTax / grossIncome) * 100).toFixed(2) : 0,
      monthlyTDS: Math.round(newTotalTax / 12),
      slabBreakdown: newBreakdown,
    },
    recommendedRegime,
    savings,
    savingsPercent: oldTotalTax > 0 ? ((savings / Math.max(oldTotalTax, newTotalTax)) * 100).toFixed(1) : 0,
    total80C: section80C.rawTotal,
    remaining80C: section80C.remainingLimit,
    hraDetail: hraResult,
  };
}
```

### 5.13 Gross Income Reverse-Calculator
```javascript
/**
 * When user enters monthly take-home, estimate gross salary.
 * Approximation model — will be refined when salary slip is entered.
 *
 * Standard approximation:
 * - Employee PF = 12% of basic (capped at ₹1,800/month for basic ≤ ₹15,000)
 * - Professional tax ≈ ₹200/month (state-dependent)
 * - Income tax ≈ variable (estimated)
 * - Basic ≈ 40–50% of gross
 * - HRA ≈ 40–50% of basic
 * - Special allowance = remainder
 *
 * This is an estimate. Salary slip entry overrides it.
 */
function reverseCalculateGross(monthlyTakeHome) {
  // Iterative approach: start with gross ≈ takeHome × 1.25, refine
  let estimatedGross = monthlyTakeHome * 1.30;

  for (let i = 0; i < 5; i++) {
    const estimatedBasic = estimatedGross * 0.40;
    const estimatedPF = Math.min(estimatedBasic * 0.12, 1800);
    const profTax = 200;
    const estimatedAnnualTax = approximateTax(estimatedGross * 12);
    const estimatedMonthlyTax = estimatedAnnualTax / 12;

    const computedTakeHome = estimatedGross - estimatedPF - profTax - estimatedMonthlyTax;
    const error = monthlyTakeHome - computedTakeHome;
    estimatedGross += error;
  }

  return Math.round(estimatedGross);
}
```

---

## 6. LANDING PAGE

### 6.1 Layout (Top to Bottom)
```
┌─────────────────────────────────────────┐
│  NAVBAR (sticky)                        │
│  Logo: TaxTruth India    [Calculate →]  │
├─────────────────────────────────────────┤
│  HERO SECTION                           │
│                                         │
│  "Find out in 3 minutes which tax       │
│   regime saves you more money."         │
│                                         │
│  Sub: "We ask what hits your bank       │
│   account — not your CTC.               │
│   No jargon. No signup. 100% free."     │
│                                         │
│  [Calculate My Tax — It's Free →]       │
│                                         │
│  TRUST ROW:                             │
│  🔒 Browser-only  📵 No signup  🚫 No ads│
├─────────────────────────────────────────┤
│  ANIMATED PREVIEW                       │
│  (Live dummy results screen preview)    │
│  Shows regime comparison, savings badge │
│  Slowly animates numbers changing       │
├─────────────────────────────────────────┤
│  PAIN POINTS (3 cards)                  │
│  Card 1: "CTC confusion"                │
│  Card 2: "Hidden regime bias"           │
│  Card 3: "CA knowledge locked away"     │
├─────────────────────────────────────────┤
│  SECRETS TEASER                         │
│  "What your CA might not volunteer..."  │
│  3 blurred secret cards with titles     │
│  [Unlock your secrets →]                │
├─────────────────────────────────────────┤
│  WHO THIS IS FOR (horizontal scroll)    │
│  First job · Post-appraisal · Job switch│
│  Senior citizen · Home loan holder      │
├─────────────────────────────────────────┤
│  FINAL CTA                              │
│  "3 minutes. Free. No signup."          │
│  [Start Now →]                          │
├─────────────────────────────────────────┤
│  FOOTER                                 │
│  "Not affiliated with the Indian        │
│   government or any financial product." │
└─────────────────────────────────────────┘
```

### 6.2 Pain Point Cards — Full Copy
```
Card 1:
  Icon: 😤
  Headline: "They ask for your CTC. You don't know yours."
  Body: "Most calculators start with CTC. Most employees only know what hits their
  bank account. We start with your take-home — and work backward."

Card 2:
  Icon: 🕵️
  Headline: "They hide which regime is better to sell you products."
  Body: "Platforms that compare regimes also sell you mutual funds, insurance, and
  loans. Their 'recommendation' has a conflict of interest. Ours doesn't. We sell nothing."

Card 3:
  Icon: 💡
  Headline: "A CA knows 12 things about your tax you probably don't."
  Body: "Employer NPS in both regimes. Marginal relief. Meal coupon exemptions. Cab
  facility perks. Section 89 relief. We surface all of it — for free."
```

### 6.3 Secrets Teaser Cards (Blurred)
```
Card 1: "Your employer could legally increase your take-home by ₹X without
         changing your CTC. Most HR teams haven't told you."
Card 2: "If your income is between ₹12L–₹12.75L, you almost certainly owe
         less tax than you think. Marginal relief applies."
Card 3: "₹26,400 per year is sitting unclaimed for most employees — 
         and it takes one conversation with HR."
[Show fully after user completes calculation]
```

---

## 7. INPUT WIZARD — ALL SCREENS

### 7.1 Wizard Shell (Persistent across all steps)
```
┌─────────────────────────────────────────────────────────────┐
│  [← Back]      Step 3 of 12         [Save & Continue →]    │
│  ●●●○○○○○○○○○  PROGRESS BAR                                 │
├─────────────────────┬───────────────────────────────────────┤
│                     │                                       │
│   QUESTION AREA     │   LIVE PREVIEW PANEL (desktop only)   │
│   (full width       │   (hidden on mobile; collapsible      │
│    on mobile)       │    bottom drawer on mobile)           │
│                     │                                       │
└─────────────────────┴───────────────────────────────────────┘
```

**Persistent elements:**
- Step counter (e.g., "Step 3 of 12")
- Progress bar (dots or segmented)
- Back button (step 1 → back goes to landing page)
- Continue/Next button (disabled until valid input)
- Live preview panel (desktop: right panel | mobile: collapsible drawer)
- "Skip this step" link where applicable

---

### 7.2 STEP 1 — Monthly Take-Home

**Screen title:** "Let's start with what you actually earn."

**Primary question:** "What amount lands in your bank account every month?"

**Sub-label:** "This is your salary after PF, professional tax, and income tax is already cut. Check your last month's bank credit."

**Input:**
```
Label: Monthly take-home salary
Type: Number input (currency)
Prefix: ₹
Placeholder: e.g., 65,000
Validation:
  - Min: ₹10,000 (below this → "That seems very low — double-check")
  - Max: ₹5,00,00,000 (above this → out of scope)
  - Required: Yes
  - Format: Comma-separated display (65,000 not 65000)
  - Integer only (no paisa at this stage)
Error message: "Please enter a valid monthly amount between ₹10,000 and ₹50,00,000"
Warning message: "Amount above ₹10L/month? Our tool works, but some high-income scenarios (surcharge) may not apply. Verify with a CA."
```

**Secondary question:** "Do you have your salary slip handy?"

```
Type: Toggle / Radio buttons
Options:
  [Yes, I have my salary slip]  ← recommended, leads to Step 2A (detailed)
  [No, estimate for me]         ← leads to Step 2B (smart estimation)
Default: No selection forced
```

**FAQ Box:**
```
Q: What if my salary changes every month?
A: Use your most recent month's salary. If you received a hike recently, use the 
   new amount. You can model both scenarios later.

Q: Should I include variable pay like bonus?
A: Enter your fixed monthly take-home only. Bonus and variable pay are handled 
   separately later. One step at a time.

Q: I work part of the year. What do I enter?
A: Enter your current monthly take-home. We'll ask about your start month next.
```

**Educational note:** "Why take-home and not CTC? CTC includes employer contributions, gratuity, and benefits that never hit your bank account. Tax is calculated on what you actually receive, not on CTC. We start where you start."

---

### 7.3 STEP 2A — Salary Slip Decoder (Detailed Entry)

**Screen title:** "Let's decode your salary slip."

**Sub-label:** "Find these numbers on your payslip or offer letter. We'll handle the rest."

**Inputs:**

| Field | Label | Type | Placeholder | Validation | Note |
|-------|-------|------|-------------|------------|------|
| basicSalary | Monthly Basic Salary | Number | e.g., 30,000 | Min ₹1 | Foundation of HRA and PF calculation |
| hraReceived | Monthly HRA (House Rent Allowance) | Number | e.g., 12,000 | Min ₹0 | Enter 0 if not in your slip |
| specialAllowance | Monthly Special Allowance / Flexible Pay | Number | e.g., 18,000 | Min ₹0 | Usually the largest component after basic |
| lta | Annual LTA (Leave Travel Allowance) | Number | e.g., 30,000 | Min ₹0 | Usually shown as annual in offer letter |
| otherAllowances | Other Monthly Allowances | Number | e.g., 2,000 | Min ₹0 | Telephone, vehicle, any other |
| employeePF | Monthly Employee PF Deduction | Number | e.g., 1,800 | Min ₹0 | Shown as deduction in payslip |
| professionalTax | Annual Professional Tax Deducted | Number | e.g., 2,400 | Max ₹2,500 | State-specific, not all states have this |

**Real-time validation:**
```
If (basic + hra + special + lta/12 + other) reconstructed monthly ≈ takeHome + PF + profTax/12 + estimatedTax → show green ✓ "Slip looks consistent"
If discrepancy > 20% → show amber ⚠ "The numbers don't quite add up — double-check your slip"
```

**FAQ Box:**
```
Q: I don't see "Basic Salary" separately in my slip. What do I do?
A: Some companies show "Basic + DA" as one line. Enter that combined amount as Basic.

Q: My HRA column is blank. Does that mean I don't get HRA?
A: Yes — some companies don't provide HRA as a separate allowance. Enter 0 here. 
   If you pay rent, we'll help you claim 80GG instead.

Q: What is "Special Allowance"? My slip calls it something else.
A: It goes by many names: "Flexi Pay", "Other Allowance", "Supplementary Allowance", 
   "Variable Dearness Allowance". It's the component that makes up the remaining 
   salary after basic and HRA.

Q: My PF is more than ₹1,800/month. Is that possible?
A: Yes! If your basic salary is above ₹15,000, your company may deduct PF on the 
   full basic, not capped. Both you and your employer contribute 12% of basic.
   The full amount goes toward your 80C deduction.
```

---

### 7.4 STEP 2B — Smart Estimation (No Salary Slip)

**Screen title:** "No slip? No problem."

**Sub-label:** "We'll estimate your salary structure using industry norms. You can always refine it later."

**Inputs:**

| Field | Label | Type | Options |
|-------|-------|------|---------|
| industry | What industry do you work in? | Dropdown | IT/Software, Banking/Finance, Manufacturing, Healthcare, FMCG/Retail, Consulting, Government/PSU, Education, Other |
| role | What best describes your role? | Dropdown | Entry Level (0-2 yrs), Mid-Level (3-7 yrs), Senior (7+ yrs), Manager, Director/VP |
| companyType | Company type | Toggle | MNC / Large Indian Company / Startup / SME / Government |

**Logic:**
```javascript
// Estimation norms (approximate — clearly labeled as estimates)
const SALARY_NORMS = {
  'IT': { basicPct: 0.40, hraPct: 0.50, specialPct: 0.45 },
  'Banking': { basicPct: 0.45, hraPct: 0.40, specialPct: 0.40 },
  // etc.
};
// Apply norms to reverse-calculated gross to estimate slip components
// Show clearly: "Estimated — update when you have your slip"
```

---

### 7.5 STEP 3 — Age & City

**Screen title:** "A couple of quick personal details."

**Question 1:** "What is your date of birth?"

```
Input: Date picker (or three dropdowns: DD / MM / YYYY)
Validation:
  - Must be in past
  - Min age: 18 (younger → warning, not block)
  - Max age: 100
Auto-derives:
  - ageCategory: below60 / senior (60-79) / superSenior (80+)
  - Shows: "You are a [Senior Citizen] — special tax benefits apply ✓"
```

**Question 2:** "Which city do you live in?"

```
Input: Searchable dropdown with city list
Metro flag: Auto-set to 'metro' if: Mumbai, Delhi, Chennai, Kolkata
All other cities → 'nonMetro'
Show: "🏙️ Metro city — HRA benefit: 50% of basic salary"
      OR
      "🏘️ Non-metro city — HRA benefit: 40% of basic salary"
Alternative: Toggle "Is your city one of these? Mumbai / Delhi / Chennai / Kolkata"
```

**Question 3 (conditional):** "Did you start working partway through FY 2025-26?"

```
Show if: mode = 'newJoiner' (set if Step 1 had a joining indicator)
Input: Month selector (April 2025 to March 2026)
If joined mid-year: prorate all annual calculations accordingly
```

**FAQ Box:**
```
Q: Why does my city matter?
A: For HRA exemption, the Income Tax Act classifies Mumbai, Delhi, Chennai, and 
   Kolkata as "metro cities." People in these cities get a higher HRA exemption 
   (50% vs 40% of basic salary). Noida, Gurgaon, Bangalore, Hyderabad — all 
   non-metro for HRA purposes.

Q: I work in Bangalore but my company's registered address is Mumbai. Which do I pick?
A: Pick the city where YOU live and pay rent. That's what matters for HRA.
```

---

### 7.6 STEP 4 — Rent

**Screen title (conditional):**
- If `receivesHRA = true`: "Do you pay rent? Let's calculate your HRA exemption."
- If `receivesHRA = false` and `paysRent`: "Do you pay rent? You may qualify for a different deduction."

**Question:** "Do you live in a rented house, PG, or hostel?"

```
Type: Toggle — Yes / No
```

**If Yes — additional inputs:**

| Field | Label | Type | Validation |
|-------|-------|------|------------|
| monthlyRent | How much rent do you pay per month? | Number (₹) | Min ₹1,000 |

**Live calculation preview (inline):**
```
Shows in real-time as user types rent:
  Lock 1 — HRA received: ₹X,XXX (annual: ₹XX,XXX)
  Lock 2 — Rent paid - 10% of basic: ₹X,XXX
  Lock 3 — 50% of basic (metro): ₹X,XXX
  ──────────────────────────────────
  Your HRA exemption: ₹X,XXX ✓ (Binding: Lock 2)
```

**Edge case warnings:**
```
If (rent < basic * 0.10 / 12):
  Show amber box: "⚠️ Your rent is less than 10% of your basic salary. Unfortunately, 
  this means your HRA exemption is ₹0 — the formula requires rent to exceed 10% of 
  basic. Consider increasing rent declaration, or discuss with your CA."

If (receivesHRA = false and paysRent = true):
  Show info box: "Since you don't receive HRA in your salary, you can claim deduction 
  under Section 80GG instead. We'll calculate that automatically."
```

**FAQ Box:**
```
Q: I live in a company-provided house. Do I pay rent?
A: No — you don't pay rent. However, your company may deduct 'House Rent Perquisite' 
   from your salary. That's a taxable perquisite, and handled differently.

Q: I split rent with a flatmate. Do I enter full rent or my share?
A: Enter only your share — the amount YOU actually pay. You claim exemption only for 
   what you pay.

Q: My landlord doesn't give receipts. Can I still claim HRA?
A: Yes. For annual rent under ₹1 lakh, receipts are not mandatory. Above ₹1 lakh/year, 
   you must submit receipts AND your landlord's PAN to your employer.

Q: Can I claim HRA even if my landlord is my parent?
A: Yes — paying rent to parents is legal and the exemption is valid. Ensure the money 
   is actually transferred to their account (not cash), and they declare it as rental 
   income in their ITR.
```

---

### 7.7 STEP 5 — Home Loan

**Screen title:** "Do you have a home loan EMI?"

```
Primary toggle: Yes / No
Skip message (if No): "No problem — you can always add this later if your situation changes."
```

**If Yes:**

| Field | Label | Type | Placeholder | Validation | Note |
|-------|-------|------|-------------|------------|------|
| homeLoanInterestAnnual | Annual home loan interest paid | Number (₹) | e.g., 1,80,000 | Min ₹1 | Check your bank statement or loan statement |
| homeLoanPrincipalAnnual | Annual principal repaid | Number (₹) | e.g., 60,000 | Min ₹1 | Goes into 80C bucket |
| propertyType | Is this property... | Toggle | Self-occupied / Let out | Required | |
| isFirstTimeBuyer | Is this your first home? | Toggle | Yes / No | Required | For 80EEA eligibility |

**If isFirstTimeBuyer = Yes:**
```
Field: stampDutyValue
Label: What was the stamp duty valuation of the property?
Type: Number (₹)
Hint: "If ₹45 lakh or less, you qualify for an additional ₹1.5L interest deduction under Section 80EEA."
```

**If propertyType = Let out:**
```
Field: rentalIncomeAnnual
Label: Annual rent received from this property (₹)
Type: Number
Note: "Rental income is taxable. We'll add it to your income — but deduct 30% as standard deduction and your full loan interest."
```

**Live impact box:**
```
  Section 24(b) deduction: ₹X,XXX (capped at ₹2L for self-occupied)
  Section 80EEA: ₹X,XXX (additional, if eligible)
  80C principal: ₹X,XXX
  Total home loan benefit: ₹X,XXX → saves ₹X,XXX in tax
```

**FAQ Box:**
```
Q: My home loan is jointly taken with my spouse. How much can I claim?
A: Each co-borrower can claim deductions proportionate to their share of EMI 
   payment. If you pay 50% of the EMI, claim 50% of the interest and principal.

Q: My loan is for an under-construction property. Can I claim 24(b)?
A: You can claim interest on under-construction loans ONLY after possession. 
   Pre-EMI interest can be claimed in 5 equal installments post-possession.

Q: What if my interest is ₹3.5L but I live in the house (self-occupied)?
A: You can only claim ₹2L under 24(b) for self-occupied. If you're a first-time 
   buyer with a property ≤ ₹45L stamp value, you get an additional ₹1.5L under 
   80EEA — total ₹3.5L. That's the maximum claimable.
```

---

### 7.8 STEP 6 — PF & Employer NPS

**Screen title:** "Does your company deduct PF?"

**PF Toggle:** Yes / No

**If Yes:**
```
Auto-fill: employeePFAnnual = basicSalary × 12 × 0.12 (or actual from Step 2A)
Show: "Your Employee PF contribution (~₹X,XXX/month) automatically goes into your 
      80C deduction bucket."
80C progress bar updates live.
```

**Employer NPS Section:**

```
Question: "Does your employer contribute to NPS on your behalf?"
Toggle: Yes / No

Sub-label: "This is different from your own NPS investment. Employer NPS appears 
as a line item in your salary slip — not a deduction from take-home."

If Yes:
  Field: employerNPSAnnual
  Label: Annual employer NPS contribution (₹)
  Type: Number
  
  Field: isGovtEmployee
  Label: Are you a government employee?
  Type: Toggle
  Note: "Govt employees get a higher limit — 14% vs 10% of basic for private employees"

CRITICAL INSIGHT BOX (always show, not just if they say Yes):
┌──────────────────────────────────────────────────────────────┐
│  💡 Most employees don't know this                            │
│                                                              │
│  Employer NPS contribution is deductible under 80CCD(2)      │
│  and works in BOTH the old AND new tax regime.               │
│  It's not counted against your ₹1.5L 80C limit.             │
│                                                              │
│  If your employer doesn't offer this, you can request it     │
│  by asking HR to redirect part of your Special Allowance     │
│  into employer NPS. Your CTC stays the same.                 │
│  Your take-home increases.                                   │
│                                                              │
│  [Copy HR message template →]                                │
└──────────────────────────────────────────────────────────────┘
```

**HR Message Template:**
```
Subject: Request to restructure salary — Employer NPS contribution

Dear [HR Name],

I would like to request restructuring of my salary to include an employer 
contribution to NPS under Section 80CCD(2) of the Income Tax Act.

As per the Act, employer NPS contribution up to 10% of my basic salary 
(₹[BASIC] per month = ₹[10% of BASIC]/month) is deductible from my taxable 
income — in both the old and new tax regime. This restructuring would reduce 
my annual tax liability by ₹[SAVINGS] without affecting the company's cost.

Could you please process this for the current financial year?

Thank you.
```

**FAQ Box:**
```
Q: I don't see NPS anywhere in my salary slip. Does that mean I don't have it?
A: Yes — it means your employer hasn't set it up. This is optional for employers. 
   You can request it, but they are not obligated to comply.

Q: My employer says they can't do NPS restructuring. Is that true?
A: It's technically possible for all employers. Whether they're willing is a 
   different matter. Government employers must have it (mandatory for central 
   government employees). For private sector, it's at employer's discretion.
```

---

### 7.9 STEP 7 — Investments (80C)

**Screen title:** "Any tax-saving investments this year?"

**Sub-label:** "Section 80C lets you deduct up to ₹1.5 lakh from taxable income. These investments have already counted toward that limit:"

**80C Progress Bar (live):**
```
Already counted: Employee PF (₹X,XXX) + Home Loan Principal (₹X,XXX)
──────────────────────────────────── [████░░░░░░] ₹87,600 / ₹1,50,000
Remaining limit: ₹62,400
```

**Investment Inputs (only show if remaining 80C > 0):**

| Field | Label | Type | Tooltip |
|-------|-------|------|---------|
| ppfAnnual | PPF (Public Provident Fund) | Number | "Annual contribution to your PPF account. Min ₹500, Max ₹1.5L/year." |
| elssAnnual | ELSS Mutual Funds | Number | "Tax-saving mutual funds with 3-year lock-in. Only counted if invested this FY." |
| licPremiumAnnual | Life Insurance Premium (LIC or other) | Number | "Annual premium paid for life insurance policies (not health insurance)." |
| nscAnnual | NSC (National Savings Certificate) | Number | "Certificates purchased this year from Post Office." |
| sukanyaAnnual | Sukanya Samriddhi | Number | "Only if you have a daughter under 10 years of age." |
| taxSavingFDAnnual | 5-Year Tax Saving FD | Number | "Fixed deposit with 5-year lock-in at any bank." |
| tuitionFeesAnnual | Children's Tuition Fees | Number | "Full-time education fees for up to 2 children (school/college). Not coaching." |

**Live 80C tracker (updates as user types):**
```
┌──────────────────────────────────────────┐
│  80C Deduction Tracker                   │
│                                          │
│  Employee PF:          ₹21,600  ✓        │
│  Home Loan Principal:  ₹66,000  ✓        │
│  ELSS:                 ₹30,000           │
│  LIC Premium:          ₹15,000           │
│  ─────────────────────────────           │
│  Total:               ₹1,32,600          │
│  Remaining:            ₹17,400           │
│  [███████████░░] 88% of ₹1.5L limit     │
│                                          │
│  💡 ₹17,400 more will maximize your      │
│  80C. Consider a ₹17,400 ELSS SIP.      │
└──────────────────────────────────────────┘
```

**If 80C already maxed:**
```
Show: "✅ Your 80C is fully utilized. Nice work! Let's look at additional 
deductions beyond 80C next."
Collapse investment inputs.
```

**FAQ Box:**
```
Q: I invest in ELSS through SIP. Do I count the full year's SIP?
A: Yes — add up all 12 months of ELSS SIP for this financial year (April 2025 
   to March 2026). Even a March investment counts if units are allotted by March 31.

Q: My PF deduction is already included. Should I add it again?
A: No! Your PF (from Step 6) is already tracked in your 80C limit. Only add 
   additional investments here.

Q: I have a home loan principal. Does that count too?
A: Yes — it was counted automatically from your home loan entry. That's why 
   your starting 80C number isn't zero.
```

---

### 7.10 STEP 8 — NPS (Self Contribution)

**Screen title:** "Do you invest in NPS yourself?"

**Sub-label:** "Your own NPS investment (beyond your employer's contribution) gets a special ₹50,000 deduction under Section 80CCD(1B). This is OVER AND ABOVE your ₹1.5L 80C limit."

```
Toggle: Yes / No

If Yes:
  Field: selfNPSAnnual
  Label: Annual NPS self-contribution (₹)
  Max: ₹50,000 for this special deduction (additional contributions are claimed under 80C)
  
  Live impact: "This ₹50,000 deduction saves you ₹X,XXX in tax in Old Regime / 
               NOT available in New Regime"
```

**Important difference box:**
```
┌──────────────────────────────────────────────────────┐
│  Old Regime: Self NPS → saves up to ₹15,000 in tax  │
│  New Regime: Self NPS → NO deduction available       │
│                                                      │
│  Employer NPS (80CCD2): Works in BOTH regimes        │
│  Self NPS (80CCD1B):    Works ONLY in Old Regime     │
└──────────────────────────────────────────────────────┘
```

---

### 7.11 STEP 9 — Health Insurance

**Screen title:** "Do you pay for health insurance?"

| Field | Label | Validation | Note |
|-------|-------|------------|------|
| healthInsuranceSelfAnnual | Annual premium for your own health insurance | Min ₹0 | Include spouse and kids on same policy |
| healthInsuranceParentsAnnual | Annual premium for your parents' health insurance | Min ₹0 | Separate parental policy |
| areParentsSenior | Are your parents senior citizens (60+)? | Toggle | Higher limit: ₹50,000 vs ₹25,000 |

**Live 80D tracker:**
```
  Self + Family policy: ₹18,000 (limit: ₹25,000) [██░░] ₹7,000 remaining
  Parents policy: ₹40,000 (limit: ₹50,000 — senior citizen) [███░] ₹10,000 remaining
  Total 80D deduction: ₹58,000
  Tax saved: ₹X,XXX
```

**FAQ Box:**
```
Q: My company provides health insurance. Does that count for 80D?
A: No. Premium paid BY your employer for a group health policy is not 80D 
   deductible for you. Only premiums paid by YOU from your own pocket qualify.

Q: I pay my parents' premium by bank transfer. Does it matter whose account it comes from?
A: Yes! Payment must be in digital mode (not cash) to claim 80D. Bank transfer, 
   UPI, card all work. Cash does not qualify.

Q: Is term insurance included in 80D?
A: No. Term insurance (life insurance) goes under 80C. Health insurance (medical 
   hospitalization cover) goes under 80D.

Q: What if I have senior citizen parents but I'm not their policyholder?
A: You can only claim 80D if YOU are paying the premium. If your sibling pays, 
   they claim it. If parents pay it themselves, neither you nor they can claim 
   (since senior citizens above 75 are exempt from filing ITR now, but that's 
   a separate matter).
```

---

### 7.12 STEP 10 — Education Loan

**Screen title:** "Are you repaying an education loan?"

```
Toggle: Yes / No

If Yes:
  Field: educationLoanInterestAnnual
  Label: Annual interest paid on education loan (₹)
  Type: Number
  
  Sub-label: "Section 80E: Entire interest amount is deductible — no upper limit.
  Applies for up to 8 consecutive years from the year you start repaying."

  Info box:
  "This deduction is for loans taken for YOUR OWN higher education OR for your 
  spouse/children. The loan must be from a bank or approved financial institution."
```

**FAQ Box:**
```
Q: Is there any limit on how much I can deduct under 80E?
A: No cap. If you paid ₹1,20,000 in interest, you deduct ₹1,20,000. 
   Only the INTEREST qualifies — not the principal repayment.

Q: I took the loan from my relatives to fund college. Does that count?
A: No. The loan must be from a bank, financial institution, or approved 
   charitable institution. Family loans don't qualify.

Q: My loan was for a vocational course. Does it qualify?
A: It must be for higher education — after passing Class 12 (or equivalent).
   Regular degree and postgraduate courses qualify. Short vocational courses 
   may not.
```

---

### 7.13 STEP 11 — Other Income

**Screen title:** "Any other income to declare?"

**Sub-label:** "These are taxable — but some have deductions. Declaring them here gives you an accurate picture and avoids tax notices later."

| Field | Label | Type | Note |
|-------|-------|------|------|
| savingsInterestAnnual | Annual interest earned from savings accounts | Number | 80TTA/80TTB deduction available |
| fdInterestAnnual | Annual interest earned from Fixed Deposits | Number | Fully taxable — no deduction |
| rentalIncomeOtherProperty | Annual rent received from another property you own | Number | 30% standard deduction auto-applied |
| otherIncome | Any other income (freelance, etc.) | Number | Declare but note: freelance income has complex rules — consult CA |

**FD interest alert:**
```
If fdInterestAnnual > 0:
  Show: "⚠️ FD Interest Alert: Your ₹X,XXX FD interest is fully taxable. 
  Many people forget to declare this and receive notices from the IT department 
  later. Your Form 26AS will show this — always match it with your ITR."
```

---

### 7.14 STEP 12 — Perks & Allowances

**Screen title:** "Does your company give you any of these?"

**Sub-label:** "These are legally tax-free. Most employees don't know to claim them — or don't know to ask HR for them."

| Perk | Question | Input | Exemption |
|------|----------|-------|-----------|
| Meal Coupons | Does your company provide meal vouchers / Sodexo coupons? | Toggle + monthly value | Up to ₹26,400/year (₹2,200/month) |
| Mobile Reimbursement | Does your company reimburse your phone/internet bills? | Toggle + annual amount | Fully exempt if against bills |
| Cab Facility | Does your company provide an office cab for commute? | Toggle only | 100% tax-free |
| Gift from Employer | Did you receive any gift/voucher from your employer this year? | Number (annual) | Up to ₹5,000/year |
| Children Education Allowance | Do you have children? Does your company pay an allowance for their education? | Number of children + toggle | ₹100/child/month × 2 children max |
| Uniform Allowance | Does your role require a uniform and does your company pay for it? | Toggle + annual amount | Exempt if for official duty |

**Perks revealer box:**
```
Show to ALL users:
┌──────────────────────────────────────────────────────────────┐
│  🎁 These perks are 100% tax-free. Ask your HR:             │
│                                                              │
│  ✓ Meal coupons (Sodexo/Zeta): up to ₹26,400/year          │
│  ✓ Mobile/internet reimbursement: fully exempt               │
│  ✓ Cab for office commute: zero perquisite tax               │
│  ✓ Gifts up to ₹5,000/year                                  │
│  ✓ Books and periodicals: exempt against bills               │
│                                                              │
│  If your HR doesn't offer these, forward them this:          │
│  [Copy template for HR →]                                    │
└──────────────────────────────────────────────────────────────┘
```

**FAQ Box:**
```
Q: My company uses Zeta instead of Sodexo. Does it still count?
A: Yes — any meal card / food voucher issued by employer qualifies. 
   The tax exemption is on the benefit, not the brand.

Q: I use my personal mobile for work and my company reimburses me. Is that exempt?
A: Yes — if you submit actual bills to your company and they reimburse, 
   the reimbursement is fully exempt. If they just add a flat "phone allowance" 
   to salary without bill submission, it may be taxable.
```

---

## 8. LIVE PREVIEW PANEL

### 8.1 Layout
```
DESKTOP (right panel, sticky, 380px wide):
┌──────────────────────────────────────┐
│  📊 LIVE ESTIMATE                    │
│  (updates as you type)               │
├──────────────────────────────────────┤
│  YOUR GROSS INCOME                   │
│  ₹X,XX,XXX/year                      │
│  (₹X,XXX/month)                      │
├──────────────────────────────────────┤
│  TAX COMPARISON                      │
│  ┌─────────────┬─────────────┐       │
│  │  OLD REGIME │  NEW REGIME │       │
│  │  ₹X,XX,XXX  │  ₹X,XX,XXX  │       │
│  └─────────────┴─────────────┘       │
│                                      │
│  ┌─────────────────────────────┐     │
│  │ 🏆 New Regime saves ₹18,400 │     │
│  └─────────────────────────────┘     │
├──────────────────────────────────────┤
│  EFFECTIVE RATE                      │
│  Old: 12.4%    New: 8.7%            │
├──────────────────────────────────────┤
│  MONTHLY TDS                         │
│  Old: ₹4,233   New: ₹2,980          │
├──────────────────────────────────────┤
│  80C TRACKER                         │
│  [███████░░░] ₹1,04,600 / ₹1,50,000  │
├──────────────────────────────────────┤
│  [See Full Breakdown →]              │
└──────────────────────────────────────┘

MOBILE (collapsible bottom drawer):
- Collapsed: Shows only "Est. Tax: ₹X,XXX saved with [New/Old] Regime ▲"
- Expanded: Full panel as above
- Drawer handle: pill shape, tap to toggle
```

### 8.2 Animation Spec
```javascript
// NumberTicker component:
// When a value changes, animate from old value to new value
// Duration: 400ms
// Easing: ease-out
// For large changes (>50%): highlight with subtle yellow flash

// Color coding:
// Tax number decreases → flash green briefly
// Tax number increases → flash amber briefly
// Regime recommendation changes → slide new badge in with fade
```

### 8.3 Regime Badge
```
New Regime Recommended:
  Background: --color-teal-100
  Border: --color-teal-500
  Text: "🏆 New Regime saves you ₹XX,XXX"
  Sub: "Effective rate: X.X%"

Old Regime Recommended:
  Background: #FEF3C7 (amber-100)
  Border: #F59E0B (amber-500)
  Text: "🏆 Old Regime saves you ₹XX,XXX"
  Sub: "Your deductions make Old Regime better"

Equal (within ₹500):
  Text: "Both regimes are nearly equal"
  Sub: "New Regime is simpler — consider it by default"
```

### 8.4 Slab Visualization (in panel)
```
Mini slab bar for recommended regime:
  Each bracket colored by rate (see slab color tokens)
  User's income highlighted up to their level
  Tooltip on hover: "₹X,XXX in this bracket → ₹X,XXX tax at X%"
```

---

## 9. RESULTS PAGE

### 9.1 Section A — The Verdict
```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│         Go with the New Regime.                              │
│         You save ₹22,450 this year.                          │
│                                                              │
│  New Regime Tax:  ₹48,360   Effective Rate: 6.2%            │
│  Old Regime Tax:  ₹70,810   Effective Rate: 9.1%            │
│                                                              │
│  Your employer should deduct ₹4,030/month as TDS            │
│                                                              │
│  [📋 Copy Summary]   [🔄 Recalculate]   [📤 Share]         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Rules for verdict copy:**
```
If savings > ₹50,000: "You're leaving ₹{X} on the table. Go with {Regime}."
If savings ₹10,000–₹50,000: "Go with the {Regime}. You save ₹{X}."
If savings ₹1,000–₹10,000: "The {Regime} is better by ₹{X}. Not massive, but it adds up."
If savings < ₹1,000: "Both regimes are nearly equal (difference: ₹{X}). New Regime is simpler."
If savings = 0: "Both regimes give you the exact same tax. Choose New Regime — it's simpler to file."
```

---

### 9.2 Section B — Full Side-by-Side Comparison Table

```
                              OLD REGIME      NEW REGIME
──────────────────────────────────────────────────────────
Gross Annual Income           ₹X,XX,XXX       ₹X,XX,XXX
                              
DEDUCTIONS
Standard Deduction            ₹   50,000      ₹   75,000
HRA Exemption                 ₹   84,000      —
LTA Exemption                 ₹   30,000      —
Professional Tax              ₹    2,400      ₹    2,400
Section 80C                   ₹ 1,50,000      —
Section 80CCD(1B) NPS         ₹   50,000      —
Section 80CCD(2) Employer NPS ₹   36,000      ₹   36,000
Section 80D                   ₹   50,000      —
Section 24(b) Home Loan       ₹ 1,50,000      —
Section 80TTA                 ₹    8,000      —
──────────────────────────────────────────────────────────
TOTAL DEDUCTIONS              ₹X,XX,XXX       ₹X,XX,XXX
──────────────────────────────────────────────────────────
TAXABLE INCOME                ₹X,XX,XXX       ₹X,XX,XXX

SLAB-BY-SLAB BREAKDOWN
0% (up to ₹2.5L/₹4L)         ₹X,XXX          ₹X,XXX
5%                            ₹X,XXX          ₹X,XXX
10%                           —               ₹X,XXX
20%/15%                       ₹X,XXX          ₹X,XXX
30%/25%                       ₹X,XXX          ₹X,XXX
──────────────────────────────────────────────────────────
Tax on Slabs                  ₹X,XXX          ₹X,XXX
Section 87A Rebate            (₹X,XXX)        (₹X,XXX)
Marginal Relief               —               (₹X,XXX)
──────────────────────────────────────────────────────────
Tax After Rebate              ₹X,XXX          ₹X,XXX
Health & Education Cess (4%)  ₹X,XXX          ₹X,XXX
──────────────────────────────────────────────────────────
TOTAL TAX PAYABLE             ₹X,XX,XXX       ₹X,XX,XXX
Effective Tax Rate            X.X%            X.X%
Monthly TDS                   ₹X,XXX          ₹X,XXX
══════════════════════════════════════════════════════════
```

---

### 9.3 Section C — Secrets (The CA-Grade Intelligence Layer)

**Display logic:** Show only secrets that are relevant to the user based on their inputs. Never show all secrets to every user.

**Full Secrets Registry:**

```
SECRET_001:
  Trigger: hasEmployerNPS = false AND basicSalary > 0
  Priority: HIGH
  Title: "You're missing a tax-free salary restructuring opportunity"
  Body: "Your employer can contribute up to ₹{10% of basic}/month (₹{annual}/year) 
  to NPS on your behalf. This reduces your taxable income by ₹{annual} — 
  in BOTH regimes — without changing your CTC. That's ₹{savings} in annual tax savings.
  Ask HR to restructure your salary."
  CTA: [Copy HR message →]

SECRET_002:
  Trigger: remaining80C > 5000 AND recommendedRegime = 'old'
  Priority: HIGH
  Title: "You have ₹{remaining80C} of unused 80C limit"
  Body: "Investing ₹{remaining80C} more before March 31 in ELSS, PPF, or NSC 
  would reduce your old regime tax by ₹{taxSaved}. That's a return of 
  ₹{taxSaved} on ₹{remaining80C} invested — before any market return."

SECRET_003:
  Trigger: newTaxableIncome between 1200000 and 1275000
  Priority: HIGH
  Title: "Marginal Relief is protecting you — here's exactly what that means"
  Body: "Your taxable income of ₹{amount} falls in the zone where marginal relief 
  applies. Without relief, you'd owe ₹{normalTax}. With relief, you owe ₹{actualTax}. 
  The rule: tax cannot exceed the income above ₹12 lakh. Your relief: ₹{relief}."

SECRET_004:
  Trigger: fdInterestAnnual > 0
  Priority: MEDIUM
  Title: "Your FD interest is fully taxable — and the IT department already knows"
  Body: "₹{fdInterestAnnual} in FD interest is added to your taxable income. 
  Your bank reports this to the IT department via Form 26AS. If you don't declare 
  it, you'll get a notice. Consider switching to debt mutual funds — they had 
  indexation benefits earlier. Either way, declare it."

SECRET_005:
  Trigger: grossIncome between 1100000 and 1270000 AND recommendedRegime = 'new'
  Priority: HIGH
  Title: "You're ₹{distance} from the ₹12L zero-tax threshold"
  Body: "If your taxable income after standard deduction can be brought under 
  ₹12 lakh, your tax is ₹0 (Section 87A rebate covers it). You need to reduce 
  gross income by ₹{distance}. Options: Employer NPS (₹{npsRoom} possible), 
  NPS self-contribution via salary restructuring. Talk to HR."

SECRET_006:
  Trigger: hasMealCoupons = false
  Priority: MEDIUM
  Title: "₹26,400/year in tax-free income is sitting unclaimed"
  Body: "Meal vouchers from your employer are exempt from tax up to ₹26,400/year 
  (₹50/meal × 2 meals × 22 working days × 12 months). If your company doesn't 
  offer this, one email to HR could add ₹26,400 to your tax-free income."
  CTA: [Copy HR template →]

SECRET_007:
  Trigger: areParentsSenior = false (or parents not added) AND grossIncome > 500000
  Priority: MEDIUM
  Title: "Adding your parents to a health insurance policy saves ₹{savings} in tax"
  Body: "A ₹25,000 annual premium for a parent's health policy gives you a 
  ₹25,000 deduction in Old Regime — saving ₹{savings} in tax. If your parents 
  are above 60, the limit goes to ₹50,000. The insurance gives them coverage 
  AND you a tax break."

SECRET_008:
  Trigger: receivesHRA = false AND paysRent = true
  Priority: HIGH
  Title: "You're paying rent without HRA — Section 80GG is your backstop"
  Body: "Since your salary doesn't include HRA, you can claim Section 80GG 
  deduction for rent paid. Your calculated deduction: ₹{80GGAmount}. 
  Many salaried people in this situation don't know this exists."

SECRET_009:
  Trigger: grossIncome > 600000 (implicit — likely salaried)
  Priority: LOW
  Title: "Your cab to office may be 100% tax-free"
  Body: "Transport provided by employer for office commute is fully exempt 
  from tax — no perquisite tax applies. If your company has a cab facility 
  and you haven't declared it as a perk, you may be overpaying tax. 
  Confirm with your payroll team."

SECRET_010:
  Trigger: Always show if inputs seem complete
  Priority: LOW
  Title: "Check your Form 26AS before March 31"
  Body: "Your Form 26AS shows all TDS deducted by your employer, interest 
  payments reported by banks, and advance tax. Mismatches between your Form 16 
  and Form 26AS are the most common cause of income tax notices. 
  Download it free from the IT portal at incometax.gov.in."
```

---

### 9.4 Section D — Personalized Education Layer

For every major number in the results, show a collapsible explanation:

```
[?] What is HRA exemption?
  "Your HRA exemption of ₹84,000 is calculated using the 'Triple Lock Rule' — 
  the tax law takes the MINIMUM of three values: your actual HRA received (₹1,44,000), 
  your rent paid minus 10% of your basic salary (₹84,000), and 50% of your basic 
  since you live in a metro (₹1,80,000). The binding limit here is your rent 
  calculation (Lock 2), giving you ₹84,000."

[?] Why is the rebate ₹60,000 in New Regime?
  "Section 87A: If your taxable income is ₹12 lakh or below in the New Regime, 
  the government gives you a rebate of up to ₹60,000 — which exactly covers the 
  tax on ₹12 lakh. Result: effectively zero tax. This is why ₹12 lakh is the 
  magic threshold everyone talks about."

[?] What is marginal relief?
  "Marginal relief is a protection mechanism. Without it, earning ₹1 above ₹12 lakh 
  would trigger ₹80,000 in sudden tax — which is absurd. The rule says: tax payable 
  cannot exceed the income above ₹12 lakh. So if you earn ₹12.1 lakh taxable, 
  your maximum tax is ₹10,000 (₹12.1L - ₹12L), not ₹80,000."

[?] What is 4% Health & Education Cess?
  "After computing your tax and applying rebates, the government adds 4% on top 
  for Health & Education Cess. This goes to fund public health and education. 
  It's not avoidable — everyone pays it on any tax due."
```

---

### 9.5 Section E — Your Next 3 Actions

**Timing-aware (uses current date vs March 31 deadline):**

```javascript
function getNextActions(results, inputs, currentDate) {
  const actions = [];
  const daysToMarch31 = getDaysToMarch31(currentDate);

  if (results.remaining80C > 5000 && results.recommendedRegime === 'old') {
    actions.push({
      urgency: daysToMarch31 < 60 ? 'urgent' : 'normal',
      title: `Invest ₹${formatINR(results.remaining80C)} more before March 31`,
      body: `Maximizing 80C with ELSS or PPF will save you ₹${formatINR(results.remaining80C * 0.20)} in tax.`,
      deadline: 'March 31, 2026',
    });
  }

  if (results.recommendedRegime === 'old') {
    actions.push({
      title: 'Declare Old Regime to your employer',
      body: 'Submit a written declaration to HR/Payroll before your January payroll. '
           + 'Without this, your employer deducts TDS under New Regime by default.',
      deadline: 'Before January payroll',
    });
  }

  if (inputs.paysRent && inputs.receivesHRA) {
    actions.push({
      title: 'Submit rent receipts and landlord PAN to employer',
      body: 'To claim HRA exemption during the year (not just at ITR), submit '
           + 'rent receipts. If annual rent exceeds ₹1 lakh, landlord PAN is mandatory.',
      deadline: 'Before December payroll',
    });
  }

  // Always include
  actions.push({
    title: 'Download Form 26AS before filing ITR',
    body: 'Available free at incometax.gov.in. Match TDS with your employer Form 16. '
         + 'Any mismatch must be resolved before filing.',
    deadline: 'Before ITR filing (July 31)',
  });

  return actions.slice(0, 3);
}
```

---

### 9.6 Section F — Disclaimer
```
This is an estimate based on the information you provided. Tax calculations depend 
on many factors including your employer's interpretation of allowances, state-specific 
rules, and your complete annual income picture.

For exact figures, always cross-reference with your Form 16. For edge cases — arrears, 
multiple employers, ESOPs, property transactions — consult a Chartered Accountant.

TaxTruth India is an independent tool. It is not affiliated with the Income Tax 
Department, any CA firm, or any financial product company.
```

---

## 10. COMPONENT TREE

```
App
├── Router
│   ├── / → LandingPage
│   │   ├── Navbar
│   │   ├── HeroSection
│   │   ├── AnimatedPreview
│   │   ├── PainPointCards (×3)
│   │   ├── SecretTeaser
│   │   ├── WhoThisIsFor
│   │   └── Footer
│   │
│   ├── /calculate → WizardLayout
│   │   ├── WizardHeader (step counter + progress)
│   │   ├── WizardController (step router)
│   │   │   ├── Step01_TakeHome
│   │   │   ├── Step02A_SalarySlip
│   │   │   ├── Step02B_Estimation
│   │   │   ├── Step03_AgeCity
│   │   │   ├── Step04_Rent
│   │   │   ├── Step05_HomeLoan
│   │   │   ├── Step06_PF
│   │   │   ├── Step07_Investments
│   │   │   ├── Step08_NPS
│   │   │   ├── Step09_HealthInsurance
│   │   │   ├── Step10_EducationLoan
│   │   │   ├── Step11_OtherIncome
│   │   │   └── Step12_Perks
│   │   └── LivePreviewPanel
│   │       ├── GrossIncomeSummary
│   │       ├── RegimeBadge
│   │       ├── TaxComparison
│   │       ├── EffectiveRateDisplay
│   │       ├── MonthlyTDSDisplay
│   │       ├── DeductionTracker (80C bar)
│   │       └── SlabMiniViz
│   │
│   └── /results → ResultsPage
│       ├── VerdictSection
│       │   └── RegimeBadge (large)
│       ├── ComparisonTable
│       │   ├── RegimeColumn (×2)
│       │   └── SlabBreakdown (×2)
│       ├── SecretsSection
│       │   └── SecretCard (×n, triggered)
│       ├── EducationLayer
│       │   └── ExplainerCard (×n)
│       ├── NextActions
│       │   └── ActionCard (×3)
│       └── Disclaimer
│
└── Shared Components
    ├── InputField (label, input, error, tooltip)
    ├── ToggleSwitch
    ├── FAQBox (collapsible Q&A)
    ├── NumberTicker (animated number)
    ├── Tooltip
    ├── ProgressBar (fill bar)
    ├── CurrencyDisplay (₹ formatting)
    ├── InfoBox (blue/amber/green variants)
    └── CopyButton (copies text to clipboard)
```

---

## 11. ERROR STATES & EMPTY STATES

### 11.1 Input Validation Messages
```javascript
const VALIDATION_MESSAGES = {
  // Take-home
  takeHome_tooLow:    "That seems very low — double-check your bank credit",
  takeHome_tooHigh:   "Above ₹10L/month? This tool works, but surcharge rules (>₹50L/year) are not handled.",
  takeHome_negative:  "Please enter a positive amount",
  takeHome_required:  "We need your monthly take-home to calculate anything",

  // Salary Slip
  basic_tooHigh:      "Basic salary seems higher than your take-home — please recheck",
  slipMismatch:       "Your salary components don't add up to your take-home. Close enough is fine — we'll use the slip figures.",
  
  // HRA
  hra_noRent:         "You receive HRA but said you don't pay rent. You can still enter 0 — but your HRA exemption will be ₹0.",
  hra_lowRent:        "Your rent is less than 10% of your basic salary. HRA exemption will be ₹0 under the formula.",
  
  // Home Loan
  interest_overCap:   "Interest above ₹2L? For self-occupied property, deduction is capped at ₹2L. We've applied the cap.",
  
  // PF
  pf_overLimit:       "PF above ₹21,600/month seems high — verify with your payslip",
  
  // 80C
  c80_over150k:       "Total 80C investments exceed ₹1.5L. The excess (₹{X}) won't be deductible — we've applied the cap.",
  
  // NPS
  nps_overLimit:      "Self NPS above ₹50,000? The additional 80CCD(1B) deduction is capped at ₹50,000. Any excess is under 80C.",
  
  // 80D
  d80_cashPayment:    "Health insurance paid in cash doesn't qualify for 80D. Only digital payments are allowed.",
  
  // General
  field_required:     "This field is required to continue",
  invalid_number:     "Please enter a valid number",
  negative_number:    "Please enter a positive value",
};
```

### 11.2 Empty States
```
Wizard Step — No input yet:
  No error shown. Continue button disabled. Sub-label visible.

Live Preview Panel — Insufficient data (first 2 steps):
  Show: "Enter your salary above to see your tax estimate"
  [Placeholder skeleton bars — not numbers]

Results Page — Reached directly without completing wizard:
  Show: "Your calculation is incomplete"
  [Button: Complete the wizard →]

Zero Tax Scenario:
  Verdict: "You owe ₹0 in tax this year! 🎉"
  Sub: "Your income after deductions falls below the tax-free threshold. 
  Section 87A rebate covers any remaining tax."
  
  Still show: Full breakdown, secrets, and next actions — many zero-tax 
  earners still have unclaimed savings they don't know about.
```

---

## 12. COMPLETE COPY REGISTRY

### 12.1 Navigation & CTAs
```
Landing CTA (primary):     "Calculate My Tax — It's Free"
Landing CTA (secondary):   "See What You'll Discover"
Wizard Next button:        "Continue →"
Wizard Back button:        "← Back"
Wizard Skip button:        "Skip this step"
Results Recalculate:       "🔄 Recalculate"
Results Share:             "📤 Share my calculation"
Results Copy:              "📋 Copy summary"
```

### 12.2 Trust Signals
```
Trust bar item 1:  "🔒 100% browser-based. Nothing leaves your device."
Trust bar item 2:  "🚫 No signup. No email. No account."
Trust bar item 3:  "📵 Zero ads. Zero product recommendations."
Trust bar item 4:  "💯 Free. No premium version."
```

### 12.3 Step Titles & Sub-labels (Full)
```
Step 1:   "Let's start with what you actually earn."
          "This is your salary after PF, professional tax, and income tax is already cut."

Step 2A:  "Let's decode your salary slip."
          "Find these on your payslip or offer letter. We'll handle the rest."

Step 2B:  "No slip? No problem."
          "We'll estimate your structure. You can always add your slip details later."

Step 3:   "A couple of quick personal details."
          "These determine which tax slabs and HRA rules apply to you."

Step 4:   "Do you pay rent?"
          "This affects your HRA exemption — one of the biggest deductions for salaried employees."

Step 5:   "Do you have a home loan?"
          "Home loan comes with two major tax benefits — interest and principal."

Step 6:   "PF and employer NPS."
          "These might be the easiest tax savings you're already getting — and one you might be missing."

Step 7:   "Tax-saving investments (Section 80C)."
          "Old Regime: These reduce your taxable income by up to ₹1.5 lakh."

Step 8:   "NPS — your own contribution."
          "A separate ₹50,000 deduction on top of your ₹1.5L limit. Old Regime only."

Step 9:   "Health insurance."
          "Premiums you pay for yourself and your parents qualify for deduction."

Step 10:  "Education loan."
          "No cap. Full interest is deductible for up to 8 years."

Step 11:  "Any other income?"
          "Declaring this accurately avoids tax notices later."

Step 12:  "Company perks — the most underutilized tax savings."
          "Most employees leave thousands on the table here every year."
```

### 12.4 Tooltip Copy
```
basicSalary tooltip:     "Usually 40-50% of your CTC. It's the foundation of PF and HRA calculations."
hraReceived tooltip:     "The HRA component in your salary. Not the rent you pay — the amount your employer gives you."
hra_triple_lock tooltip: "Tax law takes the MINIMUM of 3 values. The lowest value 'locks' your exemption."
marginalRelief tooltip:  "A protection rule: your tax on income slightly above ₹12L can't exceed the extra income itself."
87A_rebate tooltip:      "The government refunds your entire tax if taxable income is ≤ ₹12L (New) or ≤ ₹5L (Old)."
80CCD2 tooltip:          "Employer NPS is the ONLY Old-Regime-style deduction allowed in the New Regime. Most people miss this."
```

---

## 13. HIDDEN TRUTHS LOGIC — SECRETS ENGINE

### 13.1 Trigger Conditions (Complete)
```javascript
function generateSecrets(inputs, results) {
  const secrets = [];

  // SECRET: Employer NPS opportunity
  if (!inputs.hasEmployerNPS && inputs.basicSalary > 15000) {
    const potentialSaving = (inputs.basicSalary * 12 * 0.10) * 0.20; // approx
    secrets.push({ id: 'S001', priority: 'high', potentialSaving, ...SECRETS.S001 });
  }

  // SECRET: Unused 80C + Old Regime
  if (results.remaining80C > 5000 && results.recommendedRegime === 'old') {
    secrets.push({ id: 'S002', priority: 'high', potentialSaving: results.remaining80C * 0.20 });
  }

  // SECRET: Near zero-tax threshold
  if (results.new.taxableIncome > 1150000 && results.new.taxableIncome < 1275000) {
    secrets.push({ id: 'S005', priority: 'high' });
  }

  // SECRET: Marginal relief explanation
  if (results.new.marginalRelief > 0) {
    secrets.push({ id: 'S003', priority: 'high' });
  }

  // SECRET: FD interest taxable
  if (inputs.fdInterestAnnual > 0) {
    secrets.push({ id: 'S004', priority: 'medium' });
  }

  // SECRET: Meal coupons unclaimed
  if (!inputs.hasMealCoupons) {
    secrets.push({ id: 'S006', priority: 'medium', potentialSaving: 26400 * 0.20 });
  }

  // SECRET: Parent health insurance
  if (!inputs.healthInsuranceParentsAnnual && inputs.grossAnnualIncome > 500000) {
    secrets.push({ id: 'S007', priority: 'medium', potentialSaving: 25000 * 0.20 });
  }

  // SECRET: 80GG for non-HRA rent payers
  if (!inputs.receivesHRA && inputs.paysRent && results.old.section80GG > 0) {
    secrets.push({ id: 'S008', priority: 'high' });
  }

  // Sort by priority: high first
  return secrets.sort((a, b) =>
    a.priority === 'high' ? -1 : b.priority === 'high' ? 1 : 0
  );
}
```

---

## 14. FEATURE PRIORITY — MVP → V1 → V2

### MVP (Week 1-2 of development)
```
✓ Tax engine: New Regime + Old Regime (core slabs, 87A, cess, marginal relief)
✓ Input wizard: Steps 1, 2A, 3, 4, 7, 9 (take-home, basic slip, age, rent, investments, health)
✓ HRA triple-lock calculation
✓ 80C aggregation with cap
✓ Live preview panel (desktop)
✓ Results page: Verdict + Comparison table
✓ Landing page (static, functional)
✓ Mobile-responsive layout
✓ URL state preservation
```

### V1 (Week 3-4)
```
✓ All 12 wizard steps complete
✓ Employer NPS (80CCD2) — both regimes
✓ Home loan interest + 80EEA
✓ All perquisite exemptions
✓ Secrets engine (all 10 secrets)
✓ Next Actions section
✓ Education layer (all explanations)
✓ Mobile bottom drawer for live panel
✓ Animated number transitions
✓ New Joiner mode
✓ FAQ boxes on all steps
✓ Salary estimation (Step 2B)
✓ HR message templates (copy to clipboard)
✓ Senior / super senior citizen handling
```

### V2 (Month 2+)
```
◯ Crossover Point Finder (graph: at what investment does Old Regime win?)
◯ Mid-year salary hike mode
◯ Job switch mode (two Form 16)
◯ Section 89 arrears relief calculator
◯ Regime switch impact calculator (what-if slider)
◯ Monthly TDS tracker vs actual
◯ Salary restructuring advisor (suggest optimal structure)
◯ Multi-language (Hindi, Telugu, Tamil)
◯ WhatsApp share of results
◯ Saved scenarios (IndexedDB — local only)
```

---

## 15. WIREFRAMES — ALL SCREENS

### 15.1 Landing Page (Mobile — 375px)
```
┌───────────────────────────────┐
│  TaxTruth India          ☰    │
├───────────────────────────────┤
│                               │
│  Find out in 3 minutes        │
│  which tax regime             │
│  saves you more money.        │
│                               │
│  We ask what hits your bank   │
│  account — not your CTC.      │
│  No jargon. No signup.        │
│  100% free.                   │
│                               │
│  ┌───────────────────────┐    │
│  │ Calculate My Tax →    │    │
│  └───────────────────────┘    │
│                               │
│  🔒 Browser  🚫 No ads  📵 Free│
├───────────────────────────────┤
│  [Animated Preview Card]      │
│  New Regime saves ₹18,400     │
│  ████████░░ 78% complete      │
├───────────────────────────────┤
│  THE PROBLEM WITH OTHER       │
│  CALCULATORS                  │
│                               │
│  ┌─────────────────────────┐  │
│  │ 😤 They ask CTC.        │  │
│  │ You don't know yours.   │  │
│  └─────────────────────────┘  │
│  ┌─────────────────────────┐  │
│  │ 🕵️ Hidden regime bias.  │  │
│  │ They sell products.     │  │
│  └─────────────────────────┘  │
│  ┌─────────────────────────┐  │
│  │ 💡 CA-grade insights.   │  │
│  │ Hidden from you.        │  │
│  └─────────────────────────┘  │
├───────────────────────────────┤
│  ┌───────────────────────┐    │
│  │ Start Now — It's Free │    │
│  └───────────────────────┘    │
└───────────────────────────────┘
```

### 15.2 Wizard Step (Mobile — 375px)
```
┌───────────────────────────────┐
│ ← Step 4 of 12  ●●●●○○○○○○○○ │
├───────────────────────────────┤
│                               │
│  Do you pay rent?             │
│                               │
│  HRA exemption is one of the  │
│  biggest deductions you get.  │
│                               │
│  ┌──────────┐  ┌──────────┐   │
│  │   Yes    │  │    No    │   │
│  └──────────┘  └──────────┘   │
│                               │
│  [If Yes selected:]           │
│                               │
│  Monthly rent                 │
│  ₹ [_________________]        │
│                               │
│  🔴 Real-time HRA calculation │
│  Lock 2 limits you: ₹84,000  │
│                               │
├───────────────────────────────┤
│  ▼ TAX ESTIMATE  ₹12,300 saved│  ← Bottom drawer collapsed
├───────────────────────────────┤
│  ❓ Common Questions           │
│  ▼ What if I share with        │
│    a flatmate?                │
│  ▼ What counts as metro?      │
├───────────────────────────────┤
│  ┌───────────────────────┐    │
│  │     Continue →        │    │
│  └───────────────────────┘    │
└───────────────────────────────┘
```

### 15.3 Wizard + Live Panel (Desktop — 1280px)
```
┌──────────────────────────────────────────────────────────────┐
│  TaxTruth India                          Step 4 of 12        │
│  ●●●●○○○○○○○○  ─────────────────────────────────────────    │
├──────────────────────────────┬───────────────────────────────┤
│                              │  📊 LIVE ESTIMATE             │
│  Do you pay rent?            │  ─────────────────────────── │
│                              │  Gross Income: ₹7,80,000/yr  │
│  We'll calculate your        │                              │
│  HRA exemption using the     │  OLD REGIME   NEW REGIME     │
│  triple-lock formula.        │  ₹42,360      ₹23,960        │
│                              │                              │
│  [Yes]  [No]                 │  ┌──────────────────────────┐│
│                              │  │ New Regime saves ₹18,400 ││
│  Monthly Rent                │  └──────────────────────────┘│
│  ₹ [20,000]                  │                              │
│                              │  Eff. Rate: 5.4% vs 9.7%    │
│  ─────────────────────────── │  Monthly TDS: ₹1,997        │
│  HRA Calculation:            │                              │
│  Lock 1 (HRA rcvd): ₹1,44K  │  80C: [████████░░] ₹1,04K   │
│  Lock 2 (Rent-10%): ₹84K ←  │       ₹1,04,600 / ₹1,50,000│
│  Lock 3 (50% basic): ₹1.8K  │                              │
│  Exemption: ₹84,000 ✓       │  [See Full Breakdown →]      │
│                              │                              │
│  ❓ Common Questions          │                              │
│  ▶ Flatmate rent split?      │                              │
│  ▶ Which cities are metro?   │                              │
│                              │                              │
│  [← Back]     [Continue →]  │                              │
└──────────────────────────────┴───────────────────────────────┘
```

### 15.4 Results Page (Desktop)
```
┌──────────────────────────────────────────────────────────────┐
│  TaxTruth India                [🔄 Recalculate] [📤 Share]  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│         ╔══════════════════════════════════════╗            │
│         ║  Go with the New Regime.             ║            │
│         ║  You save ₹22,450 this year.         ║            │
│         ║                                      ║            │
│         ║  New Regime: ₹48,360  (6.2%)         ║            │
│         ║  Old Regime: ₹70,810  (9.1%)         ║            │
│         ║                                      ║            │
│         ║  Monthly TDS: ₹4,030                 ║            │
│         ╚══════════════════════════════════════╝            │
│                                                              │
├─────────────────────────── COMPARISON ─────────────────────────┤
│                                                              │
│  [Full side-by-side table as defined in Section 9.2]        │
│                                                              │
├───────────────────────── YOUR SECRETS ─────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────┐                       │
│  │ 💡 HIGH PRIORITY                 │                       │
│  │ You're missing employer NPS      │                       │
│  │ Potential saving: ₹7,200/year    │                       │
│  │ [Copy HR message]                │                       │
│  └──────────────────────────────────┘                       │
│                                                              │
│  [Additional secret cards...]                               │
│                                                              │
├─────────────────────────── NEXT STEPS ─────────────────────────┤
│                                                              │
│  1. Invest ₹45,400 more before March 31 → saves ₹9,080     │
│  2. Declare Old Regime to employer by January payroll       │
│  3. Submit rent receipts to employer by December            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## APPENDIX A — Metro Cities List
```javascript
export const METRO_CITIES = [
  'Mumbai', 'Bombay', 'Navi Mumbai', 'Thane',
  'Delhi', 'New Delhi', 'Delhi NCR',
  'Chennai', 'Madras',
  'Kolkata', 'Calcutta',
];
// All other cities → nonMetro
// Note: Bangalore, Hyderabad, Pune, Ahmedabad are NOT metro for HRA purposes
// Despite common misconception — confirm from Sec 10(13A) of IT Act
```

## APPENDIX B — Accessibility Requirements
```
- All inputs: aria-label + aria-describedby pointing to error/helper text
- Color is never the ONLY differentiator (always add icon or text)
- Focus trap inside wizard steps (tab order logical)
- WCAG AA minimum: 4.5:1 contrast for normal text, 3:1 for large text
- All currency displays: aria-label includes "rupees" (e.g., "48,360 rupees")
- Error messages: role="alert" for screen reader announcement
- FAQ boxes: uses <details>/<summary> for native keyboard support
- Mobile: minimum tap target 44×44px for all interactive elements
- Skip-to-content link at top of page
```

## APPENDIX C — Performance Checklist
```
□ Total JS bundle < 150KB gzipped
□ No blocking external fonts (subset and self-host or system font fallback)
□ Critical CSS inlined
□ Images: WebP with JPEG fallback, lazy-loaded below the fold
□ Tax engine is synchronous — no async needed, no loading state
□ Debounce input handlers at 150ms (not on every keystroke)
□ No third-party analytics scripts
□ No third-party chat widgets
□ Service Worker for offline support (cache first load)
□ Lighthouse score targets: Performance 90+, Accessibility 95+, Best Practices 100
```

---

*End of TaxTruth India PRD — Version 1.0*  
*This document is complete. Any AI coding tool or developer can build the full application from this specification without requiring clarification.*
