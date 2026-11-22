import React, { useEffect, useRef, useState } from "react";
import LeafletMapCanvas from "./LeafletMapCanvas";

const DARK_GOLD_MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#18181b" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#09090b" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#d4d4d8" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#fbbf24" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#a1a1aa" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#27272a" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#b45309" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#fde68a" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0c4a6e" }],
  },
];

let googleMapsPromise = null;

function loadGoogleMapsSdk(apiKey) {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  if (window.google?.maps?.Map) return Promise.resolve(window.google.maps);
  if (googleMapsPromise) return googleMapsPromise;

  googleMapsPromise = new Promise((resolve, reject) => {
    const prevAuthFailure = window.gm_authFailure;
    window.gm_authFailure = () => {
      if (typeof prevAuthFailure === "function") prevAuthFailure();
      googleMapsPromise = null;
      reject(new Error("GM_AUTH_FAILURE"));
    };

    const callbackName = "__initLocalGuideGoogleMaps";
    window[callbackName] = () => {
      resolve(window.google.maps);
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&loading=async&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      googleMapsPromise = null;
      reject(new Error("SCRIPT_LOAD_ERROR"));
    };
    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

export default function GoogleJsMapCanvas({
  mapCenter,
  mapZoom,
  filteredLocations,
  activeLocation,
  onSelectLocation,
}) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);
  const [sdkFailed, setSdkFailed] = useState(!apiKey);

  useEffect(() => {
    if (!apiKey) {
      setSdkFailed(true);
      return;
    }

    let cancelled = false;
    const prevFailure = window.gm_authFailure;
    window.gm_authFailure = () => {
      if (!cancelled) setSdkFailed(true);
    };

    loadGoogleMapsSdk(apiKey)
      .then((gmaps) => {
        if (cancelled || !containerRef.current) return;
        if (!mapRef.current) {
          mapRef.current = new gmaps.Map(containerRef.current, {
            center: { lat: mapCenter[0], lng: mapCenter[1] },
            zoom: Math.round(mapZoom || 7),
            styles: DARK_GOLD_MAP_STYLES,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
          });
          infoWindowRef.current = new gmaps.InfoWindow();
        }
      })
      .catch(() => {
        if (!cancelled) setSdkFailed(true);
      });

    return () => {
      cancelled = true;
      window.gm_authFailure = prevFailure;
    };
  }, [apiKey]);

  useEffect(() => {
    if (sdkFailed || !mapRef.current || !window.google?.maps) return;
    const gmaps = window.google.maps;

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = filteredLocations.map((loc) => {
      const isSelected = activeLocation?.id === loc.id;
      const marker = new gmaps.Marker({
        position: { lat: loc.lat, lng: loc.lng },
        map: mapRef.current,
        title: `${loc.name} — ${loc.city}, MS`,
        icon: {
          path: gmaps.SymbolPath.CIRCLE,
          fillColor: isSelected ? "#fbbf24" : "#f59e0b",
          fillOpacity: 1,
          strokeColor: isSelected ? "#ffffff" : "#18181b",
          strokeWeight: isSelected ? 3 : 2,
          scale: isSelected ? 11 : 8,
        },
      });

      marker.addListener("click", () => {
        onSelectLocation(loc);
        if (infoWindowRef.current) {
          infoWindowRef.current.setContent(
            `<div style="padding:6px 8px;max-width:220px;font-family:sans-serif;color:#18181b">
              <div style="font-size:11px;font-weight:700;color:#b45309;text-transform:uppercase">${loc.categoryLabel}</div>
              <div style="font-size:14px;font-weight:800;margin-top:2px">${loc.name}</div>
              <div style="font-size:12px;color:#3f3f46;margin-top:2px">★ ${loc.rating} · ${loc.city}, MS</div>
              <a href="${loc.googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:6px;font-size:12px;font-weight:700;color:#2563eb">Open in Google Maps &rarr;</a>
            </div>`
          );
          infoWindowRef.current.open(mapRef.current, marker);
        }
      });

      return marker;
    });
  }, [filteredLocations, activeLocation, onSelectLocation, sdkFailed]);

  useEffect(() => {
    if (sdkFailed || !mapRef.current || !mapCenter) return;
    mapRef.current.panTo({ lat: mapCenter[0], lng: mapCenter[1] });
    if (mapZoom) {
      mapRef.current.setZoom(Math.round(mapZoom));
    }
  }, [mapCenter, mapZoom, sdkFailed]);

  if (sdkFailed) {
    return (
      <LeafletMapCanvas
        mapCenter={mapCenter}
        mapZoom={mapZoom}
        filteredLocations={filteredLocations}
        activeLocation={activeLocation}
        onSelectLocation={onSelectLocation}
      />
    );
  }

  return <div ref={containerRef} className="w-full h-full" />;
}
