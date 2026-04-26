import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { supabase } from '../../lib/supabaseClient'

type Booking = {
  pickup_date: string
  return_date: string
  status: string
  car: string
}

export default function AvailabilityCalendar() {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  async function fetchBookings() {
    setLoading(true)

    const { data } = await supabase
      .from("bookings")
      .select("pickup_date, return_date, status, car")

    if (data) setBookings(data)

    setLoading(false)
  }

  // 🔥 check if date is blocked
  function isDateBlocked(date: Date) {
    return bookings.some((b) => {
      if (b.status === "cancelled") return false

      const start = new Date(b.pickup_date)
      const end = new Date(b.return_date)

      return date >= start && date <= end
    })
  }

  return (
    <section className="py-28 text-center">

      <h2 className="text-3xl font-bold mb-6">
        Check Availability
      </h2>

      {loading && <p>Loading calendar...</p>}

      {!loading && (
        <div className="flex justify-center">

          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            filterDate={(date) => !isDateBlocked(date)}

            dayClassName={(date) =>
              isDateBlocked(date)
                ? "bg-red-200 text-red-600"
                : ""
            }

            className="border p-3 rounded"
          />

        </div>
      )}

    </section>
  )
}