import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getToken } from "../constant/Constant"


export default function  Auth ({ children }){
    const navigate = useNavigate()

   useEffect(()=>{
    if(!getToken()){
        navigate("/")
    }
   },[])

    return(
        <>
        {children}
       </>
    )
       

}