// "use client"

// import { useState } from "react"
// import axios from "axios"
// import { Box, TextField, Button, Typography, CircularProgress, Alert } from "@mui/material"
// import { Send as SendIcon } from "@mui/icons-material"

// interface FileShareProps {
//   fileUrl: string
//   fileName: string
// }

// const FileShare = ({ fileUrl, fileName }: FileShareProps) => {
  

//   const apiUrl = import.meta.env.VITE_API_URL;
//   const [email, setEmail] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

//   const handleSendEmail = async () => {
//     if (!email) {
//       setMessage({
//         text: "Please enter a valid email address!",
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
//         text: "File sent successfully!",
//         type: "success",
//       })
//       setEmail("")
//     } catch (error) {
//       console.error("Error sending:", error)
//       setMessage({
//         text: "Error sending the email. Please try again.",
//         type: "error",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Box sx={{ mt: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: 1, bgcolor: "#f9f9f9" }}>
//       <Typography variant="subtitle2" fontWeight={500} gutterBottom>
//         Share via Email
//       </Typography>

//       <Box sx={{ display: "flex", gap: 1, flexDirection: { xs: "column", sm: "row" } }}>
//         <TextField
//           type="email"
//           placeholder="Enter email address..."
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           fullWidth
//           size="small"
//           sx={{ flexGrow: 1 }}
//         />
//         <Button
//           onClick={handleSendEmail}
//           disabled={loading || !email}
//           variant="contained"
//           startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
//           sx={{
//             bgcolor: "#10a37f",
//             "&:hover": { bgcolor: "#0e8a6c" },
//             textTransform: "none",
//             minWidth: { xs: "100%", sm: "120px" },
//           }}
//         >
//           {loading ? "Sending..." : "Send Email"}
//         </Button>
//       </Box>

//       {message && (
//         <Alert severity={message.type} sx={{ mt: 2, animation: "fadeIn 0.3s ease-in-out" }}>
//           {message.text}
//         </Alert>
//       )}
//     </Box>
//   )
// }

// export default FileShare










"use client"

import { useState } from "react"
import axios from "axios"
import { Box, TextField, Button, Typography, CircularProgress, Alert, Paper, InputAdornment, Fade } from "@mui/material"
import { Send as SendIcon, Email as EmailIcon, CheckCircle as CheckIcon } from "@mui/icons-material"

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
        text: "Please enter a valid email address!",
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
        text: "Error sending the email. Please try again.",
        type: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 3,
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #10a37f 0%, #0ea5e9 100%)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: 2,
            background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
            mr: 2,
            boxShadow: "0 4px 12px rgba(16, 163, 127, 0.3)",
          }}
        >
          <EmailIcon sx={{ color: "white", fontSize: 24 }} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Share via Email
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Send this file directly to someone's inbox
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
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
              borderRadius: 2,
              backgroundColor: "white",
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              },
              "&.Mui-focused": {
                boxShadow: "0 4px 12px rgba(16, 163, 127, 0.2)",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          onClick={handleSendEmail}
          disabled={loading || !email}
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          sx={{
            minWidth: { xs: "100%", sm: "140px" },
            height: 56,
            borderRadius: 2,
            background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
            boxShadow: "0 4px 12px rgba(16, 163, 127, 0.3)",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            "&:hover": {
              background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
              boxShadow: "0 6px 16px rgba(16, 163, 127, 0.4)",
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              background: "rgba(0,0,0,0.12)",
              boxShadow: "none",
            },
            transition: "all 0.2s ease",
          }}
        >
          {loading ? "Sending..." : "Send Email"}
        </Button>
      </Box>

      {message && (
        <Fade in={Boolean(message)}>
          <Alert
            severity={message.type}
            icon={message.type === "success" ? <CheckIcon /> : undefined}
            sx={{
              mt: 3,
              borderRadius: 2,
              "& .MuiAlert-icon": {
                fontSize: 20,
              },
              "& .MuiAlert-message": {
                fontWeight: 500,
              },
            }}
          >
            {message.text}
          </Alert>
        </Fade>
      )}
    </Paper>
  )
}

export default FileShare
