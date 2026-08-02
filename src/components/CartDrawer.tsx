'use client';

import { useCartStore } from '@/src/store/CartStore';

export default function CartDrawer() {
  const { 
    isOpen, 
    closeCart, 
    items, 
    removeItem, 
    updateQuantity, 
    getTotalItems, 
    getTotalPrice, 
    isPriceHidden 
  } = useCartStore();

  // Função para montar a mensagem do WhatsApp (Item 2 da sua Fase 1)
  const finalizarPedidoWpp = () => {
    if (items.length === 0) return;

    let text = `Olá, equipe Profilter! Gostaria de solicitar um *ORÇAMENTO* para os seguintes itens:\n\n`;
    
    items.forEach((item) => {
      text += `📦 *${item.quantity}x* ${item.title} (Cód: ${item.procod})\n`;
      if (!isPriceHidden && item.price) {
        text += `   ↳ Valor un: R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
      }
    });

    if (!isPriceHidden) {
      text += `\n💰 *Total Estimado: R$ ${getTotalPrice().toFixed(2).replace('.', ',')}*\n`;
    }

    text += `\nAguardo o retorno para confirmar disponibilidade e faturamento.`;

    const encodedText = encodeURIComponent(text);
    // Substitua pelo seu número (55 + DDD + Numero)
    window.open(`https://wa.me/5541992681533?text=${encodedText}`, '_blank');
  };

  // Se a sacola estiver fechada, não renderiza o visual
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Fundo escuro transparente (Clica nele para fechar) */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={closeCart}
      ></div>

      {/* Gaveta Branca */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        
        {/* Cabeçalho da Gaveta */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-black uppercase text-brand-dark">Seu Orçamento</h2>
          <button onClick={closeCart} className="p-2 text-gray-500 hover:text-black font-bold text-xl">
            ✕
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <p>Sua lista de orçamento está vazia.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.procod} className="flex gap-4 border border-gray-200 rounded-lg p-3 relative">
                
                {/* Imagem */}
                <div className="w-20 h-20 bg-gray-50 rounded flex items-center justify-center p-1">
                  <img src={item.img_url} alt={item.title} className="max-w-full max-h-full mix-blend-multiply" />
                </div>
                
                {/* Dados do Item */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-sm font-bold text-gray-900 leading-tight pr-5">{item.title}</h3>
                  <span className="text-xs text-gray-500 mb-2">Cód: {item.procod}</span>
                  
                  {/* Controles de Quantidade e Preço */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-gray-300 rounded bg-white">
                      <button 
                        onClick={() => updateQuantity(item.procod, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                      >-</button>
                      <span className="px-3 py-1 text-sm font-bold border-l border-r border-gray-300">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.procod, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                      >+</button>
                    </div>

                    {!isPriceHidden && item.price && (
                      <span className="font-black text-brand-dark">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Botão Remover */}
                <button 
                  onClick={() => removeItem(item.procod)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  title="Remover item"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Rodapé: Total e Finalizar */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-5 bg-gray-50">
            {!isPriceHidden && (
              <div className="flex justify-between items-center mb-4 text-lg">
                <span className="font-bold text-gray-600 uppercase">Total Estimado:</span>
                <span className="font-black text-brand-dark text-xl">
                  R$ {getTotalPrice().toFixed(2).replace('.', ',')}
                </span>
              </div>
            )}
            
            <button 
              onClick={finalizarPedidoWpp}
              className="w-full bg-brand-wpp text-white py-4 rounded-xl font-black uppercase text-base cursor-pointer tracking-wider transition-all duration-200 hover:brightness-95 flex items-center justify-center gap-3 shadow-md"
            >
              <img src="/img/icon-whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain" />
              SOLICITAR COTAÇÃO ({getTotalItems()} itens)
            </button>
          </div>
        )}

      </div>
    </div>
  );
}