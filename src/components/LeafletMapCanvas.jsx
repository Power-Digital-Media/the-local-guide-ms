import React, { useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { ExternalLink } from "lucide-react";

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function createCustomPin(category, isSelected, accessibleLabel) {
  let bgColor = "#f59e0b";
  let iconChar = "🍽️";

  if (category === "sweets") {
    bgColor = "#f43f5e";
    iconChar = "☕";
  } else if (category === "outdoors") {
    bgColor = "#10b981";
    iconChar = "🌲";
  } else if (category === "historic") {
    bgColor = "#3b82f6";
    iconChar = "🏛️";
  } else if (category === "nightlife") {
    bgColor = "#a855f7";
    iconChar = "🎷";
  }

  const borderClass = isSelected
    ? "border-white scale-110 z-50 ring-4 ring-amber-400"
    : "border-zinc-900";

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
        <span aria-hidden="true">${iconChar}</span>
        <span class="sr-only">${escapeHtml(accessibleLabel)}</span>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20],
  });
}

function MapController({ center, zoom, onZoomChange }) {
  const map = useMap();
  useMapEvents({
    zoomend: () => {
      onZoomChange(map.getZoom());
    },
  });

  React.useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 13, { duration: 1.1 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function LeafletMapCanvas({
  mapCenter,
  mapZoom,
  filteredLocations,
  activeLocation,
  onSelectLocation,
}) {
  const [currentZoom, setCurrentZoom] = useState(mapZoom || 7.4);

  // At statewide zoom (< 10), keep >= ~25 miles between displayed pins so interactive buttons never overlap
  const visibleMarkers = useMemo(() => {
    if (currentZoom >= 10) return filteredLocations;
    const minDegSq = 0.36 * 0.36;
    const kept = [];
    const prioritized = activeLocation
      ? [
          ...filteredLocations.filter((l) => l.id === activeLocation.id),
          ...filteredLocations.filter((l) => l.id !== activeLocation.id),
        ]
      : filteredLocations;

    for (const loc of prioritized) {
      const overlaps = kept.some((existing) => {
        const dLat = existing.lat - loc.lat;
        const dLng = existing.lng - loc.lng;
        return dLat * dLat + dLng * dLng < minDegSq;
      });
      if (!overlaps) {
        kept.push(loc);
      }
    }
    return kept;
  }, [filteredLocations, activeLocation, currentZoom]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <MapController
        center={mapCenter}
        zoom={mapZoom}
        onZoomChange={setCurrentZoom}
      />
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>, &copy; <a href="https://openstreetmap.org">OSM</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {visibleMarkers.map((loc) => {
        const label = `${loc.name} — ${loc.city}, Mississippi`;
        return (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            title={label}
            alt={label}
            icon={createCustomPin(
              loc.category,
              activeLocation?.id === loc.id,
              label
            )}
            eventHandlers={{
              add: (e) => {
                const el = e.target.getElement();
                if (el) {
                  el.setAttribute("aria-label", label);
                }
              },
              click: () => onSelectLocation(loc),
            }}
          >
            <Popup>
              <div className="p-3 max-w-xs space-y-2">
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  {loc.categoryLabel}
                </div>
                <div className="font-heading font-bold text-sm text-zinc-100">
                  {loc.name}
                </div>
                <p className="text-xs text-zinc-300 line-clamp-2">
                  {loc.shortDescription}
                </p>
                <div className="pt-2 border-t border-zinc-700 flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-300">
                    ★ {loc.rating} ({loc.city})
                  </span>
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-sky-400 hover:underline flex items-center gap-1"
                  >
                    Open Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
