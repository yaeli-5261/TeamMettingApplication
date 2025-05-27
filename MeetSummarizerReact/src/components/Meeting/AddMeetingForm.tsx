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
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/store"
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  InputAdornment,
  Alert,
  Divider,
  CircularProgress,
  Grid,
} from "@mui/material"
import {
  EventNote as EventNoteIcon,
  Title as TitleIcon,
  CalendarToday as CalendarTodayIcon,
  AttachFile as AttachFileIcon,
  ArrowBack as ArrowBackIcon,
  Rocket as RocketIcon,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { addMeeting } from "../../store/meetingSlice"
import type { MeetingPostDTO } from "../../models/meetingTypes"

export default function AddMeetingForm() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.auth)
  const [teamId, setTeamId] = useState<number | null>(null)
  const [meetingData, setMeetingData] = useState({
    name: "",
    date: "",
    linkTranscriptFile: "",
    linkOrinignFile: "",
    teamId: null as number | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (user?.teamId) {
      setTeamId(user.teamId)
      setMeetingData((prev) => ({ ...prev, teamId: user.teamId ?? null }))
      return
    }

    try {
      const localStorageUser = localStorage.getItem("user")
      if (localStorageUser) {
        const parsedUser = JSON.parse(localStorageUser)
        if (parsedUser?.teamId) {
          setTeamId(parsedUser.teamId)
          setMeetingData((prev) => ({ ...prev, teamId: parsedUser.teamId ?? null }))
          return
        }
      }
    } catch (e) {
      console.error("Error parsing user from localStorage:", e)
    }

    try {
      const sessionUser = sessionStorage.getItem("user")
      if (sessionUser) {
        const parsedUser = JSON.parse(sessionUser)
        if (parsedUser?.teamId) {
          setTeamId(parsedUser.teamId)
          setMeetingData((prev) => ({ ...prev, teamId: parsedUser.teamId }))
          return
        }
      }
    } catch (e) {
      console.error("Error parsing user from sessionStorage:", e)
    }

    if (!teamId) {
      setError("❌ Unable to identify team ID. Please log in again.")
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value })
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!meetingData.teamId && !teamId) {
      setError("❌ Team ID missing. Please log in again.")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const dateAsUTCString = new Date(meetingData.date).toISOString()
      const meetingDataToSubmit = {
        ...meetingData,
        teamId: meetingData.teamId || teamId,
        date: dateAsUTCString,
      }

      if (meetingDataToSubmit.teamId === null) {
        throw new Error("Team ID is required but is null.")
      }

      const addedMeeting = await dispatch(addMeeting(meetingDataToSubmit as MeetingPostDTO)).unwrap()

      if (addedMeeting) {
        setSuccess("✅ Meeting added successfully!")
        setMeetingData({
          name: "",
          date: "",
          linkTranscriptFile: "",
          linkOrinignFile: "",
          teamId: teamId,
        })

        setTimeout(() => {
          navigate("/meetings")
        }, 1500)
      }
    } catch (error) {
      console.error("❌ Error adding meeting:", error)
      setError("❌ Failed to add meeting. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
        p: 2,
        direction: "rtl",
        textAlign: "right",
      }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Header */}
        <Box sx={{ mb: 2, height: "80px" }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/meetings")}
            sx={{
              mb: 1,
              color: "text.secondary",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.75rem",
              "&:hover": {
                color: "#10a37f",
                backgroundColor: "rgba(16, 163, 127, 0.1)",
              },
            }}
          >
            Back to Meetings
          </Button>

          <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom sx={{ fontSize: "1rem" }}>
            Add New Meeting
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
            Fill in the details to create a new meeting
          </Typography>
        </Box>

        {/* Main Form */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 1,
            background: "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
            height: "calc(100vh - 120px)",
          }}
        >
          {/* Header Card */}
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #10a37f, #0e8a6c)",
              color: "white",
              textAlign: "center",
              height: "80px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <EventNoteIcon sx={{ fontSize: 20, mb: 0.5 }} />
            <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: "0.875rem" }}>
              Add New Meeting
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9, fontSize: "0.7rem" }}>
              Fill in the details to create a new meeting
            </Typography>
          </Box>

          {/* Form Content */}
          <Box sx={{ p: 2, height: "calc(100% - 80px)", overflow: "auto" }}>
            {error && (
              <Alert severity="error" sx={{ mb: 1, borderRadius: 1, fontSize: "0.75rem" }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 1, borderRadius: 1, fontSize: "0.75rem" }}>
                {success}
              </Alert>
            )}

            {teamId ? (
              <Alert severity="info" sx={{ mb: 1, borderRadius: 1, fontSize: "0.75rem" }}>
                Team ID: {teamId}
              </Alert>
            ) : (
              <Alert severity="warning" sx={{ mb: 1, borderRadius: 1, fontSize: "0.75rem" }}>
                No team ID detected. Please log in again.
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={1.5}>
                {/* Meeting Name */}
                <Grid item xs={12}>
                  <TextField
                    label="Meeting Name"
                    name="name"
                    value={meetingData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                        height: 36,
                        fontSize: "0.75rem",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "0.75rem",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TitleIcon sx={{ fontSize: 14 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Date and Time */}
                <Grid item xs={12}>
                  <TextField
                    label="Meeting Date & Time"
                    name="date"
                    type="datetime-local"
                    value={meetingData.date}
                    onChange={handleChange}
                    fullWidth
                    required
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                        height: 36,
                        fontSize: "0.75rem",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "0.75rem",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon sx={{ fontSize: 14 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Files Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" color="text.secondary" gutterBottom sx={{ mb: 1, fontSize: "0.7rem" }}>
                    File Links (Optional)
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Original File Link"
                    name="linkOrinignFile"
                    value={meetingData.linkOrinignFile}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    placeholder="https://example.com/original.docx"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                        height: 36,
                        fontSize: "0.75rem",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "0.75rem",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachFileIcon sx={{ fontSize: 14 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Box sx={{ mt: 1, textAlign: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting || !teamId}
                      startIcon={
                        isSubmitting ? (
                          <CircularProgress size={12} color="inherit" />
                        ) : (
                          <RocketIcon sx={{ fontSize: 14 }} />
                        )
                      }
                      sx={{
                        py: 1,
                        px: 3,
                        borderRadius: 1,
                        background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        minWidth: 120,
                        height: 32,
                        "&:hover": {
                          background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
                        },
                        "&:disabled": {
                          background: "rgba(0,0,0,0.12)",
                        },
                      }}
                    >
                      {isSubmitting ? "Adding..." : "Add Meeting"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  )
}
