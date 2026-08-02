import Link from 'next/link';

export default function PoliticaDePrivacidade() {
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
              Política de Privacidade
            </h1>
            
            <div className="space-y-6 text-gray-700 leading-relaxed font-medium text-lg">
              <p>
                A <strong>PROFILTER</strong> respeita a privacidade dos visitantes de seu site e está comprometida com a proteção dos dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD).
              </p>
              
              <h3 className="text-xl font-bold text-black mt-10">Coleta de Informações</h3>
              <p>
                Quando o usuário entra em contato conosco através dos formulários disponíveis no site, poderemos coletar informações como:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-brand-yellow">
                <li>Nome;</li>
                <li>Empresa;</li>
                <li>E-mail;</li>
                <li>Telefone;</li>
                <li>Cidade e Estado;</li>
                <li>Informações fornecidas voluntariamente na mensagem.</li>
              </ul>

              <h3 className="text-xl font-bold text-black mt-10">Finalidade da Coleta</h3>
              <p>
                Os dados coletados são utilizados exclusivamente para:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-brand-yellow">
                <li>Responder solicitações e dúvidas;</li>
                <li>Realizar atendimento comercial;</li>
                <li>Identificar distribuidores e parceiros;</li>
                <li>Enviar informações institucionais e técnicas, quando autorizado pelo usuário;</li>
                <li>Melhorar nossos serviços e canais de atendimento.</li>
              </ul>

              <h3 className="text-xl font-bold text-black mt-10">Compartilhamento de Dados</h3>
              <p>
                A PROFILTER não comercializa nem compartilha dados pessoais com terceiros para fins comerciais.
              </p>
              <p>
                As informações poderão ser compartilhadas apenas quando necessário para cumprimento de obrigação legal ou para prestação dos serviços relacionados ao atendimento solicitado.
              </p>

              <h3 className="text-xl font-bold text-black mt-10">Cookies</h3>
              <p>
                Este site poderá utilizar cookies para melhorar a experiência de navegação, gerar estatísticas de acesso e otimizar seu funcionamento.
              </p>
              <p>
                O usuário poderá gerenciar ou desabilitar os cookies diretamente em seu navegador, ciente de que determinadas funcionalidades poderão ser afetadas.
              </p>

              <h3 className="text-xl font-bold text-black mt-10">Segurança</h3>
              <p>
                Adotamos medidas técnicas e administrativas para proteger os dados pessoais contra acessos não autorizados, perdas, alterações ou qualquer forma de tratamento inadequado.
              </p>

              <h3 className="text-xl font-bold text-black mt-10">Direitos do Titular</h3>
              <p>
                Nos termos da LGPD, o titular dos dados poderá solicitar:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-brand-yellow">
                <li>Confirmação da existência de tratamento;</li>
                <li>Acesso aos dados;</li>
                <li>Correção de informações incompletas ou incorretas;</li>
                <li>Exclusão dos dados quando aplicável;</li>
                <li>Revogação do consentimento, quando este for a base legal do tratamento.</li>
              </ul>
              
              <div className="bg-gray-100 p-6 rounded-lg mt-8">
                <p>
                  As solicitações poderão ser realizadas por meio dos canais oficiais de atendimento da PROFILTER. Esta Política poderá ser atualizada sempre que necessário, sendo publicada a versão mais recente neste site.
                </p>
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