'use client';

import { useState, useEffect, use } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GerenciadorVariacoes from '@/src/components/GerenciadorVariacoes';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function EditarProduto({ params }: Props) {
  const resolvedParams = use(params);
  const productCode = decodeURIComponent(resolvedParams.id);

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [procod, setProcod] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [applications, setApplications] = useState(''); // Estado do campo de Aplicações
  const [imgUrl, setImgUrl] = useState('');
  
  const [wega, setWega] = useState('');
  const [tecfil, setTecfil] = useState('');
  const [codvar, setCodvar] = useState('');

  // Estado para o JSON das variações
  const [variacoes, setVariacoes] = useState<any>({});

  // Puxa os dados usando o procod (SKU)
  useEffect(() => {
    const fetchProduto = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('procod', productCode)
        .single();

      if (error) {
        console.error(error);
        alert('Erro ao carregar o produto pelo código.');
        router.push('/admin');
      } else if (data) {
        setTitle(data.title || '');
        setProcod(data.procod || '');
        setPrice(data.price ? data.price.toString().replace('.', ',') : '');
        setDescription(data.description || '');
        setApplications(data.applications || ''); // Carrega as aplicações salvas
        
        const image = Array.isArray(data.img_url) ? data.img_url[0] : (data.img_url || '');
        setImgUrl(image);

        setWega(data.wega || '');
        setTecfil(data.tecfil || '');
        setCodvar(data.codvar || '');
        
        // Carrega as variações existentes
        setVariacoes(data.variacoes || {});
      }
      setLoading(false);
    };

    fetchProduto();
  }, [productCode, router]);

  // Salva as alterações atualizando pelo procod original
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formattedPrice = price ? parseFloat(price.replace(',', '.')) : null;

    const { error } = await supabase
      .from('products')
      .update({
        title,
        procod,
        price: formattedPrice,
        description,
        applications: applications || null, // Atualiza as aplicações no banco
        img_url: imgUrl || null,
        wega: wega || null,
        tecfil: tecfil || null,
        codvar: codvar || null,
        variacoes, // Atualiza as variações no banco
      })
      .eq('procod', productCode);

    setSaving(false);

    if (error) {
      console.error(error);
      alert('Erro ao atualizar o produto. Tente novamente.');
    } else {
      alert('Produto atualizado com sucesso!');
      router.push('/admin');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-brand-yellow border-solid"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-[#2D2D2D] text-brand-yellow py-4 px-5 sticky top-0 z-10 shadow-md flex items-center gap-4">
        <Link href="/admin" className="text-white font-bold text-xl hover:scale-110 transition-transform">
          ←
        </Link>
        <div>
          <h1 className="text-xl font-black uppercase tracking-wider">Editar Produto</h1>
          <p className="text-xs text-gray-400">Atualizar dados do catálogo</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 mt-8">
        <form onSubmit={handleUpdate} className="space-y-6">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
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
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none uppercase"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Preço B2B (R$)</label>
                    <input 
                      type="text" 
                      value={price} 
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Deixe em branco para Sob Consulta"
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

                {/* CAMPO DE APLICAÇÕES */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Aplicações (Veículos / Máquinas)</label>
                  <textarea 
                    value={applications} 
                    onChange={(e) => setApplications(e.target.value)}
                    rows={3}
                    placeholder="Ex: Fiat Palio 1.0 / Siena / Strada (2010 em diante)..."
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

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
          </div>

          {/* GERENCIADOR DE VARIAÇÕES */}
          <GerenciadorVariacoes 
            variacoesIniciais={variacoes} 
            onChange={(novoJson) => setVariacoes(novoJson)} 
          />

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={saving}
              className="w-full bg-brand-yellow text-brand-dark font-black text-lg py-4 rounded-xl uppercase tracking-wider hover:brightness-95 transition-all disabled:opacity-50 flex items-center justify-center shadow-md"
            >
              {saving ? 'Salvando Alterações...' : 'SALVAR ALTERAÇÕES'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}