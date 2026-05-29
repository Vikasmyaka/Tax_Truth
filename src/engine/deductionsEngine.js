import { DEDUCTION_LIMITS } from '../data/taxSlabs';

export function calculate80C(inputs) {
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
    homeLoanPrincipal: inputs.hasHomeLoan ? (inputs.homeLoanPrincipalAnnual || 0) : 0,
  };

  const rawTotal = Object.values(components).reduce((a, b) => a + b, 0);
  const claimedAmount = Math.min(rawTotal, DEDUCTION_LIMITS.SECTION_80C_CAP);
  const remainingLimit = Math.max(0, DEDUCTION_LIMITS.SECTION_80C_CAP - rawTotal);

  return { components, rawTotal, claimedAmount, remainingLimit };
}

export function calculateEmployerNPS(inputs) {
  if (!inputs.hasEmployerNPS) return 0;

  const annualBasic = (inputs.basicSalary || 0) * 12;
  const limitPercent = inputs.isGovtEmployee
    ? DEDUCTION_LIMITS.SECTION_80CCD_2_GOVT
    : DEDUCTION_LIMITS.SECTION_80CCD_2_PRIVATE;

  const maxAllowed = annualBasic * limitPercent;
  const actualContribution = inputs.employerNPSAnnual || 0;

  return Math.min(actualContribution, maxAllowed);
}

export function calculate80D(inputs) {
  const selfLimit = DEDUCTION_LIMITS.SECTION_80D_SELF;         
  const parentsLimit = inputs.areParentsSenior
    ? DEDUCTION_LIMITS.SECTION_80D_PARENTS_SR                  
    : DEDUCTION_LIMITS.SECTION_80D_PARENTS;                    

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

export function calculate80GG(inputs, grossIncome) {
  if (inputs.receivesHRA) return 0;  
  if (!inputs.paysRent) return 0;

  const annualRent = (inputs.monthlyRent || 0) * 12;

  const lock1 = 60000;
  const lock2 = 0.25 * grossIncome;
  const lock3 = Math.max(0, annualRent - (0.10 * grossIncome));

  return Math.round(Math.min(lock1, lock2, lock3));
}

export function calculateHomeLoanInterestDeduction(inputs) {
  if (!inputs.hasHomeLoan) return 0;

  if (inputs.propertyType === 'letOut') {
    return inputs.homeLoanInterestAnnual || 0;
  }

  return Math.min(inputs.homeLoanInterestAnnual || 0, DEDUCTION_LIMITS.SECTION_24B_SELF_OCC);
}

export function calculate80EEA(inputs) {
  if (!inputs.isFirstTimeBuyer) return 0;
  if ((inputs.stampDutyValue || 0) > DEDUCTION_LIMITS.SECTION_80EEA_STAMP_MAX) return 0;
  if (inputs.propertyType !== 'selfOccupied') return 0;

  const interestBeyond24b = Math.max(
    0,
    (inputs.homeLoanInterestAnnual || 0) - DEDUCTION_LIMITS.SECTION_24B_SELF_OCC
  );

  return Math.min(interestBeyond24b, DEDUCTION_LIMITS.SECTION_80EEA);
}
