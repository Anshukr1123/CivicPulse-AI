import { CitizenRequest, DemandHotspot, PriorityProject, ImpactProject, DataSourceItem, PriorityWeights } from './types';

export const DEFAULT_PRIORITY_WEIGHTS: PriorityWeights = {
  citizenDemand: 0.20,
  infrastructureGap: 0.20,
  populationImpact: 0.15,
  severity: 0.15,
  vulnerability: 0.10,
  urgency: 0.10,
  expectedImpact: 0.10,
};

// 25+ Monitored Districts across 8 Indian States
export const DISTRICT_COORDINATES: Record<string, { lat: number; lng: number; state: string; population: string; popNum: number }> = {
  'Dhar': { lat: 22.5973, lng: 75.3025, state: 'Madhya Pradesh', population: '2.18M', popNum: 2185000 },
  'Mandla': { lat: 22.5986, lng: 80.3712, state: 'Madhya Pradesh', population: '1.05M', popNum: 1054000 },
  'Khargone': { lat: 21.8236, lng: 75.6174, state: 'Madhya Pradesh', population: '1.87M', popNum: 1873000 },
  'Barwani': { lat: 22.0374, lng: 74.9038, state: 'Madhya Pradesh', population: '1.38M', popNum: 1385000 },
  'Gadchiroli': { lat: 20.1809, lng: 80.0028, state: 'Maharashtra', population: '1.07M', popNum: 1072000 },
  'Nandurbar': { lat: 21.3739, lng: 74.2415, state: 'Maharashtra', population: '1.64M', popNum: 1648000 },
  'Yavatmal': { lat: 20.3888, lng: 78.1204, state: 'Maharashtra', population: '2.77M', popNum: 2772000 },
  'Osmanabad': { lat: 18.1856, lng: 76.0423, state: 'Maharashtra', population: '1.65M', popNum: 1657000 },
  'Sitapur': { lat: 27.5684, lng: 80.6829, state: 'Uttar Pradesh', population: '4.48M', popNum: 4483000 },
  'Bahraich': { lat: 27.5706, lng: 81.5977, state: 'Uttar Pradesh', population: '3.48M', popNum: 3487000 },
  'Sonbhadra': { lat: 24.6850, lng: 83.0684, state: 'Uttar Pradesh', population: '1.86M', popNum: 1862000 },
  'Balrampur': { lat: 27.4326, lng: 82.1795, state: 'Uttar Pradesh', population: '2.14M', popNum: 2148000 },
  'Kishanganj': { lat: 26.0963, lng: 87.9405, state: 'Bihar', population: '1.69M', popNum: 1690000 },
  'Purnia': { lat: 25.7771, lng: 87.4753, state: 'Bihar', population: '3.26M', popNum: 3264000 },
  'Jamui': { lat: 24.9202, lng: 86.2238, state: 'Bihar', population: '1.76M', popNum: 1760000 },
  'Araria': { lat: 26.1509, lng: 87.5147, state: 'Bihar', population: '2.81M', popNum: 2811000 },
  'Raichur': { lat: 16.2076, lng: 77.3463, state: 'Karnataka', population: '1.92M', popNum: 1928000 },
  'Yadgir': { lat: 16.7644, lng: 77.1378, state: 'Karnataka', population: '1.17M', popNum: 1174000 },
  'Koppal': { lat: 15.3467, lng: 76.1554, state: 'Karnataka', population: '1.38M', popNum: 1389000 },
  'Dharmapuri': { lat: 12.1211, lng: 78.1582, state: 'Tamil Nadu', population: '1.50M', popNum: 1506000 },
  'Theni': { lat: 10.0104, lng: 77.4768, state: 'Tamil Nadu', population: '1.24M', popNum: 1245000 },
  'Villupuram': { lat: 11.9401, lng: 79.4861, state: 'Tamil Nadu', population: '2.09M', popNum: 2093000 },
  'Purulia': { lat: 23.3321, lng: 86.3652, state: 'West Bengal', population: '2.93M', popNum: 2930000 },
  'Bankura': { lat: 23.2321, lng: 87.0715, state: 'West Bengal', population: '3.59M', popNum: 3596000 },
  'Birbhum': { lat: 23.8402, lng: 87.6186, state: 'West Bengal', population: '3.50M', popNum: 3502000 },
  'Mahabubnagar': { lat: 16.7488, lng: 78.0035, state: 'Telangana', population: '1.48M', popNum: 1486000 },
  'Kumuram Bheem Asifabad': { lat: 19.3637, lng: 79.2882, state: 'Telangana', population: '0.51M', popNum: 515000 },
  'Jayashankar Bhupalpally': { lat: 18.4316, lng: 79.8656, state: 'Telangana', population: '0.41M', popNum: 416000 },
};

