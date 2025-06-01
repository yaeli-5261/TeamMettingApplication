// // // // "use client"

// // // // import type React from "react"

// // // // import { useEffect, useState } from "react"
// // // // import { Navigate, useNavigate } from "react-router-dom"
// // // // import { motion } from "framer-motion"
// // // // import {
// // // //   Typography,
// // // //   Button,
// // // //   Box,
// // // //   Avatar,
// // // //   Paper,
// // // //   Divider,
// // // //   Chip,
// // // //   IconButton,
// // // //   Skeleton,
// // // //   Menu,
// // // //   MenuItem,
// // // //   ListItemIcon,
// // // //   useTheme,
// // // //   useMediaQuery,
// // // //   Dialog,
// // // //   DialogActions,
// // // //   DialogContent,
// // // //   DialogTitle,
// // // //   Snackbar,
// // // //   Alert,
// // // // } from "@mui/material"
// // // // import AddIcon from "@mui/icons-material/Add"
// // // // import MoreVertIcon from "@mui/icons-material/MoreVert"
// // // // import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
// // // // import VisibilityIcon from "@mui/icons-material/Visibility"
// // // // import EditIcon from "@mui/icons-material/Edit"
// // // // import DeleteIcon from "@mui/icons-material/Delete"
// // // // import SortIcon from "@mui/icons-material/Sort"
// // // // import FilterListIcon from "@mui/icons-material/FilterList"
// // // // import UpdateMeetingDialog from "./UpdateMeetingDialog"
// // // // import type { MeetingDTO } from "../../models/meetingTypes"
// // // // import { fetchMeetingsByTeam, deleteMeeting } from "../../store/meetingSlice"
// // // // import { useSelector, useDispatch } from "react-redux"
// // // // import type { RootState, AppDispatch } from "../../store/store"
// // // // import MeetingSearch from "./MeetingSearch "

// // // // interface MeetingListProps {
// // // //   meetings?: MeetingDTO[]
// // // // }

// // // // export default function MeetingList({ meetings: meetingsFromProps }: MeetingListProps) {
// // // //   const [meetings, setMeetings] = useState<MeetingDTO[]>(meetingsFromProps || [])
// // // //   const [loading, setLoading] = useState(!meetingsFromProps)
// // // //   const [selectedMeeting, setSelectedMeeting] = useState<MeetingDTO | null>(null)
// // // //   const [searchQuery, setSearchQuery] = useState("")
// // // //   const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
// // // //   const [activeMeetingId, setActiveMeetingId] = useState<number | null>(null)
// // // //   const [sortMenuAnchorEl, setSortMenuAnchorEl] = useState<null | HTMLElement>(null)
// // // //   const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState<null | HTMLElement>(null)
// // // //   const [sortBy, setSortBy] = useState<"date" | "name">("date")
// // // //   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
// // // //   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
// // // //   const [meetingToDelete, setMeetingToDelete] = useState<number | null>(null)
// // // //   const [snackbarOpen, setSnackbarOpen] = useState(false)
// // // //   const [snackbarMessage, setSnackbarMessage] = useState("")

// // // //   const navigate = useNavigate()
// // // //   const dispatch = useDispatch<AppDispatch>()
// // // //   const user = useSelector((state: RootState) => state.auth.user)

// // // //   useEffect(() => {
// // // //     if (!meetingsFromProps) {
// // // //       const getMeetings = async () => {
// // // //         setLoading(true)
// // // //         try {
// // // //           const response = user?.teamId ? await fetchMeetingsByTeam({ teamId: user.teamId }) : []
// // // //           if (Array.isArray(response)) {
// // // //             setMeetings(response)
// // // //           }
// // // //         } catch (error) {
// // // //           console.error("Error fetching meetings:", error)
// // // //         } finally {
// // // //           setLoading(false)
// // // //         }
// // // //       }
// // // //       getMeetings()
// // // //     }
// // // //   }, [meetingsFromProps, user])

// // // //   const handleUpdate = (updatedMeeting: MeetingDTO) => {
// // // //     setMeetings((prevMeetings) =>
// // // //       prevMeetings.map((meeting) => (meeting.id === updatedMeeting.id ? updatedMeeting : meeting)),
// // // //     )
// // // //   }

// // // //   // פונקציית חיפוש
// // // //   const filteredMeetings = meetings.filter((meeting) => meeting.name.toLowerCase().includes(searchQuery.toLowerCase()))

// // // //   // מיון פגישות
// // // //   const sortedMeetings = [...filteredMeetings].sort((a, b) => {
// // // //     if (sortBy === "date") {
// // // //       const dateA = new Date(a.date).getTime()
// // // //       const dateB = new Date(b.date).getTime()
// // // //       return sortDirection === "asc" ? dateA - dateB : dateB - dateA
// // // //     } else {
// // // //       return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
// // // //     }
// // // //   })

// // // //   // פונקציה לפורמט תאריך
// // // //   const formatDate = (dateString: string) => {
// // // //     try {
// // // //       const date = new Date(dateString)
// // // //       return new Intl.DateTimeFormat("he-IL", {
// // // //         year: "numeric",
// // // //         month: "short",
// // // //         day: "numeric",
// // // //         hour: "2-digit",
// // // //         minute: "2-digit",
// // // //       }).format(date)
// // // //     } catch (e) {
// // // //       return dateString // אם יש בעיה בפורמט, החזר את המחרוזת המקורית
// // // //     }
// // // //   }

// // // //   // פונקציות לתפריטים
// // // //   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, meetingId: number) => {
// // // //     setMenuAnchorEl(event.currentTarget)
// // // //     setActiveMeetingId(meetingId)
// // // //   }

// // // //   const handleMenuClose = () => {
// // // //     setMenuAnchorEl(null)
// // // //     setActiveMeetingId(null)
// // // //   }

// // // //   const handleSortMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
// // // //     setSortMenuAnchorEl(event.currentTarget)
// // // //   }

// // // //   const handleSortMenuClose = () => {
// // // //     setSortMenuAnchorEl(null)
// // // //   }

// // // //   const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
// // // //     setFilterMenuAnchorEl(event.currentTarget)
// // // //   }

// // // //   const handleFilterMenuClose = () => {
// // // //     setFilterMenuAnchorEl(null)
// // // //   }

// // // //   const handleSort = (field: "date" | "name") => {
// // // //     if (sortBy === field) {
// // // //       setSortDirection(sortDirection === "asc" ? "desc" : "asc")
// // // //     } else {
// // // //       setSortBy(field)
// // // //       setSortDirection("desc")
// // // //     }
// // // //     handleSortMenuClose()
// // // //   }

// // // //   const handleEditMeeting = (meeting: MeetingDTO) => {
// // // //     setSelectedMeeting(meeting)
// // // //     handleMenuClose()
// // // //   }

// // // //   // פונקציות למחיקת פגישה
// // // //   const handleDeleteClick = (meetingId: number) => {
// // // //     setMeetingToDelete(meetingId)
// // // //     setDeleteDialogOpen(true)
// // // //     handleMenuClose()
// // // //   }

// // // //   const handleDeleteCancel = () => {
// // // //     setDeleteDialogOpen(false)
// // // //     setMeetingToDelete(null)
// // // //   }

// // // //   const handleDeleteConfirm = async () => {
// // // //     if (meetingToDelete) {
// // // //       try {
// // // //         await dispatch(deleteMeeting(meetingToDelete)).unwrap()
// // // //         setMeetings((prevMeetings) => prevMeetings.filter((meeting) => meeting.id !== meetingToDelete))
// // // //         setSnackbarMessage("הפגישה נמחקה בהצלחה")
// // // //         setSnackbarOpen(true)
// // // //       } catch (error) {
// // // //         console.error("Error deleting meeting:", error)
// // // //         setSnackbarMessage("שגיאה במחיקת הפגישה")
// // // //         setSnackbarOpen(true)
// // // //       }
// // // //       setDeleteDialogOpen(false)
// // // //       setMeetingToDelete(null)
// // // //     }
// // // //   }

// // // //   const handleCloseSnackbar = () => {
// // // //     setSnackbarOpen(false)
// // // //   }

// // // //   return (
// // // //     <Box
// // // //     // sx={{
// // // //     //   width: "70vw",
// // // //     //   height: "100%",
// // // //     //   boxSizing: "border-box",
// // // //     // }}
// // // //     >
// // // //       <Paper
// // // //         elevation={0}
// // // //         sx={{
// // // //           p: 3,
// // // //           borderRadius: 2,
// // // //           border: "1px solid",
// // // //           borderColor: "divider",
// // // //           bgcolor: "background.paper",
// // // //           mb: 4,
// // // //           overflow: "hidden",
// // // //         }}
// // // //       >
// // // //         <Box
// // // //           sx={{
// // // //             display: "flex",
// // // //             flexDirection: { xs: "column", sm: "row" },
// // // //             justifyContent: "space-between",
// // // //             alignItems: { xs: "flex-start", sm: "center" },
// // // //             mb: 3,
// // // //             gap: 2,
// // // //           }}
// // // //         >
// // // //           <Typography variant="h5" fontWeight={600} color="text.primary">
// // // //             פגישות
// // // //           </Typography>
// // // //           <Box sx={{ display: "flex", gap: 1 }}>
// // // //             <Button
// // // //               variant="outlined"
// // // //               size="small"
// // // //               startIcon={<FilterListIcon />}
// // // //               onClick={handleFilterMenuOpen}
// // // //               sx={{
// // // //                 borderColor: "divider",
// // // //                 color: "text.secondary",
// // // //                 textTransform: "none",
// // // //               }}
// // // //             >
// // // //               סינון
// // // //             </Button>
// // // //             <Button
// // // //               variant="outlined"
// // // //               size="small"
// // // //               startIcon={<SortIcon />}
// // // //               onClick={handleSortMenuOpen}
// // // //               sx={{
// // // //                 borderColor: "divider",
// // // //                 color: "text.secondary",
// // // //                 textTransform: "none",
// // // //               }}
// // // //             >
// // // //               מיון
// // // //             </Button>
// // // //             <Button
// // // //               variant="contained"
// // // //               startIcon={<AddIcon />}
// // // //               onClick={() => navigate("/add-meeting")}
// // // //               sx={{
// // // //                 bgcolor: "#10a37f",
// // // //                 color: "white",
// // // //                 textTransform: "none",
// // // //                 fontWeight: 500,
// // // //                 "&:hover": {
// // // //                   bgcolor: "#0e8a6c",
// // // //                 },
// // // //               }}
// // // //             >
// // // //               פגישה חדשה
// // // //             </Button>
// // // //           </Box>
// // // //         </Box>

