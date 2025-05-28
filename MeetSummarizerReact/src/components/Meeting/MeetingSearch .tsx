

"use client"

import { TextField, Box, InputAdornment, Paper, IconButton, Tooltip, Fade, Container } from "@mui/material"
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
    <Box
      sx={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        py: 2,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <Box mb={4}>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "70vw",
              borderRadius: 4,
              border: "2px solid transparent",
              overflow: "hidden",
              transition: "all 0.3s ease",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
              "&:hover": {
                borderColor: "#10a37f",
                boxShadow: "0 12px 40px rgba(16, 163, 127, 0.15)",
                transform: "translateY(-2px)",
              },
              "&:focus-within": {
                borderColor: "#10a37f",
                boxShadow: "0 16px 48px rgba(16, 163, 127, 0.2)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <InputAdornment position="start" sx={{ pl: 4 }}>
              <SearchIcon
                sx={{
                  color: searchValue ? "#10a37f" : "text.secondary",
                  transition: "color 0.3s ease",
                  fontSize: 28,
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
                px: 3,
                "& .MuiInput-root": {
                  border: "none",
                  "&:before, &:after": {
                    display: "none",
                  },
                },
                "& .MuiInputBase-input": {
                  py: 3,
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  "&::placeholder": {
                    color: "text.secondary",
                    opacity: 0.7,
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
                        size="large"
                        onClick={handleClear}
                        sx={{
                          mr: 2,
                          color: "text.secondary",
                          "&:hover": {
                            color: "#10a37f",
                            backgroundColor: "rgba(16, 163, 127, 0.1)",
                          },
                        }}
                      >
                        <CloseIcon />
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
