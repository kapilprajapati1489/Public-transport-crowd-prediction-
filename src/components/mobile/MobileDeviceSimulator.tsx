import React from 'react';
import { ViewDeviceMode } from '../../types';
import { 
  Sparkles, 
  BarChart3, 
  Route as RouteIcon, 
  Shield, 
  BookOpen, 
  Wifi, 
  Battery, 
  Signal,
  RotateCcw
} from 'lucide-react';

interface MobileDeviceSimulatorProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  children: React.ReactNode;
  onSwitchToDesktop: () => void;
}

export const MobileDeviceSimulator: React.FC<MobileDeviceSimulatorProps> = ({
  currentTab,
  onSelectTab,
  children,
  onSwitchToDesktop
}) => {
  return (
    <div className="py-6 sm:py-10 flex flex-col items-center justify-center">
      
      {/* Control bar above phone simulator */}
      <div className="mb-4 flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 text-xs text-slate-300">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span className="font-mono text-emerald-400 font-bold">Simulated Mobile PWA Viewport</span>
        <span className="text-slate-600">·</span>
        <span>iPhone 16 Pro Frame (390 × 844)</span>
        <button
          onClick={onSwitchToDesktop}
          className="ml-2 text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2"
        >
          Expand to Desktop
        </button>
      </div>

      {/* Simulated Smartphone Chassis */}
      <div className="relative w-full max-w-[400px] h-[830px] rounded-[48px] bg-slate-900 border-[10px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col ring-1 ring-white/10">
        
        {/* Hardware Notch / Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-950 border border-slate-800 ml-auto mr-3"></div>
        </div>

        {/* Mobile Status Bar (Time, Battery, Wifi) */}
        <div className="h-11 w-full bg-slate-950/95 flex items-center justify-between px-7 pt-2 text-[11px] font-mono text-slate-300 select-none z-40 shrink-0 border-b border-slate-900">
          <span>09:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <Battery className="h-3.5 w-3.5 text-emerald-400" />
          </div>
        </div>

        {/* Mobile Top App Bar (Pattern 2 from mobile reference) */}
        <div className="h-12 w-full bg-slate-950/90 border-b border-slate-800 px-4 flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-white text-sm">
              CrowdPredict
            </span>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">
              PWA
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-400 capitalize">
            {currentTab}
          </span>
        </div>

        {/* Mobile Scrollable Screen Content (Stretch Zone) */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-950 text-slate-100 text-xs">
          {children}
        </div>

        {/* Mobile Fixed Bottom Tab Bar (Pattern 1 from mobile design reference) */}
        <div className="h-16 w-full bg-slate-950/95 border-t border-slate-800 px-2 grid grid-cols-5 items-center z-40 shrink-0 backdrop-blur-md pb-1">
          
          <button
            onClick={() => onSelectTab('predict')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentTab === 'predict' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-[10px] font-medium mt-1">Predict</span>
          </button>

          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentTab === 'dashboard' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-[10px] font-medium mt-1">Trends</span>
          </button>

          <button
            onClick={() => onSelectTab('routes')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentTab === 'routes' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <RouteIcon className="h-5 w-5" />
            <span className="text-[10px] font-medium mt-1">Routes</span>
          </button>

          <button
            onClick={() => onSelectTab('admin')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentTab === 'admin' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Shield className="h-5 w-5" />
            <span className="text-[10px] font-medium mt-1">Admin</span>
          </button>

          <button
            onClick={() => onSelectTab('docs')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentTab === 'docs' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span className="text-[10px] font-medium mt-1">Docs</span>
          </button>

        </div>

        {/* Home Indicator Bar */}
        <div className="h-4 w-full bg-slate-950 flex items-center justify-center shrink-0">
          <div className="w-28 h-1 bg-slate-600 rounded-full"></div>
        </div>

      </div>

    </div>
  );
};
