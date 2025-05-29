// "use client"

// import { useState } from "react"
// import axios from "axios"
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   CircularProgress,
//   Alert,
//   Card,
//   CardContent,
//   InputAdornment,
//   Fade,
// } from "@mui/material"
// import { Send, Mail, CheckCircle } from "lucide-react"

// interface FileShareProps {
//   fileUrl: string
//   fileName: string
// }

// const FileShare = ({ fileUrl, fileName }: FileShareProps) => {
//   const apiUrl = import.meta.env.VITE_API_URL
//   const [email, setEmail] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

//   const handleSendEmail = async () => {
//     if (!email) {
//       setMessage({
//         text: "נא להזין כתובת אימייל תקינה",
//         type: "error",
//       })
//       return
//     }

//     setLoading(true)
//     setMessage(null)

//     try {
//       await axios.post(`${apiUrl}/files/send-email`, {
//         email,
//         fileUrl,
//         fileName,
//       })

//       setMessage({
//         text: "הקובץ נשלח בהצלחה!",
//         type: "success",
//       })
//       setEmail("")
//     } catch (error) {
//       console.error("Error sending:", error)
//       setMessage({
//         text: "שגיאה בשליחת האימייל. אנא נסה שוב.",
//         type: "error",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Card
//       elevation={0}
//       sx={{
//         border: "1px solid",
//         borderColor: "rgba(0, 0, 0, 0.08)",
//         borderRadius: "12px",
//         overflow: "hidden",
//         direction: "rtl",
//       }}
//     >
//       <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               width: 48,
//               height: 48,
//               borderRadius: 2,
//               background: `linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)`,
//               mr: 2,
//               boxShadow: "0 4px 14px rgba(16, 163, 127, 0.2)",
//             }}
//           >
//             <Mail size={24} color="white" />
//           </Box>
//           <Box>
//             <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
//               שיתוף באמצעות אימייל
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               שלח את הקובץ ישירות לתיבת הדואר של מישהו
//             </Typography>
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             flexDirection: { xs: "column", sm: "row" },
//             mb: 3,
//           }}
//         >
//           <TextField
//             type="email"
//             placeholder="הזן כתובת אימייל של הנמען..."
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             fullWidth
//             variant="outlined"
//             sx={{
//               flexGrow: 1,
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: 3,
//                 backgroundColor: "white",
//                 transition: "all 0.3s ease",
//                 border: "1px solid transparent",
//                 "&:hover": {
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//                   borderColor: "#10a37f",
//                 },
//                 "&.Mui-focused": {
//                   boxShadow: "0 4px 16px rgba(16, 163, 127, 0.16)",
//                   borderColor: "#10a37f",
//                 },
//               },
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Mail size={20} color="#666" />
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button
//             onClick={handleSendEmail}
//             disabled={loading || !email}
//             variant="contained"
//             startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send size={18} />}
//             sx={{
//               minWidth: { xs: "100%", sm: "160px" },
//               height: { xs: "auto", sm: 56 },
//               py: 1.5,
//               borderRadius: 3,
//               background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
//               boxShadow: "0 4px 14px rgba(16, 163, 127, 0.3)",
//               textTransform: "none",
//               fontWeight: 600,
//               fontSize: "1rem",
//               "&:hover": {
//                 background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
//                 boxShadow: "0 6px 20px rgba(16, 163, 127, 0.4)",
//                 transform: "translateY(-1px)",
//               },
//               "&:disabled": {
//                 background: "rgba(0,0,0,0.12)",
//                 boxShadow: "none",
//               },
//               transition: "all 0.3s ease",
//             }}
//           >
//             {loading ? "שולח..." : "שלח אימייל"}
//           </Button>
//         </Box>

//         {message && (
//           <Fade in={Boolean(message)}>
//             <Alert
//               severity={message.type}
//               icon={message.type === "success" ? <CheckCircle size={24} /> : undefined}
//               sx={{
//                 borderRadius: 3,
//                 border: "1px solid",
//                 borderColor: message.type === "success" ? "success.light" : "error.light",
//                 "& .MuiAlert-icon": {
//                   alignItems: "center",
//                 },
//                 "& .MuiAlert-message": {
//                   fontWeight: 500,
//                   fontSize: "1rem",
//                 },
//               }}
//             >
//               {message.text}
//             </Alert>
//           </Fade>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

// export default FileShare












"use client"

import { useState } from "react"
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
import { Send, Mail, CheckCircle } from "lucide-react"
import { RootState } from "../../store/store"

interface FileShareProps {
  fileUrl: string
  fileName: string
}

interface SharedUser {
  id: number
  userName: string
  email: string
  firstName?: string
  lastName?: string
}

const FileShare = ({ fileUrl, fileName }: FileShareProps) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [selectedUser, setSelectedUser] = useState<SharedUser | null>(null)
  const [users, setUsers] = useState<SharedUser[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)
  const [customSubject, setCustomSubject] = useState("")

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

  // Load users when component mounts or when searching
  const loadUsers = async (searchTerm = "") => {
    if (loadingUsers) return

    setLoadingUsers(true)
    try {
      const token = getCookie("auth_token")
      const response = await axios.get(`${apiUrl}/User/search`, {
        params: { searchTerm },
        headers: { Authorization: `Bearer ${token}` },
      })
      setUsers(response.data || [])
    } catch (error) {
      console.error("Error loading users:", error)
      setMessage({
        text: "שגיאה בטעינת רשימת המשתמשים",
        type: "error",
      })
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

    setLoading(true)
    setMessage(null)

    try {
      const token = getCookie("auth_token")

      // Create email subject
      const subject = customSubject || `שיתוף קובץ: ${fileName}`

      // Create email body with file information
      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <h2 style="color: white; margin: 0; text-align: center;">📎 שיתוף קובץ</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">שלום ${selectedUser.firstName || selectedUser.userName},</h3>
            <p style="color: #666; line-height: 1.6;">
              ${currentUser?.firstName || currentUser?.userName || "משתמש"} שיתף איתך קובץ חשוב:
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

      // Send email using your API endpoint
      await axios.post(
        `${apiUrl}/Email/send-to-user/${selectedUser.id}`,
        {
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

      setMessage({
        text: `הקובץ נשלח בהצלחה ל-${selectedUser.firstName || selectedUser.userName}!`,
        type: "success",
      })

      // Reset form
      setSelectedUser(null)
      setCustomSubject("")
    } catch (error: any) {
      console.error("Error sending email:", error)
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "שגיאה בשליחת האימייל"
      setMessage({
        text: `שגיאה בשליחת האימייל: ${errorMessage}`,
        type: "error",
      })
    } finally {
      setLoading(false)
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

        <Box sx={{ mb: 3 }}>
          <Autocomplete
            options={users}
            getOptionLabel={(option) => `${option.firstName || option.userName} (${option.email})`}
            value={selectedUser}
            onChange={(_, newValue) => setSelectedUser(newValue)}
            onInputChange={(_, newInputValue) => {
              if (newInputValue.length > 0) {
                loadUsers(newInputValue)
              }
            }}
            loading={loadingUsers}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="חפש משתמש לשיתוף..."
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
                      <img src="/user-icon.png" alt="User" width={20} height={20} style={{ marginRight: 8 }} />
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
            renderOption={(props, option) => (
              <Box component="li" {...props} sx={{ direction: "rtl" }}>
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    {option.firstName || option.userName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {option.email}
                  </Typography>
                </Box>
              </Box>
            )}
            noOptionsText="לא נמצאו משתמשים"
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
          disabled={loading || !selectedUser}
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
