'use client';

import { useState, useEffect } from 'react';

interface GerenciadorVariacoesProps {
  variacoesIniciais?: any;
  onChange: (variacoesJson: any) => void;
}

export default function GerenciadorVariacoes({ variacoesIniciais, onChange }: GerenciadorVariacoesProps) {
  // Converte o JSON do banco para um formato mais fácil de editar na tela
  const [grupos, setGrupos] = useState<{ nome: string; opcoes: any[] }[]>([]);

  useEffect(() => {
    if (variacoesIniciais && typeof variacoesIniciais === 'object') {
      const gruposFormatados = Object.keys(variacoesIniciais).map(chave => ({
        nome: chave,
        opcoes: variacoesIniciais[chave]
      }));
      setGrupos(gruposFormatados);
    }
  }, [variacoesIniciais]);

  // Atualiza o formulário pai sempre que houver mudança
  const notificarMudanca = (novosGrupos: any[]) => {
    const jsonFinal: any = {};
    novosGrupos.forEach(grupo => {
      if (grupo.nome.trim() !== '' && grupo.opcoes.length > 0) {
        jsonFinal[grupo.nome] = grupo.opcoes;
      }
    });
    onChange(jsonFinal);
  };

  const adicionarGrupo = () => {
    const novosGrupos = [...grupos, { nome: '', opcoes: [] }];
    setGrupos(novosGrupos);
  };

  const removerGrupo = (indexGrupo: number) => {
    const novosGrupos = [...grupos];
    novosGrupos.splice(indexGrupo, 1);
    setGrupos(novosGrupos);
    notificarMudanca(novosGrupos);
  };

  const atualizarNomeGrupo = (indexGrupo: number, novoNome: string) => {
    const novosGrupos = [...grupos];
    novosGrupos[indexGrupo].nome = novoNome;
    setGrupos(novosGrupos);
    notificarMudanca(novosGrupos);
  };

  // Funções para gerenciar as opções dentro do grupo
  const adicionarOpcaoTexto = (indexGrupo: number) => {
    const novosGrupos = [...grupos];
    novosGrupos[indexGrupo].opcoes.push("Nova Opção");
    setGrupos(novosGrupos);
    notificarMudanca(novosGrupos);
  };

  const adicionarOpcaoImagem = (indexGrupo: number) => {
    const novosGrupos = [...grupos];
    novosGrupos[indexGrupo].opcoes.push({ nome: "Nova Cor", img: "", esgotado: false });
    setGrupos(novosGrupos);
    notificarMudanca(novosGrupos);
  };

  const atualizarOpcao = (indexGrupo: number, indexOpcao: number, valor: any) => {
    const novosGrupos = [...grupos];
    novosGrupos[indexGrupo].opcoes[indexOpcao] = valor;
    setGrupos(novosGrupos);
    notificarMudanca(novosGrupos);
  };

  const removerOpcao = (indexGrupo: number, indexOpcao: number) => {
    const novosGrupos = [...grupos];
    novosGrupos[indexGrupo].opcoes.splice(indexOpcao, 1);
    setGrupos(novosGrupos);
    notificarMudanca(novosGrupos);
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 text-lg">Variações do Produto</h3>
        <button 
          type="button" 
          onClick={adicionarGrupo}
          className="bg-brand-dark text-brand-yellow px-3 py-1.5 rounded-lg text-sm font-bold hover:brightness-110"
        >
          + Criar Grupo (Ex: Cor, Tamanho)
        </button>
      </div>

      {grupos.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-4 border-2 border-dashed rounded-lg">
          Este produto não tem variações (Item único).
        </p>
      )}

      <div className="space-y-6">
        {grupos.map((grupo, gIndex) => (
          <div key={gIndex} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            
            {/* Cabeçalho do Grupo */}
            <div className="flex gap-2 items-center mb-4 pb-3 border-b border-gray-200">
              <input
                type="text"
                value={grupo.nome}
                onChange={(e) => atualizarNomeGrupo(gIndex, e.target.value)}
                placeholder="Nome da Variação (Ex: Tamanho)"
                className="flex-1 p-2 border border-gray-300 rounded-lg font-bold text-gray-800"
              />
              <button type="button" onClick={() => removerGrupo(gIndex)} className="text-red-500 hover:bg-red-100 p-2 rounded-lg font-bold text-sm">
                Excluir Grupo
              </button>
            </div>

            {/* Lista de Opções */}
            <div className="space-y-3 mb-4">
              {grupo.opcoes.map((opcao, oIndex) => {
                const isTexto = typeof opcao === 'string';

                return (
                  <div key={oIndex} className="flex gap-2 items-start bg-white p-3 border border-gray-200 rounded-lg shadow-sm relative">
                    
                    {isTexto ? (
                      <input
                        type="text"
                        value={opcao}
                        onChange={(e) => atualizarOpcao(gIndex, oIndex, e.target.value)}
                        placeholder="Ex: P, M, G, 110V..."
                        className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={opcao.nome}
                          onChange={(e) => atualizarOpcao(gIndex, oIndex, { ...opcao, nome: e.target.value })}
                          placeholder="Nome da Cor (Ex: Preto Fosco)"
                          className="w-full p-2 border border-gray-300 rounded text-sm font-bold"
                        />
                        <input
                          type="text"
                          value={opcao.img}
                          onChange={(e) => atualizarOpcao(gIndex, oIndex, { ...opcao, img: e.target.value })}
                          placeholder="URL da Imagem (opcional)"
                          className="w-full p-2 border border-gray-300 rounded text-sm text-gray-500"
                        />
                        <label className="flex items-center gap-2 text-sm text-gray-600 font-bold mt-2">
                          <input 
                            type="checkbox" 
                            checked={opcao.esgotado || false}
                            onChange={(e) => atualizarOpcao(gIndex, oIndex, { ...opcao, esgotado: e.target.checked })}
                          />
                          Marcar como Esgotado
                        </label>
                      </div>
                    )}
                    
                    <button type="button" onClick={() => removerOpcao(gIndex, oIndex)} className="text-red-400 font-bold text-xl leading-none p-1 hover:text-red-600">
                      &times;
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Botões de Adicionar Nova Opção */}
            <div className="flex gap-2 mt-2">
              <button type="button" onClick={() => adicionarOpcaoTexto(gIndex)} className="text-sm bg-gray-200 px-3 py-1.5 rounded hover:bg-gray-300 font-medium">
                + Opção de Texto (Botão)
              </button>
              <button type="button" onClick={() => adicionarOpcaoImagem(gIndex)} className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded hover:bg-indigo-200 font-medium">
                + Opção com Imagem (Cores)
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}