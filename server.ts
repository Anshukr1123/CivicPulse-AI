import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent telemetry as mandated by instructions
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Fallback deterministic analyzer for citizen requests
function analyzeRequestFallback(text: string, languageHint?: string) {
  const lower = text.toLowerCase();
  
  let category = 'Other';
  let severity: 'High' | 'Medium' | 'Low' = 'Medium';
  let affectedServices: string[] = ['Public Administration'];
  let seasonality = 'Year-round';
  let detectedLanguage = languageHint || 'English';
  let issue = 'Citizen infrastructure request';
  let confidence = 0.88;

  // Language detection heuristics
  if (/[\u0900-\u097F]/.test(text)) {
    // Devanagari script (Hindi or Marathi)
    detectedLanguage = lower.includes('आहे') || lower.includes('नाही') ? 'Marathi' : 'Hindi';
  } else if (/[\u0980-\u09FF]/.test(text)) {
    detectedLanguage = 'Bengali';
  } else if (/[\u0B80-\u0BFF]/.test(text)) {
    detectedLanguage = 'Tamil';
  } else if (/[\u0C00-\u0C7F]/.test(text)) {
    detectedLanguage = 'Telugu';
  }

  // Category detection
  if (lower.includes('road') || lower.includes('pothole') || lower.includes('bridge') || lower.includes('highway') ||
      lower.includes('सड़क') || lower.includes('रास्ता') || lower.includes('पुल') || lower.includes('রাস্তা') ||
      lower.includes('சாலை') || lower.includes('రహదారి') || lower.includes('रस्ता')) {
    category = 'Road Infrastructure';
    issue = 'Inadequate or damaged road accessibility and missing last-mile connectivity';
    affectedServices = ['Emergency Healthcare Access', 'Agricultural Transport', 'School Attendance'];
  } else if (lower.includes('water') || lower.includes('pipeline') || lower.includes('tap') || lower.includes('borewell') ||
             lower.includes('drinking') || lower.includes('पानी') || lower.includes('जल') || lower.includes('জল') ||
             lower.includes('தண்ணீர்') || lower.includes('నీరు') || lower.includes('पाणी')) {
    category = 'Drinking Water & Sanitation';
    issue = 'Chronic potable water scarcity and deteriorating distribution pipelines';
    affectedServices = ['Public Health', 'Maternal & Child Well-being', 'Hygiene Standards'];
  } else if (lower.includes('hospital') || lower.includes('doctor') || lower.includes('clinic') || lower.includes('phc') ||
             lower.includes('health') || lower.includes('ambulance') || lower.includes('अस्पताल') || lower.includes('स्वास्थ्य') ||
             lower.includes('হাসপাতাল') || lower.includes('மருத்துவமனை') || lower.includes('ఆసుపత్రి') || lower.includes('दवाखाना')) {
    category = 'Healthcare Facilities';
    issue = 'Deficiency in primary healthcare infrastructure, specialized staff, or emergency response';
    affectedServices = ['Emergency Triage', 'Maternal Care', 'Chronic Disease Management'];
  } else if (lower.includes('school') || lower.includes('classroom') || lower.includes('teacher') || lower.includes('education') ||
             lower.includes('college') || lower.includes('स्कूल') || lower.includes('शिक्षा') || lower.includes('বিদ্যালয়') ||
             lower.includes('பள்ளி') || lower.includes('పాఠశాల') || lower.includes('शाळा')) {
    category = 'Education & Skill Development';
    issue = 'Substandard educational infrastructure, lacking classroom capacity and digital learning tools';
    affectedServices = ['Youth Literacy', 'Secondary Education Retention', 'Vocational Preparedness'];
  } else if (lower.includes('power') || lower.includes('electricity') || lower.includes('transformer') || lower.includes('load shedding') ||
             lower.includes('बिजली') || lower.includes('বিদ্যুৎ') || lower.includes('மின்சாரம்') || lower.includes('విద్యుత్') || lower.includes('वीज')) {
    category = 'Electricity & Power Grid';
    issue = 'Intermittent rural electrification and vulnerable sub-station capacity';
    affectedServices = ['Irrigation Pumps', 'Commercial Micro-enterprises', 'Household Power Supply'];
  } else if (lower.includes('internet') || lower.includes('tower') || lower.includes('mobile signal') || lower.includes('fiber') ||
             lower.includes('नेटवर्क') || lower.includes('सिग्नल') || lower.includes('इंटरनेट')) {
    category = 'Digital Infrastructure & Telecom';
    issue = 'Severe digital exclusion and cellular blind spots halting public e-governance access';
    affectedServices = ['Digital Public Services (DPI)', 'Tele-medicine', 'Online Schooling'];
  } else if (lower.includes('bus') || lower.includes('transport') || lower.includes('train') || lower.includes('station') ||
             lower.includes('बस') || lower.includes('परिवहन') || lower.includes('போக்குவரத்து') || lower.includes('రవాణా')) {
    category = 'Public Transportation';
    issue = 'Sparse public transit connectivity for daily agrarian and employment commuting';
    affectedServices = ['Labor Mobility', 'Regional Market Access', 'Inter-district Commerce'];
  } else if (lower.includes('waste') || lower.includes('drain') || lower.includes('garbage') || lower.includes('sewage') ||
             lower.includes('कचरा') || lower.includes('नाली') || lower.includes('ময়লা') || lower.includes('குப்பை')) {
    category = 'Waste Management & Drainage';
    issue = 'Unmanaged open sewage and solid waste accumulation causing disease outbreaks';
    affectedServices = ['Sanitation', 'Vector-borne Disease Prevention', 'Groundwater Protection'];
  }

  // Severity heuristics
  if (lower.includes('ambulance') || lower.includes('death') || lower.includes('danger') || lower.includes('emergency') ||
      lower.includes('hazard') || lower.includes('cannot reach') || lower.includes('critical') || lower.includes('accident') ||
      lower.includes('मर') || lower.includes('खतरा') || lower.includes('आपातकाल')) {
    severity = 'High';
  } else if (lower.includes('frequent') || lower.includes('difficult') || lower.includes('broken') || lower.includes('problem')) {
    severity = 'Medium';
  } else {
    severity = 'Low';
  }

  // Seasonality heuristics
  if (lower.includes('monsoon') || lower.includes('rain') || lower.includes('flood') || lower.includes('बारिश') || lower.includes('मानसून')) {
    seasonality = 'Monsoon';
  } else if (lower.includes('summer') || lower.includes('drought') || lower.includes('heat') || lower.includes('गर्मी') || lower.includes('सूखा')) {
    seasonality = 'Summer / Pre-Monsoon';
  } else if (lower.includes('winter') || lower.includes('fog') || lower.includes('ठंड')) {
    seasonality = 'Winter';
  }

  return {
    category,
    issue,
    severity,
    affectedServices,
    seasonality,
    language: detectedLanguage,
    confidence,
    rawText: text,
    summary: `Citizen identifies critical deficiencies in ${category.toLowerCase()}, notably "${issue}". Urgency level assessed as ${severity} due to direct impact on ${affectedServices.slice(0, 2).join(' and ')}.`,
  };
}

