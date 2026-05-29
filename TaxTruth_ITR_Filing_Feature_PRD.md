# TaxTruth India — ITR Filing Feature
## Complete Product Requirements Document
### "The CA in Your Browser" — Maximum Refund. Zero Jargon. Free Forever.

**Version:** 1.0  
**Scope:** All individual taxpayers — salaried, business, professional, investor, senior citizen  
**Legal Basis:** Income Tax Act 1961, Income Tax Rules 1962, Finance Act 2025, CBDT Circulars up to AY 2026-27  

---

## TABLE OF CONTENTS

1. [Vision & Philosophy](#1-vision--philosophy)
2. [Legal Knowledge Base — The Full CA Brain](#2-legal-knowledge-base--the-full-ca-brain)
3. [Income Profiler — All 5 Heads](#3-income-profiler--all-5-heads)
4. [ITR Form Selector Engine](#4-itr-form-selector-engine)
5. [CA Optimization Engine — Maximum Refund Logic](#5-ca-optimization-engine--maximum-refund-logic)
6. [Data Collection Wizard — All Screens](#6-data-collection-wizard--all-screens)
7. [Pre-Filing Verification Engine](#7-pre-filing-verification-engine)
8. [Tax Computation Engine — Full Logic](#8-tax-computation-engine--full-logic)
9. [ITR JSON Generator](#9-itr-json-generator)
10. [Filing Assistant — Step-by-Step Portal Guide](#10-filing-assistant--step-by-step-portal-guide)
11. [Post-Filing Intelligence](#11-post-filing-intelligence)
12. [Loss Harvesting & Carry Forward Engine](#12-loss-harvesting--carry-forward-engine)
13. [Loophole Registry — Every Legal Tax Saving Known to Indian Law](#13-loophole-registry--every-legal-tax-saving-known-to-indian-law)
14. [Special Taxpayer Modes](#14-special-taxpayer-modes)
15. [Error & Notice Handler](#15-error--notice-handler)
16. [Data Model — Complete Variable Registry](#16-data-model--complete-variable-registry)
17. [Component Tree](#17-component-tree)
18. [Feature Priority — MVP to V3](#18-feature-priority--mvp-to-v3)

---

## 1. VISION & PHILOSOPHY

### 1.1 The Problem This Solves

India has 8 crore+ registered taxpayers. Only about 3 crore file correctly. The rest either:
- Pay a CA ₹1,500–₹15,000 to do what takes 45 minutes
- File incorrectly and receive notices
- Miss deductions worth ₹20,000–₹2,00,000 because nobody told them
- Don't file at all out of fear and confusion

The Income Tax Act 1961 has 298 sections. The CA exam covers all of them. This feature puts that entire knowledge into a browser — for free.

### 1.2 What "Behaving Like a CA" Means

A CA filing your ITR does these 12 things. This feature does all 12:

1. Collects ALL income across all five heads — not just salary
2. Cross-checks your numbers against Form 26AS, AIS, and TIS
3. Selects the correct ITR form (most filers use the wrong one)
4. Applies every applicable deduction — including ones you forgot to mention
5. Finds set-off opportunities (house property loss against salary income)
6. Carries forward losses correctly for future years
7. Calculates advance tax paid and checks for interest under 234B/234C
8. Chooses between Old and New regime at filing — not just at employer declaration
9. Checks for marginal relief, special rates, and treaty benefits
10. Generates the correct JSON/XML for IT portal upload
11. Guides through e-verification
12. Flags notices and explains them in plain language

### 1.3 The Standard

This feature must know every section of the Income Tax Act that applies to individual taxpayers. Every CBDT circular. Every Finance Act amendment through 2025. Every Supreme Court and High Court ruling that changes how a deduction is calculated. When in doubt, it must take the position most favorable to the taxpayer — which is exactly what a good CA does.

---

## 2. LEGAL KNOWLEDGE BASE — THE FULL CA BRAIN

### 2.1 Primary Law Sources (Must Be Encoded)

```
1. Income Tax Act, 1961 — All sections applicable to individuals
2. Income Tax Rules, 1962 — All rules applicable to individuals
3. Finance Act 2024 (AY 2025-26 changes)
4. Finance Act 2025 (AY 2026-27 changes — FY 2025-26 filing)
5. CBDT Circulars and Notifications (all active ones)
6. Key Supreme Court rulings affecting individual tax
7. Key High Court rulings (where SC has not spoken)
8. DTAA treaties with 94 countries (for NRI/foreign income)
```

### 2.2 Five Heads of Income — Full Legal Framework

#### HEAD 1: SALARIES (Sections 15–17)

```
What is taxable:
- Basic salary
- Dearness allowance (fully taxable)
- Bonus, commission, incentive (fully taxable)
- All allowances not specifically exempt
- Perquisites (value per Rule 3)
- Profits in lieu of salary (Section 17(3))

What is exempt (Section 10):
- HRA (Section 10(13A) + Rule 2A) — triple-lock formula
- LTA (Section 10(5)) — 2 trips in 4-year block, economy fare
- Gratuity (Section 10(10)) — up to ₹20L for non-govt employees
- Leave encashment on retirement (Section 10(10AA)) — up to ₹25L
- VRS golden handshake (Section 10(10C)) — up to ₹5L
- Retrenchment compensation (Section 10(10B)) — min of 3 months salary × years or actual
- Death-cum-retirement gratuity (govt employees) — fully exempt
- Commuted pension (Section 10(10A)) — 1/3rd for non-govt, fully exempt for govt
- Meal coupons (Rule 3(7)(iii)) — ₹50/meal × 2 × 22 days × 12
- Cab facility (Rule 3(e)) — zero perquisite tax
- Medical reimbursement — up to ₹15,000 tax-free (non-hospitalisation)
- Children education allowance (Section 10(14)) — ₹100/child/month × 2 children
- Hostel allowance — ₹300/child/month × 2 children
- Uniform allowance — exempt against actual expenditure for official duty
- Armed forces allowances — various, fully exempt

Standard Deduction:
- Old Regime: ₹50,000 (Section 16(ia))
- New Regime: ₹75,000 (post Finance Act 2024)

Professional Tax: Actual amount, max ₹2,500 (Section 16(iii))

Employment Tax (Entertainment Allowance for Govt employees):
- Section 16(ii): Lower of actual allowance, ₹5,000, or 1/5th of basic

Perquisites Valuation (Rule 3):
- Company car: ₹1,800/month (engine ≤ 1600cc) or ₹2,400/month (> 1600cc)
  + ₹900/month if driver provided
- Company accommodation: 15% of salary (metro), 10% (non-metro), 7.5% (other)
- Free meals beyond ₹50/meal: fully taxable perquisite
- Stock options (ESOPs): taxable at exercise — FMV minus exercise price
- Interest-free/concessional loan: bank SBI rate minus loan rate × outstanding
- Gifts exceeding ₹5,000/year: excess is perquisite
- Educational facility for children: if in employer's institution — exempt
  if outside — full fee is perquisite

Arrears of Salary — Section 89 Relief:
- If salary paid in arrears (previous year's increment received this year)
- Relief = Tax at this year's rate on arrear income − Tax at previous year's rate
- Must file Form 10E BEFORE filing ITR (else relief is denied automatically)
- CA SECRET: Many people receive arrears and don't know they can reclaim
  the excess tax through Form 10E. This is pure money left on the table.
```

#### HEAD 2: HOUSE PROPERTY (Sections 22–27)

```
Types of Property:
1. Self-Occupied Property (SOP):
   - Net Annual Value = NIL
   - Section 24(b) interest deduction: up to ₹2L (completed property)
   - Pre-construction interest: 1/5th of total pre-EMI interest per year × 5 years
   - From FY 2017-18: Only ONE property can be self-occupied; rest are deemed let-out

2. Let-Out Property:
   - Gross Annual Value = Higher of actual rent or municipal valuation
   - Less: Municipal taxes actually paid during the year
   = Net Annual Value (NAV)
   - Standard deduction: 30% of NAV (flat — no need to prove actual expenses)
   - Interest on home loan: FULLY deductible (no ₹2L cap for let-out)
   - Result can be negative (loss on house property)

3. Deemed Let-Out Property (if more than one SOP):
   - Notional rent is calculated based on market rent / municipal valuation
   - Treated same as let-out property for tax purposes

Loss from House Property:
- Can set off against Salary income: UP TO ₹2L per year
- Remaining loss CARRIES FORWARD for 8 years
- Only against House Property income in future years
- CA SECRET: Most people with home loans have a loss from house property
  (interest > rental income). This ₹2L set-off against salary saves ₹60,000+
  in tax for 30% bracket taxpayers. Many miss this entirely.

IMPORTANT — Section 80EEA Additional Deduction:
- First-time buyer, stamp duty value ≤ ₹45L
- Additional ₹1.5L interest deduction OVER AND ABOVE Section 24(b) ₹2L
- Total possible: ₹3.5L interest deduction for self-occupied

Joint Ownership:
- Each co-owner claims proportionate deductions
- Both can claim ₹2L interest and ₹1.5L 80C principal separately
- Total family deduction: up to ₹7L

Rent from Subletting:
- Not House Property income — taxable under "Other Sources"
- (You can sublet only what you rent — you're not the owner)
```

#### HEAD 3: PROFITS AND GAINS FROM BUSINESS OR PROFESSION (Sections 28–44)

```
Applicability:
- Freelancers, consultants, doctors, lawyers, CAs, engineers, architects
- Business owners (sole proprietor)
- Partnership share of profit

Presumptive Taxation (CA SECRET — most professionals miss this):

Section 44ADA — For Professionals (AY 2026-27):
  Eligible: Doctor, Lawyer, CA, Engineer, Architect, Technical Consultant,
  Interior Decorator, and notified professionals
  Turnover limit: ₹75L (if 50%+ receipts via banking — else ₹50L)
  Deemed profit: 50% of gross receipts
  No books of accounts required
  No audit required below limit
  CA SECRET: A doctor earning ₹60L can declare ₹30L as profit, pay tax only
  on that — no need to prove expenses. Net effective tax rate drops dramatically.

Section 44AD — For Small Business (AY 2026-27):
  Turnover limit: ₹3Cr (if 95%+ receipts/payments digital — else ₹2Cr)
  Deemed profit: 8% of turnover (6% for digital transactions)
  CA SECRET: A trader with ₹2Cr turnover and ₹12L actual profit can declare
  only ₹12L under 44AD instead of higher deemed profit, if books maintained.
  Choose whichever is lower.

Section 44AE — Goods Carriage:
  Per vehicle per month: ₹1,000 per ton capacity (heavy vehicle)
                          ₹7,500 (other vehicle)

Actual Taxation (if not opting presumptive):
  Revenue - Allowable Expenses = Taxable Profit
  
  Allowable expenses:
  - Rent, electricity, internet, phone (business use)
  - Depreciation (as per Schedule — different rates for different assets)
  - Salaries to employees
  - Professional fees, legal fees
  - Travel and conveyance (business)
  - Advertising and marketing
  - Bad debts written off
  - Interest on business loans
  - Books, subscriptions, professional memberships
  
  NOT allowable:
  - Personal expenses
  - Capital expenditure (but depreciation is allowed)
  - Tax payments
  - Fines and penalties

Depreciation:
  - Computers and peripherals: 40%
  - Motor vehicles: 15% (30% for taxi)
  - Furniture: 10%
  - Buildings: 5% (10% for temporary structures)
  - Patent, copyright, trademark: 25%
  - Goodwill: 0% (post 2021 amendment — no depreciation on goodwill)

Loss from Business:
  - Can set off against any income head EXCEPT salary
  - Can carry forward 8 years (only against business income)
  - Speculative business loss: only against speculative profit, 4 years
```

#### HEAD 4: CAPITAL GAINS (Sections 45–55A)

```
TYPES AND RATES (AY 2026-27 — post Finance Act 2024 changes):

SHORT-TERM CAPITAL GAINS (STCG):
  Equity shares/equity MF (held < 12 months):
    Rate: 20% flat (changed from 15% by Finance Act 2024)
    Section: 111A
    Exemption: None (no basic exemption limit offset)
    
  Debt MF, gold, property, other assets (held < 36 months for property/36 months for debt):
    Rate: Slab rate (add to income, tax at normal rate)
    No special rate

LONG-TERM CAPITAL GAINS (LTCG):
  Equity shares/equity MF/equity ETF (held > 12 months):
    Rate: 12.5% flat (changed from 10% by Finance Act 2024)
    Annual exemption: ₹1.25L (changed from ₹1L)
    Section: 112A
    Grandfather clause: Cost = FMV as on Jan 31, 2018 (if purchased before this date)
    
  Property (held > 24 months post AY 2025-26 — changed from 36 months):
    Rate: 12.5% WITHOUT indexation (Finance Act 2024 removed indexation for new sales)
    OPTION: Taxpayers who purchased before July 23, 2024 can choose:
             (a) 12.5% without indexation, OR
             (b) 20% with indexation
             Choose whichever gives lower tax.
    CA SECRET: This choice can save lakhs. Always calculate both.
    
  Debt MF, gold, bonds (held > 36 months):
    Rate: 12.5% without indexation (post Finance Act 2024)
    Previously: 20% with indexation — removed for sales after July 23, 2024
    
  Unlisted shares (held > 24 months):
    Rate: 12.5% without indexation

COST OF ACQUISITION:
  For assets purchased before April 1, 2001:
    Cost = FMV as on April 1, 2001 (taxpayer option to use indexed cost of actual)
  For equity (pre-Jan 31, 2018): FMV as on Jan 31, 2018

COST INFLATION INDEX (CII) — Still relevant for pre-July 23, 2024 properties:
  FY 2001-02: 100 (base year)
  FY 2024-25: 363
  FY 2025-26: 376 (announced)
  Formula: Indexed Cost = Actual Cost × (CII of sale year / CII of purchase year)

CAPITAL GAINS EXEMPTIONS (THE MOST POWERFUL CA SECRETS):

Section 54 — Residential Property LTCG Reinvestment:
  Condition: LTCG from sale of residential house property
  Exemption: Reinvest in ONE new residential house in India
  Time: Purchase within 1 year before or 2 years after sale
         OR construct within 3 years
  Maximum: Full LTCG exempt if fully reinvested
  If partial reinvestment: Exempt = (Amount invested / Sale consideration) × LTCG
  
  CAPITAL GAINS ACCOUNT SCHEME (CGAS):
  If new property not purchased before ITR due date → deposit in CGAS
  (Scheduled bank — Capital Gains Account) before filing ITR
  Withdraw within prescribed time for purchase
  CA SECRET: Missing this deadline = losing the exemption. Must deposit in CGAS.

Section 54B — Agricultural Land:
  LTCG from sale of agricultural land → reinvest in agricultural land within 2 years
  Works for both urban and rural agricultural land sales

Section 54EC — Bond Reinvestment:
  LTCG from any long-term capital asset (property, land, etc.)
  Invest within 6 months in specified bonds:
    - NHAI (National Highways Authority of India) bonds
    - REC (Rural Electrification Corporation) bonds
    - PFCL bonds
  Maximum investment: ₹50L per financial year
  Lock-in: 5 years (selling before = capital gain revives)
  Interest rate: ~5% taxable — but capital gain saving often makes it worth it
  CA SECRET: Someone selling a ₹2Cr property with ₹80L capital gain can invest
  ₹50L in bonds → save ₹6.25L in tax (₹50L × 12.5%). Net saving outweighs low interest.

Section 54F — Any Capital Asset → Residential Property:
  Like Section 54 but for ALL long-term capital assets (not just property)
  Condition: Taxpayer must not own more than ONE residential house on sale date
  Invest NET SALE CONSIDERATION (not just gain) in residential house
  CA SECRET: LTCG from shares or gold → invest in house → fully exempt.
  Most investors who sell equity and buy a house don't know to use 54F.

Section 54EE — Investment in Notified Funds:
  Invest in specified DIPP-notified funds (startups) → exempt LTCG
  Max: ₹50L per year

LOSS SET-OFF AND CARRY FORWARD (Capital Gains):
  STCL can set off against: STCG and LTCG
  LTCL can set off against: Only LTCG (NOT against STCG)
  STCL and LTCL carry forward: 8 years
  
  CA SECRET — TAX LOSS HARVESTING:
  Before March 31 each year: Book losses on poorly performing investments
  to set off against gains. Buy back after 30 days (or buy similar fund).
  This is standard CA practice for HNI clients. Apply to everyone.

BONUS STRIPPING (Section 94(8)):
  If units purchased, bonus units received, original units sold at loss
  within 9 months → loss is reduced by bonus unit value
  Prevents artificial loss creation through bonus units

DIVIDEND STRIPPING (Section 94(7)):
  If dividend received and units sold at loss within 3 months before/
  9 months after record date → loss reduced by dividend received
  
SPECULATIVE VS NON-SPECULATIVE TRANSACTIONS:
  Intraday equity trading = Speculative business income (NOT capital gains)
  F&O trading = Non-speculative business income (NOT capital gains)
  This distinction is critical for loss treatment
```

#### HEAD 5: INCOME FROM OTHER SOURCES (Sections 56–59)

```
What Falls Here:
- Savings account interest (partly exempt via 80TTA/80TTB)
- Fixed deposit interest (fully taxable — no deduction)
- Recurring deposit interest (fully taxable)
- Dividend income (fully taxable at slab rate post April 2020)
- Lottery, puzzle, game show winnings (30% flat + cess, no basic exemption)
- Horse racing winnings (30% flat)
- Insurance maturity proceeds (if not exempt under Section 10(10D))
- Family pension (standard deduction: ₹15,000 or 1/3rd — whichever less)
- Subletting income (you sublet rented property)
- Interest on income tax refund (taxable)
- Agricultural income if above basic limit (complex — see below)
- Gift income:
    From relatives: Fully exempt (Section 56(2)(x))
    From non-relatives: Exempt up to ₹50,000/year (total), excess taxable
    On marriage: Fully exempt (from anyone)
    On death: Fully exempt (will/inheritance)
    From employer: Up to ₹5,000 exempt (rest is perquisite — Head 1)
  
  RELATIVES (for gift exemption):
  Spouse, siblings, siblings of spouse, parents, siblings of parents,
  lineal ascendants and descendants (and their spouses)

- Interest from post office savings: Up to ₹3,500 exempt (Section 10(15)(i))
- Interest from PPF/Sukanya: Fully exempt (Section 10(11), 10(11A))
- Interest from Sovereign Gold Bonds on maturity: Fully exempt (Section 10(47))
  (Interest during holding IS taxable — only maturity redemption capital gain is exempt)

Dividend from Mutual Funds:
- Fully taxable at slab rate
- Dividend Distribution Tax abolished April 2020
- TDS: 10% if dividend > ₹5,000 from a single company in a year
- Claim TDS credit from Form 26AS

Club Membership Perquisite:
- If employer pays club fees: Taxable perquisite (except if for business purposes)

Taxable Insurance Proceeds (Section 10(10D)):
- Life insurance policy: Premium > 10% of sum assured (post March 2012)
  → maturity proceeds TAXABLE (excess of premium paid)
- Keyman insurance: Always taxable
- ULIP with premium > 2.5L annual → proceeds taxable as capital gains
```

### 2.3 All Deductions Under Chapter VI-A

```
SECTION 80C (₹1,50,000 cap):
  Employee Provident Fund (EPF): Employee contribution
  Public Provident Fund (PPF): Annual contribution ≤ ₹1.5L
  Equity Linked Savings Scheme (ELSS): No lock-in post 3 years
  Life Insurance Premium: For self, spouse, children
  Home Loan Principal Repayment: Under EMI
  Tuition Fees: Full-time education, max 2 children
  NSC (National Savings Certificate): Purchase amount + 5th year interest
  Sukanya Samriddhi Yojana: For daughter under 10
  5-Year Tax Saving Fixed Deposit
  ULIP Premium: Unit Linked Insurance Plan
  Senior Citizens Savings Scheme (SCSS): Post office
  New Pension Scheme self: 10% of salary under 80CCD(1) — within 80C cap
  Contribution to notified pension fund under 80CCC

  CA SECRET — 80C SEQUENCING:
  Always claim EPF first (already happening), then PPF/ELSS.
  NEVER put excess 80C money in LIC — post-tax returns are 5–6%, terrible.
  ELSS gives market returns with tax saving. PPF is 7.1% tax-free — excellent.
  
SECTION 80CCC:
  Annuity plan of LIC or approved insurer: max ₹1.5L (within 80C total cap)

SECTION 80CCD(1):
  NPS employee contribution: 10% of salary within 80C cap

SECTION 80CCD(1B):
  NPS additional self-contribution: ₹50,000 OVER AND ABOVE 80C cap
  Old regime only

SECTION 80CCD(2):
  Employer NPS contribution: 10% basic+DA (private), 14% (govt)
  BOTH regimes. OVER AND ABOVE 80C cap.
  CA SECRET: This is the single biggest untapped tax saving in India.

SECTION 80D — Health Insurance:
  Self + family (< 60): ₹25,000
  Self + family (60+): ₹50,000
  Parents (< 60): ₹25,000
  Parents (60+): ₹50,000
  Maximum total: ₹1,00,000 (both taxpayer and parents senior)
  
  ALSO: Preventive health check-up ₹5,000 (within overall 80D limit)
  ALSO: Medical expenditure for senior citizens without insurance: ₹50,000 (within limit)
  
  CA SECRET: If parents are senior citizens and NOT insured,
  actual medical bills paid (up to ₹50,000) still get 80D deduction.
  Keep all medical receipts for senior parents.

SECTION 80DD — Disabled Dependant:
  Disability 40–79%: Flat ₹75,000 (irrespective of actual expense)
  Disability 80%+: Flat ₹1,25,000
  No receipts needed — just a disability certificate from government doctor

SECTION 80DDB — Medical Treatment (Specified Diseases):
  Cancer, AIDS, kidney failure, neurological diseases (list in Rule 11DD)
  Below 60: ₹40,000
  Senior citizen: ₹1,00,000
  Less: any reimbursement from employer or insurer
  Need certificate from specialist doctor (Form 10-I)

SECTION 80E — Education Loan Interest:
  No cap — full interest deductible
  Max 8 consecutive years from start of repayment
  Loan must be from bank/approved institution
  For self, spouse, children, or student for whom taxpayer is legal guardian

SECTION 80EE — Home Loan Interest (First-Time Buyer, earlier scheme):
  Property value ≤ ₹50L, loan ≤ ₹35L
  Sanctioned between April 1, 2016 and March 31, 2017
  Additional ₹50,000 over 24(b) cap
  Note: This is a legacy provision — relevant for loans taken in that window

SECTION 80EEA — Home Loan Interest (Current scheme):
  Stamp duty value ≤ ₹45L
  Loan sanctioned between April 1, 2019 and March 31, 2022
  Additional ₹1,50,000 over 24(b) cap
  Note: Extended by Finance Act — check exact extension in AY 2026-27

SECTION 80G — Donations:
  Category A — 100% deduction, no qualifying limit:
    PM National Relief Fund, PM CARES, National Defense Fund,
    National Foundation for Communal Harmony
  Category B — 50% deduction, no qualifying limit:
    Jawaharlal Nehru Memorial Fund, Rajiv Gandhi Foundation
  Category C — 100% deduction, with 10% of adjusted GTI limit:
    Approved institutions (schools, colleges, hospitals under 80G)
  Category D — 50% deduction, with 10% of adjusted GTI limit:
    All other approved charitable institutions
  
  CA SECRET:
  Always get 80G certificate from the NGO. Without it, deduction is disallowed.
  Donations must be in digital mode for > ₹2,000.
  Check NGO's 80G validity at incometax.gov.in before donating.
  DPDP Act trusts may lose 80G status — verify.

SECTION 80GG — Rent Without HRA:
  For those not receiving HRA in salary AND not owning a house
  Deduction = Minimum of:
    (1) ₹5,000/month = ₹60,000/year
    (2) 25% of total income (before this deduction)
    (3) Rent paid − 10% of total income
  Must file Form 10BA declaration

SECTION 80GGC — Political Donation:
  100% deduction for donations to registered political parties
  Must be in non-cash mode (any digital)
  No 10% limit applicable

SECTION 80P — Cooperative Society Income:
  Interest/dividends from cooperative banks or societies: Exempt
  Relevant for farmers, rural workers

SECTION 80QQB — Book Royalties:
  Indian authors of books (not textbooks): Up to ₹3,00,000
  Books must be literary, artistic, scientific
  Foreign royalty included (must be brought to India in foreign exchange)

SECTION 80RRB — Patent Royalties:
  Registered patent holders: Up to ₹3,00,000
  Patent must be registered under Indian Patents Act

SECTION 80TTA — Savings Interest:
  Below 60: Savings account interest up to ₹10,000
  (Bank, post office, cooperative banks)

SECTION 80TTB — Interest for Senior Citizens:
  60+ only: All interest income (savings + FD + RD) up to ₹1,00,000
  Replaces 80TTA for senior citizens (mutually exclusive)
  CA SECRET: This is massive for senior citizens with FDs.
  A senior with ₹10L in FD at 7% earns ₹70,000 → fully deductible under 80TTB.

SECTION 80U — Self Disability:
  Disability 40–79%: Flat ₹75,000
  Disability 80%+: Flat ₹1,25,000
  Certificate from government doctor required
  No receipts needed — flat deduction

SECTION 80GGA — Scientific Research/Rural Development Donations:
  100% deduction for donations to specified research associations, universities
  No cap (as percentage of income)
```

### 2.4 Tax Rates — All Categories (AY 2026-27)

```
INDIVIDUAL (NEW REGIME — DEFAULT):
  Up to ₹4L: Nil
  ₹4–8L: 5%
  ₹8–12L: 10%
  ₹12–16L: 15%
  ₹16–20L: 20%
  ₹20–24L: 25%
  Above ₹24L: 30%
  Standard Deduction: ₹75,000
  Rebate 87A: ₹60,000 (if taxable income ≤ ₹12L)
  Cess: 4%
  Surcharge: 10% (₹50L–₹1Cr), 15% (₹1–2Cr), 25% (₹2–5Cr), 37% (above ₹5Cr)
    Note: Surcharge capped at 15% for LTCG under 112A

INDIVIDUAL (OLD REGIME):
  Up to ₹2.5L (below 60): Nil
  Up to ₹3L (senior 60–79): Nil
  Up to ₹5L (super senior 80+): Nil
  ₹2.5/3L–₹5L: 5%
  ₹5–10L: 20%
  Above ₹10L: 30%
  Standard Deduction: ₹50,000
  Rebate 87A: ₹12,500 (if taxable income ≤ ₹5L)
  Cess: 4%

SPECIAL RATES (apply regardless of regime):
  STCG on equity (111A): 20% + cess
  LTCG on equity (112A): 12.5% + cess (on gains > ₹1.25L)
  LTCG on property/other (112): 12.5% without indexation
    OR 20% with indexation (choice for pre-July 23, 2024 purchases)
  Lottery/games (115BB): 30% + cess
  Non-resident income: Various (per DTAA or 115A)
  Crypto/VDA (115BBH): 30% flat + cess + 1% TDS on sale
  
SURCHARGE (applies in both regimes):
  Total income ₹50L–₹1Cr: 10% surcharge on income tax
  ₹1Cr–₹2Cr: 15%
  ₹2Cr–₹5Cr: 25%
  Above ₹5Cr: 37% (but capped at 15% for 111A/112A/112 gains)

MARGINAL RELIEF (New Regime):
  At ₹12L: 87A rebate = 0 tax
  At ₹12L+₹1: Tax becomes ~₹60,000+ instantly
  Marginal relief: Tax ≤ (Income − ₹12L)
  Applies until marginal relief is exhausted (roughly up to ₹12,75,000 for salaried)

AMT (Alternative Minimum Tax — Section 115JC):
  Applies to individuals claiming Chapter VI-A deductions
  If regular tax < 18.5% of adjusted total income → pay AMT
  Relevant only for high-income taxpayers with large deductions
  
REBATE UNDER SECTION 87A:
  Old regime: Full rebate (up to ₹12,500) if taxable income ≤ ₹5L
  New regime: Full rebate (up to ₹60,000) if taxable income ≤ ₹12L
  
  CA SECRET — 87A on Special Rate Income:
  Per Finance Act 2023 and subsequent CBDT instructions:
  87A rebate is NOT applicable on:
  - STCG under 111A (equity)
  - LTCG under 112A (equity)
  - LTCG under 112 (property)
  - Lottery income under 115BB
  This is a critical distinction. Many tools apply 87A incorrectly to these.
```

### 2.5 Interest Penalties (Must Calculate and Warn)

```
SECTION 234A — Late Filing Interest:
  1% per month (or part thereof)
  On tax payable after deducting TDS and advance tax
  From due date of filing to actual filing date
  Due date: July 31 (non-audit cases), October 31 (audit cases)

SECTION 234B — Advance Tax Default:
  If advance tax paid < 90% of assessed tax → 1% per month
  From April 1 of assessment year to actual payment date
  Applies if total tax liability > ₹10,000

SECTION 234C — Deferment of Advance Tax:
  If installment < required %:
  June 15 (15%), Sep 15 (45%), Dec 15 (75%), Mar 15 (100%)
  Shortfall × 1% × 3 months

SECTION 234F — Late Filing Fee:
  After July 31 but before December 31: ₹5,000
  After December 31: ₹5,000 (same, but consequences escalate)
  If total income ≤ ₹5L: Fee capped at ₹1,000
  
SECTION 270A — Under-reporting/Misreporting:
  Under-reporting (genuine mistake): 50% of tax on under-reported income
  Misreporting (deliberate): 200% of tax on misreported income
  
SECTION 271F — Non-filing Penalty:
  If required to file but didn't: Up to ₹10,000 (rare)
```

---

## 3. INCOME PROFILER — ALL 5 HEADS

### 3.1 Income Discovery Questionnaire

This is the FIRST screen of the ITR filing feature. Before anything else, determine WHAT kind of taxpayer this person is.

```
QUESTION FLOW:

Q1: "In FY 2025-26, did you receive a salary or pension from any employer?"
    → Yes → Trigger Head 1 module
    → Yes → "More than one employer?" → Trigger multi-employer module

Q2: "Do you own any property — house, flat, plot — that is rented out?"
    → Yes → Trigger Head 2 let-out module

Q3: "Do you have a self-occupied home loan?"
    → Yes → Trigger Head 2 SOP module

Q4: "Did you run any business or practice as a professional (doctor, lawyer,
    CA, consultant, freelancer) during the year?"
    → Yes → Trigger Head 3 module + presumptive taxation check

Q5: "Did you sell any of these in FY 2025-26?"
    → Equity shares or mutual funds
    → Property (house, plot, commercial)
    → Gold, silver, jewelry
    → Bonds or debentures
    → Any other asset
    → Yes to any → Trigger Head 4 module

Q6: "Did you earn any of these during the year?"
    → FD interest
    → Savings account interest above ₹10,000
    → Dividends from shares or mutual funds
    → Winnings from lottery, KBC, gaming, puzzles
    → Family pension
    → Interest from letting out machinery, plant, equipment
    → Gifts from non-relatives above ₹50,000
    → Any other income not mentioned above
    → Yes to any → Trigger Head 5 module

Q7: "Are you an NRI or did you have any income/assets outside India?"
    → Yes → Trigger NRI/Foreign Income module

Based on Q1–Q7 answers:
- Automatically select ITR form (see Section 4)
- Activate only relevant modules
- Pre-populate user's dashboard with their specific income profile
```

### 3.2 Income Profile Cards

```
Show the user a visual summary of their income profile:

┌──────────────────────────────────────────────────────────┐
│  YOUR INCOME PROFILE                                      │
│                                                          │
│  ✅ Salary Income (1 employer)          → ITR-1 or ITR-2 │
│  ✅ House Property (1 let-out)          → ITR-2          │
│  ✅ Capital Gains (sold MF)             → ITR-2          │
│  ❌ Business Income                     → Not applicable  │
│  ✅ Other Sources (FD interest)         → All forms       │
│                                                          │
│  ITR FORM REQUIRED: ITR-2                                │
│  Estimated filing time: 25 minutes                       │
└──────────────────────────────────────────────────────────┘
```

---

## 4. ITR FORM SELECTOR ENGINE

### 4.1 Decision Tree

```javascript
function selectITRForm(profile) {
  
  // ITR-1 (Sahaj) — Simplest
  if (
    profile.incomeHeads.includes('salary') &&
    !profile.incomeHeads.includes('business') &&
    !profile.incomeHeads.includes('capitalGains') &&
    profile.houseProperties <= 1 &&
    !profile.houseProperties.includes('letOut') &&
    profile.totalIncome <= 5000000 &&
    !profile.isNRI &&
    !profile.hasForeignIncome &&
    !profile.hasForeignAssets &&
    !profile.isDirectorInCompany &&
    !profile.hasUnlistedSharesInvestment
  ) return 'ITR-1';
  
  // ITR-4 (Sugam) — Presumptive Business
  if (
    profile.hasPresumptiveBusiness &&
    !profile.incomeHeads.includes('capitalGains') &&
    profile.totalIncome <= 5000000 &&
    !profile.isNRI
  ) return 'ITR-4';
  
  // ITR-2 — Salaried + Capital Gains / Multiple Properties
  if (
    !profile.hasActualBusinessIncome &&
    !profile.hasPresumptiveBusiness &&
    (profile.incomeHeads.includes('capitalGains') ||
     profile.houseProperties > 1 ||
     profile.totalIncome > 5000000 ||
     profile.isNRI ||
     profile.hasForeignIncome)
  ) return 'ITR-2';
  
  // ITR-3 — Business + All Other Income
  if (profile.hasActualBusinessIncome) return 'ITR-3';
  
  // Default safety net
  return 'ITR-2';
}
```

### 4.2 ITR Form Explainer (Show User Why)

```
ITR-1 (Sahaj):
  For: Salaried employees, one house (not let-out), no capital gains, income ≤ ₹50L
  Sections: Part A (personal), Part B (gross income), Part C (deductions),
            Part D (tax computation), Part E (other information), Schedule IT, TDS
  Most common: 3 crore+ filers use this form

ITR-2:
  For: Everything ITR-1 handles PLUS capital gains, multiple properties,
       let-out property, NRI, foreign income, director in company
  Additional Schedules: CG (capital gains), HP (house property), OS (other sources),
                        FA (foreign assets), FSI (foreign income)

ITR-3:
  For: Individuals with business or professional income (actual, not presumptive)
  Requires: P&L account, balance sheet if turnover above audit threshold
  Most complex individual form

ITR-4 (Sugam):
  For: Presumptive business (44AD) or presumptive profession (44ADA) + salary
  Simpler than ITR-3 for small business/professional
  Income limit: ₹50L (total income including salary)
  Note: If opting presumptive and later switching to regular → consequences apply

ITR-U (Updated Return):
  Special form for filing missed/amended returns up to 24 months late
  Attracts additional tax of 25% (within 12 months) or 50% (12-24 months)
  Cannot be used to claim refund — only to declare additional income/pay more tax
  Cannot be used if: assessment opened, search conducted, or non-filer notice issued
```

---

## 5. CA OPTIMIZATION ENGINE — MAXIMUM REFUND LOGIC

### 5.1 The Optimization Sequence (How a CA Thinks)

```
A CA filing your ITR doesn't just fill forms. They run through this mental 
checklist in this exact sequence. This engine replicates it.

STEP 1: MAXIMIZE EXEMPTIONS (Reduce gross income before deductions)
  - Verify all salary exemptions claimed (HRA, LTA, gratuity, etc.)
  - Check if employer has correctly computed these (many don't)
  - Calculate HRA triple-lock yourself — compare with Form 16 figure
  - If Form 16 shows lower HRA exemption than you're entitled to → CORRECT IT in ITR
  - CA SECRET: You can claim a higher HRA exemption in your ITR than your employer 
    computed. The ITR overrides the employer's computation.

STEP 2: SET-OFF LOSSES OPTIMALLY
  - House property loss → set off against salary (saves 30% taxpayers ₹60,000+)
  - STCL → set off against both STCG and LTCG (reduce capital gains tax)
  - LTCL → set off only against LTCG
  - Business loss → set off against any income except salary
  - Optimal sequence: set off highest-rate income first

STEP 3: CHOOSE THE RIGHT REGIME
  - Old vs New — compute BOTH completely
  - Factor in all deductions and exemptions
  - CA SECRET: Regime choice can be made at ITR filing — different from what 
    was declared to employer. Salaried employees (without business income) 
    can switch freely every year at ITR level.
  - Exception: If business income exists → switching is allowed only ONCE 
    (Option under Section 115BAC once exercised for business = permanent switch back)

STEP 4: APPLY EVERY DEDUCTION
  - Run through ALL 25+ deductions
  - Check for deductions missed in Form 16 (employer doesn't know about your 
    PPF, donations, education loan if you didn't declare)
  - CA SECRET: Employer only knows what you told them. ITR knows everything 
    you ACTUALLY paid. Claim the full amount at ITR — don't limit yourself 
    to what's in Form 16.

STEP 5: CHECK CAPITAL GAINS EXEMPTIONS
  - Section 54 / 54B / 54EC / 54F applicable?
  - Was property purchased before July 23, 2024? → Calculate both with/without indexation
  - LTCG from equity → ₹1.25L annual exemption applied?
  - Grandfather clause applied for pre-2018 equity purchases?
  - Tax loss harvesting done for March 31?

STEP 6: VERIFY TDS CREDITS
  - Form 26AS total TDS vs ITR total TDS claimed — MUST MATCH
  - AIS income vs ITR income — discrepancies must be explained or corrected
  - Bank TDS on FD — claimed in correct assessment year?

STEP 7: ADVANCE TAX RECONCILIATION
  - Total advance tax paid vs. computed liability
  - Interest under 234B/234C calculated correctly
  - Self-assessment tax remaining after all credits

STEP 8: SPECIAL CIRCUMSTANCES
  - Section 89 relief for arrears? → Form 10E filed?
  - Agricultural income? → Partial integration method for slab rate
  - Senior citizen special benefits applied?
  - Clubbing of minor child's income?

STEP 9: FINAL VALIDATION
  - Total income in ITR = Sum of AIS reported income? Explain differences.
  - All bank accounts declared (mandatory in ITR)?
  - Aadhaar-PAN linked? (ITR invalid if not linked)
  - Foreign assets declared if applicable?
```

### 5.2 Refund Maximization Rules

```javascript
const REFUND_MAXIMIZATION_RULES = [
  {
    id: 'RM001',
    title: 'Correct Your Employer\'s HRA Calculation',
    trigger: (data) => data.hraExemptionInForm16 < calculateActualHRAExemption(data),
    action: 'Replace employer HRA figure with correct calculated HRA in ITR',
    impact: 'High — HRA differences of ₹20,000–₹1,00,000 are common',
  },
  {
    id: 'RM002',
    title: 'Claim House Property Loss Against Salary',
    trigger: (data) => data.housePropLoss > 0,
    action: 'Set off up to ₹2L house property loss against salary income',
    impact: `₹2L × 30% = ₹60,000 tax saving for 30% bracket`,
  },
  {
    id: 'RM003',
    title: 'Switch Regime at ITR if Employer Used Wrong One',
    trigger: (data) => data.optimalRegime !== data.employerDeclaredRegime,
    action: 'Recalculate under optimal regime in ITR',
    impact: 'Can save ₹10,000–₹50,000 if employer used suboptimal regime',
  },
  {
    id: 'RM004',
    title: 'Claim Deductions Employer Didn\'t Know About',
    trigger: (data) => data.deductionsNotInForm16.length > 0,
    action: 'Add all deductions paid (PPF, donations, education loan) to ITR',
    impact: 'Varies — often ₹5,000–₹50,000 in additional deductions',
  },
  {
    id: 'RM005',
    title: 'Apply Grandfather Clause for Old Equity',
    trigger: (data) => data.equityPurchasedBeforeJan2018 === true,
    action: 'Use FMV as on Jan 31, 2018 as cost of acquisition',
    impact: 'Reduces LTCG significantly — saves 12.5% on the difference',
  },
  {
    id: 'RM006',
    title: 'Choose Indexation for Pre-July 2024 Property',
    trigger: (data) => data.propertyPurchasedBeforeJuly2024 && data.propertyCapGains,
    action: 'Calculate tax under both 12.5% (no indexation) and 20% (with indexation). Choose lower.',
    impact: 'Can save ₹2L–₹15L on property sales',
  },
  {
    id: 'RM007',
    title: 'Apply LTCG ₹1.25L Annual Exemption Optimally',
    trigger: (data) => data.equityLTCG > 0,
    action: 'Ensure ₹1.25L annual exemption applied to LTCG before computing tax',
    impact: '₹1.25L × 12.5% = ₹15,625 annual saving',
  },
  {
    id: 'RM008',
    title: 'Section 89 Arrears Relief',
    trigger: (data) => data.hasSalaryArrears,
    action: 'File Form 10E and compute Section 89 relief',
    impact: 'Can eliminate apparent tax on arrears — often ₹5,000–₹30,000 saving',
  },
  {
    id: 'RM009',
    title: 'Claim 80D for Actual Medical Bills (Senior Citizen Parents)',
    trigger: (data) => data.parentsAresenior && !data.parentsHaveHealthInsurance,
    action: 'Claim up to ₹50,000 under 80D for actual medical expenses paid',
    impact: '₹50,000 × 30% = ₹15,000 saving',
  },
  {
    id: 'RM010',
    title: 'Capital Gains Account Scheme for Unsold Reinvestment',
    trigger: (data) => data.propertyCapGains && !data.reinvestmentComplete,
    action: 'Deposit gains in CGAS before ITR filing to preserve 54/54F exemption',
    impact: 'Saves 12.5%–20% of entire capital gain',
  },
];
```

---

## 6. DATA COLLECTION WIZARD — ALL SCREENS

### MODULE A: PERSONAL INFORMATION

```
Screen A1 — Basic Details
Fields:
  - Full name (as per PAN)
  - PAN number (validate format: AAAAA9999A)
  - Aadhaar number (validate: 12 digits)
  - Date of birth (derive: age category)
  - Gender
  - Residential status: Resident / Non-Resident / RNOR
  - Filing status: Original / Revised / Updated (ITR-U)
  - Assessment Year: AY 2026-27 (default, locked)
  - Email and mobile (for OTP-based e-verification)

Validations:
  - PAN format: regex /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
  - Aadhaar: Luhn algorithm variant (12 digits, passes verhoeff checksum)
  - DOB: Must be in past, derive age category:
      below 60, senior (60-79), super senior (80+)
  - Aadhaar-PAN link status: Show warning if not linked
    (ITR processing delayed/invalid if not linked)

Screen A2 — Bank Accounts
  Mandatory: All bank accounts active in FY 2025-26
  Fields per account: Bank name, Account number, IFSC, Account type
  Mark refund account: One account must be marked for refund
  Note: Foreign bank accounts require Schedule FA in ITR-2/3

Screen A3 — Address
  Current residential address
  Country (if NRI: country of residence, passport number)
```

### MODULE B: SALARY INCOME

```
Screen B1 — Employer Details
  For each employer (supports multiple — job switch scenario):
    - Employer name
    - TAN (Tax Deduction Account Number — 10 digits, on Form 16)
    - Employment period (From date to To date)
    - Nature of employer: Government / PSU / Other
    
  Form 16 Upload (V2 feature):
    Part A: TDS deducted quarter-wise
    Part B: Salary breakdown and deductions

Screen B2 — Salary Breakdown (per employer)
  From Form 16 Part B or manual entry:
  
  GROSS SALARY:
  - Salary as per Section 17(1): [₹]
  - Perquisites under 17(2): [₹]
  - Profits in lieu of salary 17(3): [₹]
  
  ALLOWANCES EXEMPT UNDER SECTION 10:
  - HRA (10(13A)): [₹]    [Compute button → Triple Lock Calculator]
  - LTA (10(5)): [₹]
  - Special allowances (10(14)): [₹]
  - Gratuity (10(10)): [₹]
  - Leave encashment (10(10AA)): [₹]
  - VRS compensation (10(10C)): [₹]
  - Commuted pension (10(10A)): [₹]
  - Any other exempt: [₹] [Description field]
  
  NET SALARY: Auto-computed
  
  STANDARD DEDUCTION:
  - Auto-applied: ₹50,000 (old) or ₹75,000 (new)
  
  ENTERTAINMENT ALLOWANCE (Govt employees only):
  - Section 16(ii): Lower of actual, ₹5,000, or 1/5 of basic
  
  PROFESSIONAL TAX (16(iii)): [₹]
  
  INCOME UNDER SALARY HEAD: Auto-computed

Screen B3 — HRA Verification (Inline Tool)
  If employer's HRA exemption ≠ our calculated HRA exemption:
  
  Show comparison:
  ┌────────────────────────────────────────────┐
  │  Form 16 shows HRA exemption: ₹72,000     │
  │  Our calculation:              ₹84,000     │
  │  Difference:                   ₹12,000     │
  │                                            │
  │  ⚠️ You can claim the higher amount       │
  │  in your ITR. This is legal and correct.   │
  │                                            │
  │  [Use our calculated ₹84,000]              │
  │  [Use Form 16 figure ₹72,000]              │
  └────────────────────────────────────────────┘
  
  CA KNOWLEDGE: The ITR overrides employer calculation. If you can prove
  (with rent receipts) that you paid higher rent, claim the correct amount.

Screen B4 — Perquisites
  If Form 16 shows perquisites under Section 17(2):
    Break down by type:
    - Rent-free accommodation / concessional accommodation
    - Motor car / vehicle
    - Free meals (beyond ₹50/meal)
    - ESOP / sweat equity (value: FMV on exercise date - exercise price)
    - Interest-free loans
    - Other perquisites (specified in Rule 3)
  
  For each perquisite: verify employer's valuation against Rule 3 formula
  Flag if employer over-valued (common with accommodation perquisites)

Screen B5 — Multi-Employer (Job Switch)
  If more than one employer:
    - Enter details for each employer separately
    - Confirm: Did you submit Form 12B to new employer? (informs them of previous salary)
    - If no Form 12B: New employer may have under-deducted TDS
    - Compute aggregate income and total TDS correctly
    - Alert: "Your combined salary from both employers is ₹X. TDS deducted was ₹Y.
      Additional tax payable as self-assessment: ₹Z. Avoid Section 234B interest 
      by paying this before filing."
```

### MODULE C: HOUSE PROPERTY

```
Screen C1 — Property Inventory
  For each property owned:
  - Type: Residential / Commercial / Plot
  - Status: Self-occupied / Let-out / Deemed let-out / Vacant
  - Ownership: Sole / Joint (percentage share)
  - Address (mandatory)
  - PAN of co-owner if joint

Screen C2 — Self-Occupied Property
  - Annual Value: NIL (automatic)
  - Home loan interest paid (annual): [₹]
  - Home loan taken from: Bank / NBFC / Employer / Other
  - Pre-construction interest total: [₹]
    (1/5th per year for 5 years post-possession)
  - Is construction complete? If no: interest not deductible this year
  - Is this first home? → 80EEA check
  - Stamp duty value of property: [₹] → 80EEA eligibility check
  
  Computed:
  - Section 24(b) deduction: Min(interest, ₹2,00,000)
  - Section 80EEA: Additional ₹1,50,000 if eligible
  - Section 80C principal: [Principal repaid]

Screen C3 — Let-Out Property
  - Expected Rent (annual market rent): [₹]
  - Actual Rent Received: [₹]
  - Municipal Taxes Paid During Year: [₹]
  - Home loan interest (no cap for let-out): [₹]
  - Vacancy period (months): [n] → proportionate rent calculation
  
  Computed:
  - Gross Annual Value: Max(expected rent, actual rent)
  - Less: Municipal taxes
  = Net Annual Value
  - Less: 30% standard deduction
  - Less: Loan interest (full amount, no cap)
  = Income / Loss from let-out property
  
  If result is negative (Loss):
    Show: "Loss of ₹X from this property can be set off against your salary 
    income (up to ₹2L). Remaining ₹Y carries forward 8 years."

Screen C4 — Deemed Let-Out (2+ Properties)
  If taxpayer owns more than 1 self-occupied property:
    Show: "Tax law allows only ONE self-occupied property. Your other 
    property/properties are 'deemed let-out' — notional rent is taxable 
    even if you don't receive any rent."
    
    Ask: "Which property do you want to declare as self-occupied?"
    (User selects the one with higher value / lower tax impact)
    
    For deemed let-out property:
    - Fair market rent / municipal valuation: [₹]
    - Municipal taxes: [₹]
    - Loan interest (if any): [₹]
    - Same computation as let-out property
    
    CA SECRET: Always choose the self-occupied property that minimizes 
    overall tax. Usually the one with higher interest deduction benefits.
```

### MODULE D: CAPITAL GAINS

```
Screen D1 — Transaction Type Selection
  Which assets did you sell in FY 2025-26?
  ☐ Equity shares (listed)
  ☐ Equity mutual funds
  ☐ Debt mutual funds
  ☐ Property (residential/commercial/plot)
  ☐ Gold / Silver (physical)
  ☐ Bonds / Debentures
  ☐ Unlisted shares
  ☐ Sovereign Gold Bonds (maturity/premature)
  ☐ Unit Linked Insurance Plans (ULIP)
  ☐ Other capital assets

Screen D2 — Equity Shares / Equity Mutual Funds
  For each transaction (or upload broker statement):
  
  STCG (held < 12 months):
  - Security name / ISIN
  - Purchase date, purchase price, quantity
  - Sale date, sale price, quantity
  - STT paid: Yes/No (mandatory for 111A rate)
  - Auto-computed: STCG = (Sale price - Purchase price) × quantity
  - Tax rate: 20% (Section 111A)
  
  LTCG (held > 12 months):
  - Security name / ISIN
  - Purchase date, purchase price
  - If purchased before Jan 31, 2018:
      Show: FMV on Jan 31, 2018 (user enters from AMFI/NSE/BSE data)
      Grandfather clause cost = MAX(actual purchase price, FMV on Jan 31 2018)
  - Sale date, sale price
  - Auto-computed: LTCG = Sale price - Grandfathered cost
  - Annual exemption: First ₹1,25,000 LTCG across all equity is tax-free
  - Tax rate: 12.5% on gains above ₹1,25,000 (Section 112A)
  
  LOSS HARVESTING TOOL:
  If unrealized losses exist in portfolio:
  Show: "You have unrealized losses of ₹X on [securities]. Booking these 
  losses before March 31 would save ₹Y in tax on your current gains. 
  You can repurchase after 30 days."
  
  DIVIDEND INCOME FROM EQUITY:
  - Show separate entry for dividends received
  - TDS deducted by company (from Form 26AS/AIS)
  - Taxable at slab rate (not capital gains rate)
  - Claim TDS credit

Screen D3 — Property (Residential / Commercial / Plot)
  - Property description and address
  - Date of purchase
  - Purchase price (stamp duty value or registry value — higher)
  - Any improvements made (with dates): [₹]
  - Date of sale
  - Sale consideration (stamp duty value or actual — higher is used)
  - Brokerage / transfer expenses: [₹]
  
  HOLDING PERIOD CHECK:
  If held > 24 months → LTCG (changed from 36 months by Finance Act 2024)
  If held < 24 months → STCG (slab rate)
  
  INDEXATION CHOICE (if LTCG and purchased before July 23, 2024):
  Show: "You have a CHOICE under Finance Act 2024 amendments:"
  
  ┌─────────────────────────────────────────────────────┐
  │  Option A: 12.5% without indexation                │
  │  Capital Gain: ₹X                                  │
  │  Tax: ₹Y                                           │
  │                                                    │
  │  Option B: 20% with indexation                     │
  │  Indexed Cost: ₹Z                                  │
  │  Capital Gain: ₹P                                  │
  │  Tax: ₹Q                                           │
  │                                                    │
  │  ✅ RECOMMENDED: Option [A/B] saves you ₹[R]       │
  └─────────────────────────────────────────────────────┘
  
  EXEMPTION CHECK:
  Show Section 54 / 54EC / 54F eligibility questions:
  
  "Are you buying / have you bought another residential house within 
  2 years? (Section 54 — can exempt entire LTCG)"
  
  "Would you consider investing in NHAI/REC bonds within 6 months? 
  (Section 54EC — exempt up to ₹50L LTCG, bonds locked 5 years at ~5%)"
  
  CAPITAL GAINS ACCOUNT SCHEME:
  If reinvestment not complete before ITR filing date:
  Show: "You must deposit ₹[gain] in a Capital Gains Account (CGAS) 
  at a scheduled bank BEFORE filing your ITR to preserve your Section 54 
  exemption. Missing this forfeits the exemption permanently."

Screen D4 — Debt Mutual Funds / Gold / Bonds
  - Purchase date and price
  - Sale date and price
  - If held > 36 months: LTCG at 12.5% (no indexation post July 2024)
  - If held < 36 months: STCG at slab rate
  - Note: Debt MF purchased before April 1, 2023 had indexation benefit —
    check purchase date carefully

Screen D5 — Unlisted Shares
  - Holding period: > 24 months = LTCG at 12.5%
  - < 24 months = STCG at slab rate
  - Cost: Original issue price or FMV at time of receipt
  - Sale: As per share purchase agreement

Screen D6 — Loss Summary & Set-Off Planner
  Computed automatically:
  
  ┌──────────────────────────────────────────────────────┐
  │  CAPITAL GAINS SUMMARY                               │
  │                                                     │
  │  STCG (equity): ₹45,000   (taxable at 20%)         │
  │  LTCG (equity): ₹2,80,000 (₹1.25L exempt → ₹1.55L  │
  │                            taxable at 12.5%)        │
  │  LTCG (property): ₹8,50,000 (may be exempt - 54EC?) │
  │  STCL (mutual fund): (₹30,000)                     │
  │                                                     │
  │  OPTIMAL SET-OFF:                                   │
  │  Use STCL (₹30K) to reduce STCG → STCG now ₹15K    │
  │  Cannot use STCL against LTCG                       │
  │                                                     │
  │  FINAL TAX ON CAPITAL GAINS:                        │
  │  STCG: ₹15,000 × 20% = ₹3,000                     │
  │  LTCG: ₹1,55,000 × 12.5% = ₹19,375                │
  │  Property LTCG: ₹0 (if 54EC bonds invested)        │
  │  TOTAL: ₹22,375                                    │
  └──────────────────────────────────────────────────────┘
```

### MODULE E: BUSINESS / PROFESSIONAL INCOME

```
Screen E1 — Business Type
  "What best describes your work?"
  ○ Salaried employee (no separate business)
  ○ Freelancer / Consultant (project-based work)
  ○ Doctor / Lawyer / CA / Architect / Engineer (professional practice)
  ○ Small business owner (retail, trading, services)
  ○ Goods transport vehicle owner (Section 44AE)
  ○ Other business

Screen E2 — Presumptive Taxation Check (44ADA)
  If professional (doctor, lawyer, CA, architect, engineer, etc.):
  
  "What was your total professional fee / gross receipts in FY 2025-26?"
  Input: [₹]
  
  If ≤ ₹75L (with 50%+ digital receipts):
    Show OPTION:
    ┌──────────────────────────────────────────────────────┐
    │  PRESUMPTIVE TAXATION OPTION (Section 44ADA)         │
    │                                                      │
    │  Your gross receipts: ₹60,00,000                    │
    │                                                      │
    │  Option A: Declare 50% as profit = ₹30,00,000       │
    │  (No books needed, no audit, simple filing)         │
    │  Tax on ₹30L (new regime): ₹X                       │
    │                                                      │
    │  Option B: Declare actual profit (needs books)      │
    │  Your actual profit: [₹ input]                      │
    │  Tax on actual profit: ₹Y                           │
    │                                                      │
    │  ✅ RECOMMENDATION: [Show which saves more tax]      │
    │                                                      │
    │  CA SECRET: If actual profit < 50% of receipts,     │
    │  use actual (get books audited). If actual profit    │
    │  > 50%, use 44ADA (saves audit cost + complexity).   │
    └──────────────────────────────────────────────────────┘

Screen E3 — Presumptive Business (44AD)
  "What was your business turnover in FY 2025-26?"
  "What % was received via digital payment / cheque / banking?"
  
  If ≤ ₹3Cr (if 95%+ digital):
    Show similar option: 8% or 6% of turnover vs actual profit
    
  CA SECRET EXPLAINED:
  "Under 44AD, if your actual profit is ₹8L on ₹1Cr turnover, 
  you MUST declare at least 8% = ₹8L. If actual is ₹12L, you 
  MUST declare ₹12L (you cannot declare less than actual). 
  44AD only helps when actual profit < statutory percentage."

Screen E4 — Actual Business Income (if not opting presumptive)
  - Gross Revenue: [₹]
  - Cost of goods sold: [₹]
  = Gross Profit: auto
  
  DEDUCTIBLE EXPENSES:
  - Rent of business premises: [₹]
  - Salaries and wages: [₹]
  - Electricity and utilities: [₹]
  - Depreciation: [Computed from asset register]
  - Professional and legal fees: [₹]
  - Advertisement: [₹]
  - Travel and conveyance: [₹]
  - Phone and internet: [₹] (only business use %)
  - Interest on business loan: [₹]
  - Bad debts written off: [₹]
  - Other business expenses: [₹]
  
  = Net Profit / Loss: auto
  
  AUDIT CHECK:
  If turnover > ₹1Cr (business) or ₹50L (professional):
    Show: "Your turnover exceeds the audit threshold under Section 44AB. 
    You need a Chartered Accountant to audit your books and file the 
    tax audit report (Form 3CA/3CB + 3CD) before October 31, AY 2026-27."
```

### MODULE F: OTHER INCOME

```
Screen F1 — Interest Income
  - Savings account interest (all banks combined): [₹]
    Deduction: 80TTA ₹10,000 (or 80TTB ₹1,00,000 if senior)
  - FD interest: [₹] (fully taxable, no deduction)
    TDS on FD: Usually 10% if income > ₹40,000/year (₹50,000 for senior)
    Show: "Check Form 26AS for TDS deducted by bank. Claim credit."
  - RD interest: [₹]
  - Post office savings interest: [₹]
    Exempt: Up to ₹3,500 (Section 10(15)(i))
  
  FORM 15G/15H TIP (shown even if not in current year):
  "If your total income is below taxable limit and you have FD interest,
  submit Form 15G (below 60) or Form 15H (senior) to your bank to prevent
  TDS deduction. This avoids waiting for refund after filing ITR."

Screen F2 — Dividend Income
  - List all companies / MFs from which dividend received
  - TDS deducted (10% if dividend > ₹5,000 from one company): From 26AS
  - Total dividend income: [₹]
  - Taxable at slab rate
  
  SHOW FROM AIS: If connected to portal, pre-fill from AIS data

Screen F3 — Other Taxable Income
  - Family pension received: [₹]
    Standard deduction: ₹15,000 or 1/3rd whichever is less
  - Winnings from lottery/KBC/online gaming: [₹]
    Tax: 30% flat + cess, no deduction allowed
    TDS: 30% deducted at source (claim credit)
  - Interest on income tax refund (from previous ITR): [₹]
  - Subletting income (if you sublet rented property): [₹]
  - Agricultural income: [₹]
    (Note: Exempt from income tax per Section 10(1) but affects slab 
    rate via partial integration method)
  - Gift from non-relatives: [₹]
    (Exempt up to ₹50,000 aggregate; excess taxable as Other Sources)
  - Royalty income (if not under Head 3): [₹]
```

### MODULE G: DEDUCTIONS COLLECTION

```
Screen G1 — 80C Collection
  (Pre-fill from salary module where applicable — EPF, home loan principal)
  
  Remaining limit shown live: [████░░] ₹X remaining of ₹1,50,000
  
  PPF: [₹]     ELSS: [₹]     LIC: [₹]     NSC: [₹]
  SSY: [₹]     Tax-saving FD: [₹]     Tuition fees: [₹]
  ULIP: [₹]    SCSS: [₹]     Others: [₹]
  
  Total: Auto. Capped at ₹1,50,000.

Screen G2 — NPS Deductions
  - Self NPS contribution 80CCD(1B): [₹] (max ₹50,000)
    Available in OLD regime only — show alert if new regime selected
  - Employer NPS 80CCD(2): [₹] (from salary slip)
    Available in BOTH regimes

Screen G3 — Health Insurance (80D)
  - Premium for self + family: [₹] (max ₹25,000; ₹50,000 if self > 60)
  - Premium for parents: [₹]
  - Parents age: [below 60 / 60+]
    Limit: ₹25,000 or ₹50,000
  - Preventive health check-up (within overall limit): [₹] (max ₹5,000)
  - Medical bills for senior parents without insurance: [₹] (max ₹50,000)
  Total 80D: Auto-computed with caps

Screen G4 — Home Loan Deductions
  (Pre-filled from Module C)
  - Section 24(b): ₹X (auto from house property module)
  - Section 80EEA: ₹X (auto if eligible)

Screen G5 — Other Deductions
  - Education loan interest 80E: [₹] (no cap)
  - 80G donations: [₹] with category selection
  - 80GG rent deduction: [₹] (if no HRA + not owner)
  - 80TTA/80TTB: (Auto from F1)
  - 80DD disabled dependant: [Flat amount based on disability %]
  - 80DDB specified disease: [₹] (with certificate details)
  - 80U self disability: [Flat amount]
  - 80E: [₹]
  - 80QQB royalty: [₹] (max ₹3L)
  - 80RRB patent royalty: [₹] (max ₹3L)
```

### MODULE H: TAX PAYMENTS

```
Screen H1 — TDS Summary
  "What TDS was deducted on your behalf?"
  
  Pre-fill from Form 26AS if available (V2 feature)
  Manual entry:
  - TDS by employer: [₹] (from Form 16 Part A)
  - TDS by banks on FD: [₹] (from Form 16A or 26AS)
  - TDS on rent received: [₹]
  - TDS on professional fees: [₹]
  - TDS on dividend: [₹]
  - TDS on any other income: [₹]
  
  Show mismatch alert if total TDS here ≠ AIS total

Screen H2 — Advance Tax
  "Did you pay any advance tax during the year?"
  (Required if total tax > ₹10,000 and not purely salary)
  
  - Q1 payment (by Jun 15): [₹] + Challan number
  - Q2 payment (by Sep 15): [₹] + Challan number
  - Q3 payment (by Dec 15): [₹] + Challan number
  - Q4 payment (by Mar 15): [₹] + Challan number
  
  234B/234C interest auto-calculated and shown

Screen H3 — Self-Assessment Tax
  Computed: Tax Due - TDS - Advance Tax = Balance Payable
  
  If balance payable > 0:
  Show: "You need to pay ₹X as self-assessment tax BEFORE filing your ITR.
  Pay via Challan 280 at incometax.gov.in or any authorized bank.
  Select: AY 2026-27, Income Tax, Self-Assessment Tax.
  Enter challan number here after payment: [                ]"
  
  If balance < 0 (Refund):
  Show: "You will receive a refund of ₹X. It will be credited to your 
  designated bank account within 30-45 days of ITR processing. 
  Ensure your account number and IFSC are correct."
```

---

## 7. PRE-FILING VERIFICATION ENGINE

### 7.1 The 10-Point CA Verification Checklist

```
Before generating the final ITR, run these checks:

CHECK 1 — Income Completeness vs AIS
  Compare ITR income to AIS reported income
  
  Sources AIS captures (that taxpayers often miss):
  - Salary TDS (automatically from employer)
  - Bank interest (FD, savings — reported by banks)
  - Dividend income (reported by companies/MFs)
  - Property registrations (reported by sub-registrar)
  - Mutual fund purchases > ₹10L (reported by MF)
  - Foreign remittance > $25,000 (reported by bank)
  - SFT (Specified Financial Transactions) — FD above ₹10L etc.
  
  If discrepancy:
  Show: "AIS shows ₹X income that you haven't declared. Either confirm and
  add it to your ITR, or mark it as 'incorrect' in AIS portal and provide
  a response. Unexplained AIS discrepancies attract notices."

CHECK 2 — TDS Credit Match
  Total TDS in ITR == Total TDS in Form 26AS?
  If mismatch:
    Over-claim: "You're claiming more TDS than Form 26AS shows. This will 
    cause ITR processing delay and potential demand."
    Under-claim: "You're leaving TDS credits unclaimed. Increase to 
    match Form 26AS."

CHECK 3 — PAN-Aadhaar Link
  Verify linked status (show how to check on portal)
  If not linked: "Your ITR will be invalid. Link Aadhaar to PAN immediately 
  at incometax.gov.in. Process takes 4-5 days."

CHECK 4 — Bank Account Validation
  IFSC and account number valid format?
  At least one account marked for refund?
  Refund account is active and pre-validated?

CHECK 5 — Form 10E (Section 89 Arrears)
  If Section 89 relief claimed in ITR → Has Form 10E been filed?
  If No: "CRITICAL: File Form 10E on income tax portal BEFORE submitting ITR.
  If Form 10E is not pre-filed, Section 89 relief will be AUTOMATICALLY DENIED
  even if you're eligible. This is a non-negotiable prerequisite."

CHECK 6 — Capital Gains Account Scheme
  If Section 54/54F reinvestment incomplete + filing before reinvestment:
    "You must deposit ₹X in CGAS before filing. Have you done this?"
    [Yes — I deposited]  [No — Show me how]

CHECK 7 — Advance Tax Reconciliation
  Is 234B/234C interest correctly computed?
  Is total advance tax + TDS ≥ 90% of assessed tax?

CHECK 8 — Foreign Assets / Bank Accounts
  If any foreign income or assets mentioned:
    Schedule FA and FSI mandatory in ITR-2
    Non-disclosure = Black Money Act prosecution

CHECK 9 — Virtual Digital Assets (Crypto)
  Did taxpayer transact in crypto/NFTs/VDAs?
  30% tax on gains (no deductions allowed, no loss set-off)
  1% TDS deducted by exchange (claim credit)
  Mandatory disclosure in Schedule VDA

CHECK 10 — AMT Check (for high-income filers)
  If total income > ₹20L and large deductions:
    Check if Alternative Minimum Tax (115JC) applies
    AMT = 18.5% of adjusted total income
    If AMT > normal tax → pay AMT (claim credit in future years)
```

### 7.2 Pre-Filing Report Card

```
Show user a "readiness score" before final submission:

┌──────────────────────────────────────────────────────────────┐
│  ITR READINESS CHECK                                         │
│                                                              │
│  ✅ All income declared            COMPLETE                  │
│  ✅ TDS matches Form 26AS          COMPLETE                  │
│  ⚠️  Form 10E not filed            ACTION NEEDED             │
│  ✅ Aadhaar-PAN linked             COMPLETE                  │
│  ✅ Refund bank account set        COMPLETE                  │
│  ✅ Section 89 relief computed     COMPLETE                  │
│  ⚠️  AIS mismatch — ₹12,000 FD    REVIEW NEEDED             │
│                                                              │
│  READINESS: 80%                                              │
│                                                              │
│  Fix 2 issues before proceeding.                            │
│  [Fix Form 10E Issue]  [Review AIS Mismatch]                │
└──────────────────────────────────────────────────────────────┘
```

---

## 8. TAX COMPUTATION ENGINE — FULL LOGIC

### 8.1 Computation Sequence

```javascript
function computeFinalTax(inputs) {

  // STEP 1: Compute each head of income
  const salaryIncome      = computeSalaryIncome(inputs);
  const housePropertyIncome = computeHouseProperty(inputs);
  const businessIncome    = computeBusinessIncome(inputs);
  const capitalGains      = computeCapitalGains(inputs);  // returns stcg, ltcg objects
  const otherSourcesIncome = computeOtherSources(inputs);

  // STEP 2: Set-off losses (before aggregation)
  const setOffResult = applyLossSetOff({
    salary: salaryIncome,
    houseProperty: housePropertyIncome,
    business: businessIncome,
    capitalGains,
    otherSources: otherSourcesIncome,
  });

  // STEP 3: Gross Total Income
  const grossTotalIncome = setOffResult.salaryAfterSetOff
    + Math.max(0, setOffResult.housePropertyAfterSetOff)
    + Math.max(0, setOffResult.businessAfterSetOff)
    + setOffResult.otherSourcesAfterSetOff;
  // Note: Special rate capital gains (111A, 112A) computed separately

  // STEP 4: Deductions Chapter VI-A
  const deductions = computeDeductions(inputs, grossTotalIncome);
  
  // STEP 5: Total Income
  const totalIncome = grossTotalIncome - deductions.total;
  
  // STEP 6: Carry Forward (losses not absorbed)
  const carryForward = computeCarryForward(setOffResult);

  // STEP 7: Tax Computation — Old Regime
  const oldRegimeTax = computeOldRegimeTax(totalIncome, inputs.ageCategory, capitalGains);
  
  // STEP 8: Tax Computation — New Regime
  const newRegimeTax = computeNewRegimeTax(
    grossTotalIncome - deductions.newRegimeDeductions,
    capitalGains
  );

  // STEP 9: Add interest (234A/B/C)
  const interest234 = compute234Interest(oldRegimeTax, newRegimeTax, inputs);

  // STEP 10: TDS and Advance Tax credits
  const netTaxPayable = applyCredits(
    Math.min(oldRegimeTax.total, newRegimeTax.total),
    inputs.tdsDeducted,
    inputs.advanceTaxPaid,
    interest234
  );

  return {
    grossTotalIncome,
    deductions,
    totalIncome,
    oldRegime: oldRegimeTax,
    newRegime: newRegimeTax,
    recommendedRegime: oldRegimeTax.total < newRegimeTax.total ? 'old' : 'new',
    capitalGains,
    carryForward,
    interest234,
    netTaxPayable,
    refundDue: netTaxPayable < 0 ? Math.abs(netTaxPayable) : 0,
    balanceDue: netTaxPayable > 0 ? netTaxPayable : 0,
  };
}
```

### 8.2 Loss Set-Off Rules Engine

```javascript
function applyLossSetOff(incomes) {
  let { salary, houseProperty, business, capitalGains, otherSources } = incomes;
  const carryForward = {};

  // RULE 1: House Property Loss → offset against Salary (max ₹2L)
  if (houseProperty < 0) {
    const setOff = Math.min(Math.abs(houseProperty), 200000, salary);
    salary -= setOff;
    const remaining = Math.abs(houseProperty) - setOff;
    if (remaining > 0) carryForward.housePropertyLoss = remaining;
    houseProperty = 0;
  }

  // RULE 2: Business Loss → offset against any income EXCEPT salary
  if (business < 0) {
    const busLoss = Math.abs(business);
    // Try: other sources first, then house property income (if any left)
    let remaining = busLoss;
    if (otherSources > 0) {
      const setOff = Math.min(remaining, otherSources);
      otherSources -= setOff;
      remaining -= setOff;
    }
    if (remaining > 0) carryForward.businessLoss = remaining;
    business = 0;
  }

  // RULE 3: STCL → offset against STCG, then LTCG
  if (capitalGains.stcl > 0) {
    let stcl = capitalGains.stcl;
    const stcgOffset = Math.min(stcl, capitalGains.stcg);
    capitalGains.stcg -= stcgOffset;
    stcl -= stcgOffset;
    if (stcl > 0) {
      const ltcgOffset = Math.min(stcl, capitalGains.ltcg);
      capitalGains.ltcg -= ltcgOffset;
      stcl -= ltcgOffset;
    }
    if (stcl > 0) carryForward.stcl = stcl;
  }

  // RULE 4: LTCL → offset only against LTCG
  if (capitalGains.ltcl > 0) {
    const ltcgOffset = Math.min(capitalGains.ltcl, capitalGains.ltcg);
    capitalGains.ltcg -= ltcgOffset;
    const remaining = capitalGains.ltcl - ltcgOffset;
    if (remaining > 0) carryForward.ltcl = remaining;
  }

  return { salary, houseProperty, business, capitalGains, otherSources, carryForward };
}
```

### 8.3 Agricultural Income Integration (Partial Integration Method)

```javascript
/**
 * Agricultural income is EXEMPT from income tax.
 * BUT it affects the tax rate on non-agricultural income.
 * 
 * Method: Add agricultural income to total income, compute tax.
 * Then compute tax on only agricultural income (using same slabs).
 * Actual tax = Tax on (total + agri) - Tax on (basic exemption + agri)
 *
 * This is how agricultural income pushes other income into higher slabs.
 */
function computeWithAgriculturalIncome(totalIncome, agriIncome, ageCategory) {
  if (!agriIncome || agriIncome <= 0) return computeNormalTax(totalIncome, ageCategory);
  
  const taxOnTotalPlusAgri = computeNormalTax(totalIncome + agriIncome, ageCategory);
  const basicExemption = getBasicExemption(ageCategory);
  const taxOnExemptionPlusAgri = computeNormalTax(basicExemption + agriIncome, ageCategory);
  
  return taxOnTotalPlusAgri - taxOnExemptionPlusAgri;
}
```

---

## 9. ITR JSON GENERATOR

### 9.1 JSON Structure (ITR-1 / ITR-2 Schema AY 2026-27)

```javascript
/**
 * Generate ITR JSON in the format accepted by the income tax portal.
 * Portal accepts JSON upload directly (validated against official schema).
 * Schema is published annually by CBDT/Infosys (IT portal vendor).
 *
 * Version: Must match the current ITR utility version published by IT Dept.
 */
function generateITR2JSON(data, computedTax) {
  return {
    "ITR": {
      "ITR2": {
        "CreationInfo": {
          "SWVersionNo": "1.0",
          "SWCreatedBy": "TaxTruth India",
          "JSONCreatedDate": new Date().toISOString().slice(0, 10),
          "InterfaceVersion": "1"
        },
        "Form_ITR2": {
          "FormName": "ITR-2",
          "Description": "For Individuals and HUFs not having income from profit and gains of business or profession",
          "AssessmentYear": "2026-27",
          "SchemaVersion": "1.0.0"
        },
        "PersonalInfo": buildPersonalInfo(data),
        "FilingStatus": buildFilingStatus(data),
        "PartA_GEN1": buildPartAGen1(data),
        "ScheduleS": buildScheduleS(data),      // Salary
        "ScheduleHP": buildScheduleHP(data),    // House Property
        "ScheduleCG": buildScheduleCG(data),    // Capital Gains
        "ScheduleOS": buildScheduleOS(data),    // Other Sources
        "ScheduleVIA": buildScheduleVIA(data),  // Deductions
        "ScheduleIT": buildScheduleIT(data),    // TDS on Salary
        "ScheduleTDS1": buildScheduleTDS1(data),// TDS on Salary (Form 16)
        "ScheduleTDS2": buildScheduleTDS2(data),// TDS on Other Income
        "ScheduleTCS": buildScheduleTCS(data),  // TCS
        "ScheduleTR": buildScheduleTR(data),    // Tax Relief
        "ScheduleFA": data.hasForeignAssets ? buildScheduleFA(data) : null,
        "PartB_TI": buildPartBTI(computedTax),  // Total Income
        "PartB_TTI": buildPartBTTI(computedTax),// Total Tax Computation
        "Verification": {
          "Declaration": "I hereby declare that this return is correct and complete.",
          "Place": data.city,
          "Date": new Date().toISOString().slice(0, 10)
        }
      }
    }
  };
}
```

### 9.2 JSON Download and Portal Upload Guide

```
After JSON generation:

Step 1: Download the JSON file
  Button: "Download ITR-[n] JSON File"
  Filename: ITR2_AY2026-27_[PAN].json

Step 2: Validate (optional)
  Button: "Validate JSON"
  Uses official CBDT schema validation (same as portal uses)
  Shows any errors before upload

Step 3: Upload to portal
  Show exact steps:
  1. Go to incometax.gov.in
  2. Login with PAN and password
  3. Go to: e-File → Income Tax Returns → File Income Tax Return
  4. Select AY 2026-27
  5. Select: Online mode or Offline (JSON upload)
  6. For JSON: Click "Upload JSON" → select your downloaded file
  7. Portal will parse and show pre-filled ITR
  8. Review all sections
  9. Submit

  [Embed video walkthrough — 3 minutes]
```

---

## 10. FILING ASSISTANT — STEP-BY-STEP PORTAL GUIDE

### 10.1 E-Verification Options

```
After ITR is submitted online, it must be verified within 30 days.
Unverified ITR = not filed (as per CBDT Rule 12).

OPTION 1: Aadhaar OTP (Fastest — recommended)
  Aadhaar must be linked to PAN and mobile
  OTP valid for 15 minutes
  Instant verification

OPTION 2: Net Banking EVC (Electronic Verification Code)
  Login to your bank's net banking
  Find "Tax Services" → Generate EVC
  Use EVC on income tax portal

OPTION 3: Bank ATM EVC
  Swipe card at ATM
  Select "Generate EVC for ITR filing"
  Use at portal

OPTION 4: Demat Account EVC
  Through NSDL/CDSL demat account
  For those with active demat

OPTION 5: Physical Signature (ITR-V)
  Print ITR Acknowledgement (ITR-V form)
  Sign in blue ink
  Post to CPC Bangalore within 30 days:
    "Income Tax Department – CPC,
     Post Box No. 1, Electronic City Post Office,
     Bangalore – 560100, Karnataka"
  Send by ordinary or speed post only (no courier)
  
  CA RECOMMENDATION: Always use Aadhaar OTP — fastest and safest.
```

### 10.2 Common Portal Issues and Fixes

```
ERROR: "PAN not linked to Aadhaar"
  Fix: Link at incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar
  Fee: ₹1,000 after the deadline (already mandatory)
  Time: 4-5 working days after payment

ERROR: "Mismatch in personal details"
  Fix: Ensure name exactly matches PAN database (including spaces/initials)

ERROR: "Refund bank account not pre-validated"
  Fix: Go to Profile → Bank Account → Add and Pre-validate
  Validation takes 2-3 days

ERROR: "ITR not processed after 45 days"
  Check: Grievance redressal at e-nivaran portal

ERROR: "Demand notice after filing"
  Usually: TDS mismatch or advance tax computation error
  Fix: File rectification application under Section 154 online
```

---

## 11. POST-FILING INTELLIGENCE

### 11.1 Refund Status Tracker

```
After filing, show user:
- Acknowledgement number (ITR-V)
- Expected refund amount
- Status: Filed → Verified → Under Processing → Refund Issued

Check status API: IT department has e-filing portal status check
Link: incometax.gov.in/iec/foservices/#/dashboard (after login)

REFUND DELAY REASONS (and fixes):
- Bank account not pre-validated → pre-validate
- Demand outstanding → pay demand first
- ITR not e-verified → verify immediately (within 30 days)
- Scrutiny selected → wait for notice
- High refund amount → may be manually reviewed (normal)

INTEREST ON DELAYED REFUND (Section 244A):
"If your refund is delayed beyond 3 months from the end of AY,
you are entitled to interest at 6% per annum on the refund amount.
This interest is taxable in the year received."
```

### 11.2 Notice Decoder

```
NOTICE TYPE 1 — Intimation under Section 143(1)
  What it means: IT department processed your ITR and found:
    (a) It matches their records → you get a "no demand, no refund" intimation
    (b) Demand: They computed higher tax than you paid
    (c) Refund: They owe you money
  Action needed: Read carefully. If demand, verify if correct. If wrong → rectify.
  Most 143(1) intimations are informational. No CA needed.

NOTICE TYPE 2 — Defective Return under Section 139(9)
  What it means: Your ITR has a technical error — missing schedule, 
    wrong form, income mismatch
  Action needed: Respond within 15 days. File a revised/corrected ITR.
  Time: Urgent — missing the deadline = ITR treated as not filed.

NOTICE TYPE 3 — Scrutiny under Section 143(2)
  What it means: IT department is investigating your return.
    Must be issued within 6 months of end of AY (Sept 30 of AY 2026-27).
  Action needed: CONSULT A CA. Do not respond without professional help.
  
NOTICE TYPE 4 — Section 148 (Escaped Assessment)
  What it means: IT department believes you under-reported income.
    Can be issued up to 3 years after AY (10 years if >₹50L escaped).
  Action needed: IMMEDIATE CA CONSULTATION.

NOTICE TYPE 5 — Section 156 (Demand Notice)
  What it means: You owe tax after assessment. Pay within 30 days.
  Action needed: Verify demand is correct. If wrong → Section 154 rectification.
    If correct → Pay immediately to avoid 1% monthly interest.

NOTICE TYPE 6 — Non-Filer Notice
  What it means: AIS shows income but no ITR filed.
  Action needed: File ITR immediately, even belated.
```

### 11.3 Carry Forward Register

```
Maintain (in browser localStorage — never transmitted):
- Losses carried forward to next year
- Unabsorbed depreciation carried forward
- Unused 80C investments that couldn't be claimed
- Set-off amounts used this year

Show next year: "In your FY 2026-27 return, you can use these carry-forward 
amounts: STCL ₹30,000, House Property Loss ₹1,40,000"

This makes TaxTruth a multi-year relationship tool — not a one-time calculator.
```

---

## 12. LOSS HARVESTING & CARRY FORWARD ENGINE

### 12.1 Carry Forward Rules (Complete)

```
LOSSES AND THEIR CARRY-FORWARD:

1. HOUSE PROPERTY LOSS:
   Set-off in same year: Any head (max ₹2L against salary)
   Carry forward: 8 assessment years
   Future set-off: Only against House Property income
   Condition: ITR must be filed before due date (late filers lose carry-forward)

2. NON-SPECULATIVE BUSINESS LOSS:
   Set-off in same year: Any head EXCEPT salary
   Carry forward: 8 assessment years
   Future set-off: Only against business income
   Condition: ITR filed before due date (strict)

3. SPECULATIVE BUSINESS LOSS (intraday trading):
   Set-off in same year: Only against speculative profit
   Carry forward: 4 assessment years
   Future set-off: Only against speculative business income

4. SHORT-TERM CAPITAL LOSS:
   Set-off in same year: STCG + LTCG
   Carry forward: 8 assessment years
   Future set-off: STCG and LTCG

5. LONG-TERM CAPITAL LOSS:
   Set-off in same year: Only LTCG
   Carry forward: 8 assessment years
   Future set-off: Only LTCG
   Note: LTCL from equity is allowed only post Finance Act 2018 (pre-2018 LTCG was exempt)

6. UNABSORBED DEPRECIATION:
   Set-off in same year: Any head
   Carry forward: INDEFINITELY (no 8-year limit)
   Future set-off: Any head
   This is the most powerful carry-forward — no time limit

7. LOSS FROM OWNING HORSE (speculation):
   Carry forward: 4 years, only against horse racing income

CA CRITICAL RULE: For all losses EXCEPT unabsorbed depreciation and 
house property loss — ITR must be filed BEFORE the due date to carry 
them forward. If you file a belated return → you LOSE the right to 
carry forward all business and capital losses. This is catastrophic 
for traders and investors who miss July 31.
```

### 12.2 Tax Loss Harvesting Tool (Pre-March 31 Planner)

```
Show in October/November/February (time-aware):

"TAX LOSS HARVESTING OPPORTUNITY"

Your current portfolio (if user enters unrealized P&L):
┌──────────────────────────────────────────────────────────────┐
│  Current Realized Gains This Year:                          │
│  LTCG (equity): ₹2,80,000 → Tax: ₹19,375                   │
│  STCG (equity): ₹45,000   → Tax: ₹9,000                    │
│                                                             │
│  Unrealized Losses in Portfolio:                            │
│  Mutual Fund X: (₹35,000) [STCL if sold now]               │
│  Stock Y:       (₹22,000) [STCL if sold now]               │
│                                                             │
│  IF YOU SELL THESE BEFORE MARCH 31:                        │
│  STCL of ₹57,000 offsets STCG of ₹45,000 → STCG = ₹0     │
│  Remaining STCL ₹12,000 offsets LTCG → LTCG = ₹2,68,000  │
│                                                             │
│  TAX SAVED: ₹9,000 (from STCG) + ₹1,500 (from LTCG offset)│
│  = ₹10,500 tax saved                                       │
│                                                             │
│  ⚠️ You can repurchase after 30 days (or buy similar fund  │
│  immediately) to maintain market exposure.                  │
└──────────────────────────────────────────────────────────────┘
```

---

## 13. LOOPHOLE REGISTRY — EVERY LEGAL TAX SAVING KNOWN TO INDIAN LAW

These are legally valid tax optimization strategies used by CAs for their HNI clients. Every salaried or investing taxpayer should know these.

```
LOOPHOLE L001 — Employer NPS in New Regime
  Legal basis: Section 80CCD(2), Finance Act 2020
  Who benefits: Every salaried employee in new regime
  What to do: Ask employer to route salary into NPS contribution
  Saving: Up to 10% of basic × 30% tax = up to ₹X saved
  Effort: One email to HR (template provided)

LOOPHOLE L002 — Section 89 Arrears Relief
  Legal basis: Section 89, Rule 21A
  Who benefits: Anyone who received prior-year salary in current year
  What to do: File Form 10E on portal BEFORE filing ITR
  Saving: Eliminates "bunching" effect of receiving 2 years' income in 1 year
  CA note: ALWAYS check for arrears. Many increment letters are backdated.

LOOPHOLE L003 — ITR Overrides Employer for Deductions
  Legal basis: Section 139 — ITR is final self-assessment
  Who benefits: Anyone whose employer under-computed deductions
  What to do: Compute actual deductions yourself. File correct amount in ITR.
  Example: Employer computed ₹72,000 HRA, actual ₹84,000 → claim ₹84,000 in ITR
  Saving: Difference × tax rate

LOOPHOLE L004 — House Property Loss Set-Off Against Salary
  Legal basis: Section 71, Section 24
  Who benefits: Home loan holders with interest > rental income
  What to do: Show house property computation in ITR, declare loss, set off
  Saving: Up to ₹2,00,000 × 30% = ₹60,000/year
  Most missed: Yes — majority of home loan holders miss this

LOOPHOLE L005 — Indexation Choice for Pre-July 2024 Property
  Legal basis: Finance Act 2024 proviso — grandfathering clause
  Who benefits: Anyone selling property purchased before July 23, 2024
  What to do: Calculate tax under both regimes. Choose lower.
  Potential saving: ₹2L–₹20L depending on property age and inflation

LOOPHOLE L006 — Section 54EC — Bond Reinvestment for Property Gains
  Legal basis: Section 54EC
  Who benefits: Anyone selling property (LTCG)
  What to do: Invest in NHAI/REC bonds within 6 months of sale
  Saving: 12.5% of up to ₹50L invested = up to ₹6.25L saved
  Trade-off: 5-year lock-in at ~5% interest (interest taxable)

LOOPHOLE L007 — Grandfather Clause for Old Equity
  Legal basis: Section 112A proviso, Finance Act 2018
  Who benefits: Anyone holding equity/equity MF purchased before Jan 31, 2018
  What to do: Use FMV on Jan 31, 2018 as cost (not original purchase price)
  Saving: If stock at ₹100 in 2015, ₹300 on Jan 31 2018, sold at ₹500 today —
          gain is only ₹200, not ₹400. Saves 12.5% on ₹200 = ₹25/unit

LOOPHOLE L008 — Section 54F for ANY Asset → Residential House
  Legal basis: Section 54F
  Who benefits: Anyone selling non-residential assets with LTCG
  What to do: Invest NET SALE CONSIDERATION in residential property
  Saving: ENTIRE LTCG exempt
  Condition: Don't own more than 1 house. Don't sell within 3 years.
  Example: LTCG from selling gold → buy house → ₹0 capital gains tax

LOOPHOLE L009 — Capital Gains Account Scheme to Preserve Exemption
  Legal basis: Capital Gains Account Scheme Rules, 1988
  Who benefits: Anyone with 54/54F reinvestment not complete by ITR date
  What to do: Open CGAS at bank, deposit capital gains amount
  Saving: Preserves entire exemption even if property not yet purchased
  CRITICAL: Must be done BEFORE filing ITR

LOOPHOLE L010 — Tax Loss Harvesting Before March 31
  Legal basis: Sections 70–74 (set-off provisions)
  Who benefits: Investors with both unrealized gains and losses
  What to do: Book losses to offset gains before year-end
  Saving: ₹5,000–₹50,000 depending on portfolio
  Repurchase: After 30 days to maintain exposure

LOOPHOLE L011 — HUF (Hindu Undivided Family) Tax Splitting
  Legal basis: Section 10(2), Section 2(31)
  Who benefits: Hindu families with significant joint property or business
  What to do: Create HUF, transfer ancestral property to HUF
  Saving: HUF gets its own ₹2.5L/₹3L basic exemption and all deductions
  Note: Requires proper HUF deed and separate PAN for HUF
  CA note: Increasingly scrutinized. Do only with proper CA advice.

LOOPHOLE L012 — Gift to Spouse (With Caution)
  Legal basis: Clubbing provisions Section 64
  What NOT to do: Gift money to spouse and think it's untaxed
  Clubbing rule: Income from gifted assets is taxed in donor's hands
  What CAN work: Gift to spouse for reinvestment in business (not investment)
                 Income from business is NOT clubbed (only investment income is)

LOOPHOLE L013 — Children's Income Below ₹1,500
  Legal basis: Section 64(1A)
  Minor child's income is clubbed with parent income
  EXEMPT: ₹1,500 per child per year
  What to do: Invest in minor child's name up to ₹1,500 annual income
  Note: Once child turns 18 → no clubbing (income in child's hands only)

LOOPHOLE L014 — Sovereign Gold Bond Maturity Tax-Free
  Legal basis: CBDT circular, Section 47(viic)
  Who benefits: SGBs held till 8-year maturity
  Capital gain on maturity: FULLY EXEMPT
  Interest during holding: Taxable at slab rate
  Trading on exchange before maturity: LTCG if held > 12 months (12.5%)
  OPTIMAL: Hold till maturity for 100% capital gain exemption

LOOPHOLE L015 — Section 80DDB — Medical Treatment Claims
  Legal basis: Section 80DDB, Rule 11DD
  Who benefits: Anyone with specified disease (cancer, kidney, etc.)
  What most people miss: The disease list includes common conditions.
    Neurological diseases include Parkinson's, Alzheimer's, Dementia.
    Many families miss this.
  Deduction: ₹40,000 (or ₹1,00,000 for senior) minus insurance reimbursement

LOOPHOLE L016 — Interest Income in Spouse's Name
  Who benefits: High-income taxpayer with FD interest
  Strategy: Instead of keeping FD in your name (30% tax), transfer to spouse
    But: Clubbing applies if gifted. Solution: Spouse earns independently.
  Note: If spouse has zero/low income → same FD in their name means much lower tax

LOOPHOLE L017 — Agricultural Land Sale — Not Capital Gains
  Legal basis: Section 2(14) — Rural agricultural land NOT a capital asset
  Rural agricultural land sale: COMPLETELY EXEMPT — not even taxable
  Urban agricultural land: Taxable as capital gains
  Definition of rural: Not within 8 km of town with 10,000+ population
    (specifics per Rule 6DB)
  Many farmers in peri-urban areas unknowingly pay tax on what's exempt.

LOOPHOLE L018 — Section 10(38) Replacement — Grandfathered Equity LTCG
  For equity held since before 2018: Entire gain up to Jan 31, 2018 FMV = exempt
  Only gains above FMV on Jan 31, 2018 are taxable
  This effectively makes decades of old equity growth tax-free

LOOPHOLE L019 — Form 15G/15H — Prevent Unnecessary TDS on FD
  Who benefits: Anyone with FD income where total income is below tax threshold
  What to do: Submit Form 15G (below 60) or 15H (senior) to bank at start of year
  Saving: Prevents bank from deducting 10% TDS, avoid waiting for refund
  Note: False declaration = penalty. Use only if income genuinely below taxable limit.

LOOPHOLE L020 — Joining Bonus Clawback — Section 89 or 17(1) Deduction
  If you repaid a joining bonus (changed jobs, returned signing amount):
  Deduction: Repaid amount is deductible from salary income
  Or: Section 89 relief if it was paid in a prior year
  Most CAs miss this. Most employees definitely miss this.

LOOPHOLE L021 — Gratuity Optimization
  Legal basis: Section 10(10) — Payment of Gratuity Act
  Exempt: Up to ₹20L for non-government employees
  How to maximize: Ensure gratuity formula is correctly applied
    (15 days × last drawn salary × years of service) / 26
  Many employers round down years. Verify the calculation independently.

LOOPHOLE L022 — Leave Encashment on Retirement
  Legal basis: Section 10(10AA)
  Exempt: Up to ₹25L (revised in Budget 2023)
  On resignation (not retirement): Not exempt — fully taxable
  Strategy: Maximize leave accumulation toward retirement year

LOOPHOLE L023 — Section 80G for PM CARES / PM Relief Fund
  100% deduction, no qualifying limit, not subject to 10% GTI cap
  Many people donate to these and don't claim the deduction
  Always get the 80G receipt and claim in ITR

LOOPHOLE L024 — Senior Citizen Reverse Mortgage Income — Fully Exempt
  Legal basis: Section 10(43)
  Loan received under a Reverse Mortgage Scheme: Fully exempt
  The amounts received from bank are loan, not income — not taxable
  Senior citizens with house property can use this with zero tax impact

LOOPHOLE L025 — VRS Golden Handshake
  Legal basis: Section 10(10C)
  Exempt: Up to ₹5,00,000 (₹5L) received under VRS
  Conditions: Employee of public sector, company, authority, local body
  Must be exercised only once. Not available if re-employed.

LOOPHOLE L026 — New Regime Keeps Employer NPS but Loses Everything Else
  Strategic insight: If choosing new regime, ONLY standard deduction and 
  employer NPS (80CCD2) remain. All other deductions lost.
  BUT: If employer NPS is structured at maximum (10% of basic),
       AND basic is large (senior employee),
       New regime can STILL be optimal even with large 80C investments.
  This counter-intuitive scenario is missed by most calculators.
```

---

## 14. SPECIAL TAXPAYER MODES

### 14.1 NRI Mode

```
Trigger: Residential status = Non-Resident or RNOR (Resident but Not Ordinary Resident)

Key differences for NRIs:
- Taxable in India: Only India-sourced income
- Not taxable: Foreign income (RNOR: foreign income not derived from India also exempt)
- TDS on NRI income: Higher rates (30% on most income)
- No 87A rebate for NRIs
- DTAA benefits: Lower TDS rate if India has tax treaty with country of residence
  (Submit Form 10F + tax residency certificate from foreign country to claim DTAA)
- Bank accounts: NRE interest is FULLY EXEMPT (Section 10(4))
                 NRO interest is TAXABLE
- Mutual funds: Special TDS rates apply on redemption
- Property: 20% TDS on property sale proceeds withheld by buyer
- ITR form: ITR-2 (most NRIs)

SCHEDULE FA (Foreign Assets) — Mandatory if:
- Foreign bank accounts held
- Foreign assets (property, shares)
- Signing authority over foreign accounts
- Trust/entity in foreign country
- Penalty for non-disclosure: ₹10L per year + prosecution under Black Money Act

DTAA Countries (select major ones with rates):
USA, UK, Singapore, UAE, Australia, Canada, Germany, Japan, France...
```

### 14.2 Senior Citizen Mode (60–79)

```
Special benefits automatically applied:
- Higher basic exemption: ₹3L (old regime)
- 80TTB: ₹1,00,000 deduction on ALL interest (FD + savings)
- 80D: ₹50,000 limit for own health insurance
- Medical bills without insurance: ₹50,000 under 80D
- ITR filing exemption: If income ONLY from salary/pension and one house property,
  TDS deducted by employer — NOT REQUIRED to file ITR
  (But filing is recommended to claim refund)
- Advance tax: NOT required if NO business income
  (Salary/pension seniors with TDS deducted are fully exempt from advance tax)
```

### 14.3 Super Senior Citizen Mode (80+)

```
Additional benefits over Senior Citizen:
- Basic exemption: ₹5L (old regime)
- Paper ITR filing allowed (unlike others who must e-file)
- No minimum tax threshold for paper filing
- Old regime is almost always better (large basic exemption + 80TTB)
```

### 14.4 First-Time Filer Mode

```
Triggered if: User indicates this is first ITR

Additional guidance layer:
- "Why should I file?" — Tax refund, loan eligibility, visa application
- PAN application guidance if not yet obtained
- Aadhaar-PAN linking walkthrough
- ITR portal registration guide
- "What documents do I need?" checklist:
    ☐ Form 16 from employer (available after June 1)
    ☐ Bank passbook / statement (for interest income)
    ☐ Investment proofs (PPF passbook, ELSS statement, LIC receipts)
    ☐ Rent receipts (if claiming HRA)
    ☐ Home loan certificate from bank
    ☐ Form 26AS (from IT portal — free)
    ☐ AIS / TIS (from IT portal — free)
```

### 14.5 Crypto / VDA (Virtual Digital Asset) Mode

```
Triggered if: User traded in crypto, NFTs, or other VDAs

Tax treatment (Section 115BBH — from AY 2023-24):
- Tax rate: 30% flat on all gains
- No deduction of any expense (except cost of acquisition)
- No set-off with any other income or head
- No carry-forward of VDA losses
- TDS: 1% on sale value above ₹10,000/year (or ₹50,000 for specified persons)

Declare in: Schedule VDA in ITR-2/ITR-3

Common mistakes:
1. Trading profit + trading loss → net = 0. You still owe 30% on trading profits.
   Losses cannot offset gains across different VDA transactions.
   Wait — actually within VDA you CAN net: gains from BTC and loss from ETH
   DO offset each other. But VDA loss cannot offset salary or any other income.

2. Gift of crypto:
   Received as gift: Taxable at full value (other sources) if > ₹50,000 from non-relative
   Gifted to others: Treated as transfer → 30% on deemed gains

3. Mining income:
   Taxable as "Other Sources" at slab rate (NOT 30% VDA rate)
   Cost of acquisition = NIL for mined coins
```

---

## 15. ERROR & NOTICE HANDLER

### 15.1 Common ITR Filing Errors and Fixes

```
ERROR_001: "Name mismatch between PAN and Aadhaar"
  Cause: Different spellings (e.g., "Vikas K" vs "Vikas Kumar")
  Fix: Update either PAN (Form 49A) or Aadhaar to make consistent
  Priority: HIGH — ITR validation fails

ERROR_002: "Invalid bank account for refund"
  Cause: Account closed, wrong IFSC, corporate account (not personal)
  Fix: Update bank account in e-filing profile and pre-validate

ERROR_003: "80C exceeds limit"
  Cause: User entered investments exceeding ₹1.5L
  Fix: Cap at ₹1.5L automatically. Show which investments are within/above cap.

ERROR_004: "Section 89 relief claimed but Form 10E not found"
  Cause: User claimed Section 89 in ITR but forgot to file Form 10E
  Fix: STOP. Go to portal. File Form 10E first. Then re-file ITR.
  This is the most critical pre-ITR step and the most commonly missed.

ERROR_005: "AIS income higher than declared"
  Cause: User forgot to include some income that's in AIS
  Fix: Review AIS carefully. Declare all income or respond to AIS discrepancies.

ERROR_006: "TDS claimed exceeds Form 26AS TDS"
  Cause: User entered higher TDS than actually deducted
  Fix: Reduce TDS claim to match Form 26AS. Contact employer if discrepancy.

ERROR_007: "Property capital gain — Section 54 not fulfilled"
  Cause: User reinvested but amount is less than sale consideration
  Fix: Proportionate exemption = (Amount invested / Sale price) × Capital Gain

ERROR_008: "87A rebate not available on special income"
  Cause: User or tool applying 87A rebate on 111A/112A/112 income
  Fix: 87A applies only to income at slab rates. Special-rate income: no rebate.
  Impact: If all income is capital gains → 87A = 0, even if total income < ₹12L
```

---

## 16. DATA MODEL — COMPLETE VARIABLE REGISTRY

```typescript
interface ITRFilingData extends UserInputs {
  // Personal
  pan: string;
  aadhaar: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  residentialStatus: 'resident' | 'nri' | 'rnor';
  assessmentYear: '2026-27';
  originalOrRevised: 'original' | 'revised' | 'updated';
  
  // Banks (array)
  bankAccounts: BankAccount[];
  refundAccountIndex: number;
  
  // Employers (array — supports job switch)
  employers: EmployerDetails[];
  
  // House Properties (array)
  houseProperties: HouseProperty[];
  
  // Capital Gains
  equityTransactions: EquityTransaction[];
  propertyTransactions: PropertyTransaction[];
  otherAssetTransactions: AssetTransaction[];
  
  // Business (if applicable)
  businessType: BusinessType | null;
  presumptiveBusiness: PresumptiveData | null;
  actualBusiness: ActualBusinessData | null;
  
  // Other Income
  savingsInterest: number;
  fdInterest: number;
  dividendIncome: number;
  lotteryWinnings: number;
  familyPension: number;
  otherIncome: number;
  agriculturalIncome: number;
  
  // Crypto / VDA
  vdaTransactions: VDATransaction[];
  
  // Deductions (from UserInputs + additions)
  section80G: Donation[];
  section80DD: DisabledDependant | null;
  section80DDB: SpecifiedDisease | null;
  section80U: SelfDisability | null;
  section80QQB: number; // Royalty
  section80RRB: number; // Patent
  
  // Tax Payments
  tdsFromSalary: TDSCredit[];
  tdsFromOtherSources: TDSCredit[];
  advanceTax: AdvanceTaxPayment[];
  selfAssessmentTax: SATPayment[];
  
  // Section 89
  hasSalaryArrears: boolean;
  form10EFiled: boolean;
  arrearsAmount: number;
  arrearsRelief: number;
  
  // Foreign
  hasForeignIncome: boolean;
  foreignAssets: ForeignAsset[];
  
  // Carry Forward (from previous year)
  previousYearCarryForward: CarryForwardLosses;
  
  // NRI specific
  dtaaCountry: string | null;
  dtaaRate: number | null;
  taxResidencyCertificate: boolean;
}

interface ComputedITR {
  // Income by head
  salaryIncome: number;
  housePropertyIncome: number;     // can be negative
  businessIncome: number;
  stcg111A: number;               // equity STCG (special rate)
  ltcg112A: number;               // equity LTCG (special rate)
  ltcg112: number;                // property/other LTCG (special rate)
  otherCapGains: number;          // slab rate capital gains
  otherSourcesIncome: number;
  
  // After set-off
  grossTotalIncome: number;
  
  // Deductions
  deductionsChapterVIA: number;
  
  // Total Income (separately for special rate and slab rate)
  totalIncomeSlab: number;
  totalIncomeSpecialRate: number;
  
  // Tax
  taxOnSlab: number;
  taxSpecialRate: number;
  grossTaxLiability: number;
  surcharge: number;
  cess: number;
  grossTaxWithCess: number;
  rebate87A: number;             // only on slab income
  marginalRelief: number;
  taxAfterRebate: number;
  
  // Credits
  totalTDS: number;
  totalAdvanceTax: number;
  totalSAT: number;
  
  // Final
  netTaxPayable: number;
  refundDue: number;
  interest234A: number;
  interest234B: number;
  interest234C: number;
  totalAmountPayable: number;
  
  // Carry forward to next year
  carryForwardThisYear: CarryForwardLosses;
  
  // Recommendations
  recommendations: Recommendation[];
  refundMaximizers: RefundMaximizer[];
  complianceAlerts: ComplianceAlert[];
}
```

---

## 17. COMPONENT TREE

```
ITRFilingFeature
├── IncomeProfiler
│   └── ProfileCard
│
├── ITRFormSelector
│   └── FormExplainer
│
├── DataWizard
│   ├── WizardController (step routing)
│   ├── ModuleA_PersonalInfo
│   │   ├── PersonalDetailsForm
│   │   ├── BankAccountManager
│   │   └── AddressForm
│   ├── ModuleB_Salary (per employer)
│   │   ├── EmployerForm
│   │   ├── SalaryBreakdownForm
│   │   ├── HRAVerifier
│   │   ├── PerquisitesForm
│   │   └── MultiEmployerHandler
│   ├── ModuleC_HouseProperty
│   │   ├── PropertyInventory
│   │   ├── SOPForm
│   │   ├── LetOutForm
│   │   └── DeemedLetOutHandler
│   ├── ModuleD_CapitalGains
│   │   ├── AssetTypeSelector
│   │   ├── EquityTransactionForm
│   │   ├── PropertyTransactionForm
│   │   ├── IndexationCalculator
│   │   ├── ExemptionChecker (54/54B/54EC/54F)
│   │   ├── LossSetOffPlanner
│   │   └── TaxLossHarvestingTool
│   ├── ModuleE_BusinessIncome
│   │   ├── BusinessTypeSelector
│   │   ├── PresumptiveTaxationEngine
│   │   └── ActualProfitForm
│   ├── ModuleF_OtherIncome
│   ├── ModuleG_Deductions
│   │   ├── Deduction80C (with live bar)
│   │   ├── Deduction80D
│   │   ├── Deduction80CCD
│   │   └── OtherDeductionsForm
│   └── ModuleH_TaxPayments
│
├── OptimizationEngine (runs in background)
│   ├── RefundMaximizerEngine
│   ├── LossHarvestingEngine
│   ├── RegimeComparator
│   └── LoopholeDetector
│
├── PreFilingVerification
│   ├── AISTaxChecker
│   ├── TDSMatchChecker
│   ├── Form10EChecker
│   └── ReadinessScorecard
│
├── TaxComputationSummary
│   ├── IncomeByHeadTable
│   ├── DeductionSummary
│   ├── TaxComputationTable
│   └── RefundOrDemandBadge
│
├── ITRJsonGenerator
│   ├── SchemaBuilder
│   ├── ValidationEngine
│   └── DownloadManager
│
├── FilingAssistant
│   ├── PortalGuide (step-by-step)
│   ├── EVerificationOptions
│   └── CommonErrorFixer
│
├── PostFilingDashboard
│   ├── RefundTracker
│   ├── NoticeDecoder
│   └── CarryForwardRegister
│
└── Shared Components
    ├── LegalTooltip (section citation on every field)
    ├── CASecretCallout
    ├── LoopholeAlert
    ├── ComplianceWarning
    └── ProfessionalCTA ("This is complex — consult a CA")
```

---

## 18. FEATURE PRIORITY — MVP TO V3

### MVP (Weeks 1–4)
```
✅ Income Profiler + ITR Form Selector
✅ Module B: Salary income (single employer)
✅ Module G: All standard deductions
✅ Module H: TDS entry
✅ Old Regime + New Regime comparison
✅ Section 89 / Form 10E checker
✅ Basic refund/demand computation
✅ Pre-filing checklist (10-point)
✅ PDF summary download (not JSON — V2)
```

### V1 (Weeks 5–10)
```
✅ Module C: House property (SOP + Let-out + loss set-off)
✅ Module D: Capital gains (equity, basic)
✅ Module F: Other income (interest, dividend, FD)
✅ Multi-employer (job switch)
✅ Optimization Engine (core 10 rules)
✅ ITR JSON generation (ITR-1 and ITR-2)
✅ Loss carry-forward register
✅ NRI mode (basic)
✅ Senior citizen / super senior mode
✅ Tax loss harvesting tool
```

### V2 (Months 4–6)
```
◯ Module E: Business / Professional income (44ADA, 44AD)
◯ Capital gains — property with indexation choice
◯ Section 54/54EC/54F exemption engine
◯ Form 26AS / AIS integration (API or manual cross-check)
◯ Crypto / VDA module
◯ ITR-3 / ITR-4 support
◯ AMT calculation
◯ All 26 loopholes flagged automatically
◯ Notice decoder
◯ Surcharge computation
```

### V3 (Months 7–12)
```
◯ Form 16 OCR parsing (auto-fill from uploaded PDF)
◯ AIS API integration (auto-fetch from IT portal)
◯ ITR-U (Updated Return) support
◯ Foreign income / DTAA benefits
◯ HUF mode
◯ Advance tax quarterly planner
◯ Multi-year filing history + carry-forward continuity
◯ WhatsApp filing assistant (input via chat)
◯ Regional languages (Hindi, Telugu, Tamil)
◯ "Consult a CA" marketplace (for complex cases only — no conflict of interest)
```

---

## APPENDIX A — SECTION QUICK REFERENCE

```
Section 10(1):   Agricultural income — exempt
Section 10(4):   NRE bank interest — exempt
Section 10(5):   LTA — conditional exemption
Section 10(10):  Gratuity — exempt up to ₹20L
Section 10(10A): Commuted pension — exempt
Section 10(10AA):Leave encashment on retirement — ₹25L
Section 10(10B): Retrenchment compensation — ₹5L
Section 10(10C): VRS — ₹5L
Section 10(11):  PPF interest — fully exempt
Section 10(13A): HRA — triple lock
Section 10(14):  Special allowances (uniform, children edu, etc.)
Section 10(15):  Interest from specified bonds/securities
Section 10(38):  [Old section — superseded; LTCG on equity now taxable]
Section 10(43):  Reverse mortgage receipts — exempt
Section 10(47):  SGB maturity capital gain — exempt
Section 16:      Salary deductions (standard, professional tax, entertainment)
Section 17:      Salary definition, perquisites, profits in lieu
Section 22-27:   House property
Section 24(b):   Home loan interest
Section 28-44:   Business/profession
Section 44AD:    Presumptive business (₹3Cr limit)
Section 44ADA:   Presumptive professional (₹75L limit)
Section 45-55A:  Capital gains
Section 54:      Reinvest property LTCG in house
Section 54B:     Agricultural land LTCG — exempt
Section 54EC:    NHAI/REC bonds — ₹50L cap
Section 54F:     Any asset LTCG → house — net consideration
Section 56:      Other sources (gifts, dividend, FD)
Section 70-74:   Loss set-off and carry-forward
Section 80C-80U: All deductions (Chapter VI-A)
Section 87A:     Rebate
Section 89:      Arrears relief
Section 111A:    STCG on equity — 20%
Section 112:     LTCG on non-equity — 12.5%/20%
Section 112A:    LTCG on equity — 12.5%
Section 115BAC:  New regime
Section 115BBH:  VDA tax — 30%
Section 139:     Return filing obligation
Section 234A/B/C: Interest on delay
Section 234F:    Late filing fee
Section 244A:    Interest on refund
Section 270A:    Under-reporting penalty
```

---

## APPENDIX B — KEY DEADLINES (AY 2026-27)

```
June 15, 2026:      Advance tax Q1 (15% of annual liability)
July 31, 2026:      ITR filing deadline (non-audit individuals)
September 15, 2026: Advance tax Q2 (45%)
September 30, 2026: Last date for scrutiny notice under 143(2)
October 31, 2026:   ITR deadline for audit cases
December 15, 2026:  Advance tax Q3 (75%)
December 31, 2026:  Revised return deadline
March 15, 2027:     Advance tax Q4 (100%)
March 31, 2027:     Updated return (ITR-U) for AY 2024-25 (within 2 years)
March 31, 2028:     ITR-U deadline for AY 2025-26
```

---

*End of TaxTruth India — ITR Filing Feature PRD v1.0*

*Legal Note: All tax provisions cited are based on the Income Tax Act 1961 as amended by Finance Act 2025 for AY 2026-27. Tax law is subject to annual change. Always verify critical decisions with the latest CBDT circulars and a qualified Chartered Accountant.*

*This PRD documents what the software should know and compute. The software itself is not legal advice — it is a computation tool. Users should consult a CA for complex cases, litigation, and planning beyond routine salaried taxation.*
