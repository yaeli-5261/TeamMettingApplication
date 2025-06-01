// // "use client"

// // import type React from "react"
// // import { useState } from "react"
// // import {
// //   Button,
// //   TextField,
// //   Box,
// //   Typography,
// //   Paper,
// //   Container,
// //   CircularProgress,
// //   InputAdornment,
// //   IconButton,
// //   Fade,
// // } from "@mui/material"
// // import { useDispatch, useSelector } from "react-redux"
// // import { useNavigate } from "react-router-dom"
// // import type { AppDispatch, RootState } from "../../store/store"
// // import { signIn } from "../../store/authSlice"
// // import {
// //   Login as LoginIcon,
// //   Email as EmailIcon,
// //   Lock as LockIcon,
// //   Visibility,
// //   VisibilityOff,
// // } from "@mui/icons-material"
// // import { motion } from "framer-motion"

// // const SignIn = () => {
// //   const [email, setEmail] = useState("")
// //   const [password, setPassword] = useState("")
// //   const [showPassword, setShowPassword] = useState(false)
// //   const dispatch = useDispatch<AppDispatch>()
// //   const navigate = useNavigate()
// //   const { loading, error } = useSelector((state: RootState) => state.auth)

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault()

// //     try {
// //       const result = await dispatch(signIn({ email, password })).unwrap()

// //       if (result && result.token) {
// //         document.cookie = `auth_token=${result.token}; path=/; secure; samesite=strict;`
// //         navigate("/meetings")
// //       }
// //     } catch (err) {
// //       console.error("Login failed", err)
// //     }
// //   }

// //   return (
// //     <Box
// //       sx={{
// //         height: "100vh",
// //         width: "60vw",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
// //         p: 1,
// //         marginLeft:"160px"
// //       }}
// //     >
// //       <Container maxWidth="sm">
// //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
// //           <Paper
// //             elevation={0}
// //             sx={{
// //               borderRadius: 4,
// //               overflow: "hidden",
// //               boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
// //               background: "rgba(255, 255, 255, 0.95)",
// //               backdropFilter: "blur(10px)",
// //               border: "1px solid rgba(255, 255, 255, 0.2)",
// //             }}
// //           >
// //             {/* Header Section */}
// //             <Box
// //               sx={{
// //                 p: 3,
// //                 background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
// //                 color: "white",
// //                 textAlign: "center",
// //                 position: "relative",
// //                 "&::after": {
// //                   content: '""',
// //                   position: "absolute",
// //                   bottom: 0,
// //                   left: 0,
// //                   right: 0,
// //                   height: "1px",
// //                   background: "rgba(255,255,255,0.3)",
// //                 },
// //               }}
// //             >
// //               <Box
// //                 sx={{
// //                   width: 60,
// //                   height: 60,
// //                   borderRadius: "50%",
// //                   background: "rgba(255,255,255,0.2)",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   mx: "auto",
// //                   mb: 2,
// //                   backdropFilter: "blur(10px)",
// //                 }}
// //               >
// //                 <LoginIcon sx={{ fontSize: 50, color: "white" }} />
// //               </Box>
// //               <Typography variant="h3" fontWeight={800} gutterBottom>
// //                 Welcome Back
// //               </Typography>
// //               <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
// //                 Sign in to access your meeting management system
// //               </Typography>
// //             </Box>

// //             {/* Form Section */}
// //             <Box sx={{ p: 3 }}>
// //               <Box
// //                 component="form"
// //                 onSubmit={handleSubmit}
// //                 sx={{
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   gap: 2,
// //                 }}
// //               >
// //                 <TextField
// //                   label="Email Address"
// //                   type="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   required
// //                   fullWidth
// //                   variant="outlined"
// //                   autoComplete="email"
// //                   sx={{
// //                     "& .MuiOutlinedInput-root": {
// //                       borderRadius: 2,
// //                       height: 48,
// //                       transition: "all 0.3s ease",
// //                       "&:hover": {
// //                         boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
// //                       },
// //                       "&.Mui-focused": {
// //                         boxShadow: "0 8px 24px rgba(16, 163, 127, 0.2)",
// //                       },
// //                     },
// //                     "& .MuiInputLabel-root": {
// //                       fontWeight: 600,
// //                       fontSize: "1rem",
// //                     },
// //                   }}
// //                   InputProps={{
// //                     startAdornment: (
// //                       <InputAdornment position="start">
// //                         <EmailIcon sx={{ color: "text.secondary", fontSize: 24 }} />
// //                       </InputAdornment>
// //                     ),
// //                   }}
// //                 />

