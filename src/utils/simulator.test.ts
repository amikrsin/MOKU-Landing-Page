import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_SIMULATOR_STATE,
  addSimulatorExpense,
  calculateCategoryPercentages,
  getSvgCircleProgress,
} from './simulator';

test('addSimulatorExpense deducts from available balance and updates category spending', () => {
  const initial = INITIAL_SIMULATOR_STATE;
  const startAvailable = initial.currentAvailableToSpend;
  const startWants = initial.categorySpending.wants;

  const updated = addSimulatorExpense(initial, 350, 'wants', 'Cold Brew & Bagel', 'UPI');

  assert.equal(updated.currentAvailableToSpend, startAvailable - 350);
  assert.equal(updated.categorySpending.wants, startWants + 350);
  assert.equal(updated.transactions[0].amount, 350);
  assert.equal(updated.transactions[0].category, 'wants');
  assert.equal(updated.transactions[0].title, 'Cold Brew & Bagel');
});

test('addSimulatorExpense does not allow balance to become negative', () => {
  const initial = { ...INITIAL_SIMULATOR_STATE, currentAvailableToSpend: 200 };
  const updated = addSimulatorExpense(initial, 500, 'essentials', 'Medicine');

  assert.equal(updated.currentAvailableToSpend, 0);
  assert.equal(updated.categorySpending.essentials, initial.categorySpending.essentials + 500);
});

test('calculateCategoryPercentages sums correctly', () => {
  const spending = {
    essentials: 5000,
    wants: 2500,
    growth: 1500,
    unexpected: 1000,
  };
  const percentages = calculateCategoryPercentages(spending);

  assert.equal(percentages.total, 10000);
  assert.equal(percentages.essentials, 50);
  assert.equal(percentages.wants, 25);
  assert.equal(percentages.growth, 15);
  assert.equal(percentages.unexpected, 10);
});

test('getSvgCircleProgress computes correct circumference and offset for 83.33% savings goal', () => {
  const target = 15000;
  const saved = 12500;
  const radius = 60;
  const result = getSvgCircleProgress(saved, target, radius);

  const expectedCircumference = 2 * Math.PI * 60;
  assert.ok(Math.abs(result.circumference - expectedCircumference) < 0.001);
  assert.ok(Math.abs(result.percentage - 83.333) < 0.1);
  assert.ok(result.offset < result.circumference);
});
