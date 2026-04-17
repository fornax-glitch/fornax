import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import StickyWhatsAppButton from '../../components/StickyWhatsAppButton'
import { Helmet } from "react-helmet-async";

export default function Contact() {
  return (
    <>
      <Navbar />

      <main className="pt-20 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Contact</h1>

        <p className="text-gray-600 mb-4">
          Contactez-nous directement sur WhatsApp pour une réponse rapide.
        </p>

        <a
          href="https://wa.me/212642997687"
          target="_blank"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-full"
        >
          Ouvrir WhatsApp
        </a>
      </main>

      <Footer />
      <StickyWhatsAppButton />
      <Helmet>
  <title>Contact - Fornax Car</title>
  <meta name="description" content="Contactez Fornax Car via WhatsApp pour louer une voiture à Témara." />
  <meta name="robots" content="index, follow" />
</Helmet>
    </>
  )
}