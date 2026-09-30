import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PriorityWeights } from '../data/types';
import {
  Sliders,
  RotateCcw,
  Sparkles,
  Server,
  Database,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    weights,
    updateWeight,
    resetWeights,
    resetToDefaults,
    requests
  } = useApp();

  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const weightDefinitions: Array<{
    key: keyof PriorityWeights;
    label: string;
    desc: string;
    maxPercent: number;
  }> = [
    {
      key: 'citizenDemand',
      label: 'Citizen Demand Volume',
      desc: 'Weight given to the raw volume and recurrence of citizen submissions',
      maxPercent: 40
    },
    {
      key: 'infrastructureGap',
      label: 'Infrastructure Coverage Gap',
      desc: 'Weight given to baseline deficits in PMGSY, Jal Jeevan Mission, and health networks',
      maxPercent: 40
    },
    {
      key: 'populationImpact',
      label: 'Population Impact Reach',
      desc: 'Weight given to total census demographic count in the affected zone',
      maxPercent: 30
    },
    {
      key: 'severity',
      label: 'Public Safety Severity',
      desc: 'Weight given to emergency hazards, maternal healthcare cutoffs, and flood risks',
      maxPercent: 30
    },
    {
      key: 'vulnerability',
      label: 'Demographic Vulnerability',
      desc: 'Weight given to tribal (ST), scheduled caste (SC), and agrarian poverty indices',
      maxPercent: 20
    },
    {
      key: 'urgency',
      label: 'Seasonality & Seasonal Urgency',
      desc: 'Weight given to looming monsoon washouts and pre-monsoon construction windows',
      maxPercent: 20
    },
    {
      key: 'expectedImpact',
      label: 'Expected Social Return',
      desc: 'Weight given to economic multiplier yields per crore invested',
      maxPercent: 20
    }
  ];

  // Calculate sum of weights
  const totalWeightPercent = Math.round(
    (weights.citizenDemand +
      weights.infrastructureGap +
      weights.populationImpact +
      weights.severity +
      weights.vulnerability +
      weights.urgency +
      weights.expectedImpact) * 100
  );

  const handleSliderChange = (key: keyof PriorityWeights, val: number) => {
    updateWeight(key, val / 100);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span>Governance Tuning</span>
            <span aria-hidden="true">·</span>
            <span>Algorithmic Transparency</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
            Priority Engine Weight Configuration
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Configure the explainable scoring formula weights used by CivicPulse AI to calculate development priority scores across all districts.
          </p>
        </div>

        <button
          onClick={resetWeights}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Formula Weights</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Formula weights updated! Demand Hotspot scores have recalculated in real time.</span>
        </div>
      )}

      {/* Weights Configuration Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-sm text-slate-900">Explainable Priority Formula Parameters</span>
          </div>
          <div className="text-xs font-mono font-bold">
            Total Weight: <span className={totalWeightPercent === 100 ? 'text-emerald-600' : 'text-amber-600'}>{totalWeightPercent}%</span>
            {totalWeightPercent !== 100 && (
              <span className="text-[10px] text-slate-400 font-normal ml-1">(Normalized automatically)</span>
            )}
          </div>
        </div>

        <div className="space-y-5">
          {weightDefinitions.map((item) => {
            const currentValPercent = Math.round(weights[item.key] * 100);
            return (
              <div key={item.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800">{item.label}</span>
                    <span className="text-[11px] text-slate-500 ml-2">— {item.desc}</span>
                  </div>
                  <span className="font-mono font-bold text-blue-700 text-sm">
                    {currentValPercent}%
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={5}
                    max={item.maxPercent}
                    step={1}
                    value={currentValPercent}
                    onChange={(e) => handleSliderChange(item.key, Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* System Status & AI Architecture Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Server className="w-4 h-4 text-blue-600" />
          <span>System Status & Model Architecture</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-slate-500 text-[11px]">Primary AI Model</div>
            <div className="font-bold text-slate-900 mt-0.5">Gemini 3.8 Flash</div>
            <div className="text-[10px] text-emerald-600 font-medium mt-1">Server-side proxy (/api/*)</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-slate-500 text-[11px]">Fallback Heuristic</div>
            <div className="font-bold text-slate-900 mt-0.5">Local GovTech Rules</div>
            <div className="text-[10px] text-blue-600 font-medium mt-1">Multi-lingual deterministic</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-slate-500 text-[11px]">Dataset Telemetry</div>
            <div className="font-bold text-slate-900 mt-0.5">{requests.length} Requests</div>
            <div className="text-[10px] text-purple-600 font-medium mt-1">25 Monitored Districts</div>
          </div>

        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>Need to reset demo state or wipe custom additions?</span>
          </div>

          <button
            onClick={() => {
              if (confirm('Reset citizen requests database to original 115 demo records and default weights?')) {
                resetToDefaults();
              }
            }}
            className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
          >
            Reset All Demo Data
          </button>
        </div>

      </div>

    </div>
  );
};
