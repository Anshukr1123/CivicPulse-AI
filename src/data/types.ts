export type LanguageCode = 'en' | 'hi' | 'bn' | 'mr' | 'ta' | 'te';

export type UserRole = 'policymaker' | 'citizen' | 'analyst' | 'admin';

export type InfrastructureCategory = 
  | 'Road Infrastructure'
  | 'Drinking Water & Sanitation'
  | 'Healthcare Facilities'
  | 'Education & Skill Development'
  | 'Electricity & Power Grid'
  | 'Digital Infrastructure & Telecom'
  | 'Public Transportation'
  | 'Waste Management & Drainage'
  | 'Other';

export type SeverityLevel = 'High' | 'Medium' | 'Low';

export interface CitizenRequest {
  id: string;
  date: string;
  language: string;
  request: string;
  normalizedIssue: string;
  category: InfrastructureCategory;
  severity: SeverityLevel;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  populationAffected: number;
  status: 'Under Review' | 'Hotspot Clustered' | 'Project Proposed' | 'Approved' | 'In Progress' | 'Resolved';
  confidence: number;
  seasonality?: string;
  affectedServices?: string[];
  submissionType?: 'voice' | 'text';
}

export interface PriorityScoreBreakdown {
  citizenDemand: number;        // max 20
  infrastructureGap: number;    // max 20
  populationImpact: number;     // max 15
  severity: number;             // max 15
  vulnerability: number;        // max 10
  urgency: number;              // max 10
  expectedImpact: number;       // max 10
}

export interface DemandHotspot {
  id: string;
  district: string;
  state: string;
  category: InfrastructureCategory;
  topIssue: string;
  citizenRequests: number;
  highSeverityRequests: number;
  infrastructureGap: number; // percentage, e.g. 67
  population: string; // e.g. "1.2M"
  populationNumeric: number;
  latitude: number;
  longitude: number;
  priorityScore: number; // calculated 0-100
  breakdown: PriorityScoreBreakdown;
  rationale: string[];
  estimatedCostCr: number;
  vulnerabilityIndex: number; // 0-10
  urgencyIndex: number; // 0-10
}

export interface PriorityProject {
  id: string;
  title: string;
  hotspotId: string;
  district: string;
  state: string;
  category: InfrastructureCategory;
  priorityScore: number;
  citizenRequests: number;
  populationAffected: string;
  infrastructureGap: number;
  expectedImpact: 'High' | 'Very High' | 'Transformative';
  estimatedInvestmentCr: number;
  targetTimelineMonths: number;
  status: 'Recommended' | 'Prioritized' | 'In Consultation' | 'Cabinet Sanctioned';
  keyInterventions: string[];
}

export interface ImpactProject {
  id: string;
  name: string;
  district: string;
  state: string;
  category: InfrastructureCategory;
  completionDate: string;
  investmentCr: number;
  beneficiaries: string;
  requestsBefore: number;
  requestsAfter: number;
  gapBefore: number; // %
  gapAfter: number; // %
  satisfactionScore: number; // %
  keyAccomplishments: string[];
  monitoringStatus: 'Post-Implementation Audit' | 'Year-1 Follow-up' | 'Fully Operational';
}

export interface DataSourceItem {
  id: string;
  name: string;
  category: 'Citizen Data' | 'Demographic Data' | 'Infrastructure Data' | 'Public Investment Data' | 'Geographic Data';
  type: string;
  updateFrequency: string;
  coverage: string;
  status: 'Synthetic Demo Dataset' | 'Government Registry API' | 'Satellite Telemetry' | 'Census Model';
  notes: string;
}

export interface PriorityWeights {
  citizenDemand: number;     // e.g. 0.20
  infrastructureGap: number; // e.g. 0.20
  populationImpact: number;  // e.g. 0.15
  severity: number;          // e.g. 0.15
  vulnerability: number;     // e.g. 0.10
  urgency: number;           // e.g. 0.10
  expectedImpact: number;    // e.g. 0.10
}
