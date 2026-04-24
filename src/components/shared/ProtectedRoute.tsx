import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function ProtectedRoute({ children }: any) {
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    check()
  }, [])

  async function check() {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      setAllowed(false)
      setLoading(false)
      return
    }

    // 🔥 TEMP FIX: assume authenticated = admin (until DB fixed)
    // This removes your crash completely
    setAllowed(true)
    setLoading(false)
  }

  if (loading) return <div>Loading...</div>

  if (!allowed) return <Navigate to="/login" replace />

  return children
}