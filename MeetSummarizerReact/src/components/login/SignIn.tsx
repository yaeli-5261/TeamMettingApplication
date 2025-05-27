// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button, TextField, Box, Typography, Paper, Avatar, Container, CircularProgress } from "@mui/material"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import type { AppDispatch, RootState } from "../../store/store"
// import { signIn } from "../../store/authSlice"
// import { Login as LoginIcon } from "@mui/icons-material"
// import { motion } from "framer-motion"
// import { getCookie } from "../../services/meetingService"

// const SignIn = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const { loading, error } = useSelector((state: RootState) => state.auth)

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

//   console.log("handleSubmit called============1111111111111",e);
  
//     e.preventDefault()
//   console.log("handleSubmit called============1111111111111",e);

//     try {
//       console.log("before");
      
//       // שליחה של הנתונים ל-Redux
//       // const result = await dispatch(signIn({ email, password })).unwrap()
//       const result = await dispatch(signIn({ email, password })).unwrap()

// console.log("after");

//       // בדיקה אם ההתחברות הצליחה
//       if (result && result.token) {
//         // שמירת הטוקן ב-cookie
//         document.cookie = `auth_token=${result.token}; path=/; secure; samesite=strict;`
//         console.log("Token from server:", getCookie("auth_token"))

//         // ניווט לדף הפגישות
//         navigate("/meetings")
//       }
//     } catch (err) {
//       console.error("Login failed", err)
//     }
//   }

//   return (
  
//     <Container maxWidth="sm" sx={{ mt: 8 }}>
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <Paper
//           elevation={0}
//           sx={{
//             p: 0,
//             borderRadius: 2,
//             border: "1px solid",
//             borderColor: "divider",
//             overflow: "hidden",
//           }}
//         >
//           <Box
//             sx={{
//               p: 3,
//               bgcolor: "#10a37f",
//               color: "white",
//               textAlign: "center",
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: 60,
//                 height: 60,
//                 bgcolor: "white",
//                 color: "#10a37f",
//                 mx: "auto",
//                 mb: 2,
//               }}
//             >
//               <LoginIcon fontSize="large" />
//             </Avatar>
//             <Typography variant="h5" fontWeight="bold" gutterBottom>
//               התחברות למערכת 
//             </Typography>
//             <Typography variant="body2">הזן את פרטי ההתחברות שלך כדי להיכנס למערכת</Typography>
//           </Box>

//           <Box sx={{ p: 4 }}>
//             <Box
//               component="form"
//               onSubmit={handleSubmit}
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 3,
//               }}
//             >
//               <TextField
//                 label="דואר אלקטרוני"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 fullWidth
//                 variant="outlined"
//                 autoComplete="email"
//               />

//               <TextField
//                 label="סיסמה"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 fullWidth
//                 variant="outlined"
//                 autoComplete="current-password"
//               />

//               <Button
//                 type="submit"
//                 variant="contained"
//                 disabled={loading}
//                 sx={{
//                   py: 1.5,
//                   bgcolor: "#10a37f",
//                   "&:hover": {
//                     bgcolor: "#0e8a6c",
//                   },
//                 }}
//               >
//                 {loading ? <CircularProgress size={24} color="inherit" /> : "התחבר"}
//               </Button>

//               {error && (
//                 <Typography color="error" textAlign="center">
//                   {error}
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//         </Paper>
//       </motion.div>
//     </Container>
//   )
// }

// export default SignIn




"use client"

import type React from "react"
import { useState } from "react"
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Container,
  CircularProgress,
  InputAdornment,
  IconButton,
  Fade,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { AppDispatch, RootState } from "../../store/store"
import { signIn } from "../../store/authSlice"
import {
  Login as LoginIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { getCookie } from "../../services/meetingService"

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit called============1111111111111", e)

    e.preventDefault()
    console.log("handleSubmit called============1111111111111", e)

    try {
      console.log("before")

      const result = await dispatch(signIn({ email, password })).unwrap()

      console.log("after")

      if (result && result.token) {
        document.cookie = `auth_token=${result.token}; path=/; secure; samesite=strict;`
        console.log("Token from server:", getCookie("auth_token"))

        navigate("/meetings")
      }
    } catch (err) {
      console.error("Login failed", err)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              background: "white",
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                p: 4,
                background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                color: "white",
                textAlign: "center",
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
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                  backdropFilter: "blur(10px)",
                }}
              >
                <LoginIcon sx={{ fontSize: 40, color: "white" }} />
              </Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Welcome Back
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Sign in to access your meeting management system
              </Typography>
            </Box>

            {/* Form Section */}
            <Box sx={{ p: 4 }}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <TextField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                  autoComplete="email"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
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
                        <EmailIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                  autoComplete="current-password"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
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
                        <LockIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 2,
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                    boxShadow: "0 4px 12px rgba(16, 163, 127, 0.3)",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "1.1rem",
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
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                </Button>

                {error && (
                  <Fade in={Boolean(error)}>
                    <Typography
                      color="error"
                      textAlign="center"
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "error.lighter",
                        border: "1px solid",
                        borderColor: "error.light",
                      }}
                    >
                      {error}
                    </Typography>
                  </Fade>
                )}
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  )
}

export default SignIn
