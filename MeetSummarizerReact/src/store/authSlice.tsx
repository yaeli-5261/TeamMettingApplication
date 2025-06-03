import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { User } from "../models/user"

const apiUrl = import.meta.env.VITE_API_URL
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL)

export const signIn = createAsyncThunk("Auth/login", async (user: { email: string; password: string }, thunkAPI) => {
  console.log("signIn called with user:", user)

  try {
    const res = await axios.post(
      `${apiUrl}/Auth/login`,
      {
        Email: user.email,
        Password: user.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    // שמירת הטוקן ב-cookie עם תאריך תפוגה ארוך (30 ימים)
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30)
    document.cookie = `auth_token=${res.data.Token}; path=/; expires=${expirationDate.toUTCString()}; secure; samesite=strict;`

    // שמירת נתוני המשתמש ב-localStorage וב-sessionStorage
    localStorage.setItem("user", JSON.stringify(res.data.user || res.data))
    sessionStorage.setItem("user", JSON.stringify(res.data.user || res.data))

    return res.data
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to sign in")
  }
})

// פעולה לבדיקת מצב המשתמש ושחזור הסשן
export const checkAuthState = createAsyncThunk("Auth/checkState", async (_, thunkAPI) => {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1]
    // if (!token) {
    //   return thunkAPI.rejectWithValue("No valid token found")
    // }

    const sessionUser = sessionStorage.getItem("user")
    if (sessionUser) {
      return JSON.parse(sessionUser)
    }

    const localUser = localStorage.getItem("user")
    if (localUser) {
      const userData = JSON.parse(localUser)
      sessionStorage.setItem("user", localUser)
      return userData
    }

    return thunkAPI.rejectWithValue("No user data found")
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message || "Failed to check auth state")
  }
})

// טעינת משתמש מה-Session Storage אם קיים
const loadUserFromSession = (): User | null => {
  try {
    const userData = sessionStorage.getItem("user")
    if (userData) {
      return JSON.parse(userData)
    }

    // אם אין נתונים ב-sessionStorage, בדוק ב-localStorage
    const localData = localStorage.getItem("user")
    if (localData) {
      // העתק את הנתונים ל-sessionStorage
      sessionStorage.setItem("user", localData)
      return JSON.parse(localData)
    }

    return null
  } catch (error) {
    console.error("Error loading user from session:", error)
    return null
  }
}

// יצירת Slice לניהול המצב של המשתמש
const authSlice = createSlice({
  name: "Auth",
  initialState: {
    user: loadUserFromSession(), // טעינת המשתמש מה-storage בעת האתחול
    loading: false,
    error: "",
  },
  reducers: {
    logout: (state) => {
      state.user = null
      sessionStorage.removeItem("user")
      localStorage.removeItem("user")
      // מחיקת הטוקן מה-cookie
      document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict;"
    },
  },
  extraReducers: (builder) => {
    builder
      // signIn cases
      .addCase(signIn.pending, (state) => {
        state.loading = true
        state.error = ""
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.loading = false
        state.user = action.payload.user || action.payload
        sessionStorage.setItem("user", JSON.stringify(state.user))
        localStorage.setItem("user", JSON.stringify(state.user))
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // checkAuthState cases
      .addCase(checkAuthState.pending, (state) => {
        state.loading = true
        state.error = ""
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        sessionStorage.setItem("user", JSON.stringify(action.payload))
      })
      .addCase(checkAuthState.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.user = null
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice
