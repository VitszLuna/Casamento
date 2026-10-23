import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, CheckCircle2, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenConfirmModal: () => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  activeView: 'home' | 'photos';
  onSelectView: (view: 'home' | 'photos') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConfirmModal,
  isPlayingAudio,
  onToggleAudio,
  activeView,
  onSelectView,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const essentialLinks = [
    { name: 'Pré-Wedding', href: '#pre-wedding', isPage: false },
    { name: 'Presentes', href: '#presentes', isPage: false },
    { name: 'Local & Data', href: '#local', isPage: false },
    { name: 'Fotos da Festa', href: '#fotos-festa', isPage: true },
  ];

  const handleLinkClick = (link: typeof essentialLinks[0]) => {
    if (link.isPage) {
      onSelectView('photos');
    } else {
      if (activeView !== 'home') {
        onSelectView('home');
        setTimeout(() => {
          const el = document.querySelector(link.href);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-40 flex justify-center items-center px-4 pointer-events-none">
      
      {/* CENTERED FLOATING CONTAINER */}
      <div className="pointer-events-auto flex items-center justify-center gap-4 sm:gap-8 px-6 py-2.5 rounded-full transition-all duration-500 backdrop-blur-md bg-white/85 border border-stone-200/80 shadow-md">
        
        {/* Desktop Minimal Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-center">
          {essentialLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link)}
              className={`text-xs uppercase tracking-widest font-semibold transition-all hover:text-[#5A6351] hover:scale-105 ${
                link.isPage && activeView === 'photos'
                  ? 'text-[#5A6351] font-bold border-b-2 border-[#5A6351]'
                  : 'text-stone-700'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Audio Toggle & Confirm Presence Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleAudio}
            title={isPlayingAudio ? "Pausar musica" : "Tocar musica"}
            className="p-2 rounded-full transition-all bg-stone-50 text-[#5A6351] border border-stone-200 hover:bg-stone-100"
          >
            {isPlayingAudio ? (
              <Volume2 className="w-4 h-4 text-[#5A6351] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={onOpenConfirmModal}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#6B7863] to-[#5A6351] text-white font-semibold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-200" />
            <span>Confirmar Presença</span>
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-stone-700 bg-stone-50 border border-stone-200"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-xl border border-stone-200 rounded-3xl p-5 shadow-2xl space-y-3 text-center">
          {essentialLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link)}
              className="block w-full py-2 text-stone-800 font-medium text-sm hover:text-[#5A6351] border-b border-stone-100 last:border-0 uppercase tracking-wider text-center"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
