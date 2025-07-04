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
  Refresh as RefreshIcon,
} from "@mui/icons-material"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../store/store"
import { fetchMeetingsByTeam } from "../../store/meetingSlice"
import { checkAuthState } from "../../store/authSlice"

interface RecentFile {
  name: string
  path: string
  meetingId: number
  fileType: string
  date: Date
  teamId: number // הוספת teamId לסינון
}

interface TeamActivity {
  id: number
  type: "file_upload" | "meeting_created" | "meeting_updated"
  description: string
  date: Date
  meetingId: number
  meetingName: string
  teamId: number // הוספת teamId לסינון
}

export default function HomePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [loading, setLoading] = useState(true)
  const [upcomingMeetings, setUpcomingMeetings] = useState<any[]>([])
  const [recentFiles, setRecentFiles] = useState<RecentFile[]>([])
  const [teamActivities, setTeamActivities] = useState<TeamActivity[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  const { user } = useSelector((state: RootState) => state.auth)
  const meetings = useSelector((state: RootState) => state.meeting.list)

  // פונקציה לשליפת מזהה הצוות מכל המקורות האפשריים
  const getUserTeamId = (): number | null => {
    // נסה לקחת מהמשתמש ב-Redux
    if (user && user.teamId) {
      return user.teamId
    }

    // נסה לקחת מ-sessionStorage
    try {
      const sessionUser = sessionStorage.getItem("user")
      if (sessionUser) {
        const userData = JSON.parse(sessionUser)
        if (userData && userData.teamId) {
          return userData.teamId
        }
      }
    } catch (error) {
      console.error("Error parsing user from sessionStorage:", error)
    }

    // נסה לקחת מ-localStorage
    try {
      const localUser = localStorage.getItem("user")
      if (localUser) {
        const userData = JSON.parse(localUser)
        if (userData && userData.teamId) {
          return userData.teamId
        }
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error)
    }

    return null
  }
   // עדכון כשהמשתמש או הפגישות משתנים

  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
  
      try {
        // Ensure user data is loaded
        if (!user) {
          const authResult = await dispatch(checkAuthState()).unwrap();
          if (!authResult.teamId) {
            throw new Error("User team ID not found");
          }
        }
  
        // Fetch meetings for the user's team
        const userTeamId = user?.teamId || getUserTeamId();
        if (userTeamId) {
          const fetchedMeetings = await dispatch(fetchMeetingsByTeam({ teamId: userTeamId })).unwrap();
          processData(fetchedMeetings);
        }
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };
  
    initializeApp();
  }, [dispatch, user]);



  useEffect(() => {
    // רק אם כבר אותחל ויש שינוי במשתמש או בפגישות
    if (isInitialized && (user || meetings.length > 0)) {
      const userTeamId = getUserTeamId()

      if (userTeamId) {
        processData(meetings)
      }
    }
  }, [user, meetings, isInitialized])

  // פונקציה לרענון ידני של הנתונים
  const refreshData = async () => {
    setLoading(true)
    const userTeamId = getUserTeamId()

    if (userTeamId) {
      try {
        const fetchedMeetings = await dispatch(fetchMeetingsByTeam({ teamId: userTeamId })).unwrap()
        processData(fetchedMeetings)
      } catch (error) {
        console.error("Error refreshing data:", error)
      }
    }

    setLoading(false)
  }

  const processData = (meetingsData: any[]) => {
    const userTeamId = getUserTeamId()

    if (!userTeamId) {
      return
    }

    // סינון פגישות לפי teamId של המשתמש המחובר
    const userTeamMeetings = meetingsData.filter((meeting) => meeting.teamId === userTeamId)

    const now = new Date()
    const upcoming = [...userTeamMeetings]
      .filter((meeting) => new Date(meeting.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3)

    setUpcomingMeetings(upcoming)

    const files: RecentFile[] = []

    userTeamMeetings.forEach((meeting) => {
      if (meeting.linkOrinignFile) {
        const fileName = meeting.linkOrinignFile.split("/").pop() || "File"
        const fileType = getFileType(fileName)

        files.push({
          name: fileName,
          path: `/meeting-details/${meeting.id}`,
          meetingId: meeting.id,
          fileType: fileType,
          date: new Date(meeting.date),
          teamId: meeting.teamId, // הוספת teamId
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
          teamId: meeting.teamId, // הוספת teamId
        })
      }
    })

    // סינון קבצים לפי teamId של המשתמש המחובר
    const userTeamFiles = files.filter((file) => file.teamId === userTeamId)
    const sortedFiles = userTeamFiles.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 4)
    setRecentFiles(sortedFiles)

    const activities: TeamActivity[] = []

    userTeamMeetings.forEach((meeting) => {
      activities.push({
        id: meeting.id * 100,
        type: "meeting_created",
        description: `New meeting created: ${meeting.name}`,
        date: new Date(meeting.date),
        meetingId: meeting.id,
        meetingName: meeting.name,
        teamId: meeting.teamId, // הוספת teamId
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
          teamId: meeting.teamId, // הוספת teamId
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
          teamId: meeting.teamId, // הוספת teamId
        })
      }
    })

    // סינון פעילות לפי teamId של המשתמש המחובר
    const userTeamActivities = activities.filter((activity) => activity.teamId === userTeamId)
    const sortedActivities = userTeamActivities.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 4)
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

  // סינון פגישות לפי teamId של המשתמש המחובר לסטטיסטיקות
  const userTeamId = getUserTeamId()
  const userTeamMeetings = meetings.filter((meeting) => meeting.teamId === userTeamId)
  const userTeamFiles = recentFiles.filter((file) => file.teamId === userTeamId)
  const userTeamActivities = teamActivities.filter((activity) => activity.teamId === userTeamId)

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
                Welcome, {user?.userName || "User"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage your meetings and files smartly and efficiently
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <IconButton
                onClick={refreshData}
                sx={{
                  bgcolor: "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  "&:hover": { bgcolor: "#f9fafb" },
                }}
              >
                <RefreshIcon />
              </IconButton>
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

          {/* Stats Overview - מוצגים רק נתונים של הצוות */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              {
                title: "Total Meetings",
                value: userTeamMeetings.length,
                icon: <CalendarIcon />,
                color: "#10a37f",
                bgColor: "#ecfdf5",
              },
              {
                title: "Files Processed",
                value: userTeamFiles.length,
                icon: <DescriptionIcon />,
                color: "#3b82f6",
                bgColor: "#eff6ff",
              },
              {
                title: "AI Summaries",
                value: userTeamActivities.filter((a) => a.description.includes("AI summary")).length,
                icon: <TrendingUpIcon />,
                color: "#8b5cf6",
                bgColor: "#f3e8ff",
              },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} lg={4} key={stat.title}>
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
                            {loading ? <Skeleton width={30} /> : stat.value}
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
                      <Chip
                        label={loading ? "..." : upcomingMeetings.length}
                        size="small"
                        sx={{ bgcolor: "#f3f4f6" }}
                      />
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
                      <Chip label={loading ? "..." : recentFiles.length} size="small" sx={{ bgcolor: "#f3f4f6" }} />
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
                      <Chip label={loading ? "..." : teamActivities.length} size="small" sx={{ bgcolor: "#f3f4f6" }} />
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
