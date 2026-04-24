import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

type Props = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      // ✅ WAIT FOR SESSION PROPERLY
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setAllowed(false)
        setLoading(false)
        return
      }

      const user = session.user

      // ✅ CHECK PROFILE ROLE
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      if (error || !data) {
        setAllowed(false)
      } else {
        setAllowed(data.role === "admin")
      }

    } catch (err) {
      setAllowed(false)
    }

    setLoading(false)
  }

  // ⛔ WAIT SCREEN (important)
  if (loading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Loading...
      </div>
    )
  }

  // ❌ NOT ALLOWED
  if (!allowed) {
    return <Navigate to="/login" replace />
  }

  // ✅ ALLOWED
  return <>{children}</>
}