import React, { useState, useEffect } from "react";
import { MapPin, Compass, Tv, Route, PlusCircle, Menu, X } from "lucide-react";
import { YouTubeIcon } from "./Icons";
import { channelConfig } from "../data/channelConfig";
import { trackGuideEvent } from "../utils/analytics";

export default function Navbar({ onOpenSuggestModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-zinc-950/92 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-3"
          : "bg-gradient-to-b from-zinc-950/95 via-zinc-950/75 to-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src={channelConfig.logos.goldBadge}
              alt="The Local Guide MS Logo"
              width="48"
              height="48"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-amber-500/60 shadow-lg shadow-amber-500/10 group-hover:border-amber-400 group-hover:scale-105 transition-transform duration-300 object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-zinc-900"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-xl sm:text-2xl tracking-wider text-zinc-100 group-hover:text-amber-400 transition-colors uppercase">
                The Local Guide <span className="text-amber-400">MS</span>
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-zinc-300 font-medium tracking-wide uppercase flex items-center gap-1">
              <span className="text-amber-300 font-semibold">Eat Local.</span> Support Local.
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
          <a
            href="/spots"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-200 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <Compass className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <span>MS Spots Directory</span>
          </a>
          <a
            href="/#videos-section"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-200 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <Tv className="w-4 h-4 text-red-400" aria-hidden="true" />
            <span>Video Reviews</span>
          </a>
          <a
            href="/road-trips"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-200 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <Route className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>Road Trips</span>
          </a>
          <a
            href="/#google-maps-section"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-200 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <MapPin className="w-4 h-4 text-sky-400" aria-hidden="true" />
            <span>Google Maps Hub</span>
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/suggest-a-spot"
            onClick={(e) => {
              if (window.location.pathname === "/" && onOpenSuggestModal) {
                e.preventDefault();
                onOpenSuggestModal();
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-900 border border-zinc-700 text-zinc-100 hover:border-amber-400 hover:text-amber-300 hover:bg-zinc-800 transition-all shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span>Suggest Spot</span>
          </a>

          <a
            href={channelConfig.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackGuideEvent("youtube_subscribe_click", { location: "navbar" })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-red-700 hover:bg-red-600 text-white shadow-lg shadow-red-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <YouTubeIcon className="w-4 h-4 fill-white" />
            <span>Subscribe</span>
          </a>
        </div>

        {/* Mobile menu hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Toggle Navigation"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/98 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col space-y-1">
            <a
              href="/spots"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-zinc-100 hover:bg-zinc-900 hover:text-amber-300"
            >
              <Compass className="w-5 h-5 text-amber-400" aria-hidden="true" />
              <span>Mississippi Spots Directory</span>
            </a>
            <a
              href="/#videos-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-zinc-100 hover:bg-zinc-900 hover:text-red-300"
            >
              <Tv className="w-5 h-5 text-red-400" aria-hidden="true" />
              <span>YouTube Video Reviews</span>
            </a>
            <a
              href="/road-trips"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-zinc-100 hover:bg-zinc-900 hover:text-emerald-300"
            >
              <Route className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              <span>Mississippi Road Trips &amp; Trails</span>
            </a>
            <a
              href="/#google-maps-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-zinc-100 hover:bg-zinc-900 hover:text-sky-300"
            >
              <MapPin className="w-5 h-5 text-sky-400" aria-hidden="true" />
              <span>Google Maps Local Guide Hub</span>
            </a>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <a
              href="/suggest-a-spot"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-zinc-900 border border-zinc-700 text-zinc-100 hover:border-amber-400"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>Suggest a Mississippi Spot</span>
            </a>
            <a
              href={channelConfig.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGuideEvent("youtube_subscribe_click", { location: "mobile_drawer" })}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-red-700 hover:bg-red-600 text-white shadow-lg shadow-red-900/40"
            >
              <YouTubeIcon className="w-4 h-4 fill-white" />
              <span>Subscribe on YouTube</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
