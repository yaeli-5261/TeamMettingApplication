// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { useNavigate, useLocation } from "react-router-dom"
// import {
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   Button,
//   useMediaQuery,
//   useTheme,
//   Avatar,
//   Menu,
//   MenuItem,
//   IconButton,
//   Tooltip,
//   CircularProgress,
//   Chip,
//   Fade,
// } from "@mui/material"
// import {
//   Home as HomeIcon,
//   CalendarMonth as CalendarIcon,
//   Settings as SettingsIcon,
//   Add as AddIcon,
//   Login as LoginIcon,
//   Logout as LogoutIcon,
//   Person as PersonIcon,
//   Description as DescriptionIcon,
//   Menu as MenuIcon,
//   InsertDriveFile as FileIcon,
//   PictureAsPdf as PdfIcon,
//   Article as DocIcon,
//   Image as ImageIcon,
//   TextSnippet as TextIcon,
//   Close as CloseIcon,
// } from "@mui/icons-material"
// import { useSelector, useDispatch } from "react-redux"
// import type { RootState, AppDispatch } from "../../store/store"
// import { logout } from "../../store/authSlice"
// import { fetchMeetingsByTeam } from "../../store/meetingSlice"
// import { getCookie } from "../../services/meetingService"
// import TeamChat from "../chat/chat-message"

// const navItems = [
//   { name: "Dashboard", path: "/", icon: <HomeIcon /> },
//   { name: "Meetings", path: "/meetings", icon: <CalendarIcon /> },
//   { name: "Chat", path: "/chat", icon: <TeamChat /> },

// ]

// interface RecentFile {
//   name: string
//   path: string
//   meetingId: number
//   fileType: string
//   date: Date
// }

// interface AppSidebarProps {
//   mobileOpen: boolean
//   handleDrawerToggle: () => void
// }

// export function AppSidebar({ mobileOpen, handleDrawerToggle }: AppSidebarProps) {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const theme = useTheme()
//   const dispatch = useDispatch<AppDispatch>()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))
//   const { user } = useSelector((state: RootState) => state.auth)
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [recentFiles, setRecentFiles] = useState<RecentFile[]>([])
//   const [loadingFiles, setLoadingFiles] = useState(false)

//   const meetings = useSelector((state: RootState) => state.meeting.list)

//   useEffect(() => {
//     const userData = sessionStorage.getItem("user")
//     const token = getCookie("auth_token")
//     setIsLoggedIn(!!(userData && token && user && user.userName))
//   }, [user])

//   useEffect(() => {
//     if (isLoggedIn && user?.teamId) {
//       setLoadingFiles(true)

//       if (meetings.length === 0) {
//         dispatch(fetchMeetingsByTeam({ teamId: user.teamId }))
//           .unwrap()
//           .then((fetchedMeetings) => {
//             extractRecentFiles(fetchedMeetings)
//           })
//           .catch((error) => {
//             console.error("Error fetching meetings:", error)
//           })
//           .finally(() => {
//             setLoadingFiles(false)
//           })
//       } else {
//         extractRecentFiles(meetings)
//         setLoadingFiles(false)
//       }
//     }
//   }, [isLoggedIn, user, meetings, dispatch])

//   const extractRecentFiles = (meetingsData: any[]) => {
//     const files: RecentFile[] = []

//     meetingsData.forEach((meeting) => {
//       if (meeting.linkOrinignFile) {
//         const fileName = meeting.linkOrinignFile.split("/").pop() || "File"
//         const fileType = getFileType(fileName)

//         files.push({
//           name: fileName,
//           path: `/meeting-details/${meeting.id}`,
//           meetingId: meeting.id,
//           fileType: fileType,
//           date: new Date(meeting.date),
//         })
//       }

//       if (meeting.linkTranscriptFile) {
//         const fileName = meeting.linkTranscriptFile.split("/").pop() || "Summary"
//         const fileType = getFileType(fileName)

//         files.push({
//           name: `Summary - ${fileName}`,
//           path: `/meeting-details/${meeting.id}`,
//           meetingId: meeting.id,
//           fileType: fileType,
//           date: new Date(meeting.date),
//         })
//       }
//     })

//     const sortedFiles = files.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5)
//     setRecentFiles(sortedFiles)
//   }

//   const getFileType = (fileName: string): string => {
//     const extension = fileName.split(".").pop()?.toLowerCase() || ""

//     if (["pdf"].includes(extension)) return "pdf"
//     if (["doc", "docx"].includes(extension)) return "doc"
//     if (["jpg", "jpeg", "png", "gif"].includes(extension)) return "image"
//     if (["txt", "md"].includes(extension)) return "text"

