// import { Component, type OnInit } from "@angular/core"
// import { CommonModule } from "@angular/common"
// import { RouterLink } from "@angular/router"
// import { FormsModule } from "@angular/forms"
// import { AuthService } from "../../Service/auth.service"
// import { RoleService } from "../../Service/role.service"
// import { TeamService } from "../../Service/team.service"


// interface User {
//   id: number
//   userName: string
//   email: string
//   teamId: number
//   roleId: number
//   team?: { name: string }
//   role?: { roleName: string }
// }

// @Component({
//   selector: "app-users-list",
//   standalone: true,
//   imports: [CommonModule, RouterLink, FormsModule],
//   templateUrl: "./users-list.component.html",
//   styleUrls: ["./users-list.component.css"],
// })
// export class UsersListComponent implements OnInit {
//   users: User[] = []
//   filteredUsers: User[] = []
//   teams: any[] = []
//   roles: any[] = []
//   isLoading = true
//   searchTerm = ""
//   selectedUser: User | null = null
//   showEditModal = false
//   showDeleteModal = false
//   editForm = {
//     userName: "",
//     email: "",
//     roleId: "",
//     teamId: "",
//   }

//   constructor(
//     private authService: AuthService,
//     private teamService: TeamService,
//     private roleService: RoleService,
//   ) {}

//   ngOnInit(): void {
//     this.loadData()
//   }

//   loadData(): void {
//     this.isLoading = true

//     Promise.all([
//       this.authService.getAllUsers().toPromise(),
//       this.teamService.getAllTeams().toPromise(),
//       this.roleService.getAllRoles().toPromise(),
//     ])
//       .then(([users, teams, roles]) => {
//         this.users = users || []
//         this.teams = teams || []
//         this.roles = roles || []
//         this.filteredUsers = [...this.users]
//         this.isLoading = false
//       })
//       .catch((error) => {
//         console.error("Error loading data:", error)
//         this.isLoading = false
//       })
//   }

//   filterUsers(): void {
//     if (!this.searchTerm) {
//       this.filteredUsers = [...this.users]
//     } else {
//       this.filteredUsers = this.users.filter(
//         (user) =>
//           user.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//           user.email.toLowerCase().includes(this.searchTerm.toLowerCase()),
//       )
//     }
//   }

//   getTeamName(teamId: number): string {
//     const team = this.teams.find((t) => t.id === teamId)
//     return team?.name || "Unknown"
//   }

//   getRoleName(roleId: number): string {
//     const role = this.roles.find((r) => r.id === roleId)
//     return role?.roleName || "Unknown"
//   }

//   openEditModal(user: User): void {
//     this.selectedUser = user
//     this.editForm = {
//       userName: user.userName,
//       email: user.email,
//       roleId: user.roleId.toString(),
//       teamId: user.teamId.toString(),
//     }
//     this.showEditModal = true
//   }

//   closeEditModal(): void {
//     this.showEditModal = false
//     this.selectedUser = null
//   }

//   saveUser(): void {
//     if (!this.selectedUser) return

//     const updateData = {
//       userName: this.editForm.userName,
//       email: this.editForm.email,
//       roleId: Number.parseInt(this.editForm.roleId),
//       teamId: Number.parseInt(this.editForm.teamId),
//     }

//     this.authService.updateUser(this.selectedUser.id, updateData).subscribe({
//       next: () => {
//         this.loadData()
//         this.closeEditModal()
//       },
//       error: (error:any) => {
//         console.error("Error updating user:", error)
//       },
//     })
//   }

//   openDeleteModal(user: User): void {
//     this.selectedUser = user
//     this.showDeleteModal = true
//   }

//   closeDeleteModal(): void {
//     this.showDeleteModal = false
//     this.selectedUser = null
//   }

//   confirmDelete(): void {
//     if (!this.selectedUser) return

//     this.authService.deleteUser(this.selectedUser.id).subscribe({
//       next: () => {
//         this.loadData()
//         this.closeDeleteModal()
//       },
//       error: (error:any) => {
//         console.error("Error deleting user:", error)
//       },
//     })
//   }
// }







import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { AuthService } from "../../Service/auth.service"
import { TeamService } from "../../Service/team.service"
import { RoleService } from "../../Service/role.service"
import { EmailService } from "../../Service/email.service"


