import { AppScreenshot, KakeiboPillar, FAQItem } from '../types';

export const APP_CONFIG = {
  name: 'MOKU',
  productName: 'MOKU Lifetime Licence',
  productDescription: 'Mindful personal budgeting companion — lifetime access for up to 2 devices',
  tagline: 'Spend Mindfully. Save Intentionally.',
  headline: 'Your Salary Deserves a Better Plan.',
  positioning: "Don't just track your money. Understand it.",
  liveAppUrl: 'https://moku.ami-kr-sin.workers.dev/',
  priceINR: 499,
  pricePaise: 49900,
  currency: 'INR',
  checkoutButtonText: 'Buy MOKU — ₹499',
  licenseType: 'One-Time Purchase · Lifetime Access',
  deviceLimit: 2,
  paymentGateway: 'Razorpay',
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
      'MOKU is a mindful personal budgeting and expense management application designed specifically for Indian salaried professionals, couples, and individuals looking to build financial discipline. Inspired by the Japanese Kakeibo philosophy, MOKU helps you pre-allocate your monthly salary, commit to savings first, categorize daily spending into 4 purposeful pillars, and conduct a calm monthly Kaizen reflection.',
  },
  {
    id: 'what-is-kakeibo',
    category: 'kakeibo',
    question: '2. What is the Kakeibo method?',
    answer:
      'Invented in Japan by Hani Motoko in 1904, Kakeibo translates to "household financial ledger". It centers around four reflection questions: (1) How much money do I have available? (2) How much money would I like to save? (3) How much money am I spending? and (4) How can I improve? Daily spending is organized into four distinct pillars: Essentials (Needs), Wants (Enjoyment), Growth (Learning & Culture), and Unexpected (Unplanned).',
  },
  {
    id: 'is-subscription',
    category: 'pricing',
    question: '3. Is MOKU a subscription?',
    answer:
      'No. MOKU is completely free from monthly or annual recurring subscriptions. You pay a single one-time price of ₹499 for a lifetime licence. There are zero renewal charges, no lock-in fees, and no feature paywalls for defined core features.',
  },
  {
    id: 'how-much-cost',
    category: 'pricing',
    question: '4. How much does MOKU cost?',
    answer:
      'MOKU costs a single one-time launch payment of ₹499 (all taxes included). This provides lifetime access to the MOKU budgeting application without recurring fees.',
  },
  {
    id: 'how-receive-licence',
    category: 'pricing',
    question: '5. How do I receive my licence key?',
    answer:
      'Immediately following verified payment via Razorpay, our automated delivery system generates a cryptographically unique licence key and sends it to your registered email address along with a one-click activation link.',
  },
  {
    id: 'how-activate',
    category: 'technical',
    question: '6. How do I activate MOKU?',
    answer:
      'You can activate MOKU in two easy ways: (1) Click the one-click activation link in your delivery email, or (2) Open MOKU at moku.ami-kr-sin.workers.dev, go to Space & Settings > "Unlock Full App", and paste your licence key.',
  },
  {
    id: 'phone-and-laptop',
    category: 'technical',
    question: '7. Can I use MOKU on my phone and laptop?',
    answer:
      'Yes. MOKU is a modern Progressive Web App (PWA) accessible across devices. You can install it natively on your Android phone and access it on your laptop or desktop browser.',
  },
  {
    id: 'device-limit',
    category: 'pricing',
    question: '8. How many devices can I activate?',
    answer:
      'Each MOKU lifetime licence permits activation on up to two (2) personal registered devices simultaneously (for example, your personal smartphone and your laptop).',
  },
  {
    id: 'works-offline',
    category: 'privacy',
    question: '9. Does MOKU work offline?',
    answer:
      'Yes. MOKU operates with a local-first architecture. You can log expenses, inspect your monthly budget pool, and view spending statistics even with no internet connection.',
  },
  {
    id: 'change-phone',
    category: 'technical',
    question: '10. What happens if I change my phone?',
    answer:
      'You can restore your lifetime licence on your new phone using your registered licence key. You can also transfer your data at any time using MOKU\'s built-in CSV/JSON backup and export feature.',
  },
  {
    id: 'privacy-shared',
    category: 'privacy',
    question: '11. Is my financial information shared with anyone?',
    answer:
      'No. Your financial records, income targets, and daily expenses remain stored locally on your device storage. MOKU never accesses bank credentials, passwords, or SMS feeds.',
  },
  {
    id: 'payment-methods',
    category: 'pricing',
    question: '12. Which payment methods are supported?',
    answer:
      'Payments are processed securely through Razorpay Checkout. Supported Indian payment methods include UPI (Google Pay, PhonePe, Paytm, BHIM), Debit & Credit Cards (Visa, Mastercard, RuPay), and Net Banking across major Indian banks.',
  },
  {
    id: 'payment-no-email',
    category: 'pricing',
    question: '13. What happens if my payment succeeds but I do not receive the email?',
    answer:
      'First check your spam/promotions folder. If webhook processing is delayed or the email is missing after 10 minutes, email ami.kr.sin@gmail.com with your Razorpay payment ID, and our support desk will verify your order and manually re-dispatch your licence.',
  },
  {
    id: 'contact-support',
    category: 'general',
    question: '14. How can I contact support?',
    answer:
      'You can reach our support desk anytime at ami.kr.sin@gmail.com. We respond to all queries and licence assistance requests within 24–48 business hours.',
  },
];
