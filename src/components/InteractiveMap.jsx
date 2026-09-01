import React, { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import {
  MapPin,
  Utensils,
  Coffee,
  Trees,
  Landmark,
  Music,
  ExternalLink,
  Play,
  Search,
  SlidersHorizontal,
  Navigation,
  Star,
  Clock,
  Sparkles,
  ChevronRight,
  Layers
} from "lucide-react";
import { locationsData } from "../data/locations";

// Category color mappings and icons
const categories = [
  { id: "all", label: "All Spots", icon: Layers, color: "amber" },
  { id: "food", label: "Food & BBQ", icon: Utensils, color: "amber" },
  { id: "sweets", label: "Sweets & Coffee", icon: Coffee, color: "rose" },
  { id: "outdoors", label: "Parks & Outdoors", icon: Trees, color: "emerald" },
  { id: "historic", label: "Historic Sights", icon: Landmark, color: "blue" },
  { id: "nightlife", label: "Nightlife & Blues", icon: Music, color: "purple" },
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

// Helper to create custom HTML markers for Leaflet
function createCustomPin(category, isSelected) {
  let bgColor = "#f59e0b"; // amber
  let iconChar = "🍽️";

  if (category === "sweets") {
    bgColor = "#f43f5e"; // rose
    iconChar = "☕";
  } else if (category === "outdoors") {
    bgColor = "#10b981"; // emerald
    iconChar = "🌲";
  } else if (category === "historic") {
    bgColor = "#3b82f6"; // blue
    iconChar = "🏛️";
  } else if (category === "nightlife") {
    bgColor = "#a855f7"; // purple
    iconChar = "🎷";
  }

  const borderClass = isSelected ? "border-white scale-125 z-50 ring-4 ring-amber-400" : "border-zinc-900";

  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        background-color: ${bgColor};
        border-radius: 50%;
        border: 3px solid #18181b;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        font-size: 18px;
        transition: transform 0.2s ease;
      " class="${borderClass}">
        <span>${iconChar}</span>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20],
  });
}

