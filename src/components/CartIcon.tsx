'use client';

import { useCartStore } from '@/src/store/CartStore';

export default function CartIcon() {
  const openCart = useCartStore((state) => state.openCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  
  const totalItems = getTotalItems();

  return (
    <button 
      onClick={openCart} 
      className="relative p-2 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer bg-transparent rounded-full w-12 h-12 border-none"
      title="Ver Orçamento"
    >
      {/* O seu novo ícone SVG personalizado */}
      <img src="/img/cart.svg" alt="Sacola de Orçamento" className="w-7 h-7 object-contain" />
      
      {/* Bolinha vermelha com o contador, só aparece se tiver itens */}
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 bg-red-600 text-white text-[0.7rem] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-md">
          {totalItems}
        </span>
      )}
    </button>
  );
}