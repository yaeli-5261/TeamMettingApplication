"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  InputAdornment,
  Fade,
  Autocomplete,
} from "@mui/material"
import { Send, Mail, CheckCircle, Users } from "lucide-react"
import type { RootState } from "../../store/store"

interface FileShareProps {
  fileUrl: string
  fileName: string
}

interface UserRole {
  id: number
  roleName: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

interface SharedUser {
  id: number
  userName: string
  email: string
  firstName?: string
  lastName?: string
  role?: UserRole | string
}

const FileShare = ({ fileUrl, fileName }: FileShareProps) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [selectedUser, setSelectedUser] = useState<SharedUser | null>(null)
  const [allUsers, setAllUsers] = useState<SharedUser[]>([])
  const [filteredUsers, setFilteredUsers] = useState<SharedUser[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)
  const [customSubject, setCustomSubject] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Get current user info for the email signature
  const currentUser = useSelector((state: RootState) => state.auth.user)

  // Function to get auth token
  const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split("; ")
    for (const cookie of cookies) {
      const [key, value] = cookie.split("=")
      if (key === name) {
        return decodeURIComponent(value)
      }
    }
    return null
  }

  // Helper function to get role name safely
  const getRoleName = (role: UserRole | string | undefined): string => {
    if (!role) return ""
    if (typeof role === "string") return role
    if (typeof role === "object" && role.roleName) return role.roleName
    return ""
  }

  // Load all users when component mounts
  useEffect(() => {
    loadAllUsers()
  }, [])

  // Filter users based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(allUsers)
    } else {
      const filtered = allUsers.filter((user) => {
        const searchLower = searchTerm.toLowerCase()
        return (
          user.userName?.toLowerCase().includes(searchLower) ||
          user.email?.toLowerCase().includes(searchLower) ||
          user.firstName?.toLowerCase().includes(searchLower) ||
          user.lastName?.toLowerCase().includes(searchLower) ||
          getRoleName(user.role).toLowerCase().includes(searchLower)
        )
      })
      setFilteredUsers(filtered)
    }
  }, [searchTerm, allUsers])

  const loadAllUsers = async () => {
    setLoadingUsers(true)
    setMessage(null)

    try {
      const token = getCookie("auth_token")
      console.log("🔄 Loading all users from API...")

      const response = await axios.get(`${apiUrl}/User/Admin`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      console.log("✅ Raw API response:", response.data)

      // Validate response data
      if (!Array.isArray(response.data)) {
        throw new Error("API response is not an array")
      }

      // Filter users that have email addresses and clean the data
      const usersWithEmail = response.data
        .filter((user: any) => {
          // Check if user has required fields
          return user && user.email && user.email.trim() !== "" && user.id && user.userName
        })
        .map((user: any) => ({
          id: user.id,
          userName: user.userName || "",
          email: user.email || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          role: user.role, // Keep as is, will handle in getRoleName
        }))

      console.log("✅ Processed users:", usersWithEmail)

      setAllUsers(usersWithEmail)
      setFilteredUsers(usersWithEmail)

      if (usersWithEmail.length === 0) {
        setMessage({
          text: "No users with email addresses found in the system",
          type: "error",
        })
      }
    } catch (error: any) {
      console.error("❌ Error loading users:", error)
      setMessage({
        text: `Error loading user list: ${error.response?.data?.message || error.message}`,
        type: "error",
      })
      // Set empty arrays to prevent further errors
      setAllUsers([])
      setFilteredUsers([])
    } finally {
      setLoadingUsers(false)
    }
  }

  const handleSendEmail = async () => {
    if (!selectedUser) {
      setMessage({
        text: "Please select a user from the list",
        type: "error",
      })
      return
    }

    if (!selectedUser.email) {
      setMessage({
        text: "The selected user does not have an email address",
        type: "error",
      })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const token = getCookie("auth_token")

      // קבלת URL תקין להורדה לפני שליחת האימייל
      let validDownloadUrl = fileUrl

      // אם זה לא URL מלא, קבל presigned URL
      if (!fileUrl.startsWith("http")) {
        console.log("🔄 Getting presigned URL for email sharing:", fileUrl)

        try {
          const downloadResponse = await axios.get(`${apiUrl}/upload/download-url`, {
            params: { fileName: fileUrl },
            headers: { Authorization: `Bearer ${token}` },
          })

          validDownloadUrl = downloadResponse.data.downloadUrl || downloadResponse.data.url
          console.log("✅ Got valid download URL for email:", validDownloadUrl)
        } catch (urlError) {
          console.error("❌ Error getting download URL:", urlError)
          setMessage({
            text: "שגיאה בקבלת קישור הורדה תקין",
            type: "error",
          })
          setLoading(false)
          return
        }
      }

      // וידוא שיש לנו URL תקין
      if (!validDownloadUrl || !validDownloadUrl.startsWith("http")) {
        setMessage({
          text: "לא ניתן לקבל קישור הורדה תקין",
          type: "error",
        })
        setLoading(false)
        return
      }

      const subject = customSubject || `File sharing: ${fileName}`

      const emailBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
    <h2 style="color: white; margin: 0; text-align: center;">📎 שיתוף קובץ</h2>
  </div>
  
  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
    <h3 style="color: #333; margin-top: 0;">שלום ${selectedUser.firstName || selectedUser.userName},</h3>
    <p style="color: #666; line-height: 1.6;">
      ${currentUser?.userName || "משתמש"} שיתף איתך קובץ חשוב:
    </p>
    
    <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #10a37f; margin: 15px 0;">
      <h4 style="margin: 0 0 10px 0; color: #10a37f;">📄 ${fileName}</h4>
      <p style="margin: 0 0 15px 0; color: #666;">
        <strong>להורדה ישירה למחשב:</strong>
      </p>
      <div style="text-align: center;">
        <a href="${validDownloadUrl}" 
           style="display: inline-block; background: linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin: 10px 0;"
           download="${fileName}">
          📥 הורד קובץ
        </a>
      </div>
      <p style="margin: 10px 0 0 0; color: #999; font-size: 12px; text-align: center;">
        לחץ על הכפתור להורדה ישירה למחשב
      </p>
      
      <div style="background: #f0f0f0; padding: 10px; border-radius: 6px; margin-top: 15px;">
        <p style="margin: 0; color: #666; font-size: 11px; word-break: break-all;">
          <strong>קישור ישיר:</strong><br>
          <a href="${validDownloadUrl}" style="color: #10a37f;">${validDownloadUrl}</a>
        </p>
      </div>
    </div>
    
    <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0;">
      <p style="margin: 0; color: #1976d2; font-size: 14px;">
        💡 <strong>טיפ:</strong> הקובץ יורד ישירות למחשב שלך בלחיצה על הכפתור הכחול.
      </p>
    </div>
  </div>
  
  <div style="text-align: center; padding: 20px; border-top: 1px solid #eee;">
    <p style="color: #999; font-size: 12px; margin: 0;">
      נשלח מ-Meeting Manager | ${new Date().toLocaleDateString("he-IL")}
    </p>
  </div>
</div>
`

      console.log(`📧 Sending email to user ID: ${selectedUser.id}`)
      console.log("📧 Using download URL:", validDownloadUrl)

      const response = await axios.post(
        `${apiUrl}/Email/send-to-user/${selectedUser.id}`,
        {
          email: selectedUser.email,
          Subject: subject,
          Body: emailBody,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      console.log("✅ Email sent successfully:", response.data)
      setMessage({
        text: `הקובץ נשלח בהצלחה ל-${selectedUser.firstName || selectedUser.userName} (${selectedUser.email})!`,
        type: "success",
      })

      // Reset form
      setSelectedUser(null)
      setCustomSubject("")
      setSearchTerm("")
    } catch (error: any) {
      console.error("❌ Error sending email:", error)

      let errorDetails = ""
      if (error.response) {
        console.error("❌ Response data:", error.response.data)
        console.error("❌ Response status:", error.response.status)
        errorDetails = error.response.data?.message || error.response.data?.error || `שגיאה ${error.response.status}`
      } else if (error.request) {
        console.error("❌ No response received:", error.request)
        errorDetails = "No response received from the server"
      } else {
        console.error("❌ Error message:", error.message)
        errorDetails = error.message
      }

      setMessage({
        text: `שגיאה בשליחת האימייל: ${errorDetails}`,
        type: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const getUserDisplayName = (user: SharedUser): string => {
    try {
      const name = user.firstName || user.userName || "user"
      const email = user.email || ""
      return `${name} (${email})`
    } catch (error) {
      console.error("Error in getUserDisplayName:", error)
      return "Unknown user"
    }
  }

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "rgba(0, 0, 0, 0.08)",
        borderRadius: "12px",
        overflow: "hidden",
        direction: "rtl",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: 2,
              background: `linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)`,
              mr: 2,
              boxShadow: "0 4px 14px rgba(16, 163, 127, 0.2)",
            }}
          >
            <Mail size={24} color="white" />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
              Share via email
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Send the file directly to a registered user in the system
            </Typography>
          </Box>
        </Box>

        {/* Users count indicator */}
        {allUsers.length > 0 && (
          <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <Users size={16} color="#10a37f" />
            <Typography variant="caption" color="text.secondary">
              {allUsers.length} Users available in the system
            </Typography>
          </Box>
        )}

        <Box sx={{ mb: 3 }}>
          <Autocomplete
            options={filteredUsers}
            getOptionLabel={(option) => {
              try {
                return getUserDisplayName(option)
              } catch (error) {
                console.error("Error in getOptionLabel:", error)
                return "Error loading user"
              }
            }}
            value={selectedUser}
            onChange={(_, newValue) => {
              try {
                setSelectedUser(newValue)
              } catch (error) {
                console.error("Error in onChange:", error)
              }
            }}
            onInputChange={(_, newInputValue) => {
              try {
                setSearchTerm(newInputValue)
              } catch (error) {
                console.error("Error in onInputChange:", error)
              }
            }}
            loading={loadingUsers}
            disabled={loadingUsers || allUsers.length === 0}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={
                  loadingUsers
                    ? "Loading users..."
                    : allUsers.length === 0
                      ? "No users found"
                      : "Find a user to share with..."
                }
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 4px 16px rgba(16, 163, 127, 0.16)",
                      borderColor: "#10a37f",
                    },
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Users size={20} color="#666" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <>
                      {loadingUsers ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderOption={(props, option) => {
              try {
                const roleName = getRoleName(option.role)
                return (
                  <Box component="li" {...props} sx={{ direction: "rtl" }}>
                    <Box>
                      <Typography variant="body1" fontWeight={500}>
                        {option.firstName || option.userName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.email}
                      </Typography>
                      {roleName && (
                        <Typography variant="caption" color="primary" sx={{ ml: 1 }}>
                          • {roleName}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                )
              } catch (error) {
                console.error("Error in renderOption:", error)
                return (
                  <Box component="li" {...props} sx={{ direction: "rtl" }}>
                    <Typography variant="body2" color="error">
                      Error loading user
                    </Typography>
                  </Box>
                )
              }
            }}
            noOptionsText={searchTerm ? "No users matching the search were found." : "No users found"}
            loadingText="טוען משתמשים..."
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            placeholder="Email subject (optional)"
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "white",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                },
                "&.Mui-focused": {
                  boxShadow: "0 4px 16px rgba(16, 163, 127, 0.16)",
                  borderColor: "#10a37f",
                },
              },
            }}
          />
        </Box>

        <Button
          onClick={handleSendEmail}
          disabled={loading || !selectedUser || loadingUsers}
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send size={18} />}
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: 3,
            background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
            boxShadow: "0 4px 14px rgba(16, 163, 127, 0.3)",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            mb: 2,
            "&:hover": {
              background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
              boxShadow: "0 6px 20px rgba(16, 163, 127, 0.4)",
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              background: "rgba(0,0,0,0.12)",
              boxShadow: "none",
            },
            transition: "all 0.3s ease",
          }}
        >
          {loading ? "sender..." : "Send an email"}
        </Button>

        {message && (
          <Fade in={Boolean(message)}>
            <Alert
              severity={message.type}
              icon={message.type === "success" ? <CheckCircle size={24} /> : undefined}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: message.type === "success" ? "success.light" : "error.light",
                "& .MuiAlert-icon": {
                  alignItems: "center",
                },
                "& .MuiAlert-message": {
                  fontWeight: 500,
                  fontSize: "1rem",
                },
              }}
            >
              {message.text}
            </Alert>
          </Fade>
        )}
      </CardContent>
    </Card>
  )
}

export default FileShare