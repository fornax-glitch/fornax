import type { Car } from '../../types'

export default function CarCard({ car, index = 0 }: { car: Car, index?: number }) {

  const carName = `${car.brand} ${car.model}`

  const handleSelectCar = () => {
    localStorage.setItem("selectedCar", carName)
    window.dispatchEvent(new Event("carSelected"))

    const bookingSection = document.getElementById("booking")
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const isBestChoice = index === 1 || car.popular

  return (
    <div
      data-aos="zoom-in"
      className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden group">

        {/* BEST CHOICE */}
        {isBestChoice && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow">
            ⭐ Meilleur choix
          </span>
        )}

        {car.popular && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full z-10 shadow">
            🔥 Populaire
          </span>
        )}

        <img
          src={car.image}
          alt={`${carName} location voiture Temara Rabat`}
          className="w-full h-52 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* AVAILABILITY */}
        <span className="absolute bottom-3 left-3 text-white text-xs bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm">
          ⚡ Disponible aujourd’hui
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">

        {/* TITLE */}
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
          {carName}
        </h3>

        {/* BENEFIT */}
        <p className="text-sm text-green-600 font-medium">
          {car.category === 'Economy' && '💰 Économique – parfait pour petit budget'}
          {car.category === 'Compact' && '🚗 Confort & facile à conduire'}
          {car.category === 'SUV' && '🔥 Idéal famille & longs trajets'}
        </p>

        {/* RATING */}
        <div className="text-sm text-gray-500 flex items-center gap-2">
          ⭐ {car.rating?.toFixed(1) ?? 4.8} • {car.rentals ?? 120} locations
        </div>

        {/* FEATURES */}
        <div className="flex gap-2 flex-wrap text-xs">
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            🚗 {car.features.transmission}
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            ⛽ {car.features.fuel}
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            👥 {car.features.seats}
          </span>
        </div>

        {/* PRICE + CTA */}
        <div className="flex items-center justify-between pt-2">

          <div>
            <p className="text-3xl font-bold text-green-600 leading-none">
              {car.pricePerDay} MAD
            </p>
            <p className="text-xs text-gray-500 mt-1">
              par jour
            </p>
          </div>

          <button
            onClick={handleSelectCar}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Réserver en 30 sec
          </button>

        </div>

      </div>
    </div>
  )
}