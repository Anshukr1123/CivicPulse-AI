import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CitizenRequest } from '../data/types';
import {
  Search,
  Filter,
  Users,
  Calendar,
  MapPin,
  Globe,
  Tag,
  AlertTriangle,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';

export const RequestsListView: React.FC = () => {
  const { requests, setActiveTab, setSelectedHotspot, hotspots } = useApp();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [stateFilter, setStateFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRecord, setSelectedRecord] = useState<CitizenRequest | null>(null);

  const pageSize = 15;

  // Filter requests
  const filtered = requests.filter((r) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match =
        r.id.toLowerCase().includes(q) ||
        r.request.toLowerCase().includes(q) ||
        r.normalizedIssue.toLowerCase().includes(q) ||
        r.district.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (categoryFilter !== 'All' && r.category !== categoryFilter) return false;
    if (severityFilter !== 'All' && r.severity !== severityFilter) return false;
    if (stateFilter !== 'All' && r.state !== stateFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const states = Array.from(new Set(requests.map((r) => r.state))).sort();
  const categories = Array.from(new Set(requests.map((r) => r.category))).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span>DPI Telemetry Registry</span>
            <span aria-hidden="true">·</span>
            <span>Multilingual Database</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
            Citizen Development Requests Database
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Displaying {requests.length.toLocaleString()} verified citizen submissions across 25 aspirational districts.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('citizen')}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Submit New Request</span>
        </button>
      </div>

      {/* Synthetic Dataset Disclaimer */}
      <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[10px] uppercase px-1.5 py-0.5 bg-blue-200 text-blue-800 rounded">
            Prototype Data
          </span>
          <span>
            Citizen requests and phone data are 100% synthetic demonstration models structured according to open DPI schemas.
          </span>
        </div>
        <span className="text-[11px] font-mono text-blue-700">Total: {requests.length} records</span>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Search Input */}
        <div className="relative grow sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by keyword, district, or ID..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 font-medium bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none text-xs"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={severityFilter}
            onChange={(e) => {
              setSeverityFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 font-medium bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none text-xs"
          >
            <option value="All">All Severities</option>
            <option value="High">High Severity</option>
            <option value="Medium">Medium Severity</option>
            <option value="Low">Low Severity</option>
          </select>

          <select
            value={stateFilter}
            onChange={(e) => {
              setStateFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 font-medium bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none text-xs"
          >
            <option value="All">All States</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

        </div>

      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-4">Request ID & Date</th>
                <th className="py-3 px-4">Citizen Voice / Text</th>
                <th className="py-3 px-4">Category & Issue</th>
                <th className="py-3 px-4">District & State</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-mono font-bold text-slate-900">{r.id}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <span>{r.date}</span>
                      <span>·</span>
                      <span className="font-mono">{r.language}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="line-clamp-2 text-slate-800 text-xs italic">
                      "{r.request}"
                    </p>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-blue-900">{r.category}</div>
                    <div className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">{r.normalizedIssue}</div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-900">{r.district}</div>
                    <div className="text-[11px] text-slate-500">{r.state}</div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      r.severity === 'High'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : r.severity === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {r.severity}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="text-[11px] text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {r.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => setSelectedRecord(r)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded border border-blue-200 transition-colors"
                    >
                      Inspect
                    </button>
                  </td>

                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No citizen requests found matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>
            Showing <span className="font-semibold">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-semibold">{Math.min(currentPage * pageSize, filtered.length)}</span> of{' '}
            <span className="font-semibold">{filtered.length}</span> requests
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal for Selected Record */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-600">DPI Record Detail</span>
                <h3 className="font-bold text-slate-900 text-base">{selectedRecord.id}</h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="text-[11px] font-semibold text-slate-500">Original Citizen Submission ({selectedRecord.language})</div>
                <p className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 italic mt-1 leading-relaxed">
                  "{selectedRecord.request}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                  <div className="text-[10px] text-slate-500">Category</div>
                  <div className="font-bold text-slate-900">{selectedRecord.category}</div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                  <div className="text-[10px] text-slate-500">Severity</div>
                  <div className="font-bold text-red-600">{selectedRecord.severity}</div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                  <div className="text-[10px] text-slate-500">District & State</div>
                  <div className="font-bold text-slate-900">{selectedRecord.district}, {selectedRecord.state}</div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                  <div className="text-[10px] text-slate-500">Confidence Score</div>
                  <div className="font-bold font-mono text-slate-900">{Math.round(selectedRecord.confidence * 100)}%</div>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-slate-500">Normalized Civic Issue</div>
                <p className="font-medium text-slate-800 mt-0.5">{selectedRecord.normalizedIssue}</p>
              </div>

              {selectedRecord.affectedServices && (
                <div>
                  <div className="text-[11px] font-semibold text-slate-500">Affected Public Services</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedRecord.affectedServices.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100 text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  const match = hotspots.find(h => h.district === selectedRecord.district);
                  if (match) setSelectedHotspot(match);
                  setSelectedRecord(null);
                  setActiveTab('hotspots');
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline"
              >
                View {selectedRecord.district} in Demand Hotspots
              </button>

              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
