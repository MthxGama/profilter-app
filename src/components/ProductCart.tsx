'use client';

import Link from 'next/link';
import { useCartStore } from '../store/CartStore';

interface ProdutoProps {
  produto: {
    procod: string;
    title: string;
    img_url: string | string[];
    price?: number;
  };
}

export default function ProductCart({ produto }: ProdutoProps) {
  // Puxamos do Zustand apenas a regra de esconder/mostrar preço, se você for usar isso
  const isPriceHidden = useCartStore((state) => state.isPriceHidden);

  const imageUrl = Array.isArray(produto.img_url) 
    ? produto.img_url[0] 
    : (produto.img_url || '/img/produto-placeholder.png');

  return (
    <Link 
      href={`/produto/${produto.procod}`} 
      className="bg-white border border-[#ccc] rounded-lg p-5 min-w-[240px] max-w-[240px] text-center snap-center hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between block"
    >
      <div className="w-full h-32 flex items-center justify-center mb-4">
        <img 
          src={imageUrl} 
          alt={produto.title} 
          className="max-h-full max-w-full object-contain mix-blend-multiply" 
        />
      </div>
      
      <h3 className="text-[1.1rem] font-bold mb-1 truncate text-gray-900" title={produto.title}>
        {produto.title}
      </h3>
      
      <p className="text-[0.9rem] text-[#666] mb-4 font-semibold">Cód: {produto.procod}</p>
      
      {/* Renderização condicional do Preço (Modo B2B) - Opcional */}
      {!isPriceHidden && produto.price && (
        <p className="text-lg font-black text-brand-dark mb-4">
          R$ {produto.price.toFixed(2).replace('.', ',')}
        </p>
      )}

      {/* Botão Visual (Falso botão, pois todo o card já é um Link) */}
      <div className="bg-brand-yellow text-dark border-none py-2.5 px-4 rounded font-bold w-full text-[0.85rem] transition-all hover:brightness-90 uppercase mt-auto">
        VER DETALHES
      </div>
    </Link>
  );
}