// // // //         {/* תפריט מיון */}
// // // //         <Menu
// // // //           anchorEl={sortMenuAnchorEl}
// // // //           open={Boolean(sortMenuAnchorEl)}
// // // //           onClose={handleSortMenuClose}
// // // //           anchorOrigin={{
// // // //             vertical: "bottom",
// // // //             horizontal: "right",
// // // //           }}
// // // //           transformOrigin={{
// // // //             vertical: "top",
// // // //             horizontal: "right",
// // // //           }}
// // // //         >
// // // //           <MenuItem onClick={() => handleSort("date")} selected={sortBy === "date"}>
// // // //             <ListItemIcon>
// // // //               <CalendarTodayIcon fontSize="small" />
// // // //             </ListItemIcon>
// // // //             <Typography variant="body2">
// // // //               לפי תאריך {sortBy === "date" && (sortDirection === "asc" ? "(מהישן לחדש)" : "(מהחדש לישן)")}
// // // //             </Typography>
// // // //           </MenuItem>
// // // //           <MenuItem onClick={() => handleSort("name")} selected={sortBy === "name"}>
// // // //             <ListItemIcon>
// // // //               <SortIcon fontSize="small" />
// // // //             </ListItemIcon>
// // // //             <Typography variant="body2">
// // // //               לפי שם {sortBy === "name" && (sortDirection === "asc" ? "(א-ת)" : "(ת-א)")}
// // // //             </Typography>
// // // //           </MenuItem>
// // // //         </Menu>

// // // //         {/* תפריט סינון */}
// // // //         <Menu
// // // //           anchorEl={filterMenuAnchorEl}
// // // //           open={Boolean(filterMenuAnchorEl)}
// // // //           onClose={handleFilterMenuClose}
// // // //           anchorOrigin={{
// // // //             vertical: "bottom",
// // // //             horizontal: "right",
// // // //           }}
// // // //           transformOrigin={{
// // // //             vertical: "top",
// // // //             horizontal: "right",
// // // //           }}
// // // //         >
// // // //           <MenuItem onClick={handleFilterMenuClose}>
// // // //             <Typography variant="body2">כל הפגישות</Typography>
// // // //           </MenuItem>
// // // //           <MenuItem onClick={handleFilterMenuClose}>
// // // //             <Typography variant="body2">פגישות עם תמלול</Typography>
// // // //           </MenuItem>
// // // //           <MenuItem onClick={handleFilterMenuClose}>
// // // //             <Typography variant="body2">פגישות ללא תמלול</Typography>
// // // //           </MenuItem>
// // // //         </Menu>

// // // //         {/* מנוע החיפוש */}
// // // //         <Box sx={{ mb: 3 }}>
// // // //           <MeetingSearch onSearch={setSearchQuery} />
// // // //         </Box>

// // // //         {/* רשימת פגישות */}
// // // //         {loading ? (
// // // //           // סקלטון לטעינה
// // // //           Array.from(new Array(3)).map((_, index) => (
// // // //             <Paper
// // // //               key={index}
// // // //               elevation={0}
// // // //               sx={{
// // // //                 p: 2,
// // // //                 mb: 2,
// // // //                 borderRadius: 2,
// // // //                 border: "1px solid",
// // // //                 borderColor: "divider",
// // // //               }}
// // // //             >
// // // //               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
// // // //                 <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
// // // //                 <Skeleton variant="text" width={200} height={30} />
// // // //               </Box>
// // // //               <Skeleton variant="text" width="60%" />
// // // //               <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
// // // //                 <Skeleton variant="text" width={100} />
// // // //                 <Skeleton variant="rectangular" width={100} height={36} />
// // // //               </Box>
// // // //             </Paper>
// // // //           ))
// // // //         ) : sortedMeetings.length > 0 ? (
// // // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
// // // //             {sortedMeetings.map((meeting) => (
// // // //               <motion.div
// // // //                 key={meeting.id}
// // // //                 initial={{ y: 20, opacity: 0 }}
// // // //                 animate={{ y: 0, opacity: 1 }}
// // // //                 transition={{ duration: 0.3 }}
// // // //               >
// // // //                 <Paper
// // // //                   elevation={0}
// // // //                   sx={{
// // // //                     p: 0,
// // // //                     mb: 2,
// // // //                     borderRadius: 2,
// // // //                     border: "1px solid",
// // // //                     borderColor: "divider",
// // // //                     overflow: "hidden",
// // // //                     transition: "all 0.2s ease-in-out",
// // // //                     "&:hover": {
// // // //                       borderColor: "primary.main",
// // // //                       boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
// // // //                     },
// // // //                   }}
// // // //                 >
// // // //                   <Box sx={{ p: 2 }}>
// // // //                     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// // // //                       <Box sx={{ display: "flex", alignItems: "center" }}>
// // // //                         <Avatar
// // // //                           sx={{
// // // //                             bgcolor: "#10a37f",
// // // //                             width: 40,
// // // //                             height: 40,
// // // //                             mr: 2,
// // // //                           }}
// // // //                         >
// // // //                           {meeting.name.charAt(0).toUpperCase()}
// // // //                         </Avatar>
// // // //                         <Typography variant="h6" fontWeight={600}>
// // // //                           {meeting.name}
// // // //                         </Typography>
// // // //                       </Box>
// // // //                       <IconButton
// // // //                         size="small"
// // // //                         onClick={(e) => handleMenuOpen(e, meeting.id)}
// // // //                         aria-label="אפשרויות נוספות"
// // // //                       >
// // // //                         <MoreVertIcon fontSize="small" />
// // // //                       </IconButton>
// // // //                     </Box>

// // // //                     <Box sx={{ display: "flex", alignItems: "center", mt: 2, color: "text.secondary" }}>
// // // //                       <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
// // // //                       <Typography variant="body2">{formatDate(meeting.date)}</Typography>
// // // //                     </Box>
// // // //                   </Box>

// // // //                   <Divider />

// // // //                   <Box
// // // //                     sx={{
// // // //                       display: "flex",
// // // //                       justifyContent: "space-between",
// // // //                       alignItems: "center",
// // // //                       p: 1.5,
// // // //                       bgcolor: "rgba(0,0,0,0.01)",
// // // //                     }}
// // // //                   >
// // // //                     <Box>
// // // //                       {meeting.linkTranscriptFile && (
// // // //                         <Chip
// // // //                           label="תמלול זמין"
// // // //                           size="small"
// // // //                           sx={{
// // // //                             bgcolor: "#10a37f20",
// // // //                             color: "#10a37f",
// // // //                             fontSize: "0.75rem",
// // // //                             fontWeight: 500,
// // // //                           }}
// // // //                         />
// // // //                       )}
// // // //                     </Box>
// // // //                     <Button
// // // //                       variant="text"
// // // //                       size="small"
// // // //                       startIcon={<VisibilityIcon />}
// // // //                       onClick={() => navigate(`/meeting-details/${meeting.id}`)}
// // // //                       sx={{
// // // //                         color: "#10a37f",
// // // //                         textTransform: "none",
// // // //                         fontWeight: 500,
// // // //                       }}
// // // //                     >
// // // //                       הצג פרטים
// // // //                     </Button>
// // // //                   </Box>
// // // //                 </Paper>
// // // //               </motion.div>
// // // //             ))}
// // // //           </motion.div>
// // // //         ) : (
// // // //           <Box
// // // //             sx={{
// // // //               textAlign: "center",
// // // //               py: 6,
// // // //               color: "text.secondary",
// // // //             }}
// // // //           >
// // // //             <Typography variant="body1" gutterBottom>
// // // //               לא נמצאו פגישות בשם זה.
// // // //             </Typography>
// // // //             <Typography variant="body2">נסה לחפש מחדש או צור פגישה חדשה.</Typography>
// // // //           </Box>
// // // //         )}
// // // //       </Paper>

// // // //       {/* תפריט אפשרויות לפגישה */}
// // // //       <Menu
// // // //         anchorEl={menuAnchorEl}
// // // //         open={Boolean(menuAnchorEl)}
// // // //         onClose={handleMenuClose}
// // // //         anchorOrigin={{
// // // //           vertical: "bottom",
// // // //           horizontal: "right",
// // // //         }}
// // // //         transformOrigin={{
// // // //           vertical: "top",
// // // //           horizontal: "right",
// // // //         }}
// // // //       >
// // // //         <MenuItem
// // // //           onClick={() => {
// // // //             const meeting = meetings.find((m) => m.id === activeMeetingId)
// // // //             if (meeting) handleEditMeeting(meeting)
// // // //           }}
// // // //         >
// // // //           <ListItemIcon>
// // // //             <EditIcon fontSize="small" />
// // // //           </ListItemIcon>
// // // //           <Typography variant="body2">ערוך פגישה</Typography>
// // // //         </MenuItem>
// // // //         <MenuItem
// // // //           onClick={() => {
// // // //             if (activeMeetingId) handleDeleteClick(activeMeetingId)
// // // //           }}
// // // //         >
// // // //           <ListItemIcon>
// // // //             <DeleteIcon fontSize="small" color="error" />
// // // //           </ListItemIcon>
// // // //           <Typography variant="body2" color="error.main">
// // // //             מחק פגישה
// // // //           </Typography>
// // // //         </MenuItem>
// // // //       </Menu>

// // // //       {/* דיאלוג אישור מחיקה */}
// // // //       <Dialog
// // // //         open={deleteDialogOpen}
// // // //         onClose={handleDeleteCancel}
// // // //         aria-labelledby="alert-dialog-title"
// // // //         aria-describedby="alert-dialog-description"
// // // //       >
// // // //         <DialogTitle id="alert-dialog-title" sx={{ color: "error.main" }}>
// // // //           {"האם אתה בטוח שברצונך למחוק את הפגישה?"}
// // // //         </DialogTitle>
// // // //         <DialogContent>
// // // //           <Typography variant="body1" id="alert-dialog-description">
// // // //             פעולה זו אינה ניתנת לביטול. כל הנתונים הקשורים לפגישה זו יימחקו לצמיתות.
// // // //           </Typography>
// // // //         </DialogContent>
// // // //         <DialogActions>
// // // //           <Button onClick={handleDeleteCancel} color="inherit">
// // // //             ביטול
// // // //           </Button>
// // // //           <Button onClick={handleDeleteConfirm} variant="contained" color="error" autoFocus startIcon={<DeleteIcon />}>
// // // //             מחק פגישה
// // // //           </Button>
// // // //         </DialogActions>
// // // //       </Dialog>

// // // //       {/* דיאלוג עדכון פגישה */}
// // // //       {selectedMeeting && (
// // // //         <UpdateMeetingDialog
// // // //           open={Boolean(selectedMeeting)}
// // // //           handleClose={() => setSelectedMeeting(null)}
// // // //           meeting={selectedMeeting}
// // // //           onUpdate={handleUpdate}
// // // //         />
// // // //       )}

// // // //       {/* הודעת Snackbar */}
// // // //       <Snackbar
// // // //         open={snackbarOpen}
// // // //         autoHideDuration={5000}
// // // //         onClose={handleCloseSnackbar}
// // // //         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
// // // //       >
// // // //         <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes("שגיאה") ? "error" : "success"}>
// // // //           {snackbarMessage}
// // // //         </Alert>
// // // //       </Snackbar>
// // // //     </Box>
// // // //   )
// // // // }



// // // "use client"

