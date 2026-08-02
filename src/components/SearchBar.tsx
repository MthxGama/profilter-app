'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [termo, setTermo] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (termo.trim()) {
      router.push(`/catalogo?busca=${encodeURIComponent(termo.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-lg relative">
      <input
        type="text"
        placeholder="Buscar por nome ou código (SKU)..."
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        className="w-full bg-white border border-gray-300 text-gray-900 py-3 pl-4 pr-12 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent text-sm"
      />
      <button 
        type="submit" 
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 cursor-pointer transition-transform hover:scale-110 bg-transparent border-none"
        aria-label="Buscar"
      >
        {/* O seu novo ícone de Lupa personalizado */}
        <img src="/img/search.svg" alt="Buscar" className="w-5 h-5 object-contain opacity-70 hover:opacity-100" />
      </button>
    </form>
  );
}