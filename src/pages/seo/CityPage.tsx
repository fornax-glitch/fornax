import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { moroccoSEO } from "../../data/seo/morocco"

export default function CityPage() {
  const { city } = useParams()
  const data = moroccoSEO.cities.find((c) => c.slug === city)

  if (!data) {
    return <div className="p-10 text-center text-gray-500">City not found</div>
  }

  const brand = moroccoSEO.brand
  const whatsappLink = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(data.whatsappMessage)}`
  const canonicalUrl = `${brand.baseUrl}/location-voiture/${data.slug}`

  const relatedAirport = moroccoSEO.airports.find((a) => a.slug === data.airportSlug)

  const otherCities = moroccoSEO.cities.filter((c) => c.slug !== data.slug).slice(0, 5)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CarRental",
    "name": brand.name,
    "areaServed": data.name,
    "telephone": `+${brand.whatsapp}`,
    "email": brand.email,
    "url": canonicalUrl,
    "serviceType": "Car Rental",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.name,
      "addressRegion": data.region,
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
        <meta name="keywords" content={data.seoKeywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* LOCAL SEO */}
        <meta name="geo.region" content="MA" />
        <meta name="geo.placename" content={`${data.name}, Morocco`} />
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
          Location voiture {data.name} 🚗
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

        {/* WHY US */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Pourquoi choisir Fornax Car à {data.name} ?
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>✅ Sans caution sur sélection de véhicules</li>
            <li>✅ Livraison gratuite à domicile et à l'aéroport</li>
            <li>✅ Réservation WhatsApp en moins de 2 minutes</li>
            <li>✅ Véhicules récents et assurance incluse</li>
            <li>✅ Support disponible 24h/7j</li>
          </ul>
        </section>

        {/* ZONES */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Zones desservies à {data.name}
          </h2>
          <ul className="grid grid-cols-2 gap-3">
            {data.zones.map((z: string) => (
              <li key={z} className="bg-gray-50 border rounded-lg px-4 py-2 text-gray-700">
                📍 {z}
              </li>
            ))}
          </ul>
        </section>

        {/* AIRPORT LINK */}
        {relatedAirport && (
          <section className="mb-12 bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-2">
              ✈️ Location voiture Aéroport de {data.name}
            </h2>
            <p className="text-gray-600 mb-4">
              Vous arrivez à {relatedAirport.name} ({relatedAirport.iata}) ?
              Votre voiture vous attend à la sortie du terminal.
            </p>
            <Link
              to={`/location-voiture-aeroport/${data.airportSlug}`}
              className="text-blue-600 font-semibold hover:underline"
            >
              Voir la page aéroport {relatedAirport.iata} →
            </Link>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Questions fréquentes — Location voiture {data.name}
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

        {/* SERVICES INTERNAL LINKS */}
        <section className="mb-12 border-t pt-8">
          <h2 className="text-xl font-bold mb-4">
            Nos services à {data.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/services/airport-transfer"
              className="block border rounded-xl p-4 hover:bg-gray-50 transition"
            >
              ✈️ <span className="font-semibold">Transfert aéroport</span>
              <p className="text-sm text-gray-500 mt-1">Depuis/vers {data.airports[0]}</p>
            </Link>
            <Link
              to="/services/airport-delivery"
              className="block border rounded-xl p-4 hover:bg-gray-50 transition"
            >
              🚗 <span className="font-semibold">Livraison aéroport</span>
              <p className="text-sm text-gray-500 mt-1">Voiture livrée à votre arrivée</p>
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

        {/* OTHER CITIES */}
        <section className="border-t pt-8">
          <h2 className="text-xl font-bold mb-4">
            Location voiture dans d'autres villes du Maroc
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                to={`/location-voiture/${c.slug}`}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-700 transition"
              >
                {c.name}
              </Link>
            ))}
            <Link
              to="/fleet"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition"
            >
              Voir toute la flotte →
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}