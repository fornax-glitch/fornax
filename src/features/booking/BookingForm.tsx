import { useState, useMemo, useEffect } from "react"
import { generateWhatsAppLink } from "../../utils/whatsapp"
import { fleet } from "../cars/fleet"
import { supabase } from "../../lib/supabaseClient"

export default function BookingForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [car, setCar] = useState("")
  const [pickup, setPickup] = useState("")
  const [returnDate, setReturnDate] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("selectedCar")
    if (saved) setCar(saved)
  }, [])

  // ================= PRICE + DAYS =================
  const { total, days } = useMemo(() => {
    if (!pickup || !returnDate || !car) return { total: 0, days: 0 }

    const selected = fleet.find(
      (c) => `${c.brand} ${c.model}` === car
    )

    if (!selected) return { total: 0, days: 0 }

    const start = new Date(pickup).getTime()
    const end = new Date(returnDate).getTime()

    const diffDays = (end - start) / (1000 * 60 * 60 * 24)

    if (diffDays <= 0) return { total: 0, days: 0 }

    return {
      days: diffDays,
      total: diffDays * selected.pricePerDay
    }
  }, [pickup, returnDate, car])

  // ================= FINAL BOOKING =================
  const handleBooking = async () => {
    if (!car || !pickup || !returnDate) {
      alert("Please fill all fields")
      return
    }

    // ❗ NO manual conflict check (DB trigger handles it)

    const { error } = await supabase.from("bookings").insert([
      {
        name: name || "N/A",
        phone: phone || "N/A",
        car,
        pickup_date: pickup,
        return_date: returnDate,
        total_price: total,
        days: Math.round(days),
        status: "pending"
      }
    ])

    if (error) {
      alert(error.message) // will show trigger conflict message too
      return
    }

    window.open(
      generateWhatsAppLink(`Booking confirmed 🚗

Car: ${car}
From: ${pickup}
To: ${returnDate}
Days: ${Math.round(days)}
Total: ${total} MAD`)
    )

    setName("")
    setPhone("")
    setPickup("")
    setReturnDate("")
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center mb-8">
          Book Your Car 🚗
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="p-4 border rounded" />
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" className="p-4 border rounded" />

          <input type="date" value={pickup} onChange={e => setPickup(e.target.value)} className="p-4 border rounded" />
          <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} className="p-4 border rounded" />

          <select className="p-4 border rounded md:col-span-2" value={car} onChange={e => setCar(e.target.value)}>
            <option value="">Select Car</option>
            {fleet.map(c => (
              <option key={c.id} value={`${c.brand} ${c.model}`}>
                {c.brand} {c.model} - {c.pricePerDay} MAD
              </option>
            ))}
          </select>

          {total > 0 && (
            <div className="md:col-span-2 text-center bg-green-50 p-4 rounded">
              <h3 className="text-2xl font-bold">
                {total} MAD ({Math.round(days)} days)
              </h3>
            </div>
          )}

          <button
            onClick={handleBooking}
            className="md:col-span-2 bg-green-500 text-white p-4 rounded"
          >
            Reserve Now
          </button>

        </div>
      </div>
    </section>
  )
}