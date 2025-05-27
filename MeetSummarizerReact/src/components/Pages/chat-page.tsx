"use client"

import { Box, Container, Typography, Paper, Avatar } from "@mui/material"
import { motion } from "framer-motion"
import { Chat as ChatIcon } from "@mui/icons-material"
import TeamChat from "../chat/chat-message"

export default function ChatPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        py: 2,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                  mx: "auto",
                  mb: 3,
                  boxShadow: "0 8px 24px rgba(16, 163, 127, 0.3)",
                }}
              >
                <ChatIcon sx={{ fontSize: 40, color: "white" }} />
              </Avatar>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #10a37f 0%, #0ea5e9 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                Team Chat
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  maxWidth: 600,
                  mx: "auto",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                Communicate with your team members in real-time
              </Typography>
            </motion.div>
          </Box>

          {/* Chat Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                overflow: "hidden",
                height: "calc(100vh - 200px)",
              }}
            >
              <TeamChat />
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  )
}
