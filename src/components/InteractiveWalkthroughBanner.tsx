import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  PlayCircle,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface Step {
  number: number;
  title: string;
  desc: string;
  tab: string;
  actionText?: string;
}

const DEMO_STEPS: Step[] = [
  {
    number: 1,
    title: "Step 1: Explore Platform",
    desc: "CivicPulse AI transforms multilingual citizen voice into evidence-backed infrastructure priorities.",
    tab: "landing",
    actionText: "Go to Citizen Submission"
  },
  {
    number: 2,
    title: "Step 2 & 3: Citizen Request Submission",
    desc: "Submit a development request via voice or text: 'Our village road becomes unusable during monsoon...'",
    tab: "citizen",
    actionText: "Review AI Analysis"
  },
  {
    number: 4,
    title: "Step 4: AI Request Analysis",
    desc: "AI classifies Road Infrastructure, High Severity, Healthcare Impact, and Monsoon Seasonality.",
    tab: "citizen",
    actionText: "View on Dashboard"
  },
  {
    number: 5,
    title: "Step 5: National Dashboard",
    desc: "See national KPIs update and view the new request integrated into the citizen registry.",
    tab: "dashboard",
    actionText: "Open Demand Hotspots"
  },
  {
    number: 6,
    title: "Step 6 & 7: Demand Hotspots & Evidence",
    desc: "Explore geographic clusters and examine the explainable AI-assisted Priority Score (91/100).",
    tab: "hotspots",
    actionText: "Generate Proposal"
  },
  {
    number: 8,
    title: "Step 8 & 9: AI Development Proposal",
    desc: "Examine the government-grade proposal with budget outlays, civil engineering scope, and risk matrix.",
    tab: "projects",
    actionText: "Open Budget Simulator"
  },
  {
    number: 10,
    title: "Step 10 & 11: Budget Allocation Simulator",
    desc: "Simulate a ₹500 Cr allocation to calculate beneficiary yields and infrastructure gap reduction.",
    tab: "simulator",
    actionText: "Open Impact Tracking"
  },
  {
    number: 12,
    title: "Step 12: Measured Impact Tracking",
    desc: "Evaluate completed infrastructure projects with before/after citizen request deltas.",
    tab: "impact",
    actionText: "Finish Tour"
  }
];

export const InteractiveWalkthroughBanner: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { setActiveTab, hotspots, setActiveProposalHotspot } = useApp();
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);

  if (!isOpen) return null;

  const currentStep = DEMO_STEPS[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < DEMO_STEPS.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      const nextStep = DEMO_STEPS[nextIdx];
      setActiveTab(nextStep.tab);

      // Special triggers for steps
      if (nextStep.number === 8 && hotspots.length > 0) {
        setActiveProposalHotspot(hotspots[0]);
      }
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      setActiveTab(DEMO_STEPS[prevIdx].tab);
    }
  };

  return (
    <div className="sticky top-16 z-40 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white border-b border-blue-700/60 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Step Counter & Info */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center shrink-0 ring-2 ring-blue-300/40">
              {currentStep.number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wide text-blue-200">
                  {currentStep.title}
                </span>
                <span className="text-[10px] bg-blue-800/80 text-blue-100 px-1.5 py-0.2 rounded font-mono">
                  {currentStepIdx + 1}/{DEMO_STEPS.length}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-1 sm:line-clamp-none max-w-xl">
                {currentStep.desc}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrev}
              disabled={currentStepIdx === 0}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none rounded"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition-colors"
            >
              <span>{currentStep.actionText || 'Next'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded ml-2"
              title="Exit Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
