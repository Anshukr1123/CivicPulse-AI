import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Database,
  ShieldCheck,
  Lock,
  Eye,
  FileCheck,
  Server,
  Layers,
  Users,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const DataSourcesView: React.FC = () => {
  const { dataSources } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span>Data Provenance & Governance</span>
            <span aria-hidden="true">·</span>
            <span>Transparent Methodology</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
            Data Sources, Schemas & Trust Constitution
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Cataloging data feeds, provenance standards, and privacy protections underpinning CivicPulse AI.
          </p>
        </div>

        <div className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-300 self-start sm:self-auto">
          DPI Governance Standard v1.2
        </div>
      </div>

      {/* 5 Core Data Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-slate-900">Citizen Data</div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Multilingual voice and text submissions ingested via open DPI gateways with automated PII masking.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-slate-900">Demographic Data</div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Census projections, SC/ST tribal share, agricultural dependency, and rural poverty vulnerability indices.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Server className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-slate-900">Infrastructure Data</div>
          <p className="text-xs text-slate-500 leading-relaxed">
            GIS audits from PMGSY core road networks, Jal Jeevan Mission tap registers, and National Health Mission MIS.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <FileCheck className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-slate-900">Public Investment</div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Sanctioned capital outlays, National Infrastructure Pipeline tranches, and unallocated fund windows.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2 col-span-1 md:col-span-3 lg:col-span-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Database className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-slate-900">Geographic Data</div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Survey of India administrative boundary shapes, watershed contours, and seasonal flood hazard vectors.
          </p>
        </div>

      </div>

      {/* Data Catalog Table (as requested in Section 19) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Integrated Data Registry Catalog</h2>
          <span className="text-xs font-mono text-slate-500">6 Registered Ingestion Feeds</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-white text-slate-600 font-semibold">
                <th className="py-3 px-4">Dataset Name</th>
                <th className="py-3 px-4">Data Type</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Update Cadence</th>
                <th className="py-3 px-4">Coverage</th>
                <th className="py-3 px-4">Status / Provenance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dataSources.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{s.name}</div>
                    <div className="text-[11px] text-slate-500 font-normal mt-0.5">{s.notes}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">{s.type}</td>
                  <td className="py-3.5 px-4 font-semibold text-blue-900">{s.category}</td>
                  <td className="py-3.5 px-4 text-slate-700">{s.updateFrequency}</td>
                  <td className="py-3.5 px-4 text-slate-600">{s.coverage}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Privacy and Trust Section (Section 21) */}
      <div className="bg-slate-900 text-white rounded-xl p-8 border border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Trust & Compliance Architecture
          </span>
          <h2 className="text-xl font-bold mt-1 text-white">
            Civic Privacy, Ethical AI & Governance Principles
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Adhering to strict Digital Public Infrastructure governance standards to ensure equitable citizen voice and prevent algorithmic bias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <div className="bg-slate-850 p-4 rounded-lg border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-300">
              <Lock className="w-4 h-4" />
              <span>Data Minimization</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              No citizen phone numbers, Aadhaar numbers, or names appear on any public or policymaker dashboard.
            </p>
          </div>

          <div className="bg-slate-850 p-4 rounded-lg border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-300">
              <Eye className="w-4 h-4" />
              <span>Explainable AI (XAI)</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Every priority recommendation displays its exact parametric factor weights. Zero opaque black-box models.
            </p>
          </div>

          <div className="bg-slate-850 p-4 rounded-lg border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <ShieldCheck className="w-4 h-4" />
              <span>Human-in-the-Loop</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              AI provides decision-support rankings. Public works sanctions require mandatory human administrative inspection.
            </p>
          </div>

          <div className="bg-slate-850 p-4 rounded-lg border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-purple-300">
              <FileCheck className="w-4 h-4" />
              <span>Auditability & Traceability</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Every synthesized proposal traces back to specific citizen voice clusters, GIS shapefiles, and demographic audits.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
