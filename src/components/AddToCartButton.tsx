'use client';

import { useState } from 'react';
import { useCartStore } from '../store/CartStore';

interface AddToCartButtonProps {
  produto: {
    procod: string;
    title: string;
    img_url: string | string[];
    price?: number;
  };
}

export default function AddToCartButton({ produto }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const imageUrl = Array.isArray(produto.img_url) 
    ? produto.img_url[0] 
    : (produto.img_url || '/img/produto-placeholder.png');

  const handleAdd = () => {
    addItem({
      procod: produto.procod,
      title: produto.title,
      img_url: imageUrl,
      price: produto.price,
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAdd}
      className={`w-full py-4 rounded-xl font-black uppercase text-base cursor-pointer tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-3 text-center
        ${added 
          ? 'bg-green-500 text-white hover:bg-green-600' 
          : 'bg-brand-yellow text-brand-dark hover:brightness-95 hover:-translate-y-1'
        }`}
    >
      {added ? '✔ PRODUTO ADICIONADO' : 'ADICIONAR AO ORÇAMENTO'}
    </button>
  );
}