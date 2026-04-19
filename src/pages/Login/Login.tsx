import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault() // ✅ VERY IMPORTANT (prevents refresh)

    if (password === "Am@JF50869!") {
      localStorage.setItem("admin", "true")
      navigate("/admin")
    } else {
      alert("Wrong password")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">

      <form
        onSubmit={handleLogin}
        className="border border-gray-100 p-8 shadow rounded"
      >

        <h2 className="text-2xl font-bold mb-4">
          Admin Login
        </h2>

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 w-full rounded"
        >
          Login
        </button>

      </form>

    </div>
  )
}