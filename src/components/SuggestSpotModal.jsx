import React, { useState } from "react";
import { X, Send, MapPin, Sparkles, CheckCircle2, Utensils, MessageSquare } from "lucide-react";

export default function SuggestSpotModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    spotName: "",
    city: "",
    category: "food",
    mustTryDish: "",
    notes: "",
    submitterName: "",
    submitterEmail: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.spotName || !formData.city) return;

    // Save submission locally
    const existing = JSON.parse(localStorage.getItem("tlg_spot_submissions") || "[]");
    existing.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem("tlg_spot_submissions", JSON.stringify(existing));

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-750 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Suggest a Mississippi Spot
              </h3>
              <p className="text-xs text-zinc-400">Tell Damein & Mary where to review next!</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-heading font-bold text-xl text-white">Spot Added to Review Queue!</h4>
            <p className="text-xs text-zinc-300 max-w-xs mx-auto">
              Thank you for supporting Mississippi local spots! We've pinned this for an upcoming food run or YouTube vlog.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Place Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grandma's Kitchen"
                  value={formData.spotName}
                  onChange={(e) => setFormData({ ...formData, spotName: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Mississippi Town / City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oxford, Jackson, Ocean Springs"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">What Should We Order? (Must-Try Dish)</label>
              <input
                type="text"
                placeholder="e.g. The double smoked brisket burger & banana pudding"
                value={formData.mustTryDish}
                onChange={(e) => setFormData({ ...formData, mustTryDish: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Why is this place special? (Notes/Story)</label>
              <textarea
                rows="3"
                placeholder="Tell us about the owners, vibe, or secret menu items..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-zinc-400 mb-1">Your Name / Handle (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Local Foodie"
                  value={formData.submitterName}
                  onChange={(e) => setFormData({ ...formData, submitterName: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-zinc-100 placeholder-zinc-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Your Email (For shoutout notice)</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.submitterEmail}
                  onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-zinc-100 placeholder-zinc-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Spot to The Local Guide MS</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
