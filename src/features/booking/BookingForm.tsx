import { useState, useMemo, useEffect } from 'react'
import { generateWhatsAppLink } from '../../utils/whatsapp'
import { useLanguage } from '../../i18n/LanguageContext'
import { fleet } from '../cars/fleet'
import { isAvailable } from '../../utils/availability'

export default function BookingForm() {
  const { t } = useLanguage()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [car, setCar] = useState('')
  const [pickup, setPickup] = useState('')
  const [returnDate, setReturnDate] = useState('')

  // ✅ Load + listen for selected car
  useEffect(() => {
    const updateCar = () => {
      const savedCar = localStorage.getItem("selectedCar")
      if (savedCar) {
        setCar(savedCar)
      }
    }

    updateCar()
    window.addEventListener("carSelected", updateCar)

    return () => {
      window.removeEventListener("carSelected", updateCar)
    }
  }, [])

  // ✅ Price calculation
  const total = useMemo(() => {
    if (!pickup || !returnDate || !car) return 0

    const selectedCar = fleet.find(
      (c) => `${c.brand} ${c.model}` === car
    )

    if (!selectedCar) return 0

    const start = new Date(pickup)
    const end = new Date(returnDate)

    const diff =
      (end.getTime() - start.getTime()) /
      (1000 * 60 * 60 * 24)

    return diff > 0 ? diff * selectedCar.pricePerDay : 0
  }, [pickup, returnDate, car])

  // ✅ Booking handler
  const handleBooking = () => {
    if (!name || !phone || !car || !pickup || !returnDate) {
      alert("Please fill all fields")
      return
    }

    const message = `Bonjour, je souhaite réserver ${car} à Temara du ${pickup} au ${returnDate}.

Nom: ${name}
Téléphone: ${phone}
Total: ${total} MAD`;

    window.open(generateWhatsAppLink(message))
  }

  return (
    <section
      id="booking"
      data-aos="fade-up"
      className="py-24 bg-white"
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t.booking.title}
          </h2>
          <p className="text-gray-500 mt-3">
            Réservez votre voiture en quelques secondes
          </p>
        </div>

        {/* FORM CARD */}
        <div
          data-aos="zoom-in"
          className="bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 grid md:grid-cols-2 gap-6"
        >

          {/* NAME */}
          <input
            type="text"
            placeholder={t.booking.name}
            className="p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* PHONE */}
          <input
            type="text"
            placeholder={t.booking.phone}
            className="p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* PICKUP DATE */}
          <input
            type="date"
            className="p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />

          {/* RETURN DATE */}
          <input
            type="date"
            className="p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />

          {/* CAR SELECT */}
          <select
            className="p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition md:col-span-2"
            value={car}
            onChange={(e) => setCar(e.target.value)}
          >
            <option value="">{t.booking.car}</option>

            {fleet.map((carItem) => (
              <option
                key={carItem.id}
                value={`${carItem.brand} ${carItem.model}`}
                disabled={!isAvailable(carItem.id, pickup)}
              >
                {carItem.brand} {carItem.model}
                {!isAvailable(carItem.id, pickup) ? ' (Unavailable)' : ''}
              </option>
            ))}
          </select>

          {/* TOTAL PRICE */}
          {total > 0 && (
            <div className="md:col-span-2 bg-green-50 border border-green-100 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500">
                {t.booking.totalPrice}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {total} MAD
              </p>
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={handleBooking}
            className="md:col-span-2 bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>📱</span>
            {t.booking.button}
          </button>

          {/* TRUST TEXT */}
          <div className="md:col-span-2 text-center text-xs text-gray-500 space-y-1">
            <p>Vos informations sont sécurisées</p>
            <p>Réponse en moins de 5 minutes</p>
          </div>

        </div>
      </div>
    </section>
  )
}