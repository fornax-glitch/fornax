import type { Booking } from '../types'

export const saveBooking = (booking: Booking)=>{

const bookings: Booking[] = JSON.parse(
localStorage.getItem("bookings") || "[]"
)

bookings.push(booking)

localStorage.setItem(
"bookings",
JSON.stringify(bookings)
)

}