// // // import type React from "react"
// // // import { useEffect, useState } from "react"
// // // import { useNavigate } from "react-router-dom"
// // // import { motion } from "framer-motion"
// // // import {
// // //   Typography,
// // //   Button,
// // //   Box,
// // //   Avatar,
// // //   Paper,
// // //   Divider,
// // //   Chip,
// // //   IconButton,
// // //   Skeleton,
// // //   Menu,
// // //   MenuItem,
// // //   ListItemIcon,
// // //   Dialog,
// // //   DialogActions,
// // //   DialogContent,
// // //   DialogTitle,
// // //   Snackbar,
// // //   Alert,
// // //   Container,
// // //   Card,
// // //   CardContent,
// // // } from "@mui/material"
// // // import { Plus, MoreVertical, Calendar, Eye, Edit, Trash2, SortAsc, Filter } from "lucide-react"
// // // import { useDispatch, useSelector } from "react-redux"
// // // import { CookieStorage } from "../../models/cookie-storage"
// // // import { MeetingDTO } from "../../models/meetingTypes"
// // // import { fetchMeetingsByTeam, deleteMeeting } from "../../store/meetingSlice"
// // // import { AppDispatch, RootState } from "../../store/store"
// // // import MeetingSearch from "./MeetingSearch "
// // // import UpdateMeetingDialog from "./UpdateMeetingDialog"


// // // interface MeetingListProps {
// // //   meetings?: MeetingDTO[]
// // // }

// // // export default function MeetingList({ meetings: meetingsFromProps }: MeetingListProps) {
// // //   const [meetings, setMeetings] = useState<MeetingDTO[]>(meetingsFromProps || [])
// // //   const [loading, setLoading] = useState(!meetingsFromProps)
// // //   const [selectedMeeting, setSelectedMeeting] = useState<MeetingDTO | null>(null)
// // //   const [searchQuery, setSearchQuery] = useState("")
// // //   const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
// // //   const [activeMeetingId, setActiveMeetingId] = useState<number | null>(null)
// // //   const [sortMenuAnchorEl, setSortMenuAnchorEl] = useState<null | HTMLElement>(null)
// // //   const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState<null | HTMLElement>(null)
// // //   const [sortBy, setSortBy] = useState<"date" | "name">("date")
// // //   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
// // //   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
// // //   const [meetingToDelete, setMeetingToDelete] = useState<number | null>(null)
// // //   const [snackbarOpen, setSnackbarOpen] = useState(false)
// // //   const [snackbarMessage, setSnackbarMessage] = useState("")

// // //   const navigate = useNavigate()
// // //   const dispatch = useDispatch<AppDispatch>()
// // //   const user = useSelector((state: RootState) => state.auth.user)

// // //   // Helper function to get user team ID from multiple sources
// // //   const getUserTeamId = (): number | null => {
// // //     // Try Redux state first
// // //     if (user?.teamId) {
// // //       return user.teamId
// // //     }

// // //     // Try cookies
// // //     const cookieUser = CookieStorage.getUser()
// // //     if (cookieUser?.teamId) {
// // //       return cookieUser.teamId
// // //     }

// // //     // Try sessionStorage
// // //     const userData = sessionStorage.getItem("user")
// // //     if (userData) {
// // //       try {
// // //         const sessionUser = JSON.parse(userData)
// // //         if (sessionUser?.teamId) {
// // //           return sessionUser.teamId
// // //         }
// // //       } catch (e) {
// // //         console.error("Error parsing session user data:", e)
// // //       }
// // //     }

// // //     return null
// // //   }

// // //   useEffect(() => {
// // //     if (!meetingsFromProps) {
// // //       const getMeetings = async () => {
// // //         setLoading(true)
// // //         try {
// // //           const teamId = getUserTeamId()
// // //           console.log("Team ID found:", teamId)

// // //           if (!teamId) {
// // //             console.error("❌ No team ID found for user")
// // //             setMeetings([])
// // //             setLoading(false)
// // //             return
// // //           }

// // //           // Try to fetch meetings using the team ID
// // //           const response = await dispatch(fetchMeetingsByTeam({ teamId })).unwrap()
// // //           if (Array.isArray(response)) {
// // //             console.log("✅ Meetings loaded:", response)
// // //             setMeetings(response)
// // //           } else {
// // //             console.log("No meetings found or invalid response")
// // //             setMeetings([])
// // //           }
// // //         } catch (error) {
// // //           console.error("❌ Error fetching meetings:", error)
// // //           setMeetings([])
// // //         } finally {
// // //           setLoading(false)
// // //         }
// // //       }
// // //       getMeetings()
// // //     } else {
// // //       setMeetings(meetingsFromProps)
// // //       setLoading(false)
// // //     }
// // //   }, [meetingsFromProps, user, dispatch])

// // //   const handleUpdate = (updatedMeeting: MeetingDTO) => {
// // //     setMeetings((prevMeetings) =>
// // //       prevMeetings.map((meeting) => (meeting.id === updatedMeeting.id ? updatedMeeting : meeting)),
// // //     )
// // //   }

// // //   // Filter meetings
// // //   const filteredMeetings = meetings.filter((meeting) => meeting.name.toLowerCase().includes(searchQuery.toLowerCase()))

// // //   // Sort meetings
// // //   const sortedMeetings = [...filteredMeetings].sort((a, b) => {
// // //     if (sortBy === "date") {
// // //       const dateA = new Date(a.date).getTime()
// // //       const dateB = new Date(b.date).getTime()
// // //       return sortDirection === "asc" ? dateA - dateB : dateB - dateA
// // //     } else {
// // //       return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
// // //     }
// // //   })

// // //   // Format date
// // //   const formatDate = (dateString: string) => {
// // //     try {
// // //       const date = new Date(dateString)
// // //       return new Intl.DateTimeFormat("en-US", {
// // //         year: "numeric",
// // //         month: "short",
// // //         day: "numeric",
// // //         hour: "2-digit",
// // //         minute: "2-digit",
// // //       }).format(date)
// // //     } catch (e) {
// // //       return dateString
// // //     }
// // //   }

// // //   // Menu handlers
// // //   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, meetingId: number) => {
// // //     setMenuAnchorEl(event.currentTarget)
// // //     setActiveMeetingId(meetingId)
// // //   }

// // //   const handleMenuClose = () => {
// // //     setMenuAnchorEl(null)
// // //     setActiveMeetingId(null)
// // //   }

// // //   const handleSortMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
// // //     setSortMenuAnchorEl(event.currentTarget)
// // //   }

// // //   const handleSortMenuClose = () => {
// // //     setSortMenuAnchorEl(null)
// // //   }

// // //   const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
// // //     setFilterMenuAnchorEl(event.currentTarget)
// // //   }

// // //   const handleFilterMenuClose = () => {
// // //     setFilterMenuAnchorEl(null)
// // //   }

// // //   const handleSort = (field: "date" | "name") => {
// // //     if (sortBy === field) {
// // //       setSortDirection(sortDirection === "asc" ? "desc" : "asc")
// // //     } else {
// // //       setSortBy(field)
// // //       setSortDirection("desc")
// // //     }
// // //     handleSortMenuClose()
// // //   }

// // //   const handleEditMeeting = (meeting: MeetingDTO) => {
// // //     setSelectedMeeting(meeting)
// // //     handleMenuClose()
// // //   }

// // //   // Delete handlers
// // //   const handleDeleteClick = (meetingId: number) => {
// // //     setMeetingToDelete(meetingId)
// // //     setDeleteDialogOpen(true)
// // //     handleMenuClose()
// // //   }

// // //   const handleDeleteCancel = () => {
// // //     setDeleteDialogOpen(false)
// // //     setMeetingToDelete(null)
// // //   }

// // //   const handleDeleteConfirm = async () => {
// // //     if (meetingToDelete) {
// // //       try {
// // //         await dispatch(deleteMeeting(meetingToDelete)).unwrap()
// // //         setMeetings((prevMeetings) => prevMeetings.filter((meeting) => meeting.id !== meetingToDelete))
// // //         setSnackbarMessage("Meeting deleted successfully")
// // //         setSnackbarOpen(true)
// // //       } catch (error) {
// // //         console.error("Error deleting meeting:", error)
// // //         setSnackbarMessage("Error deleting meeting")
// // //         setSnackbarOpen(true)
// // //       }
// // //       setDeleteDialogOpen(false)
// // //       setMeetingToDelete(null)
// // //     }
// // //   }

// // //   const handleCloseSnackbar = () => {
// // //     setSnackbarOpen(false)
// // //   }

// // //   return (
// // //     <Box>
// // //       {/* Search Component */}
// // //       <MeetingSearch onSearch={setSearchQuery} />

// // //       {/* Main Content */}
// // //       <Container maxWidth="lg" sx={{ py: 4 }}>
// // //         <Paper
// // //           elevation={0}
// // //           sx={{
// // //             p: 4,
// // //             borderRadius: 3,
// // //             border: "1px solid",
// // //             borderColor: "divider",
// // //             bgcolor: "background.paper",
// // //             mb: 4,
// // //           }}
// // //         >
// // //           <Box
// // //             sx={{
// // //               display: "flex",
// // //               flexDirection: { xs: "column", sm: "row" },
// // //               justifyContent: "space-between",
// // //               alignItems: { xs: "flex-start", sm: "center" },
// // //               mb: 3,
// // //               gap: 2,
// // //             }}
// // //           >
// // //             <Box>
// // //               <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
// // //                 Meetings
// // //               </Typography>
// // //               <Typography variant="body1" color="text.secondary">
// // //                 Manage and organize your team meetings
// // //               </Typography>
// // //               {/* Debug info */}
// // //               <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
// // //                 Team ID: {getUserTeamId() || "Not found"} | Meetings: {meetings.length}
// // //               </Typography>
// // //             </Box>

// // //             <Box sx={{ display: "flex", gap: 2 }}>
// // //               <Button
// // //                 variant="outlined"
// // //                 size="medium"
// // //                 startIcon={<Filter size={18} />}
// // //                 onClick={handleFilterMenuOpen}
// // //                 sx={{
// // //                   borderColor: "divider",
// // //                   color: "text.secondary",
// // //                   textTransform: "none",
// // //                   borderRadius: 2,
// // //                 }}
// // //               >
// // //                 Filter
// // //               </Button>
// // //               <Button
// // //                 variant="outlined"
// // //                 size="medium"
// // //                 startIcon={<SortAsc size={18} />}
// // //                 onClick={handleSortMenuOpen}
// // //                 sx={{
// // //                   borderColor: "divider",
// // //                   color: "text.secondary",
// // //                   textTransform: "none",
// // //                   borderRadius: 2,
// // //                 }}
// // //               >
// // //                 Sort
// // //               </Button>
// // //               <Button
// // //                 variant="contained"
// // //                 startIcon={<Plus size={18} />}
// // //                 onClick={() => navigate("/add-meeting")}
// // //                 sx={{
// // //                   background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
// // //                   color: "white",
// // //                   textTransform: "none",
// // //                   fontWeight: 600,
// // //                   borderRadius: 2,
// // //                   px: 3,
// // //                   "&:hover": {
// // //                     background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
// // //                   },
// // //                 }}
// // //               >
// // //                 New Meeting
// // //               </Button>
// // //             </Box>
// // //           </Box>

