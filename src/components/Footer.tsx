import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Database, Award, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Principles & Trust Banners */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-8 border-b border-slate-800/80">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-slate-800 text-blue-400 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200">Explainable AI Scoring</div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                Priorities derive from transparent formula weights, not black-box automation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-slate-800 text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200">Mandated Human Oversight</div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                AI assists policy prioritization; state cabinets retain sole sanction authority.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-slate-800 text-indigo-400 shrink-0">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200">Data Minimization</div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                No personal citizen phone numbers or identities stored on public dashboards.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-slate-800 text-amber-400 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200">BRICS Innovation 2026</div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                Open, interoperable Digital Public Infrastructure for multilateral governance.
              </p>
            </div>
          </div>
        </div>

        {/* Links & Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span>© 2026 CivicPulse AI</span>
            <span>·</span>
            <button onClick={() => setActiveTab('data')} className="hover:text-slate-200 transition-colors">
              Data Governance & Methodology
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('settings')} className="hover:text-slate-200 transition-colors">
              Priority Weight Config
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('impact')} className="hover:text-slate-200 transition-colors">
              Impact Tracking Methodology
            </button>
          </div>

          <div className="text-slate-400 text-center md:text-right">
            <span>Prototype Demonstration: </span>
            <span className="font-mono text-slate-300">Synthetic Planning Datasets & Live Gemini Decision Model</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
