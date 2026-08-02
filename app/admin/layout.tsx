'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<'loading' | 'authenticated'>('loading');

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        // Usa o redirecionamento raiz do navegador para não travar no Next.js
        window.location.href = '/login';
      } else {
        // Se tem sessão, libera o painel
        setStatus('authenticated');
      }
    };

    checkSession();
  }, []);

  // Tela de carregamento enquanto verifica
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-brand-yellow border-solid"></div>
      </div>
    );
  }

  // Se passou, renderiza a página
  return <>{children}</>;
}