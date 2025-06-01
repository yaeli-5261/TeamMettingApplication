import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { User } from "../models/user"

const apiUrl = import.meta.env.VITE_API_URL;
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

export const signIn = createAsyncThunk("Auth/login", async (user: { email: string; password: string }, thunkAPI) => {
  console.log("signIn called with user:", user);
  
  try {
    const res = await axios.post(`${apiUrl}/Auth/login`, {//הנה הקריאה
      Email: user.email,
      Password: user.password,
    },{
      headers: {
        'Content-Type': 'application/json'
      }})
    console.log("FULL RES:", res) // שימי לב לפה!
    console.log("Login response:", res.data.User);
    console.log("Login Token:", res.data.Token);


    // שמירת הטוקן ב-cookie עם תאריך תפוגה ארוך (30 ימים)
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30)
    document.cookie = `auth_token=${res.data.Token}; path=/; expires=${expirationDate.toUTCString()}; secure; samesite=strict;`

    return res.data
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to sign in")
  }
})

// פעולה לרישום משתמש חדש
export const signUp = createAsyncThunk(
  "Auth/register",
  async (user: { userName: string; email: string; password: string; role: string }, thunkAPI) => {
    try {
      const res = await axios.post(`${apiUrl}/Auth/register`, {
        userName: user.userName,
        Email: user.email,
        Password: user.password,
        role: user.role,
      })

      // שמירת הטוקן ב-cookie עם תאריך תפוגה ארוך (30 ימים)
      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 30)
      document.cookie = `auth_token=${res.data.token}; path=/; expires=${expirationDate.toUTCString()}; secure; samesite=strict;`

      return res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to sign up")
    }
  },
)

// פעולה לבדיקת מצב המשתמש ושחזור הסשן
export const checkAuthState = createAsyncThunk("Auth/checkState", async (_, thunkAPI) => {
  try {
    const token = document.cookie.split("; ").find((row) => row.startsWith("auth_token="))?.split("=")[1];
    if (!token) {
      return thunkAPI.rejectWithValue("No valid token found");
    }

    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      return JSON.parse(sessionUser);
    }

    const localUser = localStorage.getItem("user");
    if (localUser) {
      const userData = JSON.parse(localUser);
      sessionStorage.setItem("user", localUser);
      return userData;
    }

    return thunkAPI.rejectWithValue("No user data found");
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message || "Failed to check auth state");
  }
});

// טעינת משתמש מה-Session Storage אם קיים
const loadUserFromSession = (): User | null => {
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
}

// יצירת Slice לניהול המצב של המשתמש
const authSlice = createSlice({
  name: "Auth",
  initialState: {
    user: null as User | null, // Ensure user is either null or a valid User object
    loading: false,
    error: "",
  },
  reducers: {
    logout: (state) => {
      state.user = null; // Reset user to null on logout
      sessionStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.loading = false;
        state.user = action.payload.user;
        sessionStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions
export default authSlice

