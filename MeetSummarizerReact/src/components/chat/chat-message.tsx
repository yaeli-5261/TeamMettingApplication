// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import {
//   Box,
//   Paper,
//   TextField,
//   Button,
//   Typography,
//   Avatar,
//   IconButton,
//   Chip,
//   Alert,
//   CircularProgress,
// } from "@mui/material"
// import {
//   Send as SendIcon,
//   Clear as ClearIcon,
//   Chat as ChatIcon,
//   Person as PersonIcon,
//   Refresh as RefreshIcon,
// } from "@mui/icons-material"
// import { useSelector } from "react-redux"
// import type { RootState } from "../../store/store"
// import axios from "axios"

// interface ChatMessage {
//   id: number
//   userName: string
//   message: string
//   createdAt: string
//   teamId: number
// }

// interface ChatStats {
//   messageCount: number
//   activeUsers: number
// }

// export default function TeamChat() {
//   // Fix: Remove /api from the URL since it's already in VITE_API_URL
//   const apiUrl = import.meta.env.VITE_API_URL
//   const { user } = useSelector((state: RootState) => state.auth)

//   const [messages, setMessages] = useState<ChatMessage[]>([])
//   const [newMessage, setNewMessage] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [sending, setSending] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [stats, setStats] = useState<ChatStats>({ messageCount: 0, activeUsers: 0 })

//   const messagesEndRef = useRef<HTMLDivElement>(null)
//   const pollIntervalRef = useRef<NodeJS.Timeout | null>(null)

//   const teamId = user?.teamId || 1
//   const userName = user?.userName || "Anonymous"

//   // Scroll to bottom of messages
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   // Fetch messages from API
//   const fetchMessages = async () => {
//     try {
//       console.log(`Fetching messages from: ${apiUrl}/chat/messages/${teamId}`)
//       const response = await axios.get(`${apiUrl}/chat/messages/${teamId}`)
//       setMessages(response.data)
//       setError(null)
//     } catch (err: any) {
//       console.error("Error fetching messages:", err)
//       console.error("URL attempted:", `${apiUrl}/chat/messages/${teamId}`)
//       setError(`Failed to load messages: ${err.response?.status || err.message}`)
//     }
//   }

//   // Fetch chat statistics
//   const fetchStats = async () => {
//     try {
//       console.log(`Fetching stats from: ${apiUrl}/chat/stats/${teamId}`)
//       const response = await axios.get(`${apiUrl}/chat/stats/${teamId}`)
//       setStats(response.data)
//     } catch (err: any) {
//       console.error("Error fetching stats:", err)
//       console.error("URL attempted:", `${apiUrl}/chat/stats/${teamId}`)
//     }
//   }

//   // Send message
//   const sendMessage = async () => {
//     if (!newMessage.trim() || sending) return

//     setSending(true)
//     try {
//       const messageData = {
//         userName,
//         message: newMessage.trim(),
//         teamId,
//       }

//       console.log(`Sending message to: ${apiUrl}/chat/send`)
//       console.log("Message data:", messageData)

//       await axios.post(`${apiUrl}/chat/send`, messageData)
//       setNewMessage("")
//       setError(null)

//       // Immediately fetch new messages
//       await fetchMessages()
//       await fetchStats()
//     } catch (err: any) {
//       console.error("Error sending message:", err)
//       console.error("URL attempted:", `${apiUrl}/chat/send`)
//       setError(`Failed to send message: ${err.response?.status || err.message}`)
//     } finally {
//       setSending(false)
//     }
//   }

//   // Clear chat
//   const clearChat = async () => {
//     if (!window.confirm("Are you sure you want to clear all messages?")) return

//     try {
//       console.log(`Clearing chat: ${apiUrl}/chat/clear/${teamId}`)
//       await axios.delete(`${apiUrl}/chat/clear/${teamId}`)
//       setMessages([])
//       setStats({ messageCount: 0, activeUsers: 0 })
//       setError(null)
//     } catch (err: any) {
//       console.error("Error clearing chat:", err)
//       console.error("URL attempted:", `${apiUrl}/chat/clear/${teamId}`)
//       setError(`Failed to clear chat: ${err.response?.status || err.message}`)
//     }
//   }

