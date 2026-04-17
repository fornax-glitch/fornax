import { Helmet } from "react-helmet-async"
import { config } from '../../app/config'

export default function AirportDelivery() {

  const whatsappMessage = `Bonjour Fornax Car,

Je souhaite une livraison de voiture à l'aéroport :

✈️ Aéroport : 
📅 Date :
🚗 Type de voiture :

Merci !`

  const whatsappLink = `https://wa.me/${config.company.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <>
      <Helmet>
        <title>Airport Car Delivery Morocco | Casablanca, Rabat, Marrakech | Fornax Car</title>

        <meta
          name="description"
          content="Car delivery directly at Moroccan airports: Casablanca CMN, Rabat RBA, Marrakech RAK, Agadir AGA, Fès FEZ. Fast, reliable and WhatsApp booking."
        />

        <meta
          name="keywords"
          content="airport car delivery morocco, car rental airport casablanca, rabat airport car delivery, marrakech airport rental, agadir airport car hire"
        />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Airport Car Delivery Morocco | Fornax Car" />
        <meta property="og:description" content="Get your rental car delivered directly to Moroccan airports." />
      </Helmet>

      <main className="pt-20 max-w-5xl mx-auto px-6">

        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Airport Car Delivery in Morocco ✈️🚗
        </h1>

        <p className="text-gray-600 mb-6">
          Your rental car is delivered directly to the airport when you land. No waiting, no shuttle, no stress.
        </p>

        <h2 className="text-xl font-semibold mb-3">
          ✈️ Airports we serve
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
          <li>Casablanca Mohammed V Airport (CMN)</li>
          <li>Rabat-Salé Airport (RBA)</li>
          <li>Marrakech Menara Airport (RAK)</li>
          <li>Agadir Al Massira Airport (AGA)</li>
          <li>Fès Saïss Airport (FEZ)</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">
          🚗 Why choose airport delivery?
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
          <li>Car ready at arrival gate</li>
          <li>No queues, no paperwork delays</li>
          <li>Perfect for tourists & business travelers</li>
          <li>Instant WhatsApp confirmation</li>
          <li>24/7 availability</li>
        </ul>

        <div className="bg-gray-100 p-6 rounded-2xl text-center">
          <h3 className="text-xl font-semibold mb-3">
            Book your airport delivery now 🚀
          </h3>

          <a
            href={whatsappLink}
            className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold inline-block"
          >
            📱 Request Delivery via WhatsApp
          </a>
        </div>

      </main>
    </>
  )
}