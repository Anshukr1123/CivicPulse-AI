import { CitizenRequest, DemandHotspot } from '../data/types';

export interface AnalysisResponse {
  category: CitizenRequest['category'];
  issue: string;
  severity: CitizenRequest['severity'];
  affectedServices: string[];
  seasonality: string;
  language: string;
  confidence: number;
  summary: string;
  aiPowered?: boolean;
}

export interface AssistantResponse {
  reply: string;
  aiPowered?: boolean;
}

export interface ProposalResponse {
  proposalText: string;
  aiPowered?: boolean;
}

export async function analyzeCitizenSubmission(
  text: string,
  languageHint?: string,
  location?: string
): Promise<AnalysisResponse> {
  try {
    const res = await fetch('/api/analyze-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, languageHint, location }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend API unavailable, using client-side deterministic GovTech logic', err);
  }

  // Client-side fallback analyzer
  const lower = text.toLowerCase();
  let category: CitizenRequest['category'] = 'Other';
  let severity: CitizenRequest['severity'] = 'Medium';
  let affectedServices = ['Public Infrastructure'];
  let seasonality = 'Year-round';
  let confidence = 0.91;
  let issue = 'General community development request';
  let detectedLang = languageHint || 'English';

  if (/[\u0900-\u097F]/.test(text)) {
    detectedLang = lower.includes('आहे') || lower.includes('नाही') ? 'Marathi' : 'Hindi';
  } else if (/[\u0980-\u09FF]/.test(text)) {
    detectedLang = 'Bengali';
  } else if (/[\u0B80-\u0BFF]/.test(text)) {
    detectedLang = 'Tamil';
  } else if (/[\u0C00-\u0C7F]/.test(text)) {
    detectedLang = 'Telugu';
  }

  if (lower.includes('road') || lower.includes('pothole') || lower.includes('bridge') || lower.includes('सड़क') ||
      lower.includes('रास्ता') || lower.includes('पुल') || lower.includes('রাস্তা') || lower.includes('சாலை') || lower.includes('రహదారి')) {
    category = 'Road Infrastructure';
    issue = 'Inadequate or damaged rural road accessibility and seasonal isolation';
    affectedServices = ['Emergency Healthcare Access', 'Agricultural Transport'];
  } else if (lower.includes('water') || lower.includes('tap') || lower.includes('pipeline') || lower.includes('पानी') ||
             lower.includes('जल') || lower.includes('জল') || lower.includes('தண்ணீர்') || lower.includes('నీరు')) {
    category = 'Drinking Water & Sanitation';
    issue = 'Acute shortage of potable piped drinking water and distribution leakage';
    affectedServices = ['Public Health', 'Maternal & Child Well-being'];
  } else if (lower.includes('hospital') || lower.includes('doctor') || lower.includes('clinic') || lower.includes('health') ||
             lower.includes('अस्पताल') || lower.includes('स्वास्थ्य') || lower.includes('மருத்துவமனை') || lower.includes('ఆసుపత్రి')) {
    category = 'Healthcare Facilities';
    issue = 'Primary health center staffing deficit and lack of 24x7 emergency response';
    affectedServices = ['Emergency Triage', 'Maternal Delivery Care'];
  } else if (lower.includes('school') || lower.includes('education') || lower.includes('teacher') || lower.includes('स्कूल') ||
             lower.includes('பள்ளி') || lower.includes('పాఠశాల')) {
    category = 'Education & Skill Development';
    issue = 'Classroom infrastructure deficiency and lack of separate sanitation';
    affectedServices = ['Youth Literacy', 'Secondary Retention'];
  } else if (lower.includes('electricity') || lower.includes('power') || lower.includes('transformer') || lower.includes('बिजली') ||
             lower.includes('மின்சாரம்') || lower.includes('విద్యుత్')) {
    category = 'Electricity & Power Grid';
    issue = 'Frequent voltage drops and prolonged agricultural power outages';
    affectedServices = ['Irrigation Pumps', 'Micro-enterprises'];
  } else if (lower.includes('internet') || lower.includes('tower') || lower.includes('signal') || lower.includes('नेटवर्क') || lower.includes('सिग्नल')) {
    category = 'Digital Infrastructure & Telecom';
    issue = 'Cellular blind spots preventing e-governance and student access';
    affectedServices = ['PDS Ration Delivery', 'Telecommunications'];
  } else if (lower.includes('drain') || lower.includes('waste') || lower.includes('garbage') || lower.includes('नाली') || lower.includes('कचरा')) {
    category = 'Waste Management & Drainage';
    issue = 'Monsoon drainage clogging causing waterlogging and disease vectors';
    affectedServices = ['Sanitation', 'Vector-borne Disease Prevention'];
  }

  if (lower.includes('ambulance') || lower.includes('death') || lower.includes('danger') || lower.includes('emergency') ||
      lower.includes('cannot reach') || lower.includes('hazard') || lower.includes('मर') || lower.includes('खतरा')) {
    severity = 'High';
  } else if (lower.includes('difficult') || lower.includes('frequent') || lower.includes('broken')) {
    severity = 'Medium';
  } else {
    severity = 'Low';
  }

  if (lower.includes('monsoon') || lower.includes('rain') || lower.includes('flood') || lower.includes('बारिश')) {
    seasonality = 'Monsoon';
  } else if (lower.includes('summer') || lower.includes('heat') || lower.includes('गर्मी')) {
    seasonality = 'Summer / Pre-Monsoon';
  }

  return {
    category,
    issue,
    severity,
    affectedServices,
    seasonality,
    language: detectedLang,
    confidence,
    summary: `Citizen identifies critical deficiencies in ${category.toLowerCase()}, notably "${issue}". Urgency level assessed as ${severity} due to direct impact on ${affectedServices.slice(0, 2).join(' and ')}.`,
    aiPowered: false,
  };
}

export async function askPolicyAssistant(query: string, history: Array<{ role: string; content: string }>): Promise<AssistantResponse> {
  try {
    const res = await fetch('/api/policy-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, history }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Policy Assistant API unavailable, using fallback answers', err);
  }

  const qLower = query.toLowerCase();
  let reply = '';

  if (qLower.includes('health') || qLower.includes('hospital')) {
    reply = `### Executive Assessment: Unmet Healthcare Infrastructure Demand

Based on the National Health Infrastructure Survey and synthesized citizen demand clusters:

1. **Top Demand Concentration**:
   - **Mandla District (Madhya Pradesh)**: 6,820 citizen submissions reporting Sub-Centre doctor absences and inaccessible referral pathways.
   - **Kishanganj District (Bihar)**: 5,490 requests highlighting maternal ICU shortages across riverine belts.
   - **Dharmapuri (Tamil Nadu)**: 3,920 requests for dialysis equipment at Taluk hospitals.

2. **Key Metrics**:
   - Aggregate Healthcare Infrastructure Gap: **58.4%** across monitored aspirational blocks.
   - High-Severity Proportion: **42%** of logged requests cite immediate clinical emergency risks.
   - Estimated Vulnerable Population Affected: **3.84 Million** citizens.

3. **Recommended Interventions**:
   - Fast-track 12 Community Health Centre (CHC) diagnostic upgrades under Pradhan Mantri Ayushman Bharat Infrastructure Mission (PM-ABHIM).
   - Deploy 28 mobile telemedicine clinics with satellite backhaul in terrain-isolated tribal mandals.

*Data Sources: National Health Mission MIS, Integrated Citizen Registry (Synthetic Demo Dataset). Confidence: 89%. Decision Support Note: Human administrative review required prior to scheme sanctions.*`;
  } else if (qLower.includes('road') || qLower.includes('connectivity')) {
    reply = `### Executive Assessment: Rural Road & All-Weather Transit Gaps

Citizen demand trends indicate severe monsoon seasonality vulnerabilities in secondary rural corridors:

1. **Top Hotspot Clusters**:
   - **Dhar District (Madhya Pradesh)**: 8,421 verified citizen submissions; 67% rural connectivity deficit during monsoon flooding.
   - **Gadchiroli (Maharashtra)**: 5,140 submissions citing cut-off tribal hamlets during July–September.
   - **Sitapur (Uttar Pradesh)**: 6,890 submissions regarding culvert collapses impacting agricultural haulage.

2. **Explainable Priority Drivers**:
   - Citizen Demand Volume: 18/20
   - Infrastructure Gap (PMGSY Unconnected Core Network): 17/20
   - Emergency Access Vulnerability: 14/15
   - Overall AI-assisted Priority Score: **91/100** (Dhar District)

3. **Actionable Roadmap**:
   - Prioritize high-level bridge constructions and culvert standardizations under State Rural Road Development Agencies (SRRDA).
   - Align budget tranches to pre-monsoon construction windows (November–May).

*Data Sources: PMGSY Geographic Information System, Citizen Pulse Registry (Synthetic Demo Dataset). Confidence: 92%.*`;
  } else if (qLower.includes('500') || qLower.includes('budget') || qLower.includes('simulate') || qLower.includes('allocate')) {
    reply = `### Simulated Policy Scenario: ₹500 Crore Capital Allocation

Simulating balanced portfolio optimization across priority infrastructure gaps:

1. **Recommended Budget Distribution**:
   - **Road & Bridges**: ₹170 Cr (34%) → Connects 142 remote habitations, restoring all-weather mobility for 1.1M residents.
   - **Healthcare Systems**: ₹130 Cr (26%) → Upgrades 45 Primary Health Centres with 24x7 trauma care.
   - **Potable Water Supply**: ₹100 Cr (20%) → Expands Jal Jeevan Mission piped connections to 88,000 households.
   - **Education & Digital Infra**: ₹60 Cr (12%) → Digital smart classrooms in 110 secondary schools.
   - **Drainage & Sanitation**: ₹40 Cr (8%) → Flood prevention embankments in flood-prone riverine panchayats.

2. **Projected Impact Indicators**:
   - Net Infrastructure Gap Reduction: **-14.8%** across target zones.
   - Direct Beneficiary Coverage: **3.42 Million Citizens**.
   - Citizen Grievance Redirection Rate: Projected 62% decline in emergency intervention requests within 18 months.

*Note: Model projections represent simulated parametric forecasting based on historic capital expenditure efficiencies.*`;
  } else {
    reply = `### CivicPulse Policy Analysis: Strategic Governance Overview

1. **Cross-Sector Demands**:
   - Citizen submissions across 25 monitored districts indicate that **Rural Roads (32%)**, **Drinking Water (27%)**, and **Healthcare (21%)** constitute over 80% of aggregate infrastructure requests.
   - 48% of high-severity requests are located in geographically challenging aspirational districts.

2. **Priority Engine Insights**:
   - Districts with compounding deficits (e.g., Dhar MP, Sitapur UP, Kishanganj Bihar) rank highest on the **AI-assisted Priority Score (85–94/100)** because the engine weights severe citizen isolation and emergency vulnerabilities.

3. **Guidance for Policymakers**:
   - Filter the **Demand Hotspots Map** to view spatial correlations between citizen clusters and PMGSY/Jal Jeevan Mission coverage gaps.
   - Test custom allocations using the **Budget Simulator** to evaluate estimated beneficiary yields per crore invested.

*Data Sources: Census 2011/Projections, Mission Antyodaya Survey, CivicPulse Synthetic Demo Engine. Decision-support output only.*`;
  }

  return { reply, aiPowered: false };
}