//   // Handle Enter key press
//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault()
//       sendMessage()
//     }
//   }

//   // Format timestamp
//   const formatTime = (timestamp: string) => {
//     const date = new Date(timestamp)
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false,
//     })
//   }

//   // Get user color based on name
//   const getUserColor = (name: string) => {
//     const colors = ["#10a37f", "#0ea5e9", "#8b5cf6", "#f59e0b", "#ef4444", "#06b6d4", "#84cc16", "#f97316"]
//     const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
//     return colors[index % colors.length]
//   }

//   // Initialize and start polling
//   useEffect(() => {
//     console.log("API URL:", apiUrl)
//     console.log("Team ID:", teamId)
//     console.log("User Name:", userName)

//     setLoading(true)

//     // Initial load
//     Promise.all([fetchMessages(), fetchStats()]).finally(() => {
//       setLoading(false)
//     })

//     // Start polling every 3 seconds (increased from 2 to reduce server load)
//     pollIntervalRef.current = setInterval(() => {
//       fetchMessages()
//       fetchStats()
//     }, 3000)

//     return () => {
//       if (pollIntervalRef.current) {
//         clearInterval(pollIntervalRef.current)
//       }
//     }
//   }, [teamId])

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         p: 2,
//         direction: "rtl",
//         textAlign: "right",
//       }}
//     >
//       {/* Header */}
//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: 1,
//           background: "rgba(255, 255, 255, 0.9)",
//           border: "1px solid rgba(255, 255, 255, 0.2)",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
//           mb: 2,
//           height: "80px",
//           flexShrink: 0,
//         }}
//       >
//         <Box sx={{ p: 2, height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Avatar
//               sx={{
//                 background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
//                 width: 40,
//                 height: 40,
//                 mr: 2,
//               }}
//             >
//               <ChatIcon sx={{ fontSize: 20 }} />
//             </Avatar>
//             <Box>
//               <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1rem" }}>
//                 Team Chat
//               </Typography>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
//                 {stats.messageCount} messages • {stats.activeUsers} active users
//               </Typography>
//             </Box>
//           </Box>

//           <Box sx={{ display: "flex", gap: 1 }}>
//             <IconButton
//               size="small"
//               onClick={() => {
//                 fetchMessages()
//                 fetchStats()
//               }}
//               sx={{ color: "text.secondary" }}
//             >
//               <RefreshIcon sx={{ fontSize: 16 }} />
//             </IconButton>
//             <IconButton size="small" onClick={clearChat} sx={{ color: "error.main" }}>
//               <ClearIcon sx={{ fontSize: 16 }} />
//             </IconButton>
//           </Box>
//         </Box>
//       </Paper>

//       {/* Debug Info */}
//       {process.env.NODE_ENV === "development" && (
//         <Alert severity="info" sx={{ mb: 2, fontSize: "0.7rem" }}>
//           API: {apiUrl} | Team: {teamId} | User: {userName}
//         </Alert>
//       )}

