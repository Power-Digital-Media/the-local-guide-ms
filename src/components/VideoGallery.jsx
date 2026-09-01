import React, { useState } from "react";
import { Play, Clock, Eye, Sparkles, ExternalLink, X, Tag, CheckCircle2 } from "lucide-react";
import { YouTubeIcon, MetaGlassesIcon } from "./Icons";
import { videosData } from "../data/videos";
import { channelConfig } from "../data/channelConfig";

export default function VideoGallery({ selectedVideo, onOpenVideoModal, onCloseVideoModal }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Food Tour", "Delta BBQ", "Seafood & Coastal", "Historic MS", "Nature & Hiking"];

  const filteredVideos = activeCategory === "All"
    ? videosData
    : videosData.filter(v => v.category === activeCategory);

  const featuredVideo = videosData.find(v => v.featured) || videosData[0];

  return (
    <section id="videos-section" className="py-16 lg:py-24 bg-zinc-950 relative border-t border-zinc-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Channel Hook */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <YouTubeIcon className="w-3.5 h-3.5 fill-red-500 text-red-500" />
              <span>Official YouTube Channel</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase">
              Latest Video Episodes & Vlogs
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-1">
              Watch authentic first-person POV restaurant reviews and Mississippi hidden gem walk-throughs filmed on location.
            </p>
          </div>

          {/* Subscribe Box */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl shrink-0">
            <img
              src={channelConfig.logos.goldBadge}
              alt="Channel Logo"
              className="w-12 h-12 rounded-full border border-amber-500/40 object-cover"
            />
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-200">
                <span>The Local Guide MS</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
              </div>
              <p className="text-[11px] text-zinc-400">@TheLocalGuide-MS</p>
            </div>
            <a
              href={channelConfig.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-900/30 flex items-center gap-1.5 transition-all"
            >
              <YouTubeIcon className="w-3.5 h-3.5 fill-white" />
              <span>Subscribe</span>
            </a>
          </div>
        </div>

        {/* Featured Episode Hero Showcase */}
        {featuredVideo && (
          <div className="mb-12 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-500 text-zinc-950">
                    FEATURED PREMIERE
                  </span>
                  {featuredVideo.pov && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 border border-zinc-700 text-zinc-200 flex items-center gap-1.5">
                      <MetaGlassesIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>Meta Smart Glasses POV</span>
                    </span>
                  )}
                  <span className="text-xs text-zinc-400 font-medium">
                    {featuredVideo.duration}
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
                    onClick={() => onOpenVideoModal(featuredVideo)}
                    className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-500 text-white shadow-xl shadow-red-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Watch Episode Now</span>
                  </button>

                  <a
                    href={`https://www.youtube.com/watch?v=${featuredVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 transition-all"
                  >
                    <span>Open on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 relative group cursor-pointer" onClick={() => onOpenVideoModal(featuredVideo)}>
                <div className="relative rounded-2xl overflow-hidden aspect-video border-2 border-zinc-750 shadow-2xl">
                  <img
                    src={featuredVideo.thumbnail}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-white translate-x-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-zinc-950/90 text-zinc-100 text-xs font-bold px-2.5 py-1 rounded-md">
                    {featuredVideo.duration}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === category
                  ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Thumbnail Container */}
              <div
                className="relative aspect-video overflow-hidden cursor-pointer"
                onClick={() => onOpenVideoModal(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950/40">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 bg-zinc-950/90 text-zinc-200 text-[11px] font-bold px-2 py-0.5 rounded">
                  {video.duration}
                </div>

                {/* POV Badge */}
                {video.pov && (
                  <div className="absolute top-2.5 left-2.5 bg-zinc-950/90 border border-zinc-700 text-amber-400 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                    <MetaGlassesIcon className="w-3 h-3" />
                    <span>POV Tour</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                    <span className="font-semibold text-amber-400 uppercase tracking-wider">
                      {video.category}
                    </span>
                    <span className="text-zinc-500">{video.locationName}</span>
                  </div>

                  <h4
                    onClick={() => onOpenVideoModal(video)}
                    className="font-heading font-bold text-base text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-2"
                  >
                    {video.title}
                  </h4>

                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                    {video.description}
                  </p>
                </div>

                {/* Tags & Action */}
                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {video.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] bg-zinc-950 px-2 py-0.5 rounded text-zinc-400">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onOpenVideoModal(video)}
                    className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Watch</span>
                    <Play className="w-3 h-3 fill-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-750 rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-600 rounded-lg text-white">
                    <YouTubeIcon className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-white line-clamp-1">
                      {selectedVideo.title}
                    </h3>
                    <p className="text-xs text-zinc-400">{selectedVideo.locationName}</p>
                  </div>
                </div>

                <button
                  onClick={onCloseVideoModal}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Embed Frame */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Modal Footer */}
              <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-950">
                <p className="text-xs text-zinc-400 text-center sm:text-left max-w-lg">
                  {selectedVideo.description}
                </p>

                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                  >
                    <span>View on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={channelConfig.subscribeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-colors"
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
