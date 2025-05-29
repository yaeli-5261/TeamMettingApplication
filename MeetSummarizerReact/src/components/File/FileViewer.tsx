// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { Box, Button, Typography, Alert, CircularProgress, Dialog, alpha } from "@mui/material"
// import { Eye, Download, X, FileText } from "lucide-react"

// interface FileViewerProps {
//   filePath: string
//   fileName: string
//   isAiGenerated?: boolean
// }

// const FileViewer = ({ filePath, fileName, isAiGenerated = false }: FileViewerProps) => {
//   const apiUrl = import.meta.env.VITE_API_URL

//   const [fileUrl, setFileUrl] = useState<string | null>(null)
//   const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
//   const [docxHtml, setDocxHtml] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false)

//   const fileType = fileName.split(".").pop()?.toLowerCase() || ""

//   useEffect(() => {
//     if (filePath) {
//       getDownloadUrl()
//     }
//   }, [filePath])

//   const getDownloadUrl = async () => {
//     try {
//       setIsLoading(true)
//       setError(null)

//       if (isAiGenerated && filePath) {
//         const fullUrl = filePath.includes("https://") ? filePath : `https://${filePath}`
//         setDownloadUrl(fullUrl)
//         setIsLoading(false)
//         return
//       }

//       if (!filePath) {
//         setError("נתיב קובץ חסר")
//         setIsLoading(false)
//         return
//       }

//       const response = await axios.get(`${apiUrl}/upload/download-url`, {
//         params: { fileName: filePath },
//         headers: { Authorization: `Bearer ${getCookie("auth_token")}` },
//       })

//       setDownloadUrl(response.data.downloadUrl)
//       setIsLoading(false)
//     } catch (error) {
//       setError("שגיאה בקבלת קישור להורדה")
//       setIsLoading(false)
//     }
//   }

//   const downloadAndShowFile = async () => {
//     if (!downloadUrl) {
//       setError("כתובת URL לא מוגדרת")
//       return
//     }

//     try {
//       setIsLoading(true)
//       setError(null)

//       const fileResponse = await axios.get(downloadUrl, {
//         responseType: "arraybuffer",
//         timeout: 30000,
//       })

//       if (fileType === "docx") {
//         try {
//           const mammoth = await import("mammoth")
//           const { value } = await mammoth.convertToHtml({ arrayBuffer: fileResponse.data })
//           setDocxHtml(value)
//         } catch {
//           setError("שגיאה בהמרת קובץ DOCX")
//         }
//       }

//       const blobUrl = window.URL.createObjectURL(
//         new Blob([fileResponse.data], {
//           type: getMimeType(fileType),
//         }),
//       )

//       setFileUrl(blobUrl)
//       setIsViewerOpen(true)
//     } catch {
//       setError("שגיאה בטעינת הקובץ")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const closeViewer = () => {
//     setIsViewerOpen(false)
//   }

//   const downloadFile = async () => {
//     if (!downloadUrl) {
//       setError("כתובת URL לא מוגדרת")
//       return
//     }

//     try {
//       setIsLoading(true)
//       setError(null)

//       const fileResponse = await axios.get(downloadUrl, {
//         responseType: "blob",
//         timeout: 30000,
//       })

//       const blobUrl = window.URL.createObjectURL(new Blob([fileResponse.data], { type: getMimeType(fileType) }))

//       const link = document.createElement("a")
//       link.href = blobUrl
//       link.setAttribute("download", fileName)
//       document.body.appendChild(link)
//       link.click()
//       link.remove()
//       window.URL.revokeObjectURL(blobUrl)

//       setError("✅ הקובץ הורד בהצלחה")
//       setTimeout(() => setError(null), 3000)
//     } catch {
//       setError("שגיאה בהורדת הקובץ")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const getMimeType = (extension: string): string => {
//     const mimeTypes: Record<string, string> = {
//       pdf: "application/pdf",
//       docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       doc: "application/msword",
//       jpg: "image/jpeg",
//       jpeg: "image/jpeg",
//       png: "image/png",
//       gif: "image/gif",
//       txt: "text/plain",
//     }

