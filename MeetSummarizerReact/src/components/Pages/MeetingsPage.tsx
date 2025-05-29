// "use client"

// import { useEffect, useState } from "react"
// import MeetingList from "../Meeting/MeetingList"
// import { Box, Typography, Container } from "@mui/material"
// import type { MeetingDTO } from "../../models/meetingTypes"
// import { fetchMeetingsByTeam } from "../../services/meetingService"

// const MeetingsPage = () => {
//   const [meetings, setMeetings] = useState<MeetingDTO[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const loadMeetings = async () => {
//       setLoading(true)
//       const data = await fetchMeetingsByTeam()
//       setMeetings(data)
//       setLoading(false)
//     }
//     loadMeetings()
//   }, [])

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
//         py: 4,
//       }}
//     >
//       <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
//         <Box sx={{ textAlign: "center", mb: 6 }}>
//           <Typography
//             variant="h3"
//             component="h1"
//             sx={{
//               fontWeight: 800,
//               background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               mb: 2,
//             }}
//           >
//             Meeting Management
//           </Typography>
//           <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
//             Organize, track, and manage all your meetings in one place
//           </Typography>
//         </Box>

//         {loading ? (
//           <Typography variant="h6" align="center" color="text.secondary">
//             Loading meetings...
//           </Typography>
//         ) : (
//           <MeetingList meetings={meetings} />
//         )}
//       </Container>
//     </Box>
//   )
// }

// export default MeetingsPage








// "use client"

// import { useEffect, useState } from "react"
// import MeetingList from "../Meeting/MeetingList"
// import { Box, Typography, Container } from "@mui/material"
// import type { MeetingDTO } from "../../models/meetingTypes"
// import { fetchMeetingsByTeam } from "../../services/meetingService"

// const MeetingsPage = () => {
//   const [meetings, setMeetings] = useState<MeetingDTO[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const loadMeetings = async () => {
//       setLoading(true)
//       const data = await fetchMeetingsByTeam()
//       setMeetings(data)
//       setLoading(false)
//     }
//     loadMeetings()
//   }, [])

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
//         py: 6,
//       }}
//     >
//       <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
//         <Box sx={{ textAlign: "center", mb: 8 }}>
//           <Typography
//             variant="h2"
//             component="h1"
//             sx={{
//               fontWeight: 900,
//               background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               mb: 3,
//               fontSize: { xs: "2.5rem", md: "4rem" },
//             }}
//           >
//             Meeting Management
//           </Typography>
//           <Typography
//             variant="h5"
//             color="text.secondary"
//             sx={{
//               maxWidth: 700,
//               mx: "auto",
//               fontWeight: 400,
//               lineHeight: 1.6,
//             }}
//           >
//             Organize, track, and manage all your meetings in one centralized platform
//           </Typography>
//         </Box>

//         <Box
//           sx={{
//             background: "rgba(255, 255, 255, 0.7)",
//             backdropFilter: "blur(10px)",
//             borderRadius: 4,
//             border: "1px solid rgba(255, 255, 255, 0.2)",
//             boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
//             p: { xs: 3, md: 6 },
//           }}
//         >
//           {loading ? (
//             <Typography variant="h5" align="center" color="text.secondary" sx={{ py: 8 }}>
//               Loading meetings...
//             </Typography>
//           ) : (
//             <MeetingList meetings={meetings} />
//           )}
//         </Box>
//       </Container>
//     </Box>
//   )
// }

// export default MeetingsPage






