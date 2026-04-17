import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {

const [password,setPassword] = useState("")
const navigate = useNavigate()

const handleLogin = () => {

if(password === "Am@JF50869!"){
localStorage.setItem("admin","true")
navigate("/admin")
}else{
alert("Wrong password")
}

}

return (

<div className="flex items-center justify-center h-screen">

<div className="border border-gray-100 p-8 shadow rounded">

<h2 className="text-2xl font-bold mb-4">
Admin Login
</h2>

<input
type="password"
placeholder="Password"
className="border p-3 w-full mb-4"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
onClick={handleLogin}
className="bg-blue-600 text-white p-3 w-full rounded"
>
Login
</button>

</div>

</div>

)

}