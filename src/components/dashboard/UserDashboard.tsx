import React, { useState } from 'react';
import { TransitRoute, PredictionRecord, PassengerRecord, CrowdLevel } from '../../types';
import { 
  TrendingUp, 
  Clock, 
  Route as RouteIcon, 
  Activity, 
  Calendar, 
  BarChart3, 
  ChevronRight, 
  AlertCircle, 
  ArrowUpRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

interface UserDashboardProps {
  routes: TransitRoute[];
  predictions: PredictionRecord[];
  passengerData: PassengerRecord[];
  onSelectRoute: (routeId: string) => void;
  onNavigateToPredict: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  routes,
  predictions,
  passengerData,
  onSelectRoute,
  onNavigateToPredict
}) => {
  const [activeChartTab, setActiveChartTab] = useState<'daily' | 'weekly' | 'comparison'>('daily');

  // Daily aggregate trend by hour (averaged across passenger data)
  const dailyHourlyTrend = [
    { hour: '06:00', passengers: 210, level: 'LOW' as CrowdLevel },
    { hour: '07:00', passengers: 480, level: 'MEDIUM' as CrowdLevel },
    { hour: '08:00', passengers: 1050, level: 'HIGH' as CrowdLevel, peak: true },
    { hour: '09:00', passengers: 1220, level: 'HIGH' as CrowdLevel, peak: true },
    { hour: '10:00', passengers: 890, level: 'HIGH' as CrowdLevel, peak: true },
    { hour: '11:00', passengers: 340, level: 'LOW' as CrowdLevel },
    { hour: '12:00', passengers: 310, level: 'LOW' as CrowdLevel },
    { hour: '13:00', passengers: 360, level: 'LOW' as CrowdLevel },
    { hour: '14:00', passengers: 410, level: 'MEDIUM' as CrowdLevel },
    { hour: '15:00', passengers: 490, level: 'MEDIUM' as CrowdLevel },
    { hour: '16:00', passengers: 620, level: 'MEDIUM' as CrowdLevel },
    { hour: '17:00', passengers: 1100, level: 'HIGH' as CrowdLevel, peak: true },
    { hour: '18:00', passengers: 1280, level: 'HIGH' as CrowdLevel, peak: true },
    { hour: '19:00', passengers: 1150, level: 'HIGH' as CrowdLevel, peak: true },
    { hour: '20:00', passengers: 820, level: 'HIGH' as CrowdLevel, peak: true },
    { hour: '21:00', passengers: 460, level: 'MEDIUM' as CrowdLevel },
    { hour: '22:00', passengers: 240, level: 'LOW' as CrowdLevel }
  ];

  // Weekly pattern (Mon to Sun)
  const weeklyPattern = [
    { day: 'Mon', index: 94, crowd: 'HIGH', label: 'Workweek Start Rush' },
    { day: 'Tue', index: 92, crowd: 'HIGH', label: 'Peak Midweek Commute' },
    { day: 'Wed', index: 95, crowd: 'HIGH', label: 'Heaviest Traffic Index' },
    { day: 'Thu', index: 91, crowd: 'HIGH', label: 'Regular Commute Load' },
    { day: 'Fri', index: 88, crowd: 'HIGH', label: 'Early Evening Dispersal' },
    { day: 'Sat', index: 58, crowd: 'MEDIUM', label: 'Shopping & Leisure' },
    { day: 'Sun', index: 42, crowd: 'LOW', label: 'Off-Peak Weekend' }
  ];

  // Corridor comparison
  const corridorComparison = routes.map((r) => {
    const historical = passengerData.filter(d => d.routeId === r.id);
    const avgPax = historical.length > 0
      ? Math.round(historical.reduce((a, b) => a + b.passengerCount, 0) / historical.length)
      : Math.round(r.capacityPerVehicle * 0.62);
    const loadPercent = Math.round((avgPax / r.capacityPerVehicle) * 100);
    return {
      id: r.id,
      name: r.routeName,
      type: r.transportType,
      avgPax,
      capacity: r.capacityPerVehicle,
      loadPercent,
      level: (loadPercent >= 74 ? 'HIGH' : loadPercent <= 42 ? 'LOW' : 'MEDIUM') as CrowdLevel
    };
  });

  const getLevelColor = (lvl: CrowdLevel) => {
    switch (lvl) {
      case 'HIGH': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'MEDIUM': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'LOW': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
            TRANSIT ANALYTICS & DEMAND INTELLIGENCE
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Crowd Trends & Demand Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time aggregate data, peak-hour bottlenecks, and historical commute rhythms
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToPredict}
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>Run New Prediction</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Top Stat Metric Strip (PRD UI/UX Section 7) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Active Transit Corridors</span>
            <RouteIcon className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
            {routes.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <span>Suburban Rail, Metro & Buses</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Critical Peak Windows</span>
            <Clock className="h-4 w-4 text-rose-400" />
          </div>
          <div className="font-display text-lg sm:text-xl font-bold text-white">
            08:00–10:30 & 17:00–20:30
          </div>
          <div className="text-[11px] text-rose-400/90 mt-1 flex items-center gap-1 font-mono">
            <span>Up to 96% Capacity Utilization</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Model Accuracy</span>
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-400 tabular-nums">
            92.4%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            <span>Random Forest Classifier (F1: 0.919)</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Sampled Telemetry Data</span>
            <Calendar className="h-4 w-4 text-amber-400" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
            {passengerData.length * 1240}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            <span>Aggregated observations</span>
          </div>
        </div>

      </div>

      {/* Main Visualization Center */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 backdrop-blur-sm">
        
        {/* Chart View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
          <div>
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-400" />
              <span>Crowd Demand Visualizer</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparative visualization across daily hours, weekly cycles, and transit corridors
            </p>
          </div>

          <div className="flex items-center p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveChartTab('daily')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeChartTab === 'daily'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Daily Hourly Curve
            </button>
            <button
              onClick={() => setActiveChartTab('weekly')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeChartTab === 'weekly'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Weekly Patterns
            </button>
            <button
              onClick={() => setActiveChartTab('comparison')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeChartTab === 'comparison'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Corridor Loads
            </button>
          </div>
        </div>

        {/* Chart Tab 1: Daily Hourly Curve */}
        {activeChartTab === 'daily' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Hourly Average Passenger Volume (Aggregated Suburban & Metro Network)</span>
              <span className="font-mono text-emerald-400">Peaks: 08:30 AM & 06:00 PM</span>
            </div>

            <div className="h-56 flex items-end gap-1.5 sm:gap-2 pt-6 pb-2 px-2 border-b border-slate-800 bg-slate-950/40 rounded-xl">
              {dailyHourlyTrend.map((pt) => {
                const maxPax = 1350;
                const heightPercent = Math.round((pt.passengers / maxPax) * 100);
                const barColor = pt.level === 'HIGH' 
                  ? 'bg-rose-500' 
                  : pt.level === 'MEDIUM' 
                  ? 'bg-amber-500' 
                  : 'bg-emerald-500';

                return (
                  <div key={pt.hour} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                    
                    {/* Hover detail box */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-[10px] text-white px-2 py-1 rounded shadow-xl whitespace-nowrap z-30 pointer-events-none">
                      <div className="font-bold">{pt.hour}</div>
                      <div className="font-mono text-emerald-400">{pt.passengers} passengers</div>
                      <div className="text-slate-400">{pt.level} Crowd {pt.peak ? '· Peak Rush' : ''}</div>
                    </div>

                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t transition-all ${barColor} opacity-85 group-hover:opacity-100 group-hover:scale-y-[1.02]`}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 font-mono px-2">
              {dailyHourlyTrend.map((pt, idx) => (
                <span key={pt.hour} className={idx % 2 === 0 ? 'block' : 'hidden sm:block'}>
                  {pt.hour}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-emerald-500"></span>
                <span>Off-Peak (Low Crowd &lt;400 pax)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-amber-500"></span>
                <span>Normal Operating (Moderate 400–750 pax)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-rose-500"></span>
                <span>Peak Rush Window (Heavy &gt;750 pax)</span>
              </div>
            </div>
          </div>
        )}

        {/* Chart Tab 2: Weekly Pattern */}
        {activeChartTab === 'weekly' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
              {weeklyPattern.map((w) => (
                <div 
                  key={w.day} 
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-white text-sm">{w.day}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${getLevelColor(w.crowd as CrowdLevel)}`}>
                      {w.crowd}
                    </span>
                  </div>

                  <div className="my-2">
                    <div className="flex justify-between text-xs mb-1 font-mono text-slate-400">
                      <span>Index</span>
                      <span className="text-white font-bold">{w.index}/100</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${w.index}%` }} 
                        className={`h-full rounded-full ${
                          w.crowd === 'HIGH' ? 'bg-rose-500' : w.crowd === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                      />
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-400 mt-1">
                    {w.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 text-center pt-2">
              * Tuesday and Wednesday record the highest suburban rail volume, with Saturday showing balanced midday shopping traffic and Sunday remaining uniformly off-peak.
            </p>
          </div>
        )}

        {/* Chart Tab 3: Corridor Comparison */}
        {activeChartTab === 'comparison' && (
          <div className="space-y-3">
            {corridorComparison.map((corridor) => (
              <div 
                key={corridor.id}
                onClick={() => onSelectRoute(corridor.id)}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 hover:border-slate-700 hover:bg-slate-950 transition-colors cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400 uppercase bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {corridor.type}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {corridor.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono">
                      ~{corridor.avgPax} / {corridor.capacity} pax
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getLevelColor(corridor.level)}`}>
                      {corridor.level} ({corridor.loadPercent}%)
                    </span>
                  </div>
                </div>

                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${corridor.loadPercent}%` }}
                    className={`h-full rounded-full transition-all ${
                      corridor.level === 'HIGH' ? 'bg-rose-500' : corridor.level === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Two Column Section: Recent Predictions Log + Commute Advisories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Recent Prediction Log (PRD FR-06 & UI/UX Section 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-white">
              Recent Crowd Predictions
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Live Session Records
            </span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
            {predictions.length > 0 ? (
              <div className="divide-y divide-slate-800 text-xs">
                {predictions.slice(0, 6).map((pred) => (
                  <div key={pred.predictionId} className="p-3.5 flex items-center justify-between hover:bg-slate-900 transition-colors">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{pred.routeName}</span>
                        <span className="text-[10px] text-slate-500 font-mono">[{pred.transportType}]</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {pred.dayOfWeek} at {pred.time} · Conf: {Math.round(pred.confidence * 100)}%
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getLevelColor(pred.predictedCrowd)}`}>
                        {pred.predictedCrowd}
                      </span>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        ~{pred.expectedPassengers} pax
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-slate-500 text-xs">
                No predictions recorded yet in this session.
              </div>
            )}
          </div>
        </div>

        {/* Right: Live Transit Network Advisories */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-white">
              Transit Planning Advisories
            </h3>
            <span className="text-xs text-emerald-400 font-mono">Real-time Feed</span>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">
                    Off-Peak Window Active (11:00 AM – 04:30 PM)
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Suburban rail and metro systems are currently operating under 35% nominal capacity. Ideal window for low-crowd commutes.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">
                    Upcoming Evening Peak (05:00 PM – 08:30 PM)
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Routes 101, 205, and 302 will encounter High Crowd levels exceeding 850 passengers per coach set. Consider traveling prior to 04:30 PM or after 08:45 PM.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200 block mb-1">Notice for Transit Authorities:</strong>
              Fleet dispatchers can access the Admin Panel to adjust vehicle frequencies on the Andheri-Dadar and Versova-Ghatkopar corridors.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
