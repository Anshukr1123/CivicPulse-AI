import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Mic,
  Brain,
  MapPin,
  BarChart3,
  Sliders,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Globe2,
  FileCheck,
  Sparkles,
  Layers,
  Activity,
  CheckCircle2,
  Building
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const { setActiveTab } = useApp();

  const pipelineSteps = [
    { label: "Citizen Voice", sub: "Multilingual voice & text DPI", icon: Mic },
    { label: "AI Understanding", sub: "Language, category, severity", icon: Brain },
    { label: "Demand Intelligence", sub: "Spatial clustering & hotspots", icon: MapPin },
    { label: "Infrastructure Analysis", sub: "GIS gaps vs. demand", icon: Layers },
    { label: "Priority Projects", sub: "Explainable 0-100 scoring", icon: BarChart3 },
    { label: "Policy Decisions", sub: "Budget simulation & proposals", icon: Sliders },
    { label: "Measured Impact", sub: "Post-project feedback loop", icon: TrendingUp },
  ];

  const features = [
    {
      title: "Multilingual Citizen Voice",
      description: "Direct citizen feedback intake in 6+ major languages with speech recognition, dialect detection, and zero literacy barriers.",
      icon: Mic,
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      title: "AI Issue Intelligence",
      description: "Automated classification of infrastructure categories, public safety severity, seasonality dependencies, and affected public services.",
      icon: Brain,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200"
    },
    {
      title: "Demand Hotspot Detection",
      description: "Consolidates thousands of disparate citizen submissions into geographic demand clusters with density and severity heatmaps.",
      icon: MapPin,
      color: "text-amber-600 bg-amber-50 border-amber-200"
    },
    {
      title: "Infrastructure Gap Analysis",
      description: "Cross-references citizen demand with official administrative datasets (PMGSY, Jal Jeevan Mission, HMIS) to uncover blind spots.",
      icon: Layers,
      color: "text-teal-600 bg-teal-50 border-teal-200"
    },
    {
      title: "Explainable Prioritization",
      description: "Transparent, customizable scoring engine combining demand, infrastructure gaps, population, vulnerability, and social impact.",
      icon: BarChart3,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
      title: "Policy Simulation & Proposals",
      description: "Interactive capital allocation modeling and automated synthesis of departmental proposals ready for cabinet review.",
      icon: Sliders,
      color: "text-purple-600 bg-purple-50 border-purple-200"
    },
    {
      title: "Impact Measurement",
      description: "Continuous post-commissioning tracking to evaluate citizen grievance reduction and infrastructure service quality improvement.",
      icon: TrendingUp,
      color: "text-rose-600 bg-rose-50 border-rose-200"
    },
  ];

  const dpiAttributes = [
    { title: "Open & Interoperable", desc: "Built on modular open standards to easily connect with state registries and municipal databases." },
    { title: "Multilingual by Design", desc: "Processes local languages and vernacular terminology natively to bridge digital divides." },
    { title: "Scalable DPI Architecture", desc: "Engineered to ingest millions of submissions without performance degradation." },
    { title: "Country-Configurable", desc: "Adaptable scoring formulas and demographic schemas suited for multilateral BRICS deployment." },
    { title: "Evidence-Backed Decisions", desc: "Replaces anecdotal budget lobbying with transparent, data-driven justification trails." },
    { title: "Data-Driven & Privacy-Safe", desc: "Enforces strict citizen anonymization and role-based data governance." }
  ];

  return (
    <div className="space-y-16 py-6 sm:py-10">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 text-center max-w-5xl mx-auto px-4">
        
        {/* Subtle Pill-free Kicker */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-700 tracking-wide uppercase mb-4">
          <Activity className="w-4 h-4 text-blue-600" />
          <span>BRICS Innovation GovTech · Digital Public Infrastructure</span>
          <span aria-hidden="true">·</span>
          <span>Decision Support Platform</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight">
          CivicPulse AI
        </h1>
        
        <p className="mt-3 text-lg sm:text-2xl font-medium text-slate-700 max-w-3xl mx-auto text-balance">
          From Citizen Voice to Development Intelligence
        </p>

        <p className="mt-5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
          An AI-powered civic intelligence platform that transforms multilingual citizen feedback into evidence-backed infrastructure priorities for public governance.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
          >
            <span>Explore Dashboard</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={() => setActiveTab('citizen')}
            className="px-6 py-3 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors flex items-center gap-2"
          >
            <Mic className="w-4 h-4 text-blue-600" />
            <span>Submit a Citizen Request</span>
          </button>
        </div>

        {/* Quick Trust Badges */}
        <div className="mt-10 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Multilingual Voice & Text</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Explainable Priority Scores</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Integrated GIS & Census Gaps</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Human-in-the-Loop Governance</span>
          </div>
        </div>
      </section>

      {/* Visual Pipeline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
              End-to-End Decision Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold mt-1 text-white">
              The CivicPulse Intelligence Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Transforming unstructured citizen requests into structured, explainable development proposals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 relative">
            {pipelineSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-850 border border-slate-700/80 rounded-xl p-4 flex flex-col items-center text-center relative group hover:border-blue-500/60 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-mono text-slate-500 mb-1">0{idx + 1}</div>
                  <div className="text-xs font-bold text-white mb-1">{step.label}</div>
                  <p className="text-[11px] text-slate-400 leading-tight">{step.sub}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              <span className="font-semibold text-slate-300">Core Engine: </span>
              Gemini 3.8 Flash + Multi-factor Parametric GovTech Heuristics
            </div>
            <button
              onClick={() => setActiveTab('hotspots')}
              className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
            >
              <span>Explore Demand Hotspots Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600">
            Government-Grade Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Engineered for Real-World Governance
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Equipping policymakers with the tools to listen at scale, diagnose gaps, and simulate public investments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${feat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );
          })}

          {/* Assistant Highlight Card */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">AI Policy Assistant</h3>
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                Ask natural-language questions about district bottlenecks, budget allocations, and health or road demand concentrations.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('assistant')}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-between"
            >
              <span>Launch Policy Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Built for Digital Public Infrastructure Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-2xl p-8 sm:p-12 border border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-700">
              Architectural Constitution
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Built for Digital Public Infrastructure
            </h2>
            <p className="text-sm text-slate-700 mt-2 leading-relaxed">
              CivicPulse AI adopts the foundational DPI principles of interoperability, public accountability, and multilingual accessibility to deliver government-scale public value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dpiAttributes.map((attr, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
                <div className="font-bold text-sm text-slate-900 mb-1">{attr.title}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{attr.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Launch CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to Experience CivicPulse AI?</h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Submit a real citizen request, inspect national demand clusters, or simulate capital budget portfolios in seconds.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('citizen')}
              className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              Submit Citizen Request
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-colors"
            >
              Open National Dashboard
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-colors"
            >
              Test Budget Simulator
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
