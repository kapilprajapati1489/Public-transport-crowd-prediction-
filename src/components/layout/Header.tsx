import React from 'react';
import { ViewDeviceMode, UserRole } from '../../types';
import { Monitor, Smartphone, Maximize2, Shield, User, Bus, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  deviceMode: ViewDeviceMode;
  onChangeDeviceMode: (mode: ViewDeviceMode) => void;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  deviceMode,
  onChangeDeviceMode,
  currentRole,
  onChangeRole
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text element wordmark + clean transit mark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSelectTab('predict')}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
              <Bus className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display text-base sm:text-lg font-bold tracking-tight text-white block">
                CrowdPredict
              </span>
              <span className="text-[11px] text-slate-400 tracking-wide font-normal -mt-1 hidden sm:block">
                Public Transport Transit Intelligence
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links with hover states */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => onSelectTab('predict')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors rounded-md ${
              currentTab === 'predict'
                ? 'text-emerald-400 bg-emerald-500/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            Predict Crowd
          </button>

          <button
            onClick={() => onSelectTab('dashboard')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors rounded-md ${
              currentTab === 'dashboard'
                ? 'text-emerald-400 bg-emerald-500/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            Crowd Dashboard
          </button>

          <button
            onClick={() => onSelectTab('routes')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors rounded-md ${
              currentTab === 'routes'
                ? 'text-emerald-400 bg-emerald-500/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            Routes
          </button>

          <button
            onClick={() => onSelectTab('admin')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors rounded-md flex items-center gap-1.5 ${
              currentTab === 'admin'
                ? 'text-emerald-400 bg-emerald-500/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Admin Panel</span>
          </button>

          <button
            onClick={() => onSelectTab('docs')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors rounded-md ${
              currentTab === 'docs'
                ? 'text-emerald-400 bg-emerald-500/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            PRD & Docs
          </button>
        </nav>

        {/* Zone 3: Device Mode Switcher + Role Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Dual Viewport Selector (Desktop vs Mobile View requested) */}
          <div className="flex items-center p-0.5 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => onChangeDeviceMode('desktop')}
              title="Desktop Full Layout"
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                deviceMode === 'desktop'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>

            <button
              onClick={() => onChangeDeviceMode('mobile')}
              title="Mobile Device Simulator"
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>

            <button
              onClick={() => onChangeDeviceMode('responsive')}
              title="Fluid Responsive Mode"
              className={`hidden lg:flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-all ${
                deviceMode === 'responsive'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Maximize2 className="h-3 w-3" />
              <span>Auto</span>
            </button>
          </div>

          {/* Quick Role Switcher (RBAC) */}
          <div className="relative flex items-center">
            <select
              value={currentRole}
              onChange={(e) => onChangeRole(e.target.value as UserRole)}
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:border-emerald-500 focus:outline-none cursor-pointer"
              title="Switch user role"
            >
              <option value="passenger">Passenger View</option>
              <option value="authority">Transit Authority</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

        </div>

      </div>
    </header>
  );
};
