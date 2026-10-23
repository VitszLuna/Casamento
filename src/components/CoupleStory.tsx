import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Calendar, Star, Coffee } from 'lucide-react';

export const CoupleStory: React.FC = () => {
  const timelineEvents = [
    {
      year: '2021',
      title: 'O Primeiro Olhar',
      icon: Coffee,
      description: 'Nos conhecemos através de amigos em comum em uma tarde despretensiosa de sábado. Bastou uma troca de olhares e uma conversa de horas para sabermos que havia algo especial ali.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
    },
    {
      year: '2022',
      title: 'O Pedido de Namoro',
      icon: Heart,
      description: 'Sob as estrelas em uma viagem inesquecível para a serra, demos o primeiro grande passo juntos. A certeza de que seríamos parceiros para a vida toda só aumentava.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    },
    {
      year: '2025',
      title: 'O Pedido de Casamento',
      icon: Star,
      description: 'Em uma praia paradisíaca ao pôr do sol, ele se ajoelhou e ela disse o SIM mais emocionante de nossas vidas! Choramos de alegria com o coração radiante.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    },
    {
      year: 'Abril 2027',
      title: 'O Nosso Grande Dia',
      icon: Sparkles,
      description: 'O momento de celebrar o nosso amor e construir a nossa nova família diante das pessoas que mais amamos no mundo.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section id="historia" className="py-20 bg-gradient-to-b from-rose-50/40 via-white to-pink-50/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-rose-100 text-rose-800 mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Nossa Linha do Tempo</span>
          </div>
          <h2 className="font-script text-5xl sm:text-6xl text-rose-950 mb-3">
            Nossa História de Amor
          </h2>
          <p className="font-serif-royal italic text-stone-600 text-lg">
            Cada capítulo nos trouxe até aqui. Conheça um pouco da nossa jornada!
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative">
          {/* Vertical Timeline Bar */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-gradient-to-b from-rose-300 via-pink-400 to-rose-300" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100 space-y-3 hover:border-rose-300 transition-colors">
                      <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{event.year}</span>
                      </div>
                      <h3 className="font-serif-royal font-bold text-2xl text-stone-900">
                        {event.title}
                      </h3>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Icon */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 text-white flex items-center justify-center shadow-lg border-4 border-white shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Event Image */}
                  <div className="w-full md:w-1/2">
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