//       {/* Messages Area */}
//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: 1,
//           background: "rgba(255, 255, 255, 0.9)",
//           border: "1px solid rgba(255, 255, 255, 0.2)",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
//           flexGrow: 1,
//           display: "flex",
//           flexDirection: "column",
//           overflow: "hidden",
//           mb: 2,
//         }}
//       >
//         {/* Messages List */}
//         <Box
//           sx={{
//             flexGrow: 1,
//             overflow: "auto",
//             p: 2,
//             display: "flex",
//             flexDirection: "column",
//             gap: 1,
//           }}
//         >
//           {loading ? (
//             <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
//               <CircularProgress size={24} sx={{ color: "#10a37f" }} />
//             </Box>
//           ) : error ? (
//             <Alert severity="error" sx={{ borderRadius: 1, fontSize: "0.75rem" }}>
//               {error}
//               <Button
//                 size="small"
//                 onClick={() => {
//                   setError(null)
//                   fetchMessages()
//                   fetchStats()
//                 }}
//                 sx={{ mt: 1, fontSize: "0.7rem" }}
//               >
//                 Retry
//               </Button>
//             </Alert>
//           ) : messages.length === 0 ? (
//             <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
//               <ChatIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
//               <Typography variant="body1" sx={{ fontSize: "0.875rem" }}>
//                 No messages yet
//               </Typography>
//               <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>
//                 Start the conversation!
//               </Typography>
//             </Box>
//           ) : (
//             messages.map((message) => (
//               <Box
//                 key={message.id}
//                 sx={{
//                   display: "flex",
//                   alignItems: "flex-start",
//                   gap: 1.5,
//                   p: 1.5,
//                   borderRadius: 1,
//                   transition: "background-color 0.2s ease",
//                   "&:hover": {
//                     backgroundColor: "rgba(0, 0, 0, 0.02)",
//                   },
//                 }}
//               >
//                 <Avatar
//                   sx={{
//                     width: 32,
//                     height: 32,
//                     backgroundColor: getUserColor(message.userName),
//                     fontSize: "0.75rem",
//                     fontWeight: 600,
//                   }}
//                 >
//                   {message.userName.charAt(0).toUpperCase()}
//                 </Avatar>

//                 <Box sx={{ flexGrow: 1, minWidth: 0 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
//                     <Typography
//                       variant="subtitle2"
//                       fontWeight={600}
//                       sx={{
//                         fontSize: "0.8rem",
//                         color: getUserColor(message.userName),
//                       }}
//                     >
//                       {message.userName}
//                     </Typography>
//                     {message.userName === userName && (
//                       <Chip
//                         label="You"
//                         size="small"
//                         sx={{
//                           height: 16,
//                           fontSize: "0.65rem",
//                           backgroundColor: "rgba(16, 163, 127, 0.1)",
//                           color: "#10a37f",
//                         }}
//                       />
//                     )}
//                     <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem", ml: "auto" }}>
//                       {formatTime(message.createdAt)}
//                     </Typography>
//                   </Box>

//                   <Typography
//                     variant="body2"
//                     sx={{
//                       fontSize: "0.8rem",
//                       lineHeight: 1.4,
//                       wordBreak: "break-word",
//                       whiteSpace: "pre-wrap",
//                     }}
//                   >
//                     {message.message}
//                   </Typography>
//                 </Box>
//               </Box>
//             ))
//           )}
//           <div ref={messagesEndRef} />
//         </Box>
//       </Paper>

//       {/* Message Input */}
//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: 1,
//           background: "rgba(255, 255, 255, 0.9)",
//           border: "1px solid rgba(255, 255, 255, 0.2)",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
//           p: 2,
//           height: "80px",
//           flexShrink: 0,
//         }}
//       >
//         <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end", height: "100%" }}>
//           <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
//             <PersonIcon sx={{ fontSize: 16, color: "text.secondary", mr: 0.5 }} />
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
//               {userName}
//             </Typography>
//           </Box>

//           <TextField
//             fullWidth
//             multiline
//             maxRows={2}
//             placeholder="Type your message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             disabled={sending}
//             size="small"
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: 1,
//                 fontSize: "0.8rem",
//                 backgroundColor: "white",
//               },
//             }}
//           />

//           <Button
//             variant="contained"
//             onClick={sendMessage}
//             disabled={!newMessage.trim() || sending}
//             sx={{
//               minWidth: 48,
//               height: 40,
//               borderRadius: 1,
//               background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
//               "&:hover": {
//                 background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
//               },
//               "&:disabled": {
//                 background: "rgba(0,0,0,0.12)",
//               },
//             }}
//           >
//             {sending ? <CircularProgress size={16} color="inherit" /> : <SendIcon sx={{ fontSize: 16 }} />}
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   )
// }