// Seed dataset of 115 realistic simulated citizen requests
export const SEED_CITIZEN_REQUESTS: CitizenRequest[] = [
  {
    id: "REQ-2026-0001",
    date: "2026-09-28",
    language: "Hindi",
    request: "हमारे गांव की मुख्य सड़क बारिश में पूरी तरह बह जाती है। एंबुलेंस अस्पताल नहीं पहुंच पाती और गर्भवती महिलाओं को चारपाई पर ले जाना पड़ता है।",
    normalizedIssue: "Unpaved link road washed away during monsoon, blocking emergency healthcare transport",
    category: "Road Infrastructure",
    severity: "High",
    district: "Dhar",
    state: "Madhya Pradesh",
    latitude: 22.5973,
    longitude: 75.3025,
    populationAffected: 42000,
    status: "Hotspot Clustered",
    confidence: 0.94,
    seasonality: "Monsoon",
    affectedServices: ["Healthcare Access", "School Commute", "Emergency Services"],
    submissionType: "voice"
  },
  {
    id: "REQ-2026-0002",
    date: "2026-09-27",
    language: "English",
    request: "Our village road becomes unusable during monsoon and ambulances cannot reach us.",
    normalizedIssue: "Poor rural road accessibility and seasonal isolation preventing ambulance reach",
    category: "Road Infrastructure",
    severity: "High",
    district: "Dhar",
    state: "Madhya Pradesh",
    latitude: 22.6105,
    longitude: 75.3210,
    populationAffected: 38000,
    status: "Project Proposed",
    confidence: 0.96,
    seasonality: "Monsoon",
    affectedServices: ["Emergency Healthcare", "Transportation"],
    submissionType: "text"
  },
  {
    id: "REQ-2026-0003",
    date: "2026-09-26",
    language: "Marathi",
    request: "आमच्या पाड्यात पिण्याच्या पाण्याची पाईपलाईन तीन महिन्यांपासून फुटलेली आहे. महिलांना डोंगरावरून दूषित विहिरीचे पाणी आणावे लागते.",
    normalizedIssue: "Broken potable water distribution pipe, forcing reliance on contaminated open wells",
    category: "Drinking Water & Sanitation",
    severity: "High",
    district: "Gadchiroli",
    state: "Maharashtra",
    latitude: 20.1809,
    longitude: 80.0028,
    populationAffected: 18500,
    status: "Hotspot Clustered",
    confidence: 0.91,
    seasonality: "Summer / Pre-Monsoon",
    affectedServices: ["Potable Water", "Public Hygiene", "Women Health"],
    submissionType: "voice"
  },
  {
    id: "REQ-2026-0004",
    date: "2026-09-26",
    language: "Bengali",
    request: "আমাদের পুরুলিয়ার প্রাথমিক স্বাস্থ্যকেন্দ্রে গত ছয় মাস ধরে কোনো স্থায়ী ডাক্তার নেই। সাপে কাটা রোগীদের বাঁচানো সম্ভব হয় না।",
    normalizedIssue: "Absence of medical officer and anti-venom treatment at Primary Health Centre",
    category: "Healthcare Facilities",
    severity: "High",
    district: "Purulia",
    state: "West Bengal",
    latitude: 23.3321,
    longitude: 86.3652,
    populationAffected: 62000,
    status: "Project Proposed",
    confidence: 0.95,
    seasonality: "Year-round",
    affectedServices: ["Primary Healthcare", "Emergency Trauma", "Maternal Care"],
    submissionType: "voice"
  },
  {
    id: "REQ-2026-0005",
    date: "2026-09-25",
    language: "Tamil",
    request: "எங்கள் கிராமத்தில் உயர்நிலைப் பள்ளிக்கு போதுமான வகுப்பறைகள் இல்லை. மழைக்காலத்தில் கூரை ஒழுகி மாணவர்கள் நனைகிறார்கள்.",
    normalizedIssue: "Dilapidated school roof and severe shortage of classrooms in government school",
    category: "Education & Skill Development",
    severity: "Medium",
    district: "Dharmapuri",
    state: "Tamil Nadu",
    latitude: 12.1211,
    longitude: 78.1582,
    populationAffected: 8400,
    status: "Hotspot Clustered",
    confidence: 0.89,
    seasonality: "Monsoon",
    affectedServices: ["Secondary Education", "Child Welfare"],
    submissionType: "text"
  },
  {
    id: "REQ-2026-0006",
    date: "2026-09-25",
    language: "Telugu",
    request: "వ్యవసాయ బోరుబావులకు కరెంట్ రోజుకు 3 గంటలు మాత్రమే వస్తుంది, అది కూడా లో-వోల్టేజీ వల్ల మోటార్లు కాలిపోతున్నాయి.",
    normalizedIssue: "Erratic agricultural power grid and acute voltage fluctuations damaging pump sets",
    category: "Electricity & Power Grid",
    severity: "Medium",
    district: "Mahabubnagar",
    state: "Telangana",
    latitude: 16.7488,
    longitude: 78.0035,
    populationAffected: 29000,
    status: "Under Review",
    confidence: 0.92,
    seasonality: "Summer / Pre-Monsoon",
    affectedServices: ["Irrigation", "Farm Income"],
    submissionType: "text"
  },
  {
    id: "REQ-2026-0007",
    date: "2026-09-24",
    language: "Hindi",
    request: "सीतापुर ब्लॉक में मोबाइल नेटवर्क का कोई टावर नहीं है। बच्चे ऑनलाइन पढ़ाई नहीं कर पाते और राशन की दुकान पर फिंगरप्रिंट ऑथेंटिकेशन फेल हो जाता है।",
    normalizedIssue: "Complete lack of cellular tower halting Aadhaar ration distribution and online schooling",
    category: "Digital Infrastructure & Telecom",
    severity: "High",
    district: "Sitapur",
    state: "Uttar Pradesh",
    latitude: 27.5684,
    longitude: 80.6829,
    populationAffected: 54000,
    status: "Hotspot Clustered",
    confidence: 0.93,
    seasonality: "Year-round",
    affectedServices: ["PDS Ration Delivery", "Telecommunications", "Financial Inclusion"],
    submissionType: "text"
  },
  {
    id: "REQ-2026-0008",
    date: "2026-09-24",
    language: "Kannada",
    request: "ರಾಯಚೂರಿನ ಹಳ್ಳಿಗಳಿಗೆ ಸರ್ಕಾರಿ ಬಸ್ ಸೇವೆ ವಾರಕ್ಕೆ ಎರಡು ದಿನ ಮಾತ್ರ ಬರುತ್ತದೆ. ಕಾಲೇಜು ವಿದ್ಯಾರ್ಥಿಗಳು 7 ಕಿ.ಮೀ ನಡೆದುಕೊಂಡು ಹೋಗಬೇಕಾಗಿದೆ.",
    normalizedIssue: "Extremely sparse public transit frequency stranding daily student commuters",
    category: "Public Transportation",
    severity: "Medium",
    district: "Raichur",
    state: "Karnataka",
    latitude: 16.2076,
    longitude: 77.3463,
    populationAffected: 31000,
    status: "Under Review",
    confidence: 0.88,
    seasonality: "Year-round",
    affectedServices: ["Public Transit", "Higher Education Mobility"],
    submissionType: "text"
  },
  {
    id: "REQ-2026-0009",
    date: "2026-09-23",
    language: "Hindi",
    request: "किशनगंज के महानंदा नदी किनारे बाढ़ के पानी से तटबंध टूट गया है, हर साल सैकड़ों घरों में पानी घुस जाता है और ड्रेनेज बिल्कुल नहीं है।",
    normalizedIssue: "River embankment breach and absent storm water drainage causing recurrent inundation",
    category: "Waste Management & Drainage",
    severity: "High",
    district: "Kishanganj",
    state: "Bihar",
    latitude: 26.0963,
    longitude: 87.9405,
    populationAffected: 78000,
    status: "Project Proposed",
    confidence: 0.97,
    seasonality: "Monsoon",
    affectedServices: ["Flood Defense", "Sanitation", "Habitation Safety"],
    submissionType: "voice"
  },
  {
    id: "REQ-2026-0010",
    date: "2026-09-23",
    language: "Hindi",
    request: "मांडला जिले के बिछिया ब्लॉक में प्रसव केंद्र की छत से पानी टपकता है और रात में बिजली न होने से टॉर्च की रोशनी में डिलीवरी करानी पड़ती है।",
    normalizedIssue: "Maternity clinic lack of backup electricity and leaky ceiling endangering infant delivery",
    category: "Healthcare Facilities",
    severity: "High",
    district: "Mandla",
    state: "Madhya Pradesh",
    latitude: 22.5986,
    longitude: 80.3712,
    populationAffected: 46000,
    status: "Project Proposed",
    confidence: 0.96,
    seasonality: "Monsoon",
    affectedServices: ["Maternal Health", "Emergency Delivery", "Power Backup"],
    submissionType: "voice"
  }
];

