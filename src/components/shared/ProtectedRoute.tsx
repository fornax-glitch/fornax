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

    // 🔥 LISTEN TO AUTH STATE (THIS FIXES YOUR LOOP)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {

        if (!session) {
          setAllowed(false)
          setLoading(false)
          return
        }

        const user = session.user

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
    )

    // 🔁 ALSO RUN IMMEDIATELY (important)
    checkSession()

    return () => {
      listener.subscription.unsubscribe()
    }

  }, [])

  async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      setAllowed(false)
      setLoading(false)
      return
    }

    const user = session.user

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