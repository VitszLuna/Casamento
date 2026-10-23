import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Gift } from 'lucide-react';

interface HeroBannerProps {
  onOpenConfirmModal: () => void;
  coupleNames?: string;
  weddingDateStr?: string;
  targetDateStr?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenConfirmModal,
  coupleNames = "Isabela & Gabriel",
  weddingDateStr = "17 de Abril de 2027 • 16:30",
  targetDateStr = "2027-04-17T16:30:00"
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(targetDateStr).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Casamento Romantico"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.75] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/40 to-stone-900/60" />
      </div>

      {/* Floating Fairy Lights & Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-200/40 blur-xs"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [-10, -50, -10],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-4xl mx-auto text-center text-white space-y-8">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-script text-6xl sm:text-7xl md:text-9xl text-amber-100 drop-shadow-lg leading-none pt-4"
        >
          {coupleNames}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif-royal italic text-xl sm:text-2xl text-rose-100 max-w-2xl mx-auto font-light"
        >
          "E acima de tudo isto, revesti-vos do amor, que e o vinculo da perfeição."
        </motion.p>

        {/* Date & Location Pills (Clean without icons as requested) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 text-sm sm:text-base font-medium"
        >
          <div className="px-6 py-2.5 rounded-full bg-stone-900/60 border border-white/20 backdrop-blur-md text-amber-200">
            <span>{weddingDateStr}</span>
          </div>

          <div className="px-6 py-2.5 rounded-full bg-stone-900/60 border border-white/20 backdrop-blur-md text-amber-200">
            <span>Villa Di Capri • Tuscan Garden</span>
          </div>
        </motion.div>

        {/* Countdown Clock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-4"
        >
          <p className="text-xs uppercase tracking-widest text-rose-200 font-semibold mb-4">
            Contagem Regressiva Para o SIM
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
            {[
              { label: 'Dias', value: timeLeft.days },
              { label: 'Horas', value: timeLeft.hours },
              { label: 'Minutos', value: timeLeft.minutes },
              { label: 'Segundos', value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 text-center shadow-lg hover:border-amber-300 transition-colors"
              >
                <div className="font-serif-royal font-bold text-2xl sm:text-4xl text-amber-200">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs text-rose-100 uppercase tracking-wider font-medium mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4 pt-4"
        >
          <button
            onClick={onOpenConfirmModal}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#6B7863] via-[#7D8B75] to-[#5A6351] text-white font-semibold text-base shadow-xl shadow-stone-900/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-5 h-5 text-amber-200" />
            <span>Confirmar Presença</span>
          </button>

          <a
            href="#presentes"
            className="px-8 py-4 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold text-base backdrop-blur-md border border-white/40 shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
          >
            <Gift className="w-5 h-5 text-amber-300" />
            <span>Lista de Presentes Pix</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
