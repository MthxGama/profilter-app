import { supabase } from '../../src/lib/supabase';
import Link from 'next/link';
import ProductCart from '../../src/components/ProductCart'; // Importando o nosso novo componente!
import CartIcon from '@/src/components/CartIcon';
import SearchBar from '@/src/components/SearchBar';

interface Product {
  id: number;
  procod: string;
  title: string;
  price: number | null;
  img_url: string | string[];
}

// Força a página a buscar dados atualizados sempre (ignora o cache)
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Busca todos os produtos do Supabase
  const { data: produtos } = await supabase.from('products').select('*');
  
  // Proteção: Garante que seja um array vazio caso o banco demore a responder
  const produtosLista = produtos || [];

  /// FILTRO: AR (Sem kits e limitado a 5)
const produtosAr = produtosLista.filter((produto: Product) => {
  const tituloLower = produto.title.toLowerCase();
  if (tituloLower.includes('kit')) return false;
  return tituloLower.includes(' de ar');
}).slice(0, 5);

// FILTRO: COMBUSTÍVEL (Sem kits e limitado a 5)
const produtosCombustivel = produtosLista.filter((produto: Product) => {
  const tituloLower = produto.title.toLowerCase();
  if (tituloLower.includes('kit')) return false;
  return tituloLower.includes('combustível') || tituloLower.includes('combustivel');
}).slice(0, 5);

