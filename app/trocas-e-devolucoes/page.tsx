import Link from 'next/link';

export default function TrocasEDevolucoes() {
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
              Política de Trocas, Devoluções e Garantia
            </h1>
            
            <div className="space-y-6 text-gray-700 leading-relaxed font-medium text-lg">
              
              <p>
                A <strong>PROFILTER</strong> preza pela qualidade de seus produtos e pelo atendimento eficiente aos seus clientes e parceiros comerciais.
              </p>
              
              <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-brand-yellow">
                <p className="text-black font-bold">
                  Como fabricante, não realiza vendas diretamente por este site. As solicitações de troca ou garantia deverão ser encaminhadas inicialmente ao estabelecimento onde o produto foi adquirido.
                </p>
              </div>

              <h3 className="text-xl font-bold text-black mt-10">Garantia</h3>
              <p>
                Os produtos PROFILTER possuem garantia contra defeitos de fabricação, observadas as condições de instalação, utilização e armazenamento recomendadas. A garantia não cobre:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-brand-yellow">
                <li>Instalação inadequada;</li>
                <li>Aplicação incorreta do produto;</li>
                <li>Danos decorrentes de acidentes;</li>
                <li>Desgaste natural pelo uso;</li>
                <li>Modificações ou reparos realizados por terceiros;</li>
                <li>Utilização fora das especificações técnicas.</li>
              </ul>

              <h3 className="text-xl font-bold text-black mt-10">Procedimento para Garantia</h3>
              <p>
                Quando houver suspeita de defeito de fabricação, o produto deverá ser encaminhado ao revendedor ou distribuidor responsável pela venda.
              </p>
              <p>
                Após o recebimento, o material será submetido à análise técnica da PROFILTER. Caso seja constatado defeito de fabricação, a empresa realizará a substituição do produto ou adotará outra solução prevista na legislação vigente, em conjunto com o canal de venda responsável.
              </p>

              <h3 className="text-xl font-bold text-black mt-10">Trocas e Devoluções</h3>
              <p>
                Trocas por erro de aplicação, compra equivocada ou outros motivos comerciais deverão seguir a política do estabelecimento onde o produto foi adquirido.
              </p>
              <p>
                Como este site não realiza comercialização de produtos, não há procedimento de devolução diretamente pela plataforma. As devoluções referentes a compras deverão ser tratadas junto ao distribuidor ou revendedor responsável pela venda.
              </p>

              <h3 className="text-xl font-bold text-black mt-10">Atendimento</h3>
              <p>
                Em caso de dúvidas sobre garantia ou procedimentos técnicos, nossa equipe de atendimento permanece à disposição através dos canais oficiais disponíveis neste site.
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