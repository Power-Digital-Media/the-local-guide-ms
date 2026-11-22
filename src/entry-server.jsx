import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { locationsData } from "./data/locations.js";
import { videosData } from "./data/videos.js";
import { guidesData } from "./data/guides.js";

export function renderRoute(routePath) {
  return renderToString(<App routePath={routePath} />);
}

export { locationsData, videosData, guidesData };