// //                 <TextField
// //                   label="Password"
// //                   type={showPassword ? "text" : "password"}
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   required
// //                   fullWidth
// //                   variant="outlined"
// //                   autoComplete="current-password"
// //                   sx={{
// //                     "& .MuiOutlinedInput-root": {
// //                       borderRadius: 2,
// //                       height: 48,
// //                       transition: "all 0.3s ease",
// //                       "&:hover": {
// //                         boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
// //                       },
// //                       "&.Mui-focused": {
// //                         boxShadow: "0 8px 24px rgba(16, 163, 127, 0.2)",
// //                       },
// //                     },
// //                     "& .MuiInputLabel-root": {
// //                       fontWeight: 600,
// //                       fontSize: "0.9rem", // Reduced font size
// //                     },
// //                   }}
// //                   InputProps={{
// //                     startAdornment: (
// //                       <InputAdornment position="start">
// //                         <LockIcon sx={{ color: "text.secondary", fontSize: 24 }} />
// //                       </InputAdornment>
// //                     ),
// //                     endAdornment: (
// //                       <InputAdornment position="end">
// //                         <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="large">
// //                           {showPassword ? <VisibilityOff /> : <Visibility />}
// //                         </IconButton>
// //                       </InputAdornment>
// //                     ),
// //                   }}
// //                 />

// //                 <Button
// //                   type="submit"
// //                   variant="contained"
// //                   disabled={loading}
// //                   sx={{
// //                     py: 2,
// //                     borderRadius: 2,
// //                     background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
// //                     boxShadow: "0 8px 24px rgba(16, 163, 127, 0.3)",
// //                     textTransform: "none",
// //                     fontWeight: 600,
// //                     fontSize: "1rem",
// //                     "&:hover": {
// //                       background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
// //                       boxShadow: "0 12px 32px rgba(16, 163, 127, 0.4)",
// //                       transform: "translateY(-2px)",
// //                     },
// //                     "&:disabled": {
// //                       background: "rgba(0,0,0,0.12)",
// //                       boxShadow: "none",
// //                     },
// //                     transition: "all 0.3s ease",
// //                   }}
// //                 >
// //                   {loading ? <CircularProgress size={28} color="inherit" /> : "Sign In"}
// //                 </Button>

// //                 {error && (
// //                   <Fade in={Boolean(error)}>
// //                     <Typography
// //                       color="error"
// //                       textAlign="center"
// //                       sx={{
// //                         p: 2,
// //                         borderRadius: 2,
// //                         backgroundColor: "error.lighter",
// //                         border: "1px solid",
// //                         borderColor: "error.light",
// //                         fontWeight: 600,
// //                         fontSize: "0.9rem",
// //                       }}
// //                     >
// //                       {error}
// //                     </Typography>
// //                   </Fade>
// //                 )}
// //               </Box>
// //             </Box>
// //           </Paper>
// //         </motion.div>
// //       </Container>
// //     </Box>
// //   )
// // }

// // export default SignIn











// "use client"

// import type React from "react"
// import { useState } from "react"
// import {
//   Button,
//   TextField,
//   Box,
//   Typography,
//   Paper,
//   Container,
//   CircularProgress,
//   InputAdornment,
//   IconButton,
//   Fade,
// } from "@mui/material"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import type { AppDispatch, RootState } from "../../store/store"
// import { signIn } from "../../store/authSlice"
// import {
//   Login as LoginIcon,
//   Email as EmailIcon,
//   Lock as LockIcon,
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material"
// import { motion } from "framer-motion"

