import React, { useState } from 'react';
import { 
  TransitRoute, 
  PassengerRecord, 
  PredictionRecord, 
  User, 
  UserRole, 
  ViewDeviceMode, 
  MLModelMetrics 
} from './types';
import { 
  INITIAL_ROUTES, 
  INITIAL_PASSENGER_DATA, 
  INITIAL_PREDICTIONS, 
  INITIAL_USERS, 
  INITIAL_ML_METRICS 
} from './data/mockDatabase';
import { Header } from './components/layout/Header';
import { CrowdPredictor } from './components/predict/CrowdPredictor';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { RouteExplorer } from './components/routes/RouteExplorer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DocumentViewer } from './components/docs/DocumentViewer';
import { MobileDeviceSimulator } from './components/mobile/MobileDeviceSimulator';
import { Bus, Shield, BookOpen, Layers } from 'lucide-react';

export default function App() {
  // Application State
  const [routes, setRoutes] = useState<TransitRoute[]>(INITIAL_ROUTES);
  const [passengerData, setPassengerData] = useState<PassengerRecord[]>(INITIAL_PASSENGER_DATA);
  const [predictions, setPredictions] = useState<PredictionRecord[]>(INITIAL_PREDICTIONS);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [mlMetrics, setMlMetrics] = useState<MLModelMetrics>(INITIAL_ML_METRICS);

  // Navigation & View Mode
  const [currentTab, setCurrentTab] = useState<string>('predict');
  const [deviceMode, setDeviceMode] = useState<ViewDeviceMode>('desktop');
  const [currentRole, setCurrentRole] = useState<UserRole>('passenger');

  // Prediction Handler
  const handleNewPrediction = (pred: PredictionRecord) => {
    setPredictions(prev => [pred, ...prev]);
  };

  // Route Handlers
  const handleAddRoute = (newRoute: TransitRoute) => {
    setRoutes(prev => [newRoute, ...prev]);
  };

  const handleDeleteRoute = (routeId: string) => {
    setRoutes(prev => prev.filter(r => r.id !== routeId));
  };

  // Passenger Data Handlers
  const handleAddPassengerData = (record: PassengerRecord) => {
    setPassengerData(prev => [record, ...prev]);
  };

  const handleBatchImportPassengerData = (records: PassengerRecord[]) => {
    setPassengerData(prev => [...records, ...prev]);
  };

  // User Role Handler
  const handleUpdateUserRole = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  // Route navigation helper
  const handleSelectRouteFromExplorer = (routeId: string) => {
    setCurrentTab('predict');
  };

  const renderActiveView = () => {
    switch (currentTab) {
      case 'predict':
        return (
          <CrowdPredictor
            routes={routes}
            historicalData={passengerData}
            onNewPrediction={handleNewPrediction}
          />
        );
      case 'dashboard':
        return (
          <UserDashboard
            routes={routes}
            predictions={predictions}
            passengerData={passengerData}
            onSelectRoute={() => setCurrentTab('predict')}
            onNavigateToPredict={() => setCurrentTab('predict')}
          />
        );
      case 'routes':
        return (
          <RouteExplorer
            routes={routes}
            onSelectRouteForPrediction={handleSelectRouteFromExplorer}
          />
        );
      case 'admin':
        return (
          <AdminDashboard
            routes={routes}
            passengerData={passengerData}
            users={users}
            mlMetrics={mlMetrics}
            onAddRoute={handleAddRoute}
            onDeleteRoute={handleDeleteRoute}
            onAddPassengerData={handleAddPassengerData}
            onBatchImportPassengerData={handleBatchImportPassengerData}
            onUpdateUserRole={handleUpdateUserRole}
          />
        );
      case 'docs':
        return <DocumentViewer />;
      default:
        return (
          <CrowdPredictor
            routes={routes}
            historicalData={passengerData}
            onNewPrediction={handleNewPrediction}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Top Bar Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        deviceMode={deviceMode}
        onChangeDeviceMode={setDeviceMode}
        currentRole={currentRole}
        onChangeRole={setCurrentRole}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {deviceMode === 'mobile' ? (
          /* Mobile Simulator Mode: High-fidelity smartphone chassis preview */
          <div className="container mx-auto px-4">
            <MobileDeviceSimulator
              currentTab={currentTab}
              onSelectTab={setCurrentTab}
              onSwitchToDesktop={() => setDeviceMode('desktop')}
            >
              {renderActiveView()}
            </MobileDeviceSimulator>
          </div>
        ) : (
          /* Desktop / Responsive Mode: Full-width modern transit layout */
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            {renderActiveView()}
          </div>
        )}
      </main>

      {/* Quiet, Accessible Editorial Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-slate-500 text-xs mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Bus className="h-4 w-4 text-emerald-500" />
            <span className="font-semibold text-slate-400">Public Transport Crowd Predictor</span>
            <span>· Academic Machine Learning Demonstration</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setCurrentTab('docs')} className="hover:text-white transition-colors">
              PRD & Architecture
            </button>
            <span>·</span>
            <button onClick={() => setCurrentTab('predict')} className="hover:text-white transition-colors">
              Crowd Inference
            </button>
            <span>·</span>
            <button onClick={() => setDeviceMode(deviceMode === 'desktop' ? 'mobile' : 'desktop')} className="hover:text-emerald-400 transition-colors">
              Toggle View ({deviceMode === 'desktop' ? 'Switch to Mobile' : 'Switch to Desktop'})
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