//     return "file"
//   }

//   const getFileIcon = (fileType: string) => {
//     switch (fileType) {
//       case "pdf":
//         return <PdfIcon fontSize="small" sx={{ color: "#f44336" }} />
//       case "doc":
//         return <DocIcon fontSize="small" sx={{ color: "#2196f3" }} />
//       case "image":
//         return <ImageIcon fontSize="small" sx={{ color: "#4caf50" }} />
//       case "text":
//         return <TextIcon fontSize="small" sx={{ color: "#ff9800" }} />
//       default:
//         return <FileIcon fontSize="small" sx={{ color: "#757575" }} />
//     }
//   }

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const open = Boolean(anchorEl)

//   const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   const handleNavigation = (path: string) => {
//     navigate(path)
//     if (isMobile) {
//       handleDrawerToggle()
//     }
//   }

//   const handleLogout = () => {
//     dispatch(logout())
//     document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
//     sessionStorage.removeItem("user")
//     handleClose()
//     setIsLoggedIn(false)
//     navigate("/")
//   }

//   const isActive = (path: string) => {
//     return location.pathname === path || location.pathname.startsWith(path + "/")
//   }

//   const drawerContent = (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         width: 280,
//         background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
//         borderRight: "1px solid",
//         borderColor: "divider",
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           p: 3,
//           borderBottom: "1px solid",
//           borderColor: "divider",
//           background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
//           color: "white",
//           position: "relative",
//           "&::after": {
//             content: '""',
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: "1px",
//             background: "rgba(255,255,255,0.2)",
//           },
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 width: 40,
//                 height: 40,
//                 borderRadius: 2,
//                 background: "rgba(255,255,255,0.2)",
//                 mr: 2,
//                 backdropFilter: "blur(10px)",
//               }}
//             >
//               <DescriptionIcon sx={{ color: "white", fontSize: 24 }} />
//             </Box>
//             <Box>
//               <Typography variant="h6" fontWeight={700}>
//                 MeetingFiles
//               </Typography>
//               <Typography variant="caption" sx={{ opacity: 0.8 }}>
//                 v2.0
//               </Typography>
//             </Box>
//           </Box>
//           {isMobile && (
//             <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
//               <CloseIcon />
//             </IconButton>
//           )}
//         </Box>
//       </Box>

//       {/* User Profile */}
//       <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
//         {isLoggedIn ? (
//           <>
//             <Box
//               onClick={handleUserClick}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 2,
//                 cursor: "pointer",
//                 p: 2,
//                 borderRadius: 2,
//                 transition: "all 0.2s ease",
//                 "&:hover": {
//                   bgcolor: "rgba(16, 163, 127, 0.05)",
//                   transform: "translateY(-1px)",
//                 },
//               }}
//             >
//               <Avatar
//                 sx={{
//                   width: 40,
//                   height: 40,
//                   background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
//                   fontWeight: 600,
//                 }}
//               >
//                 {user?.userName ? user.userName.charAt(0).toUpperCase() : <PersonIcon />}
//               </Avatar>
//               <Box sx={{ overflow: "hidden", flexGrow: 1 }}>
//                 <Typography variant="body1" fontWeight={600} noWrap>
//                   {user?.userName || "User"}
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary" noWrap>
//                   {user?.email || "Logged in"}
//                 </Typography>
//               </Box>
//               <Chip
//                 label="Pro"
//                 size="small"
//                 sx={{
//                   background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
//                   color: "white",
//                   fontWeight: 600,
//                 }}
//               />
//             </Box>

//             <Menu
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleClose}
//               PaperProps={{
//                 sx: {
//                   borderRadius: 2,
//                   boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
//                   border: "1px solid",
//                   borderColor: "divider",
//                 },
//               }}
//             >
//               <MenuItem onClick={handleLogout} sx={{ gap: 2 }}>
//                 <LogoutIcon fontSize="small" />
//                 Logout
//               </MenuItem>
//             </Menu>
//           </>
//         ) : (
//           <Box>
//             <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//               Welcome! Please sign in to continue
//             </Typography>
//             <Button
//               onClick={() => navigate("/login")}
//               variant="contained"
//               startIcon={<LoginIcon />}
//               fullWidth
//               sx={{
//                 borderRadius: 2,
//                 background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
//                 textTransform: "none",
//                 fontWeight: 600,
//                 "&:hover": {
//                   background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
//                   transform: "translateY(-1px)",
//                 },
//                 transition: "all 0.2s ease",
//               }}
//             >
//               Sign In
//             </Button>
//           </Box>
//         )}
//       </Box>

