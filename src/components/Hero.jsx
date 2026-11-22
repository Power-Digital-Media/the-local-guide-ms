import React from "react";
import { MapPin, Compass, Play } from "lucide-react";
import { YouTubeIcon, MetaGlassesIcon } from "./Icons";
import { channelConfig } from "../data/channelConfig";
import { trackGuideEvent } from "../utils/analytics";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background Graphic & Glow */}
      <div className="absolute inset-0 z-0">
        <img
          src={channelConfig.logos.channelBanner}
          alt=""
          aria-hidden="true"
          width="1440"
          height="810"
          fetchPriority="high"
          className="w-full h-full object-cover object-center opacity-25 filter blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-zinc-950/60"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/15 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase shadow-lg shadow-amber-950/40">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" aria-hidden="true"></span>
              <span>Official Hub of YouTube @TheLocalGuide-MS</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.92]">
                EAT LOCAL. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 drop-shadow-sm">
                  SUPPORT LOCAL.
                </span>
              </h1>
              <p className="font-heading text-lg sm:text-2xl text-zinc-200 font-semibold tracking-wide flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                <span>Mississippi Restaurant Reviews &amp; Food Adventures</span>
              </p>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Join <strong className="text-white font-semibold">Damein &amp; Mary</strong> on first-person POV food tours across Jackson, Pearl, Clinton, Madison, the Delta, and the Mississippi Gulf Coast — 100% self-funded meals and honest verdicts.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#map-section"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-xl shadow-amber-500/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <Compass className="w-5 h-5 text-zinc-950" aria-hidden="true" />
                <span>Explore Mississippi Map</span>
              </a>

              <a
                href="#videos-section"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-zinc-900/90 border border-zinc-700 hover:border-red-500/60 hover:bg-zinc-800 text-white shadow-lg transition-all duration-200"
              >
                <Play className="w-4 h-4 text-red-400 fill-red-400" aria-hidden="true" />
                <span>Watch Video Reviews</span>
              </a>

              <a
                href={channelConfig.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGuideEvent("youtube_subscribe_click", { location: "hero" })}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-red-700 hover:bg-red-600 text-white transition-all duration-200"
              >
                <YouTubeIcon className="w-4 h-4 fill-white" />
                <span>Subscribe</span>
              </a>
            </div>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-800/80">
              <div className="p-3 rounded-xl bg-zinc-900/70 border border-sky-500/30 text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-bold font-heading text-sky-300">
                  {channelConfig.stats.photoViews}
                </div>
                <div className="text-[11px] text-zinc-300 uppercase tracking-wider font-medium">
                  Maps Photo Views
                </div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-bold font-heading text-amber-300">
                  {channelConfig.stats.spotsReviewed}
                </div>
                <div className="text-[11px] text-zinc-300 uppercase tracking-wider font-medium">
                  Places Reviewed
                </div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-bold font-heading text-zinc-100">
                  {channelConfig.stats.citiesCovered}
                </div>
                <div className="text-[11px] text-zinc-300 uppercase tracking-wider font-medium">
                  MS Towns &amp; Cities
                </div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-bold font-heading text-emerald-300">
                  {channelConfig.stats.honestReviews}
                </div>
                <div className="text-[11px] text-zinc-300 uppercase tracking-wider font-medium">
                  Self-Paid Meals
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-red-500/10 blur-2xl rounded-full"></div>

            <div className="relative w-full max-w-md bg-zinc-900/90 rounded-3xl border border-zinc-700/80 p-6 shadow-2xl backdrop-blur-md overflow-hidden group">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
                    <MetaGlassesIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-100">
                      First-Person POV Food Tours
                    </span>
                    <p className="text-[11px] text-zinc-300">
                      Filmed with Meta Smart Glasses &amp; 4K
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                  ACTIVE GUIDES
                </span>
              </div>

              <div className="relative flex justify-center py-2">
                <div className="relative">
                  <img
                    src={channelConfig.logos.greenGrit}
                    alt="The Local Guide MS Badge"
                    width="256"
                    height="256"
                    className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-full shadow-2xl border-4 border-zinc-800 group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute -bottom-2 right-2 bg-zinc-950 border border-amber-500/50 rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                    <span className="text-xs font-bold text-zinc-100">Jackson, MS</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-800/80 text-center">
                <p className="text-xs italic text-zinc-200">
                  &ldquo;No paid scripts. Just honest reviews, big flavors, and supporting local Mississippi businesses.&rdquo;
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-amber-300">
                  <span>Level 7 Google Local Guide</span>
                  <span aria-hidden="true">•</span>
                  <span>2.2M+ Views</span>
                  <span aria-hidden="true">•</span>
                  <span>Damein &amp; Mary</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
