import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { CookieStorage } from "../models/cookie-storage"
import { MeetingDTO, MeetingPostDTO } from "../models/meetingTypes"

const apiUrl = import.meta.env.VITE_API_URL
const API_URL = `${apiUrl}/Meeting`

// Helper function to get user team ID from multiple sources
const getUserTeamId = (): number | null => {
  try {
    // Try cookies first
    const user = CookieStorage.getUser()
    if (user?.teamId) {
      return user.teamId
    }

    // Fallback to sessionStorage
    const userData = sessionStorage.getItem("user")
    if (userData) {
      const sessionUser = JSON.parse(userData)
      if (sessionUser?.teamId) {
        return sessionUser.teamId
      }
    }

    // Fallback to localStorage
    const localData = localStorage.getItem("user")
    if (localData) {
      const localUser = JSON.parse(localData)
      if (localUser?.teamId) {
        return localUser.teamId
      }
    }

    return null
  } catch (error) {
    console.error("Error getting user team ID:", error)
    return null
  }
}

export const updateMeetingFile = createAsyncThunk(
  "meetings/updateMeetingFile",
  async (
    { meetingId, fileUrl, isTranscript }: { meetingId: number; fileUrl: string; isTranscript: boolean },
    thunkAPI,
  ) => {
    try {
      const token = CookieStorage.getAuthToken()
      const response = await axios.put(
        `${API_URL}/update-meeting-file`,
        {
          MeetingId: meetingId,
          FileUrl: fileUrl,
          IsTranscript: isTranscript,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return { meetingId, fileUrl }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update meeting file")
    }
  },
)

export const fetchMeetings = createAsyncThunk("meetings/fetchMeetings", async (_, thunkAPI) => {
  const teamId = getUserTeamId()

  if (!teamId) {
    console.error("❌ No TeamId found for the user.")
    return thunkAPI.rejectWithValue("No team ID found")
  }

  try {
    const token = CookieStorage.getAuthToken()
    const response = await axios.get<MeetingDTO[]>(`${API_URL}/Team/${teamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log("✅ Meetings fetched successfully:", response.data)
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch meetings")
  }
})

export const fetchMeetingsByTeam = createAsyncThunk(
  "meetings/fetchMeetingsByTeam",
  async ({ teamId }: { teamId: number }, thunkAPI) => {
    try {
      const token = CookieStorage.getAuthToken()
      const response = await axios.get(`${API_URL}/team/${teamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(`✅ Meetings fetched for team ${teamId}:`, response.data)
      return response.data
    } catch (error) {
      console.error(`❌ Error fetching meetings for team ${teamId}:`, error)
      return thunkAPI.rejectWithValue((error as any).response?.data || "An unknown error occurred")
    }
  },
)

export const addMeeting = createAsyncThunk(
  "meetings/addMeeting",
  async (meeting: MeetingPostDTO, { rejectWithValue }) => {
    try {
      const token = CookieStorage.getAuthToken()
      const response = await axios.post(API_URL, meeting, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      return response.data as MeetingDTO
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add meeting")
    }
  },
)

export const deleteMeeting = createAsyncThunk("meetings/deleteMeeting", async (id: number, { rejectWithValue }) => {
  try {
    const token = CookieStorage.getAuthToken()
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return id
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete meeting")
  }
})

const meetingSlice = createSlice({
  name: "meetings",
  initialState: { list: [] as MeetingDTO[], loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchMeetingsByTeam.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMeetingsByTeam.fulfilled, (state, action: PayloadAction<MeetingDTO[]>) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchMeetingsByTeam.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(addMeeting.pending, (state) => {
        state.error = null
      })
      .addCase(addMeeting.fulfilled, (state, action: PayloadAction<MeetingDTO>) => {
        state.list.push(action.payload)
      })
      .addCase(addMeeting.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(deleteMeeting.pending, (state) => {
        state.error = null
      })
      .addCase(deleteMeeting.fulfilled, (state, action: PayloadAction<number>) => {
        state.list = state.list.filter((meeting) => meeting.id !== action.payload)
      })
      .addCase(deleteMeeting.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(updateMeetingFile.pending, (state) => {
        state.error = null
      })
      .addCase(updateMeetingFile.fulfilled, (state, action) => {
        const { meetingId, fileUrl } = action.payload
        const meeting = state.list.find((m) => m.id === meetingId)
        if (meeting) {
          meeting.linkOrinignFile = fileUrl
        }
      })
      .addCase(updateMeetingFile.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export default meetingSlice
