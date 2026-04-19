import { useState } from 'react'
import HeroSection from './sections/HeroSection'
import TrustSection from './sections/TrustSection'
import FeaturedCars from './sections/FeaturedCars'
import FleetSection from './sections/FleetSection'
import ServicesSection from './sections/ServicesSection'
import BookingForm from '../../features/booking/BookingForm'
import MapSection from './sections/MapSection'
import StickyWhatsAppButton from '../../components/StickyWhatsAppButton'
import { Helmet } from "react-helmet-async";

export default function Home() {
  const [carType, setCarType] = useState('Toutes les voitures')

  return (
    <>
      <Helmet>
        <title>Location de voiture à Témara dès 250 MAD/jour | Fornax Car</title>

        <meta
          name="description"
          content="Location de voiture à Témara et Rabat dès 250 MAD/jour. Réservation rapide via WhatsApp. Sans caution. Livraison gratuite avec Fornax Car."
        />

        <meta
          name="keywords"
          content="location voiture temara, location voiture rabat, location voiture maroc, louer voiture temara, fornax car"
        />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Location de voiture à Témara dès 250 MAD/jour" />
        <meta
          property="og:description"
          content="Réservez votre voiture en 2 minutes via WhatsApp. Sans caution et livraison gratuite à Témara et Rabat."
        />
        <meta property="og:type" content="website" />

        {/* Local SEO boost */}
        <meta name="geo.placename" content="Témara, Rabat, Maroc" />

        {/* Schema (very important for Google ranking) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CarRental",
            "name": "Fornax Car",
            "areaServed": "Témara, Rabat, Maroc",
            "description":
              "Location de voitures à Témara et Rabat avec réservation rapide via WhatsApp, sans caution et livraison gratuite."
          })}
        </script>
      </Helmet>

      <main>

        {/* HERO */}
        <HeroSection setCarType={setCarType} />

        {/* TRUST (keep but make it more powerful in UI later) */}
        <TrustSection />

        {/* SEO BOOST TEXT (hidden structure benefit via sections) */}
        <section className="px-4 py-10 text-center max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-3">
            Location de voiture à Témara et Rabat
          </h2>

          <p className="text-gray-600">
            Fornax Car propose des voitures économiques, SUV et familiales à Témara et Rabat.
            Réservation rapide via WhatsApp, sans caution et avec livraison gratuite.
          </p>
        </section>

        {/* CARS */}
        <FeaturedCars carType={carType} />
        <FleetSection carType={carType} />

        {/* SERVICES */}
        <ServicesSection />

        {/* BOOKING (keep but now stronger SEO context around it) */}
        <section className="px-4 py-6">
          <h2 className="text-center text-xl font-bold mb-4">
            Réservation rapide via WhatsApp
          </h2>

          <BookingForm />
        </section>

        {/* MAP */}
        <MapSection />

        {/* FINAL TRUST BOOST */}
        <section className="text-center py-10 text-sm text-gray-500">
          +500 clients satisfaits à Témara & Rabat • Réponse en moins de 2 minutes
        </section>

      </main>

      <StickyWhatsAppButton />
    </>
  )
}