// // //           {/* Sort Menu */}
// // //           <Menu
// // //             anchorEl={sortMenuAnchorEl}
// // //             open={Boolean(sortMenuAnchorEl)}
// // //             onClose={handleSortMenuClose}
// // //             anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// // //             transformOrigin={{ vertical: "top", horizontal: "right" }}
// // //           >
// // //             <MenuItem onClick={() => handleSort("date")} selected={sortBy === "date"}>
// // //               <ListItemIcon>
// // //                 <Calendar size={16} />
// // //               </ListItemIcon>
// // //               <Typography variant="body2">
// // //                 By Date {sortBy === "date" && (sortDirection === "asc" ? "(Oldest first)" : "(Newest first)")}
// // //               </Typography>
// // //             </MenuItem>
// // //             <MenuItem onClick={() => handleSort("name")} selected={sortBy === "name"}>
// // //               <ListItemIcon>
// // //                 <SortAsc size={16} />
// // //               </ListItemIcon>
// // //               <Typography variant="body2">
// // //                 By Name {sortBy === "name" && (sortDirection === "asc" ? "(A-Z)" : "(Z-A)")}
// // //               </Typography>
// // //             </MenuItem>
// // //           </Menu>

// // //           {/* Filter Menu */}
// // //           <Menu
// // //             anchorEl={filterMenuAnchorEl}
// // //             open={Boolean(filterMenuAnchorEl)}
// // //             onClose={handleFilterMenuClose}
// // //             anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// // //             transformOrigin={{ vertical: "top", horizontal: "right" }}
// // //           >
// // //             <MenuItem onClick={handleFilterMenuClose}>
// // //               <Typography variant="body2">All Meetings</Typography>
// // //             </MenuItem>
// // //             <MenuItem onClick={handleFilterMenuClose}>
// // //               <Typography variant="body2">With Transcript</Typography>
// // //             </MenuItem>
// // //             <MenuItem onClick={handleFilterMenuClose}>
// // //               <Typography variant="body2">Without Transcript</Typography>
// // //             </MenuItem>
// // //           </Menu>

// // //           {/* Meetings List */}
// // //           {loading ? (
// // //             // Loading skeletons
// // //             Array.from(new Array(3)).map((_, index) => (
// // //               <Card key={index} sx={{ mb: 2, borderRadius: 2 }}>
// // //                 <CardContent>
// // //                   <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
// // //                     <Skeleton variant="circular" width={48} height={48} sx={{ mr: 2 }} />
// // //                     <Skeleton variant="text" width={200} height={30} />
// // //                   </Box>
// // //                   <Skeleton variant="text" width="60%" />
// // //                   <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
// // //                     <Skeleton variant="text" width={100} />
// // //                     <Skeleton variant="rectangular" width={120} height={36} />
// // //                   </Box>
// // //                 </CardContent>
// // //               </Card>
// // //             ))
// // //           ) : sortedMeetings.length > 0 ? (
// // //             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
// // //               {sortedMeetings.map((meeting, index) => (
// // //                 <motion.div
// // //                   key={meeting.id}
// // //                   initial={{ y: 20, opacity: 0 }}
// // //                   animate={{ y: 0, opacity: 1 }}
// // //                   transition={{ duration: 0.3, delay: index * 0.1 }}
// // //                 >
// // //                   <Card
// // //                     sx={{
// // //                       mb: 3,
// // //                       borderRadius: 3,
// // //                       border: "1px solid",
// // //                       borderColor: "divider",
// // //                       overflow: "hidden",
// // //                       transition: "all 0.3s ease",
// // //                       "&:hover": {
// // //                         borderColor: "#10b981",
// // //                         boxShadow: "0 8px 30px rgba(16, 185, 129, 0.15)",
// // //                         transform: "translateY(-2px)",
// // //                       },
// // //                     }}
// // //                   >
// // //                     <CardContent sx={{ p: 3 }}>
// // //                       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
// // //                         <Box sx={{ display: "flex", alignItems: "center" }}>
// // //                           <Avatar
// // //                             sx={{
// // //                               background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
// // //                               width: 48,
// // //                               height: 48,
// // //                               mr: 3,
// // //                               fontWeight: 600,
// // //                             }}
// // //                           >
// // //                             {meeting.name.charAt(0).toUpperCase()}
// // //                           </Avatar>
// // //                           <Box>
// // //                             <Typography variant="h6" fontWeight={600} gutterBottom>
// // //                               {meeting.name}
// // //                             </Typography>
// // //                             <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
// // //                               <Calendar size={16} style={{ marginRight: 8 }} />
// // //                               <Typography variant="body2">{formatDate(meeting.date)}</Typography>
// // //                             </Box>
// // //                           </Box>
// // //                         </Box>
// // //                         <IconButton
// // //                           size="small"
// // //                           onClick={(e) => handleMenuOpen(e, meeting.id)}
// // //                           sx={{
// // //                             color: "text.secondary",
// // //                             "&:hover": {
// // //                               backgroundColor: "rgba(16, 185, 129, 0.1)",
// // //                               color: "#10b981",
// // //                             },
// // //                           }}
// // //                         >
// // //                           <MoreVertical size={18} />
// // //                         </IconButton>
// // //                       </Box>

// // //                       <Divider sx={{ my: 2 }} />

// // //                       <Box
// // //                         sx={{
// // //                           display: "flex",
// // //                           justifyContent: "space-between",
// // //                           alignItems: "center",
// // //                         }}
// // //                       >
// // //                         <Box>
// // //                           {meeting.linkTranscriptFile && (
// // //                             <Chip
// // //                               label="Transcript Available"
// // //                               size="small"
// // //                               sx={{
// // //                                 bgcolor: "rgba(16, 185, 129, 0.1)",
// // //                                 color: "#10b981",
// // //                                 fontSize: "0.75rem",
// // //                                 fontWeight: 500,
// // //                                 borderRadius: 2,
// // //                               }}
// // //                             />
// // //                           )}
// // //                         </Box>
// // //                         <Button
// // //                           variant="outlined"
// // //                           size="small"
// // //                           startIcon={<Eye size={16} />}
// // //                           onClick={() => navigate(`/meeting-details/${meeting.id}`)}
// // //                           sx={{
// // //                             borderColor: "#10b981",
// // //                             color: "#10b981",
// // //                             textTransform: "none",
// // //                             fontWeight: 500,
// // //                             borderRadius: 2,
// // //                             "&:hover": {
// // //                               borderColor: "#059669",
// // //                               backgroundColor: "rgba(16, 185, 129, 0.05)",
// // //                             },
// // //                           }}
// // //                         >
// // //                           View Details
// // //                         </Button>
// // //                       </Box>
// // //                     </CardContent>
// // //                   </Card>
// // //                 </motion.div>
// // //               ))}
// // //             </motion.div>
// // //           ) : (
// // //             <Box
// // //               sx={{
// // //                 textAlign: "center",
// // //                 py: 8,
// // //                 color: "text.secondary",
// // //               }}
// // //             >
// // //               <Typography variant="h6" gutterBottom>
// // //                 No meetings found
// // //               </Typography>
// // //               <Typography variant="body2">
// // //                 {getUserTeamId()
// // //                   ? "Try searching with different keywords or create a new meeting."
// // //                   : "Please log in to view your team meetings."}
// // //               </Typography>
// // //             </Box>
// // //           )}
// // //         </Paper>

// // //         {/* Options Menu */}
// // //         <Menu
// // //           anchorEl={menuAnchorEl}
// // //           open={Boolean(menuAnchorEl)}
// // //           onClose={handleMenuClose}
// // //           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// // //           transformOrigin={{ vertical: "top", horizontal: "right" }}
// // //         >
// // //           <MenuItem
// // //             onClick={() => {
// // //               const meeting = meetings.find((m) => m.id === activeMeetingId)
// // //               if (meeting) handleEditMeeting(meeting)
// // //             }}
// // //           >
// // //             <ListItemIcon>
// // //               <Edit size={16} />
// // //             </ListItemIcon>
// // //             <Typography variant="body2">Edit Meeting</Typography>
// // //           </MenuItem>
// // //           <MenuItem
// // //             onClick={() => {
// // //               if (activeMeetingId) handleDeleteClick(activeMeetingId)
// // //             }}
// // //           >
// // //             <ListItemIcon>
// // //               <Trash2 size={16} color="#ef4444" />
// // //             </ListItemIcon>
// // //             <Typography variant="body2" color="error.main">
// // //               Delete Meeting
// // //             </Typography>
// // //           </MenuItem>
// // //         </Menu>

// // //         {/* Delete Confirmation Dialog */}
// // //         <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel} maxWidth="sm" fullWidth>
// // //           <DialogTitle sx={{ color: "error.main" }}>Delete Meeting?</DialogTitle>
// // //           <DialogContent>
// // //             <Typography variant="body1">
// // //               Are you sure you want to delete this meeting? This action cannot be undone and all related data will be
// // //               permanently removed.
// // //             </Typography>
// // //           </DialogContent>
// // //           <DialogActions sx={{ p: 3 }}>
// // //             <Button onClick={handleDeleteCancel} color="inherit">
// // //               Cancel
// // //             </Button>
// // //             <Button onClick={handleDeleteConfirm} variant="contained" color="error" startIcon={<Trash2 size={16} />}>
// // //               Delete Meeting
// // //             </Button>
// // //           </DialogActions>
// // //         </Dialog>

// // //         {/* Update Meeting Dialog */}
// // //         {selectedMeeting && (
// // //           <UpdateMeetingDialog
// // //             open={Boolean(selectedMeeting)}
// // //             handleClose={() => setSelectedMeeting(null)}
// // //             meeting={selectedMeeting}
// // //             onUpdate={handleUpdate}
// // //           />
// // //         )}

// // //         {/* Snackbar */}
// // //         <Snackbar
// // //           open={snackbarOpen}
// // //           autoHideDuration={5000}
// // //           onClose={handleCloseSnackbar}
// // //           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
// // //         >
// // //           <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes("Error") ? "error" : "success"}>
// // //             {snackbarMessage}
// // //           </Alert>
// // //         </Snackbar>
// // //       </Container>
// // //     </Box>
// // //   )
// // // }



// // "use client"

// // import type React from "react"
// // import { useEffect, useState } from "react"
// // import { useNavigate } from "react-router-dom"
// // import { motion } from "framer-motion"
// // import {
// //   Typography,
// //   Button,
// //   Box,
// //   Avatar,
// //   Paper,
// //   Chip,
// //   IconButton,
// //   Skeleton,
// //   Menu,
// //   MenuItem,
// //   ListItemIcon,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// //   Snackbar,
// //   Alert,
// //   Container,
// //   Card,
// //   CardContent,
// //   Grid,
// // } from "@mui/material"
// // import {
// //   Add as AddIcon,
// //   MoreVert as MoreVertIcon,
// //   CalendarToday as CalendarTodayIcon,
// //   Visibility as VisibilityIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Sort as SortIcon,
// // } from "@mui/icons-material"
// // import { Calendar, FileText, Sparkles, Users } from "lucide-react"
// // import UpdateMeetingDialog from "./UpdateMeetingDialog"
// // import type { MeetingDTO } from "../../models/meetingTypes"
// // import { fetchMeetingsByTeam, deleteMeeting } from "../../store/meetingSlice"
// // import { useSelector, useDispatch } from "react-redux"
// // import type { RootState, AppDispatch } from "../../store/store"
// // import MeetingSearch from "./MeetingSearch "

// // interface MeetingListProps {
// //   meetings?: MeetingDTO[]
// // }

