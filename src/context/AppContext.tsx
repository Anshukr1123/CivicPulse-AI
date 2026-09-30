import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CitizenRequest,
  DemandHotspot,
  PriorityProject,
  ImpactProject,
  DataSourceItem,
  PriorityWeights,
  LanguageCode,
  UserRole
} from '../data/types';
import {
  SEED_CITIZEN_REQUESTS,
  INITIAL_DEMAND_HOTSPOTS,
  INITIAL_PRIORITY_PROJECTS,
  IMPACT_TRACKING_DATA,
  DATA_SOURCES_CATALOG,
  DEFAULT_PRIORITY_WEIGHTS,
  calculateHotspotPriorityScore
} from '../data/demoData';
import { TRANSLATIONS, TranslationDictionary } from '../data/translations';

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  t: TranslationDictionary;
  requests: CitizenRequest[];
  addRequest: (req: Omit<CitizenRequest, 'id' | 'date'>) => CitizenRequest;
  hotspots: DemandHotspot[];
  selectedHotspot: DemandHotspot | null;
  setSelectedHotspot: (h: DemandHotspot | null) => void;
  projects: PriorityProject[];
  impactData: ImpactProject[];
  dataSources: DataSourceItem[];
  weights: PriorityWeights;
  setWeights: React.Dispatch<React.SetStateAction<PriorityWeights>>;
  updateWeight: (key: keyof PriorityWeights, val: number) => void;
  resetWeights: () => void;
  activeProposalHotspot: DemandHotspot | null;
  setActiveProposalHotspot: (h: DemandHotspot | null) => void;
  recentlyAddedId: string | null;
  clearRecentNotification: () => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  REQUESTS: 'civicpulse_requests_v1',
  WEIGHTS: 'civicpulse_weights_v1',
  LANG: 'civicpulse_lang_v1',
  ROLE: 'civicpulse_role_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation tab state (sync with URL hash if present)
  const [activeTab, setActiveTabState] = useState<string>(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (['landing', 'dashboard', 'citizen', 'requests', 'hotspots', 'gaps', 'projects', 'assistant', 'simulator', 'impact', 'data', 'settings'].includes(hash)) {
      return hash;
    }
    return 'landing';
  });

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    window.location.hash = `#/${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash && hash !== activeTab) {
        setActiveTabState(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeTab]);

  // Language state
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return (saved as LanguageCode) || 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Role state
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as UserRole) || 'policymaker';
  });

  const setRole = (r: UserRole) => {
    setRoleState(r);
    localStorage.setItem(STORAGE_KEYS.ROLE, r);
  };

  // Citizen Requests state (persisted in localStorage)
  const [requests, setRequests] = useState<CitizenRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REQUESTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed reading requests from localStorage', e);
    }
    return SEED_CITIZEN_REQUESTS;
  });

  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Weights state
  const [weights, setWeights] = useState<PriorityWeights>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WEIGHTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed reading weights from localStorage', e);
    }
    return DEFAULT_PRIORITY_WEIGHTS;
  });

  const updateWeight = (key: keyof PriorityWeights, val: number) => {
    setWeights(prev => {
      const updated = { ...prev, [key]: val };
      localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(updated));
      return updated;
    });
  };

  const resetWeights = () => {
    setWeights(DEFAULT_PRIORITY_WEIGHTS);
    localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(DEFAULT_PRIORITY_WEIGHTS));
  };

  // Selected hotspot for details
  const [selectedHotspot, setSelectedHotspot] = useState<DemandHotspot | null>(INITIAL_DEMAND_HOTSPOTS[0]);
  
  // Proposal generator modal state
  const [activeProposalHotspot, setActiveProposalHotspot] = useState<DemandHotspot | null>(null);

  // Recalculate hotspots dynamically based on requests count and weights
  const [hotspots, setHotspots] = useState<DemandHotspot[]>(INITIAL_DEMAND_HOTSPOTS);

  useEffect(() => {
    // Count user requests by district to increment demand
    const requestCountsByDistrict: Record<string, { total: number; high: number }> = {};
    for (const req of requests) {
      if (!requestCountsByDistrict[req.district]) {
        requestCountsByDistrict[req.district] = { total: 0, high: 0 };
      }
      requestCountsByDistrict[req.district].total++;
      if (req.severity === 'High') {
        requestCountsByDistrict[req.district].high++;
      }
    }

    const updated = INITIAL_DEMAND_HOTSPOTS.map(h => {
      const added = requestCountsByDistrict[h.district] || { total: 0, high: 0 };
      const updatedHotspot: DemandHotspot = {
        ...h,
        citizenRequests: h.citizenRequests + added.total,
        highSeverityRequests: h.highSeverityRequests + added.high,
      };
      const { score, breakdown } = calculateHotspotPriorityScore(updatedHotspot, weights);
      return {
        ...updatedHotspot,
        priorityScore: score,
        breakdown,
      };
    }).sort((a, b) => b.priorityScore - a.priorityScore);

    setHotspots(updated);
  }, [requests, weights]);

  // Add new citizen request
  const addRequest = (reqData: Omit<CitizenRequest, 'id' | 'date'>): CitizenRequest => {
    const today = new Date().toISOString().split('T')[0];
    const newId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: CitizenRequest = {
      ...reqData,
      id: newId,
      date: today,
    };

    const updated = [newRecord, ...requests];
    setRequests(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage quota exceeded, keeping in memory', e);
    }
    setRecentlyAddedId(newId);
    return newRecord;
  };

  const clearRecentNotification = () => setRecentlyAddedId(null);

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.WEIGHTS);
    setRequests(SEED_CITIZEN_REQUESTS);
    setWeights(DEFAULT_PRIORITY_WEIGHTS);
    setSelectedHotspot(INITIAL_DEMAND_HOTSPOTS[0]);
    setRecentlyAddedId(null);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        role,
        setRole,
        t,
        requests,
        addRequest,
        hotspots,
        selectedHotspot,
        setSelectedHotspot,
        projects: INITIAL_PRIORITY_PROJECTS,
        impactData: IMPACT_TRACKING_DATA,
        dataSources: DATA_SOURCES_CATALOG,
        weights,
        setWeights,
        updateWeight,
        resetWeights,
        activeProposalHotspot,
        setActiveProposalHotspot,
        recentlyAddedId,
        clearRecentNotification,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
};
