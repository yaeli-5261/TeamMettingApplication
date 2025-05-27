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
  Chip,
  Alert,
  CircularProgress,
} from "@mui/material"
import {
  Send as SendIcon,
  Clear as ClearIcon,
  Chat as ChatIcon,
  Person as PersonIcon,
  Refresh as RefreshIcon,
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

export default function TeamChat() {
  const apiUrl = import.meta.env.VITE_API_URL
  const { user } = useSelector((state: RootState) => state.auth)

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<ChatStats>({ messageCount: 0, activeUsers: 0 })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const teamId = user?.teamId || 1
  const userName = user?.userName || "Anonymous"

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Fetch messages from API
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/chat/messages/${teamId}`)
      setMessages(response.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching messages:", err)
      setError("Failed to load messages")
    }
  }

  // Fetch chat statistics
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/chat/stats/${teamId}`)
      setStats(response.data)
    } catch (err) {
      console.error("Error fetching stats:", err)
    }
  }

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return

    setSending(true)
    try {
      const messageData = {
        userName,
        message: newMessage.trim(),
        teamId,
      }

      await axios.post(`${apiUrl}/api/chat/send`, messageData)
      setNewMessage("")
      setError(null)

      // Immediately fetch new messages
      await fetchMessages()
      await fetchStats()
    } catch (err) {
      console.error("Error sending message:", err)
      setError("Failed to send message")
    } finally {
      setSending(false)
    }
  }

  // Clear chat
  const clearChat = async () => {
    if (!window.confirm("Are you sure you want to clear all messages?")) return

    try {
      await axios.delete(`${apiUrl}/api/chat/clear/${teamId}`)
      setMessages([])
      setStats({ messageCount: 0, activeUsers: 0 })
      setError(null)
    } catch (err) {
      console.error("Error clearing chat:", err)
      setError("Failed to clear chat")
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
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  // Get user color based on name
  const getUserColor = (name: string) => {
    const colors = ["#10a37f", "#0ea5e9", "#8b5cf6", "#f59e0b", "#ef4444", "#06b6d4", "#84cc16", "#f97316"]
    const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[index % colors.length]
  }

  // Initialize and start polling
  useEffect(() => {
    setLoading(true)

    // Initial load
    Promise.all([fetchMessages(), fetchStats()]).finally(() => {
      setLoading(false)
    })

    // Start polling every 2 seconds
    pollIntervalRef.current = setInterval(() => {
      fetchMessages()
      fetchStats()
    }, 2000)

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
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        p: 2,
        direction: "rtl",
        textAlign: "right",
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 1,
          background: "rgba(255, 255, 255, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          mb: 2,
          height: "80px",
          flexShrink: 0,
        }}
      >
        <Box sx={{ p: 2, height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                width: 40,
                height: 40,
                mr: 2,
              }}
            >
              <ChatIcon sx={{ fontSize: 20 }} />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1rem" }}>
                Team Chat
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                {stats.messageCount} messages • {stats.activeUsers} active users
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => {
                fetchMessages()
                fetchStats()
              }}
              sx={{ color: "text.secondary" }}
            >
              <RefreshIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton size="small" onClick={clearChat} sx={{ color: "error.main" }}>
              <ClearIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* Messages Area */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 1,
          background: "rgba(255, 255, 255, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          mb: 2,
        }}
      >
        {/* Messages List */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={24} sx={{ color: "#10a37f" }} />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ borderRadius: 1, fontSize: "0.75rem" }}>
              {error}
            </Alert>
          ) : messages.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
              <ChatIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
              <Typography variant="body1" sx={{ fontSize: "0.875rem" }}>
                No messages yet
              </Typography>
              <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>
                Start the conversation!
              </Typography>
            </Box>
          ) : (
            messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 1,
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: getUserColor(message.userName),
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {message.userName.charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      sx={{
                        fontSize: "0.8rem",
                        color: getUserColor(message.userName),
                      }}
                    >
                      {message.userName}
                    </Typography>
                    {message.userName === userName && (
                      <Chip
                        label="You"
                        size="small"
                        sx={{
                          height: 16,
                          fontSize: "0.65rem",
                          backgroundColor: "rgba(16, 163, 127, 0.1)",
                          color: "#10a37f",
                        }}
                      />
                    )}
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem", ml: "auto" }}>
                      {formatTime(message.createdAt)}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.8rem",
                      lineHeight: 1.4,
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {message.message}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
          <div ref={messagesEndRef} />
        </Box>
      </Paper>

      {/* Message Input */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 1,
          background: "rgba(255, 255, 255, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          p: 2,
          height: "80px",
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end", height: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
            <PersonIcon sx={{ fontSize: 16, color: "text.secondary", mr: 0.5 }} />
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
              {userName}
            </Typography>
          </Box>

          <TextField
            fullWidth
            multiline
            maxRows={2}
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={sending}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                fontSize: "0.8rem",
                backgroundColor: "white",
              },
            }}
          />

          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={!newMessage.trim() || sending}
            sx={{
              minWidth: 48,
              height: 40,
              borderRadius: 1,
              background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
              },
              "&:disabled": {
                background: "rgba(0,0,0,0.12)",
              },
            }}
          >
            {sending ? <CircularProgress size={16} color="inherit" /> : <SendIcon sx={{ fontSize: 16 }} />}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
