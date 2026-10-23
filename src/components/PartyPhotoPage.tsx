import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Heart, Image as ImageIcon, Sparkles, X, User, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured, type GuestPhoto } from '../lib/supabase';

const INITIAL_DEMO_PHOTOS: GuestPhoto[] = [
  {
    id: 'demo-1',
    author_name: 'Tia Carmen e Família',
    photo_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    caption: 'Que cerimônia mágica! Desejamos toda a felicidade do mundo aos noivos!',
    created_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    author_name: 'Padrinho Lucas',
    photo_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    caption: 'Momento inesquecível da pista de dança! Viva os noivos!',
    created_at: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    author_name: 'Amigas da Noiva',
    photo_url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
    caption: 'A noiva mais linda do planeta! Amamos vocês!',
    created_at: new Date().toISOString(),
  },
];

interface PartyPhotoPageProps {
  onBackToHome: () => void;
}

export const PartyPhotoPage: React.FC<PartyPhotoPageProps> = ({ onBackToHome }) => {
  const [photos, setPhotos] = useState<GuestPhoto[]>(INITIAL_DEMO_PHOTOS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activePhoto, setActivePhoto] = useState<GuestPhoto | null>(null);
  const [likesCount, setLikesCount] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('guest_photos')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setPhotos([...data, ...INITIAL_DEMO_PHOTOS]);
        }
      } else {
        const local = JSON.parse(localStorage.getItem('wedding_party_photos') || '[]');
        if (local.length > 0) {
          setPhotos([...local, ...INITIAL_DEMO_PHOTOS]);
        }
      }
    } catch (err) {
      console.error('Erro ao carregar fotos:', err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !authorName) return;

    setIsUploading(true);

    try {
      let finalPhotoUrl = previewUrl || '';

      if (isSupabaseConfigured && supabase) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `party/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('party_photos')
          .upload(filePath, selectedFile);

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('party_photos')
            .getPublicUrl(filePath);
          
          finalPhotoUrl = publicUrlData.publicUrl;
        }
      } else {
        finalPhotoUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(selectedFile);
        });
      }

      const newPhotoRecord: GuestPhoto = {
        id: `photo-${Date.now()}`,
        author_name: authorName,
        photo_url: finalPhotoUrl,
        caption: caption,
        created_at: new Date().toISOString(),
      };

      if (isSupabaseConfigured && supabase) {
        await supabase.from('guest_photos').insert([newPhotoRecord]);
      } else {
        const existing = JSON.parse(localStorage.getItem('wedding_party_photos') || '[]');
        localStorage.setItem('wedding_party_photos', JSON.stringify([newPhotoRecord, ...existing]));
      }

      setPhotos((prev) => [newPhotoRecord, ...prev]);
      setIsModalOpen(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setAuthorName('');
      setCaption('');

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#8EA086', '#d4af37', '#f472b6']
      });
    } catch (err) {
      console.error('Erro ao enviar foto:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLike = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesCount((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1,
    }));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-rose-50/40 via-white to-pink-50/40 text-stone-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider hover:bg-stone-50 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#5A6351]" />
            <span>Voltar ao Site Principal</span>
          </button>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-amber-100 text-amber-900 border border-amber-200">
            <Camera className="w-3.5 h-3.5 text-amber-700" />
            <span>Mural dos Convidados no Dia da Festa</span>
          </div>

          <h1 className="font-script text-5xl sm:text-6xl text-rose-950">
            Fotos Tiradas por Você
          </h1>

          <p className="font-serif-royal italic text-stone-600 text-base sm:text-lg">
            Tirou uma foto linda na nossa festa? Anexe aqui para juntarmos todas as lembranças deste dia inesquecível em tempo real!
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#6B7863] via-[#7D8B75] to-[#5A6351] text-white font-semibold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Anexar Minha Foto da Festa</span>
            </button>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setActivePhoto(photo)}
              className="bg-white text-stone-900 rounded-2xl p-4 shadow-md border border-rose-100 cursor-pointer transform hover:-rotate-1 hover:scale-105 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 mb-3">
                <img
                  src={photo.photo_url}
                  alt={photo.author_name}
                  className="w-full h-full object-cover"
                />
                
                <button
                  onClick={(e) => handleLike(photo.id, e)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-stone-800 text-xs font-medium flex items-center gap-1.5 shadow-xs border border-stone-200"
                >
                  <Heart className={`w-3.5 h-3.5 ${likesCount[photo.id] ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
                  <span>{likesCount[photo.id] || 0}</span>
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-stone-800 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#5A6351]" />
                    {photo.author_name}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {new Date(photo.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                {photo.caption && (
                  <p className="font-serif-royal italic text-stone-600 text-sm line-clamp-2">
                    "{photo.caption}"
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upload Photo Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 text-stone-900 my-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 text-[#5A6351] flex items-center justify-center mb-2">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="font-script text-4xl text-rose-950">
                  Adicionar Foto ao Mural
                </h3>
                <p className="text-stone-500 text-xs mt-1">
                  Compartilhe os momentos mais divertidos da festa com todos!
                </p>
              </div>

              <form onSubmit={handleUploadPhoto} className="space-y-4">
                <div className="relative border-2 border-dashed border-stone-300 hover:border-[#5A6351] rounded-2xl p-6 text-center transition-colors bg-stone-50/50">
                  {previewUrl ? (
                    <div className="relative aspect-[16/9] max-h-48 rounded-xl overflow-hidden mx-auto">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-stone-900/80 text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block space-y-2">
                      <ImageIcon className="w-10 h-10 mx-auto text-[#5A6351]" />
                      <div className="text-sm font-medium text-stone-700">
                        Clique para escolher a foto ou tirar da câmera
                      </div>
                      <div className="text-xs text-stone-400">
                        Formatos suportados: JPG, PNG, WEBP
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Padrinho Rafael"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#5A6351] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Legenda ou Mensagem (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Dançando muito com os noivos!"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#5A6351] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6B7863] via-[#7D8B75] to-[#5A6351] text-white font-semibold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isUploading ? (
                    <span>Enviando foto...</span>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-amber-200" />
                      <span>Publicar Foto no Mural Mágico</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-stone-950/90 flex items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-stone-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full text-center space-y-4" onClick={(e) => e.stopPropagation()}>
              <img
                src={activePhoto.photo_url}
                alt={activePhoto.author_name}
                className="max-h-[75vh] mx-auto rounded-2xl shadow-2xl object-contain"
              />
              <div className="space-y-1">
                <p className="text-amber-200 font-semibold text-lg">Enviada por {activePhoto.author_name}</p>
                {activePhoto.caption && (
                  <p className="font-serif-royal italic text-stone-300 text-lg">"{activePhoto.caption}"</p>
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
