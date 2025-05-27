// "use client"

// import { useParams, useNavigate } from "react-router-dom"
// import { useState, useEffect } from "react"
// import {
//   Typography,
//   Box,
//   IconButton,
//   Dialog,
//   DialogContent,
//   Paper,
//   Divider,
//   Chip,
//   Grid,
//   Avatar,
//   Skeleton,
//   Alert,
//   Tooltip,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material"
// import {
//   Edit as EditIcon,
//   ArrowBack as ArrowBackIcon,
//   CalendarToday as CalendarTodayIcon,
//   Link as LinkIcon,
//   Description as DescriptionIcon,
//   Close as CloseIcon,
// } from "@mui/icons-material"
// import { motion } from "framer-motion"
// import UpdateMeetingDialog from "./UpdateMeetingDialog"
// import axios from "axios"
// import type { MeetingDTO } from "../../models/meetingTypes"
// import { fetchMeetingById } from "../../services/meetingService"
// import FileUploader from "../File/FileUploader"
// import FileViewer from "../File/FileViewer"

// export default function MeetingDetails() {

//   const apiUrl = import.meta.env.VITE_API_URL;

//   const { meetingId } = useParams<{ meetingId: string }>()
//   const [meeting, setMeeting] = useState<MeetingDTO | null>(null)
//   const [selectedMeeting, setSelectedMeeting] = useState<MeetingDTO | null>(null)
//   const [fileContent, setFileContent] = useState<string | null>(null)
//   const [isFileDialogOpen, setIsFileDialogOpen] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const navigate = useNavigate()
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))

//   useEffect(() => {
//     const getMeeting = async () => {
//       try {
//         setLoading(true)
//         const data = await fetchMeetingById(Number(meetingId))
//         setMeeting(data)
//       } catch (err) {
//         console.error("Error fetching meeting:", err)
//         setError("שגיאה בטעינת פרטי הפגישה")
//       } finally {
//         setLoading(false)
//       }
//     }
//     getMeeting()
//   }, [meetingId])

//   const handleUpdate = (updatedMeeting: MeetingDTO) => {
//     setMeeting(updatedMeeting)
//   }

//   const fetchFileContent = async (fileUrl: string) => {
//     try {
//       // Get download URL from file path
//       const response = await axios.get(`${apiUrl}/upload/download-url`, {
//         params: { fileName: fileUrl },
//         headers: { Authorization: `Bearer ${getCookie("auth_token")}` },
//       })

//       const downloadUrl = response.data.downloadUrl

//       // Fetch file content
//       const fileResponse = await axios.get(downloadUrl, { responseType: "text" })
//       setFileContent(fileResponse.data)
//       setIsFileDialogOpen(true)
//     } catch (error) {
//       console.error("❌ שגיאה בטעינת תוכן הקובץ:", error)
//       setFileContent("⚠️ שגיאה בטעינת הקובץ")
//       setIsFileDialogOpen(true)
//     }
//   }

//   const formatDate = (dateString: string) => {
//     try {
//       const date = new Date(dateString)
//       return new Intl.DateTimeFormat("he-IL", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       }).format(date)
//     } catch (e) {
//       return dateString
//     }
//   }

//   // Helper function to get file name from path
//   const getFileName = (filePath: string) => {
//     if (!filePath) return ""
//     return filePath.split("/").pop() || "קובץ"
//   }

//   // Helper function to get cookie value
//   function getCookie(name: string): string | null {
//     const cookies = document.cookie.split("; ")
//     for (const cookie of cookies) {
//       const [key, value] = cookie.split("=")
//       if (key === name) {
//         return decodeURIComponent(value)
//       }
//     }
//     return null
//   }

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100%",
//         boxSizing: "border-box",
//       }}
//     >
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//           <IconButton onClick={() => navigate("/meetings")} sx={{ mr: 2 }} aria-label="חזרה לרשימת הפגישות">
//             <ArrowBackIcon />
//           </IconButton>
//           <Typography variant="h5" fontWeight={600}>
//             פרטי פגישה
//           </Typography>
//         </Box>

