import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import InteractiveMap from "./components/InteractiveMap";
import VideoGallery from "./components/VideoGallery";
import GoogleMapsHub from "./components/GoogleMapsHub";
import RoadTrips from "./components/RoadTrips";
import AboutHost from "./components/AboutHost";
import SuggestSpotModal from "./components/SuggestSpotModal";
import Footer from "./components/Footer";

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [suggestModalOpen, setSuggestModalOpen] = useState(false);

  const handleOpenVideoModal = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-zinc-950">
      {/* Top Navbar */}
      <Navbar onOpenSuggestModal={() => setSuggestModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Banner & Channel Intro */}
        <Hero
          onOpenVideoModal={handleOpenVideoModal}
        />

        {/* Interactive Mississippi Map & Spot Directory */}
        <InteractiveMap
          onSelectVideo={handleOpenVideoModal}
        />

        {/* YouTube Video Episodes & Vlogs */}
        <VideoGallery
          selectedVideo={selectedVideo}
          onOpenVideoModal={handleOpenVideoModal}
          onCloseVideoModal={handleCloseVideoModal}
        />

        {/* Road Trips & Itineraries */}
        <RoadTrips />

        {/* Google Maps Hub */}
        <GoogleMapsHub />

        {/* About Damein & Filming Philosophy */}
        <AboutHost />
      </main>

      {/* Footer */}
      <Footer onOpenSuggestModal={() => setSuggestModalOpen(true)} />

      {/* Community Spot Submission Modal */}
      <SuggestSpotModal
        isOpen={suggestModalOpen}
        onClose={() => setSuggestModalOpen(false)}
      />
    </div>
  );
}
