export interface AppScreenshot {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  imagePath: string;
  description: string;
  keyHighlights: string[];
}

export interface KakeiboPillar {
  id: string;
  title: string;
  japanese: string;
  kanji: string;
  role: string;
  description: string;
  percentage: string;
  examples: string[];
  color: string;
  bgLight: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'kakeibo' | 'pricing' | 'privacy' | 'technical';
}

export type PageRoute = 'home' | 'privacy-policy' | 'terms' | 'refund-policy' | 'contact' | 'kakeibo' | 'payment-status';
