import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabaseClient"

export default function Admin() {
  const navigate = useNavigate()

  useEffect(() => {
    // 🌙 REMOVE DARK, FORCE LIGHT THEME FOR ADMIN
    document.body.classList.add("light")
    document.body.classList.remove("dark")

    checkUser()
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

  return (
    <div>
      {/* YOUR ORIGINAL UI STARTS HERE (kept structure) */}

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
        {/* example: cars table, stats, etc */}

      </div>
    </div>
  )
}