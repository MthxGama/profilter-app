import { supabase } from '../../../../src/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '../../../../src/components/AddToCartButton';
import CartIcon from '@/src/components/CartIcon';
import SearchBar from '@/src/components/SearchBar';
import { Metadata } from 'next'; // <-- Importação necessária para o Metadata
import ProductOptions from '../../../../src/components/ProductOptions';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{
    id: string; // no seu caso, esse 'id' recebe o procod da URL
  }>;
}

// ============================================================================
// NOVA FUNÇÃO: GERAÇÃO DE METADADOS DINÂMICOS (OPEN GRAPH / WHATSAPP)
// ============================================================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const produtoId = resolvedParams.id;

  // Busca o produto no Supabase
  const { data: produto } = await supabase
    .from('products')
    .select('*')
    .eq('procod', produtoId)
    .single();

  if (!produto) {
    return {
      title: 'Produto não encontrado | Profilter',
    };
  }

  // Formata a imagem para o cartão do WhatsApp
  const imagemSrc = Array.isArray(produto.img_url) 
    ? produto.img_url[0] 
    : (produto.img_url || '/img/produto-placeholder.png');

  // Cria um título forte
  const pageTitle = `Filtro ${produto.title} (${produto.procod}) - Profilter`;
  
  // Cria uma descrição para aparecer debaixo do título no WhatsApp
  const pageDescription = produto.description || `Filtro automotivo com padrão original. Equivalente: Wega ${produto.wega || 'N/A'}, Tecfil ${produto.tecfil || 'N/A'}.`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://www.profilter.com.br/catalogo/produto/${produtoId}`, // Idealmente, coloque seu domínio real aqui
      siteName: 'Profilter Catálogo',
      images: [
        {
          url: imagemSrc,
          width: 800,
          height: 800,
          alt: produto.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [imagemSrc],
    },
  };
}
// ============================================================================


