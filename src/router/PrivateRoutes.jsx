import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { types } from "../store/auth/types";

export const PrivateRoutes = ({ children }) => {

  const status = useSelector(state => state.auth.status);
  const isAuthenticated = status === types.authenticated;

  return (
      isAuthenticated
      ? (
        children
      )
      : (
        <Navigate to="/auth" />
      )
  )
}
