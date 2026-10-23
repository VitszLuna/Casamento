import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GIFTS_DATA, GiftItem } from '../data/giftsData';
import { QRCodeSVG } from 'qrcode.react';
import { Gift, Heart, Copy, Check, X, Sparkles, ShoppingBag, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const GiftRegistry: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeGift, setActiveGift] = useState<GiftItem | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerMessage, setBuyerMessage] = useState('');
  const [copiedPix, setCopiedPix] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'all', label: 'Todos os Presentes' },
    { id: 'funny', label: 'Engraçados' },
    { id: 'honeymoon', label: 'Lua de Mel' },
    { id: 'experience', label: 'Experiências' },
    { id: 'home', label: 'Casa Nova' },
  ];

  const filteredGifts = selectedCategory === 'all'
    ? GIFTS_DATA
    : GIFTS_DATA.filter((item) => item.category === selectedCategory);

  const generatePixCode = (amount: number, txid: string) => {
    return `00020126580014BR.GOV.BCB.PIX0136casamento.magico.abril2027@pix.com520400005303986540${amount.toFixed(2).replace('.', '')}5802BR5925ISABELA E GABRIEL NOIVOS6009SAO PAULO62070503${txid.slice(0, 4)}6304E8A2`;
  };

  const handleOpenGiftModal = (gift: GiftItem) => {
    setActiveGift(gift);
    setBuyerName('');
    setBuyerMessage('');
    setCopiedPix(false);
    setPaymentDone(false);
  };

  const handleCopyPix = (pixCode: string) => {
    navigator.clipboard.writeText(pixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleConfirmPixPayment = async () => {
    if (!activeGift || !buyerName) return;

    setIsSubmitting(true);

    const giftRecord = {
      gift_id: activeGift.id,
      gift_title: activeGift.title,
      amount: activeGift.price,
      buyer_name: buyerName,
      buyer_message: buyerMessage,
      pix_code: generatePixCode(activeGift.price, activeGift.id),
      status: 'completed',
    };

    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.from('gifts').insert([giftRecord]);
      } else {
        const existing = JSON.parse(localStorage.getItem('wedding_gifts') || '[]');
        localStorage.setItem('wedding_gifts', JSON.stringify([...existing, { ...giftRecord, created_at: new Date().toISOString() }]));
      }

      setPaymentDone(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8EA086', '#d4af37', '#f472b6', '#fef08a']
      });
    } catch (err) {
      console.error('Erro ao registrar presente:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="presentes" className="py-20 bg-gradient-to-b from-rose-50/60 via-pink-50/30 to-rose-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-amber-100 text-amber-900 mb-3">
            <Gift className="w-3.5 h-3.5 text-amber-600" />
            <span>Lista Virtual de Presentes</span>
          </div>
          <h2 className="font-script text-5xl sm:text-6xl text-rose-950 mb-3">
            Mimos e Brincadeiras dos Noivos
          </h2>
          <p className="font-serif-royal italic text-stone-600 text-base sm:text-lg">
            Sua presença é o nosso maior presente! Mas se quiser nos mimar com um Pix ou dar risada com nossas tiradas engraçadas, escolha abaixo:
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#6B7863] to-[#5A6351] text-white shadow-md scale-105'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-rose-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* COMPACT CARDS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredGifts.map((gift) => (
            <motion.div
              key={gift.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-rose-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Image Banner */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={gift.image}
                  alt={gift.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {gift.popular && (
                  <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-amber-100/90 text-amber-900 text-[10px] font-bold shadow-xs border border-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" /> Favorito
                  </div>
                )}
                <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-stone-950/80 text-white font-bold text-xs sm:text-sm backdrop-blur-md">
                  R$ {gift.price.toFixed(2).replace('.', ',')}
                </div>
              </div>

              {/* Compact Card Body */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif-royal font-bold text-sm sm:text-base text-stone-900 group-hover:text-[#5A6351] transition-colors leading-snug">
                    {gift.title}
                  </h3>
                  <p className="text-stone-500 text-[11px] sm:text-xs mt-1 leading-relaxed line-clamp-3">
                    {gift.description}
                  </p>
                </div>

                <button
                  onClick={() => handleOpenGiftModal(gift)}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-[#6B7863] to-[#5A6351] text-white font-medium text-xs shadow-xs hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Presentear Pix</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dynamic Pix Payment Modal */}
      <AnimatePresence>
        {activeGift && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 text-stone-800 my-auto"
            >
              <button
                onClick={() => setActiveGift(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>

              {!paymentDone ? (
                <div className="space-y-5">
                  {/* Gift Info Summary */}
                  <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                    <img src={activeGift.image} alt={activeGift.title} className="w-14 h-14 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-serif-royal font-bold text-base text-stone-900">{activeGift.title}</h4>
                      <p className="text-[#5A6351] font-bold text-lg">R$ {activeGift.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>

                  {/* Buyer Name & Message */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Tio João e Família"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-[#5A6351] text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                        Mensagem Carinhosa aos Noivos (Opcional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Desejamos toda a felicidade do mundo neste novo ciclo!"
                        value={buyerMessage}
                        onChange={(e) => setBuyerMessage(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-[#5A6351] text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Pix QR Code Generator */}
                  {buyerName ? (
                    <div className="text-center p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-3 py-1 rounded-full">
                        <CreditCard className="w-3.5 h-3.5 text-emerald-600" /> Pagamento Instantâneo Pix
                      </div>

                      <div className="flex justify-center p-3 bg-white rounded-xl shadow-xs w-fit mx-auto border border-stone-200">
                        <QRCodeSVG
                          value={generatePixCode(activeGift.price, activeGift.id)}
                          size={170}
                          level="H"
                          includeMargin
                        />
                      </div>

                      <button
                        onClick={() => handleCopyPix(generatePixCode(activeGift.price, activeGift.id))}
                        className={`w-full py-2.5 px-4 rounded-xl font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                          copiedPix
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-900 text-white hover:bg-stone-800'
                        }`}
                      >
                        {copiedPix ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Código Pix Copiado com Sucesso!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copiar Código Pix (Copia e Cola)</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleConfirmPixPayment}
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6B7863] to-[#5A6351] text-white font-semibold text-xs sm:text-sm shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2"
                      >
                        <Heart className="w-4 h-4 fill-white" />
                        <span>Já Fiz o Pix! Confirmar Mimo</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-900 text-xs font-medium text-center">
                      Por favor, digite seu nome acima para liberar o QR Code do Pix.
                    </div>
                  )}
                </div>
              ) : (
                /* Success Confirmation State */
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                    <Check className="w-7 h-7" />
                  </div>

                  <h3 className="font-script text-4xl text-rose-950">
                    Obrigado pelo Presente!
                  </h3>

                  <p className="font-serif-royal italic text-stone-600 text-sm">
                    Sua contribuição de <strong>R$ {activeGift.price.toFixed(2).replace('.', ',')}</strong> para "{activeGift.title}" encheu nossos corações de alegria!
                  </p>

                  <button
                    onClick={() => setActiveGift(null)}
                    className="mt-3 px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-colors"
                  >
                    Voltar para a Lista
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
