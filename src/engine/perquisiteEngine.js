import { DEDUCTION_LIMITS } from '../data/taxSlabs';

export function calculatePerquisiteExemptions(inputs) {
  const exemptions = {};

  if (inputs.hasMealCoupons) {
    const annual = (inputs.mealCouponMonthlyValue || 0) * 12;
    exemptions.mealCoupons = Math.min(annual, DEDUCTION_LIMITS.MEAL_COUPON_ANNUAL);
    exemptions.mealCouponsTaxable = Math.max(0, annual - exemptions.mealCoupons);
  }

  if (inputs.hasMobileReimbursement) {
    exemptions.mobileReimbursement = inputs.mobileReimbursementAnnual || 0;
  }

  if (inputs.hasCabFacility) {
    exemptions.cabFacility = 0; 
  }

  if ((inputs.giftFromEmployerAnnual || 0) > 0) {
    exemptions.gifts = Math.min(inputs.giftFromEmployerAnnual, DEDUCTION_LIMITS.GIFT_EMPLOYER_ANNUAL);
    exemptions.giftsTaxable = Math.max(0, inputs.giftFromEmployerAnnual - exemptions.gifts);
  }

  const childrenCount = Math.min(inputs.numberOfChildren || 0, 2);
  exemptions.childrenEducation = childrenCount * 100 * 12;

  const totalExempt = Object.values(exemptions)
    .filter((_, i) => !['mealCouponsTaxable', 'giftsTaxable'].includes(Object.keys(exemptions)[i]))
    .reduce((a, b) => typeof b === 'number' ? a + b : a, 0);

  return { exemptions, totalExempt };
}
