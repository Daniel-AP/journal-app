import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { SignUp } from "../pages/SignUp"

export const AuthRoutes = () => {
  return (
      <Routes>
          <Route path="login" element={ <Login /> }/>
          <Route path="signup" element={ <SignUp /> }/>
          <Route path="/*" element={ <Navigate to="login" /> } />
      </Routes>
  )
}
