import React, { useEffect, useState } from "react";
import { Play, ExternalLink, X, CheckCircle2 } from "lucide-react";
import { YouTubeIcon, MetaGlassesIcon } from "./Icons";
import { videosData } from "../data/videos";
import { channelConfig } from "../data/channelConfig";
import { trackGuideEvent } from "../utils/analytics";

export default function VideoGallery({
  selectedVideo,
  onOpenVideoModal,
  onCloseVideoModal,
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [videos, setVideos] = useState(videosData);

  // Merge any newer @TheLocalGuide-MS YouTube uploads automatically via serverless feed
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/.netlify/functions/videos");
        if (!res.ok) return;
        const data = await res.json();
        if (!active || !Array.isArray(data?.videos) || data.videos.length === 0) {
          return;
        }
        setVideos((prev) => {
          const knownIds = new Set(prev.map((v) => v.youtubeId));
          const fresh = data.videos
            .filter((v) => v.youtubeId && !knownIds.has(v.youtubeId))
            .map((v) => ({
              id: v.id,
              title: v.title,
              youtubeId: v.youtubeId,
              watchUrl: v.watchUrl,
              channelUrl: channelConfig.youtubeUrl,
              thumbnail: v.thumbnail,
              duration: v.isShort ? "Short" : "Episode",
              publishedAt: (v.publishedAt || "").slice(0, 10),
              views: v.views ? `${v.views}+ Views` : "New",
              category: "Latest Uploads",
              locationName: "Mississippi",
              pov: true,
              description: v.description,
              featured: false,
              tags: ["Mississippi", "Honest Review"],
            }));
          return fresh.length > 0 ? [...fresh, ...prev] : prev;
        });
      } catch {
        // Static curated episodes remain available offline
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const categories = [
    "All",
    "BBQ & Smokehouse",
    "Catfish & Seafood",
    "Clinton & Metro Eats",
    "Events & Road Trips",
  ];

  const filteredVideos =
    activeCategory === "All"
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  const featuredVideo = videos.find((v) => v.featured) || videos[0];

  const handlePlay = (video) => {
    trackGuideEvent("video_play", {
      video_id: video.youtubeId,
      video_title: video.title,
    });
    onOpenVideoModal(video);
  };

  return (
    <section
      id="videos-section"
      className="py-16 lg:py-24 bg-zinc-950 relative border-t border-zinc-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Channel Hook */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-600/15 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider mb-2">
              <YouTubeIcon className="w-3.5 h-3.5 fill-red-500 text-red-500" />
              <span>Official YouTube Channel</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase">
              Latest Video Reviews &amp; Shorts
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mt-1">
              Watch real, self-paid Mississippi restaurant reviews, lunch-special tests, and local adventures with Damein &amp; Mary.
            </p>
          </div>

          {/* Subscribe Box */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl shrink-0">
            <img
              src={channelConfig.logos.goldBadge}
              alt="The Local Guide MS YouTube avatar"
              width="48"
              height="48"
              loading="lazy"
              decoding="async"
              className="w-12 h-12 rounded-full border border-amber-500/40 object-cover"
            />
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-100">
                <span>The Local Guide MS</span>
                <CheckCircle2
                  className="w-3.5 h-3.5 text-sky-400"
                  aria-hidden="true"
                />
              </div>
              <p className="text-[11px] text-zinc-300">@TheLocalGuide-MS</p>
            </div>
            <a
              href={channelConfig.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackGuideEvent("youtube_subscribe_click", {
                  location: "video_gallery",
                })
              }
              className="px-4 py-2 rounded-xl text-xs font-bold bg-red-700 hover:bg-red-600 text-white shadow-md shadow-red-900/30 flex items-center gap-1.5 transition-all"
            >
              <YouTubeIcon className="w-3.5 h-3.5 fill-white" />
              <span>Subscribe</span>
            </a>
          </div>
        </div>

        {/* Featured Episode Showcase */}
        {featuredVideo && (
          <div className="mb-12 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-500 text-zinc-950">
                    FEATURED REVIEW
                  </span>
                  {featuredVideo.pov && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 border border-zinc-700 text-zinc-200 flex items-center gap-1.5">
                      <MetaGlassesIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>On-Location POV</span>
                    </span>
                  )}
                  <span className="text-xs text-zinc-300 font-medium">
                    {featuredVideo.locationName}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
                  {featuredVideo.title}
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                  {featuredVideo.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handlePlay(featuredVideo)}
                    className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold bg-red-700 hover:bg-red-600 text-white shadow-xl shadow-red-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" aria-hidden="true" />
                    <span>Watch Review Now</span>
                  </button>

                  <a
                    href={
                      featuredVideo.watchUrl ||
                      `https://www.youtube.com/watch?v=${featuredVideo.youtubeId}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-zinc-800/80 hover:bg-zinc-800 text-zinc-100 border border-zinc-700 transition-all"
                  >
                    <span>Open on YouTube</span>
                    <ExternalLink
                      className="w-3.5 h-3.5 text-zinc-300"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>

              <button
                type="button"
                aria-label={`Play ${featuredVideo.title}`}
                className="lg:col-span-5 relative group cursor-pointer text-left"
                onClick={() => handlePlay(featuredVideo)}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-video border-2 border-zinc-700 shadow-2xl">
                  <img
                    src={featuredVideo.thumbnail}
                    alt={featuredVideo.title}
                    width="480"
                    height="360"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-700 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play
                        className="w-7 h-7 fill-white translate-x-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-zinc-950/90 text-zinc-100 text-xs font-bold px-2.5 py-1 rounded-md">
                    {featuredVideo.views}
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === category
                  ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-zinc-700 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <article
              key={video.id}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              <button
                type="button"
                aria-label={`Watch ${video.title}`}
                className="relative aspect-video overflow-hidden cursor-pointer text-left"
                onClick={() => handlePlay(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  width="480"
                  height="360"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950/40">
                  <div className="w-12 h-12 rounded-full bg-red-700 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play
                      className="w-5 h-5 fill-white translate-x-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="absolute bottom-2.5 right-2.5 bg-zinc-950/90 text-zinc-100 text-[11px] font-bold px-2 py-0.5 rounded">
                  {video.views || video.duration}
                </div>

                {video.pov && (
                  <div className="absolute top-2.5 left-2.5 bg-zinc-950/90 border border-zinc-700 text-amber-300 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                    <MetaGlassesIcon className="w-3 h-3" />
                    <span>Real Visit</span>
                  </div>
                )}
              </button>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-300 mb-1 gap-2">
                    <span className="font-semibold text-amber-300 uppercase tracking-wider">
                      {video.category}
                    </span>
                    <span className="text-zinc-300 truncate">
                      {video.locationName}
                    </span>
                  </div>

                  <h3
                    onClick={() => handlePlay(video)}
                    className="font-heading font-bold text-base text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-2"
                  >
                    {video.title}
                  </h3>

                  <p className="text-xs text-zinc-300 mt-2 line-clamp-2">
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {(video.tags || []).slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] bg-zinc-950 px-2 py-0.5 rounded text-zinc-300"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlay(video)}
                    className="text-xs font-bold text-red-300 hover:text-red-200 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Watch</span>
                    <Play className="w-3 h-3 fill-red-300" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedVideo.title}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md"
          >
            <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-700 rounded-lg text-white">
                    <YouTubeIcon className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-white line-clamp-1">
                      {selectedVideo.title}
                    </h3>
                    <p className="text-xs text-zinc-300">
                      {selectedVideo.locationName}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Close video player"
                  onClick={onCloseVideoModal}
                  className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-950">
                <p className="text-xs text-zinc-300 text-center sm:text-left max-w-lg">
                  {selectedVideo.description}
                </p>

                <div className="flex items-center gap-3">
                  <a
                    href={
                      selectedVideo.watchUrl ||
                      `https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition-colors"
                  >
                    <span>View on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>

                  <a
                    href={channelConfig.subscribeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-red-700 hover:bg-red-600 text-white transition-colors"
                  >
                    <YouTubeIcon className="w-3.5 h-3.5 fill-white" />
                    <span>Subscribe</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
