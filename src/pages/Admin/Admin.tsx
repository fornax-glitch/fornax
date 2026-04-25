import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabaseClient"

type Car = {
  id: string
  brand: string
  model: string
  price_per_day: number
  image: string
}

type Booking = {
  id: string
  name: string
  phone: string
  car: string
  pickup_date: string
  return_date: string
  status: string
}

export default function Admin() {
  const navigate = useNavigate()

  // ================= CARS =================
  const [cars, setCars] = useState<Car[]>([])
  const [loadingCars, setLoadingCars] = useState(true)

  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")

  // ================= BOOKINGS =================
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loadingBookings, setLoadingBookings] = useState(true)

  useEffect(() => {
    document.body.classList.add("light")
    document.body.classList.remove("dark")

    checkUser()
    fetchCars()
    fetchBookings()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      navigate("/login")
      return
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (error || data?.role !== "admin") {
      navigate("/")
      return
    }
  }

  // ================= CARS =================

  async function fetchCars() {
    setLoadingCars(true)

    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setCars(data)
    }

    setLoadingCars(false)
  }

  async function handleAddCar(e: React.FormEvent) {
    e.preventDefault()

    const { error } = await supabase.from("cars").insert([
      {
        brand,
        model,
        price_per_day: Number(price),
        image
      }
    ])

    if (error) {
      alert(error.message)
      return
    }

    setBrand("")
    setModel("")
    setPrice("")
    setImage("")

    fetchCars()
  }

  async function handleDeleteCar(id: string) {
    const confirmDelete = confirm("Delete this car?")
    if (!confirmDelete) return

    const { error } = await supabase
      .from("cars")
      .delete()
      .eq("id", id)

    if (error) {
      alert(error.message)
      return
    }

    fetchCars()
  }

  // ================= BOOKINGS =================

  async function fetchBookings() {
    setLoadingBookings(true)

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setBookings(data)
    }

    setLoadingBookings(false)
  }

  async function handleAcceptBooking(booking: Booking) {
    await supabase
      .from("bookings")
      .update({ status: "accepted" })
      .eq("id", booking.id)

    // WhatsApp message
    const message = `Bonjour 👋

Votre réservation est confirmée ✅

🚗 Voiture: ${booking.car}
📅 Pickup: ${booking.pickup_date}
📅 Return: ${booking.return_date}
Merci pour votre confiance 🙏`

    window.open(`https://wa.me/${booking.phone}?text=${encodeURIComponent(message)}`)

    fetchBookings()
  }

  async function handleDeleteBooking(id: string) {
    const confirmDelete = confirm("Delete this booking?")
    if (!confirmDelete) return

    await supabase
      .from("bookings")
      .delete()
      .eq("id", id)

    fetchBookings()
  }

  return (
    <div>
      {/* ================= ORIGINAL UI ================= */}

      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>

        <h1>Admin Dashboard</h1>
        <p>You are logged in ✅</p>

        {/* ================= BOOKINGS SECTION ================= */}

        <div style={{ marginTop: "40px", width: "100%", maxWidth: "600px" }}>
          <h2>Bookings</h2>

          {loadingBookings && <p>Loading...</p>}

          {!loadingBookings && bookings.length === 0 && (
            <p>No bookings yet</p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {bookings.map((b) => (
              <div key={b.id} style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "6px"
              }}>
                <strong>{b.car}</strong>
                <span>{b.pickup_date}</span>
                <span>{b.return_date}</span>
                <span>{b.name}</span>
                <span>{b.phone}</span>
                <span>Status: {b.status}</span>

                <div style={{ display: "flex", gap: "10px" }}>
                  {b.status !== "accepted" && (
                    <button
                      onClick={() => handleAcceptBooking(b)}
                      style={{ background: "green", color: "white" }}
                    >
                      Accept
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteBooking(b.id)}
                    style={{ background: "red", color: "white" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CARS SECTION (UNCHANGED) ================= */}

        <div style={{ marginTop: "40px", width: "100%", maxWidth: "500px" }}>

          <h2>Add Car</h2>

          <form onSubmit={handleAddCar} style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "30px"
          }}>
            <input
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />

            <input
              placeholder="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Price per day"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <input
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />

            <button type="submit">
              Add Car
            </button>
          </form>

          <h2>Cars</h2>

          {loadingCars && <p>Loading...</p>}

          {!loadingCars && cars.length === 0 && (
            <p>No cars yet</p>
          )}

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            {cars.map((car) => (
              <div key={car.id} style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <strong>{car.brand} {car.model}</strong>
                  <p>{car.price_per_day} MAD/day</p>
                </div>

                <button
                  onClick={() => handleDeleteCar(car.id)}
                  style={{ background: "red", color: "white" }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}