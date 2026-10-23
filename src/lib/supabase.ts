import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://sua-url-aqui.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database Types Definitions
export interface RSVP {
  id?: string;
  name: string;
  email: string;
  phone: string;
  attending: boolean;
  guests_count: number;
  dietary_restrictions?: string;
  song_request?: string;
  created_at?: string;
}

export interface GiftPurchase {
  id?: string;
  gift_id: string;
  gift_title: string;
  amount: number;
  buyer_name: string;
  buyer_message?: string;
  pix_code?: string;
  status?: 'pending' | 'completed';
  created_at?: string;
}

export interface GuestPhoto {
  id: string;
  author_name: string;
  photo_url: string;
  caption?: string;
  created_at: string;
}
