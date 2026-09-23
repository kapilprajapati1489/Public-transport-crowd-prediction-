import React, { useState, useMemo } from 'react';
import { TransitRoute, PredictionRecord, PassengerRecord, TransportType, CrowdLevel } from '../../types';
import { runMLPrediction, generateHourlyCurve } from '../../services/predictionEngine';
import { 
  Bus, 
  Train, 
  Sparkles, 
  Clock, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  RefreshCw, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Users,
  Info
} from 'lucide-react';

interface CrowdPredictorProps {
  routes: TransitRoute[];
  historicalData: PassengerRecord[];
  onNewPrediction: (prediction: PredictionRecord) => void;
  onSelectRouteDetails?: (route: TransitRoute) => void;
}

export const CrowdPredictor: React.FC<CrowdPredictorProps> = ({
  routes,
  historicalData,
  onNewPrediction,
  onSelectRouteDetails
}) => {
  // Form states
  const [selectedRouteId, setSelectedRouteId] = useState<string>(routes[0]?.id || '');
  const [selectedTransportFilter, setSelectedTransportFilter] = useState<string>('all');
  const [travelDate, setTravelDate] = useState<string>('2026-09-23');
  const [travelTime, setTravelTime] = useState<string>('08:30');
  const [isHoliday, setIsHoliday] = useState<boolean>(false);
  const [isSimulatingInference, setIsSimulatingInference] = useState<boolean>(false);

  // Result state
  const [currentPrediction, setCurrentPrediction] = useState<PredictionRecord | null>(null);

  // Filter routes by transport type
  const filteredRoutes = useMemo(() => {
    if (selectedTransportFilter === 'all') return routes;
    return routes.filter(r => r.transportType.toLowerCase() === selectedTransportFilter.toLowerCase());
  }, [routes, selectedTransportFilter]);

  const activeRoute = useMemo(() => {
    return routes.find(r => r.id === selectedRouteId) || routes[0];
  }, [routes, selectedRouteId]);

  // Hourly curve for the active route
  const hourlyCurve = useMemo(() => {
    if (!activeRoute) return [];
    return generateHourlyCurve(activeRoute, travelDate, isHoliday);
  }, [activeRoute, travelDate, isHoliday]);

  // Handle prediction
  const handlePredict = () => {
    if (!activeRoute) return;
    setIsSimulatingInference(true);

    // Simulate ML processing time (UX Section 16 loading indicator)
    setTimeout(() => {
      const pred = runMLPrediction(activeRoute, travelDate, travelTime, isHoliday, historicalData);
      setCurrentPrediction(pred);
      onNewPrediction(pred);
      setIsSimulatingInference(false);
    }, 450);
  };

  // Quick preset time selection
  const handlePresetTime = (time: string) => {
    setTravelTime(time);
  };

  const getCrowdBadgeStyle = (level: CrowdLevel) => {
    switch (level) {
      case 'LOW':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          dot: 'bg-emerald-400',
          desc: 'Comfortable seating & minimal boarding delay'
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          dot: 'bg-amber-400',
          desc: 'Moderate standing room, brisk boarding pace'
        };
      case 'HIGH':
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
          dot: 'bg-rose-400',
          desc: 'Heavy crowding, peak rush, consider alternative time'
        };
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Editorial Hero Intro with Transit Photography */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>RANDOM FOREST ENSEMBLE CLASSIFIER</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">92.4% ACCURACY</span>
            </div>
            
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Public Transport Crowd Predictor
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Forecast expected passenger volume across Mumbai suburban trains, metro lines, and municipal buses. Plan journeys ahead of peak congestion using machine-learning pattern recognition.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Aggregated historical telemetry</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Peak vs off-peak classification</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Zero personal data tracking</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative hidden sm:block">
            <div className="relative h-44 lg:h-52 w-full overflow-hidden rounded-xl border border-slate-700/60 shadow-xl">
              <img 
                src="/src/assets/images/hero_transit_network_1790133594965.jpg" 
                alt="Modern transit hub with arriving electric train and buses"
                className="h-full w-full object-cover object-center"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs text-slate-300 font-medium">
                  Suburban & Metro Commute Analytics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid: Prediction Form + Result Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form (PRD Section 7: FR-03, FR-04, FR-05) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div>
                <h2 className="font-display text-lg font-bold text-white">
                  Check Crowd Prediction
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select corridor, travel date, and scheduled departure time
                </p>
              </div>

              {/* Mode Filter tabs */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                {['all', 'train', 'metro', 'bus'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSelectedTransportFilter(mode)}
                    className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                      selectedTransportFilter === mode
                        ? 'bg-emerald-500 text-slate-950 font-semibold shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              
              {/* Route Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Select Transit Route & Corridor <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedRouteId}
                    onChange={(e) => setSelectedRouteId(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                  >
                    {filteredRoutes.map((r) => (
                      <option key={r.id} value={r.id} className="bg-slate-900 text-white">
                        [{r.transportType.toUpperCase()}] {r.routeName} ({r.source} ➔ {r.destination})
                      </option>
                    ))}
                  </select>
                </div>
                {activeRoute && (
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400 px-1">
                    <span>Stops: {activeRoute.stops.length} stations</span>
                    <span>Frequency: Every {activeRoute.frequencyMin} mins</span>
                    <span>Max vehicle capacity: {activeRoute.capacityPerVehicle}</span>
                  </div>
                )}
              </div>

              {/* Date and Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>Travel Date</span>
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                {/* Time Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Travel Time</span>
                  </label>
                  <input
                    type="time"
                    value={travelTime}
                    onChange={(e) => setTravelTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Quick Time Shortcuts */}
              <div>
                <span className="block text-[11px] font-medium text-slate-400 mb-1.5">
                  Quick Commute Presets:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handlePresetTime('08:30')}
                    className={`px-2.5 py-1.5 text-xs rounded-lg border text-left transition-all ${
                      travelTime === '08:30'
                        ? 'border-rose-500/60 bg-rose-500/10 text-rose-300 font-medium'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold">08:30 AM</div>
                    <div className="text-[10px] text-rose-400">Morning Peak</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePresetTime('11:00')}
                    className={`px-2.5 py-1.5 text-xs rounded-lg border text-left transition-all ${
                      travelTime === '11:00'
                        ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300 font-medium'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold">11:00 AM</div>
                    <div className="text-[10px] text-emerald-400">Midday Lull</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePresetTime('17:30')}
                    className={`px-2.5 py-1.5 text-xs rounded-lg border text-left transition-all ${
                      travelTime === '17:30'
                        ? 'border-rose-500/60 bg-rose-500/10 text-rose-300 font-medium'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold">05:30 PM</div>
                    <div className="text-[10px] text-rose-400">Evening Peak</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePresetTime('21:30')}
                    className={`px-2.5 py-1.5 text-xs rounded-lg border text-left transition-all ${
                      travelTime === '21:30'
                        ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300 font-medium'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold">09:30 PM</div>
                    <div className="text-[10px] text-emerald-400">Night Off-Peak</div>
                  </button>
                </div>
              </div>

              {/* Holiday Toggle */}
              <div className="pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={isHoliday}
                    onChange={(e) => setIsHoliday(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900 cursor-pointer"
                  />
                  <span>Mark as Public Holiday / Festival (adjusts commuter shift patterns)</span>
                </label>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handlePredict}
                  disabled={isSimulatingInference}
                  className="w-full rounded-xl bg-emerald-500 py-3 px-4 text-sm font-bold text-slate-950 hover:bg-emerald-400 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSimulatingInference ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin text-slate-950" />
                      <span>Predicting Crowd... ⏳ Please wait...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 text-slate-950" />
                      <span>Predict Crowd Level</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* 24-Hour Corridor Demand Curve */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span>24-Hour Crowd Curve for {activeRoute.routeName}</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Cap: {activeRoute.capacityPerVehicle}
              </span>
            </div>

            <div className="h-28 flex items-end gap-1 sm:gap-1.5 pt-4 pb-1 px-1 border-b border-slate-800">
              {hourlyCurve.map((slot) => {
                const heightPercent = Math.max(12, Math.min(100, slot.percentage));
                const barColor = slot.level === 'HIGH' 
                  ? 'bg-rose-500 hover:bg-rose-400' 
                  : slot.level === 'MEDIUM' 
                  ? 'bg-amber-500 hover:bg-amber-400' 
                  : 'bg-emerald-500 hover:bg-emerald-400';
                const isCurrentTime = travelTime.startsWith(slot.time.substring(0, 2));

                return (
                  <div 
                    key={slot.time}
                    className="flex-1 flex flex-col items-center group relative cursor-pointer"
                    onClick={() => setTravelTime(slot.time)}
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 border border-slate-800 text-[10px] text-white px-2 py-1 rounded shadow-xl whitespace-nowrap z-20 pointer-events-none">
                      {slot.time}: {slot.passengers} pax ({slot.percentage}%) · {slot.level}
                    </div>

                    <div 
                      style={{ height: `${heightPercent}%` }} 
                      className={`w-full rounded-t transition-all ${barColor} ${
                        isCurrentTime ? 'ring-2 ring-white ring-offset-1 ring-offset-slate-900' : 'opacity-80 group-hover:opacity-100'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5 px-0.5">
              <span>06:00 AM</span>
              <span>10:00 AM</span>
              <span>02:00 PM</span>
              <span>06:00 PM</span>
              <span>10:00 PM</span>
            </div>

            <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span> Low (&lt;40%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400"></span> Medium (41-75%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-400"></span> High (&gt;75%)
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Prediction Result (PRD Section 7: FR-06 & UI/UX Section 6) */}
        <div className="lg:col-span-6 space-y-6">
          {currentPrediction ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
              
              {/* Top Accent Strip based on Crowd Level */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  currentPrediction.predictedCrowd === 'HIGH'
                    ? 'bg-rose-500'
                    : currentPrediction.predictedCrowd === 'MEDIUM'
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
              />

              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                    Prediction Result # {currentPrediction.predictionId}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mt-0.5">
                    {currentPrediction.routeName}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400 font-mono">
                    {currentPrediction.dayOfWeek}, {currentPrediction.time}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Mode: {currentPrediction.transportType}
                  </div>
                </div>
              </div>

              {/* Main Classification Display */}
              <div className="rounded-xl border p-5 my-4 text-center transition-all bg-slate-950/80 border-slate-800">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-slate-900/90 mb-3">
                  {currentPrediction.predictedCrowd === 'HIGH' && (
                    <AlertTriangle className="h-10 w-10 text-rose-400" />
                  )}
                  {currentPrediction.predictedCrowd === 'MEDIUM' && (
                    <Users className="h-10 w-10 text-amber-400" />
                  )}
                  {currentPrediction.predictedCrowd === 'LOW' && (
                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  )}
                </div>

                <div className="space-y-1">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest ${
                    getCrowdBadgeStyle(currentPrediction.predictedCrowd).bg
                  }`}>
                    ● {currentPrediction.predictedCrowd} CROWD
                  </span>
                  
                  <div className="font-display text-3xl sm:text-4xl font-black text-white pt-1">
                    ~{currentPrediction.expectedPassengers} passengers
                  </div>
                  
                  <p className="text-xs text-slate-400 pt-1 max-w-sm mx-auto">
                    {getCrowdBadgeStyle(currentPrediction.predictedCrowd).desc}
                  </p>
                </div>

                {/* Metric Strip */}
                <div className="grid grid-cols-3 gap-2 border-t border-slate-800 mt-5 pt-4 text-left">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">Capacity Load</div>
                    <div className="font-mono text-sm font-bold text-white tabular-nums">
                      {currentPrediction.capacityPercentage}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">ML Confidence</div>
                    <div className="font-mono text-sm font-bold text-emerald-400 tabular-nums">
                      {Math.round(currentPrediction.confidence * 100)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">Peak Period</div>
                    <div className="font-mono text-sm font-bold text-slate-200">
                      {currentPrediction.isPeakHour ? 'Yes (Rush)' : 'No (Off-Peak)'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Alternative Time Suggestions (PRD Goal 4.2 & UX Section 6) */}
              {currentPrediction.recommendedAlternativeTimes.length > 0 && (
                <div className="mt-5 space-y-2.5 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Recommended Less-Crowded Times</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Save commute congestion</span>
                  </div>

                  <div className="space-y-2 pt-1">
                    {currentPrediction.recommendedAlternativeTimes.map((alt) => (
                      <div
                        key={alt.time}
                        onClick={() => {
                          // convert 07:15 AM to 07:15
                          const cleanTime = alt.time.split(' ')[0];
                          setTravelTime(cleanTime);
                        }}
                        className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/80 p-2.5 hover:border-emerald-500/40 hover:bg-slate-850 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <div>
                            <div className="text-xs font-bold text-white">{alt.time}</div>
                            <div className="text-[10px] text-emerald-400">
                              {alt.crowdLevel} Crowd · ~{alt.expectedPassengers} pax
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-mono font-medium text-emerald-400">
                            {alt.deltaPassengers} pax
                          </span>
                          <div className="text-[9px] text-slate-500">Tap to load</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-5 flex items-center justify-between pt-2">
                <button
                  onClick={() => handlePresetTime('11:00')}
                  className="text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Try Another Time</span>
                </button>

                <button
                  onClick={() => {
                    const nextRoute = routes.find(r => r.id !== activeRoute.id);
                    if (nextRoute) setSelectedRouteId(nextRoute.id);
                  }}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                >
                  <span>Compare Next Route</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          ) : (
            /* Empty State matching domain reference */
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center flex flex-col items-center justify-center min-h-[420px]">
              <div className="h-16 w-16 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400 mb-4">
                <Users className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="font-display text-base font-bold text-white">
                No Prediction Generated Yet
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1.5 leading-relaxed">
                Choose your travel corridor and departure time on the left, then click <strong className="text-slate-200">Predict Crowd Level</strong> to run the Random Forest ML classifier.
              </p>
              <button
                onClick={handlePredict}
                className="mt-5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-colors"
              >
                Run Quick Demo Prediction
              </button>
            </div>
          )}

          {/* Passenger Journey Callout Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5 flex items-center gap-4">
            <div className="h-20 w-24 rounded-lg overflow-hidden shrink-0 border border-slate-700/60 bg-slate-800">
              <img 
                src="/src/assets/images/passenger_transit_journey_1790133626893.jpg" 
                alt="Commuter reviewing transit predictions"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white">
                Commute Smarter with Predictive Transit
              </h4>
              <p className="text-[11px] text-slate-400 leading-snug">
                Data models dynamically aggregate peak bottlenecks between 8:00–10:30 AM and 5:00–8:30 PM to forecast capacity before you reach the platform.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
