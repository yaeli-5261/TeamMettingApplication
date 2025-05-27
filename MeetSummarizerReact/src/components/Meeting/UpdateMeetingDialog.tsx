// "use client"

// import type React from "react"

// import { useState } from "react"
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Button,
//   IconButton,
//   InputAdornment,
//   Typography,
//   Divider,
//   Alert,
//   CircularProgress,
// } from "@mui/material"
// import type { MeetingDTO } from "../../models/meetingTypes"
// import { updateMeeting } from "../../services/meetingService"
// import CloseIcon from "@mui/icons-material/Close"
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
// import TitleIcon from "@mui/icons-material/Title"
// import LinkIcon from "@mui/icons-material/Link"
// import AttachFileIcon from "@mui/icons-material/AttachFile"
// import SaveIcon from "@mui/icons-material/Save"

// interface UpdateMeetingDialogProps {
//   open: boolean
//   handleClose: () => void
//   meeting: MeetingDTO
//   onUpdate: (updatedMeeting: MeetingDTO) => void
// }

// export default function UpdateMeetingDialog({ open, handleClose, meeting, onUpdate }: UpdateMeetingDialogProps) {
//   const [formData, setFormData] = useState({ ...meeting })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//     if (error) setError(null)
//   }

//   const handleSubmit = async () => {
//     try {
//       setIsSubmitting(true)
//       setError(null)
//       const updatedMeeting = await updateMeeting(meeting.id, formData)
//       if (updatedMeeting) {
//         onUpdate(updatedMeeting)
//         handleClose()
//       }
//     } catch (err) {
//       setError("שגיאה בעדכון הפגישה. אנא נסה שוב.")
//       console.error("Error updating meeting:", err)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       fullWidth
//       maxWidth="sm"
//       PaperProps={{
//         sx: {
//           borderRadius: 2,
//           boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//         },
//       }}
//     >
//       <DialogTitle
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           pb: 1,
//         }}
//       >
//         <Typography variant="h6" fontWeight={600}>
//           עדכון פגישה
//         </Typography>
//         <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" size="small">
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>

//       <Divider />

//       <DialogContent sx={{ pt: 3 }}>
//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error}
//           </Alert>
//         )}

//         <TextField
//           margin="dense"
//           label="שם הפגישה"
//           name="name"
//           fullWidth
//           value={formData.name}
//           onChange={handleChange}
//           required
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <TitleIcon fontSize="small" />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ mb: 2 }}
//         />

//         <TextField
//           margin="dense"
//           label="תאריך הפגישה"
//           name="date"
//           type="datetime-local"
//           fullWidth
//           value={formData.date}
//           onChange={handleChange}
//           required
//           InputLabelProps={{ shrink: true }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <CalendarTodayIcon fontSize="small" />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ mb: 2 }}
//         />

//         <TextField
//           margin="dense"
//           label="קישור לקובץ תמלול"
//           name="linkTranscriptFile"
//           fullWidth
//           value={formData.linkTranscriptFile || ""}
//           onChange={handleChange}
//           placeholder="https://example.com/transcript.txt"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <LinkIcon fontSize="small" />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ mb: 2 }}
//         />

//         <TextField
//           margin="dense"
//           label="קישור לקובץ מקור"
//           name="linkOrinignFile"
//           fullWidth
//           value={formData.linkOrinignFile || ""}
//           onChange={handleChange}
//           placeholder="https://example.com/original.docx"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <AttachFileIcon fontSize="small" />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </DialogContent>

//       <DialogActions sx={{ px: 3, py: 2 }}>
//         <Button
//           onClick={handleClose}
//           color="inherit"
//           sx={{
//             textTransform: "none",
//             fontWeight: 500,
//           }}
//         >
//           ביטול
//         </Button>
//         <Button
//           onClick={handleSubmit}
//           variant="contained"
//           disabled={isSubmitting}
//           startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
//           sx={{
//             bgcolor: "#1a1a1a",
//             color: "white",
//             textTransform: "none",
//             fontWeight: 500,
//             "&:hover": {
//               bgcolor: "#2c2c2c",
//             },
//           }}
//         >
//           {isSubmitting ? "מעדכן..." : "עדכן פגישה"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }



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
          borderRadius: 1,
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          height: "500px",
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
          height: "60px",
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: "0.9rem" }}>
            Update Meeting
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
            Edit meeting details
          </Typography>
        </Box>
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" size="small">
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 1.5, pb: 1, height: "calc(100% - 120px)", overflow: "auto" }}>
        {error && (
          <Alert severity="error" sx={{ mb: 1.5, borderRadius: 1, fontSize: "0.7rem" }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <TextField
            label="Meeting Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                height: 36,
                fontSize: "0.75rem",
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.75rem",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleIcon sx={{ fontSize: 12 }} />
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
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                height: 36,
                fontSize: "0.75rem",
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.75rem",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon sx={{ fontSize: 12 }} />
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
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                height: 36,
                fontSize: "0.75rem",
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.75rem",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon sx={{ fontSize: 12 }} />
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
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                height: 36,
                fontSize: "0.75rem",
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.75rem",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachFileIcon sx={{ fontSize: 12 }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 2, py: 1.5, background: "rgba(248, 250, 252, 0.5)", height: "60px" }}>
        <Button
          onClick={handleClose}
          color="inherit"
          sx={{
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 1,
            px: 2,
            fontSize: "0.75rem",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={12} /> : <SaveIcon sx={{ fontSize: 12 }} />}
          sx={{
            background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
            color: "white",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 1,
            px: 2.5,
            fontSize: "0.75rem",
            "&:hover": {
              background: "linear-gradient(135deg, #0e8a6c 0%, #0284c7 100%)",
            },
          }}
        >
          {isSubmitting ? "Updating..." : "Update Meeting"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
