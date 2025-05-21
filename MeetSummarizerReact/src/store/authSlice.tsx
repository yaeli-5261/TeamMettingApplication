// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { User } from "../models/user";



// const API_URL = "https://localhost:7214/api/Auth";

// // פעולה להתחברות
// export const signIn = createAsyncThunk(
//     "Auth/login",
//     async (user: { email: string; password: string }, thunkAPI) => {
//         try {
//             const res = await axios.post(`${API_URL}/login`, {
//                 email: user.email,
//                 password: user.password
//             });
//             return res.data; 
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response?.data || "Failed to sign in");
//         }
//     }
// );

// // פעולה לרישום משתמש חדש
// export const signUp = createAsyncThunk(
//     "Auth/register",
//     async (user: { userName: string; email: string; password: string; role: string }, thunkAPI) => {
//         try {
//             const res = await axios.post(`${API_URL}/register`, {
//                 userName: user.userName,
//                 Email: user.email,
//                 Password: user.password,
//                 role: user.role
//             });
//             return res.data; // מניח שהשרת מחזיר { token, user }
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response?.data || "Failed to sign up");
//         }
//     }
// );

// // טעינת משתמש מה-Session Storage אם קיים
// const loadUserFromSession = (): User | null => {
//     const userData = sessionStorage.getItem("user");
//     return userData ? JSON.parse(userData) : null;
// };

// // יצירת Slice לניהול המצב של המשתמש
// const authSlice = createSlice({
//     name: "Auth",
//     initialState: {
//         user: {} as User,
//         loading: false,
//         error: ""
//     },
//     reducers: {
//         logout: (state) => {
//             state.user = {} as User;
//             sessionStorage.removeItem("user");
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(signIn.pending, (state) => {
//                 state.loading = true;
//                 state.error = "";
//             })
//             .addCase(signIn.fulfilled, (state, action: PayloadAction<{ token: string; user:User}>) => {
//                 state.loading = false;
//                 state.user = action.payload.user;
//                 console.log(state.user);
//                 state.user.token = action.payload.token;
//                 sessionStorage.setItem("user", JSON.stringify(state.user));
//             })
//             .addCase(signIn.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             .addCase(signUp.pending, (state) => {
//                 state.loading = true;
//                 state.error = "";
//             })
//             .addCase(signUp.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
//                 state.loading = false;
//                 state.user = action.payload.user;
//                 state.user.token = action.payload.token;
//                 sessionStorage.setItem("user", JSON.stringify(state.user));
//             })
//             .addCase(signUp.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });
//     }
// });

// export const { logout } = authSlice.actions;
// export default authSlice;

//אני נחנקת מצחוק 
//הואני לא מפסיקה לבכותתת
//הוא משתתף בצערך ממש לא עוזר לי שיתן לי פתרוןן לא צריכה שיתופים


import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { User } from "../models/user"

//אולי להוריד את +"api" מהקישור
const apiUrl = import.meta.env.VITE_API_URL;

export const signIn = createAsyncThunk("Auth/login", async (user: { email: string; password: string }, thunkAPI) => {
  console.log("signIn called with user:", user);
  
  try {
    const res = await axios.post(`${apiUrl}/login`, {//הנה הקריאה
      email: user.email,
      password: user.password,
    })
    console.log("Login response:", res.data);


    // שמירת הטוקן ב-cookie עם תאריך תפוגה ארוך (30 ימים)
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30)
    document.cookie = `auth_token=${res.data.token}; path=/; expires=${expirationDate.toUTCString()}; secure; samesite=strict;`

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
      const res = await axios.post(`${apiUrl}/register`, {
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

