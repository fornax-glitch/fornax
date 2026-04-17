import { Helmet } from "react-helmet-async"
import { config } from '../../app/config'

export default function AirportTransfer() {

  const whatsappLink = `https://wa.me/${config.company.whatsappNumber}?text=${encodeURIComponent(
    "Bonjour, je souhaite réserver un transfert aéroport au Maroc."
  )}`

  return (
    <>
      <Helmet>
        <title>Airport Transfer Morocco | Casablanca, Rabat, Marrakech | Fornax Car</title>

        <meta
          name="description"
          content="Airport transfer in Morocco: Casablanca CMN, Rabat RBA, Marrakech RAK, Agadir AGA, Fès FEZ. Fast, private and reliable service with Fornax Car."
        />

        <meta
          name="keywords"
          content="airport transfer morocco, casablanca airport transfer, rabat airport transfer, marrakech airport transfer, agadir airport taxi"
        />

        <meta name="robots" content="index, follow" />
      </Helmet>

      <main className="pt-20 max-w-5xl mx-auto px-6">

        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Airport Transfer in Morocco ✈️
        </h1>

        <p className="text-gray-600 mb-6">
          Book a private airport transfer anywhere in Morocco. We cover all major airports with fast pickup and professional drivers.
        </p>

        <h2 className="text-xl font-semibold mb-3">
          ✈️ Airports Covered
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
          <li>Casablanca Mohammed V Airport (CMN)</li>
          <li>Rabat-Salé Airport (RBA)</li>
          <li>Marrakech Menara Airport (RAK)</li>
          <li>Agadir Al Massira Airport (AGA)</li>
          <li>Fès Saïss Airport (FEZ)</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">
          🚗 Why choose Fornax Car?
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
          <li>Private driver waiting at arrival</li>
          <li>No delays, no stress</li>
          <li>Fixed transparent pricing</li>
          <li>WhatsApp instant booking</li>
          <li>Available 24/7</li>
        </ul>

        <div className="bg-gray-100 p-6 rounded-2xl text-center">
          <h3 className="text-xl font-semibold mb-3">
            Book your airport transfer now
          </h3>

          <a
            href={whatsappLink}
            className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold inline-block"
          >
            📱 Book via WhatsApp
          </a>
        </div>

      </main>
    </>
  )
}