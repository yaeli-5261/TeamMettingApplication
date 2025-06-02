import axios from "axios"
import { CookieStorage } from "../models/cookie-storage"
import { MeetingDTO } from "../models/meetingTypes"


const apiUrl = import.meta.env.VITE_API_URL
const API_URL = `${apiUrl}/Meeting`

// Get user team ID from multiple sources
const getUserTeamId = (): number | null => {
  try {
    // Try cookies first
    const user = CookieStorage.getUser()
    if (user?.teamId) {
      console.log("User data from cookies:", user)
      return user.teamId
    }

    // Fallback to sessionStorage
    const userData = sessionStorage.getItem("user")
    if (userData) {
      const sessionUser = JSON.parse(userData)
      console.log("User data from sessionStorage:", sessionUser)
      if (sessionUser?.teamId) {
        // Save to cookies for next time
        CookieStorage.setUser(sessionUser)
        return sessionUser.teamId
      }
    }

    // Fallback to localStorage
    const localData = localStorage.getItem("user")
    if (localData) {
      const localUser = JSON.parse(localData)
      console.log("User data from localStorage:", localUser)
      if (localUser?.teamId) {
        // Save to cookies and session for next time
        CookieStorage.setUser(localUser)
        sessionStorage.setItem("user", localData)
        return localUser.teamId
      }
    }

    console.error("❌ No TeamId found in any storage")
    return null
  } catch (error) {
    console.error("Error getting user team ID:", error)
    return null
  }
}

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ")
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=")
    if (key === name) {
      return decodeURIComponent(value)
    }
  }
  return null
}

// Fetch meetings by team
export const fetchMeetingsByTeam = async (): Promise<MeetingDTO[]> => {
  const teamId = getUserTeamId()
  if (!teamId) {
    console.error("❌ No TeamId found for the user.")
    return []
  }

  try {
    const response = await axios.get<MeetingDTO[]>(`${API_URL}/Team/${teamId}`, {
      headers: {
        Authorization: `Bearer ${CookieStorage.getAuthToken()}`,
      },
    })
    console.log("✅ Meetings fetched successfully:", response.data)
    return response.data
  } catch (error) {
    console.error("❌ Error fetching meetings:", error)
    return []
  }
}

// Add meeting
export const addMeeting = async (meetingData: {
  name: string
  date: string
  linkTranscriptFile?: string
  linkOrinignFile?: string
}): Promise<MeetingDTO | null> => {
  const teamId = getUserTeamId()
  if (!teamId) {
    console.error("❌ No TeamId found for the user.")
    return null
  }

  try {
    const response = await axios.post<MeetingDTO>(
      API_URL,
      { ...meetingData, teamId },
      {
        headers: {
          Authorization: `Bearer ${CookieStorage.getAuthToken()}`,
          "Content-Type": "application/json",
        },
      },
    )
    console.log("✅ Meeting added successfully:", response.data)
    return response.data
  } catch (error) {
    console.error("❌ Error adding meeting:", error)
    return null
  }
}

// Update meeting
export const updateMeeting = async (id: number, meetingData: Partial<MeetingDTO>): Promise<MeetingDTO | null> => {
  try {
    const response = await axios.put<MeetingDTO>(`${API_URL}/${id}`, meetingData, {
      headers: {
        Authorization: `Bearer ${CookieStorage.getAuthToken()}`,
        "Content-Type": "application/json",
      },
    })
    console.log("✅ Meeting updated successfully:", response.data)
    return response.data
  } catch (error) {
    console.error("❌ Error updating meeting:", error)
    return null
  }
}

// Fetch meeting by ID
export const fetchMeetingById = async (id: number): Promise<MeetingDTO> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${CookieStorage.getAuthToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(`❌ Error fetching meeting with ID ${id}:`, error)
    throw error
  }
}

// Delete meeting
export const deleteMeeting = async (id: number): Promise<boolean> => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${CookieStorage.getAuthToken()}`,
      },
    })
    console.log("✅ Meeting deleted successfully:", response.data)
    return true
  } catch (error) {
    console.error(`❌ Error deleting meeting with ID ${id}:`, error)
    return false
  }
}
