import { fleet } from '../../../features/cars/fleet'
import CarCard from '../../../features/cars/CarCard'
import { useLanguage } from '../../../i18n/LanguageContext'

type Props = {
  carType: string
}

export default function FleetSection({ carType }: Props) {
  const { t } = useLanguage()

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
            {t.fleet.title}
          </h2>
          <p className="text-gray-500 mt-3 text-sm md:text-base">
            Choisissez le véhicule parfait pour votre voyage
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
              <CarCard car={car} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}