// This engine acts as the "CA Brain" scanning for missed opportunities.

export function generateSecrets(inputs, results) {
  const secrets = [];

  const basicSalary = inputs.basicSalary || 0;
  const basicAnnual = basicSalary * 12;
  const recommendedRegime = results.recommendedRegime;
  
  // Secret 1: Missing Employer NPS
  if (inputs.hasEmployerNPS === false && basicAnnual > 0) {
    const limitPct = inputs.isGovtEmployee ? 0.14 : 0.10;
    const npsCap = basicAnnual * limitPct;
    const effectiveRate = recommendedRegime === 'new' 
      ? (results.new.taxableIncome > 1200000 ? 0.30 : 0.20) // Approximation for quick savings
      : (results.old.taxableIncome > 500000 ? 0.20 : 0);
    
    const estimatedSavings = Math.round(npsCap * effectiveRate);

    if (estimatedSavings > 0) {
      secrets.push({
        id: 'SECRET_NPS',
        priority: 'HIGH',
        title: "You're missing a tax-free salary restructuring opportunity",
        body: `Your employer can contribute up to ₹${Math.round(npsCap).toLocaleString('en-IN')}/year to NPS on your behalf. This reduces your taxable income in BOTH regimes without changing your CTC. That's approx ₹${estimatedSavings.toLocaleString('en-IN')} in annual tax savings. Ask HR to restructure your salary.`
      });
    }
  }

  // Secret 2: Unused 80C
  const auto80C = (inputs.employeePFAnnual || 0) + (inputs.hasHomeLoan ? (inputs.homeLoanPrincipalAnnual || 0) : 0);
  const declared80C = (inputs.ppfAnnual || 0) + (inputs.elssAnnual || 0) + (inputs.licPremiumAnnual || 0) + (inputs.tuitionFeesAnnual || 0) + (inputs.taxSavingFDAnnual || 0) + (inputs.sukanyaAnnual || 0);
  const total80C = auto80C + declared80C;
  const remaining80C = 150000 - total80C;

  if (remaining80C > 5000 && recommendedRegime === 'old' && results.old.taxableIncome > 500000) {
    const estimatedSavings = Math.round(remaining80C * 0.20); // rough estimate
    secrets.push({
      id: 'SECRET_80C',
      priority: 'HIGH',
      title: `You have ₹${remaining80C.toLocaleString('en-IN')} of unused 80C limit`,
      body: `Investing ₹${remaining80C.toLocaleString('en-IN')} more before March 31 in ELSS, PPF, or Tax-Saving FDs would reduce your old regime tax. That's a guaranteed return of ~₹${estimatedSavings.toLocaleString('en-IN')} on tax savings alone.`
    });
  }

  // Secret 3: FD Interest Warning
  if ((inputs.fdInterestAnnual || 0) > 0) {
    secrets.push({
      id: 'SECRET_FD',
      priority: 'MEDIUM',
      title: "Your FD interest is fully taxable — and the IT department knows",
      body: `₹${inputs.fdInterestAnnual.toLocaleString('en-IN')} in FD interest is added to your taxable income. Your bank reports this to the IT department via Form 26AS. If you don't declare it, you'll get a notice. Ensure you declare this when filing your ITR.`
    });
  }

  // Secret 4: Marginal Relief
  if (results.new.taxableIncome > 1200000 && results.new.taxableIncome <= 1275000 && recommendedRegime === 'new') {
    secrets.push({
      id: 'SECRET_MARGINAL',
      priority: 'HIGH',
      title: "Marginal Relief is protecting you",
      body: `Your taxable income of ₹${results.new.taxableIncome.toLocaleString('en-IN')} falls in the zone where marginal relief applies. The law ensures your tax cannot exceed the income you earned above ₹12 lakh. We have applied this relief automatically.`
    });
  }

  return secrets;
}

export function generateNextActions(inputs, results) {
  const actions = [];

  if (results.recommendedRegime === 'old') {
    actions.push({
      title: 'Declare Old Regime to your employer',
      body: 'Submit a written declaration to HR/Payroll before your January payroll. Without this, your employer deducts TDS under New Regime by default.',
      deadline: 'Before January payroll',
    });
  }

  if (inputs.paysRent && (inputs.hraReceived || 0) > 0) {
    actions.push({
      title: 'Submit rent receipts and landlord PAN',
      body: 'To claim HRA exemption during the year (not just at ITR), submit rent receipts to your employer. If annual rent exceeds ₹1 lakh, landlord PAN is mandatory.',
      deadline: 'Before December payroll',
    });
  }

  actions.push({
    title: 'Download Form 26AS before filing ITR',
    body: 'Available free at incometax.gov.in. Match TDS with your employer Form 16. Any mismatch must be resolved before filing.',
    deadline: 'Before ITR filing (July 31)',
  });

  return actions.slice(0, 3);
}
