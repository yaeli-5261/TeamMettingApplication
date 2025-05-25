"use client"

import type React from "react"

import { Box, CssBaseline, AppBar, Toolbar, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import { AppSidebar } from "./Pages/app-sidebar"
import { AppFooter } from "./Pages/app-footer"


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
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <CssBaseline />

      {/* Mobile app bar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            display: { xs: "block", md: "none" },
            bgcolor: "background.paper",
            color: "text.primary",
            boxShadow: 1,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
              MeetingFiles
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Main layout container */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "100%",
            ml: { xs: 0, md: "250px" }, // Add margin to account for sidebar width
            mt: { xs: isMobile ? 8 : 0, md: 0 },
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh", // Ensure it takes full height
            overflow: "hidden", // Prevent horizontal scrolling
          }}
        >
          {/* Content wrapper with padding */}
          <Box
            sx={{
              flexGrow: 1,
              p: { xs: 2, md: 3 },
              pb: { xs: 10, md: 12 }, // Add padding at bottom to prevent footer overlap
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {children}
          </Box>

          {/* Footer */}
          <Box sx={{ width: "100%", position: "relative" }}>
            <AppFooter />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}


