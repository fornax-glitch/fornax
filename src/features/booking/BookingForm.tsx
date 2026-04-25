import { useState, useMemo, useEffect } from 'react'
import { generateWhatsAppLink } from '../../utils/whatsapp'
import { useLanguage } from '../../i18n/LanguageContext'
import { fleet } from '../cars/fleet'
import { isAvailable } from '../../utils/availability'
import { supabase } from '../../lib/supabaseClient' // ✅ ADDED

export default function BookingForm() {
  useLanguage()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [car, setCar] = useState('')
  const [pickup, setPickup] = useState('')
  const [returnDate, setReturnDate] = useState('')

  useEffect(() => {
    const updateCar = () => {
      const savedCar = localStorage.getItem("selectedCar")
      if (savedCar) setCar(savedCar)
    }

    updateCar()
    window.addEventListener("carSelected", updateCar)
    return () => window.removeEventListener("carSelected", updateCar)
  }, [])

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

  // ✅ UPDATED FUNCTION (CORE CHANGE)
  const handleBooking = async () => {
    if (!car || !pickup || !returnDate) {
      alert("Veuillez sélectionner une voiture et les dates")
      return
    }

    // ================= SAVE TO SUPABASE =================
    const { error } = await supabase.from("bookings").insert([
      {
        name: name || "Non renseigné",
        phone: phone || "Non renseigné",
        car,
        date: pickup,
        status: "pending"
      }
    ])

    if (error) {
      alert(error.message)
      return
    }

    // ================= WHATSAPP (UNCHANGED) =================
    const message = `Bonjour 👋

Je souhaite réserver une voiture chez Fornax Car 🇲🇦

🚗 Voiture: ${car}
📍 Zone: Témara / Rabat / Casablanca
📅 Du: ${pickup}
📅 Au: ${returnDate}
👤 Nom: ${name || "Non renseigné"}
📱 Téléphone: ${phone || "Non renseigné"}
💰 Total estimé: ${total} MAD

Merci de me confirmer la disponibilité 🙏`

    window.open(generateWhatsAppLink(message))

    // OPTIONAL RESET (SAFE)
    setName('')
    setPhone('')
    setPickup('')
    setReturnDate('')
  }

  return (
    <section id="booking" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-10">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Réservez votre voiture en 10 secondes 🚗
          </h2>

          <p className="text-gray-600 mt-3">
            Témara • Rabat • Casablanca • Aéroport partout au Maroc
          </p>

          <p className="text-green-600 font-semibold mt-2">
            ✔ Sans carte bancaire • ✔ Réponse en 5 minutes • ✔ Livraison rapide
          </p>

        </div>

        {/* FORM */}
        <div className="bg-white border rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="Nom complet (optionnel)"
            className="p-4 border rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Téléphone (optionnel)"
            className="p-4 border rounded-xl"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="date"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="p-4 border rounded-xl w-full bg-white text-black"
          />

          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="p-4 border rounded-xl w-full bg-white text-black"
          />

          <select
            className="p-4 border rounded-xl md:col-span-2"
            value={car}
            onChange={(e) => setCar(e.target.value)}
          >
            <option value="">Choisir une voiture</option>

            {fleet.map((carItem) => (
              <option
                key={carItem.id}
                value={`${carItem.brand} ${carItem.model}`}
                disabled={!isAvailable(carItem.id, pickup)}
              >
                {carItem.brand} {carItem.model} — {carItem.pricePerDay} MAD/jour
              </option>
            ))}
          </select>

          {/* PRICE */}
          {total > 0 && (
            <div className="md:col-span-2 text-center bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Prix estimé</p>
              <p className="text-3xl font-bold text-green-600">
                {total} MAD
              </p>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleBooking}
            className="md:col-span-2 bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl font-semibold text-lg shadow-md"
          >
            🚗 Réserver instantanément sur WhatsApp
          </button>

          {/* TRUST */}
          <p className="md:col-span-2 text-center text-xs text-gray-500">
            Aucun paiement en ligne • Annulation gratuite • Support 24/7
          </p>

        </div>
      </div>
    </section>
  )
}