// Controller component to zoom to location when selected
function MapRecenter({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 13, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function InteractiveMap({ onSelectVideo }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("All Mississippi");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLocation, setActiveLocation] = useState(locationsData[0]);
  const [mapCenter, setMapCenter] = useState([32.3547, -89.3985]);
  const [mapZoom, setMapZoom] = useState(7.5);
  const [viewMode, setViewMode] = useState("map"); // 'map' or 'grid'

  // Filter locations
  const filteredLocations = useMemo(() => {
    return locationsData.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesRegion =
        selectedRegion === "All Mississippi" || item.region === selectedRegion;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mustTry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesRegion && matchesSearch;
    });
  }, [selectedCategory, selectedRegion, searchQuery]);

  const handleSelectLocation = (loc) => {
    setActiveLocation(loc);
    setMapCenter([loc.lat, loc.lng]);
    setMapZoom(13);
  };

  return (
    <section id="map-section" className="py-16 lg:py-24 bg-zinc-950 relative border-t border-zinc-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Google Maps & Travel Guide</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase">
              Interactive Mississippi Map
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-1">
              Click any pin to view our honest review, what to order, YouTube vlog walkthrough, and 1-click Google Maps navigation.
            </p>
          </div>

          {/* Map vs Grid Toggle */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 shadow-inner self-start md:self-auto">
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === "map"
                  ? "bg-amber-500 text-zinc-950 shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Interactive Map
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-amber-500 text-zinc-950 shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              List View ({filteredLocations.length})
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 mb-6 shadow-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="sm:col-span-6 md:col-span-5 relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search burger, tamales, Jackson, Clarksdale..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>

            {/* Region Dropdown */}
            <div className="sm:col-span-6 md:col-span-4">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {regions.map((region) => (
                  <option key={region} value={region} className="bg-zinc-900 text-zinc-200">
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Reset */}
            <div className="hidden md:block md:col-span-3 text-right">
              <span className="text-xs text-zinc-400 font-medium">
                Showing <strong className="text-amber-400">{filteredLocations.length}</strong> spots in Mississippi
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
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                      : "bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Map + Detail View Layout */}
        {viewMode === "map" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Map Container */}
            <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl h-[480px] sm:h-[560px] lg:h-[620px] relative">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                scrollWheelZoom={true}
                className="w-full h-full"
              >
                <MapRecenter center={mapCenter} zoom={mapZoom} />

                {/* CartoDB Dark Matter tiles */}
                <TileLayer
                  attribution='&copy; <a href="https://carto.com/">CARTO</a>, &copy; <a href="https://openstreetmap.org">OSM</a>'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {filteredLocations.map((loc) => (
                  <Marker
                    key={loc.id}
                    position={[loc.lat, loc.lng]}
                    icon={createCustomPin(loc.category, activeLocation?.id === loc.id)}
                    eventHandlers={{
                      click: () => setActiveLocation(loc),
                    }}
                  >
                    <Popup>
                      <div className="p-3 max-w-xs space-y-2">
                        <div className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                          {loc.categoryLabel}
                        </div>
                        <h4 className="font-heading font-bold text-sm text-zinc-950">
                          {loc.name}
                        </h4>
                        <p className="text-xs text-zinc-600 line-clamp-2">
                          {loc.shortDescription}
                        </p>
                        <div className="pt-2 border-t border-zinc-200 flex items-center justify-between">
                          <span className="text-xs font-semibold text-zinc-800">
                            ★ {loc.rating} ({loc.city})
                          </span>
                          <a
                            href={loc.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                          >
                            Open Maps <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              {/* Map Floating Legend */}
              <div className="absolute bottom-4 left-4 z-[400] bg-zinc-950/90 backdrop-blur-md border border-zinc-800 px-3 py-2 rounded-xl text-[11px] text-zinc-300 shadow-xl hidden sm:flex items-center gap-3">
                <span className="font-bold text-amber-400">Legend:</span>
                <span className="flex items-center gap-1">🍽️ Food</span>
                <span className="flex items-center gap-1">☕ Sweets</span>
                <span className="flex items-center gap-1">🌲 Outdoors</span>
                <span className="flex items-center gap-1">🏛️ Historic</span>
                <span className="flex items-center gap-1">🎷 Blues</span>
              </div>
            </div>

            {/* Selected Location Card / Drawer */}
            <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-5 space-y-4">
              {activeLocation ? (
                <>
                  <div className="relative rounded-xl overflow-hidden aspect-video border border-zinc-800 group">
                    <img
                      src={activeLocation.image}
                      alt={activeLocation.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-amber-500 text-zinc-950 shadow-md">
                        {activeLocation.badge}
                      </span>
                    </div>
                    {activeLocation.povEpisode && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-zinc-950/80 backdrop-blur-sm border border-zinc-700 text-zinc-200">
                          POV Filmed
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                      <span className="font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
                        {activeLocation.categoryLabel}
                      </span>
                      <span className="text-zinc-500">{activeLocation.price}</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                      {activeLocation.name}
                    </h3>
                    <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span>{activeLocation.address}</span>
                    </p>
                  </div>

                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-3 p-3 bg-zinc-950/80 rounded-xl border border-zinc-800/80">
                    <div className="flex items-center gap-1 text-amber-400 font-bold text-base">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{activeLocation.rating}</span>
                    </div>
                    <div className="text-xs text-zinc-400">
                      <span>{activeLocation.reviewsCount.toLocaleString()} Google Reviews</span>
                      <span className="block text-[10px] text-emerald-400">Verified Local Guide Pick</span>
                    </div>
                  </div>

                  {/* Must Try recommendation box */}
                  <div className="p-3.5 bg-amber-500/10 border border-amber-500/25 rounded-xl space-y-1">
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>The Local Guide Pick / Must-Try:</span>
                    </div>
                    <p className="text-xs font-semibold text-zinc-200">
                      {activeLocation.mustTry}
                    </p>
                  </div>

                  {/* Full review excerpt */}
                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/50">
                    "{activeLocation.fullReview}"
                  </p>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <a
                      href={activeLocation.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 transition-all cursor-pointer"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Get Directions on Google Maps</span>
                    </a>

                    <a
                      href="#videos-section"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-750 text-zinc-200 border border-zinc-700 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                      <span>Watch Episode on YouTube</span>
                    </a>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-zinc-500 text-sm">
                  Click any marker on the map to see details.
                </div>
              )}
            </div>

          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((loc) => (
              <div
                key={loc.id}
                className="bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-amber-500 text-zinc-950 shadow-md">
                      {loc.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-zinc-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{loc.rating}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                      <span className="text-amber-400 font-semibold uppercase tracking-wider text-[10px]">
                        {loc.categoryLabel}
                      </span>
                      <span>{loc.city}, MS</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                      {loc.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                      {loc.shortDescription}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-amber-400 uppercase">Must Order:</span>
                    <p className="text-zinc-200 font-medium truncate">{loc.mustTry}</p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 border-t border-zinc-800/80">
                    <a
                      href={loc.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-blue-600 text-zinc-200 hover:text-white transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Google Maps</span>
                    </a>
                    <button
                      onClick={() => {
                        setViewMode("map");
                        handleSelectLocation(loc);
                      }}
                      className="px-3 py-2 rounded-lg text-xs font-semibold bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500 hover:text-zinc-950 text-amber-400 transition-colors"
                    >
                      Locate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