// Dynamically generate up to 115 realistic records to ensure rich demo data
const SAMPLE_ISSUES: Array<{
  category: CitizenRequest['category'];
  text: string;
  issue: string;
  severity: CitizenRequest['severity'];
  lang: string;
  season: string;
  services: string[];
}> = [
  {
    category: "Road Infrastructure",
    text: "पुलिया टूट जाने से 12 गांव का संपर्क मुख्य बाजार से टूट गया है। किसान अपनी सब्जियां मंडी नहीं ले जा पा रहे हैं।",
    issue: "Collapsed culvert bridge disconnecting agrarian habitations from regional marketplace",
    severity: "High",
    lang: "Hindi",
    season: "Monsoon",
    services: ["Agricultural Logistics", "Market Access"]
  },
  {
    category: "Drinking Water & Sanitation",
    text: "हमारे मोहल्ले के जल जीवन मिशन के नलों में पिछले 2 महीने से गंदा मटमैला पानी आ रहा है जिससे बच्चे बीमार हो रहे हैं।",
    issue: "Contaminated tap water supply under Jal Jeevan Mission causing pediatric infections",
    severity: "High",
    lang: "Hindi",
    season: "Year-round",
    services: ["Potable Water", "Preventive Health"]
  },
  {
    category: "Electricity & Power Grid",
    text: "गाँव का मुख्य ट्रांसफार्मर 15 दिन पहले जल गया था, कई बार शिकायत के बाद भी नया नहीं लगाया गया।",
    issue: "Burnt distribution transformer left unreplaced for fortnight plunging hamlet into blackout",
    severity: "Medium",
    lang: "Hindi",
    season: "Year-round",
    services: ["Domestic Power", "Irrigation"]
  },
  {
    category: "Healthcare Facilities",
    text: "ब्लॉक अस्पताल में अल्ट्रासाउंड और एक्स-रे मशीन दोनों खराब हैं, 50 किमी दूर जिला अस्पताल जाना पड़ता है।",
    issue: "Out of order diagnostic radiology equipment requiring 50km inter-district travel",
    severity: "High",
    lang: "Hindi",
    season: "Year-round",
    services: ["Diagnostics", "Trauma Care"]
  },
  {
    category: "Education & Skill Development",
    text: "আমাদের গ্রামের স্কুলে কোনো পানীয় জল এবং মেয়েদের আলাদা শৌচাগার নেই, ফলে ছাত্রীদের উপস্থিতি কমে যাচ্ছে।",
    issue: "Absence of functional separate sanitation for girls causing high dropout rates",
    severity: "High",
    lang: "Bengali",
    season: "Year-round",
    services: ["Girl Child Sanitation", "Secondary Retention"]
  },
  {
    category: "Digital Infrastructure & Telecom",
    text: "ಗ್ರಾಮ ಪಂಚಾಯತ್ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವಿಲ್ಲದೆ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಲು 3 ದಿನ ಬೇಕಾಗುತ್ತದೆ.",
    issue: "Zero broadband connectivity stalling issuance of citizen caste and entitlement certificates",
    severity: "Medium",
    lang: "Kannada",
    season: "Year-round",
    services: ["E-Governance", "Certificates"]
  },
  {
    category: "Public Transportation",
    text: "औद्योगिक क्षेत्र तक जाने के लिए कोई नियमित बस सेवा नहीं है, कामगारों को प्राइवेट ऑटो में 3 गुना किराया देना पड़ता है।",
    issue: "Lack of affordable public transit to industrial corridor causing worker financial distress",
    severity: "Medium",
    lang: "Hindi",
    season: "Year-round",
    services: ["Worker Commute", "Affordable Mobility"]
  },
  {
    category: "Waste Management & Drainage",
    text: "खुली नालियों में कचरा फंसने से बारिश में पूरा गंदा पानी घरों के अंदर घुस जाता है। डेंगू और मलेरिया फैल रहा है।",
    issue: "Clogged stormwater drains causing residential sewage backflow and dengue surge",
    severity: "High",
    lang: "Hindi",
    season: "Monsoon",
    services: ["Public Sanitation", "Vector Control"]
  },
  {
    category: "Road Infrastructure",
    text: "National highway bypass junction lacks traffic signal and underpass, causing fatal accidents every week.",
    issue: "Hazardous highway intersection lacking pedestrian subway and high-visibility traffic signaling",
    severity: "High",
    lang: "English",
    season: "Year-round",
    services: ["Pedestrian Safety", "Highway Management"]
  },
  {
    category: "Drinking Water & Sanitation",
    text: "भूजल स्तर 400 फीट नीचे चला गया है, सभी हैंडपंप सूख चुके हैं। टैंकर केवल सप्ताह में एक बार आता है।",
    issue: "Plummeting groundwater water table drying up borewells and handpumps in summer",
    severity: "High",
    lang: "Hindi",
    season: "Summer / Pre-Monsoon",
    services: ["Water Tanker Logistics", "Borewell Recharge"]
  }
];

