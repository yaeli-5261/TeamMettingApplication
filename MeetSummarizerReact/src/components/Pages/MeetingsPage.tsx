// "use client"

// import { useEffect, useState } from "react"
// import MeetingList from "../Meeting/MeetingList"
// import { Box, Typography, Container } from "@mui/material"
// import type { MeetingDTO } from "../../models/meetingTypes"
// import { fetchMeetingsByTeam } from "../../services/meetingService"

// const MeetingsPage = () => {
//   const [meetings, setMeetings] = useState<MeetingDTO[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const loadMeetings = async () => {
//       setLoading(true)
//       const data = await fetchMeetingsByTeam()
//       setMeetings(data)
//       setLoading(false)
//     }
//     loadMeetings()
//   }, [])

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
//         py: 4,
//       }}
//     >
//       <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
//         <Box sx={{ textAlign: "center", mb: 6 }}>
//           <Typography
//             variant="h3"
//             component="h1"
//             sx={{
//               fontWeight: 800,
//               background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               mb: 2,
//             }}
//           >
//             Meeting Management
//           </Typography>
//           <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
//             Organize, track, and manage all your meetings in one place
//           </Typography>
//         </Box>

//         {loading ? (
//           <Typography variant="h6" align="center" color="text.secondary">
//             Loading meetings...
//           </Typography>
//         ) : (
//           <MeetingList meetings={meetings} />
//         )}
//       </Container>
//     </Box>
//   )
// }

// export default MeetingsPage








"use client"

import { useEffect, useState } from "react"
import MeetingList from "../Meeting/MeetingList"
import { Box, Typography, Container } from "@mui/material"
import type { MeetingDTO } from "../../models/meetingTypes"
import { fetchMeetingsByTeam } from "../../services/meetingService"

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState<MeetingDTO[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMeetings = async () => {
      setLoading(true)
      const data = await fetchMeetingsByTeam()
      setMeetings(data)
      setLoading(false)
    }
    loadMeetings()
  }, [])

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 900,
              background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
              fontSize: { xs: "2.5rem", md: "4rem" },
            }}
          >
            Meeting Management
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: "auto",
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Organize, track, and manage all your meetings in one centralized platform
          </Typography>
        </Box>

        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: 4,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            p: { xs: 3, md: 6 },
          }}
        >
          {loading ? (
            <Typography variant="h5" align="center" color="text.secondary" sx={{ py: 8 }}>
              Loading meetings...
            </Typography>
          ) : (
            <MeetingList meetings={meetings} />
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default MeetingsPage
