"use client"

import { Box, Container, Typography, IconButton, Divider, useMediaQuery, useTheme, Grid } from "@mui/material"
import {
  GitHub as GitHubIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material"

export function AppFooter() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box
      component="footer"
      sx={{
        width: "80vw",
        background: "linear-gradient(135deg,rgb(112, 123, 141) 0%,rgb(77, 87, 100) 100%)",
        color: "white",
        py: 6,
        px: 2,
        mt: "auto",
        boxSizing: "border-box",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
        },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: isMobile ? "center" : "left" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                MeetingFiles
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 2, fontWeight: 500 }}>
                Advanced Meeting and File Management System
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isMobile ? "center" : "flex-start",
                  gap: 1,
                }}
              >
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Made with
                </Typography>
                <FavoriteIcon sx={{ fontSize: 16, color: "#ef4444", mx: 0.5 }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  © {new Date().getFullYear()} All Rights Reserved
                </Typography>
                <IconButton
                  size="medium"
                  aria-label="GitHub"
                  component="a"
                  href="https://github.com/yaeli-5261"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#10a37f",
                      transform: "translateY(-3px)",
                      backgroundColor: "rgba(16, 163, 127, 0.1)",
                    },
                  }}
                >
                  <GitHubIcon />
                </IconButton>
                <p><a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=yaelina5261@gmail.com&su=פנייה%20מאתר%MEETING&body=שלום%20רציתי%20לפנות%20בנוגע%20ל..."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0077cc', textDecoration: 'none', marginLeft: '5px' }}
                >
                  support@meetingSummerizer.co.il
                </a></p>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: isMobile ? "center" : "flex-end",
                gap: 3,
              }}
            >
              {/* <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton
                  size="medium"
                  aria-label="GitHub"
                  component="a"
                  href="https://github.com/yaeli-5261"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#10a37f",
                      transform: "translateY(-3px)",
                      backgroundColor: "rgba(16, 163, 127, 0.1)",
                    },
                  }}
                >
                  <GitHubIcon />
                </IconButton>
              </Box> */}

              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  flexWrap: "wrap",
                  justifyContent: isMobile ? "center" : "flex-end",
                }}
              >
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

        <Box
          sx={{
            width: "70vw",
            height: 6,
            background: "linear-gradient(90deg, #10a37f 0%, #0ea5e9 50%, #8b5cf6 100%)",
            borderRadius: 3,
            opacity: 0.9,
          }}
        />
      </Container>
    </Box>
  )
}

export default AppFooter
