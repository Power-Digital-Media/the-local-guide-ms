import React from "react";
import { Star, MapPin, Camera, ExternalLink } from "lucide-react";
import { realReviewsData } from "../data/realReviews";
import { channelConfig } from "../data/channelConfig";

export default function LiveGoogleReviews() {
  return (
    <section
      id="reviews-section"
      className="py-16 lg:py-24 bg-zinc-950 relative border-t border-zinc-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Star
                className="w-3.5 h-3.5 fill-sky-300 text-sky-300"
                aria-hidden="true"
              />
              <span>Live Google Maps Contributor Feed</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase">
              Damein&apos;s Real Google Reviews &amp; Photos
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mt-1">
              Direct from Damein&apos;s Level 7 Local Guide profile (131+ reviews, 3M+ views) — 100% real visits, real dish photos, 5-star gems, and unfiltered 1-star misses.
            </p>
          </div>

          <a
            href={channelConfig.googleMapsListUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 transition-all shrink-0"
          >
            <span>View All 131+ Reviews on Google Maps</span>
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {realReviewsData.map((rev) => (
            <article
              key={rev.id}
              className="bg-zinc-900 border border-zinc-800 hover:border-sky-500/40 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
            >
              <div>
                {rev.photoUrl && (
                  <a
                    href={rev.slug ? `/reviews/${rev.slug}` : rev.mapsUrl}
                    className="block relative aspect-video overflow-hidden bg-zinc-950"
                  >
                    <img
                      src={rev.photoUrl}
                      alt={`${rev.placeName} in ${rev.city} — photographed by Damein Donald`}
                      width="480"
                      height="270"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-zinc-950/90 border border-zinc-800 text-[11px] font-bold text-zinc-100 flex items-center gap-1">
                      <Camera
                        className="w-3.5 h-3.5 text-sky-300"
                        aria-hidden="true"
                      />
                      <span>+{rev.photosCount} Real Photos</span>
                    </span>
                  </a>
                )}

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/15 border border-sky-500/30 text-sky-200 uppercase">
                      {rev.category}
                    </span>
                    <span className="text-zinc-300 text-[11px]">
                      {rev.dateAgo}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-sky-300 transition-colors">
                    {rev.slug ? (
                      <a href={`/reviews/${rev.slug}`}>{rev.placeName}</a>
                    ) : (
                      rev.placeName
                    )}
                  </h3>
                  <p className="text-xs text-zinc-300 flex items-center gap-1">
                    <MapPin
                      className="w-3.5 h-3.5 text-amber-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{rev.address}</span>
                  </p>

                  <div
                    className="flex items-center gap-1 py-2 border-y border-zinc-800"
                    aria-label={`Rated ${rev.rating} out of 5 stars`}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        aria-hidden="true"
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-zinc-700"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs font-bold text-zinc-200">
                      {rev.rating}/5
                    </span>
                  </div>

                  <p className="text-xs text-zinc-200 leading-relaxed italic bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800/80">
                    &ldquo;{rev.snippet}&rdquo;
                  </p>

                  {rev.responseFromOwner && (
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300">
                      <span className="font-bold text-zinc-100 block mb-0.5">
                        Owner Response:
                      </span>
                      {rev.responseFromOwner}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 pb-5 pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                {rev.slug ? (
                  <a
                    href={`/reviews/${rev.slug}`}
                    className="text-xs font-bold text-amber-300 hover:text-amber-200 hover:underline"
                  >
                    Full Review &amp; Photo Gallery &rarr;
                  </a>
                ) : (
                  <span className="text-[11px] text-zinc-300 font-medium">
                    Review by Damein Donald
                  </span>
                )}

                <a
                  href={rev.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-sky-300 hover:text-sky-200 flex items-center gap-1 hover:underline shrink-0"
                >
                  <span>Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