const DISTRICT_NAMES = Object.keys(DISTRICT_COORDINATES);

for (let i = 11; i <= 115; i++) {
  const dist = DISTRICT_NAMES[i % DISTRICT_NAMES.length];
  const coord = DISTRICT_COORDINATES[dist];
  const sample = SAMPLE_ISSUES[i % SAMPLE_ISSUES.length];
  
  // Slight jitter to lat/lng so markers don't overlap completely
  const latJitter = (Math.sin(i * 12.3) * 0.08);
  const lngJitter = (Math.cos(i * 9.7) * 0.08);

  const day = (i % 28) + 1;
  const month = i % 2 === 0 ? '08' : '09';
  const dateStr = `2026-${month}-${day < 10 ? '0' + day : day}`;

  const statuses: CitizenRequest['status'][] = ['Under Review', 'Hotspot Clustered', 'Project Proposed', 'Approved'];

  SEED_CITIZEN_REQUESTS.push({
    id: `REQ-2026-${i < 100 ? '0' + i : i}`,
    date: dateStr,
    language: sample.lang,
    request: sample.text,
    normalizedIssue: sample.issue,
    category: sample.category,
    severity: sample.severity,
    district: dist,
    state: coord.state,
    latitude: Number((coord.lat + latJitter).toFixed(4)),
    longitude: Number((coord.lng + lngJitter).toFixed(4)),
    populationAffected: Math.floor(15000 + (Math.sin(i) + 1) * 35000),
    status: statuses[i % statuses.length],
    confidence: Number((0.84 + (i % 15) * 0.01).toFixed(2)),
    seasonality: sample.season,
    affectedServices: sample.services,
    submissionType: i % 3 === 0 ? 'voice' : 'text'
  });
}

