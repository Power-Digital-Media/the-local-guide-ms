import React, { Suspense, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import InteractiveMap from "./components/InteractiveMap";
import VideoGallery from "./components/VideoGallery";
import GoogleMapsHub from "./components/GoogleMapsHub";
import RoadTrips from "./components/RoadTrips";
import LiveGoogleReviews from "./components/LiveGoogleReviews";
import AboutHost from "./components/AboutHost";
import GuidesShowcaseSection from "./components/GuidesShowcaseSection";
import SpotReviewPage from "./components/SpotReviewPage";
import GuideArticlePage from "./components/GuideArticlePage";
import SuggestSpotSection from "./components/SuggestSpotSection";
import Footer from "./components/Footer";

const SuggestSpotModal = React.lazy(() => import("./components/SuggestSpotModal"));
import { locationsData } from "./data/locations";
import { guidesData } from "./data/guides";

function SubpageHero({ breadcrumb, title, accent, subtitle }) {
  return (
    <section className="pt-28 pb-12 sm:pt-32 sm:pb-16 bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-zinc-950 border-b border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <nav
          aria-label="Breadcrumb"
          className="text-xs font-semibold uppercase tracking-wider text-zinc-300"
        >
          <a href="/" className="text-amber-300 hover:underline">
            Home
          </a>{" "}
          <span aria-hidden="true">/</span> <span>{breadcrumb}</span>
        </nav>
        <h1 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-wide leading-tight">
          {title}{" "}
          {accent && <span className="text-amber-400">{accent}</span>}
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

export default function App({ routePath }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [suggestModalOpen, setSuggestModalOpen] = useState(false);

  const rawPath =
    routePath ||
    (typeof window !== "undefined" ? window.location.pathname : "/");
  const cleanPath = rawPath.replace(/\/+$/, "") || "/";

  const reviewSlug = cleanPath.startsWith("/reviews/")
    ? cleanPath.slice("/reviews/".length)
    : null;
  const matchedSpot = reviewSlug
    ? locationsData.find((l) => l.slug === reviewSlug)
    : null;

  const guideSlug = cleanPath.startsWith("/guides/")
    ? cleanPath.slice("/guides/".length)
    : null;
  const matchedGuide = guideSlug
    ? guidesData.find((g) => g.slug === guideSlug)
    : null;

  const handleOpenVideoModal = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-zinc-950">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar onOpenSuggestModal={() => setSuggestModalOpen(true)} />

      <main id="main-content" className="flex-grow">
        {matchedSpot ? (
          <>
            <SpotReviewPage spot={matchedSpot} />
            <SuggestSpotSection />
          </>
        ) : matchedGuide ? (
          <>
            <GuideArticlePage guide={matchedGuide} />
            <SuggestSpotSection />
          </>
        ) : cleanPath === "/spots" ? (
          <>
            <SubpageHero
              breadcrumb="Mississippi Spots Directory"
              title="Mississippi Restaurant &"
              accent="Hidden Gem Directory"
              subtitle="Browse every BBQ smokehouse, catfish lunch special, historic diner, and small-town gem reviewed and mapped by Damein & Mary across Mississippi."
            />
            <InteractiveMap
              defaultViewMode="grid"
              onSelectVideo={handleOpenVideoModal}
            />
            <GuidesShowcaseSection />
            <VideoGallery
              selectedVideo={selectedVideo}
              onOpenVideoModal={handleOpenVideoModal}
              onCloseVideoModal={handleCloseVideoModal}
            />
            <LiveGoogleReviews />
            <SuggestSpotSection />
          </>
        ) : cleanPath === "/road-trips" ? (
          <>
            <SubpageHero
              breadcrumb="Mississippi Road Trips"
              title="Curated Mississippi"
              accent="Food Trails & Road Trips"
              subtitle="Weekend drives built around real Mississippi flavor — from the Highway 61 Blues & Tamales Trail to Scenic Highway 90 on the Gulf Coast and Jackson Metro."
            />
            <RoadTrips showAllExpanded={true} />
            <GoogleMapsHub />
            <SuggestSpotSection />
          </>
        ) : cleanPath === "/suggest-a-spot" ? (
          <>
            <SubpageHero
              breadcrumb="Suggest a Spot"
              title="Where Should We"
              accent="Eat Next in Mississippi?"
              subtitle="Know a hometown diner, smoky BBQ pit, $12 lunch special, or local attraction Damein & Mary need to visit? Send it straight to our filming queue."
            />
            <SuggestSpotSection />
            <AboutHost />
          </>
        ) : (
          <>
            <Hero />
            <InteractiveMap onSelectVideo={handleOpenVideoModal} />
            <VideoGallery
              selectedVideo={selectedVideo}
              onOpenVideoModal={handleOpenVideoModal}
              onCloseVideoModal={handleCloseVideoModal}
            />
            <GuidesShowcaseSection />
            <RoadTrips />
            <GoogleMapsHub />
            <LiveGoogleReviews />
            <AboutHost />
            <SuggestSpotSection />
          </>
        )}
      </main>

      <Footer onOpenSuggestModal={() => setSuggestModalOpen(true)} />

      {suggestModalOpen && (
        <Suspense fallback={null}>
          <SuggestSpotModal
            isOpen={suggestModalOpen}
            onClose={() => setSuggestModalOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