//     return mimeTypes[extension] || "application/octet-stream"
//   }

//   const renderFilePreview = () => {
//     if (!fileUrl) return null

//     if (fileType === "pdf") {
//       return <iframe src={fileUrl} width="100%" height="100%" title="PDF Preview" style={{ border: "none" }} />
//     } else if (fileType === "docx" && docxHtml) {
//       return (
//         <div
//           dangerouslySetInnerHTML={{ __html: docxHtml }}
//           style={{ width: "100%", height: "auto", overflow: "auto", padding: "16px" }}
//         />
//       )
//     } else if (["jpg", "jpeg", "png", "gif"].includes(fileType)) {
//       return (
//         <img
//           src={fileUrl || "/placeholder.svg"}
//           alt={fileName}
//           style={{
//             maxWidth: "100%",
//             maxHeight: "calc(100% - 40px)",
//             objectFit: "contain",
//             margin: "0 auto",
//             display: "block",
//           }}
//         />
//       )
//     } else {
//       return (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             p: 6,
//             textAlign: "center",
//           }}
//         >
//           <Box
//             sx={{
//               width: "80px",
//               height: "80px",
//               borderRadius: "50%",
//               backgroundColor: alpha("#10a37f", 0.1),
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               mb: 3,
//             }}
//           >
//             <FileText size={36} color="#10a37f" />
//           </Box>
//           <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
//             {fileName}
//           </Typography>
//           <Button
//             href={fileUrl}
//             download={fileName}
//             variant="outlined"
//             sx={{
//               color: "#10a37f",
//               borderColor: "#10a37f",
//               "&:hover": {
//                 borderColor: "#0e8a6c",
//                 backgroundColor: alpha("#10a37f", 0.04),
//               },
//               borderRadius: "8px",
//               textTransform: "none",
//               fontWeight: 500,
//             }}
//           >
//             הורד לצפייה
//           </Button>
//         </Box>
//       )
//     }
//   }

//   return (
//     <Box sx={{ direction: "rtl" }}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           gap: 2,
//           mb: 2,
//         }}
//       >
//         <Button
//           onClick={downloadAndShowFile}
//           disabled={isLoading || !downloadUrl}
//           startIcon={isLoading ? <CircularProgress size={18} /> : <Eye size={18} />}
//           variant="outlined"
//           sx={{
//             flex: 1,
//             borderColor: "#10a37f",
//             color: "#10a37f",
//             "&:hover": {
//               borderColor: "#0e8a6c",
//               bgcolor: alpha("#10a37f", 0.04),
//             },
//             borderRadius: "10px",
//             py: 1.5,
//             fontWeight: 500,
//             textTransform: "none",
//           }}
//         >
//           {isLoading ? "טוען..." : "צפה בקובץ"}
//         </Button>
//         <Button
//           onClick={downloadFile}
//           disabled={isLoading || !downloadUrl}
//           startIcon={isLoading ? <CircularProgress size={18} /> : <Download size={18} />}
//           variant="contained"
//           sx={{
//             flex: 1,
//             bgcolor: "#10a37f",
//             "&:hover": { bgcolor: "#0e8a6c" },
//             borderRadius: "10px",
//             py: 1.5,
//             fontWeight: 500,
//             textTransform: "none",
//             boxShadow: "0 4px 14px rgba(16, 163, 127, 0.3)",
//           }}
//         >
//           {isLoading ? "טוען..." : "הורד קובץ"}
//         </Button>
//       </Box>

//       {error && (
//         <Alert
//           severity={error.startsWith("✅") ? "success" : "error"}
//           sx={{
//             width: "100%",
//             mb: 2,
//             borderRadius: "10px",
//             "& .MuiAlert-icon": { alignItems: "center" },
//           }}
//         >
//           {error}
//         </Alert>
//       )}