// 20+ Realistic Demand Hotspots with Explainable Priority Scores
export const INITIAL_DEMAND_HOTSPOTS: DemandHotspot[] = [
  {
    id: "HOTSPOT-DHAR-01",
    district: "Dhar",
    state: "Madhya Pradesh",
    category: "Road Infrastructure",
    topIssue: "Monsoon Cutoff & Rural Road Inaccessibility",
    citizenRequests: 8421,
    highSeverityRequests: 2814,
    infrastructureGap: 67,
    population: "1.2M",
    populationNumeric: 1200000,
    latitude: 22.5973,
    longitude: 75.3025,
    priorityScore: 91,
    breakdown: {
      citizenDemand: 18,
      infrastructureGap: 17,
      populationImpact: 13,
      severity: 14,
      vulnerability: 9,
      urgency: 10,
      expectedImpact: 10
    },
    rationale: [
      "Extremely high citizen demand concentration (8,421 verified requests)",
      "67% deficit in all-weather PMGSY connectivity across tribal blocks",
      "Compromises emergency ambulance transit to Dhar District Hospital during 4-month monsoon",
      "High economic vulnerability with heavy reliance on agricultural produce hauling"
    ],
    estimatedCostCr: 180,
    vulnerabilityIndex: 8.8,
    urgencyIndex: 9.4
  },
  {
    id: "HOTSPOT-MANDLA-02",
    district: "Mandla",
    state: "Madhya Pradesh",
    category: "Healthcare Facilities",
    topIssue: "Maternal & Primary Healthcare Delivery Deficit",
    citizenRequests: 6820,
    highSeverityRequests: 2450,
    infrastructureGap: 62,
    population: "0.85M",
    populationNumeric: 850000,
    latitude: 22.5986,
    longitude: 80.3712,
    priorityScore: 88,
    breakdown: {
      citizenDemand: 17,
      infrastructureGap: 16,
      populationImpact: 12,
      severity: 14,
      vulnerability: 10,
      urgency: 10,
      expectedImpact: 9
    },
    rationale: [
      "Critically underserved tribal demographic in forested Narmada river valley",
      "Sub-Centres lack uninterrupted solar electricity and 24x7 delivery tables",
      "Recurring infant transport fatalities during seasonal flooding"
    ],
    estimatedCostCr: 125,
    vulnerabilityIndex: 9.2,
    urgencyIndex: 9.1
  },
  {
    id: "HOTSPOT-GADCHIROLI-03",
    district: "Gadchiroli",
    state: "Maharashtra",
    category: "Road Infrastructure",
    topIssue: "Tribal Corridor Bridge & All-Weather Crossings",
    citizenRequests: 5140,
    highSeverityRequests: 1980,
    infrastructureGap: 71,
    population: "0.72M",
    populationNumeric: 720000,
    latitude: 20.1809,
    longitude: 80.0028,
    priorityScore: 89,
    breakdown: {
      citizenDemand: 16,
      infrastructureGap: 18,
      populationImpact: 11,
      severity: 15,
      vulnerability: 10,
      urgency: 10,
      expectedImpact: 9
    },
    rationale: [
      "Isolated forest belt cut off by Wainganga and Godavari river swelling",
      "Lack of high-level culverts stalls both medical outreach and PDS distribution",
      "Designated Special Focus Aspirational District with high poverty density"
    ],
    estimatedCostCr: 210,
    vulnerabilityIndex: 9.5,
    urgencyIndex: 9.3
  },
  {
    id: "HOTSPOT-PURULIA-04",
    district: "Purulia",
    state: "West Bengal",
    category: "Drinking Water & Sanitation",
    topIssue: "Hard-Rock Groundwater Depletion & Fluoride Risk",
    citizenRequests: 7350,
    highSeverityRequests: 2110,
    infrastructureGap: 59,
    population: "1.45M",
    populationNumeric: 1450000,
    latitude: 23.3321,
    longitude: 86.3652,
    priorityScore: 86,
    breakdown: {
      citizenDemand: 17,
      infrastructureGap: 15,
      populationImpact: 14,
      severity: 13,
      vulnerability: 9,
      urgency: 9,
      expectedImpact: 9
    },
    rationale: [
      "Arid plateau topography causing seasonal collapse of handpump water tables",
      "High fluoride contamination detected in 34 Gram Panchayats",
      "Demands community-level surface water piped treatment grids"
    ],
    estimatedCostCr: 160,
    vulnerabilityIndex: 8.5,
    urgencyIndex: 8.7
  },
  {
    id: "HOTSPOT-KISHANGANJ-05",
    district: "Kishanganj",
    state: "Bihar",
    category: "Waste Management & Drainage",
    topIssue: "Mahananda River Erosion & Flood Drainage",
    citizenRequests: 6190,
    highSeverityRequests: 2320,
    infrastructureGap: 68,
    population: "1.1M",
    populationNumeric: 1100000,
    latitude: 26.0963,
    longitude: 87.9405,
    priorityScore: 87,
    breakdown: {
      citizenDemand: 16,
      infrastructureGap: 17,
      populationImpact: 12,
      severity: 14,
      vulnerability: 10,
      urgency: 9,
      expectedImpact: 9
    },
    rationale: [
      "Annual riverbank erosion displacing rural habitations and degrading school buildings",
      "Inadequate drainage leads to stagnant water logging for up to 5 months",
      "Spikes in water-borne gastroenteritis and malaria in post-monsoon months"
    ],
    estimatedCostCr: 145,
    vulnerabilityIndex: 9.1,
    urgencyIndex: 9.0
  },
  {
    id: "HOTSPOT-SITAPUR-06",
    district: "Sitapur",
    state: "Uttar Pradesh",
    category: "Digital Infrastructure & Telecom",
    topIssue: "PDS Connectivity & E-Gov Network Deadzones",
    citizenRequests: 6890,
    highSeverityRequests: 1850,
    infrastructureGap: 54,
    population: "2.1M",
    populationNumeric: 2100000,
    latitude: 27.5684,
    longitude: 80.6829,
    priorityScore: 82,
    breakdown: {
      citizenDemand: 16,
      infrastructureGap: 14,
      populationImpact: 15,
      severity: 11,
      vulnerability: 8,
      urgency: 9,
      expectedImpact: 9
    },
    rationale: [
      "Large population density suffering Aadhaar POS transaction timeouts at Fair Price Shops",
      "Lack of fiber backhaul halts telemedicine kiosks in community clinics",
      "Rural students travel 8 km to access broadband for examination forms"
    ],
    estimatedCostCr: 75,
    vulnerabilityIndex: 7.9,
    urgencyIndex: 8.2
  },
  {
    id: "HOTSPOT-DHARMAPURI-07",
    district: "Dharmapuri",
    state: "Tamil Nadu",
    category: "Education & Skill Development",
    topIssue: "Vocational & Polytechnic High-School Facilities",
    citizenRequests: 4210,
    highSeverityRequests: 1120,
    infrastructureGap: 48,
    population: "0.95M",
    populationNumeric: 950000,
    latitude: 12.1211,
    longitude: 78.1582,
    priorityScore: 76,
    breakdown: {
      citizenDemand: 14,
      infrastructureGap: 12,
      populationImpact: 11,
      severity: 11,
      vulnerability: 8,
      urgency: 10,
      expectedImpact: 10
    },
    rationale: [
      "High youth migration due to absence of technical training workshops",
      "Government secondary schools face 40% science lab space deficiency",
      "Strong demand for agro-processing skill labs aligned with sericulture and mango farming"
    ],
    estimatedCostCr: 65,
    vulnerabilityIndex: 7.2,
    urgencyIndex: 7.8
  },
  {
    id: "HOTSPOT-MAHABUBNAGAR-08",
    district: "Mahabubnagar",
    state: "Telangana",
    category: "Electricity & Power Grid",
    topIssue: "Agri-Feeder Solarization & Sub-station Voltage Sag",
    citizenRequests: 4890,
    highSeverityRequests: 1430,
    infrastructureGap: 51,
    population: "1.05M",
    populationNumeric: 1050000,
    latitude: 16.7488,
    longitude: 78.0035,
    priorityScore: 78,
    breakdown: {
      citizenDemand: 15,
      infrastructureGap: 13,
      populationImpact: 12,
      severity: 12,
      vulnerability: 8,
      urgency: 9,
      expectedImpact: 9
    },
    rationale: [
      "Frequent pump burnout during rabi sowing season due to single-phase low voltage",
      "Opportunity for dedicated solar agriculture feeder separation under PM-KUSUM",
      "Direct multiplier on crop yields across 85,000 hectares of cotton and pulses"
    ],
    estimatedCostCr: 95,
    vulnerabilityIndex: 7.6,
    urgencyIndex: 8.1
  },
  {
    id: "HOTSPOT-RAICHUR-09",
    district: "Raichur",
    state: "Karnataka",
    category: "Public Transportation",
    topIssue: "Inter-Taluk Commuter Transit & Safe School Bus Routes",
    citizenRequests: 4320,
    highSeverityRequests: 1210,
    infrastructureGap: 53,
    population: "1.15M",
    populationNumeric: 1150000,
    latitude: 16.2076,
    longitude: 77.3463,
    priorityScore: 77,
    breakdown: {
      citizenDemand: 14,
      infrastructureGap: 14,
      populationImpact: 12,
      severity: 11,
      vulnerability: 8,
      urgency: 9,
      expectedImpact: 9
    },
    rationale: [
      "Students in 48 villages lack timely bus links to pre-university colleges",
      "Overcrowding on rural routes leads to hazardous rooftop travel",
      "Feeder transit will connect agrarian labor to Raichur thermal and industrial zones"
    ],
    estimatedCostCr: 55,
    vulnerabilityIndex: 7.4,
    urgencyIndex: 7.9
  },
  {
    id: "HOTSPOT-BAHRAICH-10",
    district: "Bahraich",
    state: "Uttar Pradesh",
    category: "Healthcare Facilities",
    topIssue: "Encephalitis & Neonatal Intensive Care Centers",
    citizenRequests: 5820,
    highSeverityRequests: 2190,
    infrastructureGap: 64,
    population: "1.65M",
    populationNumeric: 1650000,
    latitude: 27.5706,
    longitude: 81.5977,
    priorityScore: 85,
    breakdown: {
      citizenDemand: 16,
      infrastructureGap: 16,
      populationImpact: 14,
      severity: 14,
      vulnerability: 9,
      urgency: 8,
      expectedImpact: 8
    },
    rationale: [
      "Tarai belt high vulnerability to acute encephalitis and seasonal viral outbreaks",
      "Community health centers lack oxygen manifolds and pediatric ventilators",
      "High neonatal mortality requiring decentralized stabilization units"
    ],
    estimatedCostCr: 115,
    vulnerabilityIndex: 8.9,
    urgencyIndex: 8.8
  },
  {
    id: "HOTSPOT-NANDURBAR-11",
    district: "Nandurbar",
    state: "Maharashtra",
    category: "Road Infrastructure",
    topIssue: "Satpura Mountain Ghat Road All-Weather Surfacing",
    citizenRequests: 4980,
    highSeverityRequests: 1720,
    infrastructureGap: 69,
    population: "0.88M",
    populationNumeric: 880000,
    latitude: 21.3739,
    longitude: 74.2415,
    priorityScore: 84,
    breakdown: {
      citizenDemand: 15,
      infrastructureGap: 17,
      populationImpact: 11,
      severity: 14,
      vulnerability: 10,
      urgency: 9,
      expectedImpact: 8
    },
    rationale: [
      "Hilly tribal habitations cut off by landslides along Narmada backwaters",
      "Emergency boat ambulances hindered during night-time navigation",
      "Requires mountain-grade slope stabilization and reinforced box culverts"
    ],
    estimatedCostCr: 165,
    vulnerabilityIndex: 9.3,
    urgencyIndex: 8.9
  },
  {
    id: "HOTSPOT-BANKURA-12",
    district: "Bankura",
    state: "West Bengal",
    category: "Drinking Water & Sanitation",
    topIssue: "Sub-surface Pipe Grid & Arsenic/Iron Purification",
    citizenRequests: 5210,
    highSeverityRequests: 1490,
    infrastructureGap: 56,
    population: "1.3M",
    populationNumeric: 1300000,
    latitude: 23.2321,
    longitude: 87.0715,
    priorityScore: 80,
    breakdown: {
      citizenDemand: 15,
      infrastructureGap: 14,
      populationImpact: 13,
      severity: 12,
      vulnerability: 8,
      urgency: 9,
      expectedImpact: 9
    },
    rationale: [
      "Excessive iron content in tube wells causing gastrointestinal ailments",
      "Surface water uptake from Damodar river requires treatment plants",
      "Over 120,000 households still reliant on shared manual handpumps"
    ],
    estimatedCostCr: 135,
    vulnerabilityIndex: 7.9,
    urgencyIndex: 8.3
  }
];

