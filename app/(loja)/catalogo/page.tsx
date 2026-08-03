'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import Link from 'next/link';

// Tipagem base do produto
interface Product {
  id: number;
  procod: string;
  title: string;
  price: number | null;
  img_url: string | string[];
}

export default function CatalogoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estado do Filtro Ativo
  const [activeCategory, setActiveCategory] = useState<string>('');

  // 1. Busca inicial dos produtos
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('title', { ascending: true });

      if (error) {
        console.error('Erro ao buscar produtos:', error);
      } else if (data) {
        setProducts(data);
        setFilteredProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // 2. Lógica de Filtragem Automática
  useEffect(() => {
    let result = products;

    if (activeCategory) {
      // Filtra checando se o título do produto contém a categoria (ex: "Ar", "Óleo")
      // Caso você tenha uma coluna específica de categoria no Supabase, troque p.title por p.categoria
      result = result.filter(p => 
        p.title.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [activeCategory, products]);

  // Função auxiliar para pegar a primeira imagem
  const getImageUrl = (imgData: any) => {
    if (!imgData) return '/placeholder.png'; // Coloque uma imagem padrão no seu projeto
    return Array.isArray(imgData) ? imgData[0] : imgData;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-8 gap-8">
      
      {/* BARRA LATERAL DE FILTROS (SIDEBAR) */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 sticky top-24">
          <h2 className="text-lg font-black text-brand-dark uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
            Filtros
          </h2>
          
          <div className="space-y-2">
            <button 
              onClick={() => setActiveCategory('')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors ${activeCategory === '' ? 'bg-brand-yellow text-brand-dark' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Todos os Produtos
            </button>
            <button 
              onClick={() => setActiveCategory('Ar')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors ${activeCategory === 'Ar' ? 'bg-brand-yellow text-brand-dark' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Filtros de Ar
            </button>
            <button 
              onClick={() => setActiveCategory('Óleo')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors ${activeCategory === 'Óleo' ? 'bg-brand-yellow text-brand-dark' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Filtros de Óleo
            </button>
            <button 
              onClick={() => setActiveCategory('Combustível')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors ${activeCategory === 'Combustível' ? 'bg-brand-yellow text-brand-dark' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Filtros de Combustível
            </button>
            <button 
              onClick={() => setActiveCategory('Cabine')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors ${activeCategory === 'Cabine' ? 'bg-brand-yellow text-brand-dark' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Filtros de Cabine
            </button>
          </div>
        </div>
      </aside>

      {/* GRADE DE PRODUTOS */}
      <main className="flex-1">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-black text-brand-dark uppercase tracking-wider">
            Nosso Catálogo
          </h1>
          <span className="text-sm font-bold text-gray-400">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-brand-yellow border-solid"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((produto) => (
              <Link href={`/produto/${produto.procod}`} key={produto.id} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col">
                  
                  {/* Imagem */}
                  <div className="aspect-square bg-white p-4 relative flex items-center justify-center border-b border-gray-50">
                    <img 
                      src={getImageUrl(produto.img_url)} 
                      alt={produto.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Infos do Produto */}
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      {produto.procod}
                    </span>
                    <h2 className="text-sm font-bold text-gray-800 line-clamp-2 mb-2 flex-1 group-hover:text-brand-yellow transition-colors">
                      {produto.title}
                    </h2>
                    
                    <div className="mt-auto pt-3 border-t border-gray-100">
                      {produto.price ? (
                        <p className="text-lg font-black text-brand-dark">
                          R$ {produto.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      ) : (
                        <p className="text-xs font-bold text-brand-yellow bg-brand-yellow/10 inline-block px-2 py-1 rounded">
                          PREÇO SOB CONSULTA
                        </p>
                      )}
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-10 text-center border border-gray-200">
            <h3 className="text-lg font-bold text-gray-700 mb-2">Nenhum produto encontrado</h3>
            <p className="text-sm text-gray-500">Tente limpar os filtros ou selecionar outra categoria.</p>
            <button 
              onClick={() => setActiveCategory('')}
              className="mt-4 bg-brand-yellow text-brand-dark px-6 py-2 rounded-lg font-bold text-sm uppercase hover:brightness-95 transition-all"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </main>

    </div>
  );
}