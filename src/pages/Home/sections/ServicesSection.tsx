import { config } from '../../../app/config'

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nos services premium 🚀
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Profitez de services exclusifs pour une expérience de location simple et confortable au Maroc.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* AIRPORT TRANSFER */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">
              ✈️ Transfert Aéroport
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Nous vous récupérons directement à l'aéroport de Casablanca, Rabat ou Marrakech.
            </p>

            <a
              href="/services/airport-transfer"
              className="text-blue-600 font-semibold hover:underline"
            >
              En savoir plus →
            </a>
          </div>

          {/* AIRPORT DELIVERY */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">
              🚗 Livraison Aéroport
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Votre voiture vous attend dès votre arrivée à l'aéroport.
            </p>

            <a
              href="/services/airport-delivery"
              className="text-blue-600 font-semibold hover:underline"
            >
              En savoir plus →
            </a>
          </div>

          {/* PRIVATE DRIVER */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">
              👨‍✈️ Chauffeur privé
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Profitez d’un chauffeur professionnel pour vos déplacements au Maroc.
            </p>

            <a
              href="/services/private-driver"
              className="text-blue-600 font-semibold hover:underline"
            >
              En savoir plus →
            </a>
          </div>

        </div>

        {/* 🔥 BIG CTA */}
        <div className="text-center mt-12">
          <a
            href={config.company.whatsappLink}
            target="_blank"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            📱 Réserver maintenant sur WhatsApp
          </a>
        </div>

      </div>
    </section>
  )
}