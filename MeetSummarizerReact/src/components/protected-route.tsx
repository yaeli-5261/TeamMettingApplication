"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { Box, CircularProgress, Typography } from "@mui/material"
import type { RootState } from "../store/store"
import { getCookie } from "../services/meetingService"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useSelector((state: RootState) => state.auth)
  const location = useLocation()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const userData = sessionStorage.getItem("user")
      const token = getCookie("auth_token")
      const isAuth = !!(userData && token && user && user.userName)

      setIsAuthenticated(isAuth)
      setIsChecking(false)
    }

    // Small delay to ensure all auth checks are complete
    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [user])

  if (isChecking) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: 2,
        }}
      >
        <CircularProgress size={40} sx={{ color: "#10a37f" }} />
        <Typography variant="body1" color="text.secondary">
          Checking authentication...
        </Typography>
      </Box>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
