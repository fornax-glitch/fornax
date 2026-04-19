import { fleet } from '../../../features/cars/fleet'
import CarCard from '../../../features/cars/CarCard'

type Props = {
  carType: string
}

export default function FleetSection({ carType }: Props) {

  const filteredCars =
    carType === 'Toutes les voitures'
      ? fleet
      : fleet.filter((car) => car.category === carType)

  return (
    <section id="fleet" className="py-24 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-12">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Location voiture à Témara, Rabat & Casablanca
          </h2>

          <p className="text-gray-600 mt-3 text-sm md:text-base max-w-xl mx-auto">
            Sans caution • Livraison gratuite • Disponible 24/7 • Réservation rapide via WhatsApp
          </p>

          {/* TRUST */}
          <p className="text-green-600 font-semibold mt-3">
            ⭐ +500 clients satisfaits • Réponse en moins de 5 minutes
          </p>

        </div>

        {/* GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {filteredCars.map((car, index) => (
            <div
              key={car.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CarCard car={car} index={index} />
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}