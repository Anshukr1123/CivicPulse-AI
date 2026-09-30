import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { analyzeCitizenSubmission, AnalysisResponse } from '../services/aiService';
import { DISTRICT_COORDINATES } from '../data/demoData';
import { LanguageCode } from '../data/types';
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  MapPin,
  Globe,
  CheckCircle2,
  AlertCircle,
  FileCode2,
  ArrowRight,
  Shield,
  Loader2,
  RefreshCw,
  Building,
  Activity
} from 'lucide-react';

export const CitizenSubmitView: React.FC = () => {
  const { addRequest, setActiveTab, t, language: appLanguage } = useApp();

  const [text, setText] = useState<string>('Our village road becomes unusable during the monsoon and ambulances cannot reach us.');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Hindi');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Dhar');
  const [submissionType, setSubmissionType] = useState<'voice' | 'text'>('text');

  // Speech Recognition state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const recognitionRef = useRef<any>(null);

  // AI Pipeline Animation state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [submittedRecordId, setSubmittedRecordId] = useState<string | null>(null);
  const [showJson, setShowJson] = useState<boolean>(false);

  const districts = Object.keys(DISTRICT_COORDINATES);

  const samplePrompts = [
    {
      label: "Rural Road Monsoon Cutoff (Dhar, MP)",
      text: "Our village road becomes unusable during the monsoon and ambulances cannot reach us.",
      district: "Dhar",
      lang: "Hindi"
    },
    {
      label: "Broken Drinking Water Line (Gadchiroli, MH)",
      text: "आमच्या पाड्यात पिण्याच्या पाण्याची पाईपलाईन तीन महिन्यांपासून फुटलेली आहे. महिलांना दूषित विहिरीचे पाणी आणावे लागते.",
      district: "Gadchiroli",
      lang: "Marathi"
    },
    {
      label: "Primary Health Centre Vacancy (Purulia, WB)",
      text: "আমাদের পুরুলিয়ার প্রাথমিক স্বাস্থ্যকেন্দ্রে গত ছয় মাস ধরে কোনো স্থায়ী ডাক্তার নেই। সাপে কাটা রোগীদের বাঁচানো সম্ভব হয় না।",
      district: "Purulia",
      lang: "Bengali"
    },
    {
      label: "School Classroom Deficit (Dharmapuri, TN)",
      text: "எங்கள் கிராமத்தில் உயர்நிலைப் பள்ளிக்கு போதுமான வகுப்பறைகள் இல்லை. மழைக்காலத்தில் கூரை ஒழுகி மாணவர்கள் நனைகிறார்கள்.",
      district: "Dharmapuri",
      lang: "Tamil"
    }
  ];

  const analysisSteps = [
    "Detecting language & dialect nuances",
    "Transcribing and tokenizing input",
    "Understanding underlying public issue",
    "Classifying infrastructure category",
    "Detecting location & administrative boundary",
    "Estimating severity & emergency risk",
    "Checking cluster similarity with existing records",
    "Generating structured Digital Public Infrastructure record"
  ];

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // defaults to Indian English, can adapt

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setText(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }
  }, []);

  const toggleRecording = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert("Browser speech recognition is not supported in this browser. You can type or use the quick sample buttons below.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        setSubmissionType('voice');
        // adapt recognition language based on selection
        const langMap: Record<string, string> = {
          'English': 'en-IN',
          'Hindi': 'hi-IN',
          'Marathi': 'mr-IN',
          'Bengali': 'bn-IN',
          'Tamil': 'ta-IN',
          'Telugu': 'te-IN'
        };
        recognitionRef.current.lang = langMap[selectedLanguage] || 'en-IN';
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.warn('Speech recognition start failed', err);
        setIsRecording(false);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setCurrentStepIdx(0);
    setAnalysisResult(null);

    // Simulate animated step progression for GovTech DPI transparency
    const stepInterval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 280);

    try {
      const result = await analyzeCitizenSubmission(text, selectedLanguage, selectedDistrict);
      clearInterval(stepInterval);
      setCurrentStepIdx(analysisSteps.length - 1);
      
      // Brief settling delay before displaying structured card
      setTimeout(() => {
        setAnalysisResult(result);
        setIsAnalyzing(false);

        // Store into global requests database
        const districtMeta = DISTRICT_COORDINATES[selectedDistrict] || DISTRICT_COORDINATES['Dhar'];
        const saved = addRequest({
          language: result.language || selectedLanguage,
          request: text,
          normalizedIssue: result.issue,
          category: result.category,
          severity: result.severity,
          district: selectedDistrict,
          state: districtMeta.state,
          latitude: districtMeta.lat + (Math.random() - 0.5) * 0.05,
          longitude: districtMeta.lng + (Math.random() - 0.5) * 0.05,
          populationAffected: Math.floor(25000 + Math.random() * 20000),
          status: 'Hotspot Clustered',
          confidence: result.confidence,
          seasonality: result.seasonality,
          affectedServices: result.affectedServices,
          submissionType
        });
        setSubmittedRecordId(saved.id);
      }, 500);

    } catch (err) {
      console.error("Analysis failed", err);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
          <Activity className="w-4 h-4 text-blue-600" />
          <span>Multilingual Citizen Ingestion DPI</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Tell us what your community needs
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Submit development requests via voice or text. AI analyzes urgency, affected public services, and infrastructure gaps to inform state budget priorities.
        </p>
      </div>

      {/* Main Submission Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Step 1: Input Language & Location Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Language of Submission</span>
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Hindi">Hindi (हिन्दी)</option>
              <option value="English">English</option>
              <option value="Bengali">Bengali (বাংলা)</option>
              <option value="Marathi">Marathi (मराठी)</option>
              <option value="Tamil">Tamil (தமிழ்)</option>
              <option value="Telugu">Telugu (తెలుగు)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>District / Geographic Boundary</span>
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d} ({DISTRICT_COORDINATES[d].state})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Voice Request Section */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 text-center flex flex-col items-center justify-center space-y-3">
          <div className="text-xs font-semibold text-slate-700 flex items-center gap-2">
            <span>Voice Request</span>
            <span className="text-[10px] text-slate-500 font-normal">
              {speechSupported ? '(Web Speech API active)' : '(Speech API fallback enabled)'}
            </span>
          </div>

          <button
            onClick={toggleRecording}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md transition-all ${
              isRecording
                ? 'bg-red-600 ring-4 ring-red-200 animate-pulse'
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95'
            }`}
            title="Click to speak your request"
          >
            {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>

          <p className="text-xs text-slate-600 font-medium">
            {isRecording ? (
              <span className="text-red-600 font-semibold animate-pulse">
                Listening... speak in your native language
              </span>
            ) : (
              "Click the microphone to speak your request"
            )}
          </p>
        </div>

        {/* Text Request Section */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Or type your request below
          </label>
          <textarea
            rows={4}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setSubmissionType('text');
            }}
            placeholder="Example: Our village road becomes unusable during the monsoon and ambulances cannot reach us."
            className="w-full text-xs sm:text-sm text-slate-900 bg-white border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Pre-filled Sample Requests for instant demo testing */}
        <div>
          <div className="text-xs text-slate-500 mb-2">Try sample real-world civic prompts:</div>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setText(s.text);
                  setSelectedDistrict(s.district);
                  setSelectedLanguage(s.lang);
                  setSubmissionType('text');
                }}
                className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-200 text-left transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit & Analyze Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Anonymous civic submission. No personal telephone details stored.</span>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !text.trim()}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing DPI Record...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Request</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Animated AI Request Analysis Progress Screen */}
      {isAnalyzing && (
        <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 shadow-lg border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-sm">AI Understanding Engine In Action</span>
            </div>
            <span className="text-xs font-mono text-blue-300">
              Step {currentStepIdx + 1}/{analysisSteps.length}
            </span>
          </div>

          <div className="space-y-2.5 pt-2">
            {analysisSteps.map((step, idx) => {
              const isDone = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 text-xs transition-opacity ${
                    isDone
                      ? 'text-emerald-400'
                      : isCurrent
                      ? 'text-white font-semibold'
                      : 'text-slate-500 opacity-40'
                  }`}
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <Loader2 className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    )}
                  </div>
                  <span>{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Analysis Result Card (matches user prompt requirements) */}
      {analysisResult && !isAnalyzing && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                Civic Record Generated
              </span>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>AI Request Understanding</span>
                <span className="text-xs font-mono text-slate-500">#{submittedRecordId}</span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500">
                Confidence: <strong className="text-slate-800">{Math.round(analysisResult.confidence * 100)}%</strong>
              </span>
              <button
                onClick={() => setShowJson(!showJson)}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 flex items-center gap-1"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>{showJson ? 'Hide JSON' : 'View JSON'}</span>
              </button>
            </div>
          </div>

          {/* Structured Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="text-[11px] text-slate-500">Detected Language</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{analysisResult.language}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="text-[11px] text-slate-500">Infrastructure Category</div>
              <div className="text-sm font-bold text-blue-900 mt-0.5">{analysisResult.category}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="text-[11px] text-slate-500">Severity Assessment</div>
              <div className={`text-sm font-bold mt-0.5 ${
                analysisResult.severity === 'High' ? 'text-red-600' : analysisResult.severity === 'Medium' ? 'text-amber-600' : 'text-slate-700'
              }`}>
                {analysisResult.severity}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="text-[11px] text-slate-500">Seasonality Factor</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{analysisResult.seasonality}</div>
            </div>

          </div>

          {/* Issue & Affected Services */}
          <div className="space-y-3 pt-2">
            <div>
              <div className="text-xs font-semibold text-slate-500">Normalized Civic Issue</div>
              <div className="text-sm font-medium text-slate-900 mt-0.5 bg-blue-50/50 p-2.5 rounded border border-blue-100">
                {analysisResult.issue}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-500">Affected Public Services</div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {analysisResult.affectedServices.map((srv, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100 italic">
              "{analysisResult.summary}"
            </p>
          </div>

          {/* Structured JSON Drawer */}
          {showJson && (
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs overflow-x-auto">
              <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
            </div>
          )}

          {/* Next Steps Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Added to live dataset and clustered into {selectedDistrict} demand hotspot.</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>View on National Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('hotspots')}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Open Demand Hotspots
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
