import React,{useContext, useEffect} from 'react'
import { useNavigate } from 'react-router'
import { DataContext } from '../DataProvider/DataProvider'

function ProtectedRoute ({children, msg, redirect}) {

    const navigate =useNavigate()
    const { state, dispatch } = useContext(DataContext)
    const { user }=state
    console.log(user)

    useEffect(()=>{
        if(!user){
            navigate("/auth",{state:{msg, redirect}})
        }

    },[user])

    
  return children; 
   
  
}

export default ProtectedRoute