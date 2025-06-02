"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Typography,
  Button,
  Box,
  Avatar,
  Paper,
  Chip,
  IconButton,
  Skeleton,
  Menu,
  MenuItem,
  ListItemIcon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Container,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material"
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  CalendarToday as CalendarTodayIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Sort as SortIcon,
  TrendingUp,
  Schedule,
  Description,
  Group,
} from "@mui/icons-material"
import UpdateMeetingDialog from "./UpdateMeetingDialog"
import type { MeetingDTO } from "../../models/meetingTypes"
import { fetchMeetingsByTeam, deleteMeeting } from "../../store/meetingSlice"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../store/store"
import MeetingSearch from "./MeetingSearch "

interface MeetingListProps {
  meetings?: MeetingDTO[]
}

export default function MeetingList({ meetings: meetingsFromProps }: MeetingListProps) {
  const [meetings, setMeetings] = useState<MeetingDTO[]>(meetingsFromProps || [])
  const [loading, setLoading] = useState(!meetingsFromProps)
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingDTO | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [activeMeetingId, setActiveMeetingId] = useState<number | null>(null)
  const [sortMenuAnchorEl, setSortMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [sortBy, setSortBy] = useState<"date" | "name">("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [meetingToDelete, setMeetingToDelete] = useState<number | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (!meetingsFromProps) {
      const getMeetings = async () => {
        setLoading(true)
        try {
          const response = user?.teamId ? await fetchMeetingsByTeam({ teamId: user.teamId }) : []
          if (Array.isArray(response)) {
            setMeetings(response)
          }
        } catch (error) {
          console.error("Error fetching meetings:", error)
        } finally {
          setLoading(false)
        }
      }
      getMeetings()
    }
  }, [meetingsFromProps, user])

  const handleUpdate = (updatedMeeting: MeetingDTO) => {
    setMeetings((prevMeetings) =>
      prevMeetings.map((meeting) => (meeting.id === updatedMeeting.id ? updatedMeeting : meeting)),
    )
  }

  // Filter meetings
  const filteredMeetings = meetings.filter((meeting) => meeting.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Sort meetings
  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    } else {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    }
  })

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    } catch (e) {
      return dateString
    }
  }

  // Menu handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, meetingId: number) => {
    setMenuAnchorEl(event.currentTarget)
    setActiveMeetingId(meetingId)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setActiveMeetingId(null)
  }

  const handleSortMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSortMenuAnchorEl(event.currentTarget)
  }

  const handleSortMenuClose = () => {
    setSortMenuAnchorEl(null)
  }

  const handleSort = (field: "date" | "name") => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortDirection("desc")
    }
    handleSortMenuClose()
  }

  const handleEditMeeting = (meeting: MeetingDTO) => {
    setSelectedMeeting(meeting)
    handleMenuClose()
  }

  // Delete handlers
  const handleDeleteClick = (meetingId: number) => {
    setMeetingToDelete(meetingId)
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setMeetingToDelete(null)
  }

  const handleDeleteConfirm = async () => {
    if (meetingToDelete) {
      try {
        await dispatch(deleteMeeting(meetingToDelete)).unwrap()
        setMeetings((prevMeetings) => prevMeetings.filter((meeting) => meeting.id !== meetingToDelete))
        setSnackbarMessage("Meeting deleted successfully")
        setSnackbarOpen(true)
      } catch (error) {
        console.error("Error deleting meeting:", error)
        setSnackbarMessage("Error deleting meeting")
        setSnackbarOpen(true)
      }
      setDeleteDialogOpen(false)
      setMeetingToDelete(null)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #d1fae5 100%)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                color: "#064e3b",
                mb: 2,
                background: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Meeting Center
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#047857",
                mb: 4,
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Manage and organize all your team meetings in one place with advanced tools
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => navigate("/add-meeting")}
                sx={{
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 40px rgba(16, 185, 129, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                New Meeting
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<SortIcon />}
                onClick={handleSortMenuOpen}
                sx={{
                  borderColor: "#a7f3d0",
                  color: "#047857",
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: 3,
                  px: 3,
                  "&:hover": {
                    borderColor: "#10b981",
                    color: "#10b981",
                    backgroundColor: "rgba(16, 185, 129, 0.04)",
                  },
                }}
              >
                Sort
              </Button>
            </Box>
          </Box>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #a7f3d0",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              mb: 4,
              boxShadow: "0 4px 20px rgba(16, 185, 129, 0.08)",
            }}
          >
            <MeetingSearch onSearch={setSearchQuery} />
          </Paper>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100px",
                    height: "100px",
                    background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                    transform: "translate(30px, -30px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {meetings.length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                      Total Meetings
                    </Typography>
                  </Box>
                  <Group sx={{ fontSize: 32, opacity: 0.8 }} />
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100px",
                    height: "100px",
                    background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                    transform: "translate(30px, -30px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {meetings.filter((m) => m.linkTranscriptFile).length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                      With AI Transcript
                    </Typography>
                  </Box>
                  <Description sx={{ fontSize: 32, opacity: 0.8 }} />
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: "linear-gradient(135deg, #047857 0%, #065f46 100%)",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100px",
                    height: "100px",
                    background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                    transform: "translate(30px, -30px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {meetings.filter((m) => m.linkOrinignFile).length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                      With Files
                    </Typography>
                  </Box>
                  <TrendingUp sx={{ fontSize: 32, opacity: 0.8 }} />
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100px",
                    height: "100px",
                    background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                    transform: "translate(30px, -30px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {meetings.filter((m) => new Date(m.date) > new Date()).length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                      Upcoming
                    </Typography>
                  </Box>
                  <Schedule sx={{ fontSize: 32, opacity: 0.8 }} />
                </Box>
              </Card>
            </Grid>
          </Grid>
        </motion.div>

        {/* Meetings List */}
        {loading ? (
          <Grid container spacing={3}>
            {Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    border: "1px solid #a7f3d0",
                    background: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Skeleton variant="circular" width={56} height={56} sx={{ mr: 2 }} />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant="text" width="80%" height={28} />
                      <Skeleton variant="text" width="60%" height={20} />
                    </Box>
                  </Box>
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="70%" height={20} />
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                    <Skeleton variant="text" width={80} />
                    <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 2 }} />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : sortedMeetings.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <Grid container spacing={3}>
              {sortedMeetings.map((meeting, index) => (
                <Grid item xs={12} sm={6} lg={4} key={meeting.id}>
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        borderRadius: 4,
                        border: "1px solid #a7f3d0",
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        position: "relative",
                        "&:hover": {
                          borderColor: "#10b981",
                          boxShadow: "0 20px 60px rgba(16, 185, 129, 0.15)",
                          transform: "translateY(-8px)",
                          "& .meeting-avatar": {
                            transform: "scale(1.1)",
                          },
                        },
                      }}
                      onClick={() => navigate(`/meeting-details/${meeting.id}`)}
                    >
                      <CardContent sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column" }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                          <Avatar
                            className="meeting-avatar"
                            sx={{
                              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                              width: 56,
                              height: 56,
                              fontWeight: 700,
                              fontSize: "1.4rem",
                              transition: "transform 0.3s ease",
                              boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
                            }}
                          >
                            {meeting.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMenuOpen(e, meeting.id)
                            }}
                            sx={{
                              color: "#6b7280",
                              "&:hover": {
                                backgroundColor: "rgba(16, 185, 129, 0.08)",
                                color: "#10b981",
                              },
                            }}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        <Typography
                          variant="h6"
                          fontWeight={700}
                          gutterBottom
                          sx={{
                            mb: 2,
                            color: "#064e3b",
                            lineHeight: 1.3,
                          }}
                        >
                          {meeting.name}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", mb: 3, color: "#047857" }}>
                          <CalendarTodayIcon fontSize="small" sx={{ mr: 1.5, color: "#6b7280" }} />
                          <Typography variant="body2" fontWeight={500}>
                            {formatDate(meeting.date)}
                          </Typography>
                        </Box>

                        <Box sx={{ flex: 1 }} />

                        <Divider sx={{ my: 2, borderColor: "#d1fae5" }} />

                        <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
                          {meeting.linkOrinignFile && (
                            <Chip
                              label="Original File"
                              size="small"
                              sx={{
                                backgroundColor: "rgba(16, 185, 129, 0.1)",
                                color: "#10b981",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                borderRadius: 2,
                                border: "1px solid rgba(16, 185, 129, 0.2)",
                              }}
                            />
                          )}
                          {meeting.linkTranscriptFile && (
                            <Chip
                              label="AI Transcript"
                              size="small"
                              sx={{
                                backgroundColor: "rgba(5, 150, 105, 0.1)",
                                color: "#059669",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                borderRadius: 2,
                                border: "1px solid rgba(5, 150, 105, 0.2)",
                              }}
                            />
                          )}
                        </Box>

                        <Button
                          variant="outlined"
                          size="medium"
                          startIcon={<VisibilityIcon />}
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/meeting-details/${meeting.id}`)
                          }}
                          sx={{
                            borderColor: "#10b981",
                            color: "#10b981",
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 2,
                            py: 1,
                            "&:hover": {
                              borderColor: "#059669",
                              backgroundColor: "rgba(16, 185, 129, 0.04)",
                              transform: "translateY(-1px)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 8,
                borderRadius: 4,
                border: "1px solid #a7f3d0",
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                }}
              >
                <CalendarTodayIcon sx={{ fontSize: 48, color: "#047857" }} />
              </Box>
              <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: "#064e3b" }}>
                No Meetings Found
              </Typography>
              <Typography variant="body1" color="#047857" sx={{ mb: 4, maxWidth: "400px", mx: "auto" }}>
                {searchQuery
                  ? "Try searching with different keywords or create a new meeting"
                  : "Get started by creating your first meeting"}
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => navigate("/add-meeting")}
                sx={{
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 40px rgba(16, 185, 129, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Create New Meeting
              </Button>
            </Paper>
          </motion.div>
        )}

        {/* Sort Menu */}
        <Menu
          anchorEl={sortMenuAnchorEl}
          open={Boolean(sortMenuAnchorEl)}
          onClose={handleSortMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              borderRadius: 3,
              border: "1px solid #a7f3d0",
              boxShadow: "0 10px 30px rgba(16, 185, 129, 0.1)",
            },
          }}
        >
          <MenuItem onClick={() => handleSort("date")} selected={sortBy === "date"}>
            <ListItemIcon>
              <CalendarTodayIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">
              By Date {sortBy === "date" && (sortDirection === "asc" ? "(Oldest first)" : "(Newest first)")}
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => handleSort("name")} selected={sortBy === "name"}>
            <ListItemIcon>
              <SortIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">
              By Name {sortBy === "name" && (sortDirection === "asc" ? "(A-Z)" : "(Z-A)")}
            </Typography>
          </MenuItem>
        </Menu>

        {/* Meeting Options Menu */}
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              borderRadius: 3,
              border: "1px solid #a7f3d0",
              boxShadow: "0 10px 30px rgba(16, 185, 129, 0.1)",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              const meeting = meetings.find((m) => m.id === activeMeetingId)
              if (meeting) handleEditMeeting(meeting)
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">Edit Meeting</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (activeMeetingId) handleDeleteClick(activeMeetingId)
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <Typography variant="body2" color="error.main">
              Delete Meeting
            </Typography>
          </MenuItem>
        </Menu>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          PaperProps={{
            sx: {
              borderRadius: 4,
              border: "1px solid #a7f3d0",
            },
          }}
        >
          <DialogTitle sx={{ color: "error.main", fontWeight: 700 }}>
            Are you sure you want to delete this meeting?
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ color: "#047857" }}>
              This action cannot be undone. All data related to this meeting will be permanently deleted.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={handleDeleteCancel}
              sx={{
                color: "#047857",
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
              autoFocus
              startIcon={<DeleteIcon />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              Delete Meeting
            </Button>
          </DialogActions>
        </Dialog>

        {/* Update Meeting Dialog */}
        {selectedMeeting && (
          <UpdateMeetingDialog
            open={Boolean(selectedMeeting)}
            handleClose={() => setSelectedMeeting(null)}
            meeting={selectedMeeting}
            onUpdate={handleUpdate}
          />
        )}

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarMessage.includes("Error") ? "error" : "success"}
            sx={{
              borderRadius: 3,
              fontWeight: 500,
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  )
}
