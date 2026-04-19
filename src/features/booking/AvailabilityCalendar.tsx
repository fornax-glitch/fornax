  import { useState } from 'react'
  import DatePicker from 'react-datepicker'
  import "react-datepicker/dist/react-datepicker.css"

  export default function AvailabilityCalendar() {
    const [startDate, setStartDate] = useState<Date | null>(new Date())

    return (
      <section className="py-28 text-center">

        <h2 className="text-3xl font-bold mb-6">
          Check Availability
        </h2>

        <div className="flex justify-center">
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            className="border p-3 rounded"
          />
        </div>

      </section>
    )
  }