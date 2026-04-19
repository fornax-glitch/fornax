import { type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />

      <main className="m-0 p-0 overflow-x-hidden pt-20">
        {children}
      </main>

      <Footer />
    </>
  );
}