//       <List sx={{ px: 2, py: 1 }}>
//         {navItems.map((item) => (
//           <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
//             <ListItemButton
//               onClick={() => handleNavigation(item.path)}
//               selected={isActive(item.path)}
//               sx={{
//                 borderRadius: 2,
//                 transition: "all 0.2s ease",
//                 "&.Mui-selected": {
//                   background: "linear-gradient(135deg, rgba(16, 163, 127, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%)",
//                   color: "#10a37f",
//                   "&:hover": {
//                     background: "linear-gradient(135deg, rgba(16, 163, 127, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%)",
//                   },
//                   "& .MuiListItemIcon-root": {
//                     color: "#10a37f",
//                   },
//                 },
//                 "&:hover": {
//                   bgcolor: "rgba(0, 0, 0, 0.04)",
//                   transform: "translateX(4px)",
//                 },
//               }}
//             >
//               <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
//               <ListItemText
//                 primary={item.name}
//                 primaryTypographyProps={{
//                   fontWeight: isActive(item.path) ? 600 : 500,
//                 }}
//               />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>

//       <Box sx={{ flexGrow: 1, overflow: "auto", px: 2, py: 1 }}>
//         <Typography
//           variant="caption"
//           color="text.secondary"
//           sx={{
//             display: "block",
//             fontWeight: 600,
//             px: 2,
//             mb: 1,
//             textTransform: "uppercase",
//             letterSpacing: 0.5,
//           }}
//         >
//           Recent Files
//         </Typography>

//         {loadingFiles ? (
//           <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
//             <CircularProgress size={24} sx={{ color: "#10a37f" }} />
//           </Box>
//         ) : recentFiles.length > 0 ? (
//           <List dense disablePadding>
//             {recentFiles.map((file, index) => (
//               <Fade in key={`${file.meetingId}-${index}`} timeout={300 + index * 100}>
//                 <ListItem disablePadding sx={{ mb: 0.5 }}>
//                   <Tooltip
//                     title={`Meeting: ${meetings.find((m) => m.id === file.meetingId)?.name || ""}`}
//                     placement="right"
//                   >
//                     <ListItemButton
//                       onClick={() => handleNavigation(file.path)}
//                       sx={{
//                         borderRadius: 2,
//                         py: 1,
//                         px: 2,
//                         transition: "all 0.2s ease",
//                         "&:hover": {
//                           bgcolor: "rgba(16, 163, 127, 0.05)",
//                           transform: "translateX(4px)",
//                         },
//                       }}
//                     >
//                       <ListItemIcon sx={{ minWidth: 32 }}>{getFileIcon(file.fileType)}</ListItemIcon>
//                       <ListItemText
//                         primary={file.name}
//                         primaryTypographyProps={{
//                           variant: "body2",
//                           noWrap: true,
//                           fontWeight: 500,
//                         }}
//                       />
//                     </ListItemButton>
//                   </Tooltip>
//                 </ListItem>
//               </Fade>
//             ))}
//           </List>
//         ) : isLoggedIn ? (
//           <Box sx={{ textAlign: "center", py: 3, px: 2 }}>
//             <Typography variant="body2" color="text.secondary">
//               No recent files
//             </Typography>
//           </Box>
//         ) : (
//           <Box sx={{ textAlign: "center", py: 3, px: 2 }}>
//             <Typography variant="body2" color="text.secondary">
//               Sign in to see recent files
//             </Typography>
//           </Box>
//         )}
//       </Box>

//       <Box sx={{ p: 3, borderTop: "1px solid", borderColor: "divider" }}>
//         {isLoggedIn ? (
//           <Button
//             variant="contained"
//             fullWidth
//             startIcon={<AddIcon />}
//             onClick={() => handleNavigation("/add-meeting")}
//             sx={{
//               mb: 2,
//               borderRadius: 2,
//               background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
//               textTransform: "none",
//               fontWeight: 600,
//               "&:hover": {
//                 background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
//                 transform: "translateY(-1px)",
//               },
//               transition: "all 0.2s ease",
//             }}
//           >
//             New Meeting
//           </Button>
//         ) : null}

