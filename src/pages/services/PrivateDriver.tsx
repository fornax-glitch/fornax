import { Helmet } from "react-helmet-async"
import { config } from '../../app/config'

export default function PrivateDriver() {

  const whatsappLink = `https://wa.me/${config.company.whatsappNumber}?text=${encodeURIComponent(
    "Bonjour, je souhaite réserver un chauffeur privé au Maroc."
  )}`

  return (
    <>
      <Helmet>
        <title>Private Driver Morocco | Chauffeur Service Rabat, Casablanca | Fornax Car</title>

        <meta
          name="description"
          content="Professional private driver service in Morocco. Available in Casablanca, Rabat, Marrakech, Agadir, and Fès. Luxury, comfort and reliability."
        />

        <meta
          name="keywords"
          content="private driver morocco, chauffeur service casablanca, driver rabat, luxury driver marrakech, chauffeur maroc"
        />

        <meta name="robots" content="index, follow" />
      </Helmet>

      <main className="pt-20 max-w-5xl mx-auto px-6">

        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Private Driver Service in Morocco 👨‍✈️
        </h1>

        <p className="text-gray-600 mb-6">
          Enjoy a premium chauffeur service across Morocco. Travel in comfort with professional drivers available 24/7.
        </p>

        <h2 className="text-xl font-semibold mb-3">
          🌍 Available cities
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
          <li>Casablanca</li>
          <li>Rabat</li>
          <li>Marrakech</li>
          <li>Agadir</li>
          <li>Fès</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">
          ✨ Why choose our chauffeur service?
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
          <li>Professional licensed drivers</li>
          <li>Luxury & comfort vehicles</li>
          <li>Airport pickup included</li>
          <li>Business & tourism friendly</li>
          <li>24/7 availability</li>
        </ul>

        <div className="bg-gray-100 p-6 rounded-2xl text-center">
          <h3 className="text-xl font-semibold mb-3">
            Book your private driver now
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