import { createClient } from '@supabase/supabase-js';

// Aqui o Next.js vai ler aquelas chaves que você colocou no .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Criamos o "cliente" que será usado no resto do projeto para conversar com o banco
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Este é o "contrato" para o TypeScript saber exatamente o formato do seu produto
export interface Product {
  id?: string; 
  created_at?: string; 
  title: string;
  description: string;
  procod: string;
  applications: string;
  codvar: string;
  img_url: string; 
}