import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, User, Mail, Phone, Users, Music, Utensils, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured, type RSVP } from '../lib/supabase';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<RSVP>({
    name: '',
    email: '',
    phone: '',
    attending: true,
    guests_count: 1,
    dietary_restrictions: '',
    song_request: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setIsSubmitting(true);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('rsvps').insert([formData]);
        if (error) console.error('Erro ao salvar no Supabase:', error);
      } else {
        const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
        localStorage.setItem('wedding_rsvps', JSON.stringify([...existing, { ...formData, created_at: new Date().toISOString() }]));
      }

      setIsSubmitted(true);
      
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#8EA086', '#d4af37', '#f472b6', '#fef08a']
      });
    } catch (err) {
      console.error('Erro na confirmação:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      attending: true,
      guests_count: 1,
      dietary_restrictions: '',
      song_request: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-rose-100 text-stone-800 my-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {!isSubmitted ? (
            <div>
              <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-2">
                  <Heart className="w-6 h-6 fill-rose-500" />
                </div>
                <h3 className="font-script text-4xl sm:text-5xl text-rose-950">
                  Confirmar Presença
                </h3>
                <p className="font-serif-royal italic text-stone-600 text-sm mt-1">
                  Por favor, confirme sua presença até 30 de Março para organizarmos tudo com muito carinho.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: true })}
                    className={`py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                      formData.attending
                        ? 'border-[#5A6351] bg-[#5A6351]/10 text-stone-900 shadow-xs'
                        : 'border-stone-200 text-stone-500 hover:bg-stone-50'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${formData.attending ? 'text-[#5A6351]' : 'text-stone-300'}`} />
                    <span>Sim, eu vou</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: false })}
                    className={`py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                      !formData.attending
                        ? 'border-stone-400 bg-stone-100 text-stone-900 shadow-xs'
                        : 'border-stone-200 text-stone-500 hover:bg-stone-50'
                    }`}
                  >
                    <span>Não poderei ir</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Seu Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Maria da Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#5A6351] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      E-mail *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="email"
                        required
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#5A6351] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      WhatsApp / Telefone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#5A6351] text-sm"
                      />
                    </div>
                  </div>
                </div>

                {formData.attending && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      Total de Pessoas (Incluindo você)
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <select
                        value={formData.guests_count}
                        onChange={(e) => setFormData({ ...formData, guests_count: Number(e.target.value) })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#5A6351] text-sm"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Pessoa (Apenas Eu)' : 'Pessoas'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Restrições Alimentares ou Observações
                  </label>
                  <div className="relative">
                    <Utensils className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Vegetariano, intolerância a lactose, etc."
                      value={formData.dietary_restrictions || ''}
                      onChange={(e) => setFormData({ ...formData, dietary_restrictions: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#5A6351] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Sua Música Favorita para o DJ Tocar
                  </label>
                  <div className="relative">
                    <Music className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Nome da música / Artista"
                      value={formData.song_request || ''}
                      onChange={(e) => setFormData({ ...formData, song_request: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#5A6351] text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-[#6B7863] via-[#7D8B75] to-[#5A6351] text-white font-semibold shadow-lg shadow-stone-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Salvando...</span>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-amber-200" />
                      <span>Enviar Confirmação</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#7D8B75] to-[#5A6351] flex items-center justify-center text-white shadow-xl animate-bounce">
                <Heart className="w-10 h-10 fill-white" />
              </div>

              <h3 className="font-script text-5xl text-stone-900">
                Presença Confirmada
              </h3>

              <p className="font-serif-royal italic text-stone-600 text-lg max-w-sm mx-auto">
                Muito obrigado, <strong className="text-[#5A6351]">{formData.name}</strong>! Mal podemos esperar para celebrar este dia mágico com você.
              </p>

              <button
                onClick={handleReset}
                className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#6B7863] to-[#5A6351] text-white font-medium shadow-md hover:brightness-110 transition-all"
              >
                Concluir e Voltar ao Site
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
