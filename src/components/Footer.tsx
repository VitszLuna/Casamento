import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1F1B] text-white py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        
        {/* Monogram Crest (100% round, no border ring) */}
        <div className="w-14 h-14 mx-auto rounded-full overflow-hidden shadow-lg">
          <img src="/selo-gk.jpg" alt="G & K Monograma" className="w-full h-full object-cover rounded-full" />
        </div>

        <h3 className="font-script text-4xl sm:text-5xl text-amber-200">
          Gabriel & Karine
        </h3>

        <p className="font-serif-royal italic text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
          "Feito com todo o amor do mundo para celebrar nossa união ao lado de pessoas inesquecíveis."
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-amber-300 font-medium tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>17 de Abril de 2027 • Esperamos por você!</span>
        </div>

        <div className="pt-6 border-t border-stone-800 text-stone-400 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2027 Nosso Casamento Mágico • G & K. Todos os direitos reservados.</span>
          <span className="flex items-center gap-1">
            <span>Criado com amor</span>
            <Heart className="w-3.5 h-3.5 fill-[#E8A5A5] text-[#E8A5A5]" />
          </span>
        </div>
      </div>
    </footer>
  );
};
