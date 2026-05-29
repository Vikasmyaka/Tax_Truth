import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizardState } from '../hooks/useWizardState';
import { useURLState } from '../hooks/useURLState';
import { ProgressBar, NumberTicker, DisclaimerFooter } from '../components';
import Step01_TakeHome from './Step01_TakeHome';
import Step02_SalarySlip from './Step02_SalarySlip';
import Step03_AgeCity from './Step03_AgeCity';
import Step04_SmartMenu from './Step04_SmartMenu';
import Step04_Rent from './Step04_Rent';
import Step05_HomeLoan from './Step05_HomeLoan';
import Step06_EmployerNPS from './Step06_EmployerNPS';
import Step07_80C from './Step07_80C';
import Step08_NPSSelf from './Step08_NPSSelf';
import Step09_HealthInsurance from './Step09_HealthInsurance';
import Step10_EducationLoan from './Step10_EducationLoan';
import Step11_OtherIncome from './Step11_OtherIncome';
import Step12_Perks from './Step12_Perks';
import styles from './Wizard.module.css';
import { calculateTax } from '../engine/taxCalculator';

const TOTAL_STEPS = 13;

const defaultInputs = {
  monthlyTakeHome: 0,
  hasSalarySlip: null,
  hasJobSwitch: null,
  oldTakeHome: '',
  oldMonths: '',
  newTakeHome: '',
  newMonths: '',
  basicSalary: '',
  hraReceived: '',
  specialAllowance: '',
  lta: '',
  otherAllowances: '',
  employeePFMonthly: '',
  employeePFAnnual: '',
  professionalTax: '',
  // Step 3
  ageCategory: 'below60',
  cityType: 'nonMetro',
  // Step 4 (Smart Menu)
  smartMenuCompleted: false,
  smRent: true,
  smHomeLoan: true,
  smEmployerNPS: true,
  sm80C: true,
  smSelfNPS: true,
  smHealth: true,
  smEducation: true,
  smOtherIncome: true,
  smPerks: true,
  // Step 5
  paysRent: null,
  monthlyRent: '',
  // Step 5
  hasHomeLoan: null,
  homeLoanInterestAnnual: '',
  homeLoanPrincipalAnnual: '',
  propertyType: '',
  rentalIncomeAnnual: '',
  isFirstTimeBuyer: null,
  stampDutyValue: '',
  // Step 6
  hasEmployerNPS: null,
  isGovtEmployee: null,
  employerNPSAnnual: '',
  // Step 7
  ppfAnnual: '',
  elssAnnual: '',
  licPremiumAnnual: '',
  tuitionFeesAnnual: '',
  taxSavingFDAnnual: '',
  sukanyaAnnual: '',
  // Step 8
  selfNPSAnnual: '',
  // Step 9
  healthInsuranceSelfAnnual: '',
  healthInsuranceParentsAnnual: '',
  areParentsSenior: null,
  // Step 10
  hasEducationLoan: null,
  educationLoanInterestAnnual: '',
  // Step 11
  savingsInterestAnnual: '',
  fdInterestAnnual: '',
  otherIncome: '',
  // Step 12
  hasMealCoupons: null,
  hasEmployerGift: null,
};

