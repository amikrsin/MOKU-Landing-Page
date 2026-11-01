-- Cloudflare D1 Database Schema for MOKU
-- Production tables for commercial lifetime licensing & device activations

CREATE TABLE IF NOT EXISTS licenses (
  id TEXT PRIMARY KEY,
  license_key TEXT UNIQUE NOT NULL,
  order_id TEXT,
  payment_id TEXT UNIQUE,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  amount_paise INTEGER NOT NULL DEFAULT 49900,
  currency TEXT NOT NULL DEFAULT 'INR',
  source TEXT NOT NULL DEFAULT 'razorpay', -- 'razorpay', 'etsy', 'legacy'
  status TEXT NOT NULL DEFAULT 'active',   -- 'active', 'revoked', 'refunded'
  max_devices INTEGER NOT NULL DEFAULT 2,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(license_key);
CREATE INDEX IF NOT EXISTS idx_licenses_email ON licenses(customer_email);
CREATE INDEX IF NOT EXISTS idx_licenses_payment ON licenses(payment_id);

CREATE TABLE IF NOT EXISTS license_devices (
  id TEXT PRIMARY KEY,
  license_key TEXT NOT NULL,
  device_id TEXT NOT NULL,
  device_name TEXT,
  platform TEXT,
  registered_at TEXT NOT NULL,
  last_active_at TEXT NOT NULL,
  FOREIGN KEY (license_key) REFERENCES licenses(license_key) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_devices_key ON license_devices(license_key);
CREATE INDEX IF NOT EXISTS idx_devices_unique ON license_devices(license_key, device_id);
