import FleetSection from '../Home/sections/FleetSection'
import StickyWhatsAppButton from '../../components/StickyWhatsAppButton'
import { Helmet } from "react-helmet-async";

export default function Fleet() {
  return (
    <>
      <Helmet>
        <title>Notre Flotte - Fornax Car</title>
        <meta name="description" content="Découvrez notre flotte de voitures disponibles à la location à Témara et Rabat." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <main className="pt-20">
        <h1 className="text-3xl font-bold text-center mb-10">
          Notre Flotte
        </h1>

        <FleetSection carType="Toutes les voitures" />
      </main>

      <StickyWhatsAppButton />
    </>
  )
}