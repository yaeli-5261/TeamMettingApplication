// // import { Injectable } from "@angular/core"
// // import { HttpClient, HttpHeaders } from "@angular/common/http"
// // import { Observable } from "rxjs"

// // interface LoginResponse {
// //   token: string
// //   user: {
// //     userName: string
// //     teamId: number
// //     role: {
// //       roleName: string
// //     }
// //   }
// // }

// // @Injectable({
// //   providedIn: "root",
// // })
// // export class AuthService {
// //   private baseApiUrl = "https://localhost:7214/api"

// //   constructor(private http: HttpClient) {}

// //   login(email: string, password: string): Observable<LoginResponse> {
// //     return this.http.post<LoginResponse>(`${this.baseApiUrl}/Auth/login`, { email,password })
// //   }

// //   register(data: any): Observable<LoginResponse> {
// //     const token = localStorage.getItem("token")
// //     const headers = new HttpHeaders({
// //       Authorization: `Bearer ${token}`,
// //     })

// //     return this.http.post<LoginResponse>(`${this.baseApiUrl}/Auth/register`, data, { headers })
// //   }

// //   saveToken(token: string): void {
// //     localStorage.setItem("token", token)
// //   }

// //   getToken(): string | null {
// //     return localStorage.getItem("token")
// //   }

// //   getAllRoles(): Observable<any[]> {
// //     return this.http.get<any[]>(`${this.baseApiUrl}/Role`)
// //   }

// //   getAllTeams(): Observable<any[]> {
// //     return this.http.get<any[]>(`${this.baseApiUrl}/Team`)
// //   }

// //   logout(): void {
// //     localStorage.removeItem("token")
// //   }

// //   getAllUsers(): Observable<any[]> {
// //     const token = this.getToken()
// //     const headers = new HttpHeaders({
// //       Authorization: `Bearer ${token}`,
// //     })

// //     return this.http.get<any[]>(`${this.baseApiUrl}/User/Admin`, { headers })
// //   }

// //   deleteUser(userId: number): Observable<any> {
// //     const token = this.getToken()
// //     const headers = new HttpHeaders({
// //       Authorization: `Bearer ${token}`,
// //     })

// //     return this.http.delete<any>(`${this.baseApiUrl}/User/${userId}`, { headers })
// //   }

// //   updateUser(userId: number, userData: any): Observable<any> {
// //     const token = this.getToken()
// //     const headers = new HttpHeaders({
// //       Authorization: `Bearer ${token}`,
// //     })

// //     return this.http.put<any>(`${this.baseApiUrl}/User/${userId}`, userData, { headers })
// //   }

// //   sendEmail(emailData: any): Observable<any> {
// //     const token = this.getToken()
// //     const headers = new HttpHeaders({
// //       Authorization: `Bearer ${token}`,
// //     })

// //     return new Observable((observer) => {
// //       setTimeout(() => {
// //         observer.next({ success: true, message: "Email sent successfully" })
// //         observer.complete()
// //       }, 1000)
// //     })

// //   }

// //   isAdmin(): boolean {
// //     const user = this.getUser()
// //     return user?.role?.roleName === "Admin"
// //   }

// //   saveUser(user: any): void {
// //     localStorage.setItem("user", JSON.stringify(user))
// //   }

// //   getUser(): any {
// //     const user = localStorage.getItem("user")
// //     return user ? JSON.parse(user) : null
// //   }
// // }




















// import { Injectable } from "@angular/core"
// import { HttpClient, HttpHeaders } from "@angular/common/http"
// import { type Observable, of, throwError } from "rxjs"
// import { catchError, delay } from "rxjs/operators"
// import { environment } from "../environments/environment.prod"

// interface LoginResponse {
//   token: string
//   user: {
//     userName: string
//     email: string
//     teamId: number
//     role: {
//       roleName: string
//     }
//   }
// }

// @Injectable({
//   providedIn: "root",
// })
// export class AuthService {

//   private baseApiUrl = `${environment.apiUrl}/api`

//   constructor(private http: HttpClient) {}

//   login(email: string, password: string): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.baseApiUrl}/Auth/login`, { email, password })
//   }

//   register(data: any): Observable<LoginResponse> {
//     const token = localStorage.getItem("token")
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`,
//     })

//     return this.http.post<LoginResponse>(`${this.baseApiUrl}/Auth/register`, data, { headers })
//   }

//   saveToken(token: string): void {
//     localStorage.setItem("token", token)
//   }

//   getToken(): string | null {
//     return localStorage.getItem("token")
//   }

//   getAllRoles(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseApiUrl}/Role`)
//   }

//   getAllTeams(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseApiUrl}/Team`)
//   }

//   logout(): void {
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//   }

//   getAllUsers(): Observable<any[]> {
//     const token = this.getToken()
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`,
//     })

//     return this.http.get<any[]>(`${this.baseApiUrl}/User/Admin`, { headers })
//   }

//   deleteUser(userId: number): Observable<any> {
//     const token = this.getToken()
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`,
//     })

//     return this.http.delete<any>(`${this.baseApiUrl}/User/${userId}`, { headers })
//   }

