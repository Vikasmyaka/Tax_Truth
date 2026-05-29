import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useURLState } from '../hooks/useURLState';
import { calculateTax } from '../engine/taxCalculator';
import { generateSecrets, generateNextActions } from '../engine/secretsEngine';

import VerdictSection from './VerdictSection';
import ComparisonTable from './ComparisonTable';
import CrossoverChart from './CrossoverChart';
import SecretsSection from './SecretsSection';
import NextActions from './NextActions';
import { DisclaimerFooter } from '../components';
import styles from './Results.module.css';

// Reuse defaultInputs from WizardController to ensure complete state
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

export default function ResultPage() {
  const [inputs] = useURLState(defaultInputs);
  const navigate = useNavigate();
  const location = useLocation();

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

  if (!results) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Loading your calculation...</h2>
        <button onClick={() => navigate('/calculate')} className={styles.btnPrimary} style={{ marginTop: '2rem' }}>
          Go back to Wizard
        </button>
      </div>
    );
  }

  const secrets = generateSecrets(inputs, results);
  const actions = generateNextActions(inputs, results);



  const handleRecalculate = () => {
    navigate({ pathname: '/calculate', search: location.search });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div className={styles.noPrint} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <button 
          onClick={handleRecalculate} 
          style={{ background: 'none', border: 'none', color: 'var(--color-teal-500)', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ← Back to Editor
        </button>
        <button 
          onClick={() => window.print()} 
          style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-surface-3)', color: 'var(--color-navy-900)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          📄 Download PDF
        </button>
      </div>

      <VerdictSection results={results} onRecalculate={handleRecalculate} />
      
      <ComparisonTable results={results} />

      <CrossoverChart currentInputs={inputs} />
      
      <SecretsSection secrets={secrets} />
      
      <NextActions actions={actions} />

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerFooter />
      </div>
    </div>
  );
}
