import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

type Props = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {

    // ✅ STEP 1 — get session FIRST (important)
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      setAllowed(false)
      setLoading(false)
      return
    }

    const user = session.user

    // ✅ STEP 2 — check role
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (error) {
      setAllowed(false)
    } else {
      setAllowed(data?.role === "admin")
    }

    setLoading(false)
  }

  if (loading) return <div>Loading...</div>

  if (!allowed) return <Navigate to="/login" replace />

  return <>{children}</>
}