// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../Service/auth.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   isLoading = false;
//   errorMessage = '';

//   constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required]],
//     });
//   }

//   ngOnInit(): void {}

//   onSubmit(): void {
//     if (this.loginForm.invalid) return;

//     this.isLoading = true;
//     const { email, password } = this.loginForm.value;

//     this.authService.login(email, password).subscribe({
//       next: (res) => {
//         const roleName = res.user?.role?.roleName;

//         if (roleName === 'Admin') {
//           this.authService.saveToken(res.token);
//           this.authService.saveUser(res.user);
//           this.router.navigate(['/home']);
//         } else {
//           this.errorMessage = 'גישה נדחתה. רק אדמין יכול להתחבר.';
//           this.authService.logout(); // מסיר טוקן לא חוקי
//           this.isLoading = false;
//         }
//       },
//       error: () => {
//         this.errorMessage = 'שם משתמש או סיסמה לא נכונים';
//         this.isLoading = false;
//       },
//     });
//   }
// }



import { Component, type OnInit } from "@angular/core"
import {  FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { Router, RouterLink } from "@angular/router"
import { AuthService } from "../../Service/auth.service"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  forgotPasswordForm: FormGroup
  isLoading = false
  errorMessage = ""
  currentYear = new Date().getFullYear()
  rememberMe = false

  // Forgot password modal
  showForgotPasswordModal = false
  forgotPasswordLoading = false
  forgotPasswordError = ""
  forgotPasswordSuccess = ""

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    })

    this.forgotPasswordForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    })
  }

  ngOnInit(): void {
    // If user is already logged in, redirect to home
    if (this.authService.getToken()) {
      this.router.navigate(["/home"])
      return
    }

    // Check if we have saved credentials
    this.loadSavedCredentials()
  }

  loadSavedCredentials(): void {
    const savedEmail = localStorage.getItem("rememberedEmail")
    const savedPassword = localStorage.getItem("rememberedPassword")

    if (savedEmail && savedPassword) {
      this.loginForm.patchValue({
        email: savedEmail,
        password: savedPassword,
      })
      this.rememberMe = true
    }
  }

  saveCredentials(email: string, password: string): void {
    localStorage.setItem("rememberedEmail", email)
    localStorage.setItem("rememberedPassword", password)
  }

  clearSavedCredentials(): void {
    localStorage.removeItem("rememberedEmail")
    localStorage.removeItem("rememberedPassword")
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return

    this.isLoading = true
    this.errorMessage = ""
    const { email, password } = this.loginForm.value

    this.authService.login(email, password).subscribe({
      next: (res) => {
        const roleName = res.user?.role?.roleName

        if (roleName === "Admin") {
          // Save credentials if remember me is checked
          if (this.rememberMe) {
            this.saveCredentials(email, password)
          } else {
            this.clearSavedCredentials()
          }

          this.authService.saveToken(res.token)
          this.authService.saveUser(res.user)
          this.router.navigate(["/home"])
        } else {
          this.errorMessage = "Access denied. Only administrators can log in."
          this.authService.logout()
          this.isLoading = false
        }
      },
      error: (err) => {
        this.errorMessage = "Invalid username or password"
        this.isLoading = false
      },
    })
  }

  // Forgot password methods
  openForgotPasswordModal(): void {
    this.showForgotPasswordModal = true
    this.forgotPasswordError = ""
    this.forgotPasswordSuccess = ""

    // Pre-fill email from login form if available
    const loginEmail = this.loginForm.get("email")?.value
    if (loginEmail) {
      this.forgotPasswordForm.patchValue({ email: loginEmail })
    }
  }

  closeForgotPasswordModal(): void {
    this.showForgotPasswordModal = false
  }

  resetPassword(): void {
    if (this.forgotPasswordForm.invalid) return

    this.forgotPasswordLoading = true
    this.forgotPasswordError = ""
    this.forgotPasswordSuccess = ""

    const email = this.forgotPasswordForm.get("email")?.value

    this.authService.resetPassword(email).subscribe({
      next: (res) => {
        this.forgotPasswordLoading = false
        this.forgotPasswordSuccess = "Password has been sent to your email"

        // Close modal after a delay
        setTimeout(() => {
          this.closeForgotPasswordModal()
        }, 3000)
      },
      error: (err:any) => {
        this.forgotPasswordLoading = false
        this.forgotPasswordError = "Failed to reset password. Please try again."
      },
    })
  }
}
