import { LanguageCode } from './types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  nav: {
    overview: string;
    citizenSubmission: string;
    citizenRequests: string;
    hotspots: string;
    infrastructureGaps: string;
    projects: string;
    assistant: string;
    simulator: string;
    impact: string;
    dataSources: string;
    settings: string;
  };
  common: {
    syntheticBadge: string;
    decisionSupportNotice: string;
    aiAssistedScore: string;
    viewEvidence: string;
    generateProposal: string;
    simulateImpact: string;
    filterByCategory: string;
    filterBySeverity: string;
    allCategories: string;
    allSeverities: string;
    high: string;
    medium: string;
    low: string;
    submit: string;
    submitting: string;
    analyzing: string;
  };
  citizen: {
    heading: string;
    subheading: string;
    voiceBtn: string;
    listening: string;
    voiceStop: string;
    placeholder: string;
    selectLanguage: string;
    selectLocation: string;
    analyzeBtn: string;
    steps: {
      detectingLang: string;
      transcribing: string;
      understanding: string;
      classifying: string;
      detectingLoc: string;
      estimatingSev: string;
      checkingSimilar: string;
      generatingRecord: string;
    };
    analysisTitle: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appName: "CivicPulse AI",
    tagline: "From Citizen Voice to Development Intelligence",
    nav: {
      overview: "Overview",
      citizenSubmission: "Citizen Submission",
      citizenRequests: "Citizen Requests",
      hotspots: "Demand Hotspots",
      infrastructureGaps: "Infrastructure Gaps",
      projects: "Priority Projects",
      assistant: "Policy Assistant",
      simulator: "Budget Simulator",
      impact: "Impact Tracking",
      dataSources: "Data Sources",
      settings: "Settings",
    },
    common: {
      syntheticBadge: "Synthetic Demo Dataset",
      decisionSupportNotice: "AI Decision Support System — Human Administrative Review Mandated",
      aiAssistedScore: "AI-assisted Priority Score",
      viewEvidence: "View Evidence",
      generateProposal: "Generate Proposal",
      simulateImpact: "Simulate Impact",
      filterByCategory: "Filter by Category",
      filterBySeverity: "Filter by Severity",
      allCategories: "All Categories",
      allSeverities: "All Severities",
      high: "High Severity",
      medium: "Medium Severity",
      low: "Low Severity",
      submit: "Submit Request",
      submitting: "Submitting...",
      analyzing: "Analyzing with AI...",
    },
    citizen: {
      heading: "Tell us what your community needs",
      subheading: "Voice or text development request powered by multilingual Digital Public Infrastructure",
      voiceBtn: "Speak your request",
      listening: "Listening... speak now in any language",
      voiceStop: "Stop recording",
      placeholder: "Example: Our village road becomes unusable during the monsoon and ambulances cannot reach us.",
      selectLanguage: "Spoken / Written Language",
      selectLocation: "Select District / Location",
      analyzeBtn: "Analyze Request",
      steps: {
        detectingLang: "Detecting language & dialect nuances",
        transcribing: "Transcribing and speech tokenization",
        understanding: "Understanding underlying public need",
        classifying: "Classifying infrastructure category",
        detectingLoc: "Detecting location and administrative boundary",
        estimatingSev: "Estimating public safety & livelihood severity",
        checkingSimilar: "Checking cluster similarity with existing records",
        generatingRecord: "Generating structured DPI civic record",
      },
      analysisTitle: "AI Request Understanding & Civic Record",
    },
  },
  hi: {
    appName: "सिविकपल्स एआई (CivicPulse AI)",
    tagline: "नागरिक की आवाज़ से विकास की बुद्धिमता तक",
    nav: {
      overview: "सिंहावलोकन (Overview)",
      citizenSubmission: "नागरिक अनुरोध (Citizen)",
      citizenRequests: "अनुरोध डेटाबेस",
      hotspots: "मांग हॉटस्पॉट्स (Hotspots)",
      infrastructureGaps: "बुनियादी ढांचा अंतर",
      projects: "प्राथमिकता परियोजनाएं",
      assistant: "नीति सहायक (AI Assistant)",
      simulator: "बजट सिम्युलेटर",
      impact: "प्रभाव ट्रैकिंग (Impact)",
      dataSources: "डेटा स्रोत (Data Sources)",
      settings: "सेटिंग्स",
    },
    common: {
      syntheticBadge: "डेमो/सिंथेटिक डेटासेट",
      decisionSupportNotice: "एआई निर्णय सहायता प्रणाली — प्रशासनिक समीक्षा अनिवार्य",
      aiAssistedScore: "एआई-सहायता प्राप्त प्राथमिकता स्कोर",
      viewEvidence: "साक्ष्य देखें",
      generateProposal: "प्रस्ताव तैयार करें",
      simulateImpact: "प्रभाव का अनुकरण करें",
      filterByCategory: "श्रेणी अनुसार फ़िल्टर",
      filterBySeverity: "गंभीरता अनुसार फ़िल्टर",
      allCategories: "सभी श्रेणियां",
      allSeverities: "सभी गंभीरता स्तर",
      high: "उच्च प्राथमिकता (High)",
      medium: "मध्यम प्राथमिकता (Medium)",
      low: "सामान्य प्राथमिकता (Low)",
      submit: "अनुरोध जमा करें",
      submitting: "जमा हो रहा है...",
      analyzing: "एआई द्वारा विश्लेषण जारी...",
    },
    citizen: {
      heading: "बताएं कि आपके समुदाय को क्या आवश्यकता है",
      subheading: "बहुभाषी डिजिटल सार्वजनिक बुनियादी ढांचे द्वारा संचालित नागरिक विकास अनुरोध",
      voiceBtn: "बोलकर अपना अनुरोध दर्ज करें",
      listening: "सुन रहे हैं... कृपया अपनी भाषा में बोलें",
      voiceStop: "रिकॉर्डिंग रोकें",
      placeholder: "उदाहरण: हमारे गांव की सड़क बारिश में पूरी तरह बह जाती है और एंबुलेंस अस्पताल नहीं पहुंच पाती।",
      selectLanguage: "भाषा चुनें",
      selectLocation: "जिला / क्षेत्र चुनें",
      analyzeBtn: "अनुरोध का विश्लेषण करें",
      steps: {
        detectingLang: "भाषा और बोली की पहचान हो रही है",
        transcribing: "ध्वनि से पाठ में रूपांतरण (Transcription)",
        understanding: "नागरिक समस्या का अर्थ समझा जा रहा है",
        classifying: "बुनियादी ढांचा श्रेणी का वर्गीकरण",
        detectingLoc: "स्थान और प्रशासनिक सीमा की पहचान",
        estimatingSev: "आपातकाल और गंभीरता का अनुमान",
        checkingSimilar: "समान अनुरोधों के साथ क्लस्टर मैपिंग",
        generatingRecord: "संरचित डिजिटल नागरिक रिकॉर्ड तैयार हो रहा है",
      },
      analysisTitle: "एआई विश्लेषण एवं नागरिक रिकॉर्ड",
    },
  },
  bn: {
    appName: "সিভিকপালস এআই (CivicPulse AI)",
    tagline: "নাগরিকের কণ্ঠ থেকে উন্নয়ন বুদ্ধিমত্তা",
    nav: {
      overview: "সংক্ষিপ্ত বিবরণ",
      citizenSubmission: "নাগরিক আবেদন",
      citizenRequests: "আবেদন ডেটাবেস",
      hotspots: "চাহিদা হটস্পট",
      infrastructureGaps: "অবকাঠামোর ফাঁক",
      projects: "অগ্রাধিকার প্রকল্প",
      assistant: "নীতি সহকারী",
      simulator: "বাজেট সিমুলেটর",
      impact: "প্রভাব ট্র্যাকিং",
      dataSources: "উপাত্ত উৎস",
      settings: "সেটিংস",
    },
    common: {
      syntheticBadge: "সিন্থেটিক ডেমো ডেটাসেট",
      decisionSupportNotice: "এআই সিদ্ধান্ত সহায়তা ব্যবস্থা — প্রশাসনিক পর্যালোচনা বাধ্যতামূলক",
      aiAssistedScore: "এআই-সহায়তাপ্রাপ্ত অগ্রাধিকার স্কোর",
      viewEvidence: "প্রমাণ দেখুন",
      generateProposal: "প্রস্তাব তৈরি করুন",
      simulateImpact: "প্রভাব সিমুলেট করুন",
      filterByCategory: "বিভাগ অনুযায়ী ফিল্টার",
      filterBySeverity: "তীব্রতা অনুযায়ী ফিল্টার",
      allCategories: "সকল বিভাগ",
      allSeverities: "সকল তীব্রতা স্তর",
      high: "উচ্চ অগ্রাধিকার",
      medium: "মাঝারি অগ্রাধিকার",
      low: "নিম্ন অগ্রাধিকার",
      submit: "অনুরোধ জমা দিন",
      submitting: "জমা হচ্ছে...",
      analyzing: "এআই বিশ্লেষণ চলছে...",
    },
    citizen: {
      heading: "আপনার এলাকার উন্নয়নের জন্য কী প্রয়োজন বলুন",
      subheading: "বহুভাষিক ডিজিটাল পাবলিক পরিকাঠামো দ্বারা চালিত উন্নয়ন অনুরোধ",
      voiceBtn: "মুখে বলে অনুরোধ করুন",
      listening: "শুনছি... যেকোনো ভাষায় কথা বলুন",
      voiceStop: "রেকর্ডিং থামান",
      placeholder: "উদাহরণ: বর্ষার সময় আমাদের গ্রামের রাস্তা ভেসে যায় এবং অ্যাম্বুলেন্স পৌঁছাতে পারে না।",
      selectLanguage: "ভাষা নির্বাচন করুন",
      selectLocation: "জেলা / স্থান নির্বাচন করুন",
      analyzeBtn: "অনুরোধ বিশ্লেষণ করুন",
      steps: {
        detectingLang: "ভাষা ও উপভাষা শনাক্তকরণ",
        transcribing: "ভয়েস প্রতিলিপি তৈরি",
        understanding: "মূল নাগরিক সমস্যা উপলব্ধি",
        classifying: "অবকাঠামো বিভাগ নির্ণয়",
        detectingLoc: "ভৌগোলিক এলাকা শনাক্তকরণ",
        estimatingSev: "তীব্রতা এবং প্রভাব পরিমাপ",
        checkingSimilar: "অনুরূপ অভিযোগের সাথে সমন্বয়",
        generatingRecord: "ডিজিটাল সিভিক রেকর্ড গঠন",
      },
      analysisTitle: "এআই বিশ্লেষণ ও সিভিক রেকর্ড",
    },
  },
  mr: {
    appName: "सिव्हिकपल्स एआय (CivicPulse AI)",
    tagline: "नागरिकांच्या आवाजातून विकास बुद्धिमत्ता",
    nav: {
      overview: "आढावा (Overview)",
      citizenSubmission: "नागरिक विनंती",
      citizenRequests: "मागण्यांचा डेटाबेस",
      hotspots: "मागणी हॉटस्पॉट्स",
      infrastructureGaps: "पायाभूत सुविधा अंतर",
      projects: "प्राधान्य प्रकल्प",
      assistant: "धोरण सहाय्यक",
      simulator: "बजेट सिम्युलेटर",
      impact: "प्रभाव ट्रॅकिंग",
      dataSources: "माहिती स्रोत",
      settings: "सेटिंग्ज",
    },
    common: {
      syntheticBadge: "सिंथेटिक डेमो डेटासेट",
      decisionSupportNotice: "एआय निर्णय समर्थन प्रणाली — प्रशासकीय पुनरावलोकन अनिवार्य",
      aiAssistedScore: "एआय-साहाय्यित प्राधान्य गुण",
      viewEvidence: "पुरावा पाहा",
      generateProposal: "प्रस्ताव तयार करा",
      simulateImpact: "प्रभावाचे सिम्युलेशन करा",
      filterByCategory: "वर्गवारीनुसार फिल्टर",
      filterBySeverity: "तीव्रतेनुसार फिल्टर",
      allCategories: "सर्व वर्ग",
      allSeverities: "सर्व तीव्रता स्तर",
      high: "उच्च तीव्रता",
      medium: "मध्यम तीव्रता",
      low: "कमी तीव्रता",
      submit: "विनंती सबमिट करा",
      submitting: "सबमिट होत आहे...",
      analyzing: "एआय विश्लेषण सुरू आहे...",
    },
    citizen: {
      heading: "तुमच्या गावाला किंवा वस्तीला काय हवे आहे ते सांगा",
      subheading: "बहुभाषिक डिजिटल सार्वजनिक पायाभूत सुविधांद्वारे नागरिक विकास विनंती",
      voiceBtn: "तुमची मागणी बोलून सांगा",
      listening: "ऐकत आहोत... कृपया बोला",
      voiceStop: "रेकॉर्डिंग थांबवा",
      placeholder: "उदाहरण: पावसाळ्यात आमच्या पाड्याचा रस्ता वाहून जातो आणि रुग्णवाहिका गावात येऊ शकत नाही.",
      selectLanguage: "भाषा निवडा",
      selectLocation: "जिल्हा / ठिकाण निवडा",
      analyzeBtn: "मागणीचे विश्लेषण करा",
      steps: {
        detectingLang: "भाषा ओळखत आहे",
        transcribing: "आवाजाचे लेखनात रूपांतर",
        understanding: "समस्येचे गांभीर्य समजून घेणे",
        classifying: "पायाभूत सुविधा प्रकार वर्गीकरण",
        detectingLoc: "भौगोलिक स्थान ओळखणे",
        estimatingSev: "तीव्रतेचा अंदाज बांधणे",
        checkingSimilar: "तत्सम मागण्यांची पडताळणी",
        generatingRecord: "डिजिटल नागरी नोंदणी तयार करणे",
      },
      analysisTitle: "एआय मागणी विश्लेषण आणि नागरी नोंद",
    },
  },
  ta: {
    appName: "சிவிக்பல்ஸ் ஏஐ (CivicPulse AI)",
    tagline: "குடிமக்கள் குரலில் இருந்து வளர்ச்சி நுண்ணறிவு வரை",
    nav: {
      overview: "கண்ணோட்டம்",
      citizenSubmission: "குடிமக்கள் கோரிக்கை",
      citizenRequests: "கோரிக்கைகள் பட்டியல்",
      hotspots: "தேவை மையங்கள்",
      infrastructureGaps: "உள்கட்டமைப்பு இடைவெளிகள்",
      projects: "முன்னுரிமை திட்டங்கள்",
      assistant: "கொள்கை உதவியாளர்",
      simulator: "நிதி ஒதுக்கீடு மாதிரி",
      impact: "தாக்க கண்காணிப்பு",
      dataSources: "தரவு மூலங்கள்",
      settings: "அமைப்புகள்",
    },
    common: {
      syntheticBadge: "செயற்கை மாதிரி தரவுத்தொகுப்பு",
      decisionSupportNotice: "ஏஐ கொள்கை முடிவு ஆதரவு அமைப்பு — நிர்வாக மேற்பார்வை கட்டாயம்",
      aiAssistedScore: "ஏஐ-உதவி முன்னுரிமை மதிப்பீடு",
      viewEvidence: "ஆதாரங்களை காண்க",
      generateProposal: "திட்ட வரைவை உருவாக்குக",
      simulateImpact: "தாக்கத்தை சோதிக்கவும்",
      filterByCategory: "துறை வாரியாக வடிகட்டுக",
      filterBySeverity: "தீவிரத்தன்மை வாரியாக",
      allCategories: "அனைத்து துறைகள்",
      allSeverities: "அனைத்து நிலைகள்",
      high: "உயர் முன்னுரிமை",
      medium: "நடுத்தர முன்னுரிமை",
      low: "குறைந்த முன்னுரிமை",
      submit: "கோரிக்கையை சமர்ப்பிக்கவும்",
      submitting: "சமர்ப்பிக்கப்படுகிறது...",
      analyzing: "ஏஐ ஆய்வு செய்கிறது...",
    },
    citizen: {
      heading: "உங்கள் சமுதாயத்திற்கு என்ன தேவை என்பதை கூறுங்கள்",
      subheading: "பன்மொழி டிஜிட்டல் பொது உள்கட்டமைப்பால் இயக்கப்படும் குடிமக்கள் கோரிக்கை",
      voiceBtn: "பேசி கோரிக்கையை பதிவு செய்யவும்",
      listening: "கேட்கிறது... தயவுசெய்து பேசுங்கள்",
      voiceStop: "பதிவை நிறுத்துங்கள்",
      placeholder: "எடுத்துக்காட்டு: மழைக்காலத்தில் எங்கள் கிராமத்து சாலை சேதமடைந்து ஆம்புலன்ஸ் வர முடிவதில்லை.",
      selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
      selectLocation: "மாவட்டம் / இடத்தை தேர்ந்தெடுக்கவும்",
      analyzeBtn: "கோரிக்கையை ஆய்வு செய்",
      steps: {
        detectingLang: "மொழியை கண்டறிதல்",
        transcribing: "பேச்சை எழுத்தாக மாற்றுதல்",
        understanding: "குடிமக்களின் அடிப்படை தேவையை அறிதல்",
        classifying: "உள்கட்டமைப்பு வகையை பிரித்தல்",
        detectingLoc: "இருப்பிடத்தை அறிதல்",
        estimatingSev: "முன்னுரிமை தீவிரத்தை அளவிடுதல்",
        checkingSimilar: "ஒத்த கோரிக்கைகளை தொகுத்தல்",
        generatingRecord: "டிஜிட்டல் பொது பதிவை உருவாக்குதல்",
      },
      analysisTitle: "ஏஐ குடிமக்கள் கோரிக்கை பகுப்பாய்வு",
    },
  },
  te: {
    appName: "సివిక్‌పల్స్ ఏఐ (CivicPulse AI)",
    tagline: "ప్రజా గళం నుండి అభివృద్ధి మేధస్సు వరకు",
    nav: {
      overview: "అవలోకనం",
      citizenSubmission: "పౌర అభ్యర్థన",
      citizenRequests: "అభ్యర్థనల సమాహారం",
      hotspots: "డిమాండ్ హాట్‌స్పాట్‌లు",
      infrastructureGaps: "మౌలిక వసతుల లోపాలు",
      projects: "ప్రాధాన్య ప్రాజెక్టులు",
      assistant: "పాలసీ అసిస్టెంట్",
      simulator: "బడ్జెట్ సిమ్యులేటర్",
      impact: "ప్రభావ పర్యవేక్షణ",
      dataSources: "డేటా వనరులు",
      settings: "సెట్టింగులు",
    },
    common: {
      syntheticBadge: "సింథటిక్ డెమో డేటాసెట్",
      decisionSupportNotice: "ఏఐ నిర్ణయ సహాయక వ్యవస్థ — పరిపాలనా సమీక్ష తప్పనిసరి",
      aiAssistedScore: "ఏఐ-సహాయక ప్రాధాన్యత స్కోరు",
      viewEvidence: "సాక్ష్యం చూడండి",
      generateProposal: "ప్రతిపాదనను రూపొందించండి",
      simulateImpact: "ప్రభావాన్ని పరీక్షించండి",
      filterByCategory: "వర్గం వారీగా ఫిల్టర్",
      filterBySeverity: "తీవ్రత వారీగా ఫిల్టర్",
      allCategories: "అన్ని వర్గాలు",
      allSeverities: "అన్ని తీవ్రతలు",
      high: "అత్యధిక ప్రాధాన్యత",
      medium: "మధ్యస్థ ప్రాధాన్యత",
      low: "సాధారణ ప్రాధాన్యత",
      submit: "అభ్యర్థనను సమర్పించండి",
      submitting: "సమర్పిస్తోంది...",
      analyzing: "ఏఐ విశ్లేషిస్తోంది...",
    },
    citizen: {
      heading: "మీ గ్రామానికి లేదా ప్రాంతానికి ఏమి కావాలో తెలియజేయండి",
      subheading: "బహుభాషా డిజిటల్ పబ్లిక్ ఇన్‌ఫ్రాస్ట్రక్చర్ ద్వారా పౌర అభివృద్ధి అభ్యర్థన",
      voiceBtn: "మీ అభ్యర్థనను మాట్లాడండి",
      listening: "వింటున్నాము... దయచేసి మాట్లాడండి",
      voiceStop: "రికార్డింగ్ ఆపండి",
      placeholder: "ఉదాహరణ: వర్షాకాలంలో మా గ్రామం రహదారి కొట్టుకుపోయి అంబులెన్స్ చేరుకోలేకపోతోంది.",
      selectLanguage: "భాషను ఎంచుకోండి",
      selectLocation: "జిల్లా / ప్రాంతాన్ని ఎంచుకోండి",
      analyzeBtn: "అభ్యర్థనను విశ్లేషించండి",
      steps: {
        detectingLang: "భాషను గుర్తించడం",
        transcribing: "వాయిస్ నుండి అక్షర రూపం",
        understanding: "ప్రజా అవసరాన్ని అర్థం చేసుకోవడం",
        classifying: "మౌలిక వసతుల వర్గీకరణ",
        detectingLoc: "ప్రాంతాన్ని గుర్తించడం",
        estimatingSev: "తీవ్రత స్థాయిని అంచనా వేయడం",
        checkingSimilar: "ఇలాంటి సమస్యలతో అనుసంధానం",
        generatingRecord: "డిజిటల్ పౌర రికార్డు నమోదు",
      },
      analysisTitle: "ఏఐ పౌర సమస్య విశ్లేషణ",
    },
  },
};