//         {loading ? (
//           <Paper
//             elevation={0}
//             sx={{
//               p: 3,
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: "divider",
//               bgcolor: "background.paper",
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//               <Skeleton variant="circular" width={50} height={50} sx={{ mr: 2 }} />
//               <Skeleton variant="text" width={200} height={40} />
//             </Box>
//             <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
//             <Skeleton variant="text" width="40%" sx={{ mb: 3 }} />
//             <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
//           </Paper>
//         ) : error ? (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {error}
//           </Alert>
//         ) : meeting ? (
//           <Paper
//             elevation={0}
//             sx={{
//               p: 0,
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: "divider",
//               bgcolor: "background.paper",
//               overflow: "hidden",
//             }}
//           >
//             <Box sx={{ p: 3 }}>
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <Avatar
//                     sx={{
//                       bgcolor: "primary.main",
//                       width: 50,
//                       height: 50,
//                       mr: 2,
//                     }}
//                   >
//                     {meeting.name.charAt(0).toUpperCase()}
//                   </Avatar>
//                   <Typography variant="h5" fontWeight={600}>
//                     {meeting.name}
//                   </Typography>
//                 </Box>
//                 <Tooltip title="ערוך פגישה">
//                   <IconButton
//                     color="primary"
//                     onClick={() => setSelectedMeeting(meeting)}
//                     size="small"
//                     sx={{
//                       bgcolor: "rgba(0, 0, 0, 0.04)",
//                       "&:hover": {
//                         bgcolor: "rgba(0, 0, 0, 0.08)",
//                       },
//                     }}
//                   >
//                     <EditIcon fontSize="small" />
//                   </IconButton>
//                 </Tooltip>
//               </Box>

//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <Box sx={{ mb: 3 }}>
//                     <Typography variant="body2" color="text.secondary" gutterBottom>
//                       תאריך ושעה
//                     </Typography>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: "primary.main" }} />
//                       <Typography variant="body1" fontWeight={500}>
//                         {formatDate(meeting.date)}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {meeting.linkOrinignFile && (
//                     <Box sx={{ mb: 3 }}>
//                       <Typography variant="body2" color="text.secondary" gutterBottom>
//                         קובץ מקור
//                       </Typography>
//                       <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                         <DescriptionIcon fontSize="small" sx={{ mr: 1, color: "primary.main" }} />
//                         <Typography variant="body1" fontWeight={500}>
//                           {getFileName(meeting.linkOrinignFile)}
//                         </Typography>
//                       </Box>