//   updateUser(userId: number, userData: any): Observable<any> {
//     const token = this.getToken()
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     })

//     // Create a UserCreateDTO object as expected by the API
//     const userCreateDTO = {
//       id: userId,
//       userName: userData.userName,
//       email: userData.email,
//       roleId: Number(userData.roleId),
//       teamId: Number(userData.teamId),
//     }

//     return this.http.put<any>(`${this.baseApiUrl}/User/${userId}`, userCreateDTO, { headers })
//   }

//   // sendEmail(emailData: any): Observable<any> {
//   //   const token = this.getToken()
//   //   const headers = new HttpHeaders({
//   //     Authorization: `Bearer ${token}`,
//   //     "Content-Type": "application/json",
//   //   })

//   //   // Create an email object with all required fields
//   //   const emailRequest = {
//   //     to: emailData.to,
//   //     subject: emailData.subject,
//   //     body: emailData.message,
//   //     isHtml: false,
//   //   }

//   //   // You need to create an Email controller in your API
//   //   // This endpoint should connect to an SMTP service to send actual emails
//   //   return this.http.post<any>(`${this.baseApiUrl}/Email/Send`, emailRequest, { headers })
//   // }

//   // New method for password reset
//   resetPassword(email: string): Observable<any> {
//     // In a real application, this would call an API endpoint
//     // For now, we'll simulate a successful response after a delay

//     // Simulated API call
//     return of({ success: true, message: "Password reset email sent" }).pipe(
//       delay(1500), // Simulate network delay
//     )

//     // Real implementation would be:
//     // return this.http.post<any>(`${this.baseApiUrl}/Auth/ResetPassword`, { email })
//   }

//   isAdmin(): boolean {
//     const user = this.getUser()
//     return user?.role?.roleName === "Admin"
//   }

//   saveUser(user: any): void {
//     localStorage.setItem("user", JSON.stringify(user))
//   }

//   getUser(): any {
//     const user = localStorage.getItem("user")
//     return user ? JSON.parse(user) : null
//   }
//   // Add this method to your AuthService class
// sendEmail(emailData: any): Observable<any> {
//   const token = this.getToken();
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/json'
//   });

//   // Create an email object with all required fields
//   const emailRequest = {
//     to: emailData.to,
//     subject: emailData.subject,
//     body: emailData.message,
//     isHtml: false
//   };

//   return this.http.post<any>(`${this.baseApiUrl}/Email/Send`, emailRequest, { headers })
//     .pipe(
//       catchError(error => {
//         console.error('Email sending error:', error);
//         return throwError(() => new Error('Failed to send email. Please try again.'));
//       })
//     );
// }
// }









import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { type Observable, of, throwError } from "rxjs"
import { catchError, delay } from "rxjs/operators"
import { environment } from "../environments/environment"

interface LoginResponse {
  token: string
  user: {
    userName: string
    email: string
    teamId: number
    role: {
      roleName: string
    }
  }
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseApiUrl = `${environment.apiUrl}/api`
  usersCache: any
  teamsCache: any

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseApiUrl}/Auth/login`, { email, password })
  }

  register(data: any): Observable<LoginResponse> {
    const token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })

    return this.http.post<LoginResponse>(`${this.baseApiUrl}/Auth/register`, data, { headers })
  }

  saveToken(token: string): void {
    localStorage.setItem("token", token)
  }

  getToken(): string | null {
    return localStorage.getItem("token")
  }

  getAllRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/Role`)
  }

  getAllTeams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/Team`)
  }

  logout(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  getAllUsers(): Observable<any[]> {
    const token = this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })

    return this.http.get<any[]>(`${this.baseApiUrl}/User/Admin`, { headers })
  }

  deleteUser(userId: number): Observable<any> {
    const token = this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })

    return this.http.delete<any>(`${this.baseApiUrl}/User/${userId}`, { headers })
  }

  updateUser(userId: number, userData: any): Observable<any> {
    const token = this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    })

    const userCreateDTO = {
      userName: userData.userName,
      email: userData.email,
      roleId: Number(userData.roleId),
      teamId: Number(userData.teamId),
    }

    return this.http.put<any>(`${this.baseApiUrl}/User/${userId}`, userCreateDTO, { headers })
  }

  resetPassword(email: string): Observable<any> {
    return of({ success: true, message: "Password reset email sent" }).pipe(delay(1500))
  }

  isAdmin(): boolean {
    const user = this.getUser()
    return user?.role?.roleName === "Admin"
  }

  saveUser(user: any): void {
    localStorage.setItem("user", JSON.stringify(user))
  }

  getUser(): any {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  }

  sendEmail(emailData: any): Observable<any> {
    const token = this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    })

    const emailRequest = {
      to: emailData.to,
      subject: emailData.subject,
      body: emailData.message,
      isHtml: false,
    }

    return this.http.post<any>(`${this.baseApiUrl}/Email/Send`, emailRequest, { headers }).pipe(
      catchError((error) => {
        console.error("Email sending error:", error)
        return throwError(() => new Error("Failed to send email. Please try again."))
      }),
    )
  }
}
