"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Grid,
  Button,
  Skeleton,
  Tooltip,
  Container,
  Card,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
  Add as AddIcon,
  CalendarMonth as CalendarIcon,
  Description as DescriptionIcon,
  Group as TeamIcon,
  PictureAsPdf as PdfIcon,
  Article as DocIcon,
  Image as ImageIcon,
  TextSnippet as TextIcon,
  InsertDriveFile as FileIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../store/store"
import { fetchMeetingsByTeam } from "../../store/meetingSlice"

interface RecentFile {
  name: string
  path: string
  meetingId: number
  fileType: string
  date: Date
}

interface TeamActivity {
  id: number
  type: "file_upload" | "meeting_created" | "meeting_updated"
  description: string
  date: Date
  meetingId: number
  meetingName: string
}

export default function HomePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [loading, setLoading] = useState(true)
  const [upcomingMeetings, setUpcomingMeetings] = useState<any[]>([])
  const [recentFiles, setRecentFiles] = useState<RecentFile[]>([])
  const [teamActivities, setTeamActivities] = useState<TeamActivity[]>([])

  const { user } = useSelector((state: RootState) => state.auth)
  const meetings = useSelector((state: RootState) => state.meeting.list)

  useEffect(() => {
    if (user?.teamId) {
      setLoading(true)

      if (meetings.length === 0) {
        dispatch(fetchMeetingsByTeam({ teamId: user.teamId }))
          .unwrap()
          .then((fetchedMeetings) => {
            processData(fetchedMeetings)
          })
          .catch((error) => {
            console.error("Error fetching meetings:", error)
          })
          .finally(() => {
            setLoading(false)
          })
      } else {
        processData(meetings)
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [user, meetings, dispatch]) // Updated dependency array

  const processData = (meetingsData: any[]) => {
    const now = new Date()
    const upcoming = [...meetingsData]
      .filter((meeting) => new Date(meeting.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3)

    setUpcomingMeetings(upcoming)

    const files: RecentFile[] = []

    meetingsData.forEach((meeting) => {
      if (meeting.linkOrinignFile) {
        const fileName = meeting.linkOrinignFile.split("/").pop() || "File"
        const fileType = getFileType(fileName)

        files.push({
          name: fileName,
          path: `/meeting-details/${meeting.id}`,
          meetingId: meeting.id,
          fileType: fileType,
          date: new Date(meeting.date),
        })
      }

      if (meeting.linkTranscriptFile) {
        const fileName = meeting.linkTranscriptFile.split("/").pop() || "Summary"
        const fileType = getFileType(fileName)

        files.push({
          name: `Summary - ${fileName}`,
          path: `/meeting-details/${meeting.id}`,
          meetingId: meeting.id,
          fileType: fileType,
          date: new Date(meeting.date),
        })
      }
    })

    const sortedFiles = files.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 3)
    setRecentFiles(sortedFiles)

    const activities: TeamActivity[] = []

    meetingsData.forEach((meeting) => {
      activities.push({
        id: meeting.id * 100,
        type: "meeting_created",
        description: `New meeting created: ${meeting.name}`,
        date: new Date(meeting.date),
        meetingId: meeting.id,
        meetingName: meeting.name,
      })

      if (meeting.linkOrinignFile) {
        const fileName = meeting.linkOrinignFile.split("/").pop() || "File"
        activities.push({
          id: meeting.id * 100 + 1,
          type: "file_upload",
          description: `File uploaded: ${fileName}`,
          date: new Date(meeting.date),
          meetingId: meeting.id,
          meetingName: meeting.name,
        })
      }

      if (meeting.linkTranscriptFile) {
        const fileName = meeting.linkTranscriptFile.split("/").pop() || "Summary"
        activities.push({
          id: meeting.id * 100 + 2,
          type: "file_upload",
          description: `Summary uploaded: ${fileName}`,
          date: new Date(meeting.date),
          meetingId: meeting.id,
          meetingName: meeting.name,
        })
      }
    })

    const sortedActivities = activities.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 3)
    setTeamActivities(sortedActivities)
  }

  const getFileType = (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase() || ""

    if (["pdf"].includes(extension)) return "pdf"
    if (["doc", "docx"].includes(extension)) return "doc"
    if (["jpg", "jpeg", "png", "gif"].includes(extension)) return "image"
    if (["txt", "md"].includes(extension)) return "text"

    return "file"
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <PdfIcon fontSize="small" sx={{ color: "#f44336" }} />
      case "doc":
        return <DocIcon fontSize="small" sx={{ color: "#2196f3" }} />
      case "image":
        return <ImageIcon fontSize="small" sx={{ color: "#4caf50" }} />
      case "text":
        return <TextIcon fontSize="small" sx={{ color: "#ff9800" }} />
      default:
        return <FileIcon fontSize="small" sx={{ color: "#757575" }} />
    }
  }

  const formatDate = (dateString: string | Date) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)

      if (date.toDateString() === now.toDateString()) {
        return `Today, ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
      }

      if (date.toDateString() === tomorrow.toDateString()) {
        return `Tomorrow, ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
      }

      return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    } catch (e) {
      return String(dateString)
    }
  }

  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else {
      return `${diffDays}d ago`
    }
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {/* Hero Section */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                }}
              >
                Welcome to MeetingFiles
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  maxWidth: 800,
                  mx: "auto",
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                Streamline your meeting management with AI-powered summaries, file organization, and team collaboration
                tools
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => navigate("/add-meeting")}
                sx={{
                  px: 4,
                  py: 2,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                  boxShadow: "0 8px 24px rgba(16, 163, 127, 0.3)",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  "&:hover": {
                    background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
                    boxShadow: "0 12px 32px rgba(16, 163, 127, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Create New Meeting
              </Button>
            </motion.div>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {[
              {
                title: "Total Meetings",
                value: meetings.length,
                icon: <CalendarIcon />,
                color: "#10a37f",
                trend: "+12%",
              },
              {
                title: "Files Processed",
                value: recentFiles.length * 3,
                icon: <DescriptionIcon />,
                color: "#0ea5e9",
                trend: "+8%",
              },
              {
                title: "Team Members",
                value: "5",
                icon: <TeamIcon />,
                color: "#8b5cf6",
                trend: "+2",
              },
              {
                title: "AI Summaries",
                value: teamActivities.filter((a) => a.type === "file_upload").length,
                icon: <TrendingUpIcon />,
                color: "#f59e0b",
                trend: "+15%",
              },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={stat.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      background: "white",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            backgroundColor: `${stat.color}20`,
                            color: stat.color,
                          }}
                        >
                          {stat.icon}
                        </Avatar>
                        <Chip
                          label={stat.trend}
                          size="small"
                          sx={{
                            backgroundColor: "#dcfce7",
                            color: "#16a34a",
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Main Content Grid */}
          <Grid container spacing={4}>
            {/* Upcoming Meetings */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
                    minHeight: 400,
                    display: "flex",
                    flexDirection: "column",
                    background: "white",
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
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          backgroundColor: "#10a37f20",
                          color: "#10a37f",
                          mr: 2,
                        }}
                      >
                        <ScheduleIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          Upcoming Meetings
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Your next scheduled sessions
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      {loading ? (
                        Array.from(new Array(3)).map((_, index) => (
                          <Box key={index} sx={{ mb: 2 }}>
                            <Skeleton variant="text" width="80%" height={24} />
                            <Skeleton variant="text" width="60%" height={20} />
                          </Box>
                        ))
                      ) : upcomingMeetings.length > 0 ? (
                        upcomingMeetings.map((meeting, index) => (
                          <Box
                            key={meeting.id}
                            sx={{
                              p: 2,
                              mb: 2,
                              borderRadius: 2,
                              border: "1px solid",
                              borderColor: "divider",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                borderColor: "#10a37f",
                                backgroundColor: "#10a37f05",
                                transform: "translateX(4px)",
                              },
                            }}
                            onClick={() => navigate(`/meeting-details/${meeting.id}`)}
                          >
                            <Typography variant="body1" fontWeight={600} color="text.primary" gutterBottom>
                              {meeting.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatDate(meeting.date)}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                          <CalendarIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                          <Typography variant="body2" color="text.secondary">
                            No upcoming meetings
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <Button
                      variant="text"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate("/meetings")}
                      sx={{
                        mt: 2,
                        color: "#10a37f",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#10a37f10",
                        },
                      }}
                    >
                      View All Meetings
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Recent Files */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
                    minHeight: 400,
                    display: "flex",
                    flexDirection: "column",
                    background: "white",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: "linear-gradient(90deg, #0ea5e9 0%, #8b5cf6 100%)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          backgroundColor: "#0ea5e920",
                          color: "#0ea5e9",
                          mr: 2,
                        }}
                      >
                        <DescriptionIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          Recent Files
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Latest uploaded documents
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      {loading ? (
                        Array.from(new Array(3)).map((_, index) => (
                          <Box key={index} sx={{ mb: 2 }}>
                            <Skeleton variant="text" width="80%" height={24} />
                          </Box>
                        ))
                      ) : recentFiles.length > 0 ? (
                        recentFiles.map((file, index) => (
                          <Tooltip
                            key={`${file.meetingId}-${index}`}
                            title={`Meeting: ${meetings.find((m: { id: number }) => m.id === file.meetingId)?.name || ""}`}
                          >
                            <Box
                              sx={{
                                p: 2,
                                mb: 2,
                                borderRadius: 2,
                                border: "1px solid",
                                borderColor: "divider",
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  borderColor: "#0ea5e9",
                                  backgroundColor: "#0ea5e905",
                                  transform: "translateX(4px)",
                                },
                              }}
                              onClick={() => navigate(file.path)}
                            >
                              {getFileIcon(file.fileType)}
                              <Typography variant="body2" sx={{ flexGrow: 1 }} noWrap>
                                {file.name}
                              </Typography>
                            </Box>
                          </Tooltip>
                        ))
                      ) : (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                          <DescriptionIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                          <Typography variant="body2" color="text.secondary">
                            No recent files
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <Button
                      variant="text"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate("/meetings")}
                      sx={{
                        mt: 2,
                        color: "#0ea5e9",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#0ea5e910",
                        },
                      }}
                    >
                      View All Files
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Team Activity */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
                    minHeight: 400,
                    display: "flex",
                    flexDirection: "column",
                    background: "white",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: "linear-gradient(90deg, #8b5cf6 0%, #f59e0b 100%)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          backgroundColor: "#8b5cf620",
                          color: "#8b5cf6",
                          mr: 2,
                        }}
                      >
                        <TeamIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          Team Activity
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Recent team actions
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      {loading ? (
                        Array.from(new Array(3)).map((_, index) => (
                          <Box key={index} sx={{ mb: 2 }}>
                            <Skeleton variant="text" width="80%" height={24} />
                            <Skeleton variant="text" width="40%" height={20} />
                          </Box>
                        ))
                      ) : teamActivities.length > 0 ? (
                        teamActivities.map((activity, index) => (
                          <Box
                            key={activity.id}
                            sx={{
                              p: 2,
                              mb: 2,
                              borderRadius: 2,
                              border: "1px solid",
                              borderColor: "divider",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                borderColor: "#8b5cf6",
                                backgroundColor: "#8b5cf605",
                                transform: "translateX(4px)",
                              },
                            }}
                            onClick={() => navigate(`/meeting-details/${activity.meetingId}`)}
                          >
                            <Typography variant="body2" gutterBottom>
                              {activity.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {getRelativeTime(activity.date)}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                          <TeamIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                          <Typography variant="body2" color="text.secondary">
                            No recent activities
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <Button
                      variant="text"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate("/meetings")}
                      sx={{
                        mt: 2,
                        color: "#8b5cf6",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#8b5cf610",
                        },
                      }}
                    >
                      View All Activities
                    </Button>
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