// 1. POST /api/analyze-request
app.post('/api/analyze-request', async (req, res) => {
  const { text, languageHint, location } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text prompt is required' });
  }

  if (ai) {
    try {
      const prompt = `You are the CivicPulse AI Governance Engine analyzing a citizen development request for public infrastructure decision-makers.
Analyze the following citizen submission:
"${text}"
User specified location (if any): "${location || 'Unspecified'}"
Language hint: "${languageHint || 'Auto-detect'}"

Return ONLY valid JSON matching this schema:
{
  "category": "Road Infrastructure" | "Drinking Water & Sanitation" | "Healthcare Facilities" | "Education & Skill Development" | "Electricity & Power Grid" | "Digital Infrastructure & Telecom" | "Public Transportation" | "Waste Management & Drainage" | "Other",
  "issue": "concise 5-10 word title of core problem",
  "severity": "High" | "Medium" | "Low",
  "affectedServices": ["Service 1", "Service 2", "Service 3"],
  "seasonality": "Monsoon" | "Summer / Pre-Monsoon" | "Winter" | "Year-round",
  "language": "detected language name (e.g. English, Hindi, Bengali, Marathi, Tamil, Telugu)",
  "confidence": 0.85 to 0.98,
  "summary": "2-sentence objective policy-grade summary of citizen need and public risk"
}`;

      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });
      } catch (err503) {
        // Fallback to flash-lite if 3.8-flash experiences high demand
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });
      }

      const responseText = response.text?.trim() || '';
      const parsed = JSON.parse(responseText);
      return res.json({ ...parsed, aiPowered: true });
    } catch (err) {
      console.warn('Gemini request analysis failed, switching to local GovTech heuristic:', err);
    }
  }

  // Deterministic local fallback
  const fallbackResult = analyzeRequestFallback(text, languageHint);
  return res.json({ ...fallbackResult, aiPowered: false });
});

