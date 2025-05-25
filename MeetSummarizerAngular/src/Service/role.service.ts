import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import type { Observable } from "rxjs"

export interface Role {
  id: number
  roleName: string
  description?: string
}

export interface RoleDTO {
  roleName: string
  description?: string
}

@Injectable({
  providedIn: "root",
})
export class RoleService {
  private apiUrl = "api/Role"

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl)
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/${id}`)
  }

  addRole(role: RoleDTO): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, role)
  }

  updateRole(id: number, role: RoleDTO): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/${id}`, role)
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
