export const NEW_REGIME_SLABS_FY2526 = [
  { min: 0,         max: 400000,  rate: 0   },
  { min: 400000,    max: 800000,  rate: 0.05 },
  { min: 800000,    max: 1200000, rate: 0.10 },
  { min: 1200000,   max: 1600000, rate: 0.15 },
  { min: 1600000,   max: 2000000, rate: 0.20 },
  { min: 2000000,   max: 2400000, rate: 0.25 },
  { min: 2400000,   max: Infinity, rate: 0.30 },
];

export const OLD_REGIME_SLABS_BELOW60 = [
  { min: 0,        max: 250000,   rate: 0    },
  { min: 250000,   max: 500000,   rate: 0.05 },
  { min: 500000,   max: 1000000,  rate: 0.20 },
  { min: 1000000,  max: Infinity, rate: 0.30 },
];

export const OLD_REGIME_SLABS_SENIOR = [  // 60-79
  { min: 0,        max: 300000,   rate: 0    },
  { min: 300000,   max: 500000,   rate: 0.05 },
  { min: 500000,   max: 1000000,  rate: 0.20 },
  { min: 1000000,  max: Infinity, rate: 0.30 },
];

export const OLD_REGIME_SLABS_SUPER_SENIOR = [  // 80+
  { min: 0,        max: 500000,   rate: 0    },
  { min: 500000,   max: 1000000,  rate: 0.20 },
  { min: 1000000,  max: Infinity, rate: 0.30 },
];

export const DEDUCTION_LIMITS = {
  STANDARD_DEDUCTION_NEW:    75000,
  STANDARD_DEDUCTION_OLD:    50000,
  SECTION_80C_CAP:           150000,
  SECTION_80CCD_1B:          50000,
  SECTION_80CCD_2_PRIVATE:   0.10,    // 10% of basic+DA
  SECTION_80CCD_2_GOVT:      0.14,    // 14% of basic+DA
  SECTION_80D_SELF:          25000,
  SECTION_80D_PARENTS:       25000,
  SECTION_80D_PARENTS_SR:    50000,
  SECTION_80TTA:             10000,
  SECTION_80TTB:             100000,  // senior only
  SECTION_24B_SELF_OCC:      200000,
  SECTION_80EEA:             150000,
  SECTION_80EEA_STAMP_MAX:   4500000,
  REBATE_87A_OLD:            12500,
  REBATE_87A_OLD_LIMIT:      500000,
  REBATE_87A_NEW:            60000,
  REBATE_87A_NEW_LIMIT:      1200000,
  CESS_RATE:                 0.04,
  GRATUITY_EXEMPT:           2000000,
  LEAVE_ENCASHMENT_EXEMPT:   2500000,
  MEAL_COUPON_ANNUAL:        26400,
  GIFT_EMPLOYER_ANNUAL:      5000,
  PROFESSIONAL_TAX_MAX:      2500,
  FAMILY_PENSION_STD_DED:    25000,
  FAMILY_PENSION_STD_PCT:    1/3,
  MARGINAL_RELIEF_THRESHOLD: 1200000,  // new regime
  MARGINAL_RELIEF_SALARIED:  1275000,  // 12L + 75K std deduction
};
