'use client';

import { useState } from 'react';

export default function GaleriaImagens({ imagens, titulo }: { imagens: string[]; titulo: string }) {
  const [fotoSelecionada, setFotoSelecionada] = useState(imagens[0] || '');

  if (imagens.length === 0) {
    return (
      <div className="w-full aspect-square flex flex-col items-center justify-center text-gray-400 gap-3 bg-gray-50 rounded-2xl">
        <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-sm font-medium">Imagem em produção</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Foto Principal em Destaque */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
        <img 
          src={fotoSelecionada} 
          alt={titulo}
          className="w-full h-full object-contain mix-blend-multiply p-4 transition-all duration-300"
        />
      </div>

      {/* Miniaturas (Só aparecem se houver mais de uma foto) */}
      {imagens.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {imagens.map((img, index) => (
            <button
              key={index}
              onClick={() => setFotoSelecionada(img)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border-2 transition-all flex-shrink-0 
                ${fotoSelecionada === img ? 'border-blue-600 shadow-md scale-105' : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'}`}
            >
              <img src={img} alt={`${titulo} ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}