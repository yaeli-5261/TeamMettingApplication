// import { Injectable } from "@angular/core"
// import type { Observable } from "rxjs"
// import { environment } from "../environments/environment";
// import { HttpClient } from "@angular/common/http";

// @Injectable({
//   providedIn: "root",
// })
// export class EmailService {
//   private apiUrl = `${environment.apiUrl}/api/Email`

//   constructor(private http: HttpClient) {}

//   sendEmailToUser(userId: number, emailData: { subject: string; body: string }): Observable<any> {
//     return this.http.post(`${this.apiUrl}/send-to-user/${userId}`, emailData)
//   }
// }



import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class EmailService {
  private apiUrl = `${environment.apiUrl}/api/Email`;

  constructor(private http: HttpClient) {}
 
  
  sendEmailToUser(userId: number, subject: string, body: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/send-to-user/${userId}`,{subject, body}, );
  }
}
