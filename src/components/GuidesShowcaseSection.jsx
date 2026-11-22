import React from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { guidesData } from "../data/guides";
import { locationsData } from "../data/locations";

export default function GuidesShowcaseSection() {
  return (
    <section
      id="guides-section"
      className="py-16 lg:py-24 bg-zinc-950 relative border-t border-zinc-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Mississippi City &amp; Smokehouse Guides</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase">
              In-Depth Mississippi Food Guides &amp; Reviews
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mt-1">
              Every spot features our full Likes vs. Dislikes breakdown, must-order dishes, official restaurant menus, social links, and POV YouTube episodes.
            </p>
          </div>
        </div>

        {/* 4 Pillar Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guidesData.map((guide) => (
            <a
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group bg-zinc-900 border border-zinc-800 hover:border-amber-500/60 rounded-3xl p-6 sm:p-7 shadow-xl transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/15 border border-amber-500/30 text-amber-300">
                  {guide.badge}
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-amber-300 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 line-clamp-3 leading-relaxed">
                  {guide.tldr}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-bold text-amber-300">
                <span>Read Full Guide ({guide.spotSlugs.length} Spots)</span>
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Direct Crawl & Reader Index of All Individual Spot Review Pages */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="font-heading font-bold text-lg text-white">
            All {locationsData.length} Individual Mississippi Reviews (Likes, Dislikes &amp; Official Menus)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
            {locationsData.map((loc) => (
              <a
                key={loc.id}
                href={`/reviews/${loc.slug}`}
                className="px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 text-zinc-200 hover:text-amber-300 font-semibold flex items-center justify-between gap-2 transition-colors"
              >
                <span className="truncate">
                  {loc.name} ({loc.city})
                </span>
                <span className="text-amber-300 shrink-0">★ {loc.rating}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
