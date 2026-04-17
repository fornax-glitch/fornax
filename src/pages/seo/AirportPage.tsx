import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { moroccoSEO } from "../../data/seo/morocco"

export default function AirportPage() {
  const { airport } = useParams()
  const data = moroccoSEO.airports.find((a) => a.slug === airport)

  if (!data) {
    return <div className="p-10 text-center text-gray-500">Airport not found</div>
  }

  const brand = moroccoSEO.brand
  const whatsappLink = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(data.whatsappMessage)}`
  const canonicalUrl = `${brand.baseUrl}/location-voiture-aeroport/${data.slug}`

  const relatedCity = moroccoSEO.cities.find(
    (c) => c.airportSlug === data.slug
  )

  const otherAirports = moroccoSEO.airports.filter((a) => a.slug !== data.slug)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CarRental",
    "name": brand.name,
    "areaServed": `${data.name} (${data.iata})`,
    "telephone": `+${brand.whatsapp}`,
    "email": brand.email,
    "url": canonicalUrl,
    "serviceType": "Airport Car Rental",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.city,
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": data.geo.lat,
      "longitude": data.geo.lng
    }
  }

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map((faq: { q: string; a: string }) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="keywords" content={data.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* LOCAL SEO */}
        <meta name="geo.region" content="MA" />
        <meta name="geo.placename" content={`${data.city}, Morocco`} />
        <meta name="geo.position" content={`${data.geo.lat}; ${data.geo.lng}`} />
        <meta name="ICBM" content={`${data.geo.lat}, ${data.geo.lng}`} />

        {/* OPEN GRAPH */}
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />

        {/* STRUCTURED DATA */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <main className="pt-20 max-w-5xl mx-auto px-6 pb-20">

        {/* HERO */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Location voiture Aéroport {data.city} ({data.iata}) ✈️
        </h1>
        <p className="text-gray-600 text-lg mb-8">{data.description}</p>

        {/* CTA */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg inline-block transition mb-12"
        >
          📱 Réserver via WhatsApp
        </a>

        {/* HOW IT WORKS */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Comment ça marche à l'aéroport {data.iata} ?
          </h2>
          <ol className="space-y-4 text-gray-700">
            <li className="flex gap-3">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">1</span>
              <span>Envoyez un message WhatsApp avec votre date et heure d'arrivée</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">2</span>
              <span>Confirmez votre véhicule et le prix en quelques secondes</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">3</span>
              <span>Votre voiture vous attend à la sortie du terminal à votre arrivée</span>
            </li>
          </ol>
        </section>

        {/* WHY US */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Pourquoi Fornax Car à l'aéroport {data.iata} ?
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>✅ Livraison directe à la sortie de l'aéroport</li>
            <li>✅ Sans caution sur sélection de véhicules</li>
            <li>✅ Réservation WhatsApp instantanée</li>
            <li>✅ Véhicules récents et assurance incluse</li>
            <li>✅ Disponible 24h/7j</li>
          </ul>
        </section>

        {/* ZONES */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Zones desservies depuis l'aéroport {data.iata}
          </h2>
          <ul className="grid grid-cols-2 gap-3">
            {data.zones.map((z: string) => (
              <li key={z} className="bg-gray-50 border rounded-lg px-4 py-2 text-gray-700">
                📍 {z}
              </li>
            ))}
          </ul>
        </section>

        {/* BOOKING CTA BLOCK */}
        <section className="mb-12 bg-green-50 border border-green-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">
            Réservez votre voiture à {data.city} maintenant
          </h2>
          <p className="text-gray-600 mb-6">
            Réponse WhatsApp en moins de 5 minutes · Sans caution · Livraison aéroport {data.iata}
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg inline-block transition"
          >
            📱 Réserver via WhatsApp
          </a>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Questions fréquentes — Aéroport {data.iata}
          </h2>
          <div className="space-y-4">
            {data.faqs.map((faq: { q: string; a: string }, i: number) => (
              <div key={i} className="border rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-2">❓ {faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CITY LINK */}
        {relatedCity && (
          <section className="mb-12 border-t pt-8">
            <h2 className="text-xl font-bold mb-4">
              Location voiture à {data.city}
            </h2>
            <p className="text-gray-600 mb-4">
              Vous souhaitez explorer {data.city} et la région ? Découvrez toutes nos offres.
            </p>
            <Link
              to={`/location-voiture/${relatedCity.slug}`}
              className="text-blue-600 font-semibold hover:underline"
            >
              Voir location voiture {data.city} →
            </Link>
          </section>
        )}

        {/* SERVICES */}
        <section className="mb-12 border-t pt-8">
          <h2 className="text-xl font-bold mb-4">Nos services à l'aéroport {data.iata}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/services/airport-transfer"
              className="block border rounded-xl p-4 hover:bg-gray-50 transition"
            >
              ✈️ <span className="font-semibold">Transfert aéroport</span>
              <p className="text-sm text-gray-500 mt-1">Prise en charge directe</p>
            </Link>
            <Link
              to="/services/airport-delivery"
              className="block border rounded-xl p-4 hover:bg-gray-50 transition"
            >
              🚗 <span className="font-semibold">Livraison aéroport</span>
              <p className="text-sm text-gray-500 mt-1">Voiture livrée à l'arrivée</p>
            </Link>
            <Link
              to="/services/private-driver"
              className="block border rounded-xl p-4 hover:bg-gray-50 transition"
            >
              🧑‍✈️ <span className="font-semibold">Chauffeur privé</span>
              <p className="text-sm text-gray-500 mt-1">Déplacements confortables</p>
            </Link>
          </div>
        </section>

        {/* OTHER AIRPORTS */}
        <section className="border-t pt-8">
          <h2 className="text-xl font-bold mb-4">
            Autres aéroports au Maroc
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherAirports.map((a) => (
              <Link
                key={a.slug}
                to={`/location-voiture-aeroport/${a.slug}`}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-700 transition"
              >
                ✈️ {a.iata} — {a.city}
              </Link>
            ))}
          </div>
        </section>

      </main>
    </>
  )
}