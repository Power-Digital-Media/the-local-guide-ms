# The Local Guide MS Web Platform 🗺️🎬

The official companion website for **The Local Guide MS** YouTube channel ([@TheLocalGuide-MS](https://www.youtube.com/@TheLocalGuide-MS)).

## Features
- **Interactive Mississippi Map**: Custom Leaflet + OpenStreetMap engine linking directly to Google Maps coordinates and direction links.
- **YouTube Video Hub**: Video catalog with categories, modal player, and 1-click Subscribe CTAs.
- **Curated Road Trips**: Multi-stop itineraries across Highway 61 Blues Trail, Mississippi Gulf Coast, and Jackson Metro.
- **Google Maps Local Guide Hub**: Direct link to Level 8 Local Guide reviews, lists, and photos.
- **Spot Submissions**: Community suggestion form storing recommendations to local storage.
- **Branded Design System**: Customized with Damein's Meta Smart Glasses POV badge, Jackson skyline, and southern diner aesthetics.

## How to Add New Content
- **Add or edit YouTube videos**: Open `src/data/videos.js` and add a new video entry with your YouTube ID, title, and location.
- **Add or edit Google Maps spots**: Open `src/data/locations.js` and add coordinates, review, must-try dish, and Google Maps URL.
- **Change channel settings**: Open `src/data/channelConfig.js`.

## Getting Started
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
npm run preview
```
