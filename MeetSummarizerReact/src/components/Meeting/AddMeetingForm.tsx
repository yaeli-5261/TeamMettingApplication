// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"
// import type { AppDispatch, RootState } from "../../store/store"
// import {
//   TextField,
//   Button,
//   Paper,
//   Typography,
//   Box,
//   InputAdornment,
//   IconButton,
//   Alert,
//   Divider,
//   CircularProgress,
// } from "@mui/material"
// import {
//   EventNote as EventNoteIcon,
//   Title as TitleIcon,
//   CalendarToday as CalendarTodayIcon,
//   Link as LinkIcon,
//   AttachFile as AttachFileIcon,
//   ArrowBack as ArrowBackIcon,
//   Rocket as RocketIcon,
// } from "@mui/icons-material"
// import { motion } from "framer-motion"
// import { addMeeting } from "../../store/meetingSlice"
// import { MeetingPostDTO } from "../../models/meetingTypes"

// export default function AddMeetingForm() {
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()

//   // Get user from Redux store
//   const { user } = useSelector((state: RootState) => state.auth)

//   // State for team ID
//   const [teamId, setTeamId] = useState<number | null>(null)

//   // State for meeting data
//   const [meetingData, setMeetingData] = useState({
//     name: "",
//     date: "",
//     linkTranscriptFile: "",
//     linkOrinignFile: "",
//     teamId: null as number | null,
//   })

//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<string | null>(null)

//   // Effect to get team ID from multiple sources
//   useEffect(() => {
//     // Try to get teamId from Redux store first
//     if (user?.teamId) {
//       setTeamId(user.teamId)
//       setMeetingData((prev) => ({ ...prev, teamId: user.teamId ?? null }))
//       return
//     }

//     // Try to get from localStorage
//     try {
//       const localStorageUser = localStorage.getItem("user")
//       if (localStorageUser) {
//         const parsedUser = JSON.parse(localStorageUser)
//         if (parsedUser?.teamId) {
//           setTeamId(parsedUser.teamId)
//           setMeetingData((prev) => ({ ...prev, teamId: parsedUser.teamId ?? null }))
//           return
//         }
//       }
//     } catch (e) {
//       console.error("Error parsing user from localStorage:", e)
//     }

//     // Try to get from sessionStorage
//     try {
//       const sessionUser = sessionStorage.getItem("user")
//       if (sessionUser) {
//         const parsedUser = JSON.parse(sessionUser)
//         if (parsedUser?.teamId) {
//           setTeamId(parsedUser.teamId)
//           setMeetingData((prev) => ({ ...prev, teamId: parsedUser.teamId }))
//           return
//         }
//       }
//     } catch (e) {
//       console.error("Error parsing user from sessionStorage:", e)
//     }

//     // If we still don't have a teamId, show an error
//     if (!teamId) {
//       setError("❌ לא ניתן לזהות את מזהה הצוות. אנא התחבר מחדש למערכת.")
//     }
//   }, [user])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setMeetingData({ ...meetingData, [e.target.name]: e.target.value })
//     if (error) setError(null)
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
  
//     if (!meetingData.teamId && !teamId) {
//       setError("❌ מזהה צוות חסר. אנא התחבר מחדש למערכת.")
//       return
//     }
  
//     try {
//       setIsSubmitting(true)
//       setError(null)
  
//       // המרה של תאריך לפורמט ISO עם Z
//       const dateAsUTCString = new Date(meetingData.date).toISOString()
  
//       // הכנה לנתונים לשליחה
//       const meetingDataToSubmit = {
//         ...meetingData,
//         teamId: meetingData.teamId || teamId,
//         date: dateAsUTCString, // תאריך עם Z
//       }
  
//       if (meetingDataToSubmit.teamId === null) {
//         throw new Error("Team ID is required but is null.")
//       }
  
//       const addedMeeting = await dispatch(addMeeting(meetingDataToSubmit as MeetingPostDTO)).unwrap()
  
