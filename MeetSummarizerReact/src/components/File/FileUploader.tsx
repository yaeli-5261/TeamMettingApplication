// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import axios from "axios"
// import { useDispatch, useSelector } from "react-redux"
// import { useParams } from "react-router-dom"
// import type { AppDispatch, RootState } from "../../store/store"
// import { fetchMeetingsByTeam } from "../../store/meetingSlice"
// import {
//   Box,
//   Button,
//   Typography,
//   CircularProgress,
//   Alert,
//   Chip,
//   Container,
//   Card,
//   CardContent,
//   alpha,
// } from "@mui/material"
// import { CloudUpload, Delete, FileText } from "lucide-react"
// import FileShare from "./FileShare"
// import FileViewer from "./FileViewer"


// export const FileUploader = () => {
//   const apiUrl = import.meta.env.VITE_API_URL
//   const apiUrlAI = import.meta.env.VITE_API_URL_AI

//   const [file, setFile] = useState<File | null>(null)
//   const [progress, setProgress] = useState<number>(0)
//   const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
//   const [isUploading, setIsUploading] = useState<boolean>(false)
//   const [error, setError] = useState<string | null>(null)
//   const [filePreview, setFilePreview] = useState<{
//     url: string | null
//     type: string
//     content?: string
//   }>({ url: null, type: "" })
//   const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false)
//   const [isProcessing, setIsProcessing] = useState<boolean>(false)
//   const [aiDownloadUrl, setAiDownloadUrl] = useState<string | null>(null)
//   const [aiProcessingStatus, setAiProcessingStatus] = useState<"idle" | "processing" | "success" | "error">("idle")

//   const { meetingId } = useParams<{ meetingId: string }>()
//   const dispatch: AppDispatch = useDispatch()
//   const meetings = useSelector((state: RootState) => state.meeting.list)
//   const [meeting, setMeeting] = useState(meetings.find((m) => m.id === Number(meetingId)))

//   // Check if meeting already has a file
//   const hasExistingFile = meeting?.linkOrinignFile ? true : false
//   const fileName = file?.name || meeting?.linkOrinignFile?.split("/").pop() || "קובץ"

//   useEffect(() => {
//     if (meetingId && (!meeting || meeting.id !== Number(meetingId))) {
//       dispatch(fetchMeetingsByTeam({ teamId: meeting?.teamId || 0 }))
//       const foundMeeting = meetings.find((m) => m.id === Number(meetingId))
//       setMeeting(foundMeeting)

//       // If meeting has a file URL, set it as the download URL
//       if (foundMeeting?.linkOrinignFile) {
//         setDownloadUrl(foundMeeting.linkOrinignFile)
//       }

//       // If meeting has an AI file URL, set it
//       if (foundMeeting?.linkTranscriptFile) {
//         setAiDownloadUrl(foundMeeting.linkTranscriptFile)
//         setAiProcessingStatus("success")
//       }
//     }
//   }, [meetingId, meetings, dispatch, meeting])

//   // Clean up blob URLs when component unmounts
//   useEffect(() => {
//     return () => {
//       if (filePreview.url) {
//         window.URL.revokeObjectURL(filePreview.url)
//       }
//     }
//   }, [filePreview.url])

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0])
//       setError(null)
//     }
//   }

//   const handleSummarize = async (fileUrl: string) => {
//     const token = getCookie("auth_token")

//     setIsProcessing(true)
//     setAiProcessingStatus("processing")

//     try {
//       console.log("Sending file for AI processing:", fileUrl)

//       console.log("Using API URL:", apiUrlAI)
//       console.log("yaeli!!!")

//       console.log("API URL for AI processing:", `${apiUrlAI}/generate`)

//       const response = await fetch(`${apiUrlAI}/generate`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ file_url: fileUrl }),
//       })

//       if (!response.ok) {
//         const errorText = await response.text()
//         throw new Error(`Processing failed: ${errorText}`)
//       }
//       const text = await response.text()
//       console.log("Raw response:", text)

//       let result
//       try {
//         result = JSON.parse(text)
//       } catch (err) {
//         throw new Error("Server did not return valid JSON: " + text)
//       }

//       console.log("Generated file URL from AI:", result.s3_url)

//       // Make sure we have a valid S3 URL
//       let s3Url = result.s3_url || ""

