"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Divider,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material"
import type { MeetingDTO } from "../../models/meetingTypes"
import { updateMeeting } from "../../services/meetingService"
import CloseIcon from "@mui/icons-material/Close"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import TitleIcon from "@mui/icons-material/Title"
import LinkIcon from "@mui/icons-material/Link"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import SaveIcon from "@mui/icons-material/Save"

interface UpdateMeetingDialogProps {
  open: boolean
  handleClose: () => void
  meeting: MeetingDTO
  onUpdate: (updatedMeeting: MeetingDTO) => void
}

export default function UpdateMeetingDialog({ open, handleClose, meeting, onUpdate }: UpdateMeetingDialogProps) {
  const [formData, setFormData] = useState({ ...meeting })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError(null)
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      setError(null)
      const updatedMeeting = await updateMeeting(meeting.id, formData)
      if (updatedMeeting) {
        onUpdate(updatedMeeting)
        handleClose()
      }
    } catch (err) {
      setError("שגיאה בעדכון הפגישה. אנא נסה שוב.")
      console.error("Error updating meeting:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
          background: "rgba(248, 250, 252, 0.8)",
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={600}>
            עדכון פגישה
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ערוך את פרטי הפגישה
          </Typography>
        </Box>
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 2, pb: 1 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="שם הפגישה"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
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

          <TextField
            label="תאריך הפגישה"
            name="date"
            type="datetime-local"
            fullWidth
            value={formData.date}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
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

          <TextField
            label="קישור לקובץ תמלול"
            name="linkTranscriptFile"
            fullWidth
            value={formData.linkTranscriptFile || ""}
            onChange={handleChange}
            placeholder="https://example.com/transcript.txt"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                height: 48,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="קישור לקובץ מקור"
            name="linkOrinignFile"
            fullWidth
            value={formData.linkOrinignFile || ""}
            onChange={handleChange}
            placeholder="https://example.com/original.docx"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                height: 48,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachFileIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, background: "rgba(248, 250, 252, 0.5)" }}>
        <Button
          onClick={handleClose}
          color="inherit"
          sx={{
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 1,
            px: 2,
          }}
        >
          ביטול
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} /> : <SaveIcon />}
          sx={{
            background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
            color: "white",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 1,
            px: 3,
            "&:hover": {
              background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
            },
          }}
        >
          {isSubmitting ? "מעדכן..." : "עדכן פגישה"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
