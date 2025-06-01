// Cookie-based storage utility
export const CookieStorage = {
    // Set cookie with expiration
    set: (name: string, value: string, days = 30) => {
      const expires = new Date()
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
      document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;secure;samesite=strict`
    },
  
    // Get cookie value
    get: (name: string): string | null => {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) {
        return decodeURIComponent(parts.pop()?.split(";").shift() || "")
      }
      return null
    },
  
    // Remove cookie
    remove: (name: string) => {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;secure;samesite=strict`
    },
  
    // Get user data from cookies
    getUser: (): any | null => {
      const userData = CookieStorage.get("user_data")
      if (userData && userData !== "undefined" && userData !== "null") {
        try {
          return JSON.parse(userData)
        } catch (error) {
          console.error("Error parsing user data from cookie:", error)
          return null
        }
      }
      return null
    },
  
    // Set user data in cookies
    setUser: (user: any) => {
      CookieStorage.set("user_data", JSON.stringify(user))
    },
  
    // Get auth token
    getAuthToken: (): string | null => {
      return CookieStorage.get("auth_token")
    },
  
    // Set auth token
    setAuthToken: (token: string) => {
      CookieStorage.set("auth_token", token)
    },
  }
  