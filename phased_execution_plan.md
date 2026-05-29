# TaxTruth India — Phased Execution Plan

This plan breaks down the Product Requirements Document (PRD) into granular, session-sized phases. At the end of every phase, the application will be in a runnable, verifiable state so you can see the progress and decide if we are on the right track.

## Phase 1: Project Foundation & Landing Page
**Goal:** Set up the technical foundation and build the static landing page.
- Initialize the React app using Vite.
- Set up the global CSS variables, tokens (colors, typography, spacing), and responsive breakpoints as defined in the PRD.
- Build the `LandingPage` component including the Navbar, Hero Section, Trust Row, and Pain Point Cards.
- **Runnable State:** You can open the app and see the fully styled, static landing page with placeholder links.

## Phase 2: Core Tax Engine & URL State
**Goal:** Implement the pure tax math and state management logic.
- Build the core tax functions in `taxCalculator.js`: slab calculations, standard deductions, and basic 87A rebates.
- Implement the URL hash state encoding so that any input changes are reflected in the URL.
- Create a temporary debug UI to test the calculations.
- **Runnable State:** The tax engine is testable. The app has a debug interface where you can manually enter values and instantly see correct tax calculations and URL state changes.

## Phase 3: Wizard Shell & Basic Inputs
**Goal:** Create the routing and the first two steps of the input wizard.
- Implement the `WizardController` for handling steps and progress tracking.
- Build Step 1 (Monthly Take-Home).
- Build Step 2A (Detailed Salary Slip).
- Connect these steps to the URL state and the Tax Engine.
- **Runnable State:** You can click "Calculate" from the landing page, navigate smoothly between Steps 1 and 2, and see real-time state updates.

## Phase 4: Essential Deductions (MVP Wizard Completion)
**Goal:** Build the remaining MVP wizard screens.
- Build Step 3 (Age & City), Step 4 (Rent & HRA logic), Step 7 (80C Investments), and Step 9 (Health Insurance).
- Integrate the HRA "Triple Lock" calculator and 80C aggregation logic.
- **Runnable State:** You can navigate through all the core MVP input steps, validating that data captures correctly and HRA/80C logic triggers.

## Phase 5: Live Preview Panel & Results Page (MVP Completion)
**Goal:** Show the user the outcome of their inputs.
- Build the `LivePreviewPanel` for desktop to show calculations updating in real-time as inputs change.
- Build the basic `ResultsPage` showing the Verdict (Old vs. New Regime) and the Comparison Table.
- **Runnable State:** A complete MVP flow. You can start from the landing page, fill out the basic wizard steps, see the live preview update, and arrive at the final tax comparison.

## Phase 6: V1 Wizard Expansion (Advanced Deductions)
**Goal:** Add the remaining inputs for the full V1 experience.
- Build Step 5 (Home Loan & 80EEA), Step 6 (PF & Employer NPS), Step 8 (NPS Self), Step 10 (Education Loan), Step 11 (Other Income), and Step 12 (Perks).
- **Runnable State:** The wizard now has all 12 steps fully functional, covering every edge case from the PRD (like employer NPS and meal coupons).

## Phase 7: Secrets Engine & Next Actions
**Goal:** Implement the "Hidden Truths" insights and actionable advice.
- Implement `secretsEngine.js` to evaluate inputs and generate high/medium priority tax secrets.
- Add the "Your Secrets" and "Next Actions" sections to the Results Page.
- Add HR message templates for the user to copy.
- **Runnable State:** The Results Page is now fully populated, warning the user about missing tax-saving opportunities (like Section 80GG or cab facilities).

## Phase 8: UI Polish, Education, & Mobile Optimization
**Goal:** Refine the user experience to match the "Design Aesthetics" requirements.
- Add the collapsible bottom drawer for the Live Preview on mobile screens.
- Add `NumberTicker` animated transitions for tax calculation updates.
- Implement the FAQ boxes across wizard steps and the Education Layer (tooltips) on the Results page.
- Build Step 2B (Smart Estimation) for users without a salary slip.
- **Runnable State:** The V1 application is fully polished, highly responsive, beautiful, and completely matches the PRD.

## Phase 9: V2 Features (Post-V1)
**Goal:** Add long-term enhancements once V1 is solid.
- Build the Crossover Point Finder (interactive graph).
- Add support for Mid-year hikes and Job switch handling.
- **Runnable State:** Advanced V2 features are unlocked and usable.