"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
  Alert,
  CircularProgress,
  InputAdornment,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Fade,
  useTheme,
} from "@mui/material"
import {
  Send as SendIcon,
  Clear as ClearIcon,
  Chat as ChatIcon,
  Person as PersonIcon,
  Refresh as RefreshIcon,
  EmojiEmotions as EmojiIcon,
  AttachFile as AttachIcon,
  Search as SearchIcon,
  MoreVert as MoreIcon,
  Phone as PhoneIcon,
  VideoCall as VideoIcon,
  Info as InfoIcon,
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatUnderlined as UnderlineIcon,
  Link as LinkIcon,
} from "@mui/icons-material"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import axios from "axios"

interface ChatMessage {
  id: number
  userName: string
  message: string
  createdAt: string
  teamId: number
}

interface ChatStats {
  messageCount: number
  activeUsers: number
}

const EMOJI_LIST = [
  "😀",
  "😂",
  "😍",
  "🤔",
  "👍",
  "👎",
  "❤️",
  "🎉",
  "🔥",
  "💯",
  "😎",
  "🤝",
  "👏",
  "🙌",
  "💪",
  "✨",
  "🚀",
  "💡",
  "📝",
  "✅",
  "❌",
  "⚡",
  "🌟",
  "🎯",
  "📊",
  "💼",
  "🏆",
  "🎊",
  "🤩",
  "😊",
]

