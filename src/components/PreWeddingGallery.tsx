import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRE_WEDDING_PHOTOS, PreWeddingPhoto } from '../data/preWeddingPhotos';
import { Play, Pause, ChevronLeft, ChevronRight, Maximize2, X, Sparkles, Heart } from 'lucide-react';

export const PreWeddingGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<PreWeddingPhoto | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PRE_WEDDING_PHOTOS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentPhoto = PRE_WEDDING_PHOTOS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? PRE_WEDDING_PHOTOS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PRE_WEDDING_PHOTOS.length);
  };

  return (
    <section id="pre-wedding" className="py-20 bg-gradient-to-b from-[#FFF5F6] via-white to-[#FFF5F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-pink-100 text-rose-800 border border-pink-200 mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Ensaio Fotografico</span>
          </div>
          <h2 className="font-script text-5xl sm:text-6xl text-rose-950 mb-3">
            Nosso Ensaio Pre-Wedding
          </h2>
          <p className="font-serif-royal italic text-stone-600 text-lg">
            "Momentos eternizados em imagens enquanto contamos os dias para a realização do nosso maior sonho."
          </p>
        </div>

        {/* Main Slideshow Container */}
        <div className="relative max-w-5xl mx-auto bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] min-h-[360px] sm:min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentPhoto.id}
                src={currentPhoto.url}
                alt={currentPhoto.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent pointer-events-none" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{currentPhoto.location}</span>
              </div>
              <h3 className="font-script text-3xl sm:text-4xl text-white">
                {currentPhoto.title}
              </h3>
              <p className="font-serif-royal italic text-stone-200 text-base sm:text-lg max-w-2xl font-light">
                {currentPhoto.quote}
              </p>
            </div>

            <button
              onClick={() => setActiveLightboxPhoto(currentPhoto)}
              title="Expandir Foto"
              className="absolute top-4 right-4 p-3 rounded-full bg-black/40 text-white hover:bg-rose-600 transition-colors backdrop-blur-sm"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-stone-950 px-6 py-4 flex items-center justify-between border-t border-stone-800 text-white">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 text-xs sm:text-sm font-medium text-rose-300 hover:text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pausar Reproduçao' : 'Reproduzir Auto'}</span>
            </button>

            <div className="flex items-center gap-2">
              {PRE_WEDDING_PHOTOS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'w-8 bg-rose-500' : 'w-2 bg-stone-700 hover:bg-stone-500'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-stone-800 hover:bg-rose-600 text-white transition-colors"
                title="Foto Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-stone-800 hover:bg-rose-600 text-white transition-colors"
                title="Proxima Foto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-5xl mx-auto">
          {PRE_WEDDING_PHOTOS.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => {
                setCurrentIndex(idx);
                setActiveLightboxPhoto(photo);
              }}
              className={`relative rounded-xl overflow-hidden aspect-[4/3] group transition-all border-2 ${
                idx === currentIndex ? 'border-rose-500 ring-4 ring-rose-200' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-transparent transition-colors" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeLightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setActiveLightboxPhoto(null)}
          >
            <button
              onClick={() => setActiveLightboxPhoto(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-rose-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-5xl w-full text-center space-y-4" onClick={(e) => e.stopPropagation()}>
              <img
                src={activeLightboxPhoto.url}
                alt={activeLightboxPhoto.title}
                className="max-h-[80vh] mx-auto rounded-2xl shadow-2xl object-contain"
              />
              <div className="text-white space-y-1">
                <h4 className="font-script text-3xl text-rose-300">{activeLightboxPhoto.title}</h4>
                <p className="font-serif-royal italic text-stone-300 text-lg">{activeLightboxPhoto.quote}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
