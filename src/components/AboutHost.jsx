import React from "react";
import { MapPin, Heart, Shield, Award, CheckCircle } from "lucide-react";
import { YouTubeIcon, MetaGlassesIcon } from "./Icons";
import { channelConfig } from "../data/channelConfig";

export default function AboutHost() {
  return (
    <section className="py-16 lg:py-24 bg-zinc-950 relative border-t border-zinc-850 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Host image / Brand badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
                <img
                  src={channelConfig.logos.classicDiner}
                  alt="Damein & Mary - The Local Guide MS"
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-2xl mx-auto border-2 border-zinc-800 shadow-xl"
                />
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">Damein & Mary</h3>
                  <p className="text-xs text-amber-400 font-semibold tracking-wide uppercase">
                    Hosts & Creators • The Local Guide MS
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400" /> Jackson, MS
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MetaGlassesIcon className="w-3.5 h-3.5 text-amber-400" /> POV Filming
                  </span>
                  <span>•</span>
                  <span className="text-blue-400 font-bold">2.2M+ Map Views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Channel Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5" />
              <span>Eat Local. Support Local.</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase leading-tight">
              Real Reviews. Real Food. <br />
              <span className="text-amber-400">Real Mississippi Experiences.</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Welcome to <strong className="text-white">The Local Guide MS</strong> with <strong className="text-amber-400">Damein & Mary</strong>. This channel was born out of a simple passion: putting Mississippi’s mom-and-pop restaurants, legendary BBQ pits, secret coastal seafood shacks, and historic landmarks on the map.
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed">
              With over <strong className="text-blue-400 font-semibold">2.2 Million+ photo views</strong> on Google Maps, Damein brings years of verified local guide exploration, while Mary joins the journey across Mississippi tasting every dish, rating every burger, and bringing you along for authentic southern road trips.
            </p>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-100">100% Independent Reviews</h4>
                  <p className="text-[11px] text-zinc-400">We pay for our meals and share raw, authentic feedback.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-100">Supporting Small Businesses</h4>
                  <p className="text-[11px] text-zinc-400">Spotlighting local entrepreneurs and family-run diners statewide.</p>
                </div>
              </div>
            </div>

            {/* Subscribe CTA */}
            <div className="pt-2">
              <a
                href={channelConfig.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-500 text-white shadow-xl shadow-red-900/40 transition-all"
              >
                <YouTubeIcon className="w-4 h-4 fill-white" />
                <span>Join Our Community on YouTube</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
