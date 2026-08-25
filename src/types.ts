export type Language = 'ru' | 'en' | 'kz';

export interface NavItem {
  id: string;
  label: string;
}

export interface ExamMetric {
  category: string;
  code: string;
  volume: string;
  description: string;
  volumeNumber: number; // in millions
  highlightColor: string;
  photo?: string;
  targetAudience?: string;
}

export interface ProblemItem {
  id: string;
  iconName: string;
  title: string;
  flaw: string;
  description: string;
  severity: number;
  photo?: string;
}

export interface TechPillar {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  iconName: string;
  bullets: string[];
  photo?: string;
}

export interface LoopStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  tag: string;
  latency?: string;
  iconName: string;
  details: string;
  photo: string;
}

export interface ModuleSkill {
  id: 'reading' | 'listening' | 'writing' | 'speaking';
  title: string;
  subtitle: string;
  accuracy: string;
  color: string;
  iconName: string;
  capabilities: string[];
  sampleTitle: string;
  sampleTask: string;
  photo: string;
}

export interface ComparisonRow {
  feature: string;
  legacy: string;
  testTopAI: string;
  winner: 'testtop' | 'neutral';
}

export interface MetricCard {
  value: string;
  label: string;
  trend: string;
  trendPositive: boolean;
  subtext: string;
  iconName: string;
}

export interface PricingTier {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  popular?: boolean;
  description: string;
  features: string[];
  ctaText: string;
}

export interface MicroPurchase {
  name: string;
  price: string;
  type: string;
  features: string[];
}

export interface RoadmapMilestone {
  period: string;
  title: string;
  status: 'active' | 'upcoming' | 'completed';
  metrics: string;
  description: string;
  badge: string;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  score: string;
  exam: string;
  comment: string;
  daysToTarget: string;
  university?: string;
  flag?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GlobalHub {
  city: string;
  country: string;
  flag: string;
  exam: string;
  candidates: string;
  photo: string;
}

