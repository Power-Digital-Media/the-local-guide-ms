import React from "react";
import { Star, MapPin, Camera, ExternalLink, ThumbsUp, MessageSquareQuote, CheckCircle2, ShieldAlert } from "lucide-react";
import { realReviewsData } from "../data/realReviews";
import { channelConfig } from "../data/channelConfig";

export default function LiveGoogleReviews() {
  return (
    <section className="py-16 lg:py-24 bg-zinc-950 relative border-t border-zinc-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
              <span>Live Google Maps Contributor Feed</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase">
              Damein's Real Google Reviews
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-1">
              Direct from Damein's Level 7 Local Guide profile (122 reviews, 5,605 points, 2.2M+ views). Unfiltered, honest verdicts on food, service, and atmosphere.
            </p>
          </div>

          <a
            href={channelConfig.googleMapsListUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 transition-all shrink-0"
          >
            <span>View All 122 Reviews on Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {realReviewsData.map((rev) => (
            <div
              key={rev.id}
              className="bg-zinc-900 border border-zinc-800 hover:border-blue-500/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4 group transition-all"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 border border-blue-500/30 text-blue-300 uppercase">
                    {rev.category}
                  </span>
                  <span className="text-zinc-500 text-[11px]">{rev.dateAgo}</span>
                </div>

                <h3 className="font-heading font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                  {rev.placeName}
                </h3>
                <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>{rev.address}</span>
                </p>

                {/* Stars and Photo Counter */}
                <div className="flex items-center justify-between py-3 my-2 border-y border-zinc-800">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-zinc-700"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs font-bold text-zinc-300">
                      {rev.rating}/5
                    </span>
                  </div>

                  <span className="text-xs text-zinc-400 flex items-center gap-1 bg-zinc-950 px-2 py-1 rounded-md border border-zinc-800">
                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                    <strong className="text-zinc-200">+{rev.photosCount} photos</strong>
                  </span>
                </div>

                {/* Review Excerpt */}
                <p className="text-xs text-zinc-300 leading-relaxed italic bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800/80">
                  "{rev.snippet}"
                </p>

                {/* Owner response if any */}
                {rev.responseFromOwner && (
                  <div className="mt-2.5 p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400">
                    <span className="font-bold text-zinc-300 block mb-0.5">Owner Response:</span>
                    {rev.responseFromOwner}
                  </div>
                )}
              </div>

              {/* Card Footer Link */}
              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-medium">
                  Review by Damein Donald
                </span>
                <a
                  href={rev.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 hover:underline"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
