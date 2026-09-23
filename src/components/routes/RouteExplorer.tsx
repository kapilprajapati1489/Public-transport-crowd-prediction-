import React, { useState, useMemo } from 'react';
import { TransitRoute, TransportType } from '../../types';
import { 
  Search, 
  Bus, 
  Train, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Filter, 
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface RouteExplorerProps {
  routes: TransitRoute[];
  onSelectRouteForPrediction: (routeId: string) => void;
}

export const RouteExplorer: React.FC<RouteExplorerProps> = ({
  routes,
  onSelectRouteForPrediction
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRouteDetail, setSelectedRouteDetail] = useState<TransitRoute | null>(routes[0] || null);

  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      const matchesType = selectedType === 'all' || route.transportType.toLowerCase() === selectedType.toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        route.routeName.toLowerCase().includes(q) ||
        route.source.toLowerCase().includes(q) ||
        route.destination.toLowerCase().includes(q) ||
        route.routeCode.toLowerCase().includes(q) ||
        route.stops.some(s => s.toLowerCase().includes(q));
      return matchesType && matchesSearch;
    });
  }, [routes, selectedType, searchQuery]);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
          NETWORK INVENTORY & STOP CORRIDORS
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Public Transit Route Explorer
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore suburban train corridors, metro rapid transit lines, and municipal feeder bus routes
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by route, station (e.g. Andheri, Dadar, Kurla)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-slate-500"
          />
        </div>

        {/* Transport Type Segmented Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs w-full sm:w-auto justify-center">
          {['all', 'train', 'metro', 'bus'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-md font-medium capitalize transition-colors ${
                selectedType === type
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

      </div>

      {/* Master-Detail Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Route Cards List */}
        <div className="lg:col-span-6 space-y-3">
          <div className="text-xs text-slate-400 font-mono">
            Showing {filteredRoutes.length} route{filteredRoutes.length === 1 ? '' : 's'}
          </div>

          {filteredRoutes.map((route) => {
            const isSelected = selectedRouteDetail?.id === route.id;
            return (
              <div
                key={route.id}
                onClick={() => setSelectedRouteDetail(route)}
                className={`rounded-xl border p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-emerald-500/60 bg-slate-900/90 ring-1 ring-emerald-500/30 shadow-md'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-emerald-400 font-bold">
                      {route.routeCode}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono uppercase">
                      {route.transportType}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    Every {route.frequencyMin}m
                  </span>
                </div>

                <div className="font-display text-sm sm:text-base font-bold text-white mb-2">
                  {route.routeName}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <span className="text-emerald-400 font-semibold">{route.source}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  <span className="text-emerald-400 font-semibold">{route.destination}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 mt-3 pt-2.5">
                  <span>{route.stops.length} Station Stops</span>
                  <span>{route.distanceKm} km · ~{route.avgDurationMin} min</span>
                  <span>Cap: {route.capacityPerVehicle} pax</span>
                </div>
              </div>
            );
          })}

          {filteredRoutes.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-slate-500 text-xs">
              No transit routes match your search query.
            </div>
          )}
        </div>

        {/* Selected Route Detail & Station Diagram */}
        <div className="lg:col-span-6 sticky top-20">
          {selectedRouteDetail ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 backdrop-blur-sm space-y-5">
              
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                    Active Corridor Specification
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-1">
                    {selectedRouteDetail.routeName}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {selectedRouteDetail.source} to {selectedRouteDetail.destination}
                  </div>
                </div>

                <button
                  onClick={() => onSelectRouteForPrediction(selectedRouteDetail.id)}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors flex items-center gap-1 shadow-sm shrink-0"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Predict Crowd</span>
                </button>
              </div>

              {/* Corridor Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Distance</div>
                  <div className="font-mono text-sm font-bold text-white">{selectedRouteDetail.distanceKm} km</div>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Avg Travel Time</div>
                  <div className="font-mono text-sm font-bold text-white">{selectedRouteDetail.avgDurationMin} mins</div>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Unit Capacity</div>
                  <div className="font-mono text-sm font-bold text-emerald-400">{selectedRouteDetail.capacityPerVehicle} pax</div>
                </div>
              </div>

              {/* Station Stop Timeline */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-3">
                  <span>Station Route Map & Sequence</span>
                  <span className="text-[11px] font-mono text-slate-400">{selectedRouteDetail.stops.length} stops</span>
                </div>

                <div className="relative pl-6 space-y-3.5 border-l-2 border-emerald-500/30 ml-2">
                  {selectedRouteDetail.stops.map((stop, idx) => {
                    const isFirst = idx === 0;
                    const isLast = idx === selectedRouteDetail.stops.length - 1;

                    return (
                      <div key={stop} className="relative group">
                        <div 
                          className={`absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 ${
                            isFirst || isLast
                              ? 'border-emerald-400 bg-emerald-500 ring-2 ring-emerald-500/30'
                              : 'border-slate-600 bg-slate-900 group-hover:border-emerald-400'
                          }`}
                        />
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-medium ${isFirst || isLast ? 'text-white font-bold' : 'text-slate-300'}`}>
                            {stop}
                          </span>
                          {isFirst && (
                            <span className="text-[10px] font-mono text-emerald-400">Origin</span>
                          )}
                          {isLast && (
                            <span className="text-[10px] font-mono text-emerald-400">Terminus</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-slate-500 text-xs">
              Select a route to view its stations and schedule
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
