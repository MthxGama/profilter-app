'use client';

import { useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NovoProduto() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Estados dos campos do formulário
  const [title, setTitle] = useState('');
  const [procod, setProcod] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  
  // Códigos equivalentes
  const [wega, setWega] = useState('');
  const [tecfil, setTecfil] = useState('');
  const [codvar, setCodvar] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !procod) {
      alert('Por favor, preencha pelo menos o Nome e o Código Profilter.');
      return;
    }

    setLoading(true);

    // Formata o preço (caso você digite com vírgula, ele arruma para o banco de dados)
    const formattedPrice = price ? parseFloat(price.replace(',', '.')) : null;

    const { error } = await supabase.from('products').insert([
      {
        title,
        procod,
        price: formattedPrice,
        description,
        img_url: imgUrl || null,
        wega: wega || null,
        tecfil: tecfil || null,
        codvar: codvar || null,
      }
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert('Erro ao salvar o produto. Verifique se este código já não existe.');
    } else {
      alert('Produto cadastrado com sucesso!');
      router.push('/admin'); // Redireciona de volta para a lista
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* CABEÇALHO */}
      <header className="bg-[#2D2D2D] text-brand-yellow py-4 px-5 sticky top-0 z-10 shadow-md flex items-center gap-4">
        <Link href="/admin" className="text-white font-bold text-xl hover:scale-110 transition-transform">
          ←
        </Link>
        <div>
          <h1 className="text-xl font-black uppercase tracking-wider">Novo Produto</h1>
          <p className="text-xs text-gray-400">Cadastrar no Catálogo</p>
        </div>
      </header>

      {/* FORMULÁRIO */}
      <main className="max-w-2xl mx-auto px-4 mt-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
          
          {/* SESSÃO 1: DADOS PRINCIPAIS */}
          <div>
            <h2 className="text-sm font-bold text-gray-400 uppercase mb-3">Dados Principais</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nome do Produto *</label>
                <input 
                  type="text" 
                  required 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Filtro de Óleo Alta Performance"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Cód. Profilter (SKU) *</label>
                  <input 
                    type="text" 
                    required 
                    value={procod} 
                    onChange={(e) => setProcod(e.target.value)}
                    placeholder="Ex: PSL123"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none uppercase"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Preço B2B (R$)</label>
                  <input 
                    type="text" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ex: 45,90 (Deixe em branco para Sob Consulta)"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">URL da Imagem</label>
                <input 
                  type="text" 
                  value={imgUrl} 
                  onChange={(e) => setImgUrl(e.target.value)}
                  placeholder="Ex: https://site.com/imagem.jpg"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Descrição</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* SESSÃO 2: CÓDIGOS EQUIVALENTES */}
          <div className="pt-4 border-t border-gray-100">
            <h2 className="text-sm font-bold text-gray-400 uppercase mb-3">Equivalências (Opcional)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Wega</label>
                <input type="text" value={wega} onChange={(e) => setWega(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Tecfil</label>
                <input type="text" value={tecfil} onChange={(e) => setTecfil(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Cód. Variáveis</label>
                <input type="text" value={codvar} onChange={(e) => setCodvar(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" />
              </div>
            </div>
          </div>

          {/* BOTÃO DE SALVAR */}
          <div className="pt-6 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-green-600 text-white font-black text-lg py-4 rounded-xl uppercase tracking-wider hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? 'Salvando...' : 'CADASTRAR PRODUTO'}
            </button>
          </div>

        </form>
      </main>

    </div>
  );
}