interface User {
  id: number
  userName: string
  email: string
  teamId: number
  roleId: number
  team?: { name: string }
  role?: { roleName: string }
}

@Component({
  selector: "app-users-list",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"],
})
export class UsersListComponent implements OnInit {
  users: User[] = []
  filteredUsers: User[] = []
  teams: any[] = []
  roles: any[] = []
  isLoading = true
  searchTerm = ""
  selectedUser: User | null = null
  showEditModal = false
  showDeleteModal = false
  showEmailModal = false
  isSendingEmail = false

  editForm = {
    userName: "",
    email: "",
    roleId: "",
    teamId: "",
  }

  emailForm = {
    subject: "",
    body: "",
  }

  constructor(
    private authService: AuthService,
    private teamService: TeamService,
    private roleService: RoleService,
    private emailService: EmailService,
  ) {}

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.isLoading = true

    Promise.all([
      this.authService.getAllUsers().toPromise(),
      this.teamService.getAllTeams().toPromise(),
      this.roleService.getAllRoles().toPromise(),
    ])
      .then(([users, teams, roles]) => {
        this.users = users || []
        this.teams = teams || []
        this.roles = roles || []
        this.filteredUsers = [...this.users]
        this.isLoading = false
      })
      .catch((error) => {
        console.error("Error loading data:", error)
        this.isLoading = false
      })
  }

  filterUsers(): void {
    if (!this.searchTerm) {
      this.filteredUsers = [...this.users]
    } else {
      this.filteredUsers = this.users.filter(
        (user) =>
          user.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase()),
      )
    }
  }

  getTeamName(teamId: number): string {
    const team = this.teams.find((t) => t.id === teamId)
    return team?.name || "Unknown"
  }

  getRoleName(roleId: number): string {
    const role = this.roles.find((r) => r.id === roleId)
    return role?.roleName || "Unknown"
  }

  openEditModal(user: User): void {
    this.selectedUser = user
    this.editForm = {
      userName: user.userName,
      email: user.email,
      roleId: user.roleId.toString(),
      teamId: user.teamId.toString(),
    }
    this.showEditModal = true
  }

  closeEditModal(): void {
    this.showEditModal = false
    this.selectedUser = null
  }

  saveUser(): void {
    if (!this.selectedUser) return

    const updateData = {
      userName: this.editForm.userName,
      email: this.editForm.email,
      roleId: Number.parseInt(this.editForm.roleId),
      teamId: Number.parseInt(this.editForm.teamId),
    }

    this.authService.updateUser(this.selectedUser.id, updateData).subscribe({
      next: () => {
        this.loadData()
        this.closeEditModal()
      },
      error: (error: any) => {
        console.error("Error updating user:", error)
      },
    })
  }

  openDeleteModal(user: User): void {
    this.selectedUser = user
    this.showDeleteModal = true
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false
    this.selectedUser = null
  }

  confirmDelete(): void {
    if (!this.selectedUser) return

    this.authService.deleteUser(this.selectedUser.id).subscribe({
      next: () => {
        this.loadData()
        this.closeDeleteModal()
      },
      error: (error: any) => {
        console.error("Error deleting user:", error)
      },
    })
  }

  // Email functionality
  openEmailModal(user: User): void {
    this.selectedUser = user
    this.emailForm = {
      subject: "",
      body: "",
    }
    this.showEmailModal = true
  }

  closeEmailModal(): void {
    this.showEmailModal = false
    this.selectedUser = null
    this.emailForm = { subject: "", body: "" }
  }

  sendEmail(): void {
    if (!this.selectedUser || !this.emailForm.subject.trim() || !this.emailForm.body.trim()) {
      return
    }
    this.isSendingEmail = true;

    const subject = this.emailForm.subject;
    const body = this.emailForm.body;
    
    this.emailService.sendEmailToUser(this.selectedUser.id, subject, body).subscribe({
      next: (response: any) => {
        console.log("Email sent successfully:", response);
        this.isSendingEmail = false;
        this.closeEmailModal(); // סוגר את המודל אחרי שליחה
      },
      error: (error: any) => {
        console.error("Error sending email:", error);
        this.isSendingEmail = false;
      }
    });
    
    
  }
}