// 2. POST /api/policy-assistant
app.post('/api/policy-assistant', async (req, res) => {
  const { query, history } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  if (ai) {
    try {
      const systemInstruction = `You are CivicPulse AI Policy Assistant, an evidence-backed decision-support system for state and national infrastructure planners.
Always adhere to these guidelines:
1. Speak as a rigorous government planning analyst.
2. Clearly distinguish between citizen demand, infrastructure gap datasets, and demographic impact.
3. Explicitly state: "AI-assisted Priority Score" and note that scores are decision-support aids, NOT automatic allocations.
4. Structure responses with:
   - Executive Assessment (Direct answer)
   - Evidence & Demand Concentration
   - Relevant Metrics (Beneficiaries, Gaps, Priority)
   - Recommended Strategic Interventions
   - Data Sources & Confidence / Limitations
5. Reference realistic demo areas such as Dhar & Mandla (Madhya Pradesh), Gadchiroli (Maharashtra), Sitapur (Uttar Pradesh), Kishanganj (Bihar), Raichur (Karnataka), Dharmapuri (Tamil Nadu), Purulia (West Bengal), and Mahabubnagar (Telangana).`;

      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `User Query: ${query}\nConversation Context: ${JSON.stringify(history || [])}`,
          config: {
            systemInstruction,
            temperature: 0.3,
          },
        });
      } catch (err503) {
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: `User Query: ${query}\nConversation Context: ${JSON.stringify(history || [])}`,
          config: {
            systemInstruction,
            temperature: 0.3,
          },
        });
      }

      return res.json({
        reply: response.text,
        aiPowered: true,
      });
    } catch (err) {
      console.warn('Gemini Policy Assistant failed, utilizing fallback knowledge base:', err);
    }
  }

  // Comprehensive fallback for policy queries
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
  } else if (qLower.includes('500') || qLower.includes('budget') || qLower.includes('allocate')) {
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

  return res.json({ reply, aiPowered: false });
});

// 3. POST /api/generate-proposal
app.post('/api/generate-proposal', async (req, res) => {
  const { hotspot } = req.body;
  if (!hotspot) {
    return res.status(400).json({ error: 'Hotspot payload is required' });
  }

  if (ai) {
    try {
      const prompt = `You are the CivicPulse Senior Development Economist drafting an official government-grade Development Proposal based on citizen demand data and infrastructure audits.
Hotspot Details:
- District: ${hotspot.district}, State: ${hotspot.state}
- Category: ${hotspot.category}
- Top Issue: ${hotspot.topIssue}
- Citizen Requests: ${hotspot.citizenRequests}
- Infrastructure Gap: ${hotspot.infrastructureGap}%
- Affected Population: ${hotspot.population}
- AI-assisted Priority Score: ${hotspot.priorityScore}/100
- High Severity Requests: ${hotspot.highSeverityRequests}

Generate a comprehensive proposal with these exact sections:
1. PROJECT TITLE
2. PROBLEM STATEMENT
3. CITIZEN DEMAND & EVIDENCE BREAKDOWN
4. INFRASTRUCTURE GAP ANALYSIS
5. AFFECTED POPULATION & DEMOGRAPHICS
6. RECOMMENDED INTERVENTION & SCOPE
7. ESTIMATED CAPITAL INVESTMENT (₹ Cr)
8. EXPECTED SOCIO-ECONOMIC OUTCOMES
9. IMPLEMENTATION CONSIDERATIONS & TIMELINE
10. POTENTIAL RISKS & MITIGATION STRATEGY
11. SUCCESS METRICS & EVALUATION KPIS
12. DATA SOURCES & AUDIT TRAIL
13. DECISION SUPPORT & HUMAN OVERSIGHT NOTE

Format with clear headers and bullet points. Clearly label all figures as synthetic planning estimates.`;

      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            temperature: 0.3,
          },
        });
      } catch (err503) {
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: {
            temperature: 0.3,
          },
        });
      }

      return res.json({
        proposalText: response.text,
        aiPowered: true,
      });
    } catch (err) {
      console.warn('Gemini proposal generation failed, using structured template:', err);
    }
  }

  // Deterministic high-caliber proposal fallback
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

  return res.json({ proposalText, aiPowered: false });
});

// System status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'operational',
    aiEngine: ai ? 'gemini-3.8-flash' : 'local-deterministic-engine',
    apiKeyConfigured: Boolean(process.env.GEMINI_API_KEY),
    datasetVersion: 'BRICS-Innovation-GovTech-Demo-v1.0',
    mode: 'decision-support',
  });
});

// In development, mount Vite middleware; in production, serve built static assets
async function startServer() {
  const isProdEnv = process.env.NODE_ENV === 'production';
  const distPath = path.resolve(__dirname, 'dist');
  const hasDist = fs.existsSync(path.resolve(distPath, 'index.html'));

  if (isProdEnv || (hasDist && process.env.NODE_ENV !== 'development')) {
    console.log('Serving production build from:', distPath);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'Endpoint not found' });
      }
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    console.log('Mounting Vite middleware for development');
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CivicPulse AI GovTech Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
