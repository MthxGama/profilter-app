import { supabase } from '../../src/lib/supabase';
import ProductCart from '../../src/components/ProductCart';
import CartIcon from '../../src/components/CartIcon';
import SearchBar from '../../src/components/SearchBar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{
    busca?: string;
    filtro?: string;
  }>;
}

export default async function Catalogo({ searchParams }: Props) {
  // Resolve os parâmetros da URL (Next.js 15+)
  const resolvedParams = await searchParams;
  const termoBusca = resolvedParams.busca || '';
  const categoriaFiltro = resolvedParams.filtro || '';

  // Inicia a query básica no Supabase
  let query = supabase.from('products').select('*');

  // REGRA 1: Se tiver um termo de busca digitado na barra superior
  if (termoBusca) {
    // Busca inteligente: Procura se a palavra está no Título OU no Código do Produto
    query = query.or(`title.ilike.%${termoBusca}%,procod.ilike.%${termoBusca}%`);
  } 
  
  // REGRA 2: Se o cliente clicou em uma categoria na Home (ex: "Filtro de Óleo")
  else if (categoriaFiltro) {
    if (categoriaFiltro.toLowerCase() === 'kit') {
      // Se for Kit, busca só o que tem "kit" no nome
      query = query.ilike('title', '%kit%');
    } else {
      // Se for outra coisa (óleo, ar), busca o termo e EXCLUI os kits da lista
      query = query.ilike('title', `%${categoriaFiltro}%`).not('title', 'ilike', '%kit%');
    }
  }

  // Executa a busca no banco
  const { data: produtos } = await query;
  const produtosLista = produtos || [];

  return (
    <div className="bg-brand-bg text-brand-dark font-sans antialiased min-h-screen flex flex-col">
      
      {/* CABEÇALHO */}
      <header className="bg-brand-yellow py-5 w-full shrink-0 shadow-sm">
        <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] flex flex-col md:flex-row justify-between items-center gap-4">
          
          <Link href="/" title="Página Inicial - Profilter">
            <img src="/img/logo.png" alt="Logotipo Profilter" className="h-10 w-auto block" />
          </Link>
          
          {/* A Barra de Pesquisa */}
          <div className="w-full md:flex-1 md:max-w-xl md:mx-6">
            <SearchBar />
          </div>

          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
            <CartIcon />
            <Link href="/" className="bg-[#2D2D2D] text-brand-yellow border-none py-3 px-10 font-extrabold text-base cursor-pointer uppercase transition-all duration-200 hover:scale-105 hover:brightness-110 rounded-t-lg rounded-bl-lg [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)]">
              VOLTAR
            </Link>
          </div>

        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-grow py-10">
        <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%]">
          
          <div className="mb-10 flex flex-col items-center">
            <h1 className="text-3xl lg:text-4xl font-black uppercase text-brand-dark mb-2">
              {termoBusca 
                ? `Resultados para "${termoBusca}"` 
                : (categoriaFiltro ? `Filtros: ${categoriaFiltro.toUpperCase()}` : 'Catálogo Completo')}
            </h1>
            <p className="text-gray-500 font-medium">
              {produtosLista.length} produto(s) encontrado(s)
            </p>
          </div>

          {produtosLista.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {produtosLista.map((produto) => (
                <ProductCart key={produto.procod} produto={produto} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-10 text-center border border-[#ccc] shadow-sm max-w-2xl mx-auto mt-10">
              <span className="text-4xl block mb-4">😕</span>
              <h2 className="text-xl font-bold mb-2">Nenhum produto encontrado</h2>
              <p className="text-gray-500 mb-6">Não conseguimos encontrar peças para a sua busca.</p>
              <Link href="/catalogo" className="bg-brand-yellow text-brand-dark px-6 py-3 rounded-lg font-bold uppercase transition-all hover:brightness-95">
                Ver todo o catálogo
              </Link>
            </div>
          )}

        </div>
      </main>

      {/* RODAPÉ SIMPLIFICADO */}
      <footer className="bg-brand-dark text-white py-10 w-full mt-auto border-t-[15px] border-brand-yellow">
        <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] text-center">
          <p className="text-[#999] text-sm">© 2026 Profilter. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  );
}