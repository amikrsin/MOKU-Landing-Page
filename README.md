# MOKU — Premium Marketing Landing Website

> **Spend Mindfully. Save Intentionally.**
> *"Don't just track your money. Understand it."*

MOKU is a mindful personal budgeting and expense management application designed for young Indian professionals, newly married couples, and intentional budgeters. It adapts the centuried Japanese **Kakeibo** budgeting philosophy into a modern, local-first digital companion with native INR (₹) support and zero recurring subscriptions.

---

## 1. Project Overview & Deliverables

This repository contains the complete production-ready marketing website for **MOKU**, built with responsive semantic HTML5, modern Tailwind CSS, React, and modular TypeScript.

### Key Deliverables Included:
- **Hero & Value Proposition**: Engaging copy, trust indicators, and an authentic smartphone mockup showcasing the real MOKU dashboard.
- **Problem Statement**: 4 relatable pain points of modern Indian salary earners (UPI micro-leaks, month-end disappearances, passive tracking).
- **Core Features**: 6 verified capabilities (Mindful Budget Dashboard, 4 Kakeibo Pillars, Quick Expense with SMS/denominations, Monthly Review & Kaizen Audits, Savings & Investment Log, and Honest Offline Privacy).
- **Interactive Kakeibo Salary Calculator**: Live calculator customized for Indian salaries (presets: ₹40,000 to ₹1,80,000) allowing visitors to test savings commitments and 4-pillar distributions in real time.
- **Visual Timeline**: 4-step monthly ritual (Plan, Save First, Track Daily, Reflect).
- **Kakeibo Master Guide**: Educational breakdown of Hani Motoko's 1904 philosophy, the 4 fundamental questions, and Indian salary adaptation.
- **Product Showcase**: Interactive tabbed & multi-column showcase featuring verified production screenshots.
- **Pricing**: Transparent ₹499 one-time lifetime license terms without recurring subscriptions.
- **FAQ**: 12 verified, comprehensive answers with real-time search.
- **Standalone Sub-Pages**: Dedicated views for `/privacy-policy`, `/terms`, `/refund-policy`, `/contact` (with live form validation), and `/kakeibo`.
- **SEO & Social Share**: Complete OpenGraph, Twitter/X cards, canonical URLs, `robots.txt`, `sitemap.xml`, and Schema.org JSON-LD (`SoftwareApplication`, `WebSite`, `FAQPage`).

---

## 2. Technical Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with custom MOKU zen-palette:
  - Canvas: `#F8F8F3`
  - Secondary Surface: `#EFF2E9`
  - Primary Dark Green: `#294C3A`
  - Forest Green: `#476B57`
  - Accent Sage: `#A8B99E`
  - Text: `#242C27`
  - Muted: `#727B73`
  - Borders: `#E1E6DD`
- **Icons**: Lucide Icons
- **Fonts**: Manrope (Headings), Inter (Body copy), Noto Serif JP (Japanese characters)

---

## 3. Environment Configuration

To configure custom deployment domains, payment gateway keys, support desks, and analytics, create a `.env` file from `.env.example`:

```env
# Application URLs
VITE_APP_URL="https://moku.ami-kr-sin.workers.dev/"
VITE_MARKETING_DOMAIN="moku.in"

# Support & Contact
VITE_SUPPORT_EMAIL="ami.kr.sin@gmail.com"

# Payment Gateway Integration (Configurable Layer)
# Razorpay / Cashfree Merchant Keys (Do NOT expose private API secrets on frontend)
VITE_RAZORPAY_KEY_ID="rzp_live_your_key_id"
VITE_CASHFREE_APP_ID="your_cashfree_app_id"
VITE_CHECKOUT_URL="https://moku.in/checkout"

# Analytics Integration
VITE_GA4_MEASUREMENT_ID="G-XXXXXXXXXX"
VITE_META_PIXEL_ID=""
```

---

## 4. Cloudflare Pages Deployment Instructions

This website is designed for zero-maintenance deployment on **Cloudflare Pages** (with GitHub integration or direct CLI upload).

### Method A: Git-Connected Cloudflare Pages (Recommended)

1. **Push to GitHub**:
   Commit and push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: initial MOKU production marketing website"
   git remote add origin https://github.com/your-username/moku-website.git
   git push -u origin main
   ```

2. **Connect Cloudflare Pages**:
   - Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
   - In the left sidebar, navigate to **Compute (Workers) > Pages**.
   - Click **Create application** > **Pages** > **Connect to Git**.
   - Select your `moku-website` GitHub repository.

3. **Configure Build Settings**:
   - **Project Name**: `moku`
   - **Production Branch**: `main`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
   - **Node.js Version**: In **Environment Variables**, set `NODE_VERSION` to `20` or `22`.

4. **Deploy**:
   - Click **Save and Deploy**. Cloudflare will compile the application and provide a free `*.pages.dev` URL.

5. **Attach Custom .in Domain**:
   - In Cloudflare Pages, go to **Custom domains** > **Set up a custom domain**.
   - Enter your domain (e.g. `moku.in` or `www.moku.in`).
   - Cloudflare will configure the DNS CNAME records and issue a free SSL certificate automatically.

---

### Method B: Direct Wrangler CLI Deployment

You can also deploy directly using Cloudflare's Wrangler CLI without Git:

```bash
# 1. Install dependencies and compile the production build
npm install
npm run build

# 2. Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=moku-website
```

---

## 5. Development & Testing Commands

```bash
# Run local development server (port 3000)
npm run dev

# Run fast unit tests for financial math & form validation
npx --yes tsx --test src/utils/kakeibo.test.ts

# Run production compilation check
npm run build
```

---

## 6. License & Security Notice

- MOKU lifetime access terms: One-time payment of ₹499 for core features.
- Local-first architecture: Financial transaction records and monthly allocations are stored locally on the user's device.
- All rights reserved © 2026 MOKU.
