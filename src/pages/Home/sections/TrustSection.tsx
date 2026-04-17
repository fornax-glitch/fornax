export default function TrustSection() {

  const trustItems = [
    {
      icon: '🛡️',
      title: 'Assurance incluse',
      description: 'Couverture complète pour votre tranquillité'
    },
    {
      icon: '🚚',
      title: 'Livraison gratuite à Témara',
      description: 'Service de livraison à domicile'
    },
    {
      icon: '💬',
      title: 'Support WhatsApp 24/7',
      description: 'Assistance disponible à tout moment'
    },
    {
      icon: '💰',
      title: 'Sans caution',
      description: 'Option disponible pour certains véhicules'
    }
  ]

  return (
    <section className="py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="text-center rounded-3xl border border-gray-100 p-6 shadow-sm transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 text-center">
  <h2 className="text-2xl font-bold mb-6">Avis Clients ⭐</h2>

  <div className="space-y-4 text-gray-700">
    <p>⭐⭐⭐⭐⭐ "Réservation en 2 minutes via WhatsApp, voiture déjà prête à mon arrivée" — Karim (Temara)</p>
    <p>⭐⭐⭐⭐⭐ "Voiture propre livrée à l'aéroport de Casablanca à l'heure, je recommande" — Sara(Casablanca)</p>
    <p>⭐⭐⭐⭐⭐ "Très professionnel, réponse rapide et véhicule en excellent état" — Yassine(Rabat)</p>
  </div>
</div>
    </section>
  )
}