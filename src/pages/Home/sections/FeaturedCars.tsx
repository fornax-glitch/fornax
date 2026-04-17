import { fleet } from '../../../features/cars/fleet'
import CarCard from '../../../features/cars/CarCard'
import { useLanguage } from '../../../i18n/LanguageContext'

type Props = {
  carType: string
}

export default function FeaturedCars({ carType }: Props) {
  const { t } = useLanguage()

  const featured = fleet.slice(0, 3)

  const filteredCars =
    carType === 'Toutes les voitures'
      ? featured
      : featured.filter((car) => car.category === carType)

  return (
    <section className="py-28 border border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          {t.featuredCars.title}
        </h2>

        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
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