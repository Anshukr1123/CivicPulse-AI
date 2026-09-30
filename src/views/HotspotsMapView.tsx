import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { DemandHotspot } from '../data/types';
import L from 'leaflet';
import {
  MapPin,
  Filter,
  Layers,
  Users,
  AlertTriangle,
  FileText,
  Sliders,
  Sparkles,
  Info,
  Building,
  CheckCircle2,
  X
} from 'lucide-react';

export const HotspotsMapView: React.FC = () => {
  const {
    hotspots,
    selectedHotspot,
    setSelectedHotspot,
    setActiveProposalHotspot,
    setActiveTab,
    weights
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [stateFilter, setStateFilter] = useState<string>('All');
  const [showMethodology, setShowMethodology] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Filtered hotspots
  const filteredHotspots = hotspots.filter((h) => {
    if (categoryFilter !== 'All' && !h.category.toLowerCase().includes(categoryFilter.toLowerCase())) {
      return false;
    }
    if (stateFilter !== 'All' && h.state !== stateFilter) {
      return false;
    }
    if (severityFilter === 'High' && h.priorityScore < 85) return false;
    if (severityFilter === 'Medium' && (h.priorityScore < 75 || h.priorityScore >= 85)) return false;
    if (severityFilter === 'Low' && h.priorityScore >= 75) return false;
    return true;
  });

  const states = Array.from(new Set(hotspots.map((h) => h.state))).sort();

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Centered on Central India
      const map = L.map(mapContainerRef.current, {
        center: [21.5, 78.9],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors | CivicPulse AI GovTech',
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when filter or hotspot data changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    filteredHotspots.forEach((h) => {
      // Color-coding based on AI-assisted Priority Score
      const isHigh = h.priorityScore >= 85;
      const isMed = h.priorityScore >= 75 && h.priorityScore < 85;
      const markerColor = isHigh ? '#dc2626' : isMed ? '#f59e0b' : '#2563eb';

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background-color: ${markerColor};
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 11px;
            font-family: 'JetBrains Mono', monospace;
            font-weight: 700;
          ">
            ${h.priorityScore}
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([h.latitude, h.longitude], { icon: customIcon });

      marker.on('click', () => {
        setSelectedHotspot(h);
      });

      marker.bindPopup(`
        <div style="padding: 10px; font-family: 'Plus Jakarta Sans', sans-serif;">
          <div style="font-weight: 700; font-size: 13px; color: #0f172a;">${h.district}, ${h.state}</div>
          <div style="font-size: 11px; color: #2563eb; margin-top: 2px; font-weight: 600;">${h.category}</div>
          <div style="font-size: 11px; color: #475569; margin-top: 4px;">Top: ${h.topIssue}</div>
          <div style="margin-top: 8px; font-size: 11px; border-top: 1px solid #e2e8f0; padding-top: 6px;">
            <span>Citizen Requests: <strong>${h.citizenRequests.toLocaleString()}</strong></span><br/>
            <span>AI-assisted Priority Score: <strong>${h.priorityScore}/100</strong></span>
          </div>
        </div>
      `);

      markersLayerRef.current?.addLayer(marker);
    });
  }, [filteredHotspots]);

  // Pan to selected hotspot
  useEffect(() => {
    if (selectedHotspot && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([selectedHotspot.latitude, selectedHotspot.longitude], 8, {
        duration: 1.2,
      });
    }
  }, [selectedHotspot]);

  const active = selectedHotspot || hotspots[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span>Spatial Decision Support</span>
            <span aria-hidden="true">·</span>
            <span>Cluster Detection</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
            Demand Hotspot Map & Geographic Priority Clustering
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Visualizing clustered citizen requests combined with baseline infrastructure deficit layers.
          </p>
        </div>

        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 self-start md:self-auto"
        >
          <Info className="w-4 h-4 text-blue-600" />
          <span>View Priority Methodology</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-1.5 font-medium bg-slate-50 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 text-slate-800"
          >
            <option value="All">All Categories</option>
            <option value="Road">Roads & Bridges</option>
            <option value="Water">Drinking Water & Sanitation</option>
            <option value="Healthcare">Healthcare Facilities</option>
            <option value="Education">Education & Skills</option>
            <option value="Electricity">Electricity & Power</option>
            <option value="Digital">Digital & Telecom</option>
            <option value="Transport">Public Transport</option>
            <option value="Drainage">Waste & Drainage</option>
          </select>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="p-1.5 font-medium bg-slate-50 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 text-slate-800"
          >
            <option value="All">All Priority Bands</option>
            <option value="High">High Priority (&gt;= 85)</option>
            <option value="Medium">Medium Priority (75-84)</option>
            <option value="Low">Standard Priority (&lt; 75)</option>
          </select>

          {/* State Filter */}
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="p-1.5 font-medium bg-slate-50 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 text-slate-800"
          >
            <option value="All">All Monitored States</option>
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span>High Priority (&ge;85)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Medium (75-84)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span>Moderate (&lt;75)</span>
          </div>
        </div>

      </div>

      {/* Methodology Explanation Banner (Collapsible) */}
      {showMethodology && (
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl space-y-3 text-xs text-blue-950 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-blue-200/80 pb-2">
            <div className="font-bold flex items-center gap-2 text-sm text-blue-900">
              <Info className="w-4 h-4 text-blue-600" />
              <span>CivicPulse Priority Engine Methodology</span>
            </div>
            <button
              onClick={() => setShowMethodology(false)}
              className="text-blue-700 hover:text-blue-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="leading-relaxed">
            The <strong>AI-assisted Priority Score</strong> is an explainable decision-support metric engineered to guide resource allocation. It does not dictate government sanctions.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-2.5 bg-white rounded border border-blue-200">
              <div className="font-bold text-slate-900">Citizen Demand (20%)</div>
              <div className="text-[11px] text-slate-500">Volume & recurrence of citizen requests</div>
            </div>
            <div className="p-2.5 bg-white rounded border border-blue-200">
              <div className="font-bold text-slate-900">Infrastructure Gap (20%)</div>
              <div className="text-[11px] text-slate-500">PMGSY/JJM/HMIS baseline deficits</div>
            </div>
            <div className="p-2.5 bg-white rounded border border-blue-200">
              <div className="font-bold text-slate-900">Population Impact (15%)</div>
              <div className="text-[11px] text-slate-500">Beneficiary reach & density</div>
            </div>
            <div className="p-2.5 bg-white rounded border border-blue-200">
              <div className="font-bold text-slate-900">Severity & Risk (15%)</div>
              <div className="text-[11px] text-slate-500">Health hazard & emergency cutoff</div>
            </div>
          </div>
          <p className="text-[11px] text-blue-800">
            *You can fine-tune these formula weights in <strong>Settings</strong> to simulate policy scenarios.
          </p>
        </div>
      )}

      {/* Main Map + Detailed Evidence Panel Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Leaflet Map Container */}
        <div className="lg:col-span-2 bg-slate-100 rounded-xl border border-slate-200 shadow-xs overflow-hidden relative min-h-[500px] flex flex-col">
          <div ref={mapContainerRef} className="w-full h-full min-h-[500px] grow" />
          <div className="p-2 bg-white/95 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between px-4 z-20">
            <span>Showing {filteredHotspots.length} Demand Hotspots</span>
            <span>Click any marker to inspect evidence and generate proposals</span>
          </div>
        </div>

        {/* Detailed Hotspot Evidence Panel (Requirements matching prompt) */}
        {active && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5 flex flex-col justify-between">
            
            <div className="space-y-4">
              
              {/* Header */}
              <div className="border-b border-slate-100 pb-3 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    District Focus
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">{active.district}</h2>
                  <div className="text-xs text-slate-500">{active.state}</div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase font-semibold text-slate-400">
                    AI-assisted Score
                  </div>
                  <div className={`text-2xl font-extrabold tabular-nums font-mono ${
                    active.priorityScore >= 85 ? 'text-red-600' : 'text-amber-600'
                  }`}>
                    {active.priorityScore}/100
                  </div>
                </div>
              </div>

              {/* Core Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-500">Citizen Requests</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5 tabular-nums">
                    {active.citizenRequests.toLocaleString()}
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-500">Infrastructure Gap</div>
                  <div className="text-sm font-bold text-amber-700 mt-0.5 tabular-nums">
                    {active.infrastructureGap}%
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-500">Affected Population</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5 tabular-nums">
                    {active.population}
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-500">High Severity Reqs</div>
                  <div className="text-sm font-bold text-red-600 mt-0.5 tabular-nums">
                    {active.highSeverityRequests.toLocaleString()}
                  </div>
                </div>

              </div>

              {/* Primary Category & Top Issue */}
              <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-xs">
                <div className="text-[11px] font-semibold text-blue-900">
                  Category: {active.category}
                </div>
                <div className="text-xs text-blue-950 font-bold mt-0.5">
                  Top Issue: {active.topIssue}
                </div>
              </div>

              {/* "Why this area is prioritized" */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Why this area is prioritized
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {active.rationale.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Transparent Factor Breakdown */}
              <div className="pt-2 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                  <span>Transparent Factor Breakdown</span>
                  <span className="text-[10px] font-normal text-slate-500">Max Points</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-slate-600">
                    <span>Citizen Demand</span>
                    <span className="font-mono font-semibold">{active.breakdown.citizenDemand}/20</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Infrastructure Gap</span>
                    <span className="font-mono font-semibold">{active.breakdown.infrastructureGap}/20</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Population Impact</span>
                    <span className="font-mono font-semibold">{active.breakdown.populationImpact}/15</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Severity</span>
                    <span className="font-mono font-semibold">{active.breakdown.severity}/15</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Vulnerability</span>
                    <span className="font-mono font-semibold">{active.breakdown.vulnerability}/10</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Urgency</span>
                    <span className="font-mono font-semibold">{active.breakdown.urgency}/10</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Expected Social Impact</span>
                    <span className="font-mono font-semibold">{active.breakdown.expectedImpact}/10</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => setActiveProposalHotspot(active)}
                className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Development Proposal</span>
              </button>

              <button
                onClick={() => setActiveTab('simulator')}
                className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Sliders className="w-4 h-4 text-slate-600" />
                <span>Simulate Capital Allocation</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