// Priority Project Recommendations
export const INITIAL_PRIORITY_PROJECTS: PriorityProject[] = [
  {
    id: "PROJ-DHAR-01",
    title: "Mission Dhar: All-Weather Tribal Connectivity & Bridge Modernization",
    hotspotId: "HOTSPOT-DHAR-01",
    district: "Dhar",
    state: "Madhya Pradesh",
    category: "Road Infrastructure",
    priorityScore: 91,
    citizenRequests: 8421,
    populationAffected: "1.2M",
    infrastructureGap: 67,
    expectedImpact: "Transformative",
    estimatedInvestmentCr: 180,
    targetTimelineMonths: 18,
    status: "Prioritized",
    keyInterventions: [
      "Construction of 64.5 km high-durability bitumen road across 14 habitations",
      "6 multi-span RCC bridges across monsoon-prone seasonal tributaries",
      "Solar street lighting and reflective safety barriers at 18 village nodes"
    ]
  },
  {
    id: "PROJ-GADCHIROLI-02",
    title: "Gadchiroli Lifeline: Tribal Crossings & Critical Culverts Package",
    hotspotId: "HOTSPOT-GADCHIROLI-03",
    district: "Gadchiroli",
    state: "Maharashtra",
    category: "Road Infrastructure",
    priorityScore: 89,
    citizenRequests: 5140,
    populationAffected: "0.72M",
    infrastructureGap: 71,
    expectedImpact: "Transformative",
    estimatedInvestmentCr: 210,
    targetTimelineMonths: 24,
    status: "In Consultation",
    keyInterventions: [
      "High-level bridges over Godavari floodplain bypasses",
      "All-weather concrete paving for 82 km of forest corridor links",
      "Pre-fabricated emergency Bailey bridges for flood response"
    ]
  },
  {
    id: "PROJ-MANDLA-03",
    title: "Mandla Ayush Suraksha: Comprehensive CHC Modernization & Tele-health",
    hotspotId: "HOTSPOT-MANDLA-02",
    district: "Mandla",
    state: "Madhya Pradesh",
    category: "Healthcare Facilities",
    priorityScore: 88,
    citizenRequests: 6820,
    populationAffected: "0.85M",
    infrastructureGap: 62,
    expectedImpact: "Very High",
    estimatedInvestmentCr: 125,
    targetTimelineMonths: 14,
    status: "Cabinet Sanctioned",
    keyInterventions: [
      "Upgrading 12 CHCs with 24x7 maternal delivery suites and infant incubators",
      "Installation of 50kW solar microgrids with battery banks at all 28 PHCs",
      "Deployment of 8 terrain-enabled 4x4 mobile health clinics"
    ]
  },
  {
    id: "PROJ-KISHANGANJ-04",
    title: "Kishanganj Mahananda Resilience & Flood Drainage Works",
    hotspotId: "HOTSPOT-KISHANGANJ-05",
    district: "Kishanganj",
    state: "Bihar",
    category: "Waste Management & Drainage",
    priorityScore: 87,
    citizenRequests: 6190,
    populationAffected: "1.1M",
    infrastructureGap: 68,
    expectedImpact: "Very High",
    estimatedInvestmentCr: 145,
    targetTimelineMonths: 20,
    status: "Recommended",
    keyInterventions: [
      "Reinforced geobag embankment along 22 km of vulnerable river stretches",
      "Stormwater sluice gates and primary drainage channel de-silting",
      "Elevated school flood-shelters with potable rainwater harvesting"
    ]
  },
  {
    id: "PROJ-PURULIA-05",
    title: "Purulia Jal Sanjeevani: Hard-Rock Aquifer Piped Water Grid",
    hotspotId: "HOTSPOT-PURULIA-04",
    district: "Purulia",
    state: "West Bengal",
    category: "Drinking Water & Sanitation",
    priorityScore: 86,
    citizenRequests: 7350,
    populationAffected: "1.45M",
    infrastructureGap: 59,
    expectedImpact: "Transformative",
    estimatedInvestmentCr: 160,
    targetTimelineMonths: 18,
    status: "Prioritized",
    keyInterventions: [
      "Surface water intake from Kansabati reservoir with multi-stage filtration",
      "140 km ductile iron transmission pipeline to 86 arid gram panchayats",
      "Community fluoride removal plants and automated water quality telemetry"
    ]
  },
  {
    id: "PROJ-SITAPUR-06",
    title: "Sitapur Digital Jan Seva: High-Speed GramNet Backhaul",
    hotspotId: "HOTSPOT-SITAPUR-06",
    district: "Sitapur",
    state: "Uttar Pradesh",
    category: "Digital Infrastructure & Telecom",
    priorityScore: 82,
    citizenRequests: 6890,
    populationAffected: "2.1M",
    infrastructureGap: 54,
    expectedImpact: "High",
    estimatedInvestmentCr: 75,
    targetTimelineMonths: 12,
    status: "Recommended",
    keyInterventions: [
      "Last-mile optical fiber termination at 180 Gram Panchayat secretariats",
      "Public Wi-Fi hotspots and solar-backed biometric terminals at PDS shops",
      "Equipping 45 primary schools with digital smart education hubs"
    ]
  },
  {
    id: "PROJ-MAHABUBNAGAR-07",
    title: "Mahabubnagar Solar Kisan Urja & Feeder Separation",
    hotspotId: "HOTSPOT-MAHABUBNAGAR-08",
    district: "Mahabubnagar",
    state: "Telangana",
    category: "Electricity & Power Grid",
    priorityScore: 78,
    citizenRequests: 4890,
    populationAffected: "1.05M",
    infrastructureGap: 51,
    expectedImpact: "High",
    estimatedInvestmentCr: 95,
    targetTimelineMonths: 15,
    status: "Recommended",
    keyInterventions: [
      "Separation of 32 agricultural feeders from domestic rural power lines",
      "Deployment of 40 MW distributed ground-mounted solar sub-stations",
      "Dynamic capacitor banks to eliminate tail-end low voltage drops"
    ]
  },
  {
    id: "PROJ-DHARMAPURI-08",
    title: "Dharmapuri Utkarsh: Polytechnic & Technical Skill Labs",
    hotspotId: "HOTSPOT-DHARMAPURI-07",
    district: "Dharmapuri",
    state: "Tamil Nadu",
    category: "Education & Skill Development",
    priorityScore: 76,
    citizenRequests: 4210,
    populationAffected: "0.95M",
    infrastructureGap: 48,
    expectedImpact: "High",
    estimatedInvestmentCr: 65,
    targetTimelineMonths: 12,
    status: "In Consultation",
    keyInterventions: [
      "Creation of 6 modern industry 4.0 vocational hubs at government schools",
      "Advanced precision farming and food processing training laboratories",
      "High-speed fiber-connected digital library in taluk headquarters"
    ]
  }
];

