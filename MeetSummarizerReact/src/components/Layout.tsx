"use client"

import type React from "react"
import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material"
import { useState } from "react"
import AppFooter from "./Pages/app-footer"
import AppSidebar from "./Pages/app-sidebar"


interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: "flex",width:'100vh' ,minHeight: "100vh", flexDirection: "column" }}>
      <CssBaseline />

      {/* Main layout container */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <AppSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // width: "calc(100% - 280px)", // גודל המסך מלבד התפריט צד
            width: "100vw",
            ml: { xs: 0, md: "280px" },
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          }}
        >
          {/* Content wrapper - Full width for all components */}
          <Box
            sx={{
              flexGrow: 1,
          
              width: "100vh",
              // maxWidth: "100vh",
              boxSizing: "border-box",
            }}
          >
            {children}
          </Box>

          <AppFooter />
        </Box>
      </Box>
    </Box>
  )
}
