import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProposalModal } from './components/ProposalModal';
import { InteractiveWalkthroughBanner } from './components/InteractiveWalkthroughBanner';

import { LandingView } from './views/LandingView';
import { DashboardView } from './views/DashboardView';
import { CitizenSubmitView } from './views/CitizenSubmitView';
import { RequestsListView } from './views/RequestsListView';
import { HotspotsMapView } from './views/HotspotsMapView';
import { InfrastructureGapsView } from './views/InfrastructureGapsView';
import { PriorityProjectsView } from './views/PriorityProjectsView';
import { PolicyAssistantView } from './views/PolicyAssistantView';
import { BudgetSimulatorView } from './views/BudgetSimulatorView';
import { ImpactTrackingView } from './views/ImpactTrackingView';
import { DataSourcesView } from './views/DataSourcesView';
import { SettingsView } from './views/SettingsView';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();
  const [showDemoTour, setShowDemoTour] = useState<boolean>(true);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingView />;
      case 'dashboard':
        return <DashboardView />;
      case 'citizen':
        return <CitizenSubmitView />;
      case 'requests':
        return <RequestsListView />;
      case 'hotspots':
        return <HotspotsMapView />;
      case 'gaps':
        return <InfrastructureGapsView />;
      case 'projects':
        return <PriorityProjectsView />;
      case 'assistant':
        return <PolicyAssistantView />;
      case 'simulator':
        return <BudgetSimulatorView />;
      case 'impact':
        return <ImpactTrackingView />;
      case 'data':
        return <DataSourcesView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <LandingView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navigation */}
      <Navbar onStartDemoFlow={() => setShowDemoTour(true)} />

      {/* 12-Step Guided Hackathon Tour Banner */}
      <InteractiveWalkthroughBanner
        isOpen={showDemoTour}
        onClose={() => setShowDemoTour(false)}
      />

      {/* Main Content Area */}
      <main className="grow">
        {renderActiveView()}
      </main>

      {/* AI Proposal Modal (Global) */}
      <ProposalModal />

      {/* GovTech Institutional Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
