"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/store"
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  InputAdornment,
  Alert,
  CircularProgress,
  Grid,
  Container,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material"
import {
  EventNote as EventNoteIcon,
  Title as TitleIcon,
  CalendarToday as CalendarTodayIcon,
  ArrowBack as ArrowBackIcon,
  CloudUpload,
  CheckCircle,
} from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import { addMeeting } from "../../store/meetingSlice"
import type { MeetingPostDTO } from "../../models/meetingTypes"
import { alpha } from "@mui/material/styles"
import axios from "axios"
import { Sparkles } from "lucide-react"

const steps = ["Meeting Details", "File Upload", "AI Processing", "Meeting Ready"]

export default function AddMeetingForm() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.auth)
  const apiUrl = import.meta.env.VITE_API_URL
  const apiUrlAI = import.meta.env.VITE_API_URL_AI

  const [teamId, setTeamId] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [meetingData, setMeetingData] = useState({
    name: "",
    date: "",
    linkTranscriptFile: "",
    linkOrinignFile: "",
    teamId: null as number | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [createdMeetingId, setCreatedMeetingId] = useState<number | null>(null)

  // File upload states
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  // AI processing states
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [aiProgress, setAiProgress] = useState<number>(0)
  const [aiDownloadUrl, setAiDownloadUrl] = useState<string | null>(null)
  const [aiProcessingStatus, setAiProcessingStatus] = useState<"idle" | "processing" | "success" | "error">("idle")

  useEffect(() => {
    if (user?.teamId) {
      setTeamId(user.teamId)
      setMeetingData((prev) => ({ ...prev, teamId: user.teamId ?? null }))
      return
    }

    try {
      const localStorageUser = localStorage.getItem("user")
      if (localStorageUser) {
        const parsedUser = JSON.parse(localStorageUser)
        if (parsedUser?.teamId) {
          setTeamId(parsedUser.teamId)
          setMeetingData((prev) => ({ ...prev, teamId: parsedUser.teamId ?? null }))
          return
        }
      }
    } catch (e) {
      console.error("Error parsing user from localStorage:", e)
    }

    try {
      const sessionUser = sessionStorage.getItem("user")
      if (sessionUser) {
        const parsedUser = JSON.parse(sessionUser)
        if (parsedUser?.teamId) {
          setTeamId(parsedUser.teamId)
          setMeetingData((prev) => ({ ...prev, teamId: parsedUser.teamId }))
          return
        }
      }
    } catch (e) {
      console.error("Error parsing user from sessionStorage:", e)
    }

    if (!teamId) {
      setError("❌ The team ID cannot be recognized. Please reconnect to the system.")
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value })
    if (error) setError(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setError(null)
    }
  }

  const handleCreateMeeting = async () => {
    if (!meetingData.teamId && !teamId) {
      setError("❌ Missing team ID. Please reconnect to the system.")
      return false
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const dateAsUTCString = new Date(meetingData.date).toISOString()
      const meetingDataToSubmit = {
        ...meetingData,
        teamId: meetingData.teamId || teamId,
        date: dateAsUTCString,
      }

      if (meetingDataToSubmit.teamId === null) {
        throw new Error("Team ID is required but is null.")
      }

      const addedMeeting = await dispatch(addMeeting(meetingDataToSubmit as MeetingPostDTO)).unwrap()

      if (addedMeeting) {
        setCreatedMeetingId(addedMeeting.id || null)
        setSuccess("✅  The meeting was created successfully!")
        return true
      }
      return false
    } catch (error) {
      console.error("❌ Error adding meeting:", error)
      setError("❌ Adding the meeting failed. Please try again.")
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  // פונקציה להעלאת קובץ - מבוססת על FileUploader המקורי
  const handleFileUpload = async () => {
    if (!file || !createdMeetingId) {
      setError("Choose a file and be in a meeting.")
      return false
    }

    try {
      setIsUploading(true)
      setUploadProgress(0)

      // Get presigned URL from your API
      const response = await axios.get(`${apiUrl}/upload/presigned-url`, {
        params: {
          fileName: `${teamId}/${file.name}`,
          contentType: file.type,
        },
        headers: { Authorization: `Bearer ${getCookie("auth_token")}` },
      })

      const presignedUrl = response.data.url
      console.log("Got presigned URL for upload:", presignedUrl)

      // Upload file directly to S3 using the presigned URL
      await axios.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (progressEvent) => {
          setUploadProgress(Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1)))
        },
      })

      // Update meeting with file metadata
      const fileMetadata = {
        MeetingId: Number(createdMeetingId),
        FileUrl: `${teamId}/${file.name}`,
        IsTranscript: false,
      }
      await axios.put(`${apiUrl}/Meeting/update-meeting-file`, fileMetadata, {
        headers: { Authorization: `Bearer ${getCookie("auth_token")}` },
      })

      // Get download URL for the uploaded file
      const downloadResponse = await axios.get(`${apiUrl}/upload/download-url`, {
        params: { fileName: `${teamId}/${file.name}` },
        headers: { Authorization: `Bearer ${getCookie("auth_token")}` },
      })

      setDownloadUrl(downloadResponse.data.downloadUrl)
      setError(null)
      return downloadResponse.data.downloadUrl
    } catch (error: any) {
      setError(`Upload error: ${error.response?.data || error.message}`)
      console.error("Upload error:", error.response?.data || error.message)
      return false
    } finally {
      setIsUploading(false)
    }
  }

  // פונקציה לעיבוד AI - מבוססת על FileUploader המקורי
  const handleAIProcessing = async (fileUrl: string) => {
    const token = getCookie("auth_token")

    setIsProcessing(true)
    setAiProcessingStatus("processing")

    try {
      console.log("Sending file for AI processing:", fileUrl)

      const response = await fetch(`${apiUrlAI}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ file_url: fileUrl }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Processing failed: ${errorText}`)
      }
      const text = await response.text()
      console.log("Raw response:", text)

      let result
      try {
        result = JSON.parse(text)
      } catch (err) {
        throw new Error("Server did not return valid JSON: " + text)
      }

      console.log("Generated S3 key from AI:", result.s3_key)

      // שמור את ה-S3 key במקום URL מלא
      const s3Key = result.s3_key || ""

      const fileMetadata = {
        MeetingId: Number(createdMeetingId),
        FileUrl: s3Key,
        IsTranscript: true,
      }

      await axios.put(`${apiUrl}/Meeting/update-meeting-file`, fileMetadata, {
        headers: { Authorization: `Bearer ${getCookie("auth_token")}` },
      })

      setAiDownloadUrl(s3Key)
      setAiProcessingStatus("success")
      console.log("Summary file linked to meeting successfully:", fileMetadata)
      return true
    } catch (error: any) {
      console.error("Error processing file:", error)
      setError(`Error processing file: ${error.message || "Unknown error"}`)
      setAiProcessingStatus("error")
      return false
    } finally {
      setIsProcessing(false)
    }
  }

  // סימולציה של פרוגרס AI
  const simulateAIProgress = async () => {
    for (let i = 0; i <= 100; i += 10) {
      setAiProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
  }

  const handleNext = async () => {
    if (activeStep === 0) {
      // בדיקת שלב 1
      if (!meetingData.name || !meetingData.date) {
        setError("Please fill in all required fields")
        return
      }

      // יצירת הפגישה
      const success = await handleCreateMeeting()
      if (success) {
        setActiveStep(1)
      }
    } else if (activeStep === 1) {
      // העלאת קובץ
      if (!file) {
        setError("Please select a file to upload")
        return
      }

      const fileUrl = await handleFileUpload()
      if (fileUrl) {
        setActiveStep(2)
        // התחלת עיבוד AI
        simulateAIProgress()
        const aiSuccess = await handleAIProcessing(fileUrl)
        if (aiSuccess) {
          setActiveStep(3)
        }
      }
    } else if (activeStep === 2) {
      // מעבר לשלב הסיום
      setActiveStep(3)
    }
  }

  const handleBack = () => {
    if (activeStep > 0 && activeStep < 3) {
      setActiveStep(activeStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: 3,
                  background: "linear-gradient(135deg, #10a37f, #0e8a6c)",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <EventNoteIcon sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6" fontWeight={600} gutterBottom>
                Meeting details                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Enter the basic meeting details.
                </Typography>
              </Box>

              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="Meeting Name"
                      name="name"
                      value={meetingData.name}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          height: 48,
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TitleIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Meeting date and time"
                      name="date"
                      type="datetime-local"
                      value={meetingData.date}
                      onChange={handleChange}
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          height: 48,
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarTodayIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: 3,
                  background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <CloudUpload sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6" fontWeight={600} gutterBottom>
                Upload a file
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Select a file from your computer to upload to AWS
                </Typography>
              </Box>

              <CardContent sx={{ p: 4 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      border: "2px dashed",
                      borderColor: file ? "#0ea5e9" : "rgba(0, 0, 0, 0.1)",
                      borderRadius: "16px",
                      p: { xs: 3, md: 6 },
                      mb: 3,
                      transition: "all 0.2s ease",
                      backgroundColor: file ? alpha("#0ea5e9", 0.05) : "rgba(0, 0, 0, 0.01)",
                      cursor: "pointer",
                      "&:hover": {
                        borderColor: "#0ea5e9",
                        backgroundColor: alpha("#0ea5e9", 0.03),
                      },
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "200px",
                    }}
                  >
                    <input
                      type="file"
                      onChange={handleFileChange}
                      id="file-upload"
                      accept=".pdf,.docx,.doc,.txt"
                      style={{
                        position: "absolute",
                        width: "0.1px",
                        height: "0.1px",
                        opacity: 0,
                        overflow: "hidden",
                        zIndex: -1,
                      }}
                    />
                    <label
                      htmlFor="file-upload"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                          backgroundColor: alpha("#0ea5e9", 0.1),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 3,
                        }}
                      >
                        <CloudUpload sx={{ fontSize: 36, color: "#0ea5e9" }} />
                      </Box>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                        {file ? file.name : "Drag and drop or click to select a file"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: "400px", mx: "auto" }}>
                      Supported formats: PDF, DOCX, TXT
                      </Typography>
                    </label>
                  </Box>

                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <Box sx={{ mb: 3 }}>
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: alpha("#0ea5e9", 0.1),
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#0ea5e9",
                            borderRadius: 4,
                          },
                        }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        uping... {uploadProgress}%
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: 3,
                  background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <Sparkles style ={{ fontSize: 32}} />
                <Typography variant="h6" fontWeight={600} gutterBottom>
                 AI processing
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                 Artificial intelligence processes the file and creates a transcript
                </Typography>
              </Box>

              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" gutterBottom>
                  Processes the file and creates an automatic transcription...
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  The process may take several minutes.
                  </Typography>
                </Box>

                <Box sx={{ width: "100%", mb: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={aiProgress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: alpha("#8b5cf6", 0.1),
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#8b5cf6",
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {aiProgress}% Completed
                </Typography>

                {isProcessing && (
                  <Box sx={{ mt: 3 }}>
                    <CircularProgress size={40} sx={{ color: "#8b5cf6" }} />
                  </Box>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: 3,
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <CheckCircle sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} gutterBottom>
                The meeting was created successfully!
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Your meeting is ready to watch with AI transcription
                </Typography>
              </Box>

              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" gutterBottom>
                  The meeting was successfully created and the file is being processed by AI.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  You can now view the meeting details and the generated transcript.
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate(createdMeetingId ? `/meeting-details/${createdMeetingId}` : "/meetings")}
                    sx={{
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "white",
                      textTransform: "none",
                      fontWeight: 600,
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      "&:hover": {
                        background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                      },
                    }}
                  >
                   Watch the meeting
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => navigate("/meetings")}
                    sx={{
                      borderColor: "#10b981",
                      color: "#10b981",
                      textTransform: "none",
                      fontWeight: 600,
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      "&:hover": {
                        borderColor: "#059669",
                        backgroundColor: "rgba(16, 185, 129, 0.04)",
                      },
                    }}
                  >
                 Meeting list
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/meetings")}
              sx={{
                mb: 3,
                color: "text.secondary",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  color: "#10a37f",
                  backgroundColor: "rgba(16, 163, 127, 0.1)",
                },
              }}
            >
            Back to the meeting list
            </Button>

            <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
            Add a new meeting
            </Typography>
            <Typography variant="body1" color="text.secondary">
            Follow these steps to create and set up your meeting
            </Typography>
          </Box>

          {/* Stepper */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              backgroundColor: "white",
            }}
          >
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          {/* Error Alert */}
          {error && (
            <Alert severity={error.startsWith("✅") ? "success" : "error"} sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Success Alert */}
          {success && activeStep !== 3 && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
              {success}
            </Alert>
          )}

          {/* Step Content */}
          <Box sx={{ mb: 6 }}>
            <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
          </Box>

          {/* Navigation Buttons */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              backgroundColor: "white",
              position: "sticky",
              bottom: 20,
              zIndex: 10,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0 || activeStep === 3}
                startIcon={<ArrowBackIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  color: "text.secondary",
                  "&:disabled": {
                    color: "text.disabled",
                  },
                }}
              >
                Back
              </Button>

              {activeStep < 3 && (
                <Button
                  onClick={handleNext}
                  disabled={isSubmitting || isUploading || isProcessing || !teamId}
                  endIcon={
                    isSubmitting || isUploading || isProcessing ? (
                      <CircularProgress size={16} />
                    ) : (
                      <ArrowBackIcon sx={{ transform: "rotate(180deg)" }} />
                    )
                  }
                  variant="contained"
                  size="large"
                  sx={{
                    background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    minWidth: 160,
                    boxShadow: "0 4px 14px rgba(16, 163, 127, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
                      transform: "translateY(-1px)",
                      boxShadow: "0 6px 20px rgba(16, 163, 127, 0.4)",
                    },
                    "&:disabled": {
                      background: "rgba(0,0,0,0.12)",
                      transform: "none",
                      boxShadow: "none",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {activeStep === 0
                    ? isSubmitting
                     ? "Creating a meeting..."
                    : "Create a meeting"
                    : activeStep === 1
                      ? isUploading
                      ? "Uploading file..."
                      : "Upload file"
                      : isProcessing
                      ? "Processing..."
                      : "Continue"}
                </Button>
              )}
            </Box>
          </Paper>

          {/* Extra spacing for footer */}
          <Box sx={{ height: 100 }} />
        </motion.div>
      </Container>
    </Box>
  )
}

// Helper function
function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ")
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=")
    if (key === name) {
      return decodeURIComponent(value)
    }
  }
  return null
}