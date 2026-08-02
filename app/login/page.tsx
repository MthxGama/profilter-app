'use client';

import { useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Tenta fazer o login no Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg('E-mail ou senha incorretos.');
    } else if (data.session) {
      // Deu certo! Redireciona para o painel
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        
        <div className="text-center mb-8">
          <Link href="/">
            <img src="/img/logo.png" alt="Profilter" className="h-12 mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-black uppercase text-brand-dark">Acesso Restrito</h1>
          <p className="text-gray-500 text-sm">Painel de Gestão Profilter</p>
        </div>

        {errorMsg && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm font-bold mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">E-mail</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Senha</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#2D2D2D] text-brand-yellow font-black text-lg py-4 rounded-xl uppercase tracking-wider hover:brightness-110 transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? 'Entrando...' : 'Entrar no Sistema'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-black font-bold">
            ← Voltar para a loja
          </Link>
        </div>

      </div>
    </div>
  );
}