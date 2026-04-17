import { useState } from 'react'
import { useLanguage } from '../../../i18n/LanguageContext'
import { config } from '../../../app/config'

type Props = {
  setCarType: (type: string) => void
}

export default function HeroSection({ setCarType }: Props) {
  useLanguage()

  const [pickupLocation, setPickupLocation] = useState('Temara')
  const [customLocation, setCustomLocation] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [carType, setLocalCarType] = useState('Toutes les voitures')
  const [loading, setLoading] = useState(false)

  const finalLocation =
    pickupLocation === "other" ? customLocation : pickupLocation

  const whatsappMessage = `Bonjour Fornax Car,

Je souhaite louer une voiture :

📍 Lieu : ${finalLocation}
📅 Du : ${pickupDate}
📅 Au : ${returnDate}
🚗 Type : ${carType}

Merci !`

  const whatsappLink = `https://wa.me/${config.company.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-white pt-24 pb-20 sm:pt-28 sm:pb-24"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-24 md:pt-32">

        {/* TITLE */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Louez votre voiture à Témara en 2 minutes 🚗
        </h1>

        {/* SUBTITLE */}
        <p className="text-md md:text-lg mb-6 text-gray-200 max-w-2xl mx-auto">
          Sans caution • Livraison gratuite • Réponse WhatsApp immédiate
        </p>

        {/* TRUST */}
        <div className="flex justify-center gap-4 text-xs md:text-sm text-gray-300 mb-6 flex-wrap">
          <span>+500 clients satisfaits</span>
          <span>•</span>
          <span>Disponible 24/7</span>
          <span>•</span>
          <span>Paiement flexible</span>
        </div>

        {/* FORM */}
        <div className="bg-white text-gray-900 py-5 px-5 rounded-2xl border border-gray-200 shadow-lg w-full max-w-md md:max-w-5xl mx-auto mt-6">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setLoading(true)
              setCarType(carType)

              setTimeout(() => {
                const fleetSection = document.getElementById('fleet')
                fleetSection?.scrollIntoView({ behavior: 'smooth' })
                setLoading(false)
              }, 500)
            }}
            className="space-y-4 md:grid md:grid-cols-5 md:gap-4 md:space-y-0"
          >

            {/* LOCATION SELECT */}
            <div className="flex flex-col gap-2">
              <select
                className="border border-gray-200 p-3 rounded-xl w-full h-12 text-sm"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              >
                {/* Cities */}
                <option>Temara</option>
                <option>Rabat</option>
                <option>Casablanca</option>
                <option>Marrakech</option>
                <option>Agadir</option>
                <option>Tanger</option>

                {/* Airports */}
                <option>✈️ Casablanca Airport (CMN)</option>
                <option>✈️ Rabat Airport (RBA)</option>
                <option>✈️ Marrakech Airport (RAK)</option>
                <option>✈️ Agadir Airport (AGA)</option>
                <option>✈️ Fès Airport (FEZ)</option>

                {/* Other */}
                <option value="other">Autre (spécifier)</option>
              </select>

              {/* CUSTOM INPUT */}
              {pickupLocation === "other" && (
                <input
                  type="text"
                  placeholder="Entrez votre lieu..."
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  className="border border-gray-200 p-3 rounded-xl w-full h-12 text-sm"
                />
              )}
            </div>

            {/* PICKUP DATE */}
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="border border-gray-200 p-3 rounded-xl w-full h-12 text-sm"
            />

            {/* RETURN DATE */}
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="border border-gray-200 p-3 rounded-xl w-full h-12 text-sm"
            />

            {/* CAR TYPE */}
            <select
              value={carType}
              onChange={(e) => {
                setLocalCarType(e.target.value)
                setCarType(e.target.value)
              }}
              className="border border-gray-200 p-3 rounded-xl w-full h-12 text-sm"
            >
              <option>Toutes les voitures</option>
              <option>Economy</option>
              <option>SUV</option>
              <option>Luxury</option>
            </select>

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition h-12 text-sm font-semibold"
            >
              {loading ? "Recherche..." : "Voir les voitures"}
            </button>

          </form>
        </div>

        {/* CTA */}
        <div className="mt-8 flex gap-4 justify-center flex-wrap">

          <a
            href="#fleet"
            className="bg-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Voir les voitures
          </a>

          <a
            href={whatsappLink}
            target="_blank"
            className="bg-green-500 px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition flex items-center gap-2"
          >
            📱 Réserver maintenant
          </a>

        </div>

      </div>
    </section>
  )
}