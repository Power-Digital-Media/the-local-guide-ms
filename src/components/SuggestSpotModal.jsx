import React from "react";
import { X, MapPin } from "lucide-react";
import { SpotSuggestionForm } from "./SuggestSpotSection";

export default function SuggestSpotModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Suggest a Mississippi Spot"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
              <MapPin className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-white">
                Suggest a Mississippi Spot
              </h2>
              <p className="text-xs text-zinc-300">
                Tell Damein &amp; Mary where to review next!
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close suggestion modal"
            onClick={onClose}
            className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <SpotSuggestionForm
            formSource="suggest_spot_modal"
            onDone={onClose}
          />
        </div>
      </div>
    </div>
  );
}