export default function WizardController() {
  const [inputs, setInputs] = useURLState(defaultInputs);
  const { currentStep, goToStep, isFirstStep } = useWizardState(TOTAL_STEPS, 1);
  const [isStepValid, setIsStepValid] = useState(false);
  const navigate = useNavigate();

  const shouldSkip = useCallback((stepIndex) => {
    if (!inputs.smartMenuCompleted) return false;
    switch (stepIndex) {
      case 5: return !inputs.smRent;
      case 6: return !inputs.smHomeLoan;
      case 7: return !inputs.smEmployerNPS;
      case 8: return !inputs.sm80C;
      case 9: return !inputs.smSelfNPS;
      case 10: return !inputs.smHealth;
      case 11: return !inputs.smEducation;
      case 12: return !inputs.smOtherIncome;
      case 13: return !inputs.smPerks;
      default: return false;
    }
  }, [inputs]);

  const handleNext = useCallback(() => {
    let next = currentStep + 1;
    while (next <= TOTAL_STEPS && shouldSkip(next)) {
      next++;
    }
    if (next > TOTAL_STEPS) {
      const search = window.location.hash.includes('?') 
        ? '?' + window.location.hash.split('?')[1] 
        : '';
      navigate({ pathname: '/results', search });
      return;
    }
    goToStep(next);
  }, [currentStep, shouldSkip, navigate, goToStep]);

  const handlePrev = useCallback(() => {
    let prev = currentStep - 1;
    while (prev >= 1 && shouldSkip(prev)) {
      prev--;
    }
    goToStep(prev);
  }, [currentStep, shouldSkip, goToStep]);

  const handleValidationChange = useCallback((isValid) => {
    setIsStepValid(isValid);
  }, []);

  // Live calculation for the preview panel
  const taxResults = useMemo(() => {
    try {
      // Derive receivesHRA based on if they get any HRA component
      const engineInputs = {
        ...inputs,
        receivesHRA: (inputs.hraReceived || 0) > 0
      };
      return calculateTax(engineInputs);
    } catch {
      return null;
    }
  }, [inputs]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step01_TakeHome inputs={inputs} setInputs={setInputs} onValidationChange={handleValidationChange} />;
      case 2:
        return <Step02_SalarySlip inputs={inputs} setInputs={setInputs} onValidationChange={handleValidationChange} />;
      case 3:
        return <Step03_AgeCity inputs={inputs} setInputs={setInputs} onValidationChange={handleValidationChange} />;
      case 4:
        return <Step04_SmartMenu inputs={inputs} setInputs={setInputs} onValidationChange={handleValidationChange} />;
      case 5:
        return <Step04_Rent inputs={inputs} setInputs={setInputs} onValidationChange={handleValidationChange} />;
      case 6:
        return <Step05_HomeLoan inputs={inputs} setInputs={setInputs} onValidationChange={handleValidationChange} />;
      case 7:
        return <Step06_EmployerNPS inputs={inputs} setInputs={setInputs} onValidationChange={handleValidationChange} />;
      case 8:
        return <Step07_80C inputs={inputs} setInputs={setInputs} onValidationChange={handleValidationChange} />;
      case 9:
        return <Step08_NPSSelf inputs={inputs} setInputs={setInputs} onValidationChange={handleValidationChange} />;
      case 10:
        return <Step09_HealthInsurance inputs={inputs} setInputs={setInputs} onValidationChange={handleValidationChange} />;
      case 11:
        return <Step10_EducationLoan inputs={inputs} setInputs={setInputs} onValidationChange={handleValidationChange} />;
      case 12:
        return <Step11_OtherIncome inputs={inputs} setInputs={setInputs} onValidationChange={handleValidationChange} />;
      case 13:
        return <Step12_Perks inputs={inputs} setInputs={setInputs} onValidationChange={handleValidationChange} />;
      default:
        return <div style={{padding: '2rem'}}><h2>Step {currentStep} (Coming Soon)</h2></div>;
    }
  };

  return (
    <div className={styles.wizardContainer}>
      {/* Header / Navbar */}
      <div className={styles.wizardHeader}>
        <div className={`container ${styles.headerContent}`}>
          <div className={styles.headerTopRow}>
            {isFirstStep ? (
              <a href="#/" className={styles.backBtn}>← Back to Home</a>
            ) : (
              <button onClick={handlePrev} className={styles.backBtn}>← Back</button>
            )}
            <div className={styles.stepIndicator}>Step {currentStep} of {TOTAL_STEPS}</div>
            <button 
              className={styles.continueBtn} 
              onClick={() => {
                if (currentStep === TOTAL_STEPS || (currentStep + 1 > TOTAL_STEPS)) {
                  const search = window.location.hash.includes('?') 
                    ? '?' + window.location.hash.split('?')[1] 
                    : '';
                  navigate({ pathname: '/results', search });
                } else {
                  handleNext();
                }
              }}
              disabled={!isStepValid}
            >
              {currentStep === TOTAL_STEPS ? 'View Results' : 'Save & Continue →'}
            </button>
          </div>
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>
      </div>

      {/* Main Body */}
      <div className={`container ${styles.wizardBody}`}>
        <div className={styles.questionArea}>
          <div key={currentStep} className={styles.stepContainer}>
            {renderStep()}
          </div>
        </div>

        {/* Live Preview Panel (Desktop Only) */}
        <div className={styles.livePreviewPanel}>
          <div style={{ position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-navy-900)' }}>📊 LIVE ESTIMATE</h3>
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-surface-2)', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>YOUR GROSS INCOME</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-navy-900)' }}>
                <NumberTicker value={taxResults?.grossAnnualIncome || 0} />/year
              </div>
            </div>
            
            <div style={{ border: '1px solid var(--color-surface-3)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', backgroundColor: 'var(--color-surface-2)', padding: '0.5rem', textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                <div style={{ flex: 1 }}>OLD REGIME</div>
                <div style={{ flex: 1 }}>NEW REGIME</div>
              </div>
              <div style={{ display: 'flex', padding: '1rem', textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>
                <div style={{ flex: 1 }}><NumberTicker value={taxResults?.old?.totalTax || 0} /></div>
                <div style={{ flex: 1 }}><NumberTicker value={taxResults?.new?.totalTax || 0} /></div>
              </div>
            </div>

            {taxResults && taxResults.savings > 0 && (
              <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'var(--color-teal-100)', color: 'var(--color-teal-500)', fontWeight: 'bold', textAlign: 'center', borderRadius: '8px', border: '1px solid var(--color-teal-500)' }}>
                🏆 {taxResults.recommendedRegime === 'new' ? 'New' : 'Old'} Regime saves <NumberTicker value={taxResults.savings} />
              </div>
            )}
          </div>
        </div>
      </div>
      <DisclaimerFooter />
    </div>
  );
}
