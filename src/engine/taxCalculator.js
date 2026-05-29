import {
  NEW_REGIME_SLABS_FY2526,
  OLD_REGIME_SLABS_BELOW60,
  OLD_REGIME_SLABS_SENIOR,
  OLD_REGIME_SLABS_SUPER_SENIOR,
  DEDUCTION_LIMITS
} from '../data/taxSlabs';

import { calculateHRAExemption } from './hraCalculator';
import {
  calculate80C,
  calculateEmployerNPS,
  calculate80D,
  calculate80GG,
  calculateHomeLoanInterestDeduction,
  calculate80EEA
} from './deductionsEngine';
import { calculatePerquisiteExemptions } from './perquisiteEngine';
import { calculateMarginalRelief } from './marginalRelief';

function formatSlabLabel(slab) {
  if (slab.max === Infinity) return `Above ₹${slab.min / 100000}L`;
  return `₹${slab.min / 100000}L – ₹${slab.max / 100000}L`;
}

export function calculateSlabTax(income, slabs) {
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

export function calculateTax(inputs) {
  const annualBasic = Number(inputs.basicSalary || 0) * 12;
  const annualHRA   = Number(inputs.hraReceived || 0) * 12;
  const annualSpecial = Number(inputs.specialAllowance || 0) * 12;
  const annualOther = Number(inputs.otherAllowances || 0) * 12;

  let grossIncome = annualBasic + annualHRA + annualSpecial + annualOther + Number(inputs.lta || 0);

  grossIncome += Number(inputs.fdInterestAnnual || 0);
  grossIncome += Number(inputs.otherIncome || 0);

  if (inputs.propertyType === 'letOut' && Number(inputs.rentalIncomeAnnual || 0) > 0) {
    const netRentalIncome = Number(inputs.rentalIncomeAnnual) * 0.70; 
    const netRentalAfterInterest = netRentalIncome - Number(inputs.homeLoanInterestAnnual || 0);
    grossIncome += Math.max(0, netRentalAfterInterest);
  }

  const hraResult    = calculateHRAExemption(inputs);
  const section80C   = calculate80C(inputs);
  const section80D   = calculate80D(inputs);
  const employerNPS  = calculateEmployerNPS(inputs);
  const selfNPS      = Math.min(Number(inputs.selfNPSAnnual || 0), DEDUCTION_LIMITS.SECTION_80CCD_1B);
  const section80GG  = calculate80GG(inputs, grossIncome);
  const perquisites  = calculatePerquisiteExemptions(inputs);

  const homeLoanInterestDeduction = calculateHomeLoanInterestDeduction(inputs);
  const section80EEA = calculate80EEA(inputs);

  let interestDeduction = 0;
  if (inputs.ageCategory === 'superSenior' || inputs.ageCategory === 'senior') {
    interestDeduction = Math.min(
      Number(inputs.savingsInterestAnnual || 0) + Number(inputs.fdInterestAnnual || 0),
      DEDUCTION_LIMITS.SECTION_80TTB
    );
  } else {
    interestDeduction = Math.min(Number(inputs.savingsInterestAnnual || 0), DEDUCTION_LIMITS.SECTION_80TTA);
  }

  const profTax = Math.min(Number(inputs.professionalTax || 0), DEDUCTION_LIMITS.PROFESSIONAL_TAX_MAX);
  const educationLoanInterest = inputs.hasEducationLoan ? Number(inputs.educationLoanInterestAnnual || 0) : 0;

  const oldTotalDeductions =
    Number(DEDUCTION_LIMITS.STANDARD_DEDUCTION_OLD) +
    Number(hraResult.exemption) +
    Number(inputs.lta || 0) +  
    Number(profTax) +
    Number(section80C.claimedAmount) +
    Number(selfNPS) +
    Number(employerNPS) +
    Number(section80D.total) +
    Number(educationLoanInterest) +
    Number(homeLoanInterestDeduction) +
    Number(section80EEA) +
    Number(interestDeduction) +
    Number(section80GG) +
    Number(perquisites.totalExempt);

  let oldTaxableIncome = Math.max(0, grossIncome - oldTotalDeductions);

  const oldSlabs = inputs.ageCategory === 'superSenior'
    ? OLD_REGIME_SLABS_SUPER_SENIOR
    : inputs.ageCategory === 'senior'
      ? OLD_REGIME_SLABS_SENIOR
      : OLD_REGIME_SLABS_BELOW60;

  const { totalTax: oldTaxBase, breakdown: oldBreakdown } = calculateSlabTax(oldTaxableIncome, oldSlabs);

  let oldRebate = 0;
  if (oldTaxableIncome <= DEDUCTION_LIMITS.REBATE_87A_OLD_LIMIT) {
    oldRebate = Math.min(oldTaxBase, DEDUCTION_LIMITS.REBATE_87A_OLD);
  }

  const oldTaxAfterRebate = Math.max(0, oldTaxBase - oldRebate);
  const oldCess = Math.round(oldTaxAfterRebate * DEDUCTION_LIMITS.CESS_RATE);
  const oldTotalTax = oldTaxAfterRebate + oldCess;

  const newDeductions =
    Number(DEDUCTION_LIMITS.STANDARD_DEDUCTION_NEW) +
    Number(employerNPS) +         
    Number(profTax);              

  let newTaxableIncome = Math.max(0, grossIncome - newDeductions);

  const { totalTax: newTaxBase, breakdown: newBreakdown } = calculateSlabTax(newTaxableIncome, NEW_REGIME_SLABS_FY2526);

  let newRebate = 0;
  if (newTaxableIncome <= DEDUCTION_LIMITS.REBATE_87A_NEW_LIMIT) {
    newRebate = Math.min(newTaxBase, DEDUCTION_LIMITS.REBATE_87A_NEW);
  }

  let newTaxAfterRebate = Math.max(0, newTaxBase - newRebate);

  const marginalRelief = calculateMarginalRelief(newTaxableIncome, newTaxAfterRebate);
  newTaxAfterRebate = Math.max(0, newTaxAfterRebate - marginalRelief);

  const newCess = Math.round(newTaxAfterRebate * DEDUCTION_LIMITS.CESS_RATE);
  const newTotalTax = newTaxAfterRebate + newCess;

  const recommendedRegime = newTotalTax <= oldTotalTax ? 'new' : 'old';
  const savings = Math.abs(oldTotalTax - newTotalTax);

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