//       <Dialog
//         open={isViewerOpen}
//         onClose={closeViewer}
//         fullWidth
//         maxWidth="lg"
//         PaperProps={{
//           sx: {
//             height: "90vh",
//             maxHeight: "90vh",
//             display: "flex",
//             flexDirection: "column",
//             borderRadius: "16px",
//             overflow: "hidden",
//           },
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             p: 2,
//             borderBottom: "1px solid",
//             borderColor: "rgba(0, 0, 0, 0.08)",
//             direction: "rtl",
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <FileText size={20} style={{ marginLeft: "8px" }} />
//             <Typography variant="h6" fontWeight={600}>
//               {fileName}
//             </Typography>
//           </Box>
//           <Button
//             onClick={closeViewer}
//             variant="text"
//             startIcon={<X size={18} />}
//             sx={{
//               color: "text.secondary",
//               "&:hover": { backgroundColor: alpha("#000", 0.04) },
//               textTransform: "none",
//             }}
//           >
//             סגור
//           </Button>
//         </Box>
//         <Box sx={{ flex: 1, overflow: "auto", p: 0 }}>{renderFilePreview()}</Box>
//       </Dialog>
//     </Box>
//   )
// }

// // Helper function to get cookie value
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

// export default FileViewer









"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Box, Button, Typography, Alert, CircularProgress, Dialog, alpha } from "@mui/material"
import { Eye, Download, X, FileText } from "lucide-react"
import { getCookie } from "@/utils/cookies" // Import getCookie function from utils/cookies

interface FileViewerProps {
  filePath: string
  fileName: string
  isAiGenerated?: boolean
}

