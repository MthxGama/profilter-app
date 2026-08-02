'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FaleConosco() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="bg-brand-bg text-brand-dark font-sans antialiased min-h-screen flex flex-col">
      
      {/* CABEÇALHO COMPACTO */}
      <header className="bg-brand-yellow py-5 w-full shrink-0 shadow-sm">
        <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] flex justify-between items-center">
          <Link href="/" title="Voltar para a Página Inicial" className="block transition-transform hover:scale-105">
            <img src="/img/logo.png" alt="Logotipo Profilter" className="h-10 w-auto block" />
          </Link>
          <Link href="/" className="bg-[#2D2D2D] text-brand-yellow border-none py-2 px-6 font-extrabold text-[0.9rem] cursor-pointer uppercase transition-all duration-200 hover:scale-105 hover:brightness-110 rounded-lg">
            VOLTAR PARA HOME
          </Link>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-grow py-12 lg:py-20">
        <div className="w-full max-w-[1300px] mx-auto px-4 lg:px-[5%]">
          
          <div className="mb-10 border-b-4 border-brand-yellow pb-4">
            <h1 className="text-[2.2rem] md:text-[2.8rem] font-black uppercase text-black leading-tight">Fale Conosco</h1>
            <p className="text-[#444] font-medium text-lg mt-1">Entre em contato com nossa equipe comercial ou suporte técnico.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COLUNA DA ESQUERDA: INFORMAÇÕES DE CONTATO */}
            <div className="lg:col-span-1 space-y-6">
              
              <div className="bg-white p-8 rounded-2xl shadow-md border border-[#ccc]">
                <h3 className="text-xl font-bold text-black mb-6 uppercase border-b border-gray-100 pb-3">Canais Oficiais</h3>
                
                <div className="space-y-6 text-gray-700">
                  <div>
                    <span className="block font-extrabold text-black uppercase text-sm mb-1">WhatsApp Comercial</span>
                    <a href="https://wa.me/5541992681533" target="_blank" rel="noopener noreferrer" className="text-brand-wpp font-bold hover:underline">
                      (41) 99268-1533
                    </a>
                  </div>

                  <div>
                    <span className="block font-extrabold text-black uppercase text-sm mb-1">E-mail de Contato</span>
                    <p className="font-semibold text-gray-600">contato@profilter.com.br</p>
                  </div>

                  <div>
                    <span className="block font-extrabold text-black uppercase text-sm mb-1">Atendimento</span>
                    <p className="font-semibold text-gray-600">Segunda a Sexta, das 8h às 18h.</p>
                  </div>

                  <div>
                    <span className="block font-extrabold text-black uppercase text-sm mb-1">Localização</span>
                    <p className="font-semibold text-gray-600">Curitiba - PR</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-dark text-white p-8 rounded-2xl shadow-md border-t-8 border-brand-yellow">
                <h3 className="text-xl font-bold text-brand-yellow mb-3 uppercase">Seja um Distribuidor</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Quer levar a linha completa de filtros PROFILTER para a sua região ou autopeças? Preencha o formulário ao lado ou fale diretamente com nossa equipe comercial.
                </p>
              </div>

            </div>

            {/* COLUNA DA DIREITA: FORMULÁRIO DE CONTATO */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-md border border-[#ccc]">
                
                {enviado ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 bg-brand-wpp text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
                    <h3 className="text-2xl font-black uppercase text-black">Mensagem Enviada!</h3>
                    <p className="text-gray-600 font-medium">Agradecemos o seu contato. Nossa equipe retornará o mais breve possível.</p>
                    <button 
                      onClick={() => setEnviado(false)} 
                      className="mt-4 bg-brand-dark text-brand-yellow px-6 py-2.5 rounded-lg font-extrabold uppercase text-sm cursor-pointer hover:brightness-110"
                    >
                      Enviar nova mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-xl font-bold text-black uppercase mb-4">Envie sua mensagem</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-extrabold text-gray-700 uppercase mb-2">Nome Completo *</label>
                        <input 
                          required 
                          type="text" 
                          placeholder="Digite seu nome" 
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-black font-medium focus:outline-none focus:border-brand-yellow" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-extrabold text-gray-700 uppercase mb-2">Empresa / Autopeças *</label>
                        <input 
                          required 
                          type="text" 
                          placeholder="Nome da sua empresa" 
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-black font-medium focus:outline-none focus:border-brand-yellow" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-extrabold text-gray-700 uppercase mb-2">E-mail *</label>
                        <input 
                          required 
                          type="email" 
                          placeholder="seu@email.com" 
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-black font-medium focus:outline-none focus:border-brand-yellow" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-extrabold text-gray-700 uppercase mb-2">Telefone / WhatsApp *</label>
                        <input 
                          required 
                          type="text" 
                          placeholder="(41) 99999-9999" 
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-black font-medium focus:outline-none focus:border-brand-yellow" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-extrabold text-gray-700 uppercase mb-2">Cidade *</label>
                        <input 
                          required 
                          type="text" 
                          placeholder="Sua cidade" 
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-black font-medium focus:outline-none focus:border-brand-yellow" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-extrabold text-gray-700 uppercase mb-2">Estado (UF) *</label>
                        <input 
                          required 
                          type="text" 
                          placeholder="PR" 
                          maxLength={2} 
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-black font-medium focus:outline-none focus:border-brand-yellow" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-extrabold text-gray-700 uppercase mb-2">Mensagem ou Assunto *</label>
                      <textarea 
                        required 
                        rows={5} 
                        placeholder="Como podemos ajudar sua empresa?" 
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-black font-medium focus:outline-none focus:border-brand-yellow resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-brand-yellow text-black py-4 rounded-lg font-black uppercase text-base cursor-pointer tracking-wider transition-all duration-200 hover:brightness-95 shadow-md"
                    >
                      ENVIAR MENSAGEM
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </main>

      {/* RODAPÉ SIMPLIFICADO */}
      <footer className="bg-brand-dark text-white py-10 w-full mt-10 border-t-[15px] border-brand-yellow">
        <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] flex flex-col md:flex-row justify-between items-center gap-6">
          <img src="/img/logo-branca.png" alt="Profilter Logo" loading="lazy" className="max-w-[150px] block" />
          <p className="text-[#999] text-sm text-center md:text-left">© 2026 Profilter. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* BOTÃO WHATSAPP FLUTUANTE */}
      <a href="https://wa.me/5541992681533" className="fixed bottom-5 right-5 lg:bottom-[30px] lg:right-[30px] w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] bg-brand-wpp rounded-full flex items-center justify-center shadow-[2px_4px_15px_rgba(0,0,0,0.2)] z-[50] transition-all duration-300 hover:scale-110 hover:shadow-[2px_6px_20px_rgba(0,0,0,0.3)] animate-[pulse-whatsapp_2s_infinite] hover:animate-none" target="_blank" rel="noopener noreferrer" aria-label="Atendimento via WhatsApp">
        <img src="/img/icon-whatsapp.png" alt="WhatsApp" loading="lazy" className="w-[28px] h-[28px] lg:w-[35px] lg:h-[35px] object-contain block" />
      </a>

    </div>
  );
}