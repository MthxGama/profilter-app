import Link from 'next/link';

export default function DuvidasFrequentes() {
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
              Dúvidas Frequentes (FAQ)
            </h1>
            
            <div className="space-y-6 text-gray-700 leading-relaxed font-medium text-lg">
              
              <div>
                <h3 className="text-xl font-bold text-black mt-8 mb-2">A PROFILTER vende diretamente ao consumidor?</h3>
                <p>Não. A PROFILTER atua como fabricante e distribui seus produtos através de distribuidores, atacadistas, autopeças e parceiros comerciais.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mt-8 mb-2">Onde posso comprar produtos PROFILTER?</h3>
                <p>Entre em contato conosco para localizar um distribuidor ou revendedor autorizado em sua região.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mt-8 mb-2">Os filtros possuem garantia?</h3>
                <p>Sim. Todos os produtos PROFILTER possuem garantia contra defeitos de fabricação, conforme previsto no Código de Defesa do Consumidor e nas condições estabelecidas em nossa Política de Garantia.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mt-8 mb-2">Como saber qual filtro utilizar no meu veículo?</h3>
                <p>Consulte nosso catálogo de aplicações ou entre em contato com nossa equipe técnica informando o modelo, ano e motorização do veículo.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mt-8 mb-2">A instalação pode ser feita pelo próprio consumidor?</h3>
                <p>Recomendamos que a instalação seja realizada por um profissional qualificado, seguindo as orientações do fabricante do veículo.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mt-8 mb-2">A troca do filtro influencia na garantia do veículo?</h3>
                <p>Desde que seja utilizado um filtro compatível e a manutenção seja realizada corretamente, respeitando as recomendações da montadora, não há prejuízo à garantia prevista em lei.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mt-8 mb-2">Qual é o prazo recomendado para troca dos filtros?</h3>
                <p>O intervalo varia conforme o tipo de filtro, condições de uso e recomendações da montadora do veículo. Consulte sempre o manual do fabricante.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mt-8 mb-2">Como solicitar atendimento em garantia?</h3>
                <p className="mb-4">Entre em contato através dos canais oficiais informando:</p>
                <ul className="list-disc pl-6 space-y-2 marker:text-brand-yellow mb-4">
                  <li>Nota Fiscal de compra;</li>
                  <li>Código do produto;</li>
                  <li>Lote de fabricação (quando disponível);</li>
                  <li>Descrição da ocorrência;</li>
                  <li>Fotos do produto e da aplicação, quando solicitado.</li>
                </ul>
                <p>Nossa equipe realizará a análise conforme o procedimento técnico de garantia.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mt-8 mb-2">A PROFILTER atende oficinas mecânicas?</h3>
                <p>Sim. Nossos produtos podem ser adquiridos por oficinas através da nossa rede de distribuidores e revendedores.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mt-8 mb-2">Posso me tornar distribuidor da PROFILTER?</h3>
                <p>Sim. Empresas interessadas podem entrar em contato pelo formulário disponível no site para avaliação comercial.</p>
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