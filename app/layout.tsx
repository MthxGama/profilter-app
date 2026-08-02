import './globals.css';
import CartDrawer from '@/src/components/CartDrawer'; // Importando a nossa Gaveta!

export const metadata = {
  title: 'Profilter - A Segurança que seus clientes exigem',
  description: 'Catálogo de filtros automotivos e alto giro.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <CartDrawer /> {/* Ela vai ficar oculta até alguém abrir */}
      </body>
    </html>
  );
}