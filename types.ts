export enum Industry {
  ART = 'Art & Auctions',
  FINANCE = 'Private Equity & DeFi',
  REAL_ESTATE = 'Commercial Real Estate',
  MINING = 'Mining & Energy',
  EDUCATION = 'Education & EdTech',
  AGRICULTURE = 'Agriculture & Viticulture'
}

export interface SimulationResult {
  contractId: string;
  structure: string[];
  riskMatrix: {
    category: string;
    level: 'Low' | 'Medium' | 'High' | 'Critical';
    mitigation: string;
  }[];
  capitalStack: {
    source: string;
    amount: string;
    percentage: number;
  }[];
  complianceChecklist: string[];
  strategicInsight: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  trend: number;
  isPositive: boolean;
}
