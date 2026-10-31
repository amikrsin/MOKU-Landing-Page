import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatINR,
  calculateKakeiboAllocation,
  validateContactForm,
} from './kakeibo';

test('formatINR formats numbers according to Indian numbering system', () => {
  assert.equal(formatINR(0), '₹0');
  assert.equal(formatINR(499), '₹499');
  assert.equal(formatINR(1000), '₹1,000');
  assert.equal(formatINR(50000), '₹50,000');
  assert.equal(formatINR(125000), '₹1,25,000');
  assert.equal(formatINR(1000000), '₹10,00,000'); // 10 Lakhs in Indian grouping
  assert.equal(formatINR(-4500), '-₹4,500');
});

test('calculateKakeiboAllocation enforces Pay Yourself First savings and 4 pillars', () => {
  const allocation = calculateKakeiboAllocation(60000, 20, 30);
  
  // 20% of 60,000 is 12,000
  assert.equal(allocation.savingsAmount, 12000);
  // Spendable pool is 48,000
  assert.equal(allocation.spendablePool, 48000);

  // Essentials: 50% of 48,000 = 24,000
  assert.equal(allocation.pillars.essentials.amount, 24000);
  // Wants: 25% of 48,000 = 12,000
  assert.equal(allocation.pillars.wants.amount, 12000);
  // Growth: 15% of 48,000 = 7,200
  assert.equal(allocation.pillars.growth.amount, 7200);
  // Unexpected: 10% of 48,000 = 4,800
  assert.equal(allocation.pillars.unexpected.amount, 4800);

  // Sum of pillars equals spendable pool
  const pillarSum =
    allocation.pillars.essentials.amount +
    allocation.pillars.wants.amount +
    allocation.pillars.growth.amount +
    allocation.pillars.unexpected.amount;
  assert.equal(pillarSum, allocation.spendablePool);

  // Daily burn limit: 48,000 / 30 = 1,600 / day
  assert.equal(allocation.dailyBurnLimit, 1600);
});

test('calculateKakeiboAllocation handles edge cases safely', () => {
  const zeroAlloc = calculateKakeiboAllocation(0, 20);
  assert.equal(zeroAlloc.spendablePool, 0);
  assert.equal(zeroAlloc.savingsAmount, 0);
  assert.equal(zeroAlloc.dailyBurnLimit, 0);

  const negSalary = calculateKakeiboAllocation(-5000, 10);
  assert.equal(negSalary.monthlySalary, 0);
});

test('validateContactForm checks name, email, and message correctly', () => {
  const invalid = validateContactForm({ name: '', email: 'notanemail', message: 'hi' });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    message: 'I would like to know more about the lifetime access license for MOKU.',
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});