//       // Check if the URL is properly formatted
//       if (s3Url && !s3Url.startsWith("https://")) {
//         console.warn("S3 URL doesn't start with https://, adding prefix")
//         s3Url = `https://${s3Url}`
//       }

//       console.log("Storing AI URL in database:", s3Url)

//       const fileMetadata = {
//         MeetingId: Number(meetingId),
//         FileUrl: s3Url,
//         IsTranscript: true,
//       }

//       await axios.put(`${apiUrl}/Meeting/update-meeting-file`, fileMetadata, {
//         headers: { Authorization: `Bearer ${getCookie("auth_token")}` },
//       })

//       setAiDownloadUrl(s3Url)
//       setAiProcessingStatus("success")
//       console.log("Summary file linked to meeting successfully:", fileMetadata)

//       // Refresh meeting data to update the file link
//       dispatch(fetchMeetingsByTeam({ teamId: meeting?.teamId || 0 }))
//     } catch (error: any) {
//       console.error("Error processing file:", error)
//       setError(`שגיאה בעיבוד הקובץ: ${error.message || "Unknown error"}`)
//       setAiProcessingStatus("error")
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   const handleUpload = async () => {
//     if (!file || !meetingId) {
//       setError("יש לבחור קובץ ולהיות בתוך פגישה.")
//       return
//     }

//     try {
//       setIsUploading(true)
//       setProgress(0)

//       // Get presigned URL from your API
//       const response = await axios.get(`${apiUrl}/upload/presigned-url`, {
//         params: {
//           fileName: `${meeting?.teamId}/${file.name}`,
//           contentType: file.type,
//         },
//         headers: { Authorization: `Bearer ${getCookie("auth_token")}` },
//       })

//       const presignedUrl = response.data.url
//       console.log("Got presigned URL for upload:", presignedUrl)

//       // Upload file directly to S3 using the presigned URL
//       await axios.put(presignedUrl, file, {
//         headers: { "Content-Type": file.type },
//         onUploadProgress: (progressEvent) => {
//           setProgress(Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1)))
//         },
//       })

//       // Update meeting with file metadata
//       const fileMetadata = {
//         MeetingId: Number(meetingId),
//         FileUrl: `${meeting?.teamId}/${file.name}`,
//         IsTranscript: false,
//       }
//       await axios.put(`${apiUrl}/Meeting/update-meeting-file`, fileMetadata, {
//         headers: { Authorization: `Bearer ${getCookie("auth_token")}` },
//       })

//       // Get download URL for the uploaded file
//       const downloadResponse = await axios.get(`${apiUrl}/upload/download-url`, {
//         params: { fileName: `${meeting?.teamId}/${file.name}` },
//         headers: { Authorization: `Bearer ${getCookie("auth_token")}` },
//       })

//       setDownloadUrl(downloadResponse.data.downloadUrl)
//       console.log("File URL for summarization:", downloadResponse.data.downloadUrl)

//       // Process with AI
//       await handleSummarize(downloadResponse.data.downloadUrl)

//       // Refresh meeting data to update the file link
//       dispatch(fetchMeetingsByTeam({ teamId: meeting?.teamId || 0 }))

//       setError(null)
//     } catch (error: any) {
//       setError(`שגיאה בהעלאה: ${error.response?.data || error.message}`)
//       console.error("שגיאה בהעלאה:", error.response?.data || error.message)
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const resetFileUpload = () => {
//     setFile(null)
//     setProgress(0)
//     setError(null)
//     setDownloadUrl(null)

//     // Clean up any blob URLs
//     if (filePreview.url) {
//       window.URL.revokeObjectURL(filePreview.url)
//     }

//     setFilePreview({ url: null, type: "" })
//     setIsPreviewOpen(false)
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 3 }}>
//       <Card
//         elevation={0}
//         sx={{
//           borderRadius: "16px",
//           border: "1px solid",
//           borderColor: "rgba(0, 0, 0, 0.08)",
//           boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
//           overflow: "hidden",
//           direction: "rtl",
//           mb: 4,
//         }}
//       >
//         <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
//           {error && (
//             <Alert
//               severity={error.startsWith("✅") ? "success" : "error"}
//               sx={{
//                 mb: 3,
//                 borderRadius: "12px",
//                 "& .MuiAlert-icon": { alignItems: "center" },
//               }}
//             >
//               {error}
//             </Alert>
//           )}

