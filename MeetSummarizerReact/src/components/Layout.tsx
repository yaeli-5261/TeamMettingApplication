// // "use client"

// // import type React from "react"
// // import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material"
// // import { useState } from "react"
// // import AppFooter from "./Pages/app-footer"
// // import AppSidebar from "./Pages/app-sidebar"


// // interface LayoutProps {
// //   children: React.ReactNode
// // }

// // export default function Layout({ children }: LayoutProps) {
// //   const theme = useTheme()
// //   const isMobile = useMediaQuery(theme.breakpoints.down("md"))
// //   const [mobileOpen, setMobileOpen] = useState(false)

// //   const handleDrawerToggle = () => {
// //     setMobileOpen(!mobileOpen)
// //   }

// //   return (
// //     <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
// //       <CssBaseline />

// //       {/* Main layout container */}
// //       <Box sx={{ display: "flex", flexGrow: 1 }}>
// //         {/* Sidebar */}
// //         <AppSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

// //         {/* Main content */}
// //         <Box
// //           component="main"
// //           sx={{
// //             flexGrow: 1,
// //             width: "100%",
// //             ml: { xs: 0, md: "280px" },
// //             display: "flex",
// //             flexDirection: "column",
// //             minHeight: "100vh",
// //             background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
// //           }}
// //         >
// //           {/* Content wrapper */}
// //           <Box
// //             sx={{
// //               flexGrow: 1,
// //               p: { xs: 2, md: 4 },
// //               pb: { xs: 10, md: 12 },
// //               width: "100%",
// //               maxWidth: "100%",
// //               boxSizing: "border-box",
// //             }}
// //           >
// //             {children}
// //           </Box>

// //           {/* Footer */}
// //           <AppFooter />
// //         </Box>
// //       </Box>
// //     </Box>
// //   )
// // }








// "use client"

// import type React from "react"
// import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material"
// import { useState } from "react"
// import AppFooter from "./Pages/app-footer"
// import AppSidebar from "./Pages/app-sidebar"


// interface LayoutProps {
//   children: React.ReactNode
// }

// export default function Layout({ children }: LayoutProps) {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))
//   const [mobileOpen, setMobileOpen] = useState(false)

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen)
//   }

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
//       <CssBaseline />

//       {/* Main layout container */}
//       <Box sx={{ display: "flex", flexGrow: 1 }}>
//         {/* Sidebar */}
//         <AppSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

//         {/* Main content */}
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             width: "100%",
//             ml: { xs: 0, md: "280px" },
//             display: "flex",
//             flexDirection: "column",
//             minHeight: "100vh",
//             background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
//           }}
//         >
//           {/* Content wrapper - Full width for all components */}
//           <Box
//             sx={{
//               flexGrow: 1,
//               width: "100%",
//               maxWidth: "100%",
//               boxSizing: "border-box",
//             }}
//           >
//             {children}
//           </Box>

//           {/* Footer */}
//           <AppFooter />
//         </Box>
//       </Box>
//     </Box>
//   )
// }







"use client"

import type React from "react"
import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material"
import { useState } from "react"
import { AppSidebar } from "./Pages/sideBar"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      <CssBaseline />

      {/* Sidebar */}
      <AppSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          ml: { xs: 0, md: "280px" },
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      >
        {/* Content wrapper - Full screen */}
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            height: "100%",
            overflow: "auto",
            boxSizing: "border-box",
          }}
        >
          {children}
        </Box>

        {/* Footer - only show if needed */}
        {/* <AppFooter /> */}
      </Box>
    </Box>
  )
}
