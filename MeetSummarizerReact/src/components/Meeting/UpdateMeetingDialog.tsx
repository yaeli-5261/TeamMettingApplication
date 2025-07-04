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

import { X, Calendar, Type, Link, FileText, Save } from "lucide-react"
import { MeetingDTO } from "../../models/meetingTypes"
import { updateMeeting } from "../../services/meetingService"

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
      setError("Error updating meeting. Please try again.")
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
          borderRadius: 3,
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 2,
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={600}>
            Update Meeting
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Edit meeting details and information
          </Typography>
        </Box>
        <IconButton edge="end" color="inherit" onClick={handleClose}>
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Meeting Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Type size={18} color="#6b7280" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Meeting Date"
            name="date"
            type="datetime-local"
            fullWidth
            value={formData.date}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Calendar size={18} color="#6b7280" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Transcript File Link"
            name="linkTranscriptFile"
            fullWidth
            value={formData.linkTranscriptFile || ""}
            onChange={handleChange}
            placeholder="https://example.com/transcript.txt"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Link size={18} color="#6b7280" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Original File Link"
            name="linkOrinignFile"
            fullWidth
            value={formData.linkOrinignFile || ""}
            onChange={handleChange}
            placeholder="https://example.com/original.docx"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FileText size={18} color="#6b7280" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 3, background: "rgba(248, 250, 252, 0.5)" }}>
        <Button
          onClick={handleClose}
          color="inherit"
          sx={{
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 2,
            px: 3,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} /> : <Save size={16} />}
          sx={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "white",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 4,
            "&:hover": {
              background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
            },
          }}
        >
          {isSubmitting ? "Updating..." : "Update Meeting"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
