import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PriorityProject, DemandHotspot } from '../data/types';
import {
  FileCheck,
  Building2,
  Users,
  Layers,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Clock,
  Coins,
  FileText,
  Sliders
} from 'lucide-react';

export const PriorityProjectsView: React.FC = () => {
  const {
    projects,
    hotspots,
    setActiveProposalHotspot,
    setSelectedHotspot,
    setActiveTab
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredProjects = projects.filter((p) => {
    if (categoryFilter !== 'All' && !p.category.toLowerCase().includes(categoryFilter.toLowerCase())) {
      return false;
    }
    if (statusFilter !== 'All' && p.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const handleOpenProposal = (proj: PriorityProject) => {
    const matchingHotspot = hotspots.find(h => h.id === proj.hotspotId || h.district === proj.district) || {
      id: proj.hotspotId,
      district: proj.district,
      state: proj.state,
      category: proj.category,
      topIssue: proj.title,
      citizenRequests: proj.citizenRequests,
      highSeverityRequests: Math.round(proj.citizenRequests * 0.35),
      infrastructureGap: proj.infrastructureGap,
      population: proj.populationAffected,
      populationNumeric: 1200000,
      latitude: 22.5973,
      longitude: 75.3025,
      priorityScore: proj.priorityScore,
      breakdown: {
        citizenDemand: 18,
        infrastructureGap: 17,
        populationImpact: 13,
        severity: 14,
        vulnerability: 9,
        urgency: 10,
        expectedImpact: 10
      },
      rationale: proj.keyInterventions,
      estimatedCostCr: proj.estimatedInvestmentCr,
      vulnerabilityIndex: 8.5,
      urgencyIndex: 9.0
    } as DemandHotspot;

    setActiveProposalHotspot(matchingHotspot);
  };

  const handleViewEvidence = (proj: PriorityProject) => {
    const matchingHotspot = hotspots.find(h => h.id === proj.hotspotId || h.district === proj.district);
    if (matchingHotspot) {
      setSelectedHotspot(matchingHotspot);
    }
    setActiveTab('hotspots');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span>Project Pipeline</span>
            <span aria-hidden="true">·</span>
            <span>AI-Assisted Development Recommendations</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
            Priority Infrastructure Projects Portfolio
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Data-backed project recommendations generated from spatial demand clusters and infrastructure deficits.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 font-medium bg-white border border-slate-300 rounded-lg text-slate-800 shadow-xs focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Road">Roads & Bridges</option>
            <option value="Water">Drinking Water</option>
            <option value="Health">Healthcare Facilities</option>
            <option value="Education">Education & Skills</option>
            <option value="Digital">Digital & Telecom</option>
            <option value="Drainage">Drainage & Waste</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 font-medium bg-white border border-slate-300 rounded-lg text-slate-800 shadow-xs focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Prioritized">Prioritized</option>
            <option value="Cabinet Sanctioned">Cabinet Sanctioned</option>
            <option value="In Consultation">In Consultation</option>
            <option value="Recommended">Recommended</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div>
              
              {/* Card Top: District, Category & Priority Score */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{proj.district}, {proj.state}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500">{proj.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">
                    {proj.title}
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[10px] uppercase font-semibold text-slate-400">
                    AI Priority
                  </div>
                  <div className={`text-xl font-bold font-mono tabular-nums ${
                    proj.priorityScore >= 85 ? 'text-red-600' : 'text-amber-600'
                  }`}>
                    {proj.priorityScore}/100
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 py-3 text-xs border-b border-slate-100">
                <div>
                  <div className="text-[10px] text-slate-500">Citizen Requests</div>
                  <div className="font-bold text-slate-900 font-mono mt-0.5">
                    {proj.citizenRequests.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Affected Pop.</div>
                  <div className="font-bold text-slate-900 font-mono mt-0.5">
                    {proj.populationAffected}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Infra Deficit</div>
                  <div className="font-bold text-amber-700 font-mono mt-0.5">
                    {proj.infrastructureGap}%
                  </div>
                </div>
              </div>

              {/* Interventions */}
              <div className="py-2 space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Key Scope of Interventions:
                </div>
                <ul className="space-y-1 text-xs text-slate-600">
                  {proj.keyInterventions.map((it, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline & Budget Outlay */}
              <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-mono">
                  <Coins className="w-3.5 h-3.5 text-emerald-600" />
                  Est. Outlay: <strong className="text-slate-900">₹{proj.estimatedInvestmentCr} Cr</strong>
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  Timeline: <strong className="text-slate-900">{proj.targetTimelineMonths} Months</strong>
                </span>
              </div>

            </div>

            {/* Action Buttons: View Evidence, Generate Proposal, Simulate Impact */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleViewEvidence(proj)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                View Evidence
              </button>

              <button
                onClick={() => handleOpenProposal(proj)}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Generate Proposal</span>
              </button>

              <button
                onClick={() => setActiveTab('simulator')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors ml-auto flex items-center gap-1"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Simulate Impact</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
