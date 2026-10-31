/**
 * Pure business logic and calculation utilities for MOKU (Kakeibo Mindful Money Management).
 * Decoupled from React UI for fast, deterministic unit testing under Ultra Mode.
 */

export interface KakeiboAllocation {
  monthlySalary: number;
  savingsRate: number; // e.g. 20 for 20%
  savingsAmount: number;
  spendablePool: number;
  pillars: {
    essentials: {
      name: string;
      japanese: string;
      description: string;
      percentageOfPool: number;
      amount: number;
      examples: string[];
    };
    wants: {
      name: string;
      japanese: string;
      description: string;
      percentageOfPool: number;
      amount: number;
      examples: string[];
    };
    growth: {
      name: string;
      japanese: string;
      description: string;
      percentageOfPool: number;
      amount: number;
      examples: string[];
    };
    unexpected: {
      name: string;
      japanese: string;
      description: string;
      percentageOfPool: number;
      amount: number;
      examples: string[];
    };
  };
  dailyBurnLimit: number; // spendablePool / daysInMonth
}

/**
 * Format currency in Indian Numbering System (INR ₹).
 * Handles commas in lakhs/crores format (e.g. ₹1,50,000).
 */
export function formatINR(amount: number, showDecimals: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const rounded = showDecimals ? absAmount.toFixed(2) : Math.round(absAmount).toString();

  const parts = rounded.split('.');
  let integerPart = parts[0];
  const decimalPart = parts[1] ? `.${parts[1]}` : '';

  // Indian format: last 3 digits, then groups of 2 digits
  if (integerPart.length > 3) {
    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherDigits = integerPart.substring(0, integerPart.length - 3);
    integerPart = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  }

  return `${isNegative ? '-' : ''}₹${integerPart}${decimalPart}`;
}

/**
 * Calculate recommended Kakeibo distribution for an Indian salary.
 * Core philosophy: "Pay Yourself First" (Committed Savings Goal),
 * then allocate remaining spendable pool across the 4 Kakeibo pillars:
 * - Essentials (Needs): 50% of spendable
 * - Wants (Enjoyment): 25% of spendable
 * - Growth (Learning & Culture): 15% of spendable
 * - Unexpected (Unplanned emergencies): 10% of spendable
 */
export function calculateKakeiboAllocation(
  monthlySalary: number,
  savingsRate: number = 20,
  daysInMonth: number = 30
): KakeiboAllocation {
  const safeSalary = Math.max(0, monthlySalary);
  const safeRate = Math.min(80, Math.max(0, savingsRate));
  
  const savingsAmount = Math.round((safeSalary * safeRate) / 100);
  const spendablePool = Math.max(0, safeSalary - savingsAmount);

  // Pillar percentages of spendable pool
  const essentialsRatio = 0.50;
  const wantsRatio = 0.25;
  const growthRatio = 0.15;
  const unexpectedRatio = 0.10;

  const essentialsAmount = Math.round(spendablePool * essentialsRatio);
  const wantsAmount = Math.round(spendablePool * wantsRatio);
  const growthAmount = Math.round(spendablePool * growthRatio);
  const unexpectedAmount = Math.round(spendablePool * unexpectedRatio);

  const dailyBurn = daysInMonth > 0 ? Math.round(spendablePool / daysInMonth) : 0;

  return {
    monthlySalary: safeSalary,
    savingsRate: safeRate,
    savingsAmount,
    spendablePool,
    pillars: {
      essentials: {
        name: 'Essentials',
        japanese: 'Needs',
        description: 'Survival & Non-negotiables: rent, groceries, medicines, transit, utilities.',
        percentageOfPool: 50,
        amount: essentialsAmount,
        examples: ['Rent', 'Groceries', 'Medicine', 'Utilities', 'Transit', 'Dairy'],
      },
      wants: {
        name: 'Wants',
        japanese: 'Enjoyment',
        description: 'Mindful enjoyment: dining out, coffee, shopping, movies, hobbies.',
        percentageOfPool: 25,
        amount: wantsAmount,
        examples: ['Swiggy/Zomato', 'Dining Out', 'Weekend Outings', 'Subscriptions', 'Fashion'],
      },
      growth: {
        name: 'Growth',
        japanese: 'Learning & Culture',
        description: 'Personal enrichment: books, courses, wellness, museum visits, skill building.',
        percentageOfPool: 15,
        amount: growthAmount,
        examples: ['Books', 'Certifications', 'Gym/Yoga', 'Workshops', 'Seminars'],
      },
      unexpected: {
        name: 'Unexpected',
        japanese: 'Unplanned',
        description: 'Buffer for unforeseen short-term costs: minor repairs, urgent gifts, clinic visits.',
        percentageOfPool: 10,
        amount: unexpectedAmount,
        examples: ['Bike repair', 'Emergency clinic visits', 'Last-minute gifting', 'Plumbing'],
      },
    },
    dailyBurnLimit: dailyBurn,
  };
}

export interface ContactValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export function validateContactForm(input: {
  name: string;
  email: string;
  message: string;
}): ContactValidationResult {
  const errors: { name?: string; email?: string; message?: string } = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please provide your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!input.message || input.message.trim().length < 10) {
    errors.message = 'Please share your query or question (at least 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
