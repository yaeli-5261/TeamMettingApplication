"use client"

import { TextField, Box, InputAdornment, Paper, IconButton, Tooltip, Fade, Container } from "@mui/material"
import { type ChangeEvent, useState } from "react"
import { Search, X } from "lucide-react"

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
    <Box
      sx={{
        background: "linear-gradient(135deg, #f7f9fc 0%, #eef2f7 100%)",
        py: 3,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <Box mb={4} display="flex" justifyContent="center">
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", sm: "500px", md: "600px" },
              borderRadius: 3,
              border: "1px solid",
              borderColor: "rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
              transition: "all 0.3s ease",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              "&:hover": {
                borderColor: "#10b981",
                boxShadow: "0 8px 30px rgba(16, 185, 129, 0.15)",
                transform: "translateY(-1px)",
              },
              "&:focus-within": {
                borderColor: "#10b981",
                boxShadow: "0 8px 30px rgba(16, 185, 129, 0.2)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <InputAdornment position="start" sx={{ pl: 3 }}>
              <Search size={20} color={searchValue ? "#10b981" : "#6b7280"} style={{ transition: "color 0.3s ease" }} />
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
                  py: 2.5,
                  fontSize: "1rem",
                  fontWeight: 500,
                  "&::placeholder": {
                    color: "#6b7280",
                    opacity: 0.8,
                    fontWeight: 400,
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
                          color: "#6b7280",
                          "&:hover": {
                            color: "#10b981",
                            backgroundColor: "rgba(16, 185, 129, 0.1)",
                          },
                        }}
                      >
                        <X size={18} />
                      </IconButton>
                    </Tooltip>
                  </Fade>
                ) : null,
              }}
            />
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}