//           {!downloadUrl && !hasExistingFile ? (
//             <Box sx={{ textAlign: "center" }}>
//               <Box
//                 sx={{
//                   border: "2px dashed",
//                   borderColor: "rgba(0, 0, 0, 0.1)",
//                   borderRadius: "16px",
//                   p: { xs: 3, md: 6 },
//                   mb: 3,
//                   transition: "all 0.2s ease",
//                   backgroundColor: "rgba(0, 0, 0, 0.01)",
//                   cursor: "pointer",
//                   "&:hover": {
//                     borderColor: "#10a37f",
//                     backgroundColor: alpha("#10a37f", 0.03),
//                   },
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   minHeight: "240px",
//                 }}
//               >
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   id="file-upload"
//                   style={{
//                     position: "absolute",
//                     width: "0.1px",
//                     height: "0.1px",
//                     opacity: 0,
//                     overflow: "hidden",
//                     zIndex: -1,
//                   }}
//                 />
//                 <label
//                   htmlFor="file-upload"
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     cursor: "pointer",
//                     width: "100%",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: "80px",
//                       height: "80px",
//                       borderRadius: "50%",
//                       backgroundColor: alpha("#10a37f", 0.1),
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       mb: 3,
//                     }}
//                   >
//                     <CloudUpload size={36} color="#10a37f" />
//                   </Box>
//                   <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
//                     {file ? file.name : "גרור ושחרר או לחץ לבחירת קובץ"}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ maxWidth: "400px", mx: "auto" }}>
//                     פורמטים נתמכים: PDF, DOCX, TXT
//                   </Typography>
//                 </label>
//               </Box>

//               <Button
//                 onClick={handleUpload}
//                 disabled={!file || isUploading}
//                 variant="contained"
//                 startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : <CloudUpload size={18} />}
//                 sx={{
//                   bgcolor: "#10a37f",
//                   "&:hover": { bgcolor: "#0e8a6c" },
//                   borderRadius: "12px",
//                   py: 1.5,
//                   px: 4,
//                   textTransform: "none",
//                   fontWeight: 600,
//                   fontSize: "1rem",
//                   boxShadow: "0 4px 14px rgba(16, 163, 127, 0.3)",
//                   minWidth: { xs: "100%", sm: "240px" },
//                 }}
//               >
//                 {isUploading ? `מעלה... ${progress}%` : "העלה קובץ"}
//               </Button>

//               {progress > 0 && progress < 100 && (
//                 <Box
//                   sx={{
//                     mt: 3,
//                     height: 6,
//                     bgcolor: alpha("#10a37f", 0.1),
//                     borderRadius: 3,
//                     overflow: "hidden",
//                     maxWidth: "400px",
//                     mx: "auto",
//                   }}
//                 >
//                   <Box sx={{ height: "100%", bgcolor: "#10a37f" }} style={{ width: `${progress}%` }}></Box>
//                 </Box>
//               )}
//             </Box>
//           ) : (
//             <Box>
//               <Card
//                 elevation={0}
//                 sx={{
//                   mb: 4,
//                   border: "1px solid",
//                   borderColor: "rgba(0, 0, 0, 0.08)",
//                   borderRadius: "12px",
//                   overflow: "hidden",
//                 }}
//               >
//                 <CardContent sx={{ p: 0 }}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       p: 3,
//                       borderBottom: "1px solid",
//                       borderColor: "rgba(0, 0, 0, 0.06)",
//                       flexWrap: { xs: "wrap", sm: "nowrap" },
//                       gap: { xs: 2, sm: 0 },
//                     }}
//                   >
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <Box
//                         sx={{
//                           width: "48px",
//                           height: "48px",
//                           borderRadius: "12px",
//                           backgroundColor: alpha("#10a37f", 0.1),
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           mr: 2,
//                         }}
//                       >
//                         <FileText size={24} color="#10a37f" />
//                       </Box>
//                       <Box>
//                         <Typography variant="subtitle1" fontWeight={600}>
//                           {fileName}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           {getFileTypeLabel(fileName.split(".").pop()?.toLowerCase() || "")}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {!hasExistingFile && (
//                       <Button
//                         onClick={resetFileUpload}
//                         variant="outlined"
//                         color="error"
//                         size="small"
//                         startIcon={<Delete size={16} />}
//                         sx={{
//                           textTransform: "none",
//                           borderRadius: "8px",
//                           fontWeight: 500,
//                         }}
//                       >
//                         הסר
//                       </Button>
//                     )}
//                   </Box>

