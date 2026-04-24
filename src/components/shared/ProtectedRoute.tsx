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
      setLoading(true)

      // ✅ get session safely
      const { data: { session } } = await supabase.auth.getSession()

      // ⚠️ if Supabase is still restoring session
      if (!session) {
        setAllowed(false)
        setLoading(false)
        return
      }

      // 👇 get role from profiles
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single()

      if (error || !data) {
        setAllowed(false)
      } else {
        setAllowed(data.role === "admin")
      }

      setLoading(false)

    } catch (err) {
      setAllowed(false)
      setLoading(false)
    }
  }

  // ⏳ loading state (IMPORTANT to avoid redirect loop)
  if (loading || allowed === null) {
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

  // ❌ not allowed → redirect
  if (!allowed) {
    return <Navigate to="/login" replace />
  }

  // ✅ allowed → show admin
  return <>{children}</>
}