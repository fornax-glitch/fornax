import FleetSection from '../Home/sections/FleetSection'
import StickyWhatsAppButton from '../../components/StickyWhatsAppButton'
import { Helmet } from "react-helmet-async";

export default function Fleet() {
  return (
    <>
      <Helmet>
        <title>Flotte de voitures à louer à Témara | Fornax Car</title>

        <meta
          name="description"
          content="Découvrez notre flotte de voitures disponibles à la location à Témara et Rabat. Réservation rapide via WhatsApp, sans caution."
        />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Flotte de voitures Fornax Car" />
        <meta
          property="og:description"
          content="Voitures économiques, SUV et familiales disponibles à Témara et Rabat."
        />
      </Helmet>

      <main className="pt-20">

        {/* SEO H1 FIX */}
        <h1 className="text-3xl font-bold text-center mb-4">
          Location de voitures à Témara
        </h1>

        <p className="text-center text-gray-500 mb-10">
          Réservez rapidement via WhatsApp • Livraison gratuite • Sans caution
        </p>

        <FleetSection carType="Toutes les voitures" />

      </main>

      <StickyWhatsAppButton />
    </>
  )
}