"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Alert,
  Fade,
  alpha,
} from "@mui/material"
import {
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  MoreVert as MoreVertIcon,
  FilePresent as FileIcon,
  SmartToy as AiIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material"
import { MeetingDTO } from "../../models/meetingTypes"
import { fetchMeetingsByTeam, deleteMeeting } from "../../services/meetingService"
import { AppDispatch, RootState } from "../../store/store"


const MeetingsPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const meetings = useSelector((state: RootState) => state.meeting.list)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingDTO | null>(null)

  useEffect(() => {
    if (user?.teamId) {
      loadMeetings()
    }
  }, [user])

  const loadMeetings = async () => {
    if (!user?.teamId) return

    try {
      setLoading(true)
      setError(null)
      await dispatch(fetchMeetingsByTeam({ teamId: user.teamId }) as any).unwrap()
    } catch (err: any) {
      setError(err.message || "Failed to load meetings")
    } finally {
      setLoading(false)
    }
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, meeting: MeetingDTO) => {
    setAnchorEl(event.currentTarget)
    setSelectedMeeting(meeting)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedMeeting(null)
  }

  const handleDeleteMeeting = async () => {
    if (!selectedMeeting) return

    try {
      const success = await deleteMeeting(selectedMeeting.id)
      if (success) {
        await loadMeetings()
        setError("✅ Meeting deleted successfully")
        setTimeout(() => setError(null), 3000)
      } else {
        setError("Failed to delete meeting")
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete meeting")
    }
    handleMenuClose()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getMeetingStatus = (meeting: MeetingDTO) => {
    const hasOriginal = !!meeting.linkOrinignFile
    const hasTranscript = !!meeting.linkTranscriptFile

    if (hasOriginal && hasTranscript) return { label: "Complete", color: "success" as const }
    if (hasOriginal) return { label: "Processing", color: "warning" as const }
    return { label: "Pending", color: "default" as const }
  }

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
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
            Loading meetings...
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: { xs: "wrap", sm: "nowrap" },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Team Meetings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and track your team meetings and files
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/add-meeting")}
          sx={{
            borderRadius: "12px",
            background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
            boxShadow: "0 4px 14px rgba(16, 163, 127, 0.3)",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1.5,
            "&:hover": {
              background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
              transform: "translateY(-1px)",
              boxShadow: "0 6px 20px rgba(16, 163, 127, 0.4)",
            },
            transition: "all 0.3s ease",
          }}
        >
          New Meeting
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Fade in={Boolean(error)}>
          <Alert
            severity={error.startsWith("✅") ? "success" : "error"}
            sx={{
              mb: 3,
              borderRadius: "12px",
              "& .MuiAlert-icon": { alignItems: "center" },
            }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        </Fade>
      )}

      {/* Meetings Grid */}
      {meetings.length === 0 ? (
        <Card
          elevation={0}
          sx={{
            textAlign: "center",
            py: 8,
            borderRadius: "16px",
            border: "1px solid",
            borderColor: "rgba(0, 0, 0, 0.08)",
            background: "linear-gradient(135deg, rgba(16, 163, 127, 0.02) 0%, rgba(14, 165, 233, 0.02) 100%)",
          }}
        >
          <Box
            sx={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: alpha("#10a37f", 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <CalendarIcon sx={{ fontSize: 40, color: "#10a37f" }} />
          </Box>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            No meetings yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: "400px", mx: "auto" }}>
            Create your first meeting to start managing files and AI summaries
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/add-meeting")}
            sx={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
              textTransform: "none",
              fontWeight: 600,
              px: 4,
              py: 1.5,
            }}
          >
            Create Meeting
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {meetings.map((meeting:MeetingDTO) => {
            const status = getMeetingStatus(meeting)
            return (
              <Grid item xs={12} sm={6} lg={4} key={meeting.id}>
                <Fade >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: "16px",
                      border: "1px solid",
                      borderColor: "rgba(0, 0, 0, 0.08)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
                        borderColor: "#10a37f",
                      },
                    }}
                    onClick={() => navigate(`/meeting-details/${meeting.id}`)}
                  >
                    <CardContent sx={{ p: 3, height: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            sx={{
                              mb: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {meeting.name}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                            <CalendarIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                            <Typography variant="body2" color="text.secondary">
                              {formatDate(meeting.date)}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMenuClick(e, meeting)
                          }}
                          sx={{
                            color: "text.secondary",
                            "&:hover": { bgcolor: alpha("#10a37f", 0.1) },
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                        <Chip
                          label={status.label}
                          color={status.color}
                          size="small"
                          sx={{
                            borderRadius: "8px",
                            fontWeight: 500,
                          }}
                        />
                      </Box>

                      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            p: 1.5,
                            borderRadius: "8px",
                            backgroundColor: meeting.linkOrinignFile ? alpha("#10a37f", 0.1) : alpha("#000", 0.04),
                            flex: 1,
                          }}
                        >
                          <FileIcon
                            sx={{
                              fontSize: 18,
                              color: meeting.linkOrinignFile ? "#10a37f" : "text.disabled",
                            }}
                          />
                          <Typography
                            variant="caption"
                            color={meeting.linkOrinignFile ? "#10a37f" : "text.disabled"}
                            fontWeight={500}
                          >
                            Original
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            p: 1.5,
                            borderRadius: "8px",
                            backgroundColor: meeting.linkTranscriptFile ? alpha("#0ea5e9", 0.1) : alpha("#000", 0.04),
                            flex: 1,
                          }}
                        >
                          <AiIcon
                            sx={{
                              fontSize: 18,
                              color: meeting.linkTranscriptFile ? "#0ea5e9" : "text.disabled",
                            }}
                          />
                          <Typography
                            variant="caption"
                            color={meeting.linkTranscriptFile ? "#0ea5e9" : "text.disabled"}
                            fontWeight={500}
                          >
                            AI Summary
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            )
          })}
        </Grid>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            border: "1px solid",
            borderColor: "divider",
            minWidth: 160,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            if (selectedMeeting) navigate(`/meeting-details/${selectedMeeting.id}`)
            handleMenuClose()
          }}
          sx={{ gap: 2 }}
        >
          <ViewIcon fontSize="small" />
          View Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedMeeting) navigate(`/edit-meeting/${selectedMeeting.id}`)
            handleMenuClose()
          }}
          sx={{ gap: 2 }}
        >
          <EditIcon fontSize="small" />
          Edit Meeting
        </MenuItem>
        <MenuItem onClick={handleDeleteMeeting} sx={{ gap: 2, color: "error.main" }}>
          <DeleteIcon fontSize="small" />
          Delete Meeting
        </MenuItem>
      </Menu>
    </Container>
  )
}

export default MeetingsPage
