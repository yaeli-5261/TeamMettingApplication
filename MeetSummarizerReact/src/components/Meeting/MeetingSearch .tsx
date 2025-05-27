// "use client"

// import { TextField, Box, InputAdornment, Paper, IconButton, Tooltip } from "@mui/material"
// import { type ChangeEvent, useState } from "react"
// import SearchIcon from "@mui/icons-material/Search"
// import CloseIcon from "@mui/icons-material/Close"

// interface MeetingSearchProps {
//   onSearch: (query: string) => void
// }

// export default function MeetingSearch({ onSearch }: MeetingSearchProps) {
//   const [searchValue, setSearchValue] = useState("")

//   const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value
//     setSearchValue(value)
//     onSearch(value)
//   }

//   const handleClear = () => {
//     setSearchValue("")
//     onSearch("")
//   }

//   return (
//     <Box mb={3}>
//       <Paper
//         elevation={0}
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           width: "100%",
//           border: "1px solid",
//           borderColor: "divider",
//           borderRadius: 2,
//           overflow: "hidden",
//           transition: "all 0.2s",
//           "&:hover": {
//             borderColor: "primary.main",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//           },
//           "&:focus-within": {
//             borderColor: "primary.main",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//           },
//         }}
//       >
//         <InputAdornment position="start" sx={{ pl: 2 }}>
//           <SearchIcon color="action" />
//         </InputAdornment>
//         <TextField
//           placeholder="חפש פגישה לפי שם"
//           value={searchValue}
//           onChange={handleSearch}
//           variant="standard"
//           fullWidth
//           sx={{
//             px: 1,
//             "& .MuiInput-root": {
//               border: "none",
//               "&:before, &:after": {
//                 display: "none",
//               },
//             },
//             "& .MuiInputBase-input": {
//               py: 1.5,
//             },
//           }}
//           InputProps={{
//             disableUnderline: true,
//             endAdornment: searchValue ? (
//               <Tooltip title="נקה חיפוש">
//                 <IconButton size="small" onClick={handleClear} sx={{ mr: 0.5 }}>
//                   <CloseIcon fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//             ) : null,
//           }}
//         />
//       </Paper>
//     </Box>
//   )
// }



"use client"

import { TextField, Box, InputAdornment, Paper, IconButton, Tooltip, Fade } from "@mui/material"
import { type ChangeEvent, useState } from "react"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"

interface MeetingSearchProps {
  onSearch: (query: string) => void
}

export default function MeetingSearch({ onSearch }: MeetingSearchProps) {
  const [searchValue, setSearchValue] = useState("")

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchValue(value)
    onSearch(value)
  }

  const handleClear = () => {
    setSearchValue("")
    onSearch("")
  }

  return (
    <Box mb={3}>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
          transition: "all 0.3s ease",
          background: "white",
          "&:hover": {
            borderColor: "#10a37f",
            boxShadow: "0 4px 12px rgba(16, 163, 127, 0.15)",
          },
          "&:focus-within": {
            borderColor: "#10a37f",
            boxShadow: "0 4px 16px rgba(16, 163, 127, 0.2)",
            transform: "translateY(-1px)",
          },
        }}
      >
        <InputAdornment position="start" sx={{ pl: 3 }}>
          <SearchIcon
            sx={{
              color: searchValue ? "#10a37f" : "text.secondary",
              transition: "color 0.2s ease",
            }}
          />
        </InputAdornment>
        <TextField
          placeholder="Search meetings by name..."
          value={searchValue}
          onChange={handleSearch}
          variant="standard"
          fullWidth
          sx={{
            px: 2,
            "& .MuiInput-root": {
              border: "none",
              "&:before, &:after": {
                display: "none",
              },
            },
            "& .MuiInputBase-input": {
              py: 2,
              fontSize: "1rem",
              "&::placeholder": {
                color: "text.secondary",
                opacity: 0.7,
              },
            },
          }}
          InputProps={{
            disableUnderline: true,
            endAdornment: searchValue ? (
              <Fade in={Boolean(searchValue)}>
                <Tooltip title="Clear search">
                  <IconButton
                    size="small"
                    onClick={handleClear}
                    sx={{
                      mr: 1,
                      color: "text.secondary",
                      "&:hover": {
                        color: "#10a37f",
                        backgroundColor: "rgba(16, 163, 127, 0.1)",
                      },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Fade>
            ) : null,
          }}
        />
      </Paper>
    </Box>
  )
}
