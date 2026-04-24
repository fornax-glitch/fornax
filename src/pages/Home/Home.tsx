import { useState, useEffect } from 'react'
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

  useEffect(() => {
    document.body.classList.add("dark")
    document.body.classList.remove("light")
  }, [])

  return (
    <>
      <Helmet>
        <title>Location de voiture à Témara dès 250 MAD/jour | Fornax Car</title>

        <meta
          name="description"
          content="Location de voiture à Témara et Rabat dès 250 MAD/jour. Réservation rapide via WhatsApp. Sans caution. Livraison gratuite."
        />

        <meta
          name="keywords"
          content="location voiture temara, location voiture rabat, location voiture maroc"
        />
      </Helmet>

      <main>
        <HeroSection setCarType={setCarType} />
        <TrustSection />

        <section className="px-4 py-10 text-center max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-3">
            Location de voiture à Témara et Rabat
          </h2>

          <p className="text-gray-300">
            Fornax Car propose des voitures économiques, SUV et familiales.
          </p>
        </section>

        <FeaturedCars carType={carType} />
        <FleetSection carType={carType} />
        <ServicesSection />

        <section className="px-4 py-6">
          <h2 className="text-center text-xl font-bold mb-4">
            Réservation rapide via WhatsApp
          </h2>

          <BookingForm />
        </section>

        <MapSection />

        <section className="text-center py-10 text-sm text-gray-400">
          +500 clients satisfaits à Témara & Rabat
        </section>
      </main>

      <StickyWhatsAppButton />
    </>
  )
}