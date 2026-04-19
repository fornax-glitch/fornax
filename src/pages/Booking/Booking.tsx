import BookingForm from '../../features/booking/BookingForm'
import { Helmet } from "react-helmet-async"

export default function Booking() {
  return (
    <>
      <Helmet>
        <title>Réservation voiture - Fornax Car</title>
        <meta name="description" content="Réservez votre voiture rapidement avec Fornax Car via WhatsApp." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <main className="pt-24 max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-10">
          Réservation
        </h1>

        <BookingForm />
      </main>
    </>
  )
}