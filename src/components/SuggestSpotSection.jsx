import React, { useState } from "react";
import { Send, MapPin, CheckCircle2, Utensils } from "lucide-react";
import { trackGuideEvent } from "../utils/analytics";

export function SpotSuggestionForm({ formSource = "on_page_suggest_section", onDone }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formStarted, setFormStarted] = useState(false);
  const [formData, setFormData] = useState({
    submissionType: "viewer_spot_tip",
    spotName: "",
    city: "",
    category: "BBQ / Southern Food",
    mustTryDish: "",
    notes: "",
    submitterName: "",
    submitterEmail: "",
  });

  const handleFocusIn = () => {
    if (formStarted) return;
    setFormStarted(true);
    trackGuideEvent("form_start", {
      form_name: "suggest-spot",
      form_source: formSource,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.spotName.trim() || !formData.city.trim()) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const payload = new URLSearchParams({
        "form-name": "suggest-spot",
        subject: `The Local Guide MS — Spot Suggestion: ${formData.spotName.trim()} (${formData.city.trim()})`,
        submissionType: formData.submissionType,
        spotName: formData.spotName.trim(),
        city: formData.city.trim(),
        category: formData.category,
        mustTryDish: formData.mustTryDish.trim(),
        notes: formData.notes.trim(),
        submitterName: formData.submitterName.trim(),
        submitterEmail: formData.submitterEmail.trim(),
      });

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      if (!res.ok) {
        throw new Error(`Submission returned ${res.status}`);
      }

      setSubmitted(true);
      trackGuideEvent("form_submit", {
        form_name: "suggest-spot",
        form_source: formSource,
        submission_type: formData.submissionType,
        city: formData.city.trim(),
      });
      trackGuideEvent("generate_lead", {
        event_category: "spot_suggestion",
        form_name: "suggest-spot",
        form_source: formSource,
        submission_type: formData.submissionType,
      });

      if (onDone) {
        setTimeout(() => onDone(), 2400);
      }
    } catch {
      setErrorMsg(
        "Could not send your suggestion right now. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-8 sm:p-10 text-center space-y-3 bg-zinc-900/90 border border-emerald-500/30 rounded-3xl"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto border border-emerald-500/40">
          <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
        </div>
        <h3 className="font-heading font-bold text-xl text-white">
          Sent Directly to Damein &amp; Mary!
        </h3>
        <p className="text-xs sm:text-sm text-zinc-200 max-w-md mx-auto">
          Thank you for helping us spotlight great local places across Mississippi! Your recommendation is now in our filming &amp; review queue.
        </p>
      </div>
    );
  }

  const prefix = formSource;

  return (
    <form
      method="POST"
      action="/suggest-a-spot"
      onFocus={handleFocusIn}
      onSubmit={handleSubmit}
      className="space-y-4 text-xs"
    >
      <input type="hidden" name="form-name" value="suggest-spot" />
      <input
        type="hidden"
        name="subject"
        value="The Local Guide MS — New Spot Suggestion"
      />
      <input type="hidden" name="bot-field" value="" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor={`${prefix}-submissionType`}
            className="block text-zinc-200 font-semibold mb-1"
          >
            Who&apos;s Reaching Out?
          </label>
          <select
            id={`${prefix}-submissionType`}
            name="submissionType"
            value={formData.submissionType}
            onChange={(e) =>
              setFormData({ ...formData, submissionType: e.target.value })
            }
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="viewer_spot_tip">Viewer Recommending a Spot</option>
            <option value="business_owner_invite">
              Restaurant / Business Owner
            </option>
            <option value="partnership_media">
              Event / Media Collaboration
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor={`${prefix}-category`}
            className="block text-zinc-200 font-semibold mb-1"
          >
            Spot Category
          </label>
          <select
            id={`${prefix}-category`}
            name="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="BBQ / Southern Food">BBQ &amp; Southern Food</option>
            <option value="Catfish & Seafood">Catfish &amp; Seafood</option>
            <option value="Burgers & Diners">Burgers &amp; Small-Town Diners</option>
            <option value="Buffet / International">Buffet &amp; International</option>
            <option value="Coffee / Bakery / Sweets">Coffee, Bakery &amp; Sweets</option>
            <option value="Attraction / Event / Road Trip">
              Attraction, Fair or Road Trip Stop
            </option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor={`${prefix}-spotName`}
            className="block text-zinc-200 font-semibold mb-1"
          >
            Restaurant or Place Name *
          </label>
          <input
            id={`${prefix}-spotName`}
            name="spotName"
            type="text"
            required
            placeholder="e.g. Grandma's Country Kitchen"
            value={formData.spotName}
            onChange={(e) =>
              setFormData({ ...formData, spotName: e.target.value })
            }
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div>
          <label
            htmlFor={`${prefix}-city`}
            className="block text-zinc-200 font-semibold mb-1"
          >
            Mississippi Town / City *
          </label>
          <input
            id={`${prefix}-city`}
            name="city"
            type="text"
            required
            placeholder="e.g. Jackson, Pearl, Clinton, Oxford"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`${prefix}-mustTryDish`}
          className="block text-zinc-200 font-semibold mb-1"
        >
          What Should Damein &amp; Mary Order? (Must-Try Dish)
        </label>
        <input
          id={`${prefix}-mustTryDish`}
          name="mustTryDish"
          type="text"
          placeholder="e.g. Smoked brisket plate, $12 lunch catfish, banana pudding"
          value={formData.mustTryDish}
          onChange={(e) =>
            setFormData({ ...formData, mustTryDish: e.target.value })
          }
          className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      <div>
        <label
          htmlFor={`${prefix}-notes`}
          className="block text-zinc-200 font-semibold mb-1"
        >
          Why Is This Spot Worth the Drive?
        </label>
        <textarea
          id={`${prefix}-notes`}
          name="notes"
          rows={3}
          placeholder="Tell us about the food, portions, lunch specials, or story behind the place..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div>
          <label
            htmlFor={`${prefix}-submitterName`}
            className="block text-zinc-300 font-medium mb-1"
          >
            Your Name / Handle (Optional — for shoutout!)
          </label>
          <input
            id={`${prefix}-submitterName`}
            name="submitterName"
            type="text"
            autoComplete="name"
            placeholder="e.g. @MSFoodie"
            value={formData.submitterName}
            onChange={(e) =>
              setFormData({ ...formData, submitterName: e.target.value })
            }
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-zinc-100 placeholder-zinc-400 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor={`${prefix}-submitterEmail`}
            className="block text-zinc-300 font-medium mb-1"
          >
            Your Email (Optional — so we can reply)
          </label>
          <input
            id={`${prefix}-submitterEmail`}
            name="submitterEmail"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={formData.submitterEmail}
            onChange={(e) =>
              setFormData({ ...formData, submitterEmail: e.target.value })
            }
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-zinc-100 placeholder-zinc-400 focus:outline-none"
          />
        </div>
      </div>

      {errorMsg && (
        <p role="alert" className="text-xs font-semibold text-rose-300">
          {errorMsg}
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-zinc-950 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
          <span>
            {submitting
              ? "Sending to Damein & Mary..."
              : "Send Spot to The Local Guide MS"}
          </span>
        </button>
      </div>
    </form>
  );
}

export default function SuggestSpotSection() {
  return (
    <section
      id="suggest-spot"
      className="py-16 lg:py-24 bg-zinc-950 relative border-t border-zinc-800/80"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Where Should We Eat Next?</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase">
            Suggest a Mississippi Spot
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base">
            Know a small-town diner, smoky BBQ pit, $12 lunch special, or hidden Mississippi attraction we need to visit? Drop it in our filming queue below.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="flex items-center gap-3 pb-5 mb-6 border-b border-zinc-800">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
              <MapPin className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Direct Filming &amp; Review Queue
              </h3>
              <p className="text-xs text-zinc-300">
                Every suggestion goes straight to Damein &amp; Mary — we pay for our own meals and give 100% honest feedback.
              </p>
            </div>
          </div>

          <SpotSuggestionForm formSource="suggest_spot_section" />
        </div>
      </div>
    </section>
  );
}
