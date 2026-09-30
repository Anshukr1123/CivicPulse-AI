import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LanguageCode, UserRole } from '../data/types';
import {
  Activity,
  Menu,
  X,
  Globe,
  UserCheck,
  ChevronDown,
  Sparkles,
  PlayCircle
} from 'lucide-react';

export const Navbar: React.FC<{ onStartDemoFlow?: () => void }> = ({ onStartDemoFlow }) => {
  const { activeTab, setActiveTab, language, setLanguage, role, setRole, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  ];

  const roles: { id: UserRole; title: string; desc: string }[] = [
    { id: 'policymaker', title: 'Policymaker', desc: 'Executive dashboard, hotspots, proposals' },
    { id: 'citizen', title: 'Citizen', desc: 'Submit voice/text civic requests' },
    { id: 'analyst', title: 'Analyst', desc: 'Gap metrics, data distributions, simulation' },
    { id: 'admin', title: 'Administrator', desc: 'Data governance, scoring engine weights' },
  ];

  const navLinks = [
    { id: 'overview', label: t.nav.overview, tab: 'dashboard' },
    { id: 'citizen', label: t.nav.citizenSubmission, tab: 'citizen' },
    { id: 'requests', label: t.nav.citizenRequests, tab: 'requests' },
    { id: 'hotspots', label: t.nav.hotspots, tab: 'hotspots' },
    { id: 'gaps', label: t.nav.infrastructureGaps, tab: 'gaps' },
    { id: 'projects', label: t.nav.projects, tab: 'projects' },
    { id: 'assistant', label: t.nav.assistant, tab: 'assistant' },
    { id: 'simulator', label: t.nav.simulator, tab: 'simulator' },
    { id: 'impact', label: t.nav.impact, tab: 'impact' },
    { id: 'data', label: t.nav.dataSources, tab: 'data' },
    { id: 'settings', label: t.nav.settings, tab: 'settings' },
  ];

  const currentRole = roles.find(r => r.id === role) || roles[0];
  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-sm">
      {/* Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Zone 1: Brand title & Emblem */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('landing')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm ring-1 ring-white/20 transition-transform group-hover:scale-105">
                <Activity className="w-5 h-5 text-blue-100" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold tracking-tight text-white">CivicPulse AI</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/80">
                    BRICS
                  </span>
                </div>
                <div className="hidden sm:block text-[11px] text-slate-400 font-normal truncate max-w-[240px]">
                  DPI Governance Platform
                </div>
              </div>
            </button>
          </div>

          {/* Zone 2: Primary Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.slice(0, 7).map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.tab)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-white bg-slate-800 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Overflow "More" dropdown for remaining links */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  ['simulator', 'impact', 'data', 'settings'].includes(activeTab)
                    ? 'text-white bg-slate-800'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>Tools & Governance</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>
              <div className="absolute left-0 mt-1 w-48 bg-slate-850 border border-slate-700/80 rounded-lg shadow-xl py-1 hidden group-hover:block group-focus-within:block z-50">
                {navLinks.slice(7).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.tab)}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                      activeTab === item.tab
                        ? 'bg-blue-600/30 text-blue-200 font-medium'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Zone 3: Role Switcher, Language & Demo Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Demo Walkthrough Trigger */}
            {onStartDemoFlow && (
              <button
                onClick={onStartDemoFlow}
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-sm transition-all"
                title="Run step-by-step hackathon demo flow"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Demo Tour</span>
              </button>
            )}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setRoleDropdownOpen(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-md transition-colors"
                title="Select interface language"
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline font-mono">{currentLang.native}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 z-50">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-semibold text-slate-400 tracking-wider border-b border-slate-800">
                    Multilingual DPI
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                        language === l.code
                          ? 'bg-blue-600/20 text-blue-300 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{l.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-md transition-colors"
                title="Switch demo persona"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">{currentRole.title}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl py-1.5 z-50">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-semibold text-slate-400 tracking-wider border-b border-slate-800">
                    Demo Role Switcher
                  </div>
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setRole(r.id);
                        setRoleDropdownOpen(false);
                        if (r.id === 'citizen' && activeTab === 'landing') {
                          setActiveTab('citizen');
                        }
                      }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                        role === r.id
                          ? 'bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-500'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="font-semibold">{r.title}</div>
                      <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{r.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Citizen Submission Quick Action Button */}
            <button
              onClick={() => setActiveTab('citizen')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-md shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Submit Request</span>
              <span className="sm:hidden">Submit</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-t border-slate-800 px-4 pt-2 pb-4 space-y-1">
          <div className="grid grid-cols-2 gap-1 py-2">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.tab);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-xs font-medium rounded-md ${
                  activeTab === item.tab
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {onStartDemoFlow && (
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  onStartDemoFlow();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              >
                <PlayCircle className="w-4 h-4" />
                Launch 12-Step Guided Demo Flow
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
