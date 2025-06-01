"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMoreIcon,
  Upload as UploadIcon,
  SmartToy as AiIcon,
  Share as ShareIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Email as EmailIcon,
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  PlayArrow as PlayArrowIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"

export default function SettingsPage() {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState<string | false>("getting-started")

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const features = [
    {
      icon: <UploadIcon />,
      title: "העלאת קבצים חכמה",
      description: "העלה קבצי PDF, Word ותמונות בקלות",
      color: "#10a37f",
      bgColor: "#ecfdf5",
    },
    {
      icon: <AiIcon />,
      title: "סיכומי AI מתקדמים",
      description: "קבל סיכומים אוטומטיים של הפגישות",
      color: "#3b82f6",
      bgColor: "#eff6ff",
    },
    {
      icon: <ShareIcon />,
      title: "שיתוף מתקדם",
      description: "שתף קבצים עם חברי הצוות באימייל",
      color: "#8b5cf6",
      bgColor: "#f3e8ff",
    },
    {
      icon: <ViewIcon />,
      title: "תצוגה מקדימה",
      description: "צפה בקבצים ישירות במערכת",
      color: "#f59e0b",
      bgColor: "#fef3c7",
    },
  ]

  const steps = [
    {
      step: 1,
      title: "צור פגישה חדשה",
      description: "לחץ על 'פגישה חדשה' בעמוד הבית או בתפריט הפגישות",
      icon: <PlayArrowIcon />,
    },
    {
      step: 2,
      title: "העלה קבצים",
      description: "גרור ושחרר קבצים או לחץ לבחירה. תומך ב-PDF, Word, תמונות",
      icon: <CloudUploadIcon />,
    },
    {
      step: 3,
      title: "קבל סיכום AI",
      description: "המערכת תייצר אוטומטית סיכום מפורט של הקובץ",
      icon: <AiIcon />,
    },
    {
      step: 4,
      title: "שתף עם הצוות",
      description: "שלח קישורי הורדה לחברי הצוות באימייל",
      icon: <ShareIcon />,
    },
  ]

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/")}
              sx={{
                mb: 3,
                color: "#6b7280",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { bgcolor: "#f3f4f6" },
              }}
            >
              חזרה לעמוד הבית
            </Button>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Avatar sx={{ bgcolor: "#10a37f", width: 56, height: 56 }}>
                <SettingsIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700} color="#111827">
                  הגדרות ומדריך שימוש
                </Typography>
                <Typography variant="body1" color="#6b7280">
                  למד איך להשתמש במערכת בצורה המיטבית
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Features Overview */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      border: "1px solid #e5e7eb",
                      bgcolor: "white",
                      height: "100%",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: "center" }}>
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          bgcolor: feature.bgColor,
                          color: feature.color,
                          mx: "auto",
                          mb: 2,
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Typography variant="h6" fontWeight={600} color="#111827" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="#6b7280">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Main Content */}
          <Grid container spacing={4}>
            {/* Instructions */}
            <Grid item xs={12} lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card sx={{ borderRadius: 3, border: "1px solid #e5e7eb", bgcolor: "white" }}>
                  <CardContent sx={{ p: 0 }}>
                    {/* Getting Started */}
                    <Accordion
                      expanded={expanded === "getting-started"}
                      onChange={handleChange("getting-started")}
                      sx={{ "&:before": { display: "none" } }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar sx={{ bgcolor: "#ecfdf5", color: "#10a37f" }}>
                            <PlayArrowIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight={600}>
                              תחילת עבודה
                            </Typography>
                            <Typography variant="body2" color="#6b7280">
                              המדריך המלא לשימוש במערכת
                            </Typography>
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 3, pt: 0 }}>
                        <Stack spacing={3}>
                          {steps.map((step, index) => (
                            <Paper
                              key={step.step}
                              sx={{
                                p: 3,
                                borderRadius: 2,
                                border: "1px solid #f3f4f6",
                                bgcolor: "#fafafa",
                              }}
                            >
                              <Box sx={{ display: "flex", gap: 3 }}>
                                <Avatar
                                  sx={{
                                    bgcolor: "#10a37f",
                                    color: "white",
                                    width: 40,
                                    height: 40,
                                    fontSize: "1.2rem",
                                    fontWeight: 700,
                                  }}
                                >
                                  {step.step}
                                </Avatar>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="h6" fontWeight={600} color="#111827" gutterBottom>
                                    {step.title}
                                  </Typography>
                                  <Typography variant="body2" color="#6b7280">
                                    {step.description}
                                  </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: "#f3f4f6", color: "#6b7280" }}>{step.icon}</Avatar>
                              </Box>
                            </Paper>
                          ))}
                        </Stack>
                      </AccordionDetails>
                    </Accordion>

                    <Divider />

                    {/* File Upload */}
                    <Accordion
                      expanded={expanded === "file-upload"}
                      onChange={handleChange("file-upload")}
                      sx={{ "&:before": { display: "none" } }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar sx={{ bgcolor: "#eff6ff", color: "#3b82f6" }}>
                            <UploadIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight={600}>
                              העלאת קבצים
                            </Typography>
                            <Typography variant="body2" color="#6b7280">
                              איך להעלות ולנהל קבצים
                            </Typography>
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 3, pt: 0 }}>
                        <Stack spacing={2}>
                          <Typography variant="body1" fontWeight={600} color="#111827">
                            פורמטים נתמכים:
                          </Typography>
                          <List dense>
                            <ListItem>
                              <ListItemIcon>
                                <CheckCircleIcon sx={{ color: "#10a37f" }} />
                              </ListItemIcon>
                              <ListItemText primary="PDF - מסמכים ודוחות" />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <CheckCircleIcon sx={{ color: "#10a37f" }} />
                              </ListItemIcon>
                              <ListItemText primary="Word (DOC, DOCX) - מסמכי טקסט" />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <CheckCircleIcon sx={{ color: "#10a37f" }} />
                              </ListItemIcon>
                              <ListItemText primary="תמונות (JPG, PNG, GIF) - צילומי מסך ותמונות" />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <CheckCircleIcon sx={{ color: "#10a37f" }} />
                              </ListItemIcon>
                              <ListItemText primary="TXT - קבצי טקסט פשוטים" />
                            </ListItem>
                          </List>
                          <Typography variant="body2" color="#6b7280">
                            <strong>טיפ:</strong> גרור ושחרר קבצים ישירות לאזור ההעלאה לחוויה מהירה יותר.
                          </Typography>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>

                    <Divider />

                    {/* AI Features */}
                    <Accordion
                      expanded={expanded === "ai-features"}
                      onChange={handleChange("ai-features")}
                      sx={{ "&:before": { display: "none" } }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar sx={{ bgcolor: "#f3e8ff", color: "#8b5cf6" }}>
                            <AiIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight={600}>
                              תכונות AI
                            </Typography>
                            <Typography variant="body2" color="#6b7280">
                              סיכומים אוטומטיים וחכמים
                            </Typography>
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 3, pt: 0 }}>
                        <Stack spacing={2}>
                          <Typography variant="body1" color="#111827">
                            המערכת מייצרת אוטומטית סיכומים מפורטים של הקבצים שלך:
                          </Typography>
                          <List dense>
                            <ListItem>
                              <ListItemIcon>
                                <AiIcon sx={{ color: "#8b5cf6" }} />
                              </ListItemIcon>
                              <ListItemText primary="ניתוח תוכן" secondary="זיהוי נושאים עיקריים ונקודות חשובות" />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <AiIcon sx={{ color: "#8b5cf6" }} />
                              </ListItemIcon>
                              <ListItemText primary="סיכום מובנה" secondary="יצירת סיכום מסודר עם כותרות וסעיפים" />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <AiIcon sx={{ color: "#8b5cf6" }} />
                              </ListItemIcon>
                              <ListItemText primary="המלצות פעולה" secondary="הצעות לצעדים הבאים על בסיס התוכן" />
                            </ListItem>
                          </List>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>

                    <Divider />

                    {/* Sharing */}
                    <Accordion
                      expanded={expanded === "sharing"}
                      onChange={handleChange("sharing")}
                      sx={{ "&:before": { display: "none" } }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar sx={{ bgcolor: "#fef3c7", color: "#f59e0b" }}>
                            <ShareIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight={600}>
                              שיתוף קבצים
                            </Typography>
                            <Typography variant="body2" color="#6b7280">
                              שתף עם חברי הצוות בקלות
                            </Typography>
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 3, pt: 0 }}>
                        <Stack spacing={2}>
                          <Typography variant="body1" color="#111827">
                            דרכים לשתף קבצים:
                          </Typography>
                          <List dense>
                            <ListItem>
                              <ListItemIcon>
                                <EmailIcon sx={{ color: "#f59e0b" }} />
                              </ListItemIcon>
                              <ListItemText
                                primary="שליחה באימייל"
                                secondary="שלח קישור הורדה ישירות למשתמשים במערכת"
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <ShareIcon sx={{ color: "#f59e0b" }} />
                              </ListItemIcon>
                              <ListItemText primary="העתקת קישור" secondary="העתק קישור להדבקה בצ'אט או הודעה" />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <DownloadIcon sx={{ color: "#f59e0b" }} />
                              </ListItemIcon>
                              <ListItemText primary="הורדה ישירה" secondary="הורד את הקובץ למחשב שלך" />
                            </ListItem>
                          </List>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Quick Actions */}
            <Grid item xs={12} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card sx={{ borderRadius: 3, border: "1px solid #e5e7eb", bgcolor: "white", mb: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={600} color="#111827" gutterBottom>
                      פעולות מהירות
                    </Typography>
                    <Stack spacing={2}>
                      <Button
                        variant="contained"
                        startIcon={<PlayArrowIcon />}
                        onClick={() => navigate("/meetings")}
                        sx={{
                          bgcolor: "#10a37f",
                          "&:hover": { bgcolor: "#0d8f6b" },
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          py: 1.5,
                        }}
                      >
                        צור פגישה חדשה
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<DescriptionIcon />}
                        onClick={() => navigate("/meetings")}
                        sx={{
                          borderColor: "#e5e7eb",
                          color: "#374151",
                          "&:hover": { borderColor: "#d1d5db", bgcolor: "#f9fafb" },
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          py: 1.5,
                        }}
                      >
                        צפה בפגישות קיימות
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card sx={{ borderRadius: 3, border: "1px solid #e5e7eb", bgcolor: "white" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={600} color="#111827" gutterBottom>
                      טיפים שימושיים
                    </Typography>
                    <Stack spacing={2}>
                      <Paper sx={{ p: 2, bgcolor: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                        <Typography variant="body2" fontWeight={600} color="#166534" gutterBottom>
                          💡 טיפ מקצועי
                        </Typography>
                        <Typography variant="caption" color="#166534">
                          השתמש בשמות תיאוריים לפגישות כדי למצוא אותן בקלות מאוחר יותר
                        </Typography>
                      </Paper>
                      <Paper sx={{ p: 2, bgcolor: "#eff6ff", border: "1px solid #bfdbfe" }}>
                        <Typography variant="body2" fontWeight={600} color="#1e40af" gutterBottom>
                          🚀 חסוך זמן
                        </Typography>
                        <Typography variant="caption" color="#1e40af">
                       גרור ושחרר קובץ להעלאה 
                        </Typography>
                      </Paper>
                      <Paper sx={{ p: 2, bgcolor: "#fef3c7", border: "1px solid #fde68a" }}>
                        <Typography variant="body2" fontWeight={600} color="#92400e" gutterBottom>
                          🤖 AI חכם
                        </Typography>
                        <Typography variant="caption" color="#92400e">
                          סיכומי ה-AI מתחשבים בהקשר ובתוכן הספציפי של הקובץ
                        </Typography>
                      </Paper>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
}
