import React from 'react';
import { ExternalLink } from 'lucide-react';

export const EventDetails: React.FC = () => {
  return (
    <section id="local" className="py-20 bg-gradient-to-b from-pink-50/40 via-white to-rose-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-rose-100 text-rose-800 mb-3 border border-rose-200">
            <span>Cerimônia e Festa</span>
          </div>
          <h2 className="font-script text-5xl sm:text-6xl text-rose-950 mb-3">
            Onde e Quando
          </h2>
          <p className="font-serif-royal italic text-stone-600 text-lg">
            Esperamos por você para celebrar o momento mais esperado das nossas vidas!
          </p>
        </div>

        {/* Info Cards Grid (Clean without icon squares) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1: Cerimônia */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-rose-100 text-center space-y-4 hover:border-rose-300 transition-all">
            <h3 className="font-serif-royal font-bold text-2xl text-stone-900 border-b border-rose-100 pb-3">
              Cerimônia Religiosa
            </h3>
            <div className="space-y-1 text-stone-600 text-sm">
              <p className="font-semibold text-rose-700 text-base">17 de Abril de 2027</p>
              <p className="text-stone-500">Pontualmente às 16:30h</p>
            </div>
            <p className="text-stone-500 text-xs leading-relaxed">
              Recomendamos chegar com 30 minutos de antecedência para se acomodarem com tranquilidade.
            </p>
          </div>

          {/* Card 2: Recepção & Festa */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-rose-100 text-center space-y-4 hover:border-rose-300 transition-all">
            <h3 className="font-serif-royal font-bold text-2xl text-stone-900 border-b border-rose-100 pb-3">
              Festa e Recepção
            </h3>
            <div className="space-y-1 text-stone-600 text-sm">
              <p className="font-semibold text-amber-700 text-base">Logo após a Cerimônia</p>
              <p className="text-stone-500">No mesmo local do evento</p>
            </div>
            <p className="text-stone-500 text-xs leading-relaxed">
              Muita música, drinks especiais, jantar delicioso e pista de dança até o amanhecer!
            </p>
          </div>

          {/* Card 3: Traje */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-rose-100 text-center space-y-4 hover:border-rose-300 transition-all">
            <h3 className="font-serif-royal font-bold text-2xl text-stone-900 border-b border-rose-100 pb-3">
              Traje Sugerido
            </h3>
            <div className="space-y-1 text-stone-600 text-sm">
              <p className="font-semibold text-pink-700 text-base">Passeio Completo / Esporte Fino</p>
              <p className="text-stone-500">Elegante e Confortável</p>
            </div>
            <p className="text-stone-500 text-xs leading-relaxed">
              Mulheres: vestidos fluidos ou de festa (favor evitar branco/off-white). Homens: terno ou camisa social com blazer.
            </p>
          </div>
        </div>

        {/* Location & Map Card */}
        <div className="bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <span>Endereço Oficial</span>
              </div>

              <h3 className="font-script text-4xl sm:text-5xl text-amber-200">
                Villa Di Capri
              </h3>

              <p className="text-stone-300 text-sm leading-relaxed">
                Av. das Hortênsias, nº 1500 • Bairro Jardim das Flores • São Paulo - SP
              </p>

              <p className="text-xs text-stone-400">
                Estacionamento amplo e gratuito no local com serviço de manobrista.
              </p>

              <div className="pt-2">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5A6351] hover:bg-[#485040] text-white font-medium text-sm transition-all shadow-lg hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir no Google Maps / Waze</span>
                </a>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-white/20">
              <iframe
                title="Mapa do Casamento"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1974737210874!2d-46.6586071!3d-23.561414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