//                       <FileViewer filePath={meeting.linkOrinignFile} fileName={getFileName(meeting.linkOrinignFile)} />
//                     </Box>
//                   )}
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   {meeting.linkTranscriptFile ? (
//                     <Box sx={{ mb: 3 }}>
//                       <Typography variant="body2" color="text.secondary" gutterBottom>
//                         קובץ תמלול
//                       </Typography>
//                       <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                         <LinkIcon fontSize="small" sx={{ mr: 1, color: "primary.main" }} />
//                         <Typography variant="body1" fontWeight={500}>
//                           {getFileName(meeting.linkTranscriptFile)}
//                         </Typography>
//                       </Box>

//                       <FileViewer
//                         filePath={meeting.linkTranscriptFile}
//                         fileName={getFileName(meeting.linkTranscriptFile)}
//                         isAiGenerated={true}
//                       />
//                     </Box>
//                   ) : (
//                     <Box sx={{ mb: 3 }}>
//                       <Typography variant="body2" color="text.secondary" gutterBottom>
//                         קובץ תמלול
//                       </Typography>
//                       <Chip
//                         label="אין קובץ תמלול"
//                         size="small"
//                         sx={{
//                           bgcolor: "warning.lighter",
//                           color: "warning.dark",
//                           fontWeight: 500,
//                         }}
//                       />
//                     </Box>
//                   )}
//                 </Grid>
//               </Grid>
//             </Box>

//             <Divider />

//             <Box sx={{ p: 3, bgcolor: "rgba(0, 0, 0, 0.01)" }}>
//               <Typography variant="h6" fontWeight={600} gutterBottom>
//                 העלאת קבצים
//               </Typography>
//               <FileUploader />
//             </Box>
//           </Paper>
//         ) : (
//           <Alert severity="warning">לא נמצאה פגישה עם המזהה המבוקש</Alert>
//         )}
//       </motion.div>

//       <Dialog
//         fullScreen={isMobile}
//         maxWidth="md"
//         open={isFileDialogOpen}
//         onClose={() => setIsFileDialogOpen(false)}
//         PaperProps={{
//           sx: {
//             borderRadius: isMobile ? 0 : 2,
//             maxHeight: isMobile ? "100%" : "80vh",
//           },
//         }}
//       >
//         <DialogContent sx={{ p: 3, bgcolor: "#f9f9f9" }}>
//           <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
//             <Typography variant="h6" fontWeight={600}>
//               תוכן הקובץ
//             </Typography>
//             <IconButton edge="end" color="inherit" onClick={() => setIsFileDialogOpen(false)} aria-label="close">
//               <CloseIcon />
//             </IconButton>
//           </Box>
//           <Divider sx={{ mb: 2 }} />
//           <Paper
//             elevation={0}
//             sx={{
//               p: 3,
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: "divider",
//               bgcolor: "background.paper",
//               maxHeight: "calc(80vh - 120px)",
//               overflow: "auto",
//             }}
//           >
//             <Typography
//               variant="body1"
//               component="pre"
//               sx={{
//                 whiteSpace: "pre-wrap",
//                 fontFamily: "monospace",
//                 fontSize: "0.9rem",
//                 lineHeight: 1.6,
//               }}
//             >
//               {fileContent}
//             </Typography>
//           </Paper>
//         </DialogContent>
//       </Dialog>

//       {selectedMeeting && (
//         <UpdateMeetingDialog
//           open={Boolean(selectedMeeting)}
//           handleClose={() => setSelectedMeeting(null)}
//           meeting={selectedMeeting}
//           onUpdate={handleUpdate}
//         />
//       )}
//     </Box>
//   )
// }





"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Avatar,
  Chip,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Skeleton,
} from "@mui/material"
import {
  CalendarMonth as CalendarIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Group as GroupIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  PictureAsPdf as PdfIcon,
  Article as DocIcon,
  AudioFile as AudioIcon,
  VideoFile as VideoIcon,
  InsertDriveFile as FileIcon,
  AutoAwesome as AIIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"

interface MeetingData {
  id: number
  name: string
  description: string
  date: string
  time: string
  location: string
  team: string
  participants: string[]
  originalFile?: {
    name: string
    type: string
    size: string
    url: string
  }
  transcriptFile?: {
    name: string
    type: string
    size: string
    url: string
  }
  summary?: string
  keyPoints?: string[]
  actionItems?: string[]
}

const MeetingDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [meetingData, setMeetingData] = useState<MeetingData | null>(null)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMeetingData({
        id: Number(id),
        name: "Q4 Planning Meeting",
        description:
          "Strategic planning session for the upcoming quarter with focus on product roadmap and team objectives.",
        date: "2024-01-15",
        time: "14:00",
        location: "Conference Room A / Zoom",
        team: "Development Team",
        participants: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"],
        originalFile: {
          name: "Q4-Planning-Recording.mp4",
          type: "video",
          size: "245 MB",
          url: "#",
        },
        transcriptFile: {
          name: "Q4-Planning-Summary.pdf",
          type: "pdf",
          size: "2.1 MB",
          url: "#",
        },
        summary:
          "The Q4 planning meeting focused on establishing clear objectives for the upcoming quarter. The team discussed product roadmap priorities, resource allocation, and timeline expectations. Key decisions were made regarding feature development and team structure adjustments.",
        keyPoints: [
          "Product roadmap finalized for Q4 with 3 major features",
          "Team structure reorganization approved",
          "Budget allocation confirmed for new tools and resources",
          "Timeline established for feature releases",
          "Performance metrics and KPIs defined",
        ],
        actionItems: [
          "John to prepare detailed technical specifications by Jan 20",
          "Jane to coordinate with design team for UI mockups",
          "Mike to set up development environment for new features",
          "Sarah to schedule follow-up meetings with stakeholders",
        ],
      })
      setLoading(false)
    }, 1000)
  }, [id])

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <PdfIcon sx={{ color: "#f44336", fontSize: 32 }} />
      case "doc":
        return <DocIcon sx={{ color: "#2196f3", fontSize: 32 }} />
      case "audio":
        return <AudioIcon sx={{ color: "#ff9800", fontSize: 32 }} />
      case "video":
        return <VideoIcon sx={{ color: "#9c27b0", fontSize: 32 }} />
      default:
        return <FileIcon sx={{ color: "#757575", fontSize: 32 }} />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          py: 6,
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 4, mb: 4 }} />
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 4 }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 4 }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    )
  }

  if (!meetingData) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" color="text.secondary">
          Meeting not found
        </Typography>
      </Box>
    )
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
                fontSize: "1.1rem",
                "&:hover": {
                  color: "#10a37f",
                  backgroundColor: "rgba(16, 163, 127, 0.1)",
                },
              }}
            >
              Back to Meetings
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
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
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "6px",
                    background: "linear-gradient(90deg, #10a37f 0%, #0ea5e9 100%)",
                  },
                }}
              >
                <Box sx={{ p: { xs: 4, md: 6 } }}>
                  <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={8}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Avatar
                          sx={{
                            width: 64,
                            height: 64,
                            background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                            mr: 3,
                          }}
                        >
                          <CalendarIcon sx={{ fontSize: 32, color: "white" }} />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                              fontWeight: 800,
                              color: "text.primary",
                              mb: 1,
                              fontSize: { xs: "2rem", md: "2.5rem" },
                            }}
                          >
                            {meetingData.name}
                          </Typography>
                          <Chip
                            label={meetingData.team}
                            sx={{
                              background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                              color: "white",
                              fontWeight: 600,
                              fontSize: "1rem",
                            }}
                          />
                        </Box>
                      </Box>

                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.6,
                          fontWeight: 400,
                        }}
                      >
                        {meetingData.description}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "center", md: "flex-end" } }}>
                        <Tooltip title="Edit Meeting">
                          <IconButton
                            size="large"
                            sx={{
                              background: "rgba(16, 163, 127, 0.1)",
                              color: "#10a37f",
                              "&:hover": {
                                background: "rgba(16, 163, 127, 0.2)",
                                transform: "translateY(-2px)",
                              },
                              transition: "all 0.3s ease",
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Share Meeting">
                          <IconButton
                            size="large"
                            sx={{
                              background: "rgba(14, 165, 233, 0.1)",
                              color: "#0ea5e9",
                              "&:hover": {
                                background: "rgba(14, 165, 233, 0.2)",
                                transform: "translateY(-2px)",
                              },
                              transition: "all 0.3s ease",
                            }}
                          >
                            <ShareIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Meeting">
                          <IconButton
                            size="large"
                            sx={{
                              background: "rgba(239, 68, 68, 0.1)",
                              color: "#ef4444",
                              "&:hover": {
                                background: "rgba(239, 68, 68, 0.2)",
                                transform: "translateY(-2px)",
                              },
                              transition: "all 0.3s ease",
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </motion.div>
          </Box>

          <Grid container spacing={6}>
            {/* Main Content */}
            <Grid item xs={12} lg={8}>
              {/* Meeting Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                    mb: 4,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
                      Meeting Details
                    </Typography>
                    <Divider sx={{ mb: 4, borderColor: "rgba(0,0,0,0.1)" }} />

                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                          <CalendarIcon sx={{ color: "#10a37f", mr: 2, fontSize: 28 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" fontWeight={600}>
                              Date
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                              {formatDate(meetingData.date)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                          <TimeIcon sx={{ color: "#0ea5e9", mr: 2, fontSize: 28 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" fontWeight={600}>
                              Time
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                              {meetingData.time}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                          <LocationIcon sx={{ color: "#8b5cf6", mr: 2, fontSize: 28 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" fontWeight={600}>
                              Location
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                              {meetingData.location}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                          <GroupIcon sx={{ color: "#f59e0b", mr: 2, fontSize: 28 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" fontWeight={600}>
                              Participants
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                              {meetingData.participants.length} members
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>

              {/* AI Summary */}
              {meetingData.summary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                      mb: 4,
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: "linear-gradient(90deg, #10a37f 0%, #0ea5e9 100%)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <AIIcon sx={{ color: "#10a37f", mr: 2, fontSize: 32 }} />
                        <Typography variant="h4" fontWeight={700} color="text.primary">
                          AI-Generated Summary
                        </Typography>
                        <Chip
                          label="AI Powered"
                          size="small"
                          sx={{
                            ml: 2,
                            background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <Divider sx={{ mb: 4, borderColor: "rgba(0,0,0,0.1)" }} />
                      <Typography
                        variant="h6"
                        sx={{
                          lineHeight: 1.8,
                          color: "text.primary",
                          fontWeight: 400,
                        }}
                      >
                        {meetingData.summary}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Key Points & Action Items */}
              <Grid container spacing={4}>
                {meetingData.keyPoints && (
                  <Grid item xs={12} md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <Card
                        sx={{
                          borderRadius: 4,
                          background: "rgba(255, 255, 255, 0.9)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                          height: "100%",
                        }}
                      >
                        <CardContent sx={{ p: 4 }}>
                          <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
                            Key Points
                          </Typography>
                          <Divider sx={{ mb: 3, borderColor: "rgba(0,0,0,0.1)" }} />
                          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {meetingData.keyPoints.map((point, index) => (
                              <Box key={index} sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                                <CheckIcon sx={{ color: "#10a37f", mt: 0.5, fontSize: 20 }} />
                                <Typography variant="body1" sx={{ lineHeight: 1.6, fontWeight: 500 }}>
                                  {point}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                )}

                {meetingData.actionItems && (
                  <Grid item xs={12} md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <Card
                        sx={{
                          borderRadius: 4,
                          background: "rgba(255, 255, 255, 0.9)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                          height: "100%",
                        }}
                      >
                        <CardContent sx={{ p: 4 }}>
                          <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
                            Action Items
                          </Typography>
                          <Divider sx={{ mb: 3, borderColor: "rgba(0,0,0,0.1)" }} />
                          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {meetingData.actionItems.map((item, index) => (
                              <Box key={index} sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                                <Box
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)",
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "0.8rem",
                                    fontWeight: 700,
                                    mt: 0.2,
                                  }}
                                >
                                  {index + 1}
                                </Box>
                                <Typography variant="body1" sx={{ lineHeight: 1.6, fontWeight: 500 }}>
                                  {item}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                )}
              </Grid>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} lg={4}>
              {/* Files */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                    mb: 4,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
                      Meeting Files
                    </Typography>
                    <Divider sx={{ mb: 3, borderColor: "rgba(0,0,0,0.1)" }} />

                    {meetingData.originalFile && (
                      <Paper
                        sx={{
                          p: 3,
                          mb: 3,
                          borderRadius: 3,
                          border: "1px solid",
                          borderColor: "divider",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          {getFileIcon(meetingData.originalFile.type)}
                          <Box sx={{ ml: 2, flexGrow: 1 }}>
                            <Typography variant="body1" fontWeight={600}>
                              Original Recording
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {meetingData.originalFile.size}
                            </Typography>
                          </Box>
                        </Box>
                        <Button
                          variant="outlined"
                          startIcon={<DownloadIcon />}
                          fullWidth
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            borderColor: "#10a37f",
                            color: "#10a37f",
                            "&:hover": {
                              borderColor: "#0e8a6c",
                              backgroundColor: "rgba(16, 163, 127, 0.1)",
                            },
                          }}
                        >
                          Download
                        </Button>
                      </Paper>
                    )}

                    {meetingData.transcriptFile && (
                      <Paper
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          border: "1px solid",
                          borderColor: "divider",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          {getFileIcon(meetingData.transcriptFile.type)}
                          <Box sx={{ ml: 2, flexGrow: 1 }}>
                            <Typography variant="body1" fontWeight={600}>
                              AI Summary
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {meetingData.transcriptFile.size}
                            </Typography>
                          </Box>
                        </Box>
                        <Button
                          variant="outlined"
                          startIcon={<DownloadIcon />}
                          fullWidth
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            borderColor: "#0ea5e9",
                            color: "#0ea5e9",
                            "&:hover": {
                              borderColor: "#0284c7",
                              backgroundColor: "rgba(14, 165, 233, 0.1)",
                            },
                          }}
                        >
                          Download
                        </Button>
                      </Paper>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Participants */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
                      Participants
                    </Typography>
                    <Divider sx={{ mb: 3, borderColor: "rgba(0,0,0,0.1)" }} />

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {meetingData.participants.map((participant, index) => (
                        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              background: `linear-gradient(135deg, ${
                                ["#10a37f", "#0ea5e9", "#8b5cf6", "#f59e0b"][index % 4]
                              } 0%, ${["#0e8a6c", "#0284c7", "#7c3aed", "#d97706"][index % 4]} 100%)`,
                              fontWeight: 600,
                            }}
                          >
                            {participant.charAt(0)}
                          </Avatar>
                          <Typography variant="body1" fontWeight={600}>
                            {participant}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
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

export default MeetingDetails