export async function generateDevelopmentProposal(hotspot: DemandHotspot): Promise<ProposalResponse> {
  try {
    const res = await fetch('/api/generate-proposal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hotspot }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Generate Proposal API unavailable, using comprehensive fallback', err);
  }

  const proposalText = `# DEVELOPMENT PROPOSAL: COMPREHENSIVE INFRASTRUCTURE UPGRADE
## ${hotspot.topIssue.toUpperCase()} — ${hotspot.district.toUpperCase()}, ${hotspot.state.toUpperCase()}

### 1. PROJECT TITLE
**Mission ${hotspot.district}**: Accelerated ${hotspot.category} Modernization & All-Weather Connectivity Initiative

### 2. PROBLEM STATEMENT
In ${hotspot.district}, ${hotspot.state}, citizen accessibility is severely compromised by a ${hotspot.infrastructureGap}% baseline infrastructure deficit. Multiple rural and semi-urban panchayats experience compounding isolation during peak seasonal weather, cutting off essential transport, school commute, and emergency hospital access.

### 3. CITIZEN DEMAND & EVIDENCE BREAKDOWN
- **Total Validated Submissions**: ${hotspot.citizenRequests?.toLocaleString() || '8,421'} unique citizen development requests logged via multilingual voice and text DPI channels.
- **High-Severity Share**: ${hotspot.highSeverityRequests?.toLocaleString() || '2,814'} requests (approx. 33.4%) involve immediate health, agricultural, or livelihood emergencies.
- **Geographic Clustering**: Concentrated across 14 vulnerable gram panchayats with recurring distress reports over the preceding 12 months.

### 4. INFRASTRUCTURE GAP ANALYSIS
- **Baseline Gap**: ${hotspot.infrastructureGap}% coverage shortfall when measured against National Infrastructure Pipeline standards.
- **Critical Failure Points**: Narrow culverts, missing bridge spans, and degraded sub-surface layers vulnerable to soil subsidence.
- **Inter-service Strain**: Deficiencies directly degrade delivery of Ayushman Bharat emergency ambulances and public bus transport.

### 5. AFFECTED POPULATION & DEMOGRAPHICS
- **Direct Population Impact**: ${hotspot.population || '1.2M'} residents.
- **Vulnerability Indices**: High concentration of smallholder farming families, daily wage earners, and school-age children reliant on public arteries.

### 6. RECOMMENDED INTERVENTION & SCOPE
- **Civil Works**: Construction and widening of 64.5 km of high-durability reinforced bitumen/concrete roads with cambered storm runoffs.
- **Cross-Drainage Structures**: 6 major multi-span bridges and 24 box culverts engineered to withstand 50-year flood levels.
- **Safety Infrastructure**: Solar street lighting at 18 village convergence junctions, retro-reflective signage, and emergency call booths.

### 7. ESTIMATED CAPITAL INVESTMENT
- **Estimated Outlay**: ₹${Math.round(hotspot.priorityScore * 1.9)} Crore (±10% preliminary estimate).
- **Phasing**: Phase I (Civil engineering & pre-monsoon earthwork: 55%), Phase II (Surfacing & bridge structures: 35%), Phase III (Audit, lighting, sensors: 10%).

### 8. EXPECTED SOCIO-ECONOMIC OUTCOMES
- **Travel Time Reduction**: 58% reduction in transit time between remote gram panchayats and district sub-divisional hospitals.
- **Economic Uplift**: 22% improvement in farm-gate price realization by eliminating distress sales due to muddy transport logjams.
- **Public Health Safety**: Guaranteed 20-minute ambulance access across 100% of target settlements.

### 9. IMPLEMENTATION CONSIDERATIONS & TIMELINE
- **Execution Period**: 18 calendar months with mandated pre-monsoon milestone completions.
- **Executing Agency**: State Public Works Department / Rural Road Development Authority in coordination with Panchayati Raj institutions.

### 10. POTENTIAL RISKS & MITIGATION
- **Risk**: Monsoon waterlogging halting earthwork. *Mitigation: Compulsory completion of culverts and subsurface compacting before June.*
- **Risk**: Local land rights delays. *Mitigation: Social impact assessment and fast-track Panchayat consultation councils.*

### 11. SUCCESS METRICS & EVALUATION KPIS
- Reduction in citizen road complaints by $\\ge 60\\%$ within 6 months of commissioning.
- Year-round bus route operational continuity $\\ge 98\\%$.
- Post-project citizen satisfaction rating $\\ge 80\\%$ measured via CivicPulse Impact Tracker.

### 12. DATA SOURCES & AUDIT TRAIL
- CivicPulse Multilingual Voice/Text Ingestion Engine (100% anonymized citizen requests).
- PMGSY GIS Core Network Audit.
- Census Demographic Spatial Projections.

### 13. DECISION SUPPORT & HUMAN OVERSIGHT NOTE
*This proposal is an AI-assisted decision-support recommendation generated for policy review. All cost estimates, engineering volumes, and impact forecasts are preliminary synthetic model estimates and require physical site inspection and state cabinet administrative sanction before tender issuance.*`;

  return { proposalText, aiPowered: false };
}
