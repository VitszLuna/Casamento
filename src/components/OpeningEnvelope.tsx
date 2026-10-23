import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OpeningEnvelopeProps {
  onComplete: () => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ onComplete }) => {
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // 1. Wait 3.0 seconds showing the sealed green envelope with selo.png
    const openTimer = setTimeout(() => {
      setDoorsOpen(true);
    }, 3000);

    // 2. Complete and reveal site after doors slide open
    const completeTimer = setTimeout(() => {
      setIsDone(true);
      onComplete();
    }, 4400);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 w-screen h-screen bg-[#8EA086] text-stone-900 overflow-hidden select-none"
      >
        {/* ENVELOPE GATEFOLD DOORS (VERDINHO SAGE / OLIVE GREEN) */}
        <div className="absolute inset-0 z-30 flex">
          
          {/* LEFT DOOR PANEL (VERDINHO) */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: doorsOpen ? '-100%' : '0%' }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            className="w-1/2 h-full bg-[#8EA086] shadow-2xl relative border-r border-stone-700/20"
          >
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>

          {/* RIGHT DOOR PANEL (VERDINHO) */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: doorsOpen ? '100%' : '0%' }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            className="w-1/2 h-full bg-[#8EA086] shadow-2xl relative border-l border-stone-700/20"
          >
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>

          {/* CENTER SEAL IMAGE (selo.png FROM PUBLIC FOLDER) */}
          <AnimatePresence>
            {!doorsOpen && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.25, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
              >
                <div className="w-36 h-36 sm:w-48 sm:h-48 drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)] flex items-center justify-center">
                  <img
                    src="/selo.png"
                    alt="Selo do Convite"
                    className="w-full h-full object-contain filter drop-shadow-xl"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </AnimatePresence>
  );
};