// // export default function MeetingList({ meetings: meetingsFromProps }: MeetingListProps) {
// //   const [meetings, setMeetings] = useState<MeetingDTO[]>(meetingsFromProps || [])
// //   const [loading, setLoading] = useState(!meetingsFromProps)
// //   const [selectedMeeting, setSelectedMeeting] = useState<MeetingDTO | null>(null)
// //   const [searchQuery, setSearchQuery] = useState("")
// //   const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
// //   const [activeMeetingId, setActiveMeetingId] = useState<number | null>(null)
// //   const [sortMenuAnchorEl, setSortMenuAnchorEl] = useState<null | HTMLElement>(null)
// //   const [sortBy, setSortBy] = useState<"date" | "name">("date")
// //   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
// //   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
// //   const [meetingToDelete, setMeetingToDelete] = useState<number | null>(null)
// //   const [snackbarOpen, setSnackbarOpen] = useState(false)
// //   const [snackbarMessage, setSnackbarMessage] = useState("")

// //   const navigate = useNavigate()
// //   const dispatch = useDispatch<AppDispatch>()
// //   const user = useSelector((state: RootState) => state.auth.user)

// //   useEffect(() => {
// //     if (!meetingsFromProps) {
// //       const getMeetings = async () => {
// //         setLoading(true)
// //         try {
// //           const response = user?.teamId ? await fetchMeetingsByTeam({ teamId: user.teamId }) : []
// //           if (Array.isArray(response)) {
// //             setMeetings(response)
// //           }
// //         } catch (error) {
// //           console.error("Error fetching meetings:", error)
// //         } finally {
// //           setLoading(false)
// //         }
// //       }
// //       getMeetings()
// //     }
// //   }, [meetingsFromProps, user])

// //   const handleUpdate = (updatedMeeting: MeetingDTO) => {
// //     setMeetings((prevMeetings) =>
// //       prevMeetings.map((meeting) => (meeting.id === updatedMeeting.id ? updatedMeeting : meeting)),
// //     )
// //   }

// //   // פונקציית חיפוש
// //   const filteredMeetings = meetings.filter((meeting) => meeting.name.toLowerCase().includes(searchQuery.toLowerCase()))

// //   // מיון פגישות
// //   const sortedMeetings = [...filteredMeetings].sort((a, b) => {
// //     if (sortBy === "date") {
// //       const dateA = new Date(a.date).getTime()
// //       const dateB = new Date(b.date).getTime()
// //       return sortDirection === "asc" ? dateA - dateB : dateB - dateA
// //     } else {
// //       return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
// //     }
// //   })

// //   // פונקציה לפורמט תאריך
// //   const formatDate = (dateString: string) => {
// //     try {
// //       const date = new Date(dateString)
// //       return new Intl.DateTimeFormat("he-IL", {
// //         year: "numeric",
// //         month: "short",
// //         day: "numeric",
// //         hour: "2-digit",
// //         minute: "2-digit",
// //       }).format(date)
// //     } catch (e) {
// //       return dateString
// //     }
// //   }

// //   // פונקציות לתפריטים
// //   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, meetingId: number) => {
// //     setMenuAnchorEl(event.currentTarget)
// //     setActiveMeetingId(meetingId)
// //   }

// //   const handleMenuClose = () => {
// //     setMenuAnchorEl(null)
// //     setActiveMeetingId(null)
// //   }

// //   const handleSortMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
// //     setSortMenuAnchorEl(event.currentTarget)
// //   }

// //   const handleSortMenuClose = () => {
// //     setSortMenuAnchorEl(null)
// //   }

// //   const handleSort = (field: "date" | "name") => {
// //     if (sortBy === field) {
// //       setSortDirection(sortDirection === "asc" ? "desc" : "asc")
// //     } else {
// //       setSortBy(field)
// //       setSortDirection("desc")
// //     }
// //     handleSortMenuClose()
// //   }

// //   const handleEditMeeting = (meeting: MeetingDTO) => {
// //     setSelectedMeeting(meeting)
// //     handleMenuClose()
// //   }

// //   // פונקציות למחיקת פגישה
// //   const handleDeleteClick = (meetingId: number) => {
// //     setMeetingToDelete(meetingId)
// //     setDeleteDialogOpen(true)
// //     handleMenuClose()
// //   }

// //   const handleDeleteCancel = () => {
// //     setDeleteDialogOpen(false)
// //     setMeetingToDelete(null)
// //   }

// //   const handleDeleteConfirm = async () => {
// //     if (meetingToDelete) {
// //       try {
// //         await dispatch(deleteMeeting(meetingToDelete)).unwrap()
// //         setMeetings((prevMeetings) => prevMeetings.filter((meeting) => meeting.id !== meetingToDelete))
// //         setSnackbarMessage("הפגישה נמחקה בהצלחה")
// //         setSnackbarOpen(true)
// //       } catch (error) {
// //         console.error("Error deleting meeting:", error)
// //         setSnackbarMessage("שגיאה במחיקת הפגישה")
// //         setSnackbarOpen(true)
// //       }
// //       setDeleteDialogOpen(false)
// //       setMeetingToDelete(null)
// //     }
// //   }

// //   const handleCloseSnackbar = () => {
// //     setSnackbarOpen(false)
// //   }

// //   return (
// //     <Container maxWidth="lg" sx={{ py: 4 }}>
// //       {/* Header Section */}
// //       <Box sx={{ mb: 4 }}>
// //         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
// //           <Box sx={{ textAlign: "center", mb: 4 }}>
// //             <Typography variant="h3" fontWeight={700} color="text.primary" gutterBottom>
// //               פגישות הצוות
// //             </Typography>
// //             <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
// //               נהל את כל הפגישות שלך במקום אחד
// //             </Typography>
// //             <Button
// //               variant="contained"
// //               size="large"
// //               startIcon={<AddIcon />}
// //               onClick={() => navigate("/add-meeting")}
// //               sx={{
// //                 background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
// //                 color: "white",
// //                 textTransform: "none",
// //                 fontWeight: 600,
// //                 borderRadius: 3,
// //                 px: 4,
// //                 py: 1.5,
// //                 boxShadow: "0 8px 30px rgba(16, 185, 129, 0.3)",
// //                 "&:hover": {
// //                   background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
// //                   transform: "translateY(-2px)",
// //                   boxShadow: "0 12px 40px rgba(16, 185, 129, 0.4)",
// //                 },
// //                 transition: "all 0.3s ease",
// //               }}
// //             >
// //               פגישה חדשה
// //             </Button>
// //           </Box>
// //         </motion.div>

// //         {/* Controls */}
// //         <Paper
// //           elevation={0}
// //           sx={{
// //             p: 3,
// //             borderRadius: 3,
// //             border: "1px solid",
// //             borderColor: "divider",
// //             background: "rgba(255, 255, 255, 0.8)",
// //             backdropFilter: "blur(10px)",
// //           }}
// //         >
// //           <Box
// //             sx={{
// //               display: "flex",
// //               flexDirection: { xs: "column", sm: "row" },
// //               justifyContent: "space-between",
// //               alignItems: { xs: "stretch", sm: "center" },
// //               gap: 2,
// //               mb: 3,
// //             }}
// //           >
// //             <Box sx={{ flex: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
// //               <MeetingSearch onSearch={setSearchQuery} />
// //             </Box>
// //             <Button
// //               variant="outlined"
// //               startIcon={<SortIcon />}
// //               onClick={handleSortMenuOpen}
// //               sx={{
// //                 borderColor: "divider",
// //                 color: "text.secondary",
// //                 textTransform: "none",
// //                 borderRadius: 2,
// //                 "&:hover": {
// //                   borderColor: "#10b981",
// //                   color: "#10b981",
// //                 },
// //               }}
// //             >
// //               מיון
// //             </Button>
// //           </Box>
// //         </Paper>
// //       </Box>

// //       {/* Statistics Cards */}
// //       <Grid container spacing={3} sx={{ mb: 4 }}>
// //         <Grid item xs={12} sm={6} md={3}>
// //           <Card
// //             elevation={0}
// //             sx={{
// //               p: 3,
// //               borderRadius: 3,
// //               background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
// //               color: "white",
// //               border: "1px solid rgba(255, 255, 255, 0.1)",
// //             }}
// //           >
// //             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// //               <Box>
// //                 <Typography variant="h4" fontWeight={700}>
// //                   {meetings.length}
// //                 </Typography>
// //                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
// //                   סך הכל פגישות
// //                 </Typography>
// //               </Box>
// //               <Users size={32} style={{ opacity: 0.8 }} />
// //             </Box>
// //           </Card>
// //         </Grid>
// //         <Grid item xs={12} sm={6} md={3}>
// //           <Card
// //             elevation={0}
// //             sx={{
// //               p: 3,
// //               borderRadius: 3,
// //               background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
// //               color: "white",
// //               border: "1px solid rgba(255, 255, 255, 0.1)",
// //             }}
// //           >
// //             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// //               <Box>
// //                 <Typography variant="h4" fontWeight={700}>
// //                   {meetings.filter((m) => m.linkTranscriptFile).length}
// //                 </Typography>
// //                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
// //                   עם תמלול AI
// //                 </Typography>
// //               </Box>
// //               <Sparkles size={32} style={{ opacity: 0.8 }} />
// //             </Box>
// //           </Card>
// //         </Grid>
// //         <Grid item xs={12} sm={6} md={3}>
// //           <Card
// //             elevation={0}
// //             sx={{
// //               p: 3,
// //               borderRadius: 3,
// //               background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
// //               color: "white",
// //               border: "1px solid rgba(255, 255, 255, 0.1)",
// //             }}
// //           >
// //             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// //               <Box>
// //                 <Typography variant="h4" fontWeight={700}>
// //                   {meetings.filter((m) => m.linkOrinignFile).length}
// //                 </Typography>
// //                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
// //                   עם קבצים
// //                 </Typography>
// //               </Box>
// //               <FileText size={32} style={{ opacity: 0.8 }} />
// //             </Box>
// //           </Card>
// //         </Grid>
// //         <Grid item xs={12} sm={6} md={3}>
// //           <Card
// //             elevation={0}
// //             sx={{
// //               p: 3,
// //               borderRadius: 3,
// //               background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
// //               color: "white",
// //               border: "1px solid rgba(255, 255, 255, 0.1)",
// //             }}
// //           >
// //             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// //               <Box>
// //                 <Typography variant="h4" fontWeight={700}>
// //                   {meetings.filter((m) => new Date(m.date) > new Date()).length}
// //                 </Typography>
// //                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
// //                   פגישות עתידיות
// //                 </Typography>
// //               </Box>
// //               <Calendar size={32} style={{ opacity: 0.8 }} />
// //             </Box>
// //           </Card>
// //         </Grid>
// //       </Grid>

