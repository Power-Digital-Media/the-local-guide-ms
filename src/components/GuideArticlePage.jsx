import React from "react";
import {
  Sparkles,
  MapPin,
  Star,
  BookOpen,
  Navigation,
  ExternalLink,
  Award,
  CheckCircle2,
} from "lucide-react";
import { YouTubeIcon } from "./Icons";
import { locationsData } from "../data/locations";
import { guidesData } from "../data/guides";
import { channelConfig } from "../data/channelConfig";

export default function GuideArticlePage({ guide }) {
  const spots = guide.spotSlugs
    .map((slug) => locationsData.find((l) => l.slug === slug))
    .filter(Boolean);

  const otherGuides = guidesData.filter((g) => g.slug !== guide.slug);

  return (
    <article className="pt-28 pb-20 bg-zinc-950 text-zinc-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex flex-wrap items-center gap-2"
        >
          <a href="/" className="text-amber-300 hover:underline">
            Home
          </a>
          <span aria-hidden="true">/</span>
          <a href="/spots" className="text-amber-300 hover:underline">
            Mississippi Guides
          </a>
          <span aria-hidden="true">/</span>
          <span className="text-zinc-200">{guide.badge}</span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="px-3 py-1 rounded-full font-extrabold uppercase bg-amber-500 text-zinc-950">
              {guide.badge}
            </span>
            <span className="text-zinc-300 font-medium">
              Updated {guide.updatedAt} • Self-Paid Reviews
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-wide leading-tight">
            {guide.title}
          </h1>

          <p className="text-sm sm:text-base text-zinc-200 leading-relaxed max-w-3xl">
            {guide.intro}
          </p>

          {/* Author E-E-A-T Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-3">
              <img
                src={channelConfig.logos.goldBadge}
                alt="Damein Donald & Mary"
                width="44"
                height="44"
                className="w-11 h-11 rounded-full border border-amber-500/60 object-cover"
              />
              <div>
                <div className="text-xs sm:text-sm font-bold text-white flex flex-wrap items-center gap-2">
                  <span>By Damein Donald &amp; Mary (The Local Guide MS)</span>
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 uppercase">
                    <Award className="w-3 h-3" aria-hidden="true" />
                    Level 7 Local Guide • 3M+ Map Views
                  </span>
                </div>
                <p className="text-xs text-zinc-300">
                  Official YouTube:{" "}
                  <a
                    href={channelConfig.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:underline font-semibold"
                  >
                    @TheLocalGuide-MS
                  </a>
                </p>
              </div>
            </div>

            <a
              href={channelConfig.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-red-700 hover:bg-red-600 text-white"
            >
              <YouTubeIcon className="w-4 h-4 fill-white" />
              <span>Subscribe on YouTube</span>
            </a>
          </div>
        </header>

        {/* Answer-First Quick Summary (TL;DR for Readers & AI Assistants) */}
        <section
          aria-labelledby="quick-answer-heading"
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/15 via-zinc-900 to-zinc-900 border border-amber-500/40 shadow-xl space-y-3"
        >
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-300">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <h2 id="quick-answer-heading">Quick Answer &amp; Local Picks Summary</h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-100 leading-relaxed font-medium">
            {guide.tldr}
          </p>
        </section>

        {/* Ranked / Reviewed Spots Breakdown */}
        <section aria-labelledby="picks-breakdown-heading" className="space-y-6">
          <h2
            id="picks-breakdown-heading"
            className="font-display text-3xl sm:text-4xl text-white uppercase tracking-wide"
          >
            Reviewed Locations, Menus &amp; Verdicts
          </h2>

          <div className="space-y-6">
            {spots.map((spot, idx) => (
              <div
                key={spot.id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-md font-extrabold bg-amber-500 text-zinc-950">
                        #{idx + 1}
                      </span>
                      <span className="text-amber-300 font-bold uppercase tracking-wider">
                        {spot.categoryLabel}
                      </span>
                      <span className="text-zinc-300">• {spot.price}</span>
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-white">
                      <a
                        href={`/reviews/${spot.slug}`}
                        className="hover:text-amber-300 transition-colors"
                      >
                        {spot.name} ({spot.city}, MS)
                      </a>
                    </h3>
                    <p className="text-xs text-zinc-300 flex items-center gap-1">
                      <MapPin
                        className="w-3.5 h-3.5 text-amber-400 shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        {spot.address} {spot.phone ? `• ${spot.phone}` : ""}
                      </span>
                    </p>
                  </div>

                  <div className="px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center gap-1.5 text-amber-300 font-bold text-sm">
                    <Star
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                    <span>{spot.rating.toFixed(1)} / 5</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {spot.fullReview}
                </p>

                <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs space-y-1.5">
                  <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                    Must-Order &amp; Top Highlight:
                  </div>
                  <p className="text-zinc-100 font-semibold">{spot.mustTry}</p>
                  {spot.liked?.[0] && (
                    <p className="text-zinc-300 flex items-start gap-1.5 pt-1">
                      <CheckCircle2
                        className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{spot.liked[0]}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  <a
                    href={`/reviews/${spot.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 transition-colors"
                  >
                    <span>Full Likes &amp; Dislikes Review</span>
                  </a>

                  {spot.youtubeEpisodeId && (
                    <a
                      href={`https://www.youtube.com/watch?v=${spot.youtubeEpisodeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-red-700 hover:bg-red-600 text-white transition-colors"
                    >
                      <YouTubeIcon className="w-3.5 h-3.5 fill-white" />
                      <span>Watch Video Review</span>
                    </a>
                  )}

                  {spot.officialLinks?.menuUrl && (
                    <a
                      href={spot.officialLinks.menuUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                      <span>Official Menu</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  )}

                  <a
                    href={spot.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-blue-600 text-zinc-100 hover:text-white border border-zinc-700"
                  >
                    <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Google Maps</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Direct Q&A Section */}
        {guide.faqs && guide.faqs.length > 0 && (
          <section
            aria-labelledby="guide-qa-heading"
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl"
          >
            <h2
              id="guide-qa-heading"
              className="font-display text-3xl text-white uppercase tracking-wide"
            >
              Common Questions Answered by Damein &amp; Mary
            </h2>
            <div className="space-y-4">
              {guide.faqs.map((f, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1.5"
                >
                  <h3 className="font-heading font-bold text-base text-amber-300">
                    {f.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Other Guides */}
        <section aria-labelledby="more-guides-heading" className="space-y-4">
          <h2
            id="more-guides-heading"
            className="font-heading font-bold text-xl text-white"
          >
            More Mississippi Food &amp; Travel Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherGuides.map((g) => (
              <a
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all block space-y-1.5"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  {g.badge}
                </span>
                <h3 className="font-heading font-bold text-base text-white">
                  {g.title}
                </h3>
              </a>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