//                   <Box sx={{ p: 3 }}>
//                     <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
//                       קובץ מקורי
//                     </Typography>
//                     <FileViewer filePath={meeting?.linkOrinignFile || ""} fileName={fileName} isAiGenerated={false} />
//                   </Box>
//                 </CardContent>
//               </Card>

//               {/* AI Processing Status */}
//               <Card
//                 elevation={0}
//                 sx={{
//                   mb: 4,
//                   border: "1px solid",
//                   borderColor: "rgba(0, 0, 0, 0.08)",
//                   borderRadius: "12px",
//                   overflow: "hidden",
//                 }}
//               >
//                 <CardContent sx={{ p: 3 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
//                     <Typography variant="subtitle2" fontWeight={600}>
//                       סטטוס סיכום AI
//                     </Typography>
//                     <Chip
//                       label={
//                         aiProcessingStatus === "processing"
//                           ? "מעבד"
//                           : aiProcessingStatus === "idle"
//                             ? "מעובד"
//                             : aiProcessingStatus === "success"
//                               ? "הושלם"
//                               : "נכשל"
//                       }
//                       color={
//                         aiProcessingStatus === "success"
//                           ? "success"
//                           : aiProcessingStatus === "error"
//                             ? "error"
//                             : aiProcessingStatus === "processing"
//                               ? "primary"
//                               : "default"
//                       }
//                       size="small"
//                       sx={{
//                         borderRadius: "8px",
//                         fontWeight: 500,
//                         px: 1,
//                       }}
//                     />
//                   </Box>

//                   {aiProcessingStatus === "processing" && (
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         p: 3,
//                         borderRadius: "12px",
//                         backgroundColor: alpha("#10a37f", 0.05),
//                       }}
//                     >
//                       <CircularProgress size={20} sx={{ mr: 2, color: "#10a37f" }} />
//                       <Typography variant="body2">מייצר סיכום AI, אנא המתן...</Typography>
//                     </Box>
//                   )}

//                   {aiProcessingStatus === "success" && aiDownloadUrl && (
//                     <Box sx={{ mt: 2 }}>
//                       <Typography variant="body2" sx={{ mb: 2 }}>
//                         סיכום AI מוכן לצפייה והורדה
//                       </Typography>
//                       <FileViewer
//                         filePath={aiDownloadUrl}
//                         fileName={`AI_Summary_${fileName.split(".")[0]}.pdf`}
//                         isAiGenerated={true}
//                       />
//                     </Box>
//                   )}

//                   {aiProcessingStatus === "error" && (
//                     <Box
//                       sx={{
//                         p: 3,
//                         borderRadius: "12px",
//                         backgroundColor: alpha("#ff4d4f", 0.05),
//                       }}
//                     >
//                       <Typography variant="body2" color="error">
//                         אירעה שגיאה בייצור סיכום ה-AI. אנא נסה שוב.
//                       </Typography>
//                     </Box>
//                   )}
//                 </CardContent>
//               </Card>

//               {/* File Sharing */}
//               <FileShare fileUrl={downloadUrl || ""} fileName={fileName} />
//             </Box>
//           )}
//         </CardContent>
//       </Card>
//     </Container>
//   )
// }

// // Helper functions
// function getCookie(name: string): string | null {
//   const cookies = document.cookie.split("; ")
//   for (const cookie of cookies) {
//     const [key, value] = cookie.split("=")
//     if (key === name) {
//       return decodeURIComponent(value)
//     }
//   }
//   return null
// }

// // function getFileIcon(fileType: string): string {
// //   const icons: Record<string, string> = {
// //     pdf: "📑",
// //     docx: "📝",
// //     doc: "📝",
// //     jpg: "🖼️",
// //     jpeg: "🖼️",
// //     png: "🖼️",
// //     gif: "🖼️",
// //     txt: "📄",
// //     csv: "📊",
// //     xlsx: "📊",
// //     xls: "📊",
// //     pptx: "📊",
// //     ppt: "📊",
// //   }