// FILTRO: ÓLEO (Sem kits e limitado a 5)
const produtosOleo = produtosLista.filter((produto: Product) => {
  const tituloLower = produto.title.toLowerCase();
  if (tituloLower.includes('kit')) return false;
  return tituloLower.includes('óleo') || tituloLower.includes('oleo');
}).slice(0, 5);
  return (
    <div className="bg-brand-bg text-brand-dark font-sans antialiased min-h-screen">
      
      {/* BANNER PRINCIPAL */}
      <section className="w-full block bg-brand-yellow">
        <img src="/img/banner_hero.png" alt="A Segurança que seus clientes exigem" className="w-full h-auto block m-0" />
      </section>

      {/* NAVEGAÇÃO DE CATEGORIAS */}
      <nav className="bg-transparent py-8 w-full" aria-label="Navegação de Categorias">
        <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <Link href="/catalogo?filtro=óleo" className="bg-brand-yellow text-black font-black uppercase py-5 px-4 rounded-xl text-center shadow-md transition-all hover:scale-105 flex items-center justify-center">
              Filtro <br></br>de Óleo
            </Link>

            <Link href="/catalogo?filtro=combustível" className="bg-brand-yellow text-black font-black uppercase py-5 px-4 rounded-xl text-center shadow-md transition-all hover:scale-105 flex items-center justify-center">
              Filtro de<br></br> Combustível
            </Link>

            <Link href="/catalogo?filtro=ar" className="bg-brand-yellow text-black font-black uppercase py-5 px-4 rounded-xl text-center shadow-md transition-all hover:scale-105 flex items-center justify-center">
              Filtro<br></br> de Ar
            </Link>

            <Link href="/catalogo?filtro=cabine" className="bg-brand-yellow text-black font-black uppercase py-5 px-4 rounded-xl text-center shadow-md transition-all hover:scale-105 flex items-center justify-center">
              Filtro<br></br> de Cabine
            </Link>

            <Link href="/catalogo?filtro=kit" className="bg-brand-yellow text-black font-black uppercase py-5 px-4 rounded-xl text-center shadow-md transition-all hover:scale-105 flex items-center justify-center">
              Kit Troca<br></br> Completa
            </Link>

          </div>
        </div>
      </nav>

      <main>
        {/* SEÇÃO: FILTROS DE AR */}
        <section className="py-10 text-center">
          <h2 className="text-[1.8rem] font-extrabold mb-7 uppercase text-brand-dark">FILTRO DE AR</h2>
          <div className="flex items-center justify-center gap-5 w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] relative">
            <div className="flex gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory w-full justify-start lg:justify-center mx-auto">
              
              {/* O loop gigante virou apenas 1 linha conectada ao nosso carrinho! */}
              {produtosAr.map((produto) => (
                <ProductCart key={produto.procod} produto={produto} />
              ))}

            </div>
          </div>
        </section>

        {/* SEÇÃO: SOBRE */}
        <section className="py-20">
          <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] flex flex-col lg:flex-row gap-10 lg:gap-[60px] items-center">
            <div className="w-full lg:flex-[0_0_45%]">
              <div className="bg-brand-dark h-[320px] w-full rounded-t-2xl rounded-bl-2xl [clip-path:polygon(0_0,100%_0,100%_calc(100%-40px),calc(100%-40px)_100%,0_100%)]"></div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-[1.8rem] lg:text-[2.2rem] font-black mb-6 text-black uppercase leading-[1.1]">SOBRE A PROFILTER</h2>
              <p className="text-[1.1rem] leading-[1.7] text-[#444] font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
        </section>

        {/* SEÇÃO: BENEFÍCIOS */}
        <section className="pt-5 pb-15">
          <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <article className="bg-brand-yellow py-[30px] px-5 rounded-xl text-center flex flex-col justify-center items-center h-full">
              <h3 className="text-black text-[1.3rem] font-extrabold mb-3 leading-[1.2]">Envio Imediato e Frete Grátis</h3>
              <p className="text-brand-dark text-[0.85rem] font-medium leading-[1.4]">Chega de prateleira vazia. Entregamos seu pedido em até<br className="hidden lg:block" />24 horas sem custo adicional de frete.</p>
            </article>
            <article className="bg-brand-yellow py-[30px] px-5 rounded-xl text-center flex flex-col justify-center items-center h-full">
              <h3 className="text-black text-[1.3rem] font-extrabold mb-3 leading-[1.2]">Faturamento Estendido</h3>
              <p className="text-brand-dark text-[0.85rem] font-medium leading-[1.4]">Condições de pagamento pensadas para o fluxo de<br className="hidden lg:block" />caixa da sua loja.</p>
            </article>
            <article className="bg-brand-yellow py-[30px] px-5 rounded-xl text-center flex flex-col justify-center items-center h-full">
              <h3 className="text-black text-[1.3rem] font-extrabold mb-3 leading-[1.2]">Foco em Alto Giro</h3>
              <p className="text-brand-dark text-[0.85rem] font-medium leading-[1.4]">Uma seleção estratégica de produtos, focando<br className="hidden lg:block" />exclusivamente nos filtros de linha leve com<br className="hidden lg:block" />maior giro no seu estoque</p>
            </article>
          </div>
        </section>

        {/* SEÇÃO: FILTROS DE COMBUSTÍVEL */}
        <section className="py-10 text-center">
          <h2 className="text-[1.8rem] font-extrabold mb-7 uppercase text-brand-dark">FILTROS DE COMBUSTÍVEL</h2>
          <div className="flex items-center justify-center gap-5 w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] relative">
            <div className="flex gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory w-full justify-start lg:justify-center mx-auto">
              
              {/* O loop gigante virou apenas 1 linha conectada ao nosso carrinho! */}
              {produtosCombustivel.map((produto) => (
                <ProductCart key={produto.procod} produto={produto} />
              ))}

            </div>
          </div>
        </section>

        {/* SEÇÃO: BANNERS PROMOCIONAIS */}
        <section className="py-10">
          <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            <Link href="#" className="block transition-all duration-200 hover:-translate-y-1 hover:brightness-95">
              <img src="/img/banner-mid.png" alt="Promoção focada em alto giro" loading="lazy" className="w-full h-auto block" />
            </Link>
            <Link href="#" className="block transition-all duration-200 hover:-translate-y-1 hover:brightness-95">
              <img src="/img/banner-mid.png" alt="Condições de faturamento" loading="lazy" className="w-full h-auto block" />
            </Link>
          </div>
        </section>

        {/* SEÇÃO: FILTROS DE ÓLEO */}
        <section className="py-10 text-center">
          <h2 className="text-[1.8rem] font-extrabold mb-7 uppercase text-brand-dark">FILTROS DE ÓLEO</h2>
          <div className="flex items-center justify-center gap-5 w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] relative">
            <div className="flex gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory w-full justify-start lg:justify-center mx-auto">
              
              {/* O loop gigante virou apenas 1 linha conectada ao nosso carrinho! */}
              {produtosOleo.map((produto) => (
                <ProductCart key={produto.procod} produto={produto} />
              ))}

            </div>
          </div>
        </section>
      </main>

      {/* BOTÃO WHATSAPP FLUTUANTE */}
      <a href="https://wa.me/5541992681533" className="fixed bottom-5 right-5 lg:bottom-[30px] lg:right-[30px] w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] bg-brand-wpp rounded-full flex items-center justify-center shadow-[2px_4px_15px_rgba(0,0,0,0.2)] z-[50] transition-all duration-300 hover:scale-110 hover:shadow-[2px_6px_20px_rgba(0,0,0,0.3)] animate-[pulse-whatsapp_2s_infinite] hover:animate-none" target="_blank" rel="noopener noreferrer" aria-label="Atendimento via WhatsApp">
        <img src="/img/icon-whatsapp.png" alt="WhatsApp" loading="lazy" className="w-[28px] h-[28px] lg:w-[35px] lg:h-[35px] object-contain block" />
      </a>

    </div>
  );
}