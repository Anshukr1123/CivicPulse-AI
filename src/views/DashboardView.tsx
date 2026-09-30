import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  MapPin,
  Layers,
  FileCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Clock,
  Filter,
  CheckCircle2,
  Sliders,
  Building
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

export const DashboardView: React.FC = () => {
  const { requests, hotspots, setActiveTab, setSelectedHotspot, recentlyAddedId, clearRecentNotification } = useApp();

  // Animated KPI Counters
  const [citizenRequestsCount, setCitizenRequestsCount] = useState<number>(2418520);
  const [locationsCount, setLocationsCount] = useState<number>(18420);
  const [gapsCount, setGapsCount] = useState<number>(8214);
  const [projectsCount, setProjectsCount] = useState<number>(1287);
  const [popImpactCount, setPopImpactCount] = useState<number>(28.4);

  useEffect(() => {
    // Add dynamically added requests to KPI counter
    setCitizenRequestsCount(2418520 + (requests.length - 115));
  }, [requests.length]);

  // Aggregate Category Data for charts
  const categoryCounts: Record<string, number> = {};
  for (const r of requests) {
    categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
  }

  const categoryChartData = Object.entries(categoryCounts).map(([name, count]) => ({
    name: name.replace(' Infrastructure', '').replace(' Facilities', '').replace(' & Power Grid', '').replace(' & Sanitation', ''),
    fullName: name,
    requests: count * 184, // scaled for realistic display
  })).sort((a, b) => b.requests - a.requests);

  // Severity Data for Donut Chart
  const highSev = requests.filter(r => r.severity === 'High').length;
  const medSev = requests.filter(r => r.severity === 'Medium').length;
  const lowSev = requests.filter(r => r.severity === 'Low').length;

  const severityChartData = [
    { name: 'High Severity', value: highSev, color: '#dc2626' },
    { name: 'Medium Severity', value: medSev, color: '#f59e0b' },
    { name: 'Low Severity', value: lowSev, color: '#3b82f6' },
  ];

  const topHotspots = [...hotspots].slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span>National DPI Governance Dashboard</span>
            <span aria-hidden="true">·</span>
            <span>Decision Support Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            CivicPulse AI — Development Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Synthesizing multilingual citizen requests, demographic vulnerability indices, and public infrastructure coverage gaps.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('hotspots')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <MapPin className="w-4 h-4" />
            <span>Demand Hotspots</span>
          </button>
          
          <button
            onClick={() => setActiveTab('assistant')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Ask Policy AI</span>
          </button>
        </div>
      </div>

      {/* New Request Live Notification Banner */}
      {recentlyAddedId && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-900 animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Request Logged:</strong> Citizen request <code>#{recentlyAddedId}</code> has been indexed into live demand telemetry and recalculated into district priority scores.
            </span>
          </div>
          <button
            onClick={clearRecentNotification}
            className="text-emerald-700 hover:text-emerald-900 font-semibold ml-2 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 5 KPI Top Cards (with animated tabular figures) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Citizen Requests</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {(citizenRequestsCount / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
              +14.2% verified this quarter
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Locations Analysed</span>
            <MapPin className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {locationsCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              25 Monitored Aspirational Districts
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Infrastructure Gaps</span>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {gapsCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-amber-600 font-medium mt-0.5">
              58.4% avg baseline gap
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Priority Projects</span>
            <FileCheck className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {projectsCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-purple-600 font-medium mt-0.5">
              AI-generated project dockets
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Est. Population Impact</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {popImpactCount}M
            </div>
            <div className="text-[11px] text-indigo-600 font-medium mt-0.5">
              Direct and indirect beneficiaries
            </div>
          </div>
        </div>

      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category Demand Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Citizen Demand by Infrastructure Category</h2>
              <p className="text-xs text-slate-500">Multilingual submissions aggregated across monitored sectors</p>
            </div>
            <span className="text-[11px] font-mono text-slate-500">Volume</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} interval={0} angle={-25} textAnchor="end" />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip
                  formatter={(val: any) => [`${Number(val).toLocaleString()} requests`, 'Citizen Demand']}
                  contentStyle={{ fontSize: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
                <Bar dataKey="requests" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Donut Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Urgency & Severity Mix</h2>
              <p className="text-xs text-slate-500">Assessed risk to public safety and health</p>
            </div>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {severityChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any, name: any) => [`${val} requests in sample`, name]}
                  contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
            <div>
              <div className="text-xs font-bold text-red-600">{Math.round((highSev / requests.length) * 100)}%</div>
              <div className="text-[10px] text-slate-500">High Risk</div>
            </div>
            <div>
              <div className="text-xs font-bold text-amber-600">{Math.round((medSev / requests.length) * 100)}%</div>
              <div className="text-[10px] text-slate-500">Medium</div>
            </div>
            <div>
              <div className="text-xs font-bold text-blue-600">{Math.round((lowSev / requests.length) * 100)}%</div>
              <div className="text-[10px] text-slate-500">Standard</div>
            </div>
          </div>
        </div>

      </div>

      {/* Top Priority Demand Hotspots Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              Decision Support Priority Ranking
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Top Demand Hotspots Requiring Interventions
            </h2>
          </div>
          
          <button
            onClick={() => setActiveTab('hotspots')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Hotspots on Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-4">District / State</th>
                <th className="py-3 px-4">Primary Category</th>
                <th className="py-3 px-4 text-right">Citizen Requests</th>
                <th className="py-3 px-4 text-right">Infra Deficit</th>
                <th className="py-3 px-4 text-right">Affected Pop.</th>
                <th className="py-3 px-4 text-center">AI-assisted Score</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topHotspots.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{h.district}</div>
                    <div className="text-[11px] text-slate-500">{h.state}</div>
                  </td>
                  
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    <div>{h.category}</div>
                    <div className="text-[10px] text-slate-500 truncate max-w-xs">{h.topIssue}</div>
                  </td>

                  <td className="py-3.5 px-4 text-right tabular-nums font-semibold text-slate-900">
                    {h.citizenRequests.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 text-right tabular-nums font-semibold text-amber-700">
                    {h.infrastructureGap}%
                  </td>

                  <td className="py-3.5 px-4 text-right tabular-nums text-slate-700">
                    {h.population}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded font-mono font-bold text-xs ${
                      h.priorityScore >= 85
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {h.priorityScore}/100
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedHotspot(h);
                        setActiveTab('hotspots');
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded border border-blue-200 transition-colors"
                    >
                      Inspect Evidence
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div
          onClick={() => setActiveTab('simulator')}
          className="bg-slate-900 text-white rounded-xl p-5 hover:bg-slate-850 cursor-pointer transition-all border border-slate-800 flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-semibold text-blue-400">Policy Tool</div>
            <div className="text-sm font-bold text-white mt-0.5">Budget Allocation Simulator</div>
            <p className="text-xs text-slate-400 mt-1">Simulate ₹100 Cr – ₹1,000 Cr capital yields.</p>
          </div>
          <Sliders className="w-5 h-5 text-blue-400 shrink-0 ml-3" />
        </div>

        <div
          onClick={() => setActiveTab('assistant')}
          className="bg-slate-900 text-white rounded-xl p-5 hover:bg-slate-850 cursor-pointer transition-all border border-slate-800 flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-semibold text-blue-400">Decision Intelligence</div>
            <div className="text-sm font-bold text-white mt-0.5">AI Policy Assistant</div>
            <p className="text-xs text-slate-400 mt-1">Ask questions on health, roads, and investments.</p>
          </div>
          <Sparkles className="w-5 h-5 text-blue-400 shrink-0 ml-3" />
        </div>

        <div
          onClick={() => setActiveTab('impact')}
          className="bg-slate-900 text-white rounded-xl p-5 hover:bg-slate-850 cursor-pointer transition-all border border-slate-800 flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-semibold text-blue-400">Accountability</div>
            <div className="text-sm font-bold text-white mt-0.5">Impact Tracking Loop</div>
            <p className="text-xs text-slate-400 mt-1">Examine before & after metrics on completed works.</p>
          </div>
          <TrendingUp className="w-5 h-5 text-blue-400 shrink-0 ml-3" />
        </div>

      </div>

    </div>
  );
};
