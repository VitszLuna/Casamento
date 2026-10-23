import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { PreWeddingGallery } from './components/PreWeddingGallery';
import { GiftRegistry } from './components/GiftRegistry';
import { CoupleStory } from './components/CoupleStory';
import { EventDetails } from './components/EventDetails';
import { Footer } from './components/Footer';
import { RsvpModal } from './components/RsvpModal';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { AudioPlayer } from './components/AudioPlayer';
import { PartyPhotoPage } from './components/PartyPhotoPage';

export const App: React.FC = () => {
  const [envelopeFinished, setEnvelopeFinished] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'photos'>('home');

  const toggleAudio = () => {
    setIsPlayingAudio((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-rose-50/20 text-stone-800 font-sans selection:bg-rose-200 selection:text-rose-950">
      {/* 1. Envelope Entrance Animation (3s timer, verdinho #8EA086 doors, selo.png image, direct entry) */}
      {!envelopeFinished && (
        <OpeningEnvelope onComplete={() => setEnvelopeFinished(true)} />
      )}

      {/* 2. Audio Background Player */}
      <AudioPlayer isPlaying={isPlayingAudio} onToggle={toggleAudio} />

      {/* 3. Centered Floating Navigation Header */}
      <Navbar
        onOpenConfirmModal={() => setIsConfirmModalOpen(true)}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={toggleAudio}
        activeView={activeView}
        onSelectView={setActiveView}
      />

      {/* 4. Page View Router */}
      {activeView === 'home' ? (
        <>
          {/* Main Landing Page Sections */}
          <HeroBanner
            onOpenConfirmModal={() => setIsConfirmModalOpen(true)}
            coupleNames="Isabela & Gabriel"
            weddingDateStr="17 de Abril de 2027 • 16:30"
            targetDateStr="2027-04-17T16:30:00"
          />

          <PreWeddingGallery />

          <GiftRegistry />

          <CoupleStory />

          <EventDetails />

          <Footer />
        </>
      ) : (
        /* Standalone Dedicated Photos Page */
        <PartyPhotoPage onBackToHome={() => setActiveView('home')} />
      )}

      {/* 5. Confirm Presence Modal */}
      <RsvpModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
};

export default App;
