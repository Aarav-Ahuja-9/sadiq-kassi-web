import './globals.css';
import { CartProvider } from './CartContext';

export const metadata = {
  title: 'Sadiq Kassi | Premium Forging',
  description: 'Generational Craftsmanship and Heavy Duty Agriculture Tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* CartProvider Navbar aur Footer khud render karega, aur 'children' mein aapke pages aayenge */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}