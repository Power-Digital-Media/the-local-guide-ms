import React from "react";
import { MapPin, Heart, CheckCircle } from "lucide-react";
import { YouTubeIcon, TikTokIcon, MetaGlassesIcon } from "./Icons";
import { channelConfig } from "../data/channelConfig";
import { trackGuideEvent } from "../utils/analytics";

export default function AboutHost() {
  return (
    <section
      id="about-section"
      className="py-16 lg:py-24 bg-zinc-950 relative border-t border-zinc-800/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bio & Channel Philosophy (first in DOM so h2 precedes h3; lg:order-2 preserves desktop layout) */}
          <div className="lg:col-span-7 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Eat Local. Support Local.</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase leading-tight">
              Real Reviews. Real Food. <br />
              <span className="text-amber-400">Real Mississippi Experiences.</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
              Welcome to <strong className="text-white">The Local Guide MS</strong> with{" "}
              <strong className="text-amber-300">Damein &amp; Mary</strong>. This channel was born out of a simple passion: putting Mississippi&apos;s mom-and-pop restaurants, legendary BBQ pits, catfish houses, and historic landmarks on the map.
            </p>

            <p className="text-sm text-zinc-300 leading-relaxed">
              With over <strong className="text-sky-300 font-semibold">3 Million+ photo views</strong> on Google Maps, Damein brings years of verified local guide exploration, while Mary joins the journey across Mississippi tasting every dish, testing every lunch special, and bringing you along for authentic southern road trips.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <CheckCircle
                  className="w-5 h-5 text-amber-400 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-xs font-bold text-zinc-100">
                    100% Independent Reviews
                  </h3>
                  <p className="text-[11px] text-zinc-300">
                    We pay for our own meals and share raw, authentic feedback.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <CheckCircle
                  className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-xs font-bold text-zinc-100">
                    Supporting Small Businesses
                  </h3>
                  <p className="text-[11px] text-zinc-300">
                    Spotlighting local entrepreneurs and family-run diners statewide.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={channelConfig.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackGuideEvent("youtube_subscribe_click", {
                    location: "about_host",
                  })
                }
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-red-700 hover:bg-red-600 text-white shadow-xl shadow-red-900/40 transition-all"
              >
                <YouTubeIcon className="w-4 h-4 fill-white" />
                <span>Join Our Community on YouTube</span>
              </a>

              <a
                href={channelConfig.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackGuideEvent("tiktok_follow_click", {
                    location: "about_host",
                  })
                }
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-zinc-900 hover:bg-zinc-800 border border-cyan-500/40 text-cyan-300 hover:text-white transition-all"
              >
                <TikTokIcon className="w-4 h-4" aria-hidden="true" />
                <span>Follow @thelocalguidems on TikTok</span>
              </a>
            </div>
          </div>

          {/* Host Image / Brand Badge */}
          <div className="lg:col-span-5 lg:order-1 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition duration-500"></div>

              <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
                <img
                  src={channelConfig.logos.classicDiner}
                  alt="Damein and Mary — Hosts of The Local Guide MS"
                  width="256"
                  height="256"
                  loading="lazy"
                  decoding="async"
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-2xl mx-auto border-2 border-zinc-800 shadow-xl"
                />
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                    Damein &amp; Mary
                  </h3>
                  <p className="text-xs text-amber-300 font-semibold tracking-wide uppercase">
                    Hosts &amp; Creators • The Local Guide MS
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-300">
                  <span className="flex items-center gap-1">
                    <MapPin
                      className="w-3.5 h-3.5 text-red-400"
                      aria-hidden="true"
                    />{" "}
                    Jackson, MS
                  </span>
                  <span aria-hidden="true">•</span>
                  <span className="flex items-center gap-1">
                    <MetaGlassesIcon className="w-3.5 h-3.5 text-amber-400" />{" "}
                    POV Filming
                  </span>
                  <span aria-hidden="true">•</span>
                  <span className="text-sky-300 font-bold">3M+ Map Views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
