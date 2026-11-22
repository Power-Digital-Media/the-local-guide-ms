import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Globe,
  BookOpen,
  Navigation,
  Star,
  ThumbsUp,
  AlertCircle,
  CheckCircle2,
  Play,
  ExternalLink,
  Utensils,
  Award,
} from "lucide-react";
import { YouTubeIcon, InstagramIcon, FacebookIcon } from "./Icons";
import { locationsData } from "../data/locations";
import { guidesData } from "../data/guides";
import { channelConfig } from "../data/channelConfig";
import { trackGuideEvent } from "../utils/analytics";

function TikTokBadgeIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.49c1.22-1.2 1.91-2.84 1.91-4.55V8.79a8.16 8.16 0 0 0 4.77 1.52V6.86a4.85 4.85 0 0 1-.95-.17Z" />
    </svg>
  );
}

export default function SpotReviewPage({ spot }) {
  const [playInlineVideo, setPlayInlineVideo] = useState(false);

  const links = spot.officialLinks || {};
  const hasAnyOfficialWeb =
    links.website ||
    links.menuUrl ||
    links.facebook ||
    links.instagram ||
    links.tiktok;

  const relatedSpots = locationsData
    .filter((l) => l.id !== spot.id)
    .sort((a, b) => {
      const sameRegionA = a.region === spot.region ? 1 : 0;
      const sameRegionB = b.region === spot.region ? 1 : 0;
      if (sameRegionA !== sameRegionB) return sameRegionB - sameRegionA;
      return (b.povEpisode ? 1 : 0) - (a.povEpisode ? 1 : 0);
    })
    .slice(0, 6);

  const matchingGuides = guidesData.filter((g) =>
    g.spotSlugs.includes(spot.slug)
  );
  const displayedGuides =
    matchingGuides.length > 0 ? matchingGuides : guidesData.slice(0, 2);

  const googleEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${spot.name} ${spot.address}`
  )}&z=15&output=embed`;

  const isCriticalMiss = spot.rating <= 2.5;

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
            MS Spots Directory
          </a>
          <span aria-hidden="true">/</span>
          <span className="text-zinc-200">{spot.name}</span>
        </nav>

        {/* Hero Review Header */}
        <header className="bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide ${
                isCriticalMiss
                  ? "bg-rose-500/20 border border-rose-500/40 text-rose-200"
                  : "bg-amber-500 text-zinc-950"
              }`}
            >
              {spot.badge}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 border border-zinc-700 text-zinc-200">
              {spot.categoryLabel}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-950 border border-zinc-800 text-amber-300">
              {spot.city} • {spot.region}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-950 border border-zinc-800 text-zinc-200">
              Price: {spot.price}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-wide leading-[0.98]">
            {spot.name}{" "}
            <span className="text-amber-400">({spot.city}, MS) Review</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-200 leading-relaxed max-w-3xl">
            {spot.fullReview}
          </p>

          {/* Rating + Quick Meta Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-zinc-800/80">
            <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center font-heading font-extrabold text-lg shrink-0 ${
                  isCriticalMiss
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                    : "bg-amber-500 text-zinc-950"
                }`}
              >
                {spot.rating.toFixed(1)}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" aria-hidden="true" />
                  <span>Local Guide Verdict</span>
                </div>
                <p className="text-xs text-zinc-300">
                  {spot.reviewsCount.toLocaleString("en-US")}+ Google Reviews
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Address</span>
              </div>
              <p className="text-xs text-zinc-100 font-medium">{spot.address}</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Typical Hours</span>
              </div>
              <p className="text-xs text-zinc-100 font-medium">{spot.hours}</p>
            </div>
          </div>
        </header>

        {/* Official Website, Menu, Phone & Social Links Hub */}
        <section
          aria-labelledby="official-links-heading"
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2
                id="official-links-heading"
                className="font-heading font-bold text-xl sm:text-2xl text-white"
              >
                Official Website, Menu &amp; Social Links for {spot.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-0.5">
                Support this spot directly — check their current menu, call ahead, or follow their pages.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {links.website && (
              <a
                href={links.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackGuideEvent("spot_official_link_click", {
                    spot_name: spot.name,
                    link_type: "website",
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-lg shadow-amber-500/20 transition-all"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span>Official Website</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}

            {links.menuUrl && (
              <a
                href={links.menuUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackGuideEvent("spot_official_link_click", {
                    spot_name: spot.name,
                    link_type: "menu",
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-500/30 transition-all"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>View Official Menu</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}

            {spot.phone && (
              <a
                href={`tel:${spot.phone.replace(/[^0-9+]/g, "")}`}
                onClick={() =>
                  trackGuideEvent("spot_official_link_click", {
                    spot_name: spot.name,
                    link_type: "phone",
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-emerald-300 border border-zinc-700 transition-all"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Call {spot.phone}</span>
              </a>
            )}

            <a
              href={spot.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackGuideEvent("map_directions_click", {
                  spot_name: spot.name,
                  city: spot.city,
                })
              }
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 transition-all"
            >
              <Navigation className="w-4 h-4" aria-hidden="true" />
              <span>Google Maps &amp; Directions</span>
            </a>

            {links.facebook && (
              <a
                href={links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold bg-zinc-950 hover:bg-blue-600/20 text-sky-300 border border-zinc-800 hover:border-sky-500/40 transition-all"
              >
                <FacebookIcon className="w-4 h-4 fill-current" />
                <span>Facebook</span>
              </a>
            )}

            {links.instagram && (
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold bg-zinc-950 hover:bg-pink-600/20 text-pink-300 border border-zinc-800 hover:border-pink-500/40 transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram</span>
              </a>
            )}

            {links.tiktok && (
              <a
                href={links.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold bg-zinc-950 hover:bg-zinc-800 text-zinc-100 border border-zinc-800 transition-all"
              >
                <TikTokBadgeIcon className="w-4 h-4" />
                <span>TikTok</span>
              </a>
            )}
          </div>

          {!hasAnyOfficialWeb && (
            <p className="text-xs text-zinc-300 bg-zinc-950/80 border border-zinc-800 rounded-xl p-3.5">
              <strong className="text-amber-300">Local Guide Note:</strong>{" "}
              {spot.name} does not maintain an official standalone website or active social page yet — call{" "}
              <strong className="text-white">{spot.phone || "ahead"}</strong> or use the live Google Map below for verified directions. (Own this business and have a menu link to add?{" "}
              <a href="/suggest-a-spot" className="text-amber-300 underline">
                Send us an update here
              </a>
              .)
            </p>
          )}
        </section>

        {/* Embedded @TheLocalGuide-MS YouTube Video Review (if filmed) */}
        {spot.youtubeEpisodeId && (
          <section
            aria-labelledby="video-review-heading"
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-400 mb-1">
                  <YouTubeIcon className="w-4 h-4 fill-red-500" />
                  <span>@TheLocalGuide-MS POV Video Review</span>
                </div>
                <h2
                  id="video-review-heading"
                  className="font-heading font-bold text-xl sm:text-2xl text-white"
                >
                  Watch Damein &amp; Mary&apos;s Real Visit to {spot.name}
                </h2>
              </div>

              <a
                href={channelConfig.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackGuideEvent("youtube_subscribe_click", {
                    location: `review_${spot.slug}`,
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-red-700 hover:bg-red-600 text-white shadow-lg shadow-red-900/40 shrink-0"
              >
                <YouTubeIcon className="w-4 h-4 fill-white" />
                <span>Subscribe @TheLocalGuide-MS</span>
              </a>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
              {playInlineVideo ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${spot.youtubeEpisodeId}?autoplay=1&rel=0`}
                  title={`${spot.name} (${spot.city}, MS) — The Local Guide MS YouTube Review`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    trackGuideEvent("video_play", {
                      video_id: spot.youtubeEpisodeId,
                      spot_name: spot.name,
                    });
                    setPlayInlineVideo(true);
                  }}
                  aria-label={`Play YouTube review of ${spot.name}`}
                  className="w-full h-full relative group cursor-pointer"
                >
                  <img
                    src={spot.image}
                    alt={`${spot.name} in ${spot.city}, MS — video review thumbnail`}
                    width="800"
                    height="450"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-zinc-950/45 group-hover:bg-zinc-950/25 transition-colors flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-700 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play
                        className="w-8 h-8 fill-white translate-x-0.5"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-zinc-950/90 border border-zinc-700 text-xs font-bold text-white">
                      Click to Watch Real POV Review
                    </span>
                  </div>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-300">
              <span>
                100% self-paid meal • Filmed on location in {spot.city}, Mississippi
              </span>
              <a
                href={`https://www.youtube.com/watch?v=${spot.youtubeEpisodeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-300 hover:text-red-200 font-bold inline-flex items-center gap-1 hover:underline"
              >
                <span>Open Directly on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </section>
        )}

        {/* What We Liked vs. What We Disliked / Good to Know */}
        <section aria-labelledby="pros-cons-heading" className="space-y-5">
          <h2
            id="pros-cons-heading"
            className="font-display text-3xl sm:text-4xl text-white uppercase tracking-wide"
          >
            What We Liked vs. What Could Be Better
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What We Liked */}
            <div className="bg-zinc-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <ThumbsUp className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  What We Liked
                </h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-zinc-200">
                {(spot.liked || []).map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2
                      className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What We Disliked / Honest Heads-Up */}
            <div className="bg-zinc-900 border border-amber-500/30 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <AlertCircle className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  {isCriticalMiss
                    ? "What Missed on Our Visit"
                    : "Honest Notes & Insider Heads-Up"}
                </h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-zinc-200">
                {(spot.disliked || []).map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span
                      className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-2"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* What We Ordered + Full Editorial Verdict + E-E-A-T Author Card */}
        <section
          aria-labelledby="verdict-heading"
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xl"
        >
          <div className="space-y-3">
            <h2
              id="verdict-heading"
              className="font-heading font-bold text-2xl sm:text-3xl text-white"
            >
              What to Order &amp; Full Verdict on {spot.name}
            </h2>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
              {spot.verdictSummary}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-amber-500/25 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Utensils className="w-4 h-4" aria-hidden="true" />
              <span>Dishes Tested &amp; Recommended Orders</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-zinc-100">
              {(spot.whatWeOrdered || [spot.mustTry]).map((dish, i) => (
                <li
                  key={i}
                  className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 font-medium"
                >
                  {dish}
                </li>
              ))}
            </ul>
          </div>

          {/* Verified E-E-A-T Reviewer Box */}
          <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={channelConfig.logos.goldBadge}
                alt="Damein Donald & Mary — The Local Guide MS"
                width="52"
                height="52"
                loading="lazy"
                decoding="async"
                className="w-13 h-13 rounded-full border-2 border-amber-500/60 object-cover shrink-0"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-white">
                  <span>Reviewed by Damein Donald &amp; Mary</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-[10px] text-sky-300 uppercase">
                    <Award className="w-3 h-3" aria-hidden="true" />
                    Level 7 Local Guide • 2.2M+ Views
                  </span>
                </div>
                <p className="text-xs text-zinc-300 mt-0.5">
                  100% independent &amp; self-paid • Co-hosts of{" "}
                  <a
                    href={channelConfig.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:underline font-semibold"
                  >
                    @TheLocalGuide-MS on YouTube
                  </a>
                </p>
              </div>
            </div>

            <a
              href={channelConfig.googleMapsListUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-sky-300 hover:text-sky-200 inline-flex items-center gap-1.5 hover:underline shrink-0"
            >
              <span>See All 122+ Google Maps Reviews</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* Live Google Map */}
        <section
          aria-labelledby="location-map-heading"
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2
                id="location-map-heading"
                className="font-heading font-bold text-xl sm:text-2xl text-white"
              >
                Google Map &amp; Directions to {spot.name}
              </h2>
              <p className="text-xs text-zinc-300">{spot.address}</p>
            </div>
            <a
              href={spot.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:underline"
            >
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
            <iframe
              src={googleEmbedSrc}
              title={`Google Map of ${spot.name} at ${spot.address}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </section>

        {/* Featured In These Mississippi Food Guides */}
        <section aria-labelledby="featured-guides-heading" className="space-y-4">
          <h2
            id="featured-guides-heading"
            className="font-heading font-bold text-xl text-white"
          >
            Explore Related Mississippi Food Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {displayedGuides.map((g) => (
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
                <p className="text-xs text-zinc-300 line-clamp-2">
                  {g.seoDescription}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* More Mississippi Reviews Internal Grid */}
        <section aria-labelledby="more-reviews-heading" className="space-y-5">
          <div className="flex items-center justify-between">
            <h2
              id="more-reviews-heading"
              className="font-display text-3xl text-white uppercase tracking-wide"
            >
              More Mississippi Reviews
            </h2>
            <a
              href="/spots"
              className="text-xs font-bold text-amber-300 hover:underline"
            >
              View All {locationsData.length} Spots &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedSpots.map((rel) => (
              <a
                key={rel.id}
                href={`/reviews/${rel.slug}`}
                className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold mb-1">
                    <span>{rel.city}, MS</span>
                    <span>★ {rel.rating}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                    {rel.shortDescription}
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-300">
                  Read Full Review &rarr;
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
