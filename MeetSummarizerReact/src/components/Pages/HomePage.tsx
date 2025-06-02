"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Grid,
  Button,
  Skeleton,
  Container,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  Divider,
  IconButton,
} from "@mui/material"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
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
  Settings as SettingsIcon,
  Add as AddIcon,
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
  }, [user, meetings, dispatch])

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
          name: `AI Summary - ${fileName}`,
          path: `/meeting-details/${meeting.id}`,
          meetingId: meeting.id,
          fileType: fileType,
          date: new Date(meeting.date),
        })
      }
    })

    const sortedFiles = files.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 4)
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
        activities.push({
          id: meeting.id * 100 + 2,
          type: "file_upload",
          description: `AI summary created`,
          date: new Date(meeting.date),
          meetingId: meeting.id,
          meetingName: meeting.name,
        })
      }
    })

    const sortedActivities = activities.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 4)
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
        return <PdfIcon fontSize="small" sx={{ color: "#dc2626" }} />
      case "doc":
        return <DocIcon fontSize="small" sx={{ color: "#2563eb" }} />
      case "image":
        return <ImageIcon fontSize="small" sx={{ color: "#059669" }} />
      case "text":
        return <TextIcon fontSize="small" sx={{ color: "#d97706" }} />
      default:
        return <FileIcon fontSize="small" sx={{ color: "#6b7280" }} />
    }
  }

  const formatDate = (dateString: string | Date) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
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
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) {
      return `${diffDays} days ago`
    } else if (diffHours > 0) {
      return `${diffHours} hours ago`
    } else {
      return `Just now`
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Box>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: "#111827",
                  mb: 1,
                }}
              >
                Welcome, {user?.userName || user?.userName || "User"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage your meetings and files smartly and efficiently
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <IconButton
                onClick={() => navigate("/setting")}
                sx={{
                  bgcolor: "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  "&:hover": { bgcolor: "#f9fafb" },
                }}
              >
                <SettingsIcon />
              </IconButton>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/meetings")}
                sx={{
                  bgcolor: "#10a37f",
                  "&:hover": { bgcolor: "#0d8f6b" },
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                }}
              >
                New Meeting
              </Button>
            </Stack>
          </Box>

          {/* Stats Overview */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              {
                title: "Total Meetings",
                value: meetings.length,
                icon: <CalendarIcon />,
                color: "#10a37f",
                bgColor: "#ecfdf5",
              },
              {
                title: "Files Processed",
                value: recentFiles.length,
                icon: <DescriptionIcon />,
                color: "#3b82f6",
                bgColor: "#eff6ff",
              },
              {
                title: "AI Summaries",
                value: teamActivities.filter((a) => a.description.includes("AI summary")).length,
                icon: <TrendingUpIcon />,
                color: "#8b5cf6",
                bgColor: "#f3e8ff",
              },
              {
                title: "Team Members",
                value: "5",
                icon: <TeamIcon />,
                color: "#f59e0b",
                bgColor: "#fef3c7",
              },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} lg={3} key={stat.title}>
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
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            bgcolor: stat.bgColor,
                            color: stat.color,
                          }}
                        >
                          {stat.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h5" fontWeight={700} color="#111827">
                            {stat.value}
                          </Typography>
                          <Typography variant="body2" color="#6b7280">
                            {stat.title}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Main Content */}
          <Grid container spacing={3}>
            {/* Upcoming Meetings */}
            <Grid item xs={12} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    border: "1px solid #e5e7eb",
                    bgcolor: "white",
                    height: "100%",
                    minHeight: 400,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: "#ecfdf5", color: "#10a37f" }}>
                          <ScheduleIcon />
                        </Avatar>
                        <Typography variant="h6" fontWeight={600} color="#111827">
                          Upcoming Meetings
                        </Typography>
                      </Box>
                      <Chip label={upcomingMeetings.length} size="small" sx={{ bgcolor: "#f3f4f6" }} />
                    </Box>

                    <Stack spacing={2} sx={{ mb: 3 }}>
                      {loading ? (
                        Array.from(new Array(3)).map((_, index) => (
                          <Box key={index}>
                            <Skeleton variant="text" width="80%" height={24} />
                            <Skeleton variant="text" width="60%" height={20} />
                          </Box>
                        ))
                      ) : upcomingMeetings.length > 0 ? (
                        upcomingMeetings.map((meeting) => (
                          <Box
                            key={meeting.id}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              border: "1px solid #f3f4f6",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                borderColor: "#10a37f",
                                bgcolor: "#f9fafb",
                              },
                            }}
                            onClick={() => navigate(`/meeting-details/${meeting.id}`)}
                          >
                            <Typography variant="body1" fontWeight={600} color="#111827" gutterBottom>
                              {meeting.name}
                            </Typography>
                            <Typography variant="caption" color="#6b7280">
                              {formatDate(meeting.date)}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                          <CalendarIcon sx={{ fontSize: 48, color: "#d1d5db", mb: 2 }} />
                          <Typography variant="body2" color="#6b7280">
                            No upcoming meetings
                          </Typography>
                        </Box>
                      )}
                    </Stack>

                    <Divider sx={{ mb: 2 }} />
                    <Button
                      variant="text"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate("/meetings")}
                      sx={{
                        color: "#10a37f",
                        textTransform: "none",
                        fontWeight: 600,
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      View All Meetings
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Recent Files */}
            <Grid item xs={12} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    border: "1px solid #e5e7eb",
                    bgcolor: "white",
                    height: "100%",
                    minHeight: 400,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: "#eff6ff", color: "#3b82f6" }}>
                          <DescriptionIcon />
                        </Avatar>
                        <Typography variant="h6" fontWeight={600} color="#111827">
                          Recent Files
                        </Typography>
                      </Box>
                      <Chip label={recentFiles.length} size="small" sx={{ bgcolor: "#f3f4f6" }} />
                    </Box>

                    <Stack spacing={2} sx={{ mb: 3 }}>
                      {loading ? (
                        Array.from(new Array(4)).map((_, index) => (
                          <Skeleton key={index} variant="rectangular" height={48} sx={{ borderRadius: 2 }} />
                        ))
                      ) : recentFiles.length > 0 ? (
                        recentFiles.map((file, index) => (
                          <Box
                            key={`${file.meetingId}-${index}`}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              border: "1px solid #f3f4f6",
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                borderColor: "#3b82f6",
                                bgcolor: "#f9fafb",
                              },
                            }}
                            onClick={() => navigate(file.path)}
                          >
                            {getFileIcon(file.fileType)}
                            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                              <Typography variant="body2" fontWeight={500} noWrap>
                                {file.name}
                              </Typography>
                              <Typography variant="caption" color="#6b7280">
                                {getRelativeTime(file.date)}
                              </Typography>
                            </Box>
                          </Box>
                        ))
                      ) : (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                          <DescriptionIcon sx={{ fontSize: 48, color: "#d1d5db", mb: 2 }} />
                          <Typography variant="body2" color="#6b7280">
                            No recent files
                          </Typography>
                        </Box>
                      )}
                    </Stack>

                    <Divider sx={{ mb: 2 }} />
                    <Button
                      variant="text"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate("/meetings")}
                      sx={{
                        color: "#3b82f6",
                        textTransform: "none",
                        fontWeight: 600,
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      View All Files
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Team Activity */}
            <Grid item xs={12} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    border: "1px solid #e5e7eb",
                    bgcolor: "white",
                    height: "100%",
                    minHeight: 400,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: "#f3e8ff", color: "#8b5cf6" }}>
                          <TeamIcon />
                        </Avatar>
                        <Typography variant="h6" fontWeight={600} color="#111827">
                          Team Activity
                        </Typography>
                      </Box>
                      <Chip label={teamActivities.length} size="small" sx={{ bgcolor: "#f3f4f6" }} />
                    </Box>

                    <Stack spacing={2} sx={{ mb: 3 }}>
                      {loading ? (
                        Array.from(new Array(4)).map((_, index) => (
                          <Box key={index}>
                            <Skeleton variant="text" width="80%" height={20} />
                            <Skeleton variant="text" width="40%" height={16} />
                          </Box>
                        ))
                      ) : teamActivities.length > 0 ? (
                        teamActivities.map((activity) => (
                          <Box
                            key={activity.id}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              border: "1px solid #f3f4f6",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                borderColor: "#8b5cf6",
                                bgcolor: "#f9fafb",
                              },
                            }}
                            onClick={() => navigate(`/meeting-details/${activity.meetingId}`)}
                          >
                            <Typography variant="body2" fontWeight={500} gutterBottom>
                              {activity.description}
                            </Typography>
                            <Typography variant="caption" color="#6b7280">
                              {getRelativeTime(activity.date)}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                          <TeamIcon sx={{ fontSize: 48, color: "#d1d5db", mb: 2 }} />
                          <Typography variant="body2" color="#6b7280">
                            No recent activity
                          </Typography>
                        </Box>
                      )}
                    </Stack>

                    <Divider sx={{ mb: 2 }} />
                    <Button
                      variant="text"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate("/meetings")}
                      sx={{
                        color: "#8b5cf6",
                        textTransform: "none",
                        fontWeight: 600,
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      View All Activity
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
