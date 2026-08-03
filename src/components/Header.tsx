'use client';

import Link from 'next/link';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';
import CartDrawer from './CartDrawer';

export default function Header() {
  return (
    <>
      {/* CABEÇALHO */}
      <header className="bg-brand-yellow py-5 w-full sticky top-0 z-50 shadow-sm">
        <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] flex flex-col md:flex-row justify-between items-center gap-4">
          
          <Link href="/" title="Página Inicial - Profilter">
            <img src="/img/logo.png" alt="Logotipo Profilter" className="h-10 w-auto block" />
          </Link>
          
          {/* Nova barra de pesquisa no meio */}
          <div className="w-full md:flex-1 md:max-w-xl md:mx-6">
            <SearchBar />
          </div>

          {/* Ícone da Sacola e Botão Fale Conosco Original */}
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
            
            <CartIcon />

            <button className="bg-[#2D2D2D] text-brand-yellow border-none py-3 px-10 font-extrabold text-base cursor-pointer uppercase transition-all duration-200 hover:scale-105 hover:brightness-110 rounded-t-lg rounded-bl-lg [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)]">
              FALE CONOSCO
            </button>
            
          </div>

        </div>
      </header>

      {/* Drawer do Carrinho (Gaveta lateral que abre ao clicar na sacola) */}
      <CartDrawer />
    </>
  );
}