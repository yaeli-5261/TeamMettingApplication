import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule,  type FormGroup, Validators, FormBuilder } from "@angular/forms"
import { AuthService } from "../../Service/auth.service"
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router"

interface User {
  id: number
  userName: string
  email: string
  role?: {
    id?: number
    roleName?: string
  }
  team?: {
    id?: number
    name?: string
  }
  teamId?: number
  roleId?: number
}

@Component({
  selector: "app-list-users",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.css"],
})
export class ListUsersComponent implements OnInit {
  //TODO CHECK HOW TO DEFIENIED IT 
  users: any[] = []
  filteredUsers: any[] = []
  isLoading = false
  error = ""
  searchQuery = ""

  // For delete functionality
  showDeleteConfirm = false
  userToDelete: User | null = null
  deleteLoading = false
  deleteError = ""
  deleteSuccess = ""

  // For edit functionality
  showEditModal = false
  editForm: FormGroup
  userToEdit: User | null = null
  editLoading = false
  editError = ""
  editSuccess = ""
  roles: any[] = []
  teams: any[] = []

  // For email functionality
  showEmailModal = false
  emailForm: FormGroup
  userToEmail: User | null = null
  emailLoading = false
  emailError = ""
  emailSuccess = ""

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router, 
  ) {
    // Initialize edit form
    this.editForm = this.fb.group({
      userName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      roleId: ["", Validators.required],
      teamId: ["", Validators.required],
    })

    // Initialize email form
    this.emailForm = this.fb.group({
      subject: ["", Validators.required],
      message: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.fetchUsers()
    this.loadRolesAndTeams()
  }

  fetchUsers(): void {
    this.isLoading = true
    this.authService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data
        this.filteredUsers = data
        this.isLoading = false
      },
      error: (err: any) => {
        this.error = "Failed to fetch users"
        this.isLoading = false
        console.error("Error fetching users:", err)
      },
    })
  }

  loadRolesAndTeams(): void {
    // Load roles
    this.authService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles = roles
      },
      error: (err) => {
        console.error("Error loading roles:", err)
      },
    })

    // Load teams
    this.authService.getAllTeams().subscribe({
      next: (teams) => {
        this.teams = teams
      },
      error: (err) => {
        console.error("Error loading teams:", err)
      },
    })
  }

  filterUsers(): void {
    if (!this.searchQuery.trim()) {
      this.filteredUsers = this.users
      return
    }

    const query = this.searchQuery.toLowerCase()
    this.filteredUsers = this.users.filter(
      (user) =>
        user.userName?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.role?.roleName?.toLowerCase().includes(query) ||
        user.team?.name?.toLowerCase().includes(query),
    )
  }

  getRoleBadgeClass(roleName: string): string {
    if (roleName === "Admin") {
      return "badge-admin"
    } else if (roleName === "Manager") {
      return "badge-manager"
    } else {
      return "badge-user"
    }
  }

  // Delete user functionality
  openDeleteConfirm(user: User): void {
    this.userToDelete = user
    this.showDeleteConfirm = true
    this.deleteError = ""
    this.deleteSuccess = ""
  }

  closeDeleteConfirm(): void {
    this.showDeleteConfirm = false
    this.userToDelete = null
  }

  deleteUser(): void {
    if (!this.userToDelete) return

    this.deleteLoading = true
    this.deleteError = ""
    this.deleteSuccess = ""

    this.authService.deleteUser(this.userToDelete.id).subscribe({
      next: () => {
        this.deleteLoading = false
        this.deleteSuccess = "User deleted successfully"

        // Remove user from arrays
        this.users = this.users.filter((u) => u.id !== this.userToDelete?.id)
        this.filteredUsers = this.filteredUsers.filter((u) => u.id !== this.userToDelete?.id)

        // Close modal after a short delay
        setTimeout(() => {
          this.closeDeleteConfirm()
        }, 1500)
      },
      error: (err) => {
        this.deleteLoading = false
        this.deleteError = "Failed to delete user"
        console.error("Error deleting user:", err)
      },
    })
  }

  // Email user functionality
  openEmailModal(user: User): void {
    this.userToEmail = user
    this.emailError = ""
    this.emailSuccess = ""

    // Reset form
    this.emailForm.reset()

    this.showEmailModal = true
  }

  closeEmailModal(): void {
    this.showEmailModal = false
    this.userToEmail = null
  }

  sendEmail(): void {
    if (!this.userToEmail || this.emailForm.invalid) return;
  
    this.emailLoading = true;
    this.emailError = "";
    this.emailSuccess = "";
  
    const emailData = {
      to: this.userToEmail.email,
      subject: this.emailForm.value.subject,
      message: this.emailForm.value.message,
    };
  
    this.authService.sendEmail(emailData).subscribe({
      next: (response) => {
        this.emailLoading = false;
        this.emailSuccess = `Email sent successfully to ${this.userToEmail?.email}`;
        
        // Log success
        console.log('Email sent successfully:', response);
        
        // Close modal after a short delay
        setTimeout(() => {
          this.closeEmailModal();
        }, 1500);
      },
      error: (error) => {
        this.emailLoading = false;
        
        // Get detailed error message if available
        const errorMessage = error.error?.message || "Failed to send email";
        this.emailError = errorMessage;
        
        console.error("Error sending email:", error);
      }
    });
  }
  
}
