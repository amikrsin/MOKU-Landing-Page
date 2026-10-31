import { AppScreenshot, KakeiboPillar, FAQItem } from '../types';

export const APP_CONFIG = {
  name: 'MOKU',
  tagline: 'Spend Mindfully. Save Intentionally.',
  positioning: "Don't just track your money. Understand it.",
  liveAppUrl: 'https://moku.ami-kr-sin.workers.dev/',
  priceINR: 499,
  licenseType: 'One-Time Purchase · Lifetime Access',
  supportEmail: 'ami.kr.sin@gmail.com',
  domain: 'moku.in',
  targetAudience: 'Indian salaried professionals (22–35), newly married couples & mindful budgeters',
};

export const SCREENSHOTS: AppScreenshot[] = [
  {
    id: 'dashboard',
    title: 'Mindful Budget Dashboard',
    subtitle: 'Available-to-Spend & Savings First',
    category: 'Home',
    imagePath: '/assets/aistudio/home_c26a6a11.jpeg',
    description:
      'View your monthly spendable pool, track the committed savings target paid to self first, and monitor remaining days with zero cognitive overload.',
    keyHighlights: [
      'Available-to-Spend calculation',
      'Committed First savings goal progress',
      'Plan vs Actual monthly spendable pool',
      'Instant floating Quick Add action',
    ],
  },
  {
    id: 'expense',
    title: 'Quick Expense Entry',
    subtitle: 'Instant amount, smart memo & SMS auto-fill',
    category: 'Expense',
    imagePath: '/assets/aistudio/expence_be81584c.jpeg',
    description:
      'Record transactions with smart text ("Lunch 350 at Subway"), SMS paste, 4 Kakeibo pillars, payment modes (UPI, Card, Cash, NetBanking), and mindful joy reflections.',
    keyHighlights: [
      'SMS auto-fill & voice memo',
      'One-tap quick chips (+₹50, +₹100, +₹500, +₹1k, +₹2k)',
      '4 Kakeibo Pillars (Essentials, Wants, Growth, Unexpected)',
      'Mindful Value tag: Essential, Joyful, or Could Skip',
    ],
  },
  {
    id: 'review',
    title: 'Kakeibo Review & Financial Audit',
    subtitle: 'Overview, Daily Flow & Kaizen Reflection',
    category: 'Review',
    imagePath: '/assets/aistudio/review_61fc0bbe.jpeg',
    description:
      'Review total inflow, savings target achieved, net surplus/deficit, and daily spending velocity to continuously refine your financial habits month-by-month.',
    keyHighlights: [
      '4-point financial audit: Inflow, Target, Spent, Surplus',
      'Daily Spending Velocity & Burn Rate (Safe daily limit)',
      'Pillars budget vs actual comparison',
      'Kaizen continuous financial improvement',
    ],
  },
  {
    id: 'settings',
    title: 'Space & Settings',
    subtitle: 'Local-first offline profile & security',
    category: 'Settings',
    imagePath: '/assets/aistudio/settings_873ed65b.jpeg',
    description:
      'Configure local offline profile, monthly budget goals, mutual funds & emergency fund logs, INR currency formatting, and appearance themes.',
    keyHighlights: [
      'This Device (Offline) local profile',
      'Savings & Investment log (MFs, FDs, Emergency Fund)',
      'PIN Security & Authorization toggle',
      'Standalone native PWA mode support',
    ],
  },
  {
    id: 'pin',
    title: 'PIN Security & Authorization',
    subtitle: 'Your financial ledger locked for privacy',
    category: 'Privacy',
    imagePath: '/assets/aistudio/pin_3d7a218f.jpeg',
    description:
      'Your ledger stays strictly on your device. Fast 4-digit PIN authentication keeps your salary, investments, and expenses completely private from prying eyes.',
    keyHighlights: [
      'Instant 4-digit PIN lock',
      'Local device-level data protection',
      'No bank login or password sharing',
      'Zero advertising tracking',
    ],
  },
];

