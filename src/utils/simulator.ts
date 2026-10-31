/**
 * Pure calculation logic for the MOKU Interactive Product Simulator.
 * Decoupled for unit testing under Ultra Mode.
 */

export type KakeiboCategory = 'essentials' | 'wants' | 'growth' | 'unexpected';

export interface SimulatorState {
  initialSalary: number;
  savingsCommitted: number;
  initialSpendablePool: number;
  currentAvailableToSpend: number;
  categorySpending: {
    essentials: number;
    wants: number;
    growth: number;
    unexpected: number;
  };
  transactions: Array<{
    id: string;
    title: string;
    amount: number;
    category: KakeiboCategory;
    paymentMode: 'UPI' | 'Card' | 'Cash';
    timestamp: string;
  }>;
}

export const INITIAL_SIMULATOR_STATE: SimulatorState = {
  initialSalary: 60000,
  savingsCommitted: 15000, // Pay yourself first
  initialSpendablePool: 45000,
  currentAvailableToSpend: 38450, // After starter sample expenses
  categorySpending: {
    essentials: 3200, // Rent advance / groceries
    wants: 1650,      // Cafe / dining
    growth: 1200,     // Books / course
    unexpected: 500,  // Minor repair
  },
  transactions: [
    {
      id: 'tx-1',
      title: 'Groceries & Milk',
      amount: 1450,
      category: 'essentials',
      paymentMode: 'UPI',
      timestamp: 'Today, 10:30 AM',
    },
    {
      id: 'tx-2',
      title: 'Espresso & Croissant',
      amount: 280,
      category: 'wants',
      paymentMode: 'UPI',
      timestamp: 'Today, 02:15 PM',
    },
    {
      id: 'tx-3',
      title: 'Book: The Psychology of Money',
      amount: 450,
      category: 'growth',
      paymentMode: 'Card',
      timestamp: 'Yesterday',
    },
  ],
};

/**
 * Adds an expense to simulator state and recomputes balances
 */
export function addSimulatorExpense(
  state: SimulatorState,
  amount: number,
  category: KakeiboCategory,
  title: string,
  paymentMode: 'UPI' | 'Card' | 'Cash' = 'UPI'
): SimulatorState {
  if (amount <= 0) return state;

  const safeAmount = Math.round(amount);
  const newAvailable = Math.max(0, state.currentAvailableToSpend - safeAmount);

  const newCategorySpending = {
    ...state.categorySpending,
    [category]: state.categorySpending[category] + safeAmount,
  };

  const newTx = {
    id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    title: title.trim() || getDefaultCategoryName(category),
    amount: safeAmount,
    category,
    paymentMode,
    timestamp: 'Just now',
  };

  return {
    ...state,
    currentAvailableToSpend: newAvailable,
    categorySpending: newCategorySpending,
    transactions: [newTx, ...state.transactions].slice(0, 8),
  };
}

export function getDefaultCategoryName(cat: KakeiboCategory): string {
  switch (cat) {
    case 'essentials':
      return 'Essential Need';
    case 'wants':
      return 'Mindful Want';
    case 'growth':
      return 'Growth & Learning';
    case 'unexpected':
      return 'Unexpected Expense';
  }
}

/**
 * Calculates percentage breakdown of spending across 4 pillars
 */
export function calculateCategoryPercentages(spending: {
  essentials: number;
  wants: number;
  growth: number;
  unexpected: number;
}): { essentials: number; wants: number; growth: number; unexpected: number; total: number } {
  const total =
    spending.essentials + spending.wants + spending.growth + spending.unexpected;

  if (total === 0) {
    return { essentials: 25, wants: 25, growth: 25, unexpected: 25, total: 0 };
  }

  return {
    essentials: Math.round((spending.essentials / total) * 100),
    wants: Math.round((spending.wants / total) * 100),
    growth: Math.round((spending.growth / total) * 100),
    unexpected: Math.round((spending.unexpected / total) * 100),
    total,
  };
}

/**
 * Calculates circular progress properties for SVG rings
 */
export function getSvgCircleProgress(
  value: number,
  total: number,
  radius: number
): { circumference: number; offset: number; percentage: number } {
  const circumference = 2 * Math.PI * radius;
  const safeTotal = total <= 0 ? 1 : total;
  const percentage = Math.min(100, Math.max(0, (value / safeTotal) * 100));
  const offset = circumference - (percentage / 100) * circumference;
  return { circumference, offset, percentage };
}
