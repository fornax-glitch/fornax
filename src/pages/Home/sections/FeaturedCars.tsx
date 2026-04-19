import { fleet } from '../../../features/cars/fleet'
import CarCard from '../../../features/cars/CarCard'
import { useLanguage } from '../../../i18n/LanguageContext'

type Props = {
  carType: string
}

export default function FeaturedCars({ carType }: Props) {
  const {  } = useLanguage()

  const featured = fleet.slice(0, 3)

  const filteredCars =
    carType === 'Toutes les voitures'
      ? featured
      : featured.filter((car) => car.category === carType)

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          🚗 Voitures disponibles à Témara, Rabat & Casablanca
        </h2>

        {/* SUBTITLE */}
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Réservez votre voiture en moins de 2 minutes • Sans caution • Livraison rapide à domicile ou aéroport
        </p>

        {/* URGENCY */}
        <p className="text-center text-green-600 font-semibold mb-12">
          🔥 Forte demande aujourd’hui — plusieurs voitures presque réservées
        </p>

        {/* GRID */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {filteredCars.map((car, index) => (
            <div key={car.id} data-aos="fade-up" data-aos-delay={index * 100}>
              <CarCard car={car} index={index} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}