export const KAKEIBO_PILLARS: KakeiboPillar[] = [
  {
    id: 'essentials',
    title: 'Essentials (Needs)',
    japanese: 'Seikatsu (生活)',
    kanji: '必',
    role: 'Survival & Non-Negotiables',
    percentage: '50%',
    description:
      'Fixed and essential living expenses you cannot live without. Rent, groceries, electricity, medicines, transit, and regular utility bills.',
    examples: ['House Rent & Maintenance', 'Groceries & Milk', 'Medicines & Doctor visits', 'Electricity & WiFi', 'Metro / Petrol / Transit'],
    color: '#294C3A',
    bgLight: '#EFF5EE',
  },
  {
    id: 'wants',
    title: 'Wants (Enjoyment)',
    japanese: 'Goraku (娯楽)',
    kanji: '楽',
    role: 'Mindful Leisure & Joy',
    percentage: '25%',
    description:
      'Expenses that bring joy, taste, and relaxation, but are not strictly vital. Dining out, weekend movies, coffee, travel, and shopping.',
    examples: ['Swiggy & Dining out', 'Specialty Coffee', 'Weekend Movies & Streaming', 'Fashion & Gadgets', 'Weekend Getaways'],
    color: '#B57C2A',
    bgLight: '#FDF7EB',
  },
  {
    id: 'growth',
    title: 'Growth (Learning & Culture)',
    japanese: 'Kyoyo (教養)',
    kanji: '育',
    role: 'Self-Investment & Enrichment',
    percentage: '15%',
    description:
      'Intentional spending to improve your mind, career, health, and spirit. Books, technical certifications, gym memberships, and cultural visits.',
    examples: ['Non-fiction Books & Kindle', 'Courses & Certifications', 'Gym / Yoga Memberships', 'Museums & Art workshops', 'Mentorship & Seminars'],
    color: '#346B84',
    bgLight: '#EEF6F9',
  },
  {
    id: 'unexpected',
    title: 'Unexpected (Unplanned)',
    japanese: 'Tokubetsu (特別)',
    kanji: '変',
    role: 'Unplanned Life Fluctuations',
    percentage: '10%',
    description:
      'Irregular, unexpected costs that arise without warning: sudden vehicle service, urgent home repair, wedding gifts, or unexpected travel.',
    examples: ['Vehicle Puncture / Service', 'Urgent Appliance Repairs', 'Family Wedding Shagun', 'Emergency Clinic Visit', 'Unscheduled Domestic Travel'],
    color: '#8A4A58',
    bgLight: '#FAF0F2',
  },
];

