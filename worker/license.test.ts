import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isMasterDemoKey,
  generateCommercialLicenseKey,
  handleLicenseActivation,
  DEVELOPER_DEMO_KEY,
  COMMERCIAL_KEY_PREFIX,
  MAX_COMMERCIAL_DEVICES,
} from './license';

test('Strict separation: isMasterDemoKey recognizes MOKU-PRO-2026 and ignores commercial keys', () => {
  assert.strictEqual(isMasterDemoKey('MOKU-PRO-2026'), true);
  assert.strictEqual(isMasterDemoKey('  moku-pro-2026  '), true);
  assert.strictEqual(isMasterDemoKey('MOKU-RZP-ABCD-1234'), false);
  assert.strictEqual(isMasterDemoKey(''), false);
  assert.strictEqual(isMasterDemoKey('RANDOM-KEY'), false);
});

test('Commercial licence generation creates valid MOKU-RZP-XXXX-YYYY format', () => {
  const key1 = generateCommercialLicenseKey();
  const key2 = generateCommercialLicenseKey();

  assert.match(key1, /^MOKU-RZP-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
  assert.match(key2, /^MOKU-RZP-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
  assert.notStrictEqual(key1, key2);
  assert.strictEqual(isMasterDemoKey(key1), false);
});

test('Developer demo key activates without touching commercial D1 database records', async () => {
  // DB is null/undefined to prove no database is queried or updated
  const result = await handleLicenseActivation(null, {
    key: DEVELOPER_DEMO_KEY,
    deviceId: 'test-device-uuid-1',
  });

  assert.strictEqual(result.success, true);
  assert.strictEqual(result.isDemo, true);
  assert.strictEqual(result.tier, 'developer_demo');
  assert.strictEqual(result.licenseKey, DEVELOPER_DEMO_KEY);
  assert.ok(result.message.includes('Developer Demo Mode active'));
});

test('Device enforcement with mock D1 database enforces maximum 2 devices', async () => {
  const registeredDevices: Array<{ id: string; license_key: string; device_id: string; last_active_at: string }> = [];
  const validKey = 'MOKU-RZP-TEST-2026';

  // Mock D1 database
  const mockDb = {
    prepare: (query: string) => ({
      bind: (...args: any[]) => ({
        first: async () => {
          if (query.includes('FROM licenses WHERE license_key = ?')) {
            const key = args[0];
            if (key === validKey) {
              return { license_key: validKey, status: 'active', max_devices: 2 };
            }
            if (key === 'MOKU-RZP-REVOKED-01') {
              return { license_key: key, status: 'revoked', max_devices: 2 };
            }
            return null;
          }
          return null;
        },
        all: async () => {
          if (query.includes('FROM license_devices WHERE license_key = ?')) {
            const key = args[0];
            return { results: registeredDevices.filter((d) => d.license_key === key) };
          }
          return { results: [] };
        },
        run: async () => {
          if (query.includes('INSERT INTO license_devices')) {
            const [id, license_key, device_id] = args;
            registeredDevices.push({ id, license_key, device_id, last_active_at: new Date().toISOString() });
          }
          return { success: true };
        },
      }),
    }),
  };

  // 1. Device 1 activation -> Should succeed
  const res1 = await handleLicenseActivation(mockDb, {
    key: validKey,
    deviceId: 'device-iphone-1',
    deviceName: 'iPhone 15 Pro',
  });
  assert.strictEqual(res1.success, true);
  assert.strictEqual(res1.devicesUsed, 1);
  assert.strictEqual(res1.maxDevices, 2);

  // 2. Device 1 reactivation -> Should succeed (already registered)
  const res1Repeat = await handleLicenseActivation(mockDb, {
    key: validKey,
    deviceId: 'device-iphone-1',
  });
  assert.strictEqual(res1Repeat.success, true);
  assert.strictEqual(res1Repeat.devicesUsed, 1);

  // 3. Device 2 activation -> Should succeed
  const res2 = await handleLicenseActivation(mockDb, {
    key: validKey,
    deviceId: 'device-macbook-2',
    deviceName: 'MacBook Air',
  });
  assert.strictEqual(res2.success, true);
  assert.strictEqual(res2.devicesUsed, 2);

  // 4. Device 3 activation -> Must be blocked by 2-device limit
  const res3 = await handleLicenseActivation(mockDb, {
    key: validKey,
    deviceId: 'device-tablet-3',
    deviceName: 'iPad Mini',
  });
  assert.strictEqual(res3.success, false);
  assert.strictEqual(res3.error, 'DEVICE_LIMIT_EXCEEDED');
  assert.ok(res3.message.includes('2/2 registered devices'));
  assert.ok(res3.message.includes("device recovery policy"));

  // 5. Revoked key activation -> Must be rejected
  const resRevoked = await handleLicenseActivation(mockDb, {
    key: 'MOKU-RZP-REVOKED-01',
    deviceId: 'device-any',
  });
  assert.strictEqual(resRevoked.success, false);
  assert.strictEqual(resRevoked.error, 'KEY_REVOKED');
});
