export function calculateMarginalRelief(taxableIncome, taxBeforeRelief) {
  if (taxableIncome <= 1200000) return 0;

  const incomeAboveThreshold = taxableIncome - 1200000;
  const relief = Math.max(0, taxBeforeRelief - incomeAboveThreshold);

  return Math.round(relief);
}
