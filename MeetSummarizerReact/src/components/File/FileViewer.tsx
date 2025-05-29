"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Box, Button, Typography, Alert, CircularProgress, Dialog } from "@mui/material"
import { Visibility, Download, Close } from "@mui/icons-material"
import "./FileViewer.css"

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
        setError("נתיב קובץ חסר")
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
      setError("שגיאה בקבלת קישור להורדה")
      setIsLoading(false)
    }
  }

  const downloadAndShowFile = async () => {
    if (!downloadUrl) {
      setError("כתובת URL לא מוגדרת")
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
          setError("שגיאה בהמרת קובץ DOCX")
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
      setError("שגיאה בטעינת הקובץ")
    } finally {
      setIsLoading(false)
    }
  }

  const closeViewer = () => {
    setIsViewerOpen(false)
  }

  const downloadFile = async () => {
    if (!downloadUrl) {
      setError("כתובת URL לא מוגדרת")
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

      setError("✅ הקובץ הורד בהצלחה")
      setTimeout(() => setError(null), 3000)
    } catch {
      setError("שגיאה בהורדת הקובץ")
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
        <div className="generic-file-preview">
          <div className="file-icon">📄</div>
          <div className="file-name">{fileName}</div>
          <a href={fileUrl} download={fileName} className="download-link">
            הורד לצפייה
          </a>
        </div>
      )
    }
  }

  return (
    <Box className="file-viewer-container" sx={{ width: "40vw", margin: "0 auto", padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, marginBottom: 2 ,width: "35vw"}}>
        <Button
          onClick={downloadAndShowFile}
          disabled={isLoading || !downloadUrl}
          startIcon={isLoading ? <CircularProgress size={20} /> : <Visibility />}
          variant="outlined"
          className="view-file-button"
          sx={{
            width: "35vw",
            flex: "1 1 auto",
            borderColor: "#10a37f",
            color: "#10a37f",
            "&:hover": { borderColor: "#0e8a6c", bgcolor: "rgba(16, 163, 127, 0.04)" },
          }}
        >
          {isLoading ? "טוען..." : "צפה בקובץ"}
        </Button>
        <Button
          onClick={downloadFile}
          disabled={isLoading || !downloadUrl}
          startIcon={isLoading ? <CircularProgress size={20} /> : <Download />}
          variant="contained"
          className="download-file-button"
          sx={{
            width: "35vw",
            flex: "1 1 auto",
            bgcolor: "#10a37f",
            "&:hover": { bgcolor: "#0e8a6c" },
          }}
        >
          {isLoading ? "טוען..." : "הורד קובץ"}
        </Button>
      </Box>

      {error && (
        <Alert
          severity={error.startsWith("✅") ? "success" : "error"}
          className="message-box"
          sx={{ width: "100%", marginBottom: 2 }}
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
          },
        }}
      >
        <Box
          className="file-preview-header"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6" className="file-name">
            📄 {fileName}
          </Typography>
          <Button onClick={closeViewer} className="close-button" startIcon={<Close />} variant="text">
            סגור
          </Button>
        </Box>
        <Box className="file-preview-content" sx={{ flex: 1, overflow: "auto", padding: 2 }}>
          {renderFilePreview()}
        </Box>
      </Dialog>
    </Box>
  )
}

// Helper function to get cookie value
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

export default FileViewer