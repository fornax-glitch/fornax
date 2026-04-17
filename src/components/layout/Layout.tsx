import { type ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import StickyWhatsAppButton from '../StickyWhatsAppButton';
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
      <StickyWhatsAppButton />
    </>
  );
}
``