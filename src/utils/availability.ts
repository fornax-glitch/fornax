import type { Booking } from '../types'

export const isAvailable = (carId:string,date:string)=>{

const bookings: Booking[] = JSON.parse(
localStorage.getItem("bookings") || "[]"
)

return !bookings.some(
(b: Booking)=> b.car === carId && b.date === date
)

}