export default async function ProdutoDetalhe({ params }: Props) {
  const resolvedParams = await params;
  const produtoId = resolvedParams.id;

  // Busca o produto específico no Supabase pelo procod
  const { data: produto, error } = await supabase
    .from('products')
    .select('*')
    .eq('procod', produtoId)
    .single();

  if (error || !produto) {
    notFound();
  }

  // Formata a imagem (pode vir como array ou string)
  const imagemSrc = Array.isArray(produto.img_url) 
    ? produto.img_url[0] 
    : (produto.img_url || '/img/produto-placeholder.png');

  return (
    <div className="bg-brand-bg text-brand-dark font-sans antialiased min-h-screen flex flex-col">
      
      {/* CONTEÚDO PRINCIPAL DO PRODUTO */}
      <main className="flex-grow py-12 lg:py-16">
        <div className="w-full max-w-[1300px] mx-auto px-4 lg:px-[5%]">
          
          {/* Breadcrumb de navegação */}
          <nav className="mb-8 text-sm font-bold text-gray-600 flex items-center gap-2">
            <Link href="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <Link href="/catalogo" className="hover:text-black">Catálogo</Link>
            <span>/</span>
            <span className="text-black truncate max-w-[250px]">{produto.title}</span>
          </nav>

          <div className="bg-white rounded-2xl shadow-md border border-[#ccc] overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12 items-start">
            
            {/* COLUNA DA FOTO */}
            <div className="w-full h-[350px] md:h-[450px] bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center p-6 relative sticky top-6">
              <img 
                src={imagemSrc} 
                alt={produto.title} 
                className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-md" 
              />
              <span className="absolute top-4 left-4 bg-brand-dark text-brand-yellow text-xs font-black uppercase py-1 px-3 rounded-md">
                Linha Leve
              </span>
            </div>

            {/* COLUNA DE INFORMAÇÕES COMPLETAS */}
            <div className="flex flex-col space-y-6">
              
              <div>
                {/* 1. TÍTULO DO PRODUTO EM PRIMEIRO LUGAR */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-black leading-tight mb-4">
                  {produto.title}
                </h1>

                {/* 2. TAGS DE CÓDIGOS EQUIVALENTES (Wega, Tecfil, etc) */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-50 border border-yellow-100">
                    <span className="text-xs font-bold text-amber-700 tracking-wider">PROFILTER: {produto.procod}</span>
                  </div>
                  
                  {produto.wega && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 border border-red-100">
                      <span className="text-xs font-bold text-red-700 tracking-wider">WEGA: {produto.wega}</span>
                    </div>
                  )}

                  {produto.tecfil && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                      <span className="text-xs font-bold text-blue-700 tracking-wider">TECFIL: {produto.tecfil}</span>
                    </div>
                  )}

                  {produto.codvar && (
                    <div className="inline-flex items-center px-3 py-2 rounded-full bg-gray-100 border border-gray-200">
                      <span className="text-xs font-bold text-gray-600 tracking-wider">CÓDIGOS VARIÁVEIS: {produto.codvar}</span>
                    </div>
                  )}
                </div>
                
                {/* Descrição detalhada */}
                <div className="text-gray-700 font-medium text-base leading-relaxed space-y-3">
                  <p>{produto.description || "Filtro automotivo de alta performance desenvolvido sob rigorosos padrões de qualidade para garantir a máxima proteção e durabilidade ao sistema do veículo."}</p>
                </div>
              </div>

              {/* BLOCO DE APLICAÇÕES DO VEÍCULO/MÁQUINA */}
                {produto.applications && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Aplicações
                    </h3>
                    
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {produto.applications}
                      </p>
                    </div>
                  </div>
)}

              {/* Bloco de Estoque e Categoria */}
              <div className="border-t border-b border-gray-200 py-4 space-y-2 bg-gray-50 px-4 rounded-xl">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-500 uppercase">Disponibilidade:</span>
                  <span className="font-extrabold text-green-600 uppercase">Em estoque (Rede de Distribuidores)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-500 uppercase">Categoria:</span>
                  <span className="font-extrabold text-black uppercase">Filtro Automotivo de Alto Giro</span>
                </div>
              </div>

              {/* Especificações Técnicas */}
              {produto.specs && (
                <div className="space-y-2">
                  <h3 className="text-sm font-black text-black uppercase tracking-wider">Especificações Técnicas:</h3>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm text-gray-700 font-medium">
                    {typeof produto.specs === 'object' ? (
                      <ul className="space-y-1">
                        {Object.entries(produto.specs).map(([key, value]) => (
                          <li key={key} className="flex justify-between">
                            <span className="font-bold uppercase text-gray-500">{key}:</span>
                            <span className="text-black">{String(value)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{produto.specs}</p>
                    )}
                  </div>
                </div>
              )}

              {/* BOTÕES DE AÇÃO ATUALIZADOS */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                
                {/* NOVO SELETOR DE VARIAÇÕES (Ele embute o AddToCartButton dentro dele) */}
                <ProductOptions produto={produto} />
                
                <Link 
                  href="/catalogo"
                  className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-extrabold uppercase text-sm cursor-pointer transition-all duration-200 hover:bg-gray-200 flex items-center justify-center text-center mt-3"
                >
                  Continuar Vendo o Catálogo
                </Link>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* BOTÃO WHATSAPP FLUTUANTE */}
      <a href="https://wa.me/5541992681533" className="fixed bottom-5 right-5 lg:bottom-[30px] lg:right-[30px] w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] bg-brand-wpp rounded-full flex items-center justify-center shadow-[2px_4px_15px_rgba(0,0,0,0.2)] z-[50] transition-all duration-300 hover:scale-110 hover:shadow-[2px_6px_20px_rgba(0,0,0,0.3)] animate-[pulse-whatsapp_2s_infinite] hover:animate-none" target="_blank" rel="noopener noreferrer" aria-label="Atendimento via WhatsApp">
        <img src="/img/icon-whatsapp.png" alt="WhatsApp" loading="lazy" className="w-[28px] h-[28px] lg:w-[35px] lg:h-[35px] object-contain block" />
      </a>

    </div>
  );
}