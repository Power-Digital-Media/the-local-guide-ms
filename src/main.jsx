import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const container = document.getElementById("root");
const appElement = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (container && container.hasChildNodes()) {
  hydrateRoot(container, appElement);
} else if (container) {
  createRoot(container).render(appElement);
}
