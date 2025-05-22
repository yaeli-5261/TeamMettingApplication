import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import {  Router, RouterLink } from "@angular/router"
import { AuthService } from "../../Service/auth.service"

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  isLoading = false
  errorMessage = ""
  roles: any[] = []
  teams: any[] = []
  isPasswordVisible = false
  currentYear = new Date().getFullYear()

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      userName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      roleId: ["", Validators.required],
      teamId: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.loadRolesAndTeams()
  }

  loadRolesAndTeams(): void {
    this.isLoading = true

    // Load roles
    this.authService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles = roles
        this.loadTeams()
      },
      error: (err) => {
        this.errorMessage = "Failed to load roles"
        this.isLoading = false
        console.error("Error loading roles:", err)
      },
    })
  }

  loadTeams(): void {
    this.authService.getAllTeams().subscribe({
      next: (teams) => {
        this.teams = teams
        this.isLoading = false
      },
      error: (err) => {
        this.errorMessage = "Failed to load teams"
        this.isLoading = false
        console.error("Error loading teams:", err)
      },
    })
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return

    this.isLoading = true
    this.errorMessage = ""

    const { email, password, userName, roleId, teamId } = this.registerForm.value

    this.authService
      .register({
        email,
        password,
        userName,
        roleId: Number(roleId),
        teamId: Number(teamId),
      })
      .subscribe({
        next: () => {
          this.router.navigate(["/users"])
        },
        error: (err) => {
          this.errorMessage = "Registration failed. Please try again."
          this.isLoading = false
          console.error("Registration error:", err)
        },
      })
  }
}
