import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Admin(){

const navigate = useNavigate()

useEffect(()=>{

const isAdmin = localStorage.getItem("admin")

if(!isAdmin){
navigate("/login")
}

},[navigate])

return(
<div>
Admin Dashboard
</div>
)

}