// Impact Tracking & Feedback Loop Records
export const IMPACT_TRACKING_DATA: ImpactProject[] = [
  {
    id: "IMP-2025-01",
    name: "Barwani Nimar All-Weather Highway & Bridge Corridor",
    district: "Barwani",
    state: "Madhya Pradesh",
    category: "Road Infrastructure",
    completionDate: "February 2025",
    investmentCr: 142,
    beneficiaries: "680,000 Citizens",
    requestsBefore: 7840,
    requestsAfter: 1210,
    gapBefore: 68,
    gapAfter: 24,
    satisfactionScore: 88,
    keyAccomplishments: [
      "Reduced transit time to district hospital from 110 minutes to 35 minutes",
      "Zero monsoon bridge washouts recorded in 2025-26 seasonal audits",
      "94% increase in daily agricultural transport trips to regional mandis"
    ],
    monitoringStatus: "Year-1 Follow-up"
  },
  {
    id: "IMP-2024-02",
    name: "Yavatmal Cotton Belt Piped Drinking Water Network",
    district: "Yavatmal",
    state: "Maharashtra",
    category: "Drinking Water & Sanitation",
    completionDate: "November 2024",
    investmentCr: 118,
    beneficiaries: "520,000 Citizens",
    requestsBefore: 6420,
    requestsAfter: 1840,
    gapBefore: 64,
    gapAfter: 28,
    satisfactionScore: 84,
    keyAccomplishments: [
      "Eliminated dependence on private water tankers across 72 drought-prone villages",
      "Decreased water-borne dysentery incidents by 62% in PHC registries",
      "Saved rural women an estimated 2.4 hours daily in water fetching labor"
    ],
    monitoringStatus: "Fully Operational"
  },
  {
    id: "IMP-2025-03",
    name: "Bahraich Border District Telemedicine & Neonatal Units",
    district: "Bahraich",
    state: "Uttar Pradesh",
    category: "Healthcare Facilities",
    completionDate: "May 2025",
    investmentCr: 88,
    beneficiaries: "920,000 Citizens",
    requestsBefore: 5930,
    requestsAfter: 1910,
    gapBefore: 58,
    gapAfter: 29,
    satisfactionScore: 89,
    keyAccomplishments: [
      "Installed continuous oxygen plants and neonatal stabilization across 14 CHCs",
      "Conducted 42,000 successful tele-consultations with SGPGIMS Lucknow doctors",
      "Reduced emergency out-of-district referrals by 44%"
    ],
    monitoringStatus: "Post-Implementation Audit"
  }
];