//       if (addedMeeting) {
//         setSuccess("✅ הפגישה נוספה בהצלחה!")
//         setMeetingData({
//           name: "",
//           date: "",
//           linkTranscriptFile: "",
//           linkOrinignFile: "",
//           teamId: teamId,
//         })
  
//         setTimeout(() => {
//           navigate("/meetings")
//         }, 1500)
//       }
//     } catch (error) {
//       console.error("❌ Error adding meeting:", error)
//       setError("❌ הוספת הפגישה נכשלה. אנא נסה שוב.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }
  
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         ml: { xs: 0, md: "250px" }, // מרווח שמאלי בגודל התפריט במסכים גדולים
//         transition: "margin 0.3s",
//         boxSizing: "border-box",
//         p: { xs: 2, md: 3 },
//         maxWidth: { xs: "100%", md: "calc(100% - 250px)" },
//       }}
//     >
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//           <IconButton onClick={() => navigate("/meetings")} sx={{ mr: 2 }} aria-label="חזרה לרשימת הפגישות">
//             <ArrowBackIcon />
//           </IconButton>
//           <Typography variant="h5" fontWeight={600}>
//             הוספת פגישה חדשה
//           </Typography>
//         </Box>

//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: 2,
//             border: "1px solid",
//             borderColor: "divider",
//             bgcolor: "background.paper",
//             overflow: "hidden",
//           }}
//         >
//           <Box
//             sx={{
//               p: 3,
//               bgcolor: "primary.main",
//               color: "white",
//               background: "linear-gradient(135deg, #10a37f, #0e8a6c)",
//             }}
//           >
//             <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
//               <EventNoteIcon sx={{ fontSize: 40, color: "white" }} />
//             </Box>
//             <Typography variant="h5" gutterBottom fontWeight="bold" textAlign="center">
//               הוספת פגישה חדשה
//             </Typography>
//             <Typography variant="body2" textAlign="center">
//               מלא את הפרטים הבאים כדי ליצור פגישה חדשה
//             </Typography>
//           </Box>

//           <Box sx={{ p: 3 }}>
//             {error && (
//               <Alert severity="error" sx={{ mb: 3 }}>
//                 {error}
//               </Alert>
//             )}

//             {success && (
//               <Alert severity="success" sx={{ mb: 3 }}>
//                 {success}
//               </Alert>
//             )}

//             {teamId ? (
//               <Alert severity="info" sx={{ mb: 3 }}>
//                 מזהה צוות: {teamId}
//               </Alert>
//             ) : (
//               <Alert severity="warning" sx={{ mb: 3 }}>
//                 לא זוהה מזהה צוות. אנא התחבר מחדש למערכת.
//               </Alert>
//             )}

//             <form onSubmit={handleSubmit}>
//               <TextField
//                 label="שם הפגישה"
//                 name="name"
//                 value={meetingData.name}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <TitleIcon fontSize="small" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{ mb: 2 }}
//               />

//               <TextField
//                 label="תאריך ושעת הפגישה"
//                 name="date"
//                 type="datetime-local"
//                 value={meetingData.date}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//                 required
//                 InputLabelProps={{ shrink: true }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <CalendarTodayIcon fontSize="small" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{ mb: 2 }}
//               />

//               <Divider sx={{ my: 2 }} />
//               <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                 קישורים לקבצים (אופציונלי)
//               </Typography>

//               <TextField
//                 label="קישור לקובץ מקורי"
//                 name="linkOrinignFile"
//                 value={meetingData.linkOrinignFile}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//                 placeholder="https://example.com/original.docx"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <AttachFileIcon fontSize="small" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{ mb: 3 }}
//               />

