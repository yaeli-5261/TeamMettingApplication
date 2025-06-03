import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import type { Observable } from "rxjs"
import { environment } from "../environments/environment"

export interface Team {
  id: number
  name: string
  description?: string
}

export interface TeamPostDTO {
  name: string
  description: string
}

@Injectable({
  providedIn: "root",
})
export class TeamService {
  private apiUrl = `${environment.apiUrl}/api/Team`

  constructor(private http: HttpClient) {}

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl)
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/${id}`)
  }

  addTeam(team: TeamPostDTO): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, team)
  }

  updateTeam(id: number, team: TeamPostDTO): Observable<Team> {
    return this.http.put<Team>(`${this.apiUrl}/${id}`, team)
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
