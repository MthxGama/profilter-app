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

  // 1. Função para deletar um produto (AGORA USANDO PROCOD)
  const handleDelete = async (procod: string, nome: string) => {
    const confirmar = window.confirm(`Tem certeza que deseja APAGAR o produto: ${nome}?`);
    if (!confirmar) return;

    const { error } = await supabase.from('products').delete().eq('procod', procod);

    if (error) {
      alert('Erro ao apagar o produto. Tente novamente.');
    } else {
      alert('Produto apagado com sucesso!');
      fetchProdutos(); // Recarrega a lista
    }
  };

  // 2. NOVA FUNÇÃO: Alternar visibilidade do produto (AGORA USANDO PROCOD)
  const alternarVisibilidade = async (procod: string, statusAtual: boolean) => {
    const novoStatus = !statusAtual;

    const { error } = await supabase
      .from('products')
      .update({ is_active: novoStatus })
      .eq('procod', procod);

    if (error) {
      console.error("Erro ao atualizar visibilidade:", error);
      alert("Erro ao atualizar o status do produto. Verifique se a coluna 'is_active' existe no Supabase.");
    } else {
      // Atualiza a lista na tela usando o procod
      setProdutos(produtos.map(p => 
        p.procod === procod ? { ...p, is_active: novoStatus } : p
      ));
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
          <Link href="/catalogo" className="text-sm font-bold text-white hover:text-brand-yellow underline">
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
                : (produto.img_url || '/placeholder.png');

              // Verifica se a propriedade existe (pra evitar erros se a coluna ainda não foi criada)
              const isAtivo = produto.is_active !== false; // Se for undefined ou true, considera ativo

              return (
                <div key={produto.id} className={`bg-white p-4 rounded-xl shadow-sm border ${isAtivo ? 'border-gray-200' : 'border-red-300 bg-red-50 opacity-80'} flex flex-col sm:flex-row gap-4 items-center transition-all`}>
                  
                  {/* FOTO DO PRODUTO (Miniatura) */}
                  <div className="w-20 h-20 bg-gray-50 rounded-lg p-2 flex-shrink-0 border border-gray-100 flex items-center justify-center relative">
                    <img src={imageUrl} alt={produto.title} className="max-w-full max-h-full mix-blend-multiply" />
                    {/* Badge visual se estiver inativo */}
                    {!isAtivo && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                        INATIVO
                      </span>
                    )}
                  </div>

                  {/* INFORMAÇÕES */}
                  <div className="flex-1 text-center sm:text-left w-full">
                    <h3 className={`font-bold leading-tight mb-1 ${isAtivo ? 'text-gray-900' : 'text-gray-600 line-through'}`}>{produto.title}</h3>
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
                  <div className="flex gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t border-gray-100 sm:border-t-0 mt-2 sm:mt-0 items-center justify-center">
                    
                    {/* NOVO BOTÃO: Olhinho (AGORA ENVIANDO PROCOD) */}
                    <button 
                      onClick={() => alternarVisibilidade(produto.procod, isAtivo)}
                      className={`p-2 rounded-lg transition-colors border ${isAtivo ? 'hover:bg-gray-100 border-transparent text-green-600' : 'bg-red-100 border-red-200 text-red-600 hover:bg-red-200'} `}
                      title={isAtivo ? "Ocultar produto da vitrine" : "Mostrar produto na vitrine"}
                    >
                      {isAtivo ? (
                        // Olho Aberto
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      ) : (
                        // Olho Fechado
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      )}
                    </button>

                    <button 
                      onClick={() => router.push(`/admin/editar/${produto.procod}`)}
                      className="flex-1 sm:flex-none bg-brand-yellow text-brand-dark px-4 py-2 rounded-lg font-bold text-sm hover:brightness-95 transition-all text-center h-full"
                    >
                      Editar
                    </button>
                    {/* BOTÃO EXCLUIR (AGORA ENVIANDO PROCOD) */}
                    <button 
                      onClick={() => handleDelete(produto.procod, produto.title)}
                      className="flex-1 sm:flex-none bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-200 transition-all text-center h-full"
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