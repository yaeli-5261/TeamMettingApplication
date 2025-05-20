"use client"

import { Box, Typography, Grid, Paper, Button, useTheme } from "@mui/material"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Add as AddIcon, CalendarMonth as CalendarIcon, Description as DescriptionIcon } from "@mui/icons-material"

export default function HomePage() {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        width: "100%",
        ml: { xs: 0, md: "250px" }, // מרווח שמאלי בגודל התפריט במסכים גדולים
        transition: "margin 0.3s",
        boxSizing: "border-box",
        p: { xs: 2, md: 3 },
        maxWidth: { xs: "100%", md: "calc(100% - 250px)" },
      }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              ברוכים הבאים למערכת ניהול הפגישות
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              נהל את הפגישות, התמלולים והקבצים של הצוות שלך במקום אחד
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/add-meeting")}
              sx={{
                mt: 2,
                bgcolor: "#10a37f",
                color: "white",
                textTransform: "none",
                fontWeight: 500,
                px: 3,
                py: 1,
                "&:hover": {
                  bgcolor: "#0e8a6c",
                },
              }}
            >
              צור פגישה חדשה
            </Button>
          </Box>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
                    minHeight: 200,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "primary.lighter",
                        color: "primary.main",
                        mr: 2,
                      }}
                    >
                      <CalendarIcon />
                    </Box>
                    <Typography variant="h6" fontWeight="medium">
                      פגישות קרובות
                    </Typography>
                  </Box>
                  <Box sx={{ color: "text.secondary", fontSize: "0.875rem", flexGrow: 1 }}>
                    <Box sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                      פגישת תכנון אסטרטגי - מחר, 10:00
                    </Box>
                    <Box sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                      פגישת צוות - יום רביעי, 9:30
                    </Box>
                    <Box sx={{ py: 1 }}>סקירת מוצר - יום שישי, 14:00</Box>
                  </Box>
                  <Button
                    variant="text"
                    onClick={() => navigate("/meetings")}
                    sx={{
                      alignSelf: "flex-start",
                      mt: 2,
                      color: "primary.main",
                      textTransform: "none",
                      fontWeight: 500,
                      p: 0,
                      "&:hover": {
                        bgcolor: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    צפה בכל הפגישות
                  </Button>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
                    minHeight: 200,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "primary.lighter",
                        color: "primary.main",
                        mr: 2,
                      }}
                    >
                      <DescriptionIcon />
                    </Box>
                    <Typography variant="h6" fontWeight="medium">
                      קבצים אחרונים
                    </Typography>
                  </Box>
                  <Box sx={{ color: "text.secondary", fontSize: "0.875rem", flexGrow: 1 }}>
                    <Box sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                      סיכום פגישת אסטרטגיה.pdf
                    </Box>
                    <Box sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}>מפת דרכים 2025.docx</Box>
                    <Box sx={{ py: 1 }}>משוב צוות.md</Box>
                  </Box>
                  <Button
                    variant="text"
                    onClick={() => navigate("/files")}
                    sx={{
                      alignSelf: "flex-start",
                      mt: 2,
                      color: "primary.main",
                      textTransform: "none",
                      fontWeight: 500,
                      p: 0,
                      "&:hover": {
                        bgcolor: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    צפה בכל הקבצים
                  </Button>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
                    minHeight: 200,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "primary.lighter",
                        color: "primary.main",
                        mr: 2,
                      }}
                    >
                      <DescriptionIcon />
                    </Box>
                    <Typography variant="h6" fontWeight="medium">
                      פעילות צוות
                    </Typography>
                  </Box>
                  <Box sx={{ color: "text.secondary", fontSize: "0.875rem", flexGrow: 1 }}>
                    <Box sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}>שרה העלתה קובץ חדש</Box>
                    <Box sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}>אלכס יצר פגישה חדשה</Box>
                    <Box sx={{ py: 1 }}>ג'יימי הגיב על מפת הדרכים</Box>
                  </Box>
                  <Button
                    variant="text"
                    onClick={() => navigate("/team")}
                    sx={{
                      alignSelf: "flex-start",
                      mt: 2,
                      color: "primary.main",
                      textTransform: "none",
                      fontWeight: 500,
                      p: 0,
                      "&:hover": {
                        bgcolor: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    צפה בכל הפעילויות
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Box>
  )
}





