import React from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  ThumbsUp,
  ArrowDown,
  ArrowUp,
  Building2,
  Calendar,
  AlertCircle,
  FileCheck,
  ShieldCheck
} from 'lucide-react';

export const ImpactTrackingView: React.FC = () => {
  const { impactData, setActiveTab } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span>Accountability & Feedback Loop</span>
            <span aria-hidden="true">·</span>
            <span>Outcome Verification</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
            Post-Implementation Impact Tracking
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Measuring how completed public infrastructure projects translate into reduced citizen grievances and enhanced service quality.
          </p>
        </div>

        <div className="text-xs font-mono bg-blue-50 text-blue-800 px-3 py-1.5 rounded-lg border border-blue-200 self-start sm:self-auto">
          Audit Cycle: 2024–2026 Cohort
        </div>
      </div>

      {/* Prototype Disclosure Banner (mandated by prompt) */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold">Simulated Feedback Loop Disclosure: </span>
          Impact measurements shown in this prototype are simulated demonstration examples to showcase how the post-project feedback loop operates. In a live production deployment, these metrics would integrate verified post-project satellite audits, citizen grievance reduction logs, and third-party social audits.
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Projects Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 tabular-nums">
            18
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
            100% physically audited
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Projects In Progress</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 tabular-nums">
            42
          </div>
          <div className="text-[11px] text-blue-600 font-medium mt-0.5">
            Active civil construction
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Citizen Satisfaction</span>
            <ThumbsUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-indigo-700 tabular-nums">
            87%
          </div>
          <div className="text-[11px] text-indigo-600 font-medium mt-0.5">
            Via post-work IVR pulse surveys
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Avg Request Reduction</span>
            <ArrowDown className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-600 tabular-nums">
            -73.4%
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
            Within 12 months of handover
          </div>
        </div>

      </div>

      {/* Case Studies / Before & After Cards (as requested in prompt) */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <span>Evaluated Case Studies: Before & After Interventions</span>
          <span className="text-xs font-normal text-slate-500 font-mono">(3 Detailed Evaluations)</span>
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {impactData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6"
            >
              {/* Top Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{item.district}, {item.state}</span>
                    <span>·</span>
                    <span className="text-slate-500">{item.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">{item.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200 font-semibold">
                    {item.monitoringStatus}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Completed: {item.completionDate}
                  </span>
                </div>
              </div>

              {/* Before vs After Telemetry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                
                {/* 1. Citizen Requests Comparison */}
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-700">Citizen Requests Volume</div>
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">Before Work</div>
                      <div className="text-base font-extrabold text-slate-600 font-mono tabular-nums">
                        {item.requestsBefore.toLocaleString()}
                      </div>
                    </div>
                    <ArrowDown className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400">After Work</div>
                      <div className="text-base font-extrabold text-emerald-700 font-mono tabular-nums">
                        {item.requestsAfter.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold text-center pt-1 border-t border-slate-100">
                    {Math.round(((item.requestsBefore - item.requestsAfter) / item.requestsBefore) * 100)}% Request Reduction
                  </div>
                </div>

                {/* 2. Infrastructure Deficit Reduction */}
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-700">Infrastructure Deficit Gap</div>
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">Baseline Deficit</div>
                      <div className="text-base font-extrabold text-red-600 font-mono tabular-nums">
                        {item.gapBefore}%
                      </div>
                    </div>
                    <ArrowDown className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400">Post-Commissioning</div>
                      <div className="text-base font-extrabold text-emerald-700 font-mono tabular-nums">
                        {item.gapAfter}%
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold text-center pt-1 border-t border-slate-100">
                    -{item.gapBefore - item.gapAfter}% Absolute Deficit Cleared
                  </div>
                </div>

                {/* 3. Citizen Satisfaction & Beneficiaries */}
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-700">Verified Beneficiaries</div>
                  <div>
                    <div className="text-base font-extrabold text-blue-900 font-mono">
                      {item.beneficiaries}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Capital Invested: <span className="font-bold text-slate-900">₹{item.investmentCr} Cr</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-indigo-700 font-semibold text-center pt-1 border-t border-slate-100">
                    {item.satisfactionScore}% Citizen Satisfaction Rating
                  </div>
                </div>

              </div>

              {/* Key Verified Accomplishments */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Verified Audit Accomplishments:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
                  {item.keyAccomplishments.map((acc, aIdx) => (
                    <div key={aIdx} className="p-2.5 bg-slate-50 rounded border border-slate-200 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{acc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
