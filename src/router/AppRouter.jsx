import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes, useLocation } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { useIsLoading } from "../hooks/useIsLoading"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { clearErrorMessages } from "../store/auth/authSlice"
import { CheckingAuth } from "../ui/components/CheckingAuth"
import { PrivateRoutes } from "./PrivateRoutes"
import { PublicRoutes } from "./PublicRoutes"

export const AppRouter = () => {

  const location = useLocation();
  const dispatch = useDispatch();

  const isLoading = useIsLoading();
  
  useCheckAuth();

  useEffect(() => {
    
      dispatch( clearErrorMessages() );
  
  }, [location])
  
  return (

    isLoading
    ? (
      <CheckingAuth />
    )
    : (
      <Routes>
        <Route path="auth/*" element={
          <PublicRoutes>
            <AuthRoutes />
          </PublicRoutes>
        }>
        </Route>
        <Route path="/*" element={
          <PrivateRoutes>
            <JournalRoutes />
          </PrivateRoutes>
        } >
        </Route>
      </Routes>
    )

  )
}