export const PROBLEM_CARDS = [
  {
    number: '01',
    title: 'Salary disappears before month-end',
    description:
      'Money enters on the 30th or 1st, but by the 20th you wonder where ₹70,000 went. Most apps tell you what happened after the damage is already done.',
    insight: 'Tracking after spending is an autopsy. You need a pre-commitment plan.',
  },
  {
    number: '02',
    title: 'Small UPI expenses accumulate unnoticed',
    description:
      '₹80 for chai, ₹140 for snacks, ₹290 on quick commerce, ₹450 on food delivery. Individual transactions feel harmless until they total ₹22,000 in untracked leaks.',
    insight: 'Frictionless UPI makes spending invisible. Mindful logging restores awareness.',
  },
  {
    number: '03',
    title: 'Savings become whatever is left over',
    description:
      'You tell yourself: "I will save whatever is left at the end of the month." In practice, expenses expand to consume all available cash, leaving zero.',
    insight: 'Kakeibo flips the equation: define savings first, then spend the rest freely.',
  },
  {
    number: '04',
    title: 'No habit of reviewing monthly spending',
    description:
      'Without a calm monthly retrospective, the same financial blind spots repeat month after month, leading to chronic financial anxiety.',
    insight: 'Kaizen (continuous improvement) turns monthly reflection into a relaxing habit.',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Plan Your Month',
    subtitle: 'Define Total Inflow & Fixed Commitments',
    description:
      'At the beginning of each calendar month, enter your expected salary or inflow. Set up your basic monthly parameters in under 2 minutes.',
  },
  {
    step: '02',
    title: 'Save First',
    subtitle: 'Committed to Self Before Any Spending',
    description:
      'Define the exact amount you want to save (e.g. ₹15,000). MOKU locks this as your primary savings goal and calculates your true "Available to Spend" pool.',
  },
  {
    step: '03',
    title: 'Track Daily Spending',
    subtitle: 'Allocate into 4 Kakeibo Pillars',
    description:
      'As you spend via UPI, cards, or cash, quickly log transactions into Essentials, Wants, Growth, or Unexpected. Tag whether an expense brought genuine joy or was avoidable.',
  },
  {
    step: '04',
    title: 'Reflect and Improve',
    subtitle: 'Monthly Audit & Kaizen Review',
    description:
      'At month-end, inspect your spending velocity, burn rate, and surplus. Ask the 4 Kakeibo reflection questions and start the next month with calm clarity.',
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'what-is-moku',
    category: 'general',
    question: '1. What is MOKU?',
    answer:
      'MOKU is a mindful personal budgeting and expense management application designed specifically for Indian salaried professionals and couples. Unlike traditional expense trackers that simply log bank notifications, MOKU applies the Japanese Kakeibo method to help you pre-allocate your salary, commit to savings first, categorize daily spending into 4 purposeful pillars, and conduct a peaceful monthly financial audit.',
  },
  {
    id: 'how-kakeibo-works',
    category: 'kakeibo',
    question: '2. How does the Kakeibo method work?',
    answer:
      'Invented in Japan by journalist Hani Motoko in 1904, Kakeibo translates to "household financial ledger". It centers around four questions: (1) How much money do you have? (2) How much would you like to save? (3) How much are you spending? and (4) How can you improve? It groups expenses into four pillars: Essentials (Needs), Wants (Enjoyment), Growth (Learning & Culture), and Unexpected (Unplanned).',
  },
  {
    id: 'is-subscription',
    category: 'pricing',
    question: '3. Is MOKU a subscription?',
    answer:
      'No. MOKU is completely free from monthly or annual recurring subscriptions. You pay a single one-time price of ₹499 for lifetime access to the core application features.',
  },
  {
    id: 'is-499-onetime',
    category: 'pricing',
    question: '4. Is the ₹499 payment one-time?',
    answer:
      'Yes. The ₹499 payment is a one-time charge. There are no surprise renewal charges, no hidden lock-in fees, and no feature paywalls for defined core features.',
  },
  {
    id: 'offline-mode',
    category: 'privacy',
    question: '5. Does MOKU work offline?',
    answer:
      'Yes. MOKU is architected with a local-first profile. You can record daily expenses, review your monthly budget, and track your spendable pool entirely offline without an active internet connection. Your records are preserved directly in your browser or device storage.',
  },
  {
    id: 'android-availability',
    category: 'technical',
    question: '6. Is MOKU available on Android?',
    answer:
      'Yes. MOKU runs as an installable Progressive Web Application (PWA) with native-like standalone mode on Android devices. You can install it directly to your home screen from Chrome or any modern browser, launch it without browser bars, and access it anytime with full offline support.',
  },
  {
    id: 'account-required',
    category: 'privacy',
    question: '7. Do I need to create an account?',
    answer:
      'No account creation is required to use MOKU in local offline mode. You can start budgeting immediately. Optional sync/sign-in capabilities are available if you wish to back up your ledger across multiple devices.',
  },
  {
    id: 'data-storage',
    category: 'privacy',
    question: '8. Where is my financial data stored?',
    answer:
      'Your financial records, income targets, and expense entries are stored locally on your device storage by default. MOKU never asks for your bank account passwords, net banking credentials, or SMS reader permissions, ensuring your financial privacy remains 100% in your hands.',
  },
  {
    id: 'export-data',
    category: 'technical',
    question: '9. Can I export my data?',
    answer:
      'Yes. MOKU allows you to export your monthly logs and transaction summaries as structured CSV/JSON data from your device settings for backup or personal spreadsheet analysis.',
  },
  {
    id: 'recover-purchase',
    category: 'pricing',
    question: '10. How can I recover my purchase?',
    answer:
      'When you complete your ₹499 purchase, you receive an order confirmation and license key associated with your purchase email address. You can re-enter this license key in the MOKU app under Settings > "Unlock Full App" at any time.',
  },
  {
    id: 'change-phone',
    category: 'technical',
    question: '11. What happens if I change my phone?',
    answer:
      'You can restore your lifetime license on your new phone by entering your registered license key. To transfer existing historical data, simply export your backup file from your old device and import it on the new device, or use the optional sync feature.',
  },
  {
    id: 'contact-support',
    category: 'general',
    question: '12. How do I contact support?',
    answer:
      'You can reach our dedicated support desk directly via email at ami.kr.sin@gmail.com, or submit a request through our Contact page. We respond to all user inquiries within 24–48 business hours.',
  },
];