// //       {/* Meetings List */}
// //       {loading ? (
// //         <Grid container spacing={3}>
// //           {Array.from(new Array(6)).map((_, index) => (
// //             <Grid item xs={12} sm={6} md={4} key={index}>
// //               <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
// //                 <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
// //                   <Skeleton variant="circular" width={48} height={48} sx={{ mr: 2 }} />
// //                   <Skeleton variant="text" width={150} height={30} />
// //                 </Box>
// //                 <Skeleton variant="text" width="80%" />
// //                 <Skeleton variant="text" width="60%" />
// //                 <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
// //                   <Skeleton variant="text" width={80} />
// //                   <Skeleton variant="rectangular" width={100} height={36} />
// //                 </Box>
// //               </Card>
// //             </Grid>
// //           ))}
// //         </Grid>
// //       ) : sortedMeetings.length > 0 ? (
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
// //           <Grid container spacing={3}>
// //             {sortedMeetings.map((meeting, index) => (
// //               <Grid item xs={12} sm={6} md={4} key={meeting.id}>
// //                 <motion.div
// //                   initial={{ y: 20, opacity: 0 }}
// //                   animate={{ y: 0, opacity: 1 }}
// //                   transition={{ duration: 0.3, delay: index * 0.1 }}
// //                 >
// //                   <Card
// //                     elevation={0}
// //                     sx={{
// //                       height: "100%",
// //                       borderRadius: 3,
// //                       border: "1px solid",
// //                       borderColor: "divider",
// //                       overflow: "hidden",
// //                       transition: "all 0.3s ease",
// //                       cursor: "pointer",
// //                       "&:hover": {
// //                         borderColor: "#10b981",
// //                         boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
// //                         transform: "translateY(-4px)",
// //                       },
// //                     }}
// //                     onClick={() => navigate(`/meeting-details/${meeting.id}`)}
// //                   >
// //                     <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
// //                       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
// //                         <Avatar
// //                           sx={{
// //                             background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
// //                             width: 48,
// //                             height: 48,
// //                             fontWeight: 600,
// //                             fontSize: "1.2rem",
// //                           }}
// //                         >
// //                           {meeting.name.charAt(0).toUpperCase()}
// //                         </Avatar>
// //                         <IconButton
// //                           size="small"
// //                           onClick={(e) => {
// //                             e.stopPropagation()
// //                             handleMenuOpen(e, meeting.id)
// //                           }}
// //                           sx={{
// //                             "&:hover": {
// //                               backgroundColor: "rgba(16, 185, 129, 0.1)",
// //                             },
// //                           }}
// //                         >
// //                           <MoreVertIcon fontSize="small" />
// //                         </IconButton>
// //                       </Box>

// //                       <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 1 }}>
// //                         {meeting.name}
// //                       </Typography>

// //                       <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: "text.secondary" }}>
// //                         <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
// //                         <Typography variant="body2">{formatDate(meeting.date)}</Typography>
// //                       </Box>

// //                       <Box sx={{ flex: 1 }} />

// //                       <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
// //                         {meeting.linkOrinignFile && (
// //                           <Chip
// //                             label="קובץ מקורי"
// //                             size="small"
// //                             sx={{
// //                               backgroundColor: "rgba(16, 185, 129, 0.1)",
// //                               color: "#10b981",
// //                               fontSize: "0.75rem",
// //                               fontWeight: 500,
// //                             }}
// //                           />
// //                         )}
// //                         {meeting.linkTranscriptFile && (
// //                           <Chip
// //                             label="תמלול AI"
// //                             size="small"
// //                             sx={{
// //                               backgroundColor: "rgba(139, 92, 246, 0.1)",
// //                               color: "#8b5cf6",
// //                               fontSize: "0.75rem",
// //                               fontWeight: 500,
// //                             }}
// //                           />
// //                         )}
// //                       </Box>

// //                       <Button
// //                         variant="outlined"
// //                         size="small"
// //                         startIcon={<VisibilityIcon />}
// //                         onClick={(e) => {
// //                           e.stopPropagation()
// //                           navigate(`/meeting-details/${meeting.id}`)
// //                         }}
// //                         sx={{
// //                           borderColor: "#10b981",
// //                           color: "#10b981",
// //                           textTransform: "none",
// //                           fontWeight: 500,
// //                           "&:hover": {
// //                             borderColor: "#059669",
// //                             backgroundColor: "rgba(16, 185, 129, 0.04)",
// //                           },
// //                         }}
// //                       >
// //                         הצג פרטים
// //                       </Button>
// //                     </CardContent>
// //                   </Card>
// //                 </motion.div>
// //               </Grid>
// //             ))}
// //           </Grid>
// //         </motion.div>
// //       ) : (
// //         <Paper
// //           elevation={0}
// //           sx={{
// //             p: 6,
// //             borderRadius: 3,
// //             border: "1px solid",
// //             borderColor: "divider",
// //             textAlign: "center",
// //             background: "rgba(255, 255, 255, 0.8)",
// //           }}
// //         >
// //           <Typography variant="h6" gutterBottom>
// //             לא נמצאו פגישות
// //           </Typography>
// //           <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
// //             {searchQuery ? "נסה לחפש מחדש או צור פגישה חדשה" : "התחל ביצירת הפגישה הראשונה שלך"}
// //           </Typography>
// //           <Button
// //             variant="contained"
// //             startIcon={<AddIcon />}
// //             onClick={() => navigate("/add-meeting")}
// //             sx={{
// //               background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
// //               color: "white",
// //               textTransform: "none",
// //               fontWeight: 600,
// //               borderRadius: 2,
// //               "&:hover": {
// //                 background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
// //               },
// //             }}
// //           >
// //             צור פגישה חדשה
// //           </Button>
// //         </Paper>
// //       )}

// //       {/* תפריט מיון */}
// //       <Menu
// //         anchorEl={sortMenuAnchorEl}
// //         open={Boolean(sortMenuAnchorEl)}
// //         onClose={handleSortMenuClose}
// //         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// //         transformOrigin={{ vertical: "top", horizontal: "right" }}
// //       >
// //         <MenuItem onClick={() => handleSort("date")} selected={sortBy === "date"}>
// //           <ListItemIcon>
// //             <CalendarTodayIcon fontSize="small" />
// //           </ListItemIcon>
// //           <Typography variant="body2">
// //             לפי תאריך {sortBy === "date" && (sortDirection === "asc" ? "(מהישן לחדש)" : "(מהחדש לישן)")}
// //           </Typography>
// //         </MenuItem>
// //         <MenuItem onClick={() => handleSort("name")} selected={sortBy === "name"}>
// //           <ListItemIcon>
// //             <SortIcon fontSize="small" />
// //           </ListItemIcon>
// //           <Typography variant="body2">
// //             לפי שם {sortBy === "name" && (sortDirection === "asc" ? "(א-ת)" : "(ת-א)")}
// //           </Typography>
// //         </MenuItem>
// //       </Menu>

// //       {/* תפריט אפשרויות לפגישה */}
// //       <Menu
// //         anchorEl={menuAnchorEl}
// //         open={Boolean(menuAnchorEl)}
// //         onClose={handleMenuClose}
// //         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// //         transformOrigin={{ vertical: "top", horizontal: "right" }}
// //       >
// //         <MenuItem
// //           onClick={() => {
// //             const meeting = meetings.find((m) => m.id === activeMeetingId)
// //             if (meeting) handleEditMeeting(meeting)
// //           }}
// //         >
// //           <ListItemIcon>
// //             <EditIcon fontSize="small" />
// //           </ListItemIcon>
// //           <Typography variant="body2">ערוך פגישה</Typography>
// //         </MenuItem>
// //         <MenuItem
// //           onClick={() => {
// //             if (activeMeetingId) handleDeleteClick(activeMeetingId)
// //           }}
// //         >
// //           <ListItemIcon>
// //             <DeleteIcon fontSize="small" color="error" />
// //           </ListItemIcon>
// //           <Typography variant="body2" color="error.main">
// //             מחק פגישה
// //           </Typography>
// //         </MenuItem>
// //       </Menu>

// //       {/* דיאלוג אישור מחיקה */}
// //       <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
// //         <DialogTitle sx={{ color: "error.main" }}>{"האם אתה בטוח שברצונך למחוק את הפגישה?"}</DialogTitle>
// //         <DialogContent>
// //           <Typography variant="body1">
// //             פעולה זו אינה ניתנת לביטול. כל הנתונים הקשורים לפגישה זו יימחקו לצמיתות.
// //           </Typography>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleDeleteCancel} color="inherit">
// //             ביטול
// //           </Button>
// //           <Button onClick={handleDeleteConfirm} variant="contained" color="error" autoFocus startIcon={<DeleteIcon />}>
// //             מחק פגישה
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* דיאלוג עדכון פגישה */}
// //       {selectedMeeting && (
// //         <UpdateMeetingDialog
// //           open={Boolean(selectedMeeting)}
// //           handleClose={() => setSelectedMeeting(null)}
// //           meeting={selectedMeeting}
// //           onUpdate={handleUpdate}
// //         />
// //       )}

// //       {/* הודעת Snackbar */}
// //       <Snackbar
// //         open={snackbarOpen}
// //         autoHideDuration={5000}
// //         onClose={handleCloseSnackbar}
// //         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
// //       >
// //         <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes("שגיאה") ? "error" : "success"}>
// //           {snackbarMessage}
// //         </Alert>
// //       </Snackbar>
// //     </Container>
// //   )
// // }













// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { motion } from "framer-motion"
// import {
//   Typography,
//   Button,
//   Box,
//   Avatar,
//   Paper,
//   Chip,
//   IconButton,
//   Skeleton,
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Snackbar,
//   Alert,
//   Container,
//   Card,
//   CardContent,
//   Grid,
//   Divider,
// } from "@mui/material"
// import {
//   Add as AddIcon,
//   MoreVert as MoreVertIcon,
//   CalendarToday as CalendarTodayIcon,
//   Visibility as VisibilityIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Sort as SortIcon,
//   TrendingUp,
//   Schedule,
//   Description,
//   Group,
// } from "@mui/icons-material"
// import UpdateMeetingDialog from "./UpdateMeetingDialog"
// import type { MeetingDTO } from "../../models/meetingTypes"
// import { fetchMeetingsByTeam, deleteMeeting } from "../../store/meetingSlice"
// import { useSelector, useDispatch } from "react-redux"
// import type { RootState, AppDispatch } from "../../store/store"
// import MeetingSearch from "./MeetingSearch "

// interface MeetingListProps {
//   meetings?: MeetingDTO[]
// }

// export default function MeetingList({ meetings: meetingsFromProps }: MeetingListProps) {
//   const [meetings, setMeetings] = useState<MeetingDTO[]>(meetingsFromProps || [])
//   const [loading, setLoading] = useState(!meetingsFromProps)
//   const [selectedMeeting, setSelectedMeeting] = useState<MeetingDTO | null>(null)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
//   const [activeMeetingId, setActiveMeetingId] = useState<number | null>(null)
//   const [sortMenuAnchorEl, setSortMenuAnchorEl] = useState<null | HTMLElement>(null)
//   const [sortBy, setSortBy] = useState<"date" | "name">("date")
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [meetingToDelete, setMeetingToDelete] = useState<number | null>(null)
//   const [snackbarOpen, setSnackbarOpen] = useState(false)
//   const [snackbarMessage, setSnackbarMessage] = useState("")

//   const navigate = useNavigate()
//   const dispatch = useDispatch<AppDispatch>()
//   const user = useSelector((state: RootState) => state.auth.user)