// //   return icons[fileType] || "📄"
// // }

// function getFileTypeLabel(fileType: string): string {
//   const labels: Record<string, string> = {
//     pdf: "מסמך PDF",
//     docx: "מסמך Word",
//     doc: "מסמך Word",
//     jpg: "תמונה",
//     jpeg: "תמונה",
//     png: "תמונה",
//     gif: "תמונה",
//     txt: "קובץ טקסט",
//     csv: "גיליון נתונים",
//     xlsx: "גיליון Excel",
//     xls: "גיליון Excel",
//     pptx: "מצגת PowerPoint",
//     ppt: "מצגת PowerPoint",
//   }

//   return labels[fileType] || "קובץ"
// }

// export default FileUploader










"use client"

import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Container,
  Card,
  CardContent,
  alpha,
} from "@mui/material"
import { CloudUpload, Delete, FileText } from "lucide-react"
import { fetchMeetingsByTeam, getCookie } from "../../services/meetingService"
import { AppDispatch, RootState } from "../../store/store"
import FileShare from "./FileShare"
import FileViewer from "./FileViewer"


export const FileUploader = () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const apiUrlAI = import.meta.env.VITE_API_URL_AI

  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [filePreview, setFilePreview] = useState<{
    url: string | null
    type: string
    content?: string
  }>({ url: null, type: "" })
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [aiDownloadUrl, setAiDownloadUrl] = useState<string | null>(null)
  const [aiProcessingStatus, setAiProcessingStatus] = useState<"idle" | "processing" | "success" | "error">("idle")

  const { meetingId } = useParams<{ meetingId: string }>()
  const dispatch: AppDispatch = useDispatch()
  const meetings = useSelector((state: RootState) => state.meeting.list)
  const [meeting, setMeeting] = useState(meetings.find((m) => m.id === Number(meetingId)))

  // Check if meeting already has a file
  const hasExistingFile = meeting?.linkOrinignFile ? true : false
  const fileName = file?.name || meeting?.linkOrinignFile?.split("/").pop() || "File"

  useEffect(() => {
    if (meetingId && (!meeting || meeting.id !== Number(meetingId))) {
      fetchMeetingsByTeam({ teamId: meeting?.teamId || 0 }).then((meetings) => {
        dispatch({ type: 'SET_MEETINGS', payload: meetings });
      });
      const foundMeeting = meetings.find((m) => m.id === Number(meetingId))
      setMeeting(foundMeeting)

      // If meeting has a file URL, set it as the download URL
      if (foundMeeting?.linkOrinignFile) {
        setDownloadUrl(foundMeeting.linkOrinignFile)
      }

      // If meeting has an AI file URL, set it
      if (foundMeeting?.linkTranscriptFile) {
        setAiDownloadUrl(foundMeeting.linkTranscriptFile)
        setAiProcessingStatus("success")
      }
    }
  }, [meetingId, meetings, dispatch, meeting])

  // Clean up blob URLs when component unmounts
  useEffect(() => {
    return () => {
      if (filePreview.url) {
        window.URL.revokeObjectURL(filePreview.url)
      }
    }
  }, [filePreview.url])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setError(null)
    }
  }

  const handleSummarize = async (fileUrl: string) => {
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

      console.log("Generated file URL from AI:", result.s3_url)

      // Make sure we have a valid S3 URL
      let s3Url = result.s3_url || ""

      // Check if the URL is properly formatted
      if (s3Url && !s3Url.startsWith("https://")) {
        console.warn("S3 URL doesn't start with https://, adding prefix")
        s3Url = `https://${s3Url}`
      }

      console.log("Storing AI URL in database:", s3Url)

      const fileMetadata = {
        MeetingId: Number(meetingId),
        FileUrl: s3Url,
        IsTranscript: true,
      }

      await axios.put(`${apiUrl}/Meeting/update-meeting-file`, fileMetadata, {
        headers: { Authorization: `Bearer ${getCookie("auth_token")}` },
      })

      setAiDownloadUrl(s3Url)
      setAiProcessingStatus("success")
      console.log("Summary file linked to meeting successfully:", fileMetadata)

      // Refresh meeting data to update the file link
      fetchMeetingsByTeam({ teamId: meeting?.teamId || 0 }).then((meetings) => {
        dispatch({ type: 'SET_MEETINGS', payload: meetings });
      });
    } catch (error: any) {
      console.error("Error processing file:", error)
      setError(`Error processing file: ${error.message || "Unknown error"}`)
      setAiProcessingStatus("error")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleUpload = async () => {
    if (!file || !meetingId) {
      setError("Please select a file and ensure you're in a meeting.")
      return
    }

    try {
      setIsUploading(true)
      setProgress(0)

      // Get presigned URL from your API
      const response = await axios.get(`${apiUrl}/upload/presigned-url`, {
        params: {
          fileName: `${meeting?.teamId}/${file.name}`,
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
          setProgress(Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1)))
        },
      })

      // Update meeting with file metadata
      const fileMetadata = {
        MeetingId: Number(meetingId),
        FileUrl: `${meeting?.teamId}/${file.name}`,
        IsTranscript: false,
      }
      await axios.put(`${apiUrl}/Meeting/update-meeting-file`, fileMetadata, {
        headers: { Authorization: `Bearer ${getCookie("auth_token")}` },
      })

      // Get download URL for the uploaded file
      const downloadResponse = await axios.get(`${apiUrl}/upload/download-url`, {
        params: { fileName: `${meeting?.teamId}/${file.name}` },
        headers: { Authorization: `Bearer ${getCookie("auth_token")}` },
      })

      setDownloadUrl(downloadResponse.data.downloadUrl)
      console.log("File URL for summarization:", downloadResponse.data.downloadUrl)

      // Process with AI
      await handleSummarize(downloadResponse.data.downloadUrl)

      // Refresh meeting data to update the file link
      fetchMeetingsByTeam({ teamId: meeting?.teamId || 0 }).then((meetings) => {
        dispatch({ type: 'SET_MEETINGS', payload: meetings });
      });

      setError(null)
    } catch (error: any) {
      setError(`Upload error: ${error.response?.data || error.message}`)
      console.error("Upload error:", error.response?.data || error.message)
    } finally {
      setIsUploading(false)
    }
  }

  const resetFileUpload = () => {
    setFile(null)
    setProgress(0)
    setError(null)
    setDownloadUrl(null)

    // Clean up any blob URLs
    if (filePreview.url) {
      window.URL.revokeObjectURL(filePreview.url)
    }

    setFilePreview({ url: null, type: "" })
    setIsPreviewOpen(false)
  }

  const getFileTypeLabel = (fileType: string): string => {
    const labels: Record<string, string> = {
      pdf: "PDF Document",
      docx: "Word Document",
      doc: "Word Document",
      jpg: "Image",
      jpeg: "Image",
      png: "Image",
      gif: "Image",
      txt: "Text File",
      csv: "Data Sheet",
      xlsx: "Excel Sheet",
      xls: "Excel Sheet",
      pptx: "PowerPoint Presentation",
      ppt: "PowerPoint Presentation",
    }

    return labels[fileType] || "File"
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: "16px",
          border: "1px solid",
          borderColor: "rgba(0, 0, 0, 0.08)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
          direction: "rtl",
          mb: 4,
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
          {error && (
            <Alert
              severity={error.startsWith("✅") ? "success" : "error"}
              sx={{
                mb: 3,
                borderRadius: "12px",
                "& .MuiAlert-icon": { alignItems: "center" },
              }}
            >
              {error}
            </Alert>
          )}

          {!downloadUrl && !hasExistingFile ? (
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  border: "2px dashed",
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "16px",
                  p: { xs: 3, md: 6 },
                  mb: 3,
                  transition: "all 0.2s ease",
                  backgroundColor: "rgba(0, 0, 0, 0.01)",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "#10a37f",
                    backgroundColor: alpha("#10a37f", 0.03),
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "240px",
                }}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="file-upload"
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
                      backgroundColor: alpha("#10a37f", 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                    }}
                  >
                    <CloudUpload size={36} color="#10a37f" />
                  </Box>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    {file ? file.name : "Drag and drop or click to select file"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: "400px", mx: "auto" }}>
                    Supported formats: PDF, DOCX, TXT
                  </Typography>
                </label>
              </Box>

              <Button
                onClick={handleUpload}
                disabled={!file || isUploading}
                variant="contained"
                startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : <CloudUpload size={18} />}
                sx={{
                  bgcolor: "#10a37f",
                  "&:hover": { bgcolor: "#0e8a6c" },
                  borderRadius: "12px",
                  py: 1.5,
                  px: 4,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  boxShadow: "0 4px 14px rgba(16, 163, 127, 0.3)",
                  minWidth: { xs: "100%", sm: "240px" },
                }}
              >
                {isUploading ? `Uploading... ${progress}%` : "Upload File"}
              </Button>

              {progress > 0 && progress < 100 && (
                <Box
                  sx={{
                    mt: 3,
                    height: 6,
                    bgcolor: alpha("#10a37f", 0.1),
                    borderRadius: 3,
                    overflow: "hidden",
                    maxWidth: "400px",
                    mx: "auto",
                  }}
                >
                  <Box sx={{ height: "100%", bgcolor: "#10a37f" }} style={{ width: `${progress}%` }}></Box>
                </Box>
              )}
            </Box>
          ) : (
            <Box>
              <Card
                elevation={0}
                sx={{
                  mb: 4,
                  border: "1px solid",
                  borderColor: "rgba(0, 0, 0, 0.08)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 3,
                      borderBottom: "1px solid",
                      borderColor: "rgba(0, 0, 0, 0.06)",
                      flexWrap: { xs: "wrap", sm: "nowrap" },
                      gap: { xs: 2, sm: 0 },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          backgroundColor: alpha("#10a37f", 0.1),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 2,
                        }}
                      >
                        <FileText size={24} color="#10a37f" />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {fileName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {getFileTypeLabel(fileName.split(".").pop()?.toLowerCase() || "")}
                        </Typography>
                      </Box>
                    </Box>

                    {!hasExistingFile && (
                      <Button
                        onClick={resetFileUpload}
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<Delete size={16} />}
                        sx={{
                          textTransform: "none",
                          borderRadius: "8px",
                          fontWeight: 500,
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </Box>

                  <Box sx={{ p: 3 }}>
                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
                      Original File
                    </Typography>
                    <FileViewer filePath={meeting?.linkOrinignFile || ""} fileName={fileName} isAiGenerated={false} />
                  </Box>
                </CardContent>
              </Card>

              {/* AI Processing Status */}
              <Card
                elevation={0}
                sx={{
                  mb: 4,
                  border: "1px solid",
                  borderColor: "rgba(0, 0, 0, 0.08)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      AI Summary Status
                    </Typography>
                    <Chip
                      label={
                        aiProcessingStatus === "processing"
                          ? "Processing"
                          : aiProcessingStatus === "idle"
                            ? "Not Started"
                            : aiProcessingStatus === "success"
                              ? "Completed"
                              : "Failed"
                      }
                      color={
                        aiProcessingStatus === "success"
                          ? "success"
                          : aiProcessingStatus === "error"
                            ? "error"
                            : aiProcessingStatus === "processing"
                              ? "primary"
                              : "default"
                      }
                      size="small"
                      sx={{
                        borderRadius: "8px",
                        fontWeight: 500,
                        px: 1,
                      }}
                    />
                  </Box>

                  {aiProcessingStatus === "processing" && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 3,
                        borderRadius: "12px",
                        backgroundColor: alpha("#10a37f", 0.05),
                      }}
                    >
                      <CircularProgress size={20} sx={{ mr: 2, color: "#10a37f" }} />
                      <Typography variant="body2">Generating AI summary, please wait...</Typography>
                    </Box>
                  )}

                  {aiProcessingStatus === "success" && aiDownloadUrl && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        AI summary ready for viewing and download
                      </Typography>
                      <FileViewer
                        filePath={aiDownloadUrl}
                        fileName={`AI_Summary_${fileName.split(".")[0]}.pdf`}
                        isAiGenerated={true}
                      />
                    </Box>
                  )}

                  {aiProcessingStatus === "error" && (
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: "12px",
                        backgroundColor: alpha("#ff4d4f", 0.05),
                      }}
                    >
                      <Typography variant="body2" color="error">
                        An error occurred generating the AI summary. Please try again.
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>

              {/* File Sharing */}
              <FileShare fileUrl={downloadUrl || ""} fileName={fileName} />
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default FileUploader