const FileViewer = ({ filePath, fileName, isAiGenerated = false }: FileViewerProps) => {
  const apiUrl = import.meta.env.VITE_API_URL

  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [docxHtml, setDocxHtml] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false)

  const fileType = fileName.split(".").pop()?.toLowerCase() || ""

  useEffect(() => {
    if (filePath) {
      getDownloadUrl()
    }
  }, [filePath])

  const getDownloadUrl = async () => {
    try {
      setIsLoading(true)
      setError(null)

      if (isAiGenerated && filePath) {
        const fullUrl = filePath.includes("https://") ? filePath : `https://${filePath}`
        setDownloadUrl(fullUrl)
        setIsLoading(false)
        return
      }

      if (!filePath) {
        setError("File path is missing")
        setIsLoading(false)
        return
      }

      const response = await axios.get(`${apiUrl}/upload/download-url`, {
        params: { fileName: filePath },
        headers: { Authorization: `Bearer ${getCookie("auth_token")}` },
      })

      setDownloadUrl(response.data.downloadUrl)
      setIsLoading(false)
    } catch (error) {
      setError("Error getting download link")
      setIsLoading(false)
    }
  }

  const downloadAndShowFile = async () => {
    if (!downloadUrl) {
      setError("URL is not defined")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const fileResponse = await axios.get(downloadUrl, {
        responseType: "arraybuffer",
        timeout: 30000,
      })

      if (fileType === "docx") {
        try {
          const mammoth = await import("mammoth")
          const { value } = await mammoth.convertToHtml({ arrayBuffer: fileResponse.data })
          setDocxHtml(value)
        } catch {
          setError("Error converting DOCX file")
        }
      }

      const blobUrl = window.URL.createObjectURL(
        new Blob([fileResponse.data], {
          type: getMimeType(fileType),
        }),
      )

      setFileUrl(blobUrl)
      setIsViewerOpen(true)
    } catch {
      setError("Error loading file")
    } finally {
      setIsLoading(false)
    }
  }

  const closeViewer = () => {
    setIsViewerOpen(false)
  }

  const downloadFile = async () => {
    if (!downloadUrl) {
      setError("URL is not defined")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const fileResponse = await axios.get(downloadUrl, {
        responseType: "blob",
        timeout: 30000,
      })

      const blobUrl = window.URL.createObjectURL(new Blob([fileResponse.data], { type: getMimeType(fileType) }))

      const link = document.createElement("a")
      link.href = blobUrl
      link.setAttribute("download", fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(blobUrl)

      setError("✅ File downloaded successfully")
      setTimeout(() => setError(null), 3000)
    } catch {
      setError("Error downloading the file")
    } finally {
      setIsLoading(false)
    }
  }

  const getMimeType = (extension: string): string => {
    const mimeTypes: Record<string, string> = {
      pdf: "application/pdf",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      doc: "application/msword",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      txt: "text/plain",
    }

    return mimeTypes[extension] || "application/octet-stream"
  }

  const renderFilePreview = () => {
    if (!fileUrl) return null

    if (fileType === "pdf") {
      return <iframe src={fileUrl} width="100%" height="100%" title="PDF Preview" style={{ border: "none" }} />
    } else if (fileType === "docx" && docxHtml) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: docxHtml }}
          style={{ width: "100%", height: "auto", overflow: "auto", padding: "16px" }}
        />
      )
    } else if (["jpg", "jpeg", "png", "gif"].includes(fileType)) {
      return (
        <img
          src={fileUrl || "/placeholder.svg"}
          alt={fileName}
          style={{
            maxWidth: "100%",
            maxHeight: "calc(100% - 40px)",
            objectFit: "contain",
            margin: "0 auto",
            display: "block",
          }}
        />
      )
    } else {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 6,
            textAlign: "center",
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
            <FileText size={36} color="#10a37f" />
          </Box>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            {fileName}
          </Typography>
          <Button
            href={fileUrl}
            download={fileName}
            variant="outlined"
            sx={{
              color: "#10a37f",
              borderColor: "#10a37f",
              "&:hover": {
                borderColor: "#0e8a6c",
                backgroundColor: alpha("#10a37f", 0.04),
              },
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Download to view
          </Button>
        </Box>
      )
    }
  }

  return (
    <Box sx={{ direction: "rtl" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 2,
        }}
      >
        <Button
          onClick={downloadAndShowFile}
          disabled={isLoading || !downloadUrl}
          startIcon={isLoading ? <CircularProgress size={18} /> : <Eye size={18} />}
          variant="outlined"
          sx={{
            flex: 1,
            borderColor: "#10a37f",
            color: "#10a37f",
            "&:hover": {
              borderColor: "#0e8a6c",
              bgcolor: alpha("#10a37f", 0.04),
            },
            borderRadius: "10px",
            py: 1.5,
            fontWeight: 500,
            textTransform: "none",
          }}
        >
          {isLoading ? "Loading..." : "View File"}
        </Button>
        <Button
          onClick={downloadFile}
          disabled={isLoading || !downloadUrl}
          startIcon={isLoading ? <CircularProgress size={18} /> : <Download size={18} />}
          variant="contained"
          sx={{
            flex: 1,
            bgcolor: "#10a37f",
            "&:hover": { bgcolor: "#0e8a6c" },
            borderRadius: "10px",
            py: 1.5,
            fontWeight: 500,
            textTransform: "none",
            boxShadow: "0 4px 14px rgba(16, 163, 127, 0.3)",
          }}
        >
          {isLoading ? "Loading..." : "Download File"}
        </Button>
      </Box>

      {error && (
        <Alert
          severity={error.startsWith("✅") ? "success" : "error"}
          sx={{
            width: "100%",
            mb: 2,
            borderRadius: "10px",
            "& .MuiAlert-icon": { alignItems: "center" },
          }}
        >
          {error}
        </Alert>
      )}

      <Dialog
        open={isViewerOpen}
        onClose={closeViewer}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            height: "90vh",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid",
            borderColor: "rgba(0, 0, 0, 0.08)",
            direction: "rtl",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FileText size={20} style={{ marginLeft: "8px" }} />
            <Typography variant="h6" fontWeight={600}>
              {fileName}
            </Typography>
          </Box>
          <Button
            onClick={closeViewer}
            variant="text"
            startIcon={<X size={18} />}
            sx={{
              color: "text.secondary",
              "&:hover": { backgroundColor: alpha("#000", 0.04) },
              textTransform: "none",
            }}
          >
            Close
          </Button>
        </Box>
        <Box sx={{ flex: 1, overflow: "auto", p: 0 }}>{renderFilePreview()}</Box>
      </Dialog>
    </Box>
  )
}

// Helper function to get cookie value
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

export default FileViewer