export default function TeamChat() {
  const theme = useTheme()
  const apiUrl = import.meta.env.VITE_API_URL
  const { user } = useSelector((state: RootState) => state.auth)

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<ChatStats>({ messageCount: 0, activeUsers: 0 })
  const [searchTerm, setSearchTerm] = useState("")
  const [emojiAnchor, setEmojiAnchor] = useState<null | HTMLElement>(null)
  const [formatAnchor, setFormatAnchor] = useState<null | HTMLElement>(null)
  const [moreAnchor, setMoreAnchor] = useState<null | HTMLElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const teamId = user?.teamId || 1
  const userName = user?.userName || "Anonymous"

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Fetch messages from API
  const fetchMessages = async () => {
    try {
      console.log(`Fetching messages from: ${apiUrl}/chat/messages/${teamId}`)
      const response = await axios.get(`${apiUrl}/chat/messages/${teamId}`)
      setMessages(response.data)
      setError(null)
    } catch (err: any) {
      console.error("Error fetching messages:", err)
      console.error("URL attempted:", `${apiUrl}/chat/messages/${teamId}`)
      setError(`Failed to load messages: ${err.response?.status || err.message}`)
    }
  }

  // Fetch chat statistics
  const fetchStats = async () => {
    try {
      console.log(`Fetching stats from: ${apiUrl}/chat/stats/${teamId}`)
      const response = await axios.get(`${apiUrl}/chat/stats/${teamId}`)
      setStats(response.data)
    } catch (err: any) {
      console.error("Error fetching stats:", err)
      console.error("URL attempted:", `${apiUrl}/chat/stats/${teamId}`)
    }
  }

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return

    setSending(true)
    setIsTyping(true)

    try {
      const messageData = {
        userName,
        message: newMessage.trim(),
        teamId,
      }

      console.log(`Sending message to: ${apiUrl}/chat/send`)
      console.log("Message data:", messageData)

      await axios.post(`${apiUrl}/chat/send`, messageData)
      setNewMessage("")
      setError(null)

      // Immediately fetch new messages
      await fetchMessages()
      await fetchStats()
    } catch (err: any) {
      console.error("Error sending message:", err)
      console.error("URL attempted:", `${apiUrl}/chat/send`)
      setError(`Failed to send message: ${err.response?.status || err.message}`)
    } finally {
      setSending(false)
      setIsTyping(false)
    }
  }

  // Clear chat
  const clearChat = async () => {
    if (!window.confirm("Are you sure you want to clear all messages?")) return

    try {
      console.log(`Clearing chat: ${apiUrl}/chat/clear/${teamId}`)
      await axios.delete(`${apiUrl}/chat/clear/${teamId}`)
      setMessages([])
      setStats({ messageCount: 0, activeUsers: 0 })
      setError(null)
      setMoreAnchor(null)
    } catch (err: any) {
      console.error("Error clearing chat:", err)
      console.error("URL attempted:", `${apiUrl}/chat/clear/${teamId}`)
      setError(`Failed to clear chat: ${err.response?.status || err.message}`)
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    if (messageDate.getTime() === today.getTime()) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
  }

  // Get user color based on name
  const getUserColor = (name: string) => {
    const colors = [
      "#1a73e8",
      "#34a853",
      "#ea4335",
      "#fbbc04",
      "#9aa0a6",
      "#ff6d01",
      "#9c27b0",
      "#00acc1",
      "#689f38",
      "#ff5722",
    ]
    const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[index % colors.length]
  }

  // Handle emoji click
  const handleEmojiClick = (emoji: string) => {
    setNewMessage((prev) => prev + emoji)
    setEmojiAnchor(null)
    inputRef.current?.focus()
  }

  // Filter messages based on search
  const filteredMessages = messages.filter(
    (message) =>
      message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.userName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Initialize and start polling
  useEffect(() => {
    console.log("API URL:", apiUrl)
    console.log("Team ID:", teamId)
    console.log("User Name:", userName)

    setLoading(true)

    // Initial load
    Promise.all([fetchMessages(), fetchStats()]).finally(() => {
      setLoading(false)
    })

    // Start polling every 3 seconds
    pollIntervalRef.current = setInterval(() => {
      fetchMessages()
      fetchStats()
    }, 3000)

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }
    }
  }, [teamId])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f8f9fa",
        fontFamily: "'Google Sans', 'Roboto', sans-serif",
      }}
    >
      {/* Gmail-style Header */}
      <Paper
        elevation={0}
        sx={{
          borderBottom: "1px solid #e8eaed",
          bgcolor: "white",
          zIndex: 1,
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Badge
              badgeContent={stats.activeUsers}
              color="success"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#34a853",
                  color: "white",
                  fontSize: "0.75rem",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#1a73e8",
                }}
              >
                <ChatIcon />
              </Avatar>
            </Badge>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 500, color: "#202124", fontSize: "1.375rem" }}>
                Team Chat
              </Typography>
              <Typography variant="body2" sx={{ color: "#5f6368", fontSize: "0.875rem" }}>
                {stats.messageCount} messages • {stats.activeUsers} online
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              size="small"
              placeholder="Search messages"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: 240,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "24px",
                  bgcolor: "#f1f3f4",
                  border: "none",
                  "&:hover": {
                    bgcolor: "#e8eaed",
                  },
                  "&.Mui-focused": {
                    bgcolor: "white",
                    boxShadow: "0 1px 6px rgba(32,33,36,.28)",
                  },
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#5f6368", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <Tooltip title="More options">
              <IconButton sx={{ color: "#5f6368" }} onClick={(e) => setMoreAnchor(e.currentTarget)}>
                <MoreIcon />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={moreAnchor}
              open={Boolean(moreAnchor)}
              onClose={() => setMoreAnchor(null)}
              PaperProps={{
                sx: {
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  border: "1px solid #e8eaed",
                  minWidth: 200,
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  fetchMessages()
                  fetchStats()
                  setMoreAnchor(null)
                }}
              >
                <RefreshIcon sx={{ mr: 2, fontSize: 20 }} />
                Refresh
              </MenuItem>
              <Divider />
              <MenuItem onClick={clearChat} sx={{ color: "#d93025" }}>
                <ClearIcon sx={{ mr: 2, fontSize: 20 }} />
                Clear chat
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Paper>

      {/* Debug Info */}
      {process.env.NODE_ENV === "development" && (
        <Alert severity="info" sx={{ m: 2, borderRadius: "8px" }}>
          API: {apiUrl} | Team: {teamId} | User: {userName}
        </Alert>
      )}

      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          bgcolor: "white",
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23f8f9fa" fillOpacity="0.4"%3E%3Cpath d="M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0-20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z"/%3E%3C/g%3E%3C/svg%3E")',
        }}
      >
        <Box sx={{ maxWidth: "800px", mx: "auto", p: 2 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress sx={{ color: "#1a73e8" }} />
            </Box>
          ) : error ? (
            <Alert
              severity="error"
              sx={{
                borderRadius: "8px",
                border: "1px solid #fce8e6",
                bgcolor: "#fef7f0",
              }}
              action={
                <Button
                  size="small"
                  onClick={() => {
                    setError(null)
                    fetchMessages()
                    fetchStats()
                  }}
                  sx={{ color: "#d93025" }}
                >
                  Retry
                </Button>
              }
            >
              {error}
            </Alert>
          ) : filteredMessages.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8, color: "#5f6368" }}>
              <ChatIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 400 }}>
                {searchTerm ? "No messages found" : "No messages yet"}
              </Typography>
              <Typography variant="body2">
                {searchTerm ? "Try a different search term" : "Start the conversation!"}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {filteredMessages.map((message, index) => {
                const isOwn = message.userName === userName
                const showAvatar = index === 0 || filteredMessages[index - 1].userName !== message.userName
                const showTime =
                  index === filteredMessages.length - 1 ||
                  filteredMessages[index + 1].userName !== message.userName ||
                  new Date(filteredMessages[index + 1].createdAt).getTime() - new Date(message.createdAt).getTime() >
                    300000

                return (
                  <Fade in timeout={300} key={message.id}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 1,
                        mb: showTime ? 2 : 0.5,
                        flexDirection: isOwn ? "row-reverse" : "row",
                      }}
                    >
                      {!isOwn && (
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: getUserColor(message.userName),
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            visibility: showAvatar ? "visible" : "hidden",
                          }}
                        >
                          {message.userName.charAt(0).toUpperCase()}
                        </Avatar>
                      )}

                      <Box sx={{ maxWidth: "70%", minWidth: 0 }}>
                        {!isOwn && showAvatar && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: getUserColor(message.userName),
                              fontWeight: 500,
                              ml: 1,
                              fontSize: "0.75rem",
                            }}
                          >
                            {message.userName}
                          </Typography>
                        )}

                        <Paper
                          elevation={0}
                          sx={{
                            p: 1.5,
                            borderRadius: isOwn ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                            bgcolor: isOwn ? "#1a73e8" : "white",
                            color: isOwn ? "white" : "#202124",
                            border: isOwn ? "none" : "1px solid #e8eaed",
                            maxWidth: "100%",
                            wordBreak: "break-word",
                            position: "relative",
                            "&:hover": {
                              boxShadow: isOwn ? "0 1px 3px rgba(26,115,232,0.3)" : "0 1px 3px rgba(0,0,0,0.1)",
                            },
                            transition: "box-shadow 0.2s ease",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.875rem",
                              lineHeight: 1.4,
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {message.message}
                          </Typography>

                          {showTime && (
                            <Typography
                              variant="caption"
                              sx={{
                                display: "block",
                                textAlign: isOwn ? "left" : "right",
                                mt: 0.5,
                                opacity: 0.7,
                                fontSize: "0.75rem",
                              }}
                            >
                              {formatTime(message.createdAt)}
                            </Typography>
                          )}
                        </Paper>
                      </Box>

                      {isOwn && (
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: "#1a73e8",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            visibility: showAvatar ? "visible" : "hidden",
                          }}
                        >
                          {userName.charAt(0).toUpperCase()}
                        </Avatar>
                      )}
                    </Box>
                  </Fade>
                )
              })}

              {isTyping && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: "#5f6368" }}>
                    <PersonIcon sx={{ fontSize: 16 }} />
                  </Avatar>
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: "18px 18px 18px 4px",
                      bgcolor: "white",
                      border: "1px solid #e8eaed",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      {[0, 1, 2].map((i) => (
                        <Box
                          key={i}
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: "#5f6368",
                            animation: "pulse 1.4s ease-in-out infinite",
                            animationDelay: `${i * 0.2}s`,
                            "@keyframes pulse": {
                              "0%, 80%, 100%": { opacity: 0.3 },
                              "40%": { opacity: 1 },
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Paper>
                </Box>
              )}

              <div ref={messagesEndRef} />
            </Box>
          )}
        </Box>
      </Box>

      {/* Gmail-style Input Area */}
      <Paper
        elevation={0}
        sx={{
          borderTop: "1px solid #e8eaed",
          bgcolor: "white",
          p: 2,
        }}
      >
        <Box sx={{ maxWidth: "800px", mx: "auto" }}>
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                ref={inputRef}
                fullWidth
                multiline
                maxRows={4}
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={sending}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "24px",
                    bgcolor: "#f8f9fa",
                    border: "1px solid #e8eaed",
                    "&:hover": {
                      bgcolor: "#f1f3f4",
                      borderColor: "#dadce0",
                    },
                    "&.Mui-focused": {
                      bgcolor: "white",
                      borderColor: "#1a73e8",
                      boxShadow: "0 1px 6px rgba(32,33,36,.28)",
                    },
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Tooltip title="Insert emoji">
                          <IconButton
                            size="small"
                            onClick={(e) => setEmojiAnchor(e.currentTarget)}
                            sx={{ color: "#5f6368" }}
                          >
                            <EmojiIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Attach file">
                          <IconButton size="small" sx={{ color: "#5f6368" }}>
                            <AttachIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Format text">
                          <IconButton
                            size="small"
                            onClick={(e) => setFormatAnchor(e.currentTarget)}
                            sx={{ color: "#5f6368" }}
                          >
                            <BoldIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Tooltip title="Send message">
              <span>
                <IconButton
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || sending}
                  sx={{
                    bgcolor: newMessage.trim() ? "#1a73e8" : "#f8f9fa",
                    color: newMessage.trim() ? "white" : "#5f6368",
                    width: 48,
                    height: 48,
                    "&:hover": {
                      bgcolor: newMessage.trim() ? "#1557b0" : "#f1f3f4",
                    },
                    "&:disabled": {
                      bgcolor: "#f8f9fa",
                      color: "#5f6368",
                    },
                  }}
                >
                  {sending ? <CircularProgress size={20} sx={{ color: "inherit" }} /> : <SendIcon />}
                </IconButton>
              </span>
            </Tooltip>
          </Box>

          {/* Emoji Picker */}
          <Menu
            anchorEl={emojiAnchor}
            open={Boolean(emojiAnchor)}
            onClose={() => setEmojiAnchor(null)}
            PaperProps={{
              sx: {
                borderRadius: "12px",
                p: 2,
                maxWidth: 320,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                border: "1px solid #e8eaed",
              },
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1, color: "#5f6368" }}>
              Choose an emoji
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 0.5 }}>
              {EMOJI_LIST.map((emoji) => (
                <IconButton
                  key={emoji}
                  onClick={() => handleEmojiClick(emoji)}
                  sx={{
                    fontSize: "1.25rem",
                    width: 32,
                    height: 32,
                    "&:hover": {
                      bgcolor: "#f8f9fa",
                      transform: "scale(1.2)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {emoji}
                </IconButton>
              ))}
            </Box>
          </Menu>

          {/* Format Menu */}
          <Menu
            anchorEl={formatAnchor}
            open={Boolean(formatAnchor)}
            onClose={() => setFormatAnchor(null)}
            PaperProps={{
              sx: {
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                border: "1px solid #e8eaed",
              },
            }}
          >
            <MenuItem onClick={() => setFormatAnchor(null)}>
              <BoldIcon sx={{ mr: 2 }} />
              Bold
            </MenuItem>
            <MenuItem onClick={() => setFormatAnchor(null)}>
              <ItalicIcon sx={{ mr: 2 }} />
              Italic
            </MenuItem>
            <MenuItem onClick={() => setFormatAnchor(null)}>
              <UnderlineIcon sx={{ mr: 2 }} />
              Underline
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => setFormatAnchor(null)}>
              <LinkIcon sx={{ mr: 2 }} />
              Insert link
            </MenuItem>
          </Menu>
        </Box>
      </Paper>
    </Box>
  )
}
