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

export default function Admin() {
  const navigate = useNavigate()

  // ================= NEW STATE (CARS) =================
  const [cars, setCars] = useState<Car[]>([])
  const [loadingCars, setLoadingCars] = useState(true)

  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")

  useEffect(() => {
    // 🌙 REMOVE DARK, FORCE LIGHT THEME FOR ADMIN
    document.body.classList.add("light")
    document.body.classList.remove("dark")

    checkUser()
    fetchCars()
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

  // ================= NEW FUNCTIONS =================

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

  return (
    <div>
      {/* YOUR ORIGINAL UI STARTS HERE (UNCHANGED) */}

      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>

        <h1>Admin Dashboard</h1>
        <p>You are logged in ✅</p>

        {/* keep your future admin components below */}

        {/* ================= NEW SECTION (CARS) ================= */}

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