//         <ListItem disablePadding>
//           <ListItemButton
//             onClick={() => handleNavigation("/settings")}
//             sx={{
//               borderRadius: 2,
//               py: 1,
//               transition: "all 0.2s ease",
//               "&:hover": {
//                 bgcolor: "rgba(0, 0, 0, 0.04)",
//                 transform: "translateX(4px)",
//               },
//             }}
//           >
//             <ListItemIcon sx={{ minWidth: 40 }}>
//               <SettingsIcon />
//             </ListItemIcon>
//             <ListItemText primary="Settings" />
//           </ListItemButton>
//         </ListItem>
//       </Box>
//     </Box>
//   )

//   return (
//     <>
//       {/* Mobile menu button */}
//       {isMobile && (
//         <IconButton
//           color="inherit"
//           aria-label="open drawer"
//           edge="start"
//           onClick={handleDrawerToggle}
//           sx={{
//             display: { xs: "block", md: "none" },
//             position: "fixed",
//             top: 16,
//             left: 16,
//             zIndex: 1200,
//             bgcolor: "white",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//             "&:hover": {
//               bgcolor: "rgba(16, 163, 127, 0.1)",
//             },
//           }}
//         >
//           <MenuIcon />
//         </IconButton>
//       )}

//       {/* Mobile drawer */}
//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{
//           keepMounted: true,
//         }}
//         sx={{
//           display: { xs: "block", md: "none" },
//           "& .MuiDrawer-paper": {
//             boxSizing: "border-box",
//             width: 280,
//             border: "none",
//             boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
//           },
//           zIndex: 1300,
//         }}
//       >
//         {drawerContent}
//       </Drawer>

//       {/* Desktop drawer */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           display: { xs: "none", md: "block" },
//           width: 280,
//           flexShrink: 0,
//           position: "fixed",
//           zIndex: 1100,
//           height: "100%",
//           "& .MuiDrawer-paper": {
//             boxSizing: "border-box",
//             width: 280,
//             border: "none",
//             position: "fixed",
//             height: "100%",
//           },
//         }}
//         open
//       >
//         {drawerContent}
//       </Drawer>
//     </>
//   )
// }

// export default AppSidebar





"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  CircularProgress,
  Chip,
  Fade,
} from "@mui/material"
import {
  Home as HomeIcon,
  CalendarMonth as CalendarIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  Menu as MenuIcon,
  InsertDriveFile as FileIcon,
  PictureAsPdf as PdfIcon,
  Article as DocIcon,
  Image as ImageIcon,
  TextSnippet as TextIcon,
  Close as CloseIcon,
  Chat as ChatIcon,
} from "@mui/icons-material"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../store/store"
import { logout } from "../../store/authSlice"
import { fetchMeetingsByTeam } from "../../store/meetingSlice"
import { getCookie } from "../../services/meetingService"

const navItems = [
  { name: "Dashboard", path: "/", icon: <HomeIcon /> },
  { name: "Meetings", path: "/meetings", icon: <CalendarIcon /> },
  { name: "Chat", path: "/chat", icon: <ChatIcon /> },
]

interface RecentFile {
  name: string
  path: string
  meetingId: number
  fileType: string
  date: Date
}

interface AppSidebarProps {
  mobileOpen: boolean
  handleDrawerToggle: () => void
}

