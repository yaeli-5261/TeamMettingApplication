import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export interface ChatMessage {
  id: number
  userName: string
  message: string
  createdAt: string
  teamId: number
}

export interface SendMessageDto {
  userName: string
  message: string
  teamId: number
}

export interface ChatStats {
  messageCount: number
  activeUsers: number
}

class ChatService {
  async getMessages(teamId: number): Promise<ChatMessage[]> {
    try {
      const response = await axios.get(`${API_URL}/chat/messages/${teamId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching messages:", error)
      throw error
    }
  }

  async sendMessage(messageData: SendMessageDto): Promise<ChatMessage> {
    try {
      const response = await axios.post(`${API_URL}/chat/send`, messageData)
      return response.data
    } catch (error) {
      console.error("Error sending message:", error)
      throw error
    }
  }

  async clearChat(teamId: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/chat/clear/${teamId}`)
    } catch (error) {
      console.error("Error clearing chat:", error)
      throw error
    }
  }

  async getChatStats(teamId: number): Promise<ChatStats> {
    try {
      const response = await axios.get(`${API_URL}/chat/stats/${teamId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching chat stats:", error)
      throw error
    }
  }
}

export const chatService = new ChatService()
export default chatService
