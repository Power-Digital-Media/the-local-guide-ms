import React from "react";
import { MapPin, ArrowUp } from "lucide-react";
import { YouTubeIcon, InstagramIcon, FacebookIcon } from "./Icons";
import { channelConfig } from "../data/channelConfig";
import { trackGuideEvent } from "../utils/analytics";

export default function Footer({ onOpenSuggestModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Call to Action Banner */}
        <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-amber-950/40 border border-zinc-800 rounded-3xl p-8 sm:p-10 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5 text-center md:text-left">
            <img
              src={channelConfig.logos.goldBadge}
              alt="The Local Guide MS"
              width="80"
              height="80"
              loading="lazy"
              decoding="async"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-500/60 shadow-xl object-cover shrink-0 hidden sm:block"
            />
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-white uppercase">
                Never Miss A Mississippi Food Adventure
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm mt-1 max-w-xl">
                Subscribe to our YouTube channel for weekly first-person POV restaurant visits, lunch-special tests, and Mississippi travel vlogs.
              </p>
            </div>
          </div>

          <a
            href={channelConfig.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackGuideEvent("youtube_subscribe_click", { location: "footer" })
            }
            className="px-6 py-3.5 rounded-xl font-bold text-sm bg-red-700 hover:bg-red-600 text-white shadow-xl shadow-red-900/50 flex items-center gap-2 shrink-0 hover:scale-105 transition-all"
          >
            <YouTubeIcon className="w-5 h-5 fill-white" />
            <span>Subscribe @TheLocalGuide-MS</span>
          </a>
        </div>

        {/* 4 Column Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/80 text-xs">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src={channelConfig.logos.goldBadge}
                alt="The Local Guide MS Badge"
                width="40"
                height="40"
                loading="lazy"
                decoding="async"
                className="w-10 h-10 rounded-full border border-amber-500"
              />
              <span className="font-display text-xl text-white uppercase">
                The Local Guide MS
              </span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Eat Local. Support Local. Celebrating Mississippi&apos;s culinary roots, family-run diners, road trips, and small businesses.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={channelConfig.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-red-400 hover:text-white hover:bg-red-700 transition-colors"
                aria-label="Watch on YouTube"
              >
                <YouTubeIcon className="w-4 h-4 fill-current" />
              </a>
              <a
                href={channelConfig.googleMapsProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-sky-300 hover:text-white hover:bg-blue-600 transition-colors"
                aria-label="Damein's Google Maps Profile"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <a
                href={channelConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-pink-400 hover:text-white hover:bg-pink-600 transition-colors"
                aria-label="Follow on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={channelConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-blue-400 hover:text-white hover:bg-blue-600 transition-colors"
                aria-label="Follow on Facebook"
              >
                <FacebookIcon className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Mississippi Regions */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Mississippi Regions
            </h3>
            <ul className="space-y-2 text-zinc-300">
              <li>
                <a href="/spots" className="inline-block py-0.5 hover:text-amber-300 transition-colors">
                  Jackson, Fondren, Pearl &amp; Clinton
                </a>
              </li>
              <li>
                <a href="/spots" className="inline-block py-0.5 hover:text-amber-300 transition-colors">
                  Madison &amp; Rankin County
                </a>
              </li>
              <li>
                <a href="/spots" className="inline-block py-0.5 hover:text-amber-300 transition-colors">
                  Mississippi Gulf Coast
                </a>
              </li>
              <li>
                <a href="/spots" className="inline-block py-0.5 hover:text-amber-300 transition-colors">
                  The Mississippi Delta
                </a>
              </li>
              <li>
                <a href="/spots" className="inline-block py-0.5 hover:text-amber-300 transition-colors">
                  Oxford, Natchez &amp; Pine Belt
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Explore Pages
            </h3>
            <ul className="space-y-2 text-zinc-300">
              <li>
                <a href="/" className="inline-block py-0.5 hover:text-amber-300 transition-colors">
                  Home &amp; Interactive Map
                </a>
              </li>
              <li>
                <a href="/spots" className="inline-block py-0.5 hover:text-amber-300 transition-colors">
                  MS Restaurant Directory
                </a>
              </li>
              <li>
                <a href="/road-trips" className="inline-block py-0.5 hover:text-amber-300 transition-colors">
                  Curated Food Road Trips
                </a>
              </li>
              <li>
                <a href="/suggest-a-spot" className="inline-block py-0.5 text-amber-300 hover:text-amber-200 font-semibold transition-colors">
                  + Suggest a Mississippi Spot
                </a>
              </li>
              <li>
                <a href="/#videos-section" className="inline-block py-0.5 hover:text-amber-300 transition-colors">
                  YouTube Video Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Local Guide Ethics */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Local Guide Ethics
            </h3>
            <p className="text-zinc-300 leading-relaxed">
              All reviews are 100% independent — we pay for our own meals and visit unannounced as everyday customers.
            </p>
            <div className="pt-1 flex flex-wrap gap-2">
              <span className="inline-block px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300">
                Filmed on Ray-Ban Meta &amp; 4K Gear
              </span>
              {onOpenSuggestModal && (
                <button
                  type="button"
                  onClick={onOpenSuggestModal}
                  className="px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-[10px] font-bold text-amber-300 hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
                >
                  Quick Suggest Popup
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-300">
          <p className="flex flex-wrap items-center gap-1.5">
            <span>
              © {new Date().getFullYear()} The Local Guide MS. All rights reserved.
            </span>
            <span aria-hidden="true">•</span>
            <span className="text-zinc-300">
              Made with southern pride in Mississippi
            </span>
            <span aria-hidden="true">•</span>
            <span>
              Engineered by{" "}
              <a
                href="https://powerdigitalmedia.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:underline"
              >
                Power Digital Media
              </a>
            </span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 py-1 text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
