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
          text: "לא נמצאו משתמשים עם כתובות אימייל במערכת",
          type: "error",
        })
      }
    } catch (error: any) {
      console.error("❌ Error loading users:", error)
      setMessage({
        text: `שגיאה בטעינת רשימת המשתמשים: ${error.response?.data?.message || error.message}`,
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
        text: "נא לבחור משתמש מהרשימה",
        type: "error",
      })
      return
    }

    if (!selectedUser.email) {
      setMessage({
        text: "למשתמש הנבחר אין כתובת אימייל",
        type: "error",
      })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const token = getCookie("auth_token")

      const subject = customSubject || `שיתוף קובץ: ${fileName}`

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
              <p style="margin: 0; color: #666;">
                <strong>קישור להורדה:</strong><br>
                <a href="${fileUrl}" style="color: #10a37f; text-decoration: none; word-break: break-all;">
                  ${fileUrl}
                </a>
              </p>
            </div>
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p style="margin: 0; color: #1976d2; font-size: 14px;">
                💡 <strong>טיפ:</strong> לחץ על הקישור כדי להוריד את הקובץ ישירות למחשב שלך
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
      console.log("📧 Request payload:", {
        Subject: subject,
        Body: emailBody,
      })

      // שים לב! שמות השדות חייבים להיות עם אות גדולה בהתחלה - Subject ו-Body
      // זה בדיוק מה שה-API מצפה לקבל
      const response = await axios.post(
        `${apiUrl}/Email/send-to-user/${selectedUser.id}`,
        {
          email: selectedUser.email,
          Subject: subject, // חשוב! עם S גדולה
          Body: emailBody, // חשוב! עם B גדולה
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

      // הצגת מידע מפורט יותר על השגיאה
      let errorDetails = ""
      if (error.response) {
        console.error("❌ Response data:", error.response.data)
        console.error("❌ Response status:", error.response.status)
        errorDetails = error.response.data?.message || error.response.data?.error || `שגיאה ${error.response.status}`
      } else if (error.request) {
        console.error("❌ No response received:", error.request)
        errorDetails = "לא התקבלה תשובה מהשרת"
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
      const name = user.firstName || user.userName || "משתמש"
      const email = user.email || ""
      return `${name} (${email})`
    } catch (error) {
      console.error("Error in getUserDisplayName:", error)
      return "משתמש לא ידוע"
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
              שיתוף באמצעות אימייל
            </Typography>
            <Typography variant="body2" color="text.secondary">
              שלח את הקובץ ישירות למשתמש רשום במערכת
            </Typography>
          </Box>
        </Box>

        {/* Users count indicator */}
        {allUsers.length > 0 && (
          <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <Users size={16} color="#10a37f" />
            <Typography variant="caption" color="text.secondary">
              {allUsers.length} משתמשים זמינים במערכת
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
                return "שגיאה בטעינת משתמש"
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
                  loadingUsers ? "טוען משתמשים..." : allUsers.length === 0 ? "לא נמצאו משתמשים" : "חפש משתמש לשיתוף..."
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
                      שגיאה בטעינת משתמש
                    </Typography>
                  </Box>
                )
              }
            }}
            noOptionsText={searchTerm ? "לא נמצאו משתמשים התואמים לחיפוש" : "לא נמצאו משתמשים"}
            loadingText="טוען משתמשים..."
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            placeholder="נושא האימייל (אופציונלי)"
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
          {loading ? "שולח..." : "שלח אימייל"}
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

