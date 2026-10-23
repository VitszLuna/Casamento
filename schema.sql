-- ==========================================================
-- ESTRUTURA DO BANCO DE DADOS SUPABASE PARA O CASAMENTO MÁGICO ✨
-- Cole este código no "SQL Editor" do seu painel do Supabase.
-- ==========================================================

-- 1. Tabela de Confirmação de Presença (RSVP)
CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID DEFAULT gen_random_policy_id() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  attending BOOLEAN DEFAULT true,
  guests_count INTEGER DEFAULT 1,
  dietary_restrictions TEXT,
  song_request TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela de Presentes da Lista
CREATE TABLE IF NOT EXISTS public.gifts (
  id UUID DEFAULT gen_random_policy_id() PRIMARY KEY,
  gift_id TEXT NOT NULL,
  gift_title TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_message TEXT,
  pix_code TEXT,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela do Mural de Fotos dos Convidados (Dia da Festa)
CREATE TABLE IF NOT EXISTS public.guest_photos (
  id UUID DEFAULT gen_random_policy_id() PRIMARY KEY,
  author_name TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS) com políticas de inserção e leitura públicas
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura de RSVPs" ON public.rsvps FOR SELECT USING (true);
CREATE POLICY "Permitir inserção de RSVPs" ON public.rsvps FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir leitura de Presentes" ON public.gifts FOR SELECT USING (true);
CREATE POLICY "Permitir inserção de Presentes" ON public.gifts FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir leitura de Fotos" ON public.guest_photos FOR SELECT USING (true);
CREATE POLICY "Permitir inserção de Fotos" ON public.guest_photos FOR INSERT WITH CHECK (true);

-- Criar Bucket no Supabase Storage para Fotos da Festa
-- (Caso não crie automaticamente via SQL, crie um Bucket público chamado 'party_photos' na aba Storage do Supabase)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('party_photos', 'party_photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Fotos públicas para visualizar" ON storage.objects 
  FOR SELECT USING (bucket_id = 'party_photos');

CREATE POLICY "Permitir envio de fotos para todos" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'party_photos');
