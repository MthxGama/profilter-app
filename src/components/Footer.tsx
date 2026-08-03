import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-[60px] w-full mt-10 border-t-[15px] border-brand-yellow">
      <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-[5%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.2fr_1fr] gap-10 text-[0.9rem]">
        
        {/* Coluna 1 */}
        <div>
          <img src="/img/logo-branca.png" alt="Profilter Logo" loading="lazy" className="max-w-[180px] mb-5 block" />
          <p className="text-[#ccc] leading-[1.5] mb-6 pr-5 text-[0.95rem]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <div className="flex gap-3">
            <a href="#" aria-label="Facebook"><img src="/img/icon-fb.png" alt="Facebook" loading="lazy" className="w-8 h-8 transition-transform duration-200 hover:scale-110 block" /></a>
            <a href="#" aria-label="Instagram"><img src="/img/icon-ig.png" alt="Instagram" loading="lazy" className="w-8 h-8 transition-transform duration-200 hover:scale-110 block" /></a>
            <a href="#" aria-label="LinkedIn"><img src="/img/icon-in.png" alt="LinkedIn" loading="lazy" className="w-8 h-8 transition-transform duration-200 hover:scale-110 block" /></a>
          </div>
        </div>

        {/* Coluna 2 */}
        <nav aria-label="Navegação Institucional">
          <h4 className="text-brand-yellow mb-6 font-extrabold uppercase text-base">INSTITUCIONAL</h4>
          <ul className="list-none">
            <li className="mb-4"><Link href="/politica-de-entrega" className="text-[#ccc] no-underline font-medium transition-colors hover:text-brand-yellow">Política de entrega</Link></li>
            <li className="mb-4"><Link href="/politica-de-privacidade" className="text-[#ccc] no-underline font-medium transition-colors hover:text-brand-yellow">Política de Privacidade</Link></li>
            <li className="mb-4"><Link href="/duvidas-frequentes" className="text-[#ccc] no-underline font-medium transition-colors hover:text-brand-yellow">Dúvidas Frequentes</Link></li>
            <li className="mb-4"><Link href="/trocas-e-devolucoes" className="text-[#ccc] no-underline font-medium transition-colors hover:text-brand-yellow">Trocas e devoluções</Link></li>
            <li className="mb-4"><Link href="/fale-conosco" className="text-[#ccc] no-underline font-medium transition-colors hover:text-brand-yellow">Fale Conosco</Link></li>
          </ul>
        </nav>

        {/* Coluna 3 */}
        <address className="not-italic">
          <h4 className="text-brand-yellow mb-6 font-extrabold uppercase text-base">ATENDIMENTO</h4>
          <div className="flex items-start gap-4 pb-4 mb-4 border-b border-[#444]">
            <img src="/img/icon-phone.png" alt="Telefone" loading="lazy" className="w-6 h-6 object-contain mt-0.5 block" />
            <div className="flex flex-col">
              <span className="text-[#999] text-[0.85rem] mb-0.5">Compre por telefone</span>
              <strong className="text-white text-base font-bold">(41) 0000-0000</strong>
            </div>
          </div>
          <div className="flex items-start gap-4 pb-4 mb-4 border-b border-[#444]">
            <img src="/img/icon-wpp-yellow.png" alt="WhatsApp" loading="lazy" className="w-6 h-6 object-contain mt-0.5 block" />
            <div className="flex flex-col">
              <span className="text-[#999] text-[0.85rem] mb-0.5">Fale no WhatsApp</span>
              <span className="text-[#999] text-[0.75rem] mb-0.5">PROFILTER</span>
              <strong className="text-white text-base font-bold">(41) 99268-1533</strong>
            </div>
          </div>
          <div className="flex items-start gap-4 pb-4 mb-4 border-b border-[#444]">
            <img src="/img/icon-mail.png" alt="E-mail" loading="lazy" className="w-6 h-6 object-contain mt-0.5 block" />
            <div className="flex flex-col">
              <span className="text-[#999] text-[0.85rem] mb-0.5">Envie um e-mail</span>
              <strong className="text-white text-base font-bold">contato@profilter.com.br</strong>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <img src="/img/icon-pin.png" alt="Localização" loading="lazy" className="w-6 h-6 object-contain mt-0.5 block" />
            <div className="flex flex-col">
              <span className="text-[#999] text-[0.85rem] mb-0.5">Onde estamos</span>
            </div>
          </div>
        </address>

        {/* Coluna 4 */}
        <div>
          <h4 className="text-brand-yellow mb-6 font-extrabold uppercase text-base">FORMAS DE PAGAMENTO</h4>
          <img src="/img/pagamentos.png" alt="Cartões e Pix" loading="lazy" className="max-w-full mb-8 block" />
          
          <h4 className="text-brand-yellow mb-6 font-extrabold uppercase text-base mt-5">SELOS DE SEGURANÇA</h4>
          <div className="flex flex-col gap-4">
            <img src="/img/selo-google.png" alt="Google Safe Browsing" loading="lazy" className="max-h-[30px] object-contain block" />
            <img src="/img/selo-loja.png" alt="Loja Protegida" loading="lazy" className="max-h-[30px] object-contain block" />
          </div>
        </div>
      </div>
    </footer>
  );
}