export function approximateTax(annualGross) {
  const stdDed = 75000;
  let taxable = Math.max(0, annualGross - stdDed);
  
  if (taxable <= 1200000) return 0;

  let tax = 0;
  if (taxable > 400000) tax += Math.min(400000, taxable - 400000) * 0.05;
  if (taxable > 800000) tax += Math.min(400000, taxable - 800000) * 0.10;
  if (taxable > 1200000) tax += Math.min(400000, taxable - 1200000) * 0.15;
  if (taxable > 1600000) tax += Math.min(400000, taxable - 1600000) * 0.20;
  if (taxable > 2000000) tax += Math.min(400000, taxable - 2000000) * 0.25;
  if (taxable > 2400000) tax += (taxable - 2400000) * 0.30;
  
  // Basic marginal relief approx
  const incomeAbove12L = taxable - 1200000;
  if (incomeAbove12L < tax) {
      tax = incomeAbove12L;
  }
  
  return tax * 1.04; // adding cess
}

export function reverseCalculateGross(monthlyTakeHome) {
  let estimatedGross = monthlyTakeHome * 1.30;
  let finalBasic, finalPF, finalProfTax, finalTax;

  for (let i = 0; i < 10; i++) {
    finalBasic = estimatedGross * 0.40;
    finalPF = Math.min(finalBasic * 0.12, 1800);
    finalProfTax = 200; // Average monthly professional tax
    finalTax = approximateTax(estimatedGross * 12) / 12;

    const computedTakeHome = estimatedGross - finalPF - finalProfTax - finalTax;
    const error = monthlyTakeHome - computedTakeHome;
    estimatedGross += error;
  }

  // Round values
  const grossMonthly = Math.round(estimatedGross);
  const basicSalary = Math.round(grossMonthly * 0.40);
  const hraReceived = Math.round(grossMonthly * 0.20); // typical HRA component
  const employeePFMonthly = Math.round(Math.min(basicSalary * 0.12, 1800));
  const professionalTax = 2400; // Annual
  const specialAllowance = grossMonthly - basicSalary - hraReceived;

  return {
    grossMonthly,
    basicSalary,
    hraReceived,
    specialAllowance,
    lta: 0,
    otherAllowances: 0,
    employeePFMonthly,
    professionalTax
  };
}
