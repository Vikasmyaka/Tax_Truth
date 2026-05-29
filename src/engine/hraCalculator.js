export function calculateHRAExemption(inputs) {
  if (!inputs.receivesHRA || !inputs.paysRent) return { exemption: 0, lock1: 0, lock2: 0, lock3: 0, bindingLock: 0 };

  const annualHRA = (inputs.hraReceived || 0) * 12;
  const annualBasic = (inputs.basicSalary || 0) * 12;
  const annualRent = (inputs.monthlyRent || 0) * 12;

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
  };
}
