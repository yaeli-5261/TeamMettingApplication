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
      setError("❌ לא ניתן לזהות את מזהה הצוות. אנא התחבר מחדש למערכת.")
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value })
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!meetingData.teamId && !teamId) {
      setError("❌ מזהה צוות חסר. אנא התחבר מחדש למערכת.")
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
        setSuccess("✅ הפגישה נוספה בהצלחה!")
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
      setError("❌ הוספת הפגישה נכשלה. אנא נסה שוב.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{
    // {{ width: "55vw", height:"50vh", pl: 20,}}
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between", // מבטיח שהפוטר יהיה בתחתית
    width: "80%",
    height: "100%", // גובה מלא של המסך
    boxSizing: "border-box",
    p: { xs: 2, md: 3 },
    marginLeft:"100px",
    }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/meetings")}
            sx={{
              mb: 2,
              color: "text.secondary",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                color: "#10a37f",
                backgroundColor: "rgba(16, 163, 127, 0.1)",
              },
            }}
          >
            חזרה לרשימת הפגישות
          </Button>

          <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
            הוספת פגישה חדשה
          </Typography>
          <Typography variant="body1" color="text.secondary">
            מלא את הפרטים הבאים כדי ליצור פגישה חדשה
          </Typography>
        </Box>

        {/* Main Form */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            background: "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
          }}
        >
          {/* Header Card */}
          <Box
            sx={{
              p: 3,
              background: "linear-gradient(135deg, #10a37f, #0e8a6c)",
              color: "white",
              textAlign: "center",
            }}
          >
            <EventNoteIcon sx={{ fontSize: 32, mb: 1 }} />
            <Typography variant="h6" fontWeight={600} gutterBottom>
              הוספת פגישה חדשה
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              מלא את הפרטים הבאים כדי ליצור פגישה חדשה
            </Typography>
          </Box>

          {/* Form Content */}
          <Box sx={{ p: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2, borderRadius: 1 }}>
                {success}
              </Alert>
            )}

            {teamId ? (
              <Alert severity="info" sx={{ mb: 2, borderRadius: 1 }}>
                מזהה צוות: {teamId}
              </Alert>
            ) : (
              <Alert severity="warning" sx={{ mb: 2, borderRadius: 1 }}>
                לא זוהה מזהה צוות. אנא התחבר מחדש למערכת.
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Meeting Name */}
                <Grid item xs={12}>
                  <TextField
                    label="שם הפגישה"
                    name="name"
                    value={meetingData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                        height: 48,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TitleIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Date and Time */}
                <Grid item xs={12}>
                  <TextField
                    label="תאריך ושעת הפגישה"
                    name="date"
                    type="datetime-local"
                    value={meetingData.date}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                        height: 48,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Files Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                    קישורים לקבצים (אופציונלי)
                  </Typography>
                </Grid>

                <Grid item xs={12} >
                  <TextField
                    label="קישור לקובץ מקורי"
                    name="linkOrinignFile"
                    value={meetingData.linkOrinignFile}
                    onChange={handleChange}
                    fullWidth
                    placeholder="https://example.com/original.docx"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                        height: 48,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachFileIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting || !teamId}
                      startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : <RocketIcon />}
                      sx={{
                        py: 1.5,
                        px: 4,
                        borderRadius: 2,
                        background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                        textTransform: "none",
                        fontWeight: 600,
                        minWidth: 160,
                        "&:hover": {
                          background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
                        },
                        "&:disabled": {
                          background: "rgba(0,0,0,0.12)",
                        },
                      }}
                    >
                      {isSubmitting ? "מוסיף פגישה..." : "הוסף פגישה"}
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