export function AppSidebar({ mobileOpen, handleDrawerToggle }: AppSidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { user } = useSelector((state: RootState) => state.auth)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [recentFiles, setRecentFiles] = useState<RecentFile[]>([])
  const [loadingFiles, setLoadingFiles] = useState(false)

  const meetings = useSelector((state: RootState) => state.meeting.list)

  useEffect(() => {
    const userData = sessionStorage.getItem("user")
    const token = getCookie("auth_token")
    setIsLoggedIn(!!(userData && token && user && user.userName))
  }, [user])

  useEffect(() => {
    if (isLoggedIn && user?.teamId) {
      setLoadingFiles(true)

      if (meetings.length === 0) {
        dispatch(fetchMeetingsByTeam({ teamId: user.teamId }))
          .unwrap()
          .then((fetchedMeetings) => {
            extractRecentFiles(fetchedMeetings)
          })
          .catch((error) => {
            console.error("Error fetching meetings:", error)
          })
          .finally(() => {
            setLoadingFiles(false)
          })
      } else {
        extractRecentFiles(meetings)
        setLoadingFiles(false)
      }
    }
  }, [isLoggedIn, user, meetings, dispatch])

  const extractRecentFiles = (meetingsData: any[]) => {
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

    const sortedFiles = files.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5)
    setRecentFiles(sortedFiles)
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    if (isMobile) {
      handleDrawerToggle()
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    sessionStorage.removeItem("user")
    handleClose()
    setIsLoggedIn(false)
    navigate("/")
  }

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/")
  }

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: 280,
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
          background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
          color: "white",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "rgba(255,255,255,0.2)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 2,
                background: "rgba(255,255,255,0.2)",
                mr: 2,
                backdropFilter: "blur(10px)",
              }}
            >
              <DescriptionIcon sx={{ color: "white", fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                MeetingFiles
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                v2.0
              </Typography>
            </Box>
          </Box>
          {isMobile && (
            <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* User Profile */}
      <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
        {isLoggedIn ? (
          <>
            <Box
              onClick={handleUserClick}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                p: 2,
                borderRadius: 2,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "rgba(16, 163, 127, 0.05)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                  fontWeight: 600,
                }}
              >
                {user?.userName ? user.userName.charAt(0).toUpperCase() : <PersonIcon />}
              </Avatar>
              <Box sx={{ overflow: "hidden", flexGrow: 1 }}>
                <Typography variant="body1" fontWeight={600} noWrap>
                  {user?.userName || "User"}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {user?.email || "Logged in"}
                </Typography>
              </Box>
              <Chip
                label="Pro"
                size="small"
                sx={{
                  background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  borderRadius: 2,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  border: "1px solid",
                  borderColor: "divider",
                },
              }}
            >
              <MenuItem onClick={handleLogout} sx={{ gap: 2 }}>
                <LogoutIcon fontSize="small" />
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Welcome! Please sign in to continue
            </Typography>
            <Button
              onClick={() => navigate("/login")}
              variant="contained"
              startIcon={<LoginIcon />}
              fullWidth
              sx={{
                borderRadius: 2,
                background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Sign In
            </Button>
          </Box>
        )}
      </Box>

      <List sx={{ px: 2, py: 1 }}>
     
         {navItems.map((item) => (
          <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={isActive(item.path)}
              sx={{
                borderRadius: 2,
                transition: "all 0.2s ease",
                "&.Mui-selected": {
                  background: "linear-gradient(135deg, rgba(16, 163, 127, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%)",
                  color: "#10a37f",
                  "&:hover": {
                    background: "linear-gradient(135deg, rgba(16, 163, 127, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%)",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "#10a37f",
                  },
                },
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 600 : 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      
      </List>
      

      <Box sx={{ flexGrow: 1, overflow: "auto", px: 2, py: 1 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "block",
            fontWeight: 600,
            px: 2,
            mb: 1,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Recent Files
        </Typography>

        {loadingFiles ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
            <CircularProgress size={24} sx={{ color: "#10a37f" }} />
          </Box>
        ) : recentFiles.length > 0 ? (
          <List dense disablePadding>
            {recentFiles.map((file, index) => (
              <Fade in key={`${file.meetingId}-${index}`} timeout={300 + index * 100}>
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <Tooltip
                    title={`Meeting: ${meetings.find((m) => m.id === file.meetingId)?.name || ""}`}
                    placement="right"
                  >
                    <ListItemButton
                      onClick={() => handleNavigation(file.path)}
                      sx={{
                        borderRadius: 2,
                        py: 1,
                        px: 2,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: "rgba(16, 163, 127, 0.05)",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>{getFileIcon(file.fileType)}</ListItemIcon>
                      <ListItemText
                        primary={file.name}
                        primaryTypographyProps={{
                          variant: "body2",
                          noWrap: true,
                          fontWeight: 500,
                        }}
                      />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              </Fade>
            ))}
          </List>
        ) : isLoggedIn ? (
          <Box sx={{ textAlign: "center", py: 3, px: 2 }}>
            <Typography variant="body2" color="text.secondary">
              No recent files
            </Typography>
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", py: 3, px: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Sign in to see recent files
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ p: 3, borderTop: "1px solid", borderColor: "divider" }}>
        {isLoggedIn ? (
          <Button
            variant="contained"
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => handleNavigation("/add-meeting")}
            sx={{
              mb: 2,
              borderRadius: 2,
              background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            New Meeting
          </Button>
        ) : null}

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation("/settings")}
            sx={{
              borderRadius: 2,
              py: 1,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.04)",
                transform: "translateX(4px)",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  )

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1200,
            bgcolor: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            "&:hover": {
              bgcolor: "rgba(16, 163, 127, 0.1)",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            border: "none",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          },
          zIndex: 1300,
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: 280,
          flexShrink: 0,
          position: "fixed",
          zIndex: 1100,
          height: "100%",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            border: "none",
            position: "fixed",
            height: "100%",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  )
}

export default AppSidebar