// const SignIn = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const { loading, error } = useSelector((state: RootState) => state.auth)

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     try {
//       const result = await dispatch(signIn({ email, password })).unwrap()

//       if (result && result.token) {
//         document.cookie = `auth_token=${result.token}; path=/; secure; samesite=strict;`
//         navigate("/meetings")
//       }
//     } catch (err) {
//       console.error("Login failed", err)
//     }
//   }

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         width: "60vw",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
//         p: 1,
//         marginLeft: "160px",
//         position: "relative",
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background:
//             "radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
//           pointerEvents: "none",
//         },
//       }}
//     >
//       <Container maxWidth="sm">
//         <motion.div
//           initial={{ opacity: 0, y: 30, scale: 0.95 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: 6,
//               overflow: "hidden",
//               boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 8px 25px rgba(0,0,0,0.06)",
//               background: "rgba(255, 255, 255, 0.98)",
//               backdropFilter: "blur(20px)",
//               border: "1px solid rgba(255, 255, 255, 0.3)",
//               position: "relative",
//             }}
//           >
//             {/* Decorative Elements */}
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 height: "4px",
//                 background: "linear-gradient(90deg, #6366f1 0%, #3b82f6 50%, #06b6d4 100%)",
//               }}
//             />

//             {/* Header Section */}
//             <Box
//               sx={{
//                 p: 4,
//                 background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
//                 textAlign: "center",
//                 position: "relative",
//                 borderBottom: "1px solid rgba(226, 232, 240, 0.5)",
//               }}
//             >
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
//               >
//                 <Box
//                   sx={{
//                     width: 80,
//                     height: 80,
//                     borderRadius: "50%",
//                     background: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     mx: "auto",
//                     mb: 3,
//                     boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
//                     position: "relative",
//                     "&::before": {
//                       content: '""',
//                       position: "absolute",
//                       inset: "-2px",
//                       borderRadius: "50%",
//                       background: "linear-gradient(135deg, #6366f1, #3b82f6, #06b6d4)",
//                       zIndex: -1,
//                     },
//                   }}
//                 >
//                   <LoginIcon sx={{ fontSize: 40, color: "white" }} />
//                 </Box>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5, duration: 0.6 }}
//               >
//                 <Typography
//                   variant="h4"
//                   fontWeight={700}
//                   gutterBottom
//                   sx={{
//                     color: "#1e293b",
//                     mb: 1,
//                   }}
//                 >
//                   ברוכים הבאים
//                 </Typography>
//                 <Typography
//                   variant="body1"
//                   sx={{
//                     color: "#64748b",
//                     fontWeight: 400,
//                     lineHeight: 1.6,
//                   }}
//                 >
//                   התחברו למערכת ניהול הפגישות שלכם
//                 </Typography>
//               </motion.div>
//             </Box>

//             {/* Form Section */}
//             <Box sx={{ p: 4 }}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.7, duration: 0.6 }}
//               >
//                 <Box
//                   component="form"
//                   onSubmit={handleSubmit}
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 3,
//                   }}
//                 >
//                   <TextField
//                     label="כתובת אימייל"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     fullWidth
//                     variant="outlined"
//                     autoComplete="email"
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: 3,
//                         height: 56,
//                         transition: "all 0.3s ease",
//                         backgroundColor: "#f8fafc",
//                         border: "1px solid #e2e8f0",
//                         "&:hover": {
//                           backgroundColor: "#f1f5f9",
//                           boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//                           borderColor: "#cbd5e1",
//                         },
//                         "&.Mui-focused": {
//                           backgroundColor: "white",
//                           boxShadow: "0 8px 30px rgba(99, 102, 241, 0.15)",
//                           borderColor: "#6366f1",
//                         },
//                         "& fieldset": {
//                           border: "none",
//                         },
//                       },
//                       "& .MuiInputLabel-root": {
//                         fontWeight: 500,
//                         fontSize: "1rem",
//                         color: "#64748b",
//                         "&.Mui-focused": {
//                           color: "#6366f1",
//                         },
//                       },
//                     }}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <EmailIcon sx={{ color: "#94a3b8", fontSize: 22 }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />

//                   <TextField
//                     label="סיסמה"
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     fullWidth
//                     variant="outlined"
//                     autoComplete="current-password"
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: 3,
//                         height: 56,
//                         transition: "all 0.3s ease",
//                         backgroundColor: "#f8fafc",
//                         border: "1px solid #e2e8f0",
//                         "&:hover": {
//                           backgroundColor: "#f1f5f9",
//                           boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//                           borderColor: "#cbd5e1",
//                         },
//                         "&.Mui-focused": {
//                           backgroundColor: "white",
//                           boxShadow: "0 8px 30px rgba(99, 102, 241, 0.15)",
//                           borderColor: "#6366f1",
//                         },
//                         "& fieldset": {
//                           border: "none",
//                         },
//                       },
//                       "& .MuiInputLabel-root": {
//                         fontWeight: 500,
//                         fontSize: "1rem",
//                         color: "#64748b",
//                         "&.Mui-focused": {
//                           color: "#6366f1",
//                         },
//                       },
//                     }}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LockIcon sx={{ color: "#94a3b8", fontSize: 22 }} />
//                         </InputAdornment>
//                       ),
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton
//                             onClick={() => setShowPassword(!showPassword)}
//                             edge="end"
//                             size="large"
//                             sx={{
//                               color: "#94a3b8",
//                               "&:hover": {
//                                 color: "#6366f1",
//                                 backgroundColor: "rgba(99, 102, 241, 0.08)",
//                               },
//                             }}
//                           >
//                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                     }}
//                   />

//                   <Button
//                     type="submit"
//                     variant="contained"
//                     disabled={loading}
//                     sx={{
//                       py: 2.5,
//                       borderRadius: 3,
//                       background: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
//                       boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
//                       textTransform: "none",
//                       fontWeight: 600,
//                       fontSize: "1.1rem",
//                       color: "white",
//                       border: "none",
//                       position: "relative",
//                       overflow: "hidden",
//                       "&::before": {
//                         content: '""',
//                         position: "absolute",
//                         top: 0,
//                         left: "-100%",
//                         width: "100%",
//                         height: "100%",
//                         background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
//                         transition: "left 0.5s",
//                       },
//                       "&:hover": {
//                         background: "linear-gradient(135deg, #5b5ff5 0%, #2563eb 100%)",
//                         boxShadow: "0 15px 40px rgba(99, 102, 241, 0.4)",
//                         transform: "translateY(-2px)",
//                         "&::before": {
//                           left: "100%",
//                         },
//                       },
//                       "&:disabled": {
//                         background: "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)",
//                         boxShadow: "none",
//                         transform: "none",
//                       },
//                       transition: "all 0.3s ease",
//                     }}
//                   >
//                     {loading ? <CircularProgress size={28} sx={{ color: "white" }} /> : "התחבר למערכת"}
//                   </Button>

//                   {error && (
//                     <Fade in={Boolean(error)}>
//                       <Box
//                         sx={{
//                           p: 3,
//                           borderRadius: 3,
//                           backgroundColor: "#fef2f2",
//                           border: "1px solid #fecaca",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 2,
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             width: 8,
//                             height: 8,
//                             borderRadius: "50%",
//                             backgroundColor: "#ef4444",
//                             flexShrink: 0,
//                           }}
//                         />
//                         <Typography
//                           color="#dc2626"
//                           sx={{
//                             fontWeight: 500,
//                             fontSize: "0.95rem",
//                           }}
//                         >
//                           {error}
//                         </Typography>
//                       </Box>
//                     </Fade>
//                   )}
//                 </Box>
//               </motion.div>
//             </Box>
//           </Paper>
//         </motion.div>
//       </Container>
//     </Box>
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

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result = await dispatch(signIn({ email, password })).unwrap()

      if (result && result.token) {
        document.cookie = `auth_token=${result.token}; path=/; secure; samesite=strict;`
        navigate("/meetings")
      }
    } catch (err) {
      console.error("Login failed", err)
    }
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "60vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #d1fae5 100%)",
        p: 1,
        marginLeft: "160px",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 30% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 6,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(16, 185, 129, 0.15), 0 8px 25px rgba(16, 185, 129, 0.1)",
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(167, 243, 208, 0.3)",
              position: "relative",
            }}
          >
            {/* Decorative Elements */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #10b981 0%, #059669 50%, #047857 100%)",
              }}
            />

            {/* Header Section */}
            <Box
              sx={{
                p: 4,
                background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
                textAlign: "center",
                position: "relative",
                borderBottom: "1px solid rgba(167, 243, 208, 0.5)",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                    boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: "-2px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #10b981, #059669, #047857)",
                      zIndex: -1,
                    },
                  }}
                >
                  <LoginIcon sx={{ fontSize: 40, color: "white" }} />
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Typography
                  variant="h4"
                  fontWeight={700}
                  gutterBottom
                  sx={{
                    color: "#064e3b",
                    mb: 1,
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#047857",
                    fontWeight: 400,
                    lineHeight: 1.6,
                  }}
                >
                  Sign in to your meeting management system
                </Typography>
              </motion.div>
            </Box>

            {/* Form Section */}
            <Box sx={{ p: 4 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
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
                        borderRadius: 3,
                        height: 56,
                        transition: "all 0.3s ease",
                        backgroundColor: "#f0fdf4",
                        border: "1px solid #a7f3d0",
                        "&:hover": {
                          backgroundColor: "#ecfdf5",
                          boxShadow: "0 4px 20px rgba(16, 185, 129, 0.08)",
                          borderColor: "#6ee7b7",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "white",
                          boxShadow: "0 8px 30px rgba(16, 185, 129, 0.15)",
                          borderColor: "#10b981",
                        },
                        "& fieldset": {
                          border: "none",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        fontWeight: 500,
                        fontSize: "1rem",
                        color: "#047857",
                        "&.Mui-focused": {
                          color: "#10b981",
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "#6b7280", fontSize: 22 }} />
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
                        borderRadius: 3,
                        height: 56,
                        transition: "all 0.3s ease",
                        backgroundColor: "#f0fdf4",
                        border: "1px solid #a7f3d0",
                        "&:hover": {
                          backgroundColor: "#ecfdf5",
                          boxShadow: "0 4px 20px rgba(16, 185, 129, 0.08)",
                          borderColor: "#6ee7b7",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "white",
                          boxShadow: "0 8px 30px rgba(16, 185, 129, 0.15)",
                          borderColor: "#10b981",
                        },
                        "& fieldset": {
                          border: "none",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        fontWeight: 500,
                        fontSize: "1rem",
                        color: "#047857",
                        "&.Mui-focused": {
                          color: "#10b981",
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "#6b7280", fontSize: 22 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="large"
                            sx={{
                              color: "#6b7280",
                              "&:hover": {
                                color: "#10b981",
                                backgroundColor: "rgba(16, 185, 129, 0.08)",
                              },
                            }}
                          >
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
                      py: 2.5,
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      color: "white",
                      border: "none",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transition: "left 0.5s",
                      },
                      "&:hover": {
                        background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                        boxShadow: "0 15px 40px rgba(16, 185, 129, 0.4)",
                        transform: "translateY(-2px)",
                        "&::before": {
                          left: "100%",
                        },
                      },
                      "&:disabled": {
                        background: "linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%)",
                        boxShadow: "none",
                        transform: "none",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {loading ? <CircularProgress size={28} sx={{ color: "white" }} /> : "Sign In"}
                  </Button>

                  {error && (
                    <Fade in={Boolean(error)}>
                      <Box
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          backgroundColor: "#fef2f2",
                          border: "1px solid #fecaca",
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "#ef4444",
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          color="#dc2626"
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.95rem",
                          }}
                        >
                          {error}
                        </Typography>
                      </Box>
                    </Fade>
                  )}
                </Box>
              </motion.div>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  )
}

export default SignIn
