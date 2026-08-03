'use client';

import { useState } from 'react';
import AddToCartButton from './AddToCartButton'; // Puxa o seu botão existente

interface ProductOptionsProps {
  produto: any;
}

export default function ProductOptions({ produto }: ProductOptionsProps) {
  const [selecoes, setSelecoes] = useState<Record<string, string>>({});

  // Se o produto não tiver a coluna 'variacoes' preenchida no banco, 
  // apenas exibe o botão de compra padrão.
  if (!produto.variacoes || Object.keys(produto.variacoes).length === 0) {
    return <AddToCartButton produto={produto} />;
  }

  // Atualiza o estado quando o cliente clica em uma opção
  const handleSelect = (chave: string, valor: string) => {
    setSelecoes(prev => ({ ...prev, [chave]: valor }));
  };

  // Verifica se o cliente já marcou todas as opções necessárias antes de comprar
  const chavesVariacoes = Object.keys(produto.variacoes);
  const todasSelecionadas = chavesVariacoes.every(key => selecoes[key]);

  return (
    <div className="space-y-6 pt-2">
      {chavesVariacoes.map((chave) => {
        const opcoes = produto.variacoes[chave];
        
        return (
          <div key={chave} className="space-y-3">
            {/* Título da Variação (Ex: Cor: Preto) */}
            <h4 className="text-base font-black text-gray-900">
              {chave}: <span className="font-medium text-gray-600">{selecoes[chave] || ''}</span>
            </h4>
            
            <div className="flex flex-wrap gap-2">
              {Array.isArray(opcoes) && opcoes.map((opcao: any) => {
                
                // 1. SE FOR APENAS TEXTO (Ex: Tamanhos "P", "M", "G")
                if (typeof opcao === 'string') {
                  const isSelected = selecoes[chave] === opcao;
                  return (
                    <button
                      key={opcao}
                      onClick={() => handleSelect(chave, opcao)}
                      className={`
                        min-w-[3.5rem] px-3 py-2 text-sm font-bold rounded-xl border transition-all
                        ${isSelected 
                          ? 'border-black ring-1 ring-black text-black bg-gray-50 shadow-sm' 
                          : 'border-gray-300 text-gray-700 hover:border-gray-400 bg-white'
                        }
                      `}
                    >
                      {opcao}
                    </button>
                  );
                }
                
                // 2. SE FOR OBJETO COM IMAGEM (Ex: Cores com miniaturas)
                if (typeof opcao === 'object' && opcao.nome) {
                  const isSelected = selecoes[chave] === opcao.nome;
                  const isEsgotado = opcao.esgotado === true;

                  return (
                    <button
                      key={opcao.nome}
                      disabled={isEsgotado}
                      onClick={() => handleSelect(chave, opcao.nome)}
                      className={`
                        relative w-16 h-20 rounded-lg border transition-all flex flex-col items-center justify-center p-0.5 overflow-hidden
                        ${isSelected 
                          ? 'border-indigo-800 ring-1 ring-indigo-800 shadow-md' // Borda Roxa/Indigo da referência
                          : 'border-gray-300 hover:border-gray-400 bg-white'
                        }
                        ${isEsgotado ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                      title={opcao.nome}
                    >
                      {opcao.img ? (
                        <img src={opcao.img} alt={opcao.nome} className="w-full h-full object-cover rounded-md" />
                      ) : (
                        <span className="text-xs font-bold">{opcao.nome}</span>
                      )}
                      
                      {/* Selo de "X" para itens esgotados */}
                      {isEsgotado && (
                        <span className="absolute top-1 right-1 bg-white border border-gray-300 text-gray-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-black z-10 shadow-sm">
                          X
                        </span>
                      )}
                    </button>
                  );
                }
                return null;
              })}
            </div>
          </div>
        );
      })}

      {/* Botão de Adicionar bloqueado até selecionar tudo */}
      <div className="pt-4 border-t border-gray-200">
        <div className={!todasSelecionadas ? "opacity-50 cursor-not-allowed pointer-events-none grayscale" : "transition-all"}>
           {/* Repassamos o produto para o carrinho, mas agora com as seleções embutidas */}
           <AddToCartButton produto={{ ...produto, selecoesExtras: selecoes }} />
        </div>
        {!todasSelecionadas && (
          <p className="text-red-500 text-xs mt-2 font-bold text-center">
            * Por favor, selecione as opções acima para continuar.
          </p>
        )}
      </div>
    </div>
  );
}