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
        <title>Fornax Car - Location de voitures à Témara</title>
        <meta name="description" content="Location de voitures à Témara et Rabat. Réservation rapide via WhatsApp avec Fornax Car." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <main>
        <HeroSection setCarType={setCarType} />
        <TrustSection />
        <FeaturedCars carType={carType} />
        <FleetSection carType={carType} />
        <ServicesSection />
        <BookingForm />
        <MapSection />
      </main>

      <StickyWhatsAppButton />
    </>
  )
}