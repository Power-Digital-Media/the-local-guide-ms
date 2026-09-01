import React from "react";
import { MapPin, Navigation, Star, Award, ShieldCheck, Share2, ExternalLink, Bookmark, CheckCircle, Eye, ThumbsUp, Camera } from "lucide-react";
import { channelConfig } from "../data/channelConfig";

export default function GoogleMapsHub() {
  return (
    <section id="google-maps-section" className="py-16 lg:py-24 bg-zinc-950 relative border-t border-zinc-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle ambient bg */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-blue-500/10 blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Local Guide Identity */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Verified Google Maps Contributor Profile</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase leading-tight">
                Connect Directly To <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-400">
                  Damein's Google Maps
                </span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                Explore real reviews, unfiltered food ratings, high-res dish photos, and verified location pins directly on Google Maps. Follow our official contributor profile to get instant notifications whenever a new Mississippi spot is reviewed.
              </p>

              {/* Local Guide Verified Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-sm text-zinc-100">Local Guide</span>
                  </div>
                  <p className="text-xs text-zinc-400">Top Mississippi Foodie</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Camera className="w-5 h-5 text-blue-400" />
                    <span className="font-bold text-sm text-zinc-100">Live Photos</span>
                  </div>
                  <p className="text-xs text-zinc-400">First-hand food views</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="font-bold text-sm text-zinc-100">100% Honest</span>
                  </div>
                  <p className="text-xs text-zinc-400">Authentic diner reviews</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href={channelConfig.googleMapsProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-xl shadow-blue-900/40 hover:-translate-y-0.5 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>View Damein's Google Maps Profile</span>
                  <ExternalLink className="w-4 h-4 opacity-80" />
                </a>

                <a
                  href="#map-section"
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-zinc-800 hover:bg-zinc-750 text-zinc-200 border border-zinc-700 transition-all"
                >
                  <Bookmark className="w-4 h-4 text-amber-400" />
                  <span>Explore Interactive Web Map</span>
                </a>
              </div>
            </div>

            {/* Right Column: Google Maps Live Profile Preview Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-zinc-950 border-2 border-zinc-750 rounded-3xl p-6 shadow-2xl space-y-5 group hover:border-blue-500/50 transition-all">
                
                {/* Profile Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={channelConfig.logos.goldBadge}
                        alt="Damein Donald"
                        className="w-14 h-14 rounded-full border-2 border-amber-500/60 object-cover shadow-lg"
                      />
                      <span className="absolute bottom-0 right-0 p-0.5 bg-blue-600 rounded-full text-white border border-zinc-950">
                        <CheckCircle className="w-3.5 h-3.5 fill-current" />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-white flex items-center gap-1.5">
                        <span>Damein Donald</span>
                      </h4>
                      <p className="text-xs text-blue-400 font-medium">
                        Google Maps Local Guide
                      </p>
                      <p className="text-[10px] text-zinc-500 font-mono">ID: 117260776182521505370</p>
                    </div>
                  </div>

                  <a
                    href={channelConfig.googleMapsProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
                    title="Open on Google Maps"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Profile Key Stats */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-0.5">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold">Active Territory</span>
                    <p className="text-zinc-100 font-bold text-sm">Jackson & Mississippi</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-0.5">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold">Content Specialty</span>
                    <p className="text-amber-400 font-bold text-sm">Food, BBQ & Diners</p>
                  </div>
                </div>

                {/* Direct Action Link */}
                <a
                  href={channelConfig.googleMapsProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-zinc-900 border border-blue-500/30 hover:border-blue-500 hover:bg-blue-600/10 text-blue-300 transition-all cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Open Full Contributor Profile in Maps App</span>
                </a>

                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-blue-500/10 border border-zinc-800/80 text-center">
                  <p className="text-xs text-zinc-300">
                    Want your business or favorite Mississippi gem reviewed?
                  </p>
                  <a
                    href="#suggest-spot"
                    className="inline-block mt-1 text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline"
                  >
                    Submit to Damein's review queue &rarr;
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
