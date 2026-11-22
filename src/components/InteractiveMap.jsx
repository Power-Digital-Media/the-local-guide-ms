import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  MapPin,
  Utensils,
  Coffee,
  Trees,
  Landmark,
  Music,
  Play,
  Search,
  Navigation,
  Star,
  Sparkles,
  Layers,
} from "lucide-react";
import { locationsData } from "../data/locations";
import { videosData } from "../data/videos";
import { channelConfig } from "../data/channelConfig";
import { trackGuideEvent } from "../utils/analytics";

const LazyMultiPinMap = React.lazy(() => import("./GoogleJsMapCanvas"));

const categories = [
  { id: "all", label: "All Spots", icon: Layers },
  { id: "food", label: "Food & BBQ", icon: Utensils },
  { id: "sweets", label: "Sweets & Pizza", icon: Coffee },
  { id: "outdoors", label: "Parks & Outdoors", icon: Trees },
  { id: "historic", label: "Historic Sights", icon: Landmark },
  { id: "nightlife", label: "Nightlife & Blues", icon: Music },
];

const regions = [
  "All Mississippi",
  "Central MS",
  "Gulf Coast",
  "Delta",
  "North MS",
  "Southwest MS",
  "Pine Belt",
];

export default function InteractiveMap({
  onSelectVideo,
  defaultViewMode = "google",
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("All Mississippi");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLocation, setActiveLocation] = useState(locationsData[0]);
  const [mapCenter, setMapCenter] = useState([32.3547, -89.85]);
  const [mapZoom, setMapZoom] = useState(7.4);
  const [viewMode, setViewMode] = useState(defaultViewMode);
  const [shouldMountMap, setShouldMountMap] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || viewMode === "grid") return;
    if (shouldMountMap) return;

    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setShouldMountMap(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldMountMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMountMap, viewMode]);

  const filteredLocations = useMemo(() => {
    return locationsData.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesRegion =
        selectedRegion === "All Mississippi" || item.region === selectedRegion;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.mustTry.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q);

      return matchesCategory && matchesRegion && matchesSearch;
    });
  }, [selectedCategory, selectedRegion, searchQuery]);

  // Keep activeLocation synced when filters narrow the list
  useEffect(() => {
    if (
      filteredLocations.length > 0 &&
      !filteredLocations.some((l) => l.id === activeLocation?.id)
    ) {
      setActiveLocation(filteredLocations[0]);
    }
  }, [filteredLocations, activeLocation]);

  const handleSelectLocation = (loc) => {
    setActiveLocation(loc);
    setMapCenter([loc.lat, loc.lng]);
    setMapZoom(13);
    setShouldMountMap(true);
  };

  const handleWatchSpotVideo = (loc) => {
    if (!loc?.youtubeEpisodeId) return;
    const match = videosData.find((v) => v.youtubeId === loc.youtubeEpisodeId);
    if (match && onSelectVideo) {
      onSelectVideo(match);
    } else if (onSelectVideo) {
      onSelectVideo({
        id: `yt-${loc.youtubeEpisodeId}`,
        title: `${loc.name} (${loc.city}, MS) — The Local Guide MS Review`,
        youtubeId: loc.youtubeEpisodeId,
        locationName: `${loc.name} · ${loc.city}, MS`,
        description: loc.fullReview || loc.shortDescription,
      });
    }
  };

  const googleEmbedSrc = activeLocation
    ? `https://www.google.com/maps?q=${encodeURIComponent(
        `${activeLocation.name} ${activeLocation.address}`
      )}&z=15&output=embed`
    : "https://www.google.com/maps?q=Jackson,MS&z=7&output=embed";

  return (
    <section
      id="map-section"
      ref={sectionRef}
      className="py-16 lg:py-24 bg-zinc-950 relative border-t border-zinc-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin
                className="w-3.5 h-3.5 text-amber-400"
                aria-hidden="true"
              />
              <span>Live Google Maps &amp; Travel Guide</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase">
              Interactive Mississippi Google Map
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mt-1">
              Tap any Mississippi spot below to jump straight to it on Google Maps, see our must-order dish, watch the video review, and launch 1-tap directions.
            </p>
          </div>

          {/* Google Maps vs Statewide Pins vs Grid Toggle */}
          <div className="flex flex-wrap items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 shadow-inner self-start md:self-auto gap-1">
            <button
              type="button"
              onClick={() => {
                setViewMode("google");
                setShouldMountMap(true);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "google"
                  ? "bg-amber-500 text-zinc-950 shadow-md"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              Google Maps
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode("map");
                setShouldMountMap(true);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "map"
                  ? "bg-amber-500 text-zinc-950 shadow-md"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              Statewide Pins
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-amber-500 text-zinc-950 shadow-md"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              Directory ({filteredLocations.length})
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 mb-5 shadow-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-6 md:col-span-5 relative">
              <Search
                className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Search Mississippi restaurants, dishes, or towns"
                placeholder="Search BBQ, catfish, Jackson, Pearl, Clinton..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>

            <div className="sm:col-span-6 md:col-span-4">
              <select
                aria-label="Filter spots by Mississippi region"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {regions.map((region) => (
                  <option
                    key={region}
                    value={region}
                    className="bg-zinc-900 text-zinc-200"
                  >
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden md:block md:col-span-3 text-right">
              <span className="text-xs text-zinc-300 font-medium">
                Showing{" "}
                <strong className="text-amber-400">
                  {filteredLocations.length}
                </strong>{" "}
                spots in Mississippi
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/80">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                      : "bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1-Tap Spot Quick-Picker Rail (Mobile + Desktop) */}
        {viewMode !== "grid" && filteredLocations.length > 0 && (
          <div
            aria-label="Select a Mississippi spot on the map"
            className="mb-5 flex gap-2.5 overflow-x-auto pb-2 snap-x"
          >
            {filteredLocations.map((loc) => {
              const isSelected = activeLocation?.id === loc.id;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handleSelectLocation(loc)}
                  className={`snap-start shrink-0 px-3.5 py-2.5 min-h-[40px] rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? "bg-amber-500 border-amber-400 text-zinc-950 shadow-lg shadow-amber-500/20 font-bold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-amber-500/50 hover:text-white font-semibold"
                  }`}
                >
                  <MapPin
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isSelected ? "text-zinc-950" : "text-amber-400"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="text-xs whitespace-nowrap">{loc.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isSelected
                        ? "bg-zinc-950/20 text-zinc-950"
                        : "bg-zinc-950 text-zinc-300"
                    }`}
                  >
                    {loc.city}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Map + Detail View Layout */}
        {viewMode !== "grid" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl h-[440px] sm:h-[540px] lg:h-[620px] relative">
              {!shouldMountMap ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 p-6 text-center space-y-3">
                  <MapPin
                    className="w-10 h-10 text-amber-400"
                    aria-hidden="true"
                  />
                  <div className="font-heading font-bold text-lg text-white">
                    {activeLocation
                      ? `${activeLocation.name} · ${activeLocation.city}, MS`
                      : `${filteredLocations.length} Curated Mississippi Food & Travel Pins`}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShouldMountMap(true)}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs cursor-pointer"
                  >
                    Load Live Google Map
                  </button>
                </div>
              ) : viewMode === "google" ? (
                <iframe
                  key={activeLocation?.id || "default-ms-map"}
                  src={googleEmbedSrc}
                  title={
                    activeLocation
                      ? `Google Map of ${activeLocation.name} in ${activeLocation.city}, Mississippi`
                      : "Google Map of Mississippi Local Guide Spots"
                  }
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <>
                  <Suspense
                    fallback={
                      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-300 text-sm gap-2">
                        <MapPin
                          className="w-8 h-8 text-amber-400 animate-bounce"
                          aria-hidden="true"
                        />
                        <span>Loading Statewide Mississippi Map...</span>
                      </div>
                    }
                  >
                    <LazyMultiPinMap
                      mapCenter={mapCenter}
                      mapZoom={mapZoom}
                      filteredLocations={filteredLocations}
                      activeLocation={activeLocation}
                      onSelectLocation={setActiveLocation}
                    />
                  </Suspense>

                  <div className="absolute bottom-4 left-4 z-[400] bg-zinc-950/90 backdrop-blur-md border border-zinc-800 px-3 py-2 rounded-xl text-[11px] text-zinc-200 shadow-xl hidden sm:flex items-center gap-3">
                    <span className="font-bold text-amber-400">Legend:</span>
                    <span>🍽️ Food</span>
                    <span>☕ Sweets</span>
                    <span>🌲 Outdoors</span>
                    <span>🏛️ Historic</span>
                    <span>🎷 Blues</span>
                  </div>
                </>
              )}
            </div>

            {/* Selected Location Card */}
            <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-5 space-y-4">
              {activeLocation ? (
                <>
                  <div className="relative rounded-xl overflow-hidden aspect-video border border-zinc-800 group">
                    <img
                      src={activeLocation.image}
                      alt={`${activeLocation.name} in ${activeLocation.city}, Mississippi`}
                      width="480"
                      height="360"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-amber-500 text-zinc-950 shadow-md">
                        {activeLocation.badge}
                      </span>
                    </div>
                    {activeLocation.povEpisode && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-zinc-950/85 backdrop-blur-sm border border-zinc-700 text-zinc-100">
                          POV Filmed
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-300 mb-1">
                      <span className="font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
                        {activeLocation.categoryLabel}
                      </span>
                      <span className="text-zinc-300 font-semibold">
                        {activeLocation.price}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                      {activeLocation.name}
                    </h3>
                    <p className="text-xs text-zinc-300 flex items-center gap-1 mt-1">
                      <MapPin
                        className="w-3.5 h-3.5 text-amber-400 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{activeLocation.address}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-zinc-950/80 rounded-xl border border-zinc-800/80">
                    <div className="flex items-center gap-1 text-amber-400 font-bold text-base">
                      <Star
                        className="w-4 h-4 fill-amber-400"
                        aria-hidden="true"
                      />
                      <span>{activeLocation.rating}</span>
                    </div>
                    <div className="text-xs text-zinc-300">
                      <span>
                        {activeLocation.reviewsCount.toLocaleString("en-US")}{" "}
                        Google Reviews
                      </span>
                      <span className="block text-[10px] text-emerald-400 font-semibold">
                        Verified Local Guide Pick
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-500/10 border border-amber-500/25 rounded-xl space-y-1">
                    <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>The Local Guide Must-Try:</span>
                    </div>
                    <p className="text-xs font-semibold text-zinc-100">
                      {activeLocation.mustTry}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/50">
                    &ldquo;{activeLocation.fullReview}&rdquo;
                  </p>

                  <div className="space-y-2 pt-2">
                    {activeLocation.slug && (
                      <a
                        href={`/reviews/${activeLocation.slug}`}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                      >
                        <span>Full Review, Likes/Dislikes &amp; Menu</span>
                      </a>
                    )}

                    <a
                      href={activeLocation.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackGuideEvent("map_directions_click", {
                          spot_name: activeLocation.name,
                          city: activeLocation.city,
                        })
                      }
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 transition-all cursor-pointer"
                    >
                      <Navigation className="w-4 h-4" aria-hidden="true" />
                      <span>Get Directions on Google Maps</span>
                    </a>

                    {activeLocation.youtubeEpisodeId ? (
                      <button
                        type="button"
                        onClick={() => handleWatchSpotVideo(activeLocation)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-red-700 hover:bg-red-600 text-white transition-all cursor-pointer"
                      >
                        <Play
                          className="w-3.5 h-3.5 fill-white"
                          aria-hidden="true"
                        />
                        <span>Watch Video Review</span>
                      </button>
                    ) : (
                      <a
                        href={channelConfig.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 transition-all"
                      >
                        <Play
                          className="w-3.5 h-3.5 text-red-400 fill-red-400"
                          aria-hidden="true"
                        />
                        <span>Follow @TheLocalGuide-MS on YouTube</span>
                      </a>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        ) : (
          /* Crawlable Directory Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((loc) => (
              <article
                key={loc.id}
                className="bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={loc.image}
                    alt={`${loc.name} — ${loc.city}, Mississippi`}
                    width="480"
                    height="360"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-amber-500 text-zinc-950 shadow-md">
                      {loc.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-zinc-950/85 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    <Star
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                    <span>{loc.rating}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-300 mb-1">
                      <span className="text-amber-300 font-semibold uppercase tracking-wider text-[10px]">
                        {loc.categoryLabel}
                      </span>
                      <span>{loc.city}, MS</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                      {loc.slug ? (
                        <a href={`/reviews/${loc.slug}`}>{loc.name}</a>
                      ) : (
                        loc.name
                      )}
                    </h3>
                    <p className="text-xs text-zinc-300 mt-1">{loc.address}</p>
                    <p className="text-xs text-zinc-300 mt-2 line-clamp-2">
                      {loc.shortDescription}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-amber-300 uppercase">
                      Must Order:
                    </span>
                    <p className="text-zinc-100 font-medium truncate">
                      {loc.mustTry}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-zinc-800/80">
                    {loc.slug && (
                      <a
                        href={`/reviews/${loc.slug}`}
                        className="flex-1 flex items-center justify-center py-2 px-2.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 transition-colors"
                      >
                        Full Review &amp; Menu
                      </a>
                    )}
                    <a
                      href={loc.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackGuideEvent("map_directions_click", {
                          spot_name: loc.name,
                          city: loc.city,
                        })
                      }
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-blue-600 text-zinc-100 hover:text-white transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Maps</span>
                    </a>
                    {loc.youtubeEpisodeId ? (
                      <button
                        type="button"
                        onClick={() => handleWatchSpotVideo(loc)}
                        className="px-3 py-2 rounded-lg text-xs font-bold bg-red-700 hover:bg-red-600 text-white transition-colors cursor-pointer"
                      >
                        Watch Video
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setViewMode("google");
                          handleSelectLocation(loc);
                        }}
                        className="px-3 py-2 rounded-lg text-xs font-semibold bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500 hover:text-zinc-950 text-amber-300 transition-colors cursor-pointer"
                      >
                        Show on Google Map
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
