'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Busca os produtos assim que a página carrega
  const fetchProdutos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false }); // Mostra os mais novos primeiro

    if (!error && data) {
      setProdutos(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função para deletar um produto
  const handleDelete = async (id: string, nome: string) => {
    const confirmar = window.confirm(`Tem certeza que deseja APAGAR o produto: ${nome}?`);
    if (!confirmar) return;

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      alert('Erro ao apagar o produto. Tente novamente.');
    } else {
      alert('Produto apagado com sucesso!');
      fetchProdutos(); // Recarrega a lista
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* CABEÇALHO DO PAINEL */}
      <header className="bg-[#2D2D2D] text-brand-yellow py-4 px-5 sticky top-0 z-10 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black uppercase tracking-wider">Painel Profilter</h1>
            <p className="text-xs text-gray-400">Gestão de Estoque</p>
          </div>
          <Link href="/" className="text-sm font-bold text-white hover:text-brand-yellow underline">
            Ver Loja
          </Link>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-4xl mx-auto px-4 mt-8">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Seus Produtos ({produtos.length})</h2>
          
          <Link 
            href="/admin/novo" 
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
          >
            <span className="text-lg leading-none">+</span> NOVO
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500 font-bold animate-pulse">
            Carregando catálogo...
          </div>
        ) : (
          <div className="space-y-4">
            {produtos.map((produto) => {
              // Garante que a imagem renderize mesmo se for um array
              const imageUrl = Array.isArray(produto.img_url) 
                ? produto.img_url[0] 
                : (produto.img_url || '/img/produto-placeholder.png');

              return (
                <div key={produto.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4 items-center">
                  
                  {/* FOTO DO PRODUTO (Miniatura) */}
                  <div className="w-20 h-20 bg-gray-50 rounded-lg p-2 flex-shrink-0 border border-gray-100 flex items-center justify-center">
                    <img src={imageUrl} alt={produto.title} className="max-w-full max-h-full mix-blend-multiply" />
                  </div>

                  {/* INFORMAÇÕES */}
                  <div className="flex-1 text-center sm:text-left w-full">
                    <h3 className="font-bold text-gray-900 leading-tight mb-1">{produto.title}</h3>
                    <div className="flex flex-wrap gap-3 justify-center sm:justify-start text-sm text-gray-500 font-medium">
                      <span className="bg-gray-100 px-2 py-0.5 rounded">Cód: {produto.procod}</span>
                      {produto.price ? (
                        <span className="text-green-600 font-black">R$ {produto.price.toFixed(2).replace('.', ',')}</span>
                      ) : (
                        <span className="text-orange-500 font-bold">Sob Consulta</span>
                      )}
                    </div>
                  </div>

                  {/* BOTÕES DE AÇÃO */}
                  <div className="flex gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t border-gray-100 sm:border-t-0 mt-2 sm:mt-0">
                    <button 
                      onClick={() => router.push(`/admin/editar/${produto.procod}`)}
                      className="flex-1 sm:flex-none bg-brand-yellow text-brand-dark px-4 py-2 rounded-lg font-bold text-sm hover:brightness-95 transition-all text-center"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(produto.id, produto.title)}
                      className="flex-1 sm:flex-none bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-200 transition-all text-center"
                    >
                      Excluir
                    </button>
                  </div>

                </div>
              );
            })}
            
            {produtos.length === 0 && (
              <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                Nenhum produto cadastrado ainda.
              </div>
            )}
          </div>
        )}
      </main>

    </div>
  );
}