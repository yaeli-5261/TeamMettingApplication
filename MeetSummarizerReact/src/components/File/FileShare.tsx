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
} from "@mui/material"
import { Send, Mail, CheckCircle } from "lucide-react"

interface FileShareProps {
  fileUrl: string
  fileName: string
}

const FileShare = ({ fileUrl, fileName }: FileShareProps) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  const handleSendEmail = async () => {
    if (!email) {
      setMessage({
        text: "Please enter a valid email address",
        type: "error",
      })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      await axios.post(`${apiUrl}/files/send-email`, {
        email,
        fileUrl,
        fileName,
      })

      setMessage({
        text: "File sent successfully!",
        type: "success",
      })
      setEmail("")
    } catch (error) {
      console.error("Error sending:", error)
      setMessage({
        text: "Error sending email. Please try again.",
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
        direction: "ltr",
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
              Share via Email
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Send the file directly to someone's inbox
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            mb: 3,
          }}
        >
          <TextField
            type="email"
            placeholder="Enter recipient's email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              flexGrow: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "white",
                transition: "all 0.3s ease",
                border: "1px solid transparent",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  borderColor: "#10a37f",
                },
                "&.Mui-focused": {
                  boxShadow: "0 4px 16px rgba(16, 163, 127, 0.16)",
                  borderColor: "#10a37f",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={20} color="#666" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={handleSendEmail}
            disabled={loading || !email}
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send size={18} />}
            sx={{
              minWidth: { xs: "100%", sm: "160px" },
              height: { xs: "auto", sm: 56 },
              py: 1.5,
              borderRadius: 3,
              background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
              boxShadow: "0 4px 14px rgba(16, 163, 127, 0.3)",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
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
            {loading ? "Sending..." : "Send Email"}
          </Button>
        </Box>

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
