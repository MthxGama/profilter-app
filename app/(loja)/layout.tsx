import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default function LojaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {/* O 'children' aqui será a sua Home, o Catálogo ou a Página do Produto */}
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
      <Footer />
    </>
  );
}