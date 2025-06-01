"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Box, Typography, Alert, CircularProgress, alpha, Card, CardContent } from "@mui/material"
import { FileText } from "lucide-react"

interface InlineFileViewerProps {
  filePath: string
  fileName: string
  isAiGenerated?: boolean
  getDownloadUrl?: (s3Key: string) => Promise<string>
  maxHeight?: string
}

const InlineFileViewer = ({
  filePath,
  fileName,
  isAiGenerated = false,
  getDownloadUrl,
  maxHeight = "350px",
}: InlineFileViewerProps) => {
  const apiUrl = import.meta.env.VITE_API_URL

  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [docxHtml, setDocxHtml] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fileType = fileName.split(".").pop()?.toLowerCase() || ""

  // Helper function to get cookie
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

  useEffect(() => {
    if (filePath) {
      getFileDownloadUrl()
    }
  }, [filePath, isAiGenerated, getDownloadUrl])

  const getFileDownloadUrl = async () => {
    try {
      setIsLoading(true)
      setError(null)

      console.log("🔍 Loading file:", { filePath, isAiGenerated, fileName })

      if (isAiGenerated && filePath && getDownloadUrl) {
        console.log("📄 Processing AI file with custom getDownloadUrl")
        const validUrl = await getDownloadUrl(filePath)
        console.log("✅ AI file URL received:", validUrl)
        setDownloadUrl(validUrl)
        await loadFileContent(validUrl)
        return
      }

      if (!filePath) {
        setError("File path is missing")
        setIsLoading(false)
        return
      }

      console.log("📄 Processing regular file")
      const response = await axios.get(`${apiUrl}/upload/download-url`, {
        params: { fileName: filePath },
        headers: { Authorization: `Bearer ${getCookie("auth_token")}` },
      })

      console.log("✅ Regular file URL received:", response.data.downloadUrl)
      setDownloadUrl(response.data.downloadUrl)
      await loadFileContent(response.data.downloadUrl)
    } catch (error) {
      console.error("❌ Error getting download link:", error)
      setError("שגיאה בטעינת הקובץ")
      setIsLoading(false)
    }
  }

  const loadFileContent = async (url: string) => {
    try {
      console.log("📥 Loading file content from:", url)

      const fileResponse = await axios.get(url, {
        responseType: "arraybuffer",
        timeout: 30000,
      })

      console.log("✅ File content loaded successfully")

      if (fileType === "docx") {
        try {
          const mammoth = await import("mammoth")
          const { value } = await mammoth.convertToHtml({ arrayBuffer: fileResponse.data })
          setDocxHtml(value)
          console.log("✅ DOCX converted to HTML")
        } catch (err) {
          console.error("❌ Error converting DOCX:", err)
          setError("שגיאה בהמרת קובץ DOCX")
        }
      }

      const blobUrl = window.URL.createObjectURL(
        new Blob([fileResponse.data], {
          type: getMimeType(fileType),
        }),
      )

      setFileUrl(blobUrl)
      console.log("✅ Blob URL created:", blobUrl)
    } catch (error) {
      console.error("❌ Error loading file content:", error)
      setError("שגיאה בטעינת תוכן הקובץ")
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

  const renderFileContent = () => {
    if (isLoading) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: maxHeight,
            textAlign: "center",
          }}
        >
          <CircularProgress size={40} sx={{ mb: 2, color: "#10a37f" }} />
          <Typography variant="body2" color="text.secondary">
            טוען קובץ...
          </Typography>
        </Box>
      )
    }

    if (error) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: maxHeight,
            p: 2,
          }}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Box>
      )
    }

    if (!fileUrl) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: maxHeight,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: alpha("#10a37f", 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <FileText size={30} color="#10a37f" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            לא ניתן להציג תצוגה מקדימה
          </Typography>
        </Box>
      )
    }

    // הצגת הקובץ המלא בגודל קטן
    if (fileType === "pdf") {
      return (
        <Box
          sx={{
            height: maxHeight,
            overflow: "hidden",
            borderRadius: "8px",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <iframe
            src={fileUrl}
            width="100%"
            height="100%"
            title="PDF Preview"
            style={{
              border: "none",
              transform: "scale(0.9)",
              transformOrigin: "top left",
              width: "111%",
              height: "111%",
            }}
          />
        </Box>
      )
    } else if (fileType === "docx" && docxHtml) {
      return (
        <Box
          sx={{
            height: maxHeight,
            overflow: "auto",
            p: 2,
            fontSize: "0.8rem",
            lineHeight: 1.4,
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "8px",
            backgroundColor: "#fff",
            "& img": { maxWidth: "100%", height: "auto" },
            "& table": { width: "100%", borderCollapse: "collapse", fontSize: "0.7rem" },
            "& td, & th": { border: "1px solid #ddd", padding: "4px" },
            "& p": { margin: "4px 0" },
            "& h1, & h2, & h3": { fontSize: "1rem", margin: "8px 0 4px 0" },
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: docxHtml }} />
        </Box>
      )
    } else if (["jpg", "jpeg", "png", "gif"].includes(fileType)) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: maxHeight,
            overflow: "hidden",
            borderRadius: "8px",
            border: "1px solid rgba(0,0,0,0.1)",
            backgroundColor: "#f5f5f5",
          }}
        >
          <img
            src={fileUrl || "/placeholder.svg"}
            alt={fileName}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: "4px",
            }}
          />
        </Box>
      )
    } else {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: maxHeight,
            textAlign: "center",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Box
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: alpha("#10a37f", 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <FileText size={30} color="#10a37f" />
          </Box>
          <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
            {fileName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            לחץ "צפה בקובץ" לפתיחה
          </Typography>
        </Box>
      )
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
        height: `calc(${maxHeight} + 50px)`,
      }}
    >
      <CardContent sx={{ p: 0, height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid",
            borderColor: "rgba(0, 0, 0, 0.06)",
            backgroundColor: alpha("#10a37f", 0.02),
            minHeight: "50px",
          }}
        >
          <FileText size={18} style={{ marginLeft: "8px" }} color="#10a37f" />
          <Typography variant="subtitle2" fontWeight={600}>
            תצוגה מקדימה: {fileName}
          </Typography>
        </Box>
        <Box sx={{ height: maxHeight, p: 1 }}>{renderFileContent()}</Box>
      </CardContent>
    </Card>
  )
}

export default InlineFileViewer
