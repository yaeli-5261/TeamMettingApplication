import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-admin-create',
  imports :[ReactiveFormsModule],  
  templateUrl: './admin-create.component.html',
})
export class AdminCreateComponent implements OnInit {
  roleForm!: FormGroup;
  teamForm!: FormGroup;
  isAdmin = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    this.roleForm = this.fb.group({
      roleName: ['', Validators.required],
    });

    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
    });
  }

  createRole(): void {
    if (!this.roleForm.valid) return;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http
      .post(`${this.authService['baseApiUrl']}/Role`, this.roleForm.value, {
        headers,
      })
      .subscribe({
        next: () => {
          this.successMessage = 'Role created successfully!';
          this.roleForm.reset();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to create role.';
        },
      });
  }

  createTeam(): void {
    if (!this.teamForm.valid) return;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http
      .post(`${this.authService['baseApiUrl']}/Team`, this.teamForm.value, {
        headers,
      })
      .subscribe({
        next: () => {
          this.successMessage = 'Team created successfully!';
          this.teamForm.reset();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to create team.';
        },
      });
  }
}