//   useEffect(() => {
//     if (!meetingsFromProps) {
//       const getMeetings = async () => {
//         setLoading(true)
//         try {
//           const response = user?.teamId ? await fetchMeetingsByTeam({ teamId: user.teamId }) : []
//           if (Array.isArray(response)) {
//             setMeetings(response)
//           }
//         } catch (error) {
//           console.error("Error fetching meetings:", error)
//         } finally {
//           setLoading(false)
//         }
//       }
//       getMeetings()
//     }
//   }, [meetingsFromProps, user])

//   const handleUpdate = (updatedMeeting: MeetingDTO) => {
//     setMeetings((prevMeetings) =>
//       prevMeetings.map((meeting) => (meeting.id === updatedMeeting.id ? updatedMeeting : meeting)),
//     )
//   }

//   // פונקציית חיפוש
//   const filteredMeetings = meetings.filter((meeting) => meeting.name.toLowerCase().includes(searchQuery.toLowerCase()))

//   // מיון פגישות
//   const sortedMeetings = [...filteredMeetings].sort((a, b) => {
//     if (sortBy === "date") {
//       const dateA = new Date(a.date).getTime()
//       const dateB = new Date(b.date).getTime()
//       return sortDirection === "asc" ? dateA - dateB : dateB - dateA
//     } else {
//       return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
//     }
//   })

//   // פונקציה לפורמט תאריך
//   const formatDate = (dateString: string) => {
//     try {
//       const date = new Date(dateString)
//       return new Intl.DateTimeFormat("he-IL", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       }).format(date)
//     } catch (e) {
//       return dateString
//     }
//   }

//   // פונקציות לתפריטים
//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, meetingId: number) => {
//     setMenuAnchorEl(event.currentTarget)
//     setActiveMeetingId(meetingId)
//   }

//   const handleMenuClose = () => {
//     setMenuAnchorEl(null)
//     setActiveMeetingId(null)
//   }

//   const handleSortMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setSortMenuAnchorEl(event.currentTarget)
//   }

//   const handleSortMenuClose = () => {
//     setSortMenuAnchorEl(null)
//   }

//   const handleSort = (field: "date" | "name") => {
//     if (sortBy === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc")
//     } else {
//       setSortBy(field)
//       setSortDirection("desc")
//     }
//     handleSortMenuClose()
//   }

//   const handleEditMeeting = (meeting: MeetingDTO) => {
//     setSelectedMeeting(meeting)
//     handleMenuClose()
//   }

//   // פונקציות למחיקת פגישה
//   const handleDeleteClick = (meetingId: number) => {
//     setMeetingToDelete(meetingId)
//     setDeleteDialogOpen(true)
//     handleMenuClose()
//   }

//   const handleDeleteCancel = () => {
//     setDeleteDialogOpen(false)
//     setMeetingToDelete(null)
//   }

//   const handleDeleteConfirm = async () => {
//     if (meetingToDelete) {
//       try {
//         await dispatch(deleteMeeting(meetingToDelete)).unwrap()
//         setMeetings((prevMeetings) => prevMeetings.filter((meeting) => meeting.id !== meetingToDelete))
//         setSnackbarMessage("הפגישה נמחקה בהצלחה")
//         setSnackbarOpen(true)
//       } catch (error) {
//         console.error("Error deleting meeting:", error)
//         setSnackbarMessage("שגיאה במחיקת הפגישה")
//         setSnackbarOpen(true)
//       }
//       setDeleteDialogOpen(false)
//       setMeetingToDelete(null)
//     }
//   }

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false)
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
//         position: "relative",
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background:
//             "radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.03) 0%, transparent 50%)",
//           pointerEvents: "none",
//         },
//       }}
//     >
//       <Container maxWidth="xl" sx={{ py: 4, position: "relative", zIndex: 1 }}>
//         {/* Header Section */}
//         <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//           <Box sx={{ textAlign: "center", mb: 6 }}>
//             <Typography
//               variant="h3"
//               fontWeight={800}
//               sx={{
//                 color: "#1e293b",
//                 mb: 2,
//                 background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
//                 backgroundClip: "text",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               מרכז הפגישות
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 color: "#64748b",
//                 mb: 4,
//                 maxWidth: "600px",
//                 mx: "auto",
//                 lineHeight: 1.6,
//               }}
//             >
//               נהלו את כל הפגישות שלכם במקום אחד עם כלים מתקדמים לארגון ומעקב
//             </Typography>

//             <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 startIcon={<AddIcon />}
//                 onClick={() => navigate("/add-meeting")}
//                 sx={{
//                   background: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
//                   color: "white",
//                   textTransform: "none",
//                   fontWeight: 600,
//                   borderRadius: 3,
//                   px: 4,
//                   py: 1.5,
//                   boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
//                   "&:hover": {
//                     background: "linear-gradient(135deg, #5b5ff5 0%, #2563eb 100%)",
//                     transform: "translateY(-2px)",
//                     boxShadow: "0 15px 40px rgba(99, 102, 241, 0.4)",
//                   },
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 פגישה חדשה
//               </Button>

//               <Button
//                 variant="outlined"
//                 size="large"
//                 startIcon={<SortIcon />}
//                 onClick={handleSortMenuOpen}
//                 sx={{
//                   borderColor: "#cbd5e1",
//                   color: "#64748b",
//                   textTransform: "none",
//                   fontWeight: 500,
//                   borderRadius: 3,
//                   px: 3,
//                   "&:hover": {
//                     borderColor: "#6366f1",
//                     color: "#6366f1",
//                     backgroundColor: "rgba(99, 102, 241, 0.04)",
//                   },
//                 }}
//               >
//                 מיון
//               </Button>
//             </Box>
//           </Box>
//         </motion.div>

//         {/* Search Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <Paper
//             elevation={0}
//             sx={{
//               p: 3,
//               borderRadius: 4,
//               border: "1px solid #e2e8f0",
//               background: "rgba(255, 255, 255, 0.8)",
//               backdropFilter: "blur(10px)",
//               mb: 4,
//               boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
//             }}
//           >
//             <MeetingSearch onSearch={setSearchQuery} />
//           </Paper>
//         </motion.div>

//         {/* Statistics Cards */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//         >
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card
//                 elevation={0}
//                 sx={{
//                   p: 3,
//                   borderRadius: 4,
//                   background: "linear-gradient(135deg, #6366f1 0%, #5b5ff5 100%)",
//                   color: "white",
//                   border: "1px solid rgba(255, 255, 255, 0.1)",
//                   position: "relative",
//                   overflow: "hidden",
//                   "&::before": {
//                     content: '""',
//                     position: "absolute",
//                     top: 0,
//                     right: 0,
//                     width: "100px",
//                     height: "100px",
//                     background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
//                     borderRadius: "50%",
//                     transform: "translate(30px, -30px)",
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     position: "relative",
//                     zIndex: 1,
//                   }}
//                 >
//                   <Box>
//                     <Typography variant="h4" fontWeight={700}>
//                       {meetings.length}
//                     </Typography>
//                     <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
//                       סך הכל פגישות
//                     </Typography>
//                   </Box>
//                   <Group sx={{ fontSize: 32, opacity: 0.8 }} />
//                 </Box>
//               </Card>
//             </Grid>

//             <Grid item xs={12} sm={6} md={3}>
//               <Card
//                 elevation={0}
//                 sx={{
//                   p: 3,
//                   borderRadius: 4,
//                   background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
//                   color: "white",
//                   border: "1px solid rgba(255, 255, 255, 0.1)",
//                   position: "relative",
//                   overflow: "hidden",
//                   "&::before": {
//                     content: '""',
//                     position: "absolute",
//                     top: 0,
//                     right: 0,
//                     width: "100px",
//                     height: "100px",
//                     background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
//                     borderRadius: "50%",
//                     transform: "translate(30px, -30px)",
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     position: "relative",
//                     zIndex: 1,
//                   }}
//                 >
//                   <Box>
//                     <Typography variant="h4" fontWeight={700}>
//                       {meetings.filter((m) => m.linkTranscriptFile).length}
//                     </Typography>
//                     <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
//                       עם תמלול AI
//                     </Typography>
//                   </Box>
//                   <Description sx={{ fontSize: 32, opacity: 0.8 }} />
//                 </Box>
//               </Card>
//             </Grid>

//             <Grid item xs={12} sm={6} md={3}>
//               <Card
//                 elevation={0}
//                 sx={{
//                   p: 3,
//                   borderRadius: 4,
//                   background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
//                   color: "white",
//                   border: "1px solid rgba(255, 255, 255, 0.1)",
//                   position: "relative",
//                   overflow: "hidden",
//                   "&::before": {
//                     content: '""',
//                     position: "absolute",
//                     top: 0,
//                     right: 0,
//                     width: "100px",
//                     height: "100px",
//                     background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
//                     borderRadius: "50%",
//                     transform: "translate(30px, -30px)",
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     position: "relative",
//                     zIndex: 1,
//                   }}
//                 >
//                   <Box>
//                     <Typography variant="h4" fontWeight={700}>
//                       {meetings.filter((m) => m.linkOrinignFile).length}
//                     </Typography>
//                     <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
//                       עם קבצים
//                     </Typography>
//                   </Box>
//                   <TrendingUp sx={{ fontSize: 32, opacity: 0.8 }} />
//                 </Box>
//               </Card>
//             </Grid>

//             <Grid item xs={12} sm={6} md={3}>
//               <Card
//                 elevation={0}
//                 sx={{
//                   p: 3,
//                   borderRadius: 4,
//                   background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
//                   color: "white",
//                   border: "1px solid rgba(255, 255, 255, 0.1)",
//                   position: "relative",
//                   overflow: "hidden",
//                   "&::before": {
//                     content: '""',
//                     position: "absolute",
//                     top: 0,
//                     right: 0,
//                     width: "100px",
//                     height: "100px",
//                     background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
//                     borderRadius: "50%",
//                     transform: "translate(30px, -30px)",
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     position: "relative",
//                     zIndex: 1,
//                   }}
//                 >
//                   <Box>
//                     <Typography variant="h4" fontWeight={700}>
//                       {meetings.filter((m) => new Date(m.date) > new Date()).length}
//                     </Typography>
//                     <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
//                       פגישות עתידיות
//                     </Typography>
//                   </Box>
//                   <Schedule sx={{ fontSize: 32, opacity: 0.8 }} />
//                 </Box>
//               </Card>
//             </Grid>
//           </Grid>
//         </motion.div>

