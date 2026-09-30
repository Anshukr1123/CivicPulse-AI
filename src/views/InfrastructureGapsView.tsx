import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  Filter,
  BarChart3,
  TrendingDown,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export const InfrastructureGapsView: React.FC = () => {
  const { hotspots, setActiveTab, setSelectedHotspot } = useApp();

  const [selectedState, setSelectedState] = useState<string>('All');
  const [timePeriod, setTimePeriod] = useState<string>('FY 2025-26');

  const states = Array.from(new Set(hotspots.map(h => h.state))).sort();

  // Baseline Sector Gap vs Citizen Demand comparative data
  const sectorComparisonData = [
    {
      category: "Roads & Bridges",
      coverage: 42, // % covered
      deficit: 58,  // % gap
      citizenDemandIndex: 88, // 0-100
      capexNeededCr: 680,
    },
    {
      category: "Potable Water",
      coverage: 46,
      deficit: 54,
      citizenDemandIndex: 82,
      capexNeededCr: 540,
    },
    {
      category: "Primary Health",
      coverage: 39,
      deficit: 61,
      citizenDemandIndex: 79,
      capexNeededCr: 490,
    },
    {
      category: "Education & Labs",
      coverage: 52,
      deficit: 48,
      citizenDemandIndex: 65,
      capexNeededCr: 320,
    },
    {
      category: "Power Grid",
      coverage: 61,
      deficit: 39,
      citizenDemandIndex: 58,
      capexNeededCr: 280,
    },
    {
      category: "Digital Telecom",
      coverage: 48,
      deficit: 52,
      citizenDemandIndex: 71,
      capexNeededCr: 190,
    },
    {
      category: "Waste & Drainage",
      coverage: 34,
      deficit: 66,
      citizenDemandIndex: 74,
      capexNeededCr: 240,
    }
  ];

  // Radar chart representation
  const radarData = sectorComparisonData.map(s => ({
    subject: s.category.replace(' & Bridges', '').replace(' & Labs', '').replace(' Grid', ''),
    'Infra Deficit (%)': s.deficit,
    'Citizen Demand': s.citizenDemandIndex,
  }));

  // Trend over time (Quarterly monitoring)
  const quarterlyTrend = [
    { quarter: 'Q1 FY25', roadGap: 64, waterGap: 60, healthGap: 65 },
    { quarter: 'Q2 FY25', roadGap: 62, waterGap: 58, healthGap: 63 },
    { quarter: 'Q3 FY25', roadGap: 61, waterGap: 56, healthGap: 62 },
    { quarter: 'Q4 FY25', roadGap: 59, waterGap: 55, healthGap: 61 },
    { quarter: 'Q1 FY26', roadGap: 58, waterGap: 54, healthGap: 61 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span>Diagnostic Analytics</span>
            <span aria-hidden="true">·</span>
            <span>GIS Deficit Telemetry</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
            Infrastructure Gap vs. Citizen Demand Analysis
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Auditing official scheme coverage against grassroots citizen demand intensity across sectors.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="p-2 font-medium bg-white border border-slate-300 rounded-lg text-slate-800 shadow-xs focus:outline-none"
          >
            <option value="All">All 8 Monitored States</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="p-2 font-medium bg-white border border-slate-300 rounded-lg text-slate-800 shadow-xs focus:outline-none"
          >
            <option value="FY 2025-26">FY 2025-26 (Current)</option>
            <option value="FY 2024-25">FY 2024-25 (Audited)</option>
          </select>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Coverage vs Demand Bar Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Infrastructure Deficit vs. Citizen Demand</h2>
              <p className="text-xs text-slate-500">Correlation between measured physical gaps and citizen volume</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#64748b' }} interval={0} angle={-20} textAnchor="end" />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} domain={[0, 100]} />
                <Tooltip
                  formatter={(val: any, name: any) => [`${val}%`, name]}
                  contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="deficit" name="Infrastructure Deficit (%)" fill="#dc2626" radius={[4, 4, 0, 0]} />
                <Bar dataKey="citizenDemandIndex" name="Citizen Demand Index" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Comparison Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Multi-Dimensional Gap Profile</h2>
              <p className="text-xs text-slate-500">Cross-sector imbalance visualization</p>
            </div>
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#475569' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Infra Deficit (%)" dataKey="Infra Deficit (%)" stroke="#dc2626" fill="#dc2626" fillOpacity={0.25} />
                <Radar name="Citizen Demand" dataKey="Citizen Demand" stroke="#2563eb" fill="#2563eb" fillOpacity={0.25} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '5px' }} />
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Temporal Trend Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Historical Gap Reduction Velocity (5-Quarter Trend)</h2>
            <p className="text-xs text-slate-500">Tracking progress across high-deficit rural sectors</p>
          </div>
          <span className="text-[11px] font-mono text-slate-500">Baseline Target: &lt;20% Gap by 2030</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={quarterlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis domain={[40, 70]} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip formatter={(val: any) => [`${val}% Deficit`, 'Gap']} contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area type="monotone" dataKey="roadGap" name="Roads Deficit" stroke="#2563eb" fill="#dbeafe" />
              <Area type="monotone" dataKey="waterGap" name="Water Deficit" stroke="#059669" fill="#d1fae5" />
              <Area type="monotone" dataKey="healthGap" name="Healthcare Deficit" stroke="#d97706" fill="#fef3c7" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sector Capital Deficit Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Estimated Capital Outlay Required to Close Gaps
          </h3>
          <span className="text-xs font-mono text-slate-500">Total Est. Capex: ₹2,740 Cr</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-white text-slate-600 font-semibold">
                <th className="py-3 px-4">Sector</th>
                <th className="py-3 px-4 text-right">Physical Coverage</th>
                <th className="py-3 px-4 text-right">Unmet Deficit</th>
                <th className="py-3 px-4 text-right">Citizen Demand Score</th>
                <th className="py-3 px-4 text-right">Estimated Capex to Rectify</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sectorComparisonData.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{s.category}</td>
                  <td className="py-3 px-4 text-right tabular-nums text-slate-700">{s.coverage}%</td>
                  <td className="py-3 px-4 text-right tabular-nums font-bold text-red-600">{s.deficit}%</td>
                  <td className="py-3 px-4 text-right tabular-nums font-semibold text-blue-600">{s.citizenDemandIndex}/100</td>
                  <td className="py-3 px-4 text-right tabular-nums font-mono font-bold text-slate-900">₹{s.capexNeededCr} Cr</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setActiveTab('simulator')}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline"
                    >
                      Simulate In Simulator
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
