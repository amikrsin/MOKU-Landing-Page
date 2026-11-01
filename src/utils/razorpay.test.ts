import { test } from 'node:test';
import assert from 'node:assert/strict';
import { APP_CONFIG, FAQ_DATA } from '../data/mokuData';

test('Razorpay configuration matches ₹499 pricing specification', () => {
  assert.strictEqual(APP_CONFIG.priceINR, 499);
  assert.strictEqual(APP_CONFIG.pricePaise, 49900);
  assert.strictEqual(APP_CONFIG.currency, 'INR');
  assert.strictEqual(APP_CONFIG.paymentGateway, 'Razorpay');
  assert.strictEqual(APP_CONFIG.deviceLimit, 2);
  assert.strictEqual(APP_CONFIG.liveAppUrl, 'https://moku.ami-kr-sin.workers.dev/');
});

test('FAQ data contains all 14 required questions', () => {
  assert.strictEqual(FAQ_DATA.length, 14);
  assert.ok(FAQ_DATA.some((f) => f.question.includes('What is MOKU?')));
  assert.ok(FAQ_DATA.some((f) => f.question.includes('What is the Kakeibo method?')));
  assert.ok(FAQ_DATA.some((f) => f.question.includes('Is MOKU a subscription?')));
  assert.ok(FAQ_DATA.some((f) => f.question.includes('How much does MOKU cost?')));
  assert.ok(FAQ_DATA.some((f) => f.question.includes('How do I receive my licence key?')));
  assert.ok(FAQ_DATA.some((f) => f.question.includes('How do I activate MOKU?')));
  assert.ok(FAQ_DATA.some((f) => f.question.includes('Can I use MOKU on my phone and laptop?')));
  assert.ok(FAQ_DATA.some((f) => f.question.includes('How many devices can I activate?')));
  assert.ok(FAQ_DATA.some((f) => f.question.includes('Does MOKU work offline?')));
  assert.ok(FAQ_DATA.some((f) => f.question.includes('What happens if I change my phone?')));
  assert.ok(FAQ_DATA.some((f) => f.question.includes('Is my financial information shared with anyone?')));
  assert.ok(FAQ_DATA.some((f) => f.question.includes('Which payment methods are supported?')));
  assert.ok(FAQ_DATA.some((f) => f.question.includes('What happens if my payment succeeds but I do not receive the email?')));
  assert.ok(FAQ_DATA.some((f) => f.question.includes('How can I contact support?')));
});

test('No forbidden alternative payment gateways are configured or advertised', () => {
  const serialized = JSON.stringify(FAQ_DATA) + JSON.stringify(APP_CONFIG);
  assert.doesNotMatch(serialized, /cashfree/i);
  assert.doesNotMatch(serialized, /stripe/i);
  assert.doesNotMatch(serialized, /paypal/i);
  assert.doesNotMatch(serialized, /etsy/i);
  assert.doesNotMatch(serialized, /gumroad/i);
  assert.doesNotMatch(serialized, /payu/i);
});