//         {/* Meetings List */}
//         {loading ? (
//           <Grid container spacing={3}>
//             {Array.from(new Array(6)).map((_, index) => (
//               <Grid item xs={12} sm={6} lg={4} key={index}>
//                 <Card
//                   elevation={0}
//                   sx={{
//                     p: 3,
//                     borderRadius: 4,
//                     border: "1px solid #e2e8f0",
//                     background: "rgba(255, 255, 255, 0.8)",
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//                     <Skeleton variant="circular" width={56} height={56} sx={{ mr: 2 }} />
//                     <Box sx={{ flex: 1 }}>
//                       <Skeleton variant="text" width="80%" height={28} />
//                       <Skeleton variant="text" width="60%" height={20} />
//                     </Box>
//                   </Box>
//                   <Skeleton variant="text" width="100%" height={20} />
//                   <Skeleton variant="text" width="70%" height={20} />
//                   <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
//                     <Skeleton variant="text" width={80} />
//                     <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 2 }} />
//                   </Box>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : sortedMeetings.length > 0 ? (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
//             <Grid container spacing={3}>
//               {sortedMeetings.map((meeting, index) => (
//                 <Grid item xs={12} sm={6} lg={4} key={meeting.id}>
//                   <motion.div
//                     initial={{ y: 30, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                   >
//                     <Card
//                       elevation={0}
//                       sx={{
//                         height: "100%",
//                         borderRadius: 4,
//                         border: "1px solid #e2e8f0",
//                         background: "rgba(255, 255, 255, 0.9)",
//                         backdropFilter: "blur(10px)",
//                         overflow: "hidden",
//                         transition: "all 0.3s ease",
//                         cursor: "pointer",
//                         position: "relative",
//                         "&:hover": {
//                           borderColor: "#6366f1",
//                           boxShadow: "0 20px 60px rgba(99, 102, 241, 0.15)",
//                           transform: "translateY(-8px)",
//                           "& .meeting-avatar": {
//                             transform: "scale(1.1)",
//                           },
//                         },
//                       }}
//                       onClick={() => navigate(`/meeting-details/${meeting.id}`)}
//                     >
//                       <CardContent sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column" }}>
//                         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
//                           <Avatar
//                             className="meeting-avatar"
//                             sx={{
//                               background: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
//                               width: 56,
//                               height: 56,
//                               fontWeight: 700,
//                               fontSize: "1.4rem",
//                               transition: "transform 0.3s ease",
//                               boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
//                             }}
//                           >
//                             {meeting.name.charAt(0).toUpperCase()}
//                           </Avatar>
//                           <IconButton
//                             size="small"
//                             onClick={(e) => {
//                               e.stopPropagation()
//                               handleMenuOpen(e, meeting.id)
//                             }}
//                             sx={{
//                               color: "#94a3b8",
//                               "&:hover": {
//                                 backgroundColor: "rgba(99, 102, 241, 0.08)",
//                                 color: "#6366f1",
//                               },
//                             }}
//                           >
//                             <MoreVertIcon fontSize="small" />
//                           </IconButton>
//                         </Box>

//                         <Typography
//                           variant="h6"
//                           fontWeight={700}
//                           gutterBottom
//                           sx={{
//                             mb: 2,
//                             color: "#1e293b",
//                             lineHeight: 1.3,
//                           }}
//                         >
//                           {meeting.name}
//                         </Typography>

//                         <Box sx={{ display: "flex", alignItems: "center", mb: 3, color: "#64748b" }}>
//                           <CalendarTodayIcon fontSize="small" sx={{ mr: 1.5, color: "#94a3b8" }} />
//                           <Typography variant="body2" fontWeight={500}>
//                             {formatDate(meeting.date)}
//                           </Typography>
//                         </Box>

//                         <Box sx={{ flex: 1 }} />

//                         <Divider sx={{ my: 2, borderColor: "#f1f5f9" }} />

//                         <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
//                           {meeting.linkOrinignFile && (
//                             <Chip
//                               label="קובץ מקורי"
//                               size="small"
//                               sx={{
//                                 backgroundColor: "rgba(16, 185, 129, 0.1)",
//                                 color: "#10b981",
//                                 fontSize: "0.75rem",
//                                 fontWeight: 600,
//                                 borderRadius: 2,
//                                 border: "1px solid rgba(16, 185, 129, 0.2)",
//                               }}
//                             />
//                           )}
//                           {meeting.linkTranscriptFile && (
//                             <Chip
//                               label="תמלול AI"
//                               size="small"
//                               sx={{
//                                 backgroundColor: "rgba(99, 102, 241, 0.1)",
//                                 color: "#6366f1",
//                                 fontSize: "0.75rem",
//                                 fontWeight: 600,
//                                 borderRadius: 2,
//                                 border: "1px solid rgba(99, 102, 241, 0.2)",
//                               }}
//                             />
//                           )}
//                         </Box>

//                         <Button
//                           variant="outlined"
//                           size="medium"
//                           startIcon={<VisibilityIcon />}
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             navigate(`/meeting-details/${meeting.id}`)
//                           }}
//                           sx={{
//                             borderColor: "#6366f1",
//                             color: "#6366f1",
//                             textTransform: "none",
//                             fontWeight: 600,
//                             borderRadius: 2,
//                             py: 1,
//                             "&:hover": {
//                               borderColor: "#5b5ff5",
//                               backgroundColor: "rgba(99, 102, 241, 0.04)",
//                               transform: "translateY(-1px)",
//                             },
//                             transition: "all 0.2s ease",
//                           }}
//                         >
//                           הצג פרטים
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 </Grid>
//               ))}
//             </Grid>
//           </motion.div>
//         ) : (
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 8,
//                 borderRadius: 4,
//                 border: "1px solid #e2e8f0",
//                 textAlign: "center",
//                 background: "rgba(255, 255, 255, 0.9)",
//                 backdropFilter: "blur(10px)",
//               }}
//             >
//               <Box
//                 sx={{
//                   width: 120,
//                   height: 120,
//                   borderRadius: "50%",
//                   background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   mx: "auto",
//                   mb: 3,
//                 }}
//               >
//                 <CalendarTodayIcon sx={{ fontSize: 48, color: "#94a3b8" }} />
//               </Box>
//               <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: "#1e293b" }}>
//                 לא נמצאו פגישות
//               </Typography>
//               <Typography variant="body1" color="#64748b" sx={{ mb: 4, maxWidth: "400px", mx: "auto" }}>
//                 {searchQuery
//                   ? "נסו לחפש מחדש עם מילות מפתח אחרות או צרו פגישה חדשה"
//                   : "התחילו ביצירת הפגישה הראשונה שלכם"}
//               </Typography>
//               <Button
//                 variant="contained"
//                 size="large"
//                 startIcon={<AddIcon />}
//                 onClick={() => navigate("/add-meeting")}
//                 sx={{
//                   background: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
//                   color: "white",
//                   textTransform: "none",
//                   fontWeight: 600,
//                   borderRadius: 3,
//                   px: 4,
//                   py: 1.5,
//                   boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
//                   "&:hover": {
//                     background: "linear-gradient(135deg, #5b5ff5 0%, #2563eb 100%)",
//                     transform: "translateY(-2px)",
//                     boxShadow: "0 15px 40px rgba(99, 102, 241, 0.4)",
//                   },
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 צרו פגישה חדשה
//               </Button>
//             </Paper>
//           </motion.div>
//         )}

//         {/* תפריט מיון */}
//         <Menu
//           anchorEl={sortMenuAnchorEl}
//           open={Boolean(sortMenuAnchorEl)}
//           onClose={handleSortMenuClose}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//           transformOrigin={{ vertical: "top", horizontal: "right" }}
//           PaperProps={{
//             sx: {
//               borderRadius: 3,
//               border: "1px solid #e2e8f0",
//               boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//             },
//           }}
//         >
//           <MenuItem onClick={() => handleSort("date")} selected={sortBy === "date"}>
//             <ListItemIcon>
//               <CalendarTodayIcon fontSize="small" />
//             </ListItemIcon>
//             <Typography variant="body2">
//               לפי תאריך {sortBy === "date" && (sortDirection === "asc" ? "(מהישן לחדש)" : "(מהחדש לישן)")}
//             </Typography>
//           </MenuItem>
//           <MenuItem onClick={() => handleSort("name")} selected={sortBy === "name"}>
//             <ListItemIcon>
//               <SortIcon fontSize="small" />
//             </ListItemIcon>
//             <Typography variant="body2">
//               לפי שם {sortBy === "name" && (sortDirection === "asc" ? "(א-ת)" : "(ת-א)")}
//             </Typography>
//           </MenuItem>
//         </Menu>

//         {/* תפריט אפשרויות לפגישה */}
//         <Menu
//           anchorEl={menuAnchorEl}
//           open={Boolean(menuAnchorEl)}
//           onClose={handleMenuClose}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//           transformOrigin={{ vertical: "top", horizontal: "right" }}
//           PaperProps={{
//             sx: {
//               borderRadius: 3,
//               border: "1px solid #e2e8f0",
//               boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//             },
//           }}
//         >
//           <MenuItem
//             onClick={() => {
//               const meeting = meetings.find((m) => m.id === activeMeetingId)
//               if (meeting) handleEditMeeting(meeting)
//             }}
//           >
//             <ListItemIcon>
//               <EditIcon fontSize="small" />
//             </ListItemIcon>
//             <Typography variant="body2">ערוך פגישה</Typography>
//           </MenuItem>
//           <MenuItem
//             onClick={() => {
//               if (activeMeetingId) handleDeleteClick(activeMeetingId)
//             }}
//           >
//             <ListItemIcon>
//               <DeleteIcon fontSize="small" color="error" />
//             </ListItemIcon>
//             <Typography variant="body2" color="error.main">
//               מחק פגישה
//             </Typography>
//           </MenuItem>
//         </Menu>

//         {/* דיאלוג אישור מחיקה */}
//         <Dialog
//           open={deleteDialogOpen}
//           onClose={handleDeleteCancel}
//           PaperProps={{
//             sx: {
//               borderRadius: 4,
//               border: "1px solid #e2e8f0",
//             },
//           }}
//         >
//           <DialogTitle sx={{ color: "error.main", fontWeight: 700 }}>
//             {"האם אתם בטוחים שברצונכם למחוק את הפגישה?"}
//           </DialogTitle>
//           <DialogContent>
//             <Typography variant="body1" sx={{ color: "#64748b" }}>
//               פעולה זו אינה ניתנת לביטול. כל הנתונים הקשורים לפגישה זו יימחקו לצמיתות.
//             </Typography>
//           </DialogContent>
//           <DialogActions sx={{ p: 3 }}>
//             <Button
//               onClick={handleDeleteCancel}
//               sx={{
//                 color: "#64748b",
//                 textTransform: "none",
//                 fontWeight: 500,
//               }}
//             >
//               ביטול
//             </Button>
//             <Button
//               onClick={handleDeleteConfirm}
//               variant="contained"
//               color="error"
//               autoFocus
//               startIcon={<DeleteIcon />}
//               sx={{
//                 textTransform: "none",
//                 fontWeight: 600,
//                 borderRadius: 2,
//               }}
//             >
//               מחק פגישה
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* דיאלוג עדכון פגישה */}
//         {selectedMeeting && (
//           <UpdateMeetingDialog
//             open={Boolean(selectedMeeting)}
//             handleClose={() => setSelectedMeeting(null)}
//             meeting={selectedMeeting}
//             onUpdate={handleUpdate}
//           />
//         )}

//         {/* הודעת Snackbar */}
//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={5000}
//           onClose={handleCloseSnackbar}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         >
//           <Alert
//             onClose={handleCloseSnackbar}
//             severity={snackbarMessage.includes("שגיאה") ? "error" : "success"}
//             sx={{
//               borderRadius: 3,
//               fontWeight: 500,
//             }}
//           >
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       </Container>
//     </Box>
//   )
// }

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
