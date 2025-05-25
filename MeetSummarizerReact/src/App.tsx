import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import {  Provider, useDispatch } from "react-redux";
import  store, { AppDispatch } from "./store/store";
import { checkAuthState } from "./store/authSlice";
import { useEffect } from "react";
import AppLayout from "./components/Layout";
import HomePage from "./components/Pages/HomePage";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#10a37f",
    },
    background: {
      default: "#f7f7f8",
      paper: "#ffffff",
    },
    text: {
      primary: "#202123",
      secondary: "#6e6e80",
    },
    divider: "rgba(0, 0, 0, 0.1)",
  },
  typography: {
    fontFamily: '"Söhne", "Helvetica Neue", Helvetica, Arial, sans-serif',
    h4: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", fontWeight: 500 } },
    },
    MuiPaper: {
      styleOverrides: {
        root: { boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)" },
      },
    },
  },
});

function AppInner() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppInner />
      </ThemeProvider>
    </Provider>
  );
}

export default App


