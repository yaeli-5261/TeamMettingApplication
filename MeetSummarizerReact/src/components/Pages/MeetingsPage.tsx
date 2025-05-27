// import { useEffect, useState } from "react";
// import MeetingList from "../Meeting/MeetingList";
// import { Box, Typography } from "@mui/material";
// import { MeetingDTO } from "../../models/meetingTypes";
// //TODO: change to store...
// import { fetchMeetingsByTeam } from "../../services/meetingService";

// const MeetingsPage = () => {
//   const [meetings, setMeetings] = useState<MeetingDTO[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadMeetings = async () => {
//       setLoading(true);
//       const data = await fetchMeetingsByTeam();
//       setMeetings(data);
//       setLoading(false);
//     };
//     loadMeetings();
//   }, []);

//   return (
//     <Box sx={{ py: 4 }}>
//       <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
//         ניהול ישיבות
//       </Typography>
//       {loading ? (
//         <Typography variant="h6" align="center" color="textSecondary">
//           טוען ישיבות...
//         </Typography>
//       ) : (
//         <MeetingList meetings={meetings} />
//       )}
//     </Box>
//   );
// };

// export default MeetingsPage;












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
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            Meeting Management
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
            Organize, track, and manage all your meetings in one place
          </Typography>
        </Box>

        {loading ? (
          <Typography variant="h6" align="center" color="text.secondary">
            Loading meetings...
          </Typography>
        ) : (
          <MeetingList meetings={meetings} />
        )}
      </Container>
    </Box>
  )
}

export default MeetingsPage
