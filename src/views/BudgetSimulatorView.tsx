import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sliders,
  Coins,
  TrendingUp,
  Users,
  Layers,
  MapPin,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Building2,
  ArrowRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export const BudgetSimulatorView: React.FC = () => {
  const { setActiveTab } = useApp();

  // Simulation Controls
  const [totalBudgetCr, setTotalBudgetCr] = useState<number>(500); // Default ₹500 Cr as specified in hackathon flow!
  const [objective, setObjective] = useState<'balanced' | 'population' | 'gaps' | 'demand'>('balanced');
  
  // Sector priority toggles
  const [enabledSectors, setEnabledSectors] = useState<Record<string, boolean>>({
    'Road Infrastructure': true,
    'Healthcare Facilities': true,
    'Drinking Water & Sanitation': true,
    'Education & Skill Development': true,
    'Digital Infrastructure': true,
    'Public Transportation': true,
  });

  const toggleSector = (sec: string) => {
    setEnabledSectors(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Run simulation & calculate allocation
  const calculateAllocation = () => {
    // Weights based on objective
    let weights: Record<string, number> = {
      'Road Infrastructure': 0.32,
      'Healthcare Facilities': 0.26,
      'Drinking Water & Sanitation': 0.20,
      'Education & Skill Development': 0.12,
      'Digital Infrastructure': 0.06,
      'Public Transportation': 0.04,
    };

    if (objective === 'population') {
      weights = {
        'Road Infrastructure': 0.28,
        'Healthcare Facilities': 0.28,
        'Drinking Water & Sanitation': 0.22,
        'Education & Skill Development': 0.14,
        'Digital Infrastructure': 0.05,
        'Public Transportation': 0.03,
      };
    } else if (objective === 'gaps') {
      weights = {
        'Road Infrastructure': 0.36,
        'Healthcare Facilities': 0.25,
        'Drinking Water & Sanitation': 0.24,
        'Education & Skill Development': 0.08,
        'Digital Infrastructure': 0.04,
        'Public Transportation': 0.03,
      };
    } else if (objective === 'demand') {
      weights = {
        'Road Infrastructure': 0.38,
        'Drinking Water & Sanitation': 0.25,
        'Healthcare Facilities': 0.20,
        'Digital Infrastructure': 0.08,
        'Education & Skill Development': 0.05,
        'Public Transportation': 0.04,
      };
    }

    // Filter by enabled sectors and normalize
    const activeWeights: Record<string, number> = {};
    let totalWeight = 0;
    for (const [sec, w] of Object.entries(weights)) {
      if (enabledSectors[sec]) {
        activeWeights[sec] = w;
        totalWeight += w;
      }
    }

    const allocation: Array<{ sector: string; amountCr: number; percent: number; color: string }> = [];
    const colors: Record<string, string> = {
      'Road Infrastructure': '#2563eb',
      'Healthcare Facilities': '#dc2626',
      'Drinking Water & Sanitation': '#059669',
      'Education & Skill Development': '#8b5cf6',
      'Digital Infrastructure': '#0891b2',
      'Public Transportation': '#f59e0b',
    };

    for (const [sec, w] of Object.entries(activeWeights)) {
      const normalizedRatio = w / (totalWeight || 1);
      const allocatedCr = Math.round(totalBudgetCr * normalizedRatio);
      allocation.push({
        sector: sec.replace(' Infrastructure', '').replace(' Facilities', '').replace(' & Skill Development', ''),
        amountCr: allocatedCr,
        percent: Math.round(normalizedRatio * 100),
        color: colors[sec] || '#64748b'
      });
    }

    // Impact projections (parametric model)
    const multiplier = totalBudgetCr / 500;
    const estBeneficiariesM = Number((2.8 * Math.pow(multiplier, 0.85)).toFixed(1));
    const gapReductionPercent = Math.min(32, Math.round(14 * Math.pow(multiplier, 0.75)));
    const regionsAddressed = Math.min(25, Math.round(17 * Math.pow(multiplier, 0.65)));

    return {
      portfolio: allocation,
      estBeneficiariesM,
      gapReductionPercent,
      regionsAddressed,
    };
  };

  const [simResults, setSimResults] = useState(calculateAllocation());

  const handleRunSimulation = () => {
    setSimResults(calculateAllocation());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span>Capital Optimization</span>
            <span aria-hidden="true">·</span>
            <span>Scenario Modeling</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
            Development Investment Simulator
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Simulate public capital allocation against citizen demand clusters to forecast beneficiary yields and infrastructure gap reduction.
          </p>
        </div>

        <button
          onClick={handleRunSimulation}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Run Simulation</span>
        </button>
      </div>

      {/* Main Controls + Results Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controls Column */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          
          {/* Budget Slider */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900">Total Capital Budget</label>
              <span className="font-mono text-base font-extrabold text-blue-600">
                ₹{totalBudgetCr} Cr
              </span>
            </div>
            
            <input
              type="range"
              min={100}
              max={1000}
              step={50}
              value={totalBudgetCr}
              onChange={(e) => setTotalBudgetCr(Number(e.target.value))}
              className="w-full mt-3 accent-blue-600 cursor-pointer"
            />

            <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
              <span>₹100 Cr</span>
              <span>₹500 Cr (Demo Target)</span>
              <span>₹1,000 Cr</span>
            </div>

            {/* Preset Buttons */}
            <div className="flex gap-2 mt-3">
              {[250, 500, 750, 1000].map((b) => (
                <button
                  key={b}
                  onClick={() => setTotalBudgetCr(b)}
                  className={`text-[11px] font-mono px-2 py-1 rounded border ${
                    totalBudgetCr === b
                      ? 'bg-blue-50 border-blue-400 text-blue-700 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  ₹{b} Cr
                </button>
              ))}
            </div>
          </div>

          {/* Optimization Objective Selector */}
          <div>
            <label className="text-xs font-bold text-slate-900 block mb-2">
              Optimization Objective
            </label>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'balanced', label: 'Balanced Allocation', desc: 'Even distribution across top deficits' },
                { id: 'population', label: 'Maximize Population Impact', desc: 'Weights large demographic centers' },
                { id: 'gaps', label: 'Reduce Infrastructure Gaps', desc: 'Focuses on highest percentage shortfalls' },
                { id: 'demand', label: 'Address Highest Citizen Demand', desc: 'Prioritizes citizen submission counts' },
              ].map((obj) => (
                <label
                  key={obj.id}
                  className={`flex items-start gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                    objective === obj.id
                      ? 'bg-blue-50/70 border-blue-300 text-blue-950 font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="objective"
                    value={obj.id}
                    checked={objective === obj.id}
                    onChange={() => setObjective(obj.id as any)}
                    className="mt-0.5 accent-blue-600"
                  />
                  <div>
                    <div className="font-semibold text-xs">{obj.label}</div>
                    <div className="text-[11px] text-slate-500">{obj.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Priority Categories Toggles */}
          <div>
            <label className="text-xs font-bold text-slate-900 block mb-2">
              Included Infrastructure Sectors
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.keys(enabledSectors).map((sec) => (
                <button
                  key={sec}
                  onClick={() => toggleSector(sec)}
                  className={`p-2 rounded text-left text-[11px] border transition-colors ${
                    enabledSectors[sec]
                      ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                  }`}
                >
                  {sec.replace(' Infrastructure', '').replace(' Facilities', '').replace(' & Skill Development', '')}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results & Projected Impact Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Top 3 Projected Impact Indicator Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-medium">Estimated Beneficiaries</span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="mt-2 text-2xl font-extrabold text-slate-900 tabular-nums">
                {simResults.estBeneficiariesM} Million
              </div>
              <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
                Direct & indirect residents reached
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-medium">Infra Gap Reduction</span>
                <Layers className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-2 text-2xl font-extrabold text-emerald-600 tabular-nums">
                -{simResults.gapReductionPercent}%
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                Against baseline aspirational deficit
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-medium">High-Priority Hotspots</span>
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>
              <div className="mt-2 text-2xl font-extrabold text-purple-700 tabular-nums">
                {simResults.regionsAddressed} Districts
              </div>
              <div className="text-[11px] text-purple-600 font-medium mt-0.5">
                Addressed within capital envelope
              </div>
            </div>

          </div>

          {/* Allocation Portfolio Breakdown Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Simulated Portfolio Allocation
                </h3>
                <p className="text-xs text-slate-500">
                  Recommended budget distribution for ₹{totalBudgetCr} Crore
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                Total: ₹{totalBudgetCr} Cr
              </span>
            </div>

            {/* Allocation Rows */}
            <div className="space-y-3">
              {simResults.portfolio.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{item.sector}</span>
                    <span className="font-mono font-bold text-slate-900">
                      ₹{item.amountCr} Cr <span className="text-slate-400 font-normal">({item.percent}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Note & Action */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Simulated planning projections based on historical public capex unit costs.</span>
              </div>

              <button
                onClick={() => setActiveTab('projects')}
                className="px-3.5 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View Priority Projects Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
