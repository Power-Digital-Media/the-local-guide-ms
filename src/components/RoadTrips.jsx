import React, { useState } from "react";
import { Route, Clock, MapPin, Compass, ChevronRight, Navigation, Sparkles, Car } from "lucide-react";
import { itinerariesData } from "../data/itineraries";

export default function RoadTrips() {
  const [selectedItinerary, setSelectedItinerary] = useState(itinerariesData[0]);

  return (
    <section id="itineraries-section" className="py-16 lg:py-24 bg-zinc-950 relative border-t border-zinc-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Car className="w-3.5 h-3.5" />
            <span>Curated Mississippi Road Trips</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase">
            Turn Our Vlogs Into Your Next Weekend Adventure
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Follow our pre-planned multi-stop foodie trails and historic drives. Each itinerary is verified for drive times, local flavor, and unforgettable sights.
          </p>
        </div>

        {/* Itinerary Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {itinerariesData.map((itin) => {
            const isSelected = selectedItinerary.id === itin.id;
            return (
              <button
                key={itin.id}
                onClick={() => setSelectedItinerary(itin)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-zinc-900 border-amber-500 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/50"
                    : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                    isSelected ? "bg-amber-500 text-zinc-950" : "bg-zinc-800 text-zinc-400"
                  }`}>
                    {itin.badge}
                  </span>
                  <span className="text-zinc-400 font-medium">{itin.duration}</span>
                </div>
                <h3 className={`font-heading font-bold text-lg leading-snug ${
                  isSelected ? "text-white" : "text-zinc-300"
                }`}>
                  {itin.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{itin.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Active Itinerary Showcase Card */}
        {selectedItinerary && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Details */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-xs text-amber-400 font-bold uppercase mb-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedItinerary.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Route className="w-3.5 h-3.5" />
                      {selectedItinerary.driveDistance}
                    </span>
                    <span>•</span>
                    <span>{selectedItinerary.stopsCount} Stops</span>
                  </div>

                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                    {selectedItinerary.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    {selectedItinerary.subtitle}
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Trip Highlights:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedItinerary.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-200">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Road Trip Navigation CTA */}
                <div className="pt-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(selectedItinerary.stops[0].name)}&destination=${encodeURIComponent(selectedItinerary.stops[selectedItinerary.stops.length - 1].name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-xl shadow-amber-500/20 transition-all"
                  >
                    <Navigation className="w-4 h-4 text-zinc-950" />
                    <span>Open Route in Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Right: Step-by-step stops timeline */}
              <div className="lg:col-span-6 bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 space-y-4">
                <h4 className="font-heading font-bold text-base text-zinc-100 flex items-center justify-between">
                  <span>Itinerary Stops & Timeline</span>
                  <span className="text-xs text-zinc-400 font-normal">Step-by-step guide</span>
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
                  {selectedItinerary.stops.map((stop, index) => (
                    <div key={index} className="relative group">
                      {/* Step node indicator */}
                      <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-zinc-900 border-2 border-amber-500 flex items-center justify-center text-[10px] font-bold text-amber-400 shadow-md">
                        {index + 1}
                      </div>

                      <div className="bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800/80 hover:border-amber-500/40 rounded-xl p-3 transition-colors">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-zinc-100">{stop.name}</span>
                          <span className="text-[10px] text-amber-400 font-medium">{stop.city}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          {stop.stopType}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
