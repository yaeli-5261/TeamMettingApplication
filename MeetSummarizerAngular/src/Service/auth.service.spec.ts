// import { TestBed } from '@angular/core/testing';
// import { AuthService } from './auth.service';


// describe('AuthService', () => {
//   let service: AuthService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(AuthService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });












import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  Token: string;
  User: {
    UserName: string;
    TeamId: string;
    Role: {
      RoleName: string;
    };
  };
}

interface RegisterResponse {
  Token: string;
  User: {
    UserName: string;
    TeamId: string;
    Role: {
      RoleName: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7214/api/Auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap(res =>{
        console.log("res",res); 
        
        this.setSession(res.Token, res.User)
      }));
  }

  register(registerData: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, registerData)
      .pipe(tap(res => this.setSession(res.Token, res.User)));
  }

  private setSession(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', user.UserName);
    localStorage.setItem('role', user.Role.RoleName);
    localStorage.setItem('teamId', user.TeamId);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * קבלת מזהה צוות
   */
  getTeamId(): string | null {
    return localStorage.getItem('teamId');
  }

  /**
   * קבלת תפקיד
   */
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  /**
   * קבלת שם משתמש
   */
  getUserName(): string | null {
    return localStorage.getItem('userName');
  }


  // auth.service.ts
saveToken(token: string) {
  localStorage.setItem('token', token);
}

saveUser(user: any) {
  localStorage.setItem('user', JSON.stringify(user));
}

getUser(): any {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
}

}
