import React from 'react'
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import authService from "../../appwrite/auth.js"
import {logout } from "../../store/authSlice.js"

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

   
    const logoutHandler = async () => {
      try {
          const isLoggedOut = await authService.logout()
          if (isLoggedOut) {
              dispatch(logout())         // Clear Redux state
              navigate("/login")         // Redirect to login page
          } else {
              console.warn("Logout failed.")
          }
      } catch (error) {
          console.error("Logout error:", error)
      }
  }

  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn