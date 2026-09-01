import React from "react";
import { MapPin, Heart, ExternalLink, ArrowUp } from "lucide-react";
import { YouTubeIcon, InstagramIcon, FacebookIcon } from "./Icons";
import { channelConfig } from "../data/channelConfig";

export default function Footer({ onOpenSuggestModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-850 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Call to Action Banner */}
        <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-amber-950/40 border border-zinc-800 rounded-3xl p-8 sm:p-10 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5 text-center md:text-left">
            <img
              src={channelConfig.logos.goldBadge}
              alt="The Local Guide MS"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-500/60 shadow-xl object-cover shrink-0 hidden sm:block"
            />
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-white uppercase">
                Never Miss A Mississippi Food Adventure
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl">
                Subscribe to our YouTube channel for weekly first-person POV diner tours, hidden gems, and Mississippi travel vlogs.
              </p>
            </div>
          </div>

          <a
            href={channelConfig.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-500 text-white shadow-xl shadow-red-900/50 flex items-center gap-2 shrink-0 hover:scale-105 transition-all"
          >
            <YouTubeIcon className="w-5 h-5 fill-white" />
            <span>Subscribe @TheLocalGuide-MS</span>
          </a>
        </div>

        {/* 4 Column Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-850 text-xs">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src={channelConfig.logos.goldBadge}
                alt="Logo"
                className="w-10 h-10 rounded-full border border-amber-500"
              />
              <span className="font-display text-xl text-white uppercase">The Local Guide MS</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Eat Local. Support Local. Celebrating Mississippi's rich culinary roots, diners, road trips, and small businesses.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={channelConfig.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-red-500 hover:text-white hover:bg-red-600 transition-colors"
                aria-label="YouTube"
                title="YouTube Channel"
              >
                <YouTubeIcon className="w-4 h-4 fill-current" />
              </a>
              <a
                href={channelConfig.googleMapsProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-blue-400 hover:text-white hover:bg-blue-600 transition-colors"
                aria-label="Google Maps"
                title="Damein's Google Maps Profile"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <a
                href={channelConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-pink-500 hover:text-white hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={channelConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-blue-500 hover:text-white hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
                title="Facebook"
              >
                <FacebookIcon className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Mississippi Regions */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Mississippi Regions
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#map-section" className="hover:text-amber-400 transition-colors">Jackson Metro & Fondren</a></li>
              <li><a href="#map-section" className="hover:text-amber-400 transition-colors">Mississippi Gulf Coast</a></li>
              <li><a href="#map-section" className="hover:text-amber-400 transition-colors">The Mississippi Delta</a></li>
              <li><a href="#map-section" className="hover:text-amber-400 transition-colors">Oxford & North Mississippi</a></li>
              <li><a href="#map-section" className="hover:text-amber-400 transition-colors">Natchez & River Trail</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#map-section" className="hover:text-amber-400 transition-colors">Interactive Map</a></li>
              <li><a href="#videos-section" className="hover:text-amber-400 transition-colors">YouTube Video Episodes</a></li>
              <li><a href="#itineraries-section" className="hover:text-amber-400 transition-colors">Curated Road Trips</a></li>
              <li><a href="#google-maps-section" className="hover:text-amber-400 transition-colors">Google Maps Guide Hub</a></li>
              <li>
                <button
                  onClick={onOpenSuggestModal}
                  className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  + Suggest a Mississippi Spot
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Local Guide notice */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Local Guide Ethics
            </h4>
            <p className="text-zinc-400 leading-relaxed">
              All reviews are completely independent. We are proud Mississippians dedicated to highlighting genuine local flavor and culture.
            </p>
            <div className="pt-1">
              <span className="inline-block px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400">
                Filmed on Ray-Ban Meta & 4K Gear
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} The Local Guide MS. All rights reserved.</span>
            <span>•</span>
            <span className="text-zinc-400">Made with southern pride in Mississippi</span>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
