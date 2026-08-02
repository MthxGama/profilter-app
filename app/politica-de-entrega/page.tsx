import Link from 'next/link';

export default function PoliticaDeEntrega() {
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

      {/* CONTEÚDO DO DOCUMENTO */}
      <main className="flex-grow py-12 lg:py-20">
        <div className="w-full max-w-[1000px] mx-auto px-4 lg:px-[5%]">
          
          <div className="bg-white p-8 md:p-14 rounded-2xl shadow-md border border-[#ccc]">
            
            <h1 className="text-[2.2rem] md:text-[2.8rem] font-black uppercase text-black mb-8 border-b-4 border-brand-yellow pb-4">
              Política de Entrega
            </h1>
            
            <div className="space-y-6 text-gray-700 leading-relaxed font-medium text-lg">
              <p>
                A <strong>PROFILTER</strong> é uma fabricante de filtros automotivos e disponibiliza este site exclusivamente para fins institucionais e de divulgação de seus produtos.
              </p>
              
              <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-brand-yellow">
                <p className="text-black font-bold">
                  Não realizamos vendas diretas por meio deste site. Dessa forma, não existem prazos de entrega vinculados às informações aqui apresentadas.
                </p>
              </div>

              <p>
                Os produtos PROFILTER são comercializados por meio de distribuidores, atacadistas, autopeças e demais parceiros autorizados em todo o território nacional.
              </p>

              <p>
                Caso deseje adquirir nossos produtos ou localizar o ponto de venda mais próximo, entre em contato com nossa equipe através dos canais oficiais de atendimento disponíveis na página "Fale Conosco".
              </p>

              <h3 className="text-xl font-bold text-black mt-10">Para Distribuidores e Revendedores</h3>
              <p>
                Para clientes distribuidores e revendedores, os prazos de expedição e entrega são definidos conforme as condições comerciais estabelecidas entre as partes e podem variar de acordo com a região, disponibilidade de estoque e modalidade de transporte.
              </p>

              <p>
                A PROFILTER trabalha continuamente para garantir agilidade na produção, separação e envio de seus produtos, buscando atender seus parceiros com eficiência e pontualidade.
              </p>
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