//               <Button
//                 type="submit"
//                 variant="contained"
//                 disabled={isSubmitting || !teamId}
//                 startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <RocketIcon />}
//                 sx={{
//                   py: 1.5,
//                   borderRadius: 2,
//                   bgcolor: "#10a37f",
//                   color: "white",
//                   fontWeight: "bold",
//                   "&:hover": {
//                     bgcolor: "#0e8a6c",
//                   },
//                 }}
//                 fullWidth
//               >
//                 {isSubmitting ? "מוסיף פגישה..." : "הוסף פגישה"}
//               </Button>
//             </form>
//           </Box>
//         </Paper>
//       </motion.div>
//     </Box>
//   )
// }


"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  Avatar,
  Chip,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Card,
  CardContent,
} from "@mui/material"
import {
  Add as AddIcon,
  CalendarMonth as CalendarIcon,
  AccessTime as TimeIcon,
  Description as DescriptionIcon,
  CloudUpload as UploadIcon,
  Group as GroupIcon,
  LocationOn as LocationIcon,
  CheckCircle as CheckIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const AddMeeting = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    teamId: "",
    participants: "",
    file: null as File | null,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        navigate("/meetings")
      }, 2000)
    }, 2000)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <Box sx={{ mb: 6 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/meetings")}
              sx={{
                mb: 4,
                color: "text.secondary",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  color: "#10a37f",
                  backgroundColor: "rgba(16, 163, 127, 0.1)",
                },
              }}
            >
              Back to Meetings
            </Button>

            <Box sx={{ textAlign: "center", mb: 4 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                    mx: "auto",
                    mb: 3,
                    boxShadow: "0 8px 24px rgba(16, 163, 127, 0.3)",
                  }}
                >
                  <AddIcon sx={{ fontSize: 40, color: "white" }} />
                </Avatar>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 900,
                    background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 2,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                  }}
                >
                  Create New Meeting
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    maxWidth: 600,
                    mx: "auto",
                    fontWeight: 400,
                    lineHeight: 1.6,
                  }}
                >
                  Set up your meeting details and upload files for AI-powered analysis
                </Typography>
              </motion.div>
            </Box>
          </Box>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                sx={{
                  maxWidth: 600,
                  mx: "auto",
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                }}
              >
                <CardContent sx={{ p: 6, textAlign: "center" }}>
                  <CheckIcon sx={{ fontSize: 80, color: "#10a37f", mb: 3 }} />
                  <Typography variant="h4" fontWeight={700} color="#10a37f" gutterBottom>
                    Meeting Created Successfully!
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Redirecting to meetings page...
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                  overflow: "hidden",
                }}
              >
                <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 4, md: 6 } }}>
                  <Grid container spacing={4}>
                    {/* Basic Information */}
                    <Grid item xs={12}>
                      <Box sx={{ mb: 4 }}>
                        <Typography
                          variant="h4"
                          fontWeight={700}
                          color="text.primary"
                          sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <DescriptionIcon sx={{ color: "#10a37f" }} />
                          Basic Information
                        </Typography>
                        <Divider sx={{ borderColor: "rgba(16, 163, 127, 0.2)" }} />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Meeting Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            height: 64,
                            fontSize: "1.1rem",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 8px 24px rgba(16, 163, 127, 0.2)",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            fontWeight: 600,
                            fontSize: "1.1rem",
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DescriptionIcon sx={{ color: "text.secondary", fontSize: 24 }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 600, fontSize: "1.1rem" }}>Team</InputLabel>
                        <Select
                          value={formData.teamId}
                          onChange={(e) => handleInputChange("teamId", e.target.value)}
                          required
                          sx={{
                            borderRadius: 3,
                            height: 64,
                            fontSize: "1.1rem",
                            "& .MuiOutlinedInput-notchedOutline": {
                              transition: "all 0.3s ease",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              boxShadow: "0 8px 24px rgba(16, 163, 127, 0.2)",
                            },
                          }}
                          startAdornment={
                            <InputAdornment position="start">
                              <GroupIcon sx={{ color: "text.secondary", fontSize: 24 }} />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="1">Development Team</MenuItem>
                          <MenuItem value="2">Marketing Team</MenuItem>
                          <MenuItem value="3">Sales Team</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            fontSize: "1.1rem",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 8px 24px rgba(16, 163, 127, 0.2)",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            fontWeight: 600,
                            fontSize: "1.1rem",
                          },
                        }}
                      />
                    </Grid>

                    {/* Date & Time */}
                    <Grid item xs={12}>
                      <Box sx={{ mb: 4, mt: 4 }}>
                        <Typography
                          variant="h4"
                          fontWeight={700}
                          color="text.primary"
                          sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <CalendarIcon sx={{ color: "#0ea5e9" }} />
                          Schedule
                        </Typography>
                        <Divider sx={{ borderColor: "rgba(14, 165, 233, 0.2)" }} />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            height: 64,
                            fontSize: "1.1rem",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 8px 24px rgba(14, 165, 233, 0.2)",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            fontWeight: 600,
                            fontSize: "1.1rem",
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarIcon sx={{ color: "text.secondary", fontSize: 24 }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange("time", e.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            height: 64,
                            fontSize: "1.1rem",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 8px 24px rgba(14, 165, 233, 0.2)",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            fontWeight: 600,
                            fontSize: "1.1rem",
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <TimeIcon sx={{ color: "text.secondary", fontSize: 24 }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            height: 64,
                            fontSize: "1.1rem",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 8px 24px rgba(14, 165, 233, 0.2)",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            fontWeight: 600,
                            fontSize: "1.1rem",
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationIcon sx={{ color: "text.secondary", fontSize: 24 }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    {/* File Upload */}
                    <Grid item xs={12}>
                      <Box sx={{ mb: 4, mt: 4 }}>
                        <Typography
                          variant="h4"
                          fontWeight={700}
                          color="text.primary"
                          sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <UploadIcon sx={{ color: "#8b5cf6" }} />
                          File Upload
                        </Typography>
                        <Divider sx={{ borderColor: "rgba(139, 92, 246, 0.2)" }} />
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Paper
                        sx={{
                          p: 4,
                          borderRadius: 3,
                          border: "2px dashed",
                          borderColor: formData.file ? "#8b5cf6" : "divider",
                          background: formData.file ? "rgba(139, 92, 246, 0.05)" : "rgba(0,0,0,0.02)",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          "&:hover": {
                            borderColor: "#8b5cf6",
                            background: "rgba(139, 92, 246, 0.05)",
                          },
                        }}
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        <input
                          id="file-upload"
                          type="file"
                          hidden
                          onChange={handleFileUpload}
                          accept=".pdf,.doc,.docx,.txt,.mp3,.mp4,.wav"
                        />
                        <Box sx={{ textAlign: "center" }}>
                          <UploadIcon sx={{ fontSize: 48, color: "#8b5cf6", mb: 2 }} />
                          <Typography variant="h5" fontWeight={600} color="text.primary" gutterBottom>
                            {formData.file ? formData.file.name : "Upload Meeting File"}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {formData.file
                              ? "File selected successfully"
                              : "Drag and drop or click to select files (PDF, DOC, Audio, Video)"}
                          </Typography>
                          {formData.file && (
                            <Chip
                              label="File Ready"
                              sx={{
                                mt: 2,
                                background: "#8b5cf6",
                                color: "white",
                                fontWeight: 600,
                              }}
                            />
                          )}
                        </Box>
                      </Paper>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                      <Box sx={{ mt: 6, textAlign: "center" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={loading}
                          size="large"
                          sx={{
                            px: 8,
                            py: 3,
                            borderRadius: 4,
                            background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                            boxShadow: "0 8px 24px rgba(16, 163, 127, 0.3)",
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: "1.3rem",
                            minWidth: 200,
                            "&:hover": {
                              background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
                              boxShadow: "0 12px 32px rgba(16, 163, 127, 0.4)",
                              transform: "translateY(-2px)",
                            },
                            "&:disabled": {
                              background: "rgba(0,0,0,0.12)",
                              boxShadow: "none",
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          {loading ? "Creating Meeting..." : "Create Meeting"}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </Box>
  )
}

export default AddMeeting