// Data Governance & Provenance Catalog
export const DATA_SOURCES_CATALOG: DataSourceItem[] = [
  {
    id: "SRC-01",
    name: "CivicPulse Multilingual Citizen Pulse Ingestion",
    category: "Citizen Data",
    type: "Voice & Text Ingestion DPI API",
    updateFrequency: "Near Real-Time (Continuous)",
    coverage: "25 Monitored Districts across 8 States",
    status: "Synthetic Demo Dataset",
    notes: "Ingests anonymized citizen submissions in 6 Indian languages with automated PII redaction."
  },
  {
    id: "SRC-02",
    name: "PMGSY Geographic Information System (GIS) Core Network",
    category: "Infrastructure Data",
    type: "Geospatial Road Connectivity Audit",
    updateFrequency: "Quarterly",
    coverage: "Habitations >= 250 population in Special Category / Tribal blocks",
    status: "Synthetic Demo Dataset",
    notes: "Modeled on Pradhan Mantri Gram Sadak Yojana rural road layer for deficit benchmarking."
  },
  {
    id: "SRC-03",
    name: "Jal Jeevan Mission (JJM) Piped Water Verification MIS",
    category: "Infrastructure Data",
    type: "Functional Household Tap Connection (FHTC) Registry",
    updateFrequency: "Monthly",
    coverage: "Gram Panchayat Village Water & Sanitation Committees",
    status: "Synthetic Demo Dataset",
    notes: "Maps water supply continuity, per capita liters/day, and contamination alerts."
  },
  {
    id: "SRC-04",
    name: "National Health Mission Health Management Information System (HMIS)",
    category: "Infrastructure Data",
    type: "Health Facility Registry & Staffing Audit",
    updateFrequency: "Monthly",
    coverage: "Sub-Centres, PHCs, CHCs, and District Hospitals",
    status: "Synthetic Demo Dataset",
    notes: "Tracks bed capacity, doctor vacancy rates, ambulance response latency, and diagnostic equipment status."
  },
  {
    id: "SRC-05",
    name: "Census & NITI Aayog Aspirational Districts Projections",
    category: "Demographic Data",
    type: "Demographic Spatial Projections",
    updateFrequency: "Annual",
    coverage: "District & Sub-District Administrative Boundaries",
    status: "Census Model",
    notes: "Calibrated 2026 demographic estimates with vulnerability indicators for SC/ST and agrarian share."
  },
  {
    id: "SRC-06",
    name: "National Infrastructure Pipeline (NIP) Public Capital Tracker",
    category: "Public Investment Data",
    type: "Sanctioned Scheme Outlays & Capex Tracking",
    updateFrequency: "Bi-annual",
    coverage: "State and Central Sector Infrastructure Schemes",
    status: "Synthetic Demo Dataset",
    notes: "Identifies unallocated funding windows and historical expenditure absorption bottlenecks."
  }
];

// Helper function to recalculate Priority Scores when weights change
export function calculateHotspotPriorityScore(
  hotspot: DemandHotspot,
  weights: PriorityWeights
): { score: number; breakdown: DemandHotspot['breakdown'] } {
  // Normalize factors:
  // Demand (0-20 scale): max 10000 reqs -> 20 pts
  const rawDemand = Math.min(20, (hotspot.citizenRequests / 10000) * 20);
  
  // Gap (0-20 scale): gap % * 0.20
  const rawGap = (hotspot.infrastructureGap / 100) * 20;

  // Pop (0-15 scale): pop / 2.5M * 15
  const rawPop = Math.min(15, (hotspot.populationNumeric / 2500000) * 15);

  // Severity (0-15 scale): highSev / requests * 15 * 2.5
  const sevRatio = hotspot.citizenRequests > 0 ? (hotspot.highSeverityRequests / hotspot.citizenRequests) : 0.3;
  const rawSev = Math.min(15, sevRatio * 35);

  // Vulnerability (0-10 scale)
  const rawVuln = Math.min(10, hotspot.vulnerabilityIndex);

  // Urgency (0-10 scale)
  const rawUrg = Math.min(10, hotspot.urgencyIndex);

  // Expected Impact (0-10 scale)
  const rawImp = Math.min(10, (hotspot.breakdown.expectedImpact || 8));

  // Weighted sum normalized to 100
  const totalWeight = weights.citizenDemand + weights.infrastructureGap + weights.populationImpact +
                      weights.severity + weights.vulnerability + weights.urgency + weights.expectedImpact;

  const weightedSum = (
    (rawDemand / 20) * weights.citizenDemand +
    (rawGap / 20) * weights.infrastructureGap +
    (rawPop / 15) * weights.populationImpact +
    (rawSev / 15) * weights.severity +
    (rawVuln / 10) * weights.vulnerability +
    (rawUrg / 10) * weights.urgency +
    (rawImp / 10) * weights.expectedImpact
  ) / (totalWeight || 1);

  const finalScore = Math.min(100, Math.max(10, Math.round(weightedSum * 100)));

  return {
    score: finalScore,
    breakdown: {
      citizenDemand: Math.round(rawDemand),
      infrastructureGap: Math.round(rawGap),
      populationImpact: Math.round(rawPop),
      severity: Math.round(rawSev),
      vulnerability: Math.round(rawVuln),
      urgency: Math.round(rawUrg),
      expectedImpact: Math.round(rawImp)
    }
  };
}
