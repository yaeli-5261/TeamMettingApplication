import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { Role, RoleService, RoleDTO } from "../../Service/role.service"

@Component({
  selector: "app-roles-list",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: "./roles-list.component.html",
  styleUrls: ["./roles-list.component.css"],
})
export class RolesListComponent implements OnInit {
  roles: Role[] = []
  filteredRoles: Role[] = []
  isLoading = true
  searchTerm = ""
  selectedRole: Role | null = null
  showEditModal = false
  showDeleteModal = false
  editForm = {
    roleName: "",
    description: "",
  }

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles()
  }

  loadRoles(): void {
    this.isLoading = true
    this.roleService.getAllRoles().subscribe({
      next: (roles:any) => {
        this.roles = roles
        this.filteredRoles = [...roles]
        this.isLoading = false
      },
      error: (error:any) => {
        console.error("Error loading roles:", error)
        this.isLoading = false
      },
    })
  }

  filterRoles(): void {
    if (!this.searchTerm) {
      this.filteredRoles = [...this.roles]
    } else {
      this.filteredRoles = this.roles.filter(
        (role) =>
          role.roleName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          (role.description && role.description.toLowerCase().includes(this.searchTerm.toLowerCase())),
      )
    }
  }

  openEditModal(role: Role): void {
    this.selectedRole = role
    this.editForm = {
      roleName: role.roleName,
      description: role.description || "",
    }
    this.showEditModal = true
  }

  closeEditModal(): void {
    this.showEditModal = false
    this.selectedRole = null
  }

  saveRole(): void {
    if (!this.selectedRole) return

    const updateData: RoleDTO = {
      roleName: this.editForm.roleName,
      description: this.editForm.description,
    }

    this.roleService.updateRole(this.selectedRole.id, updateData).subscribe({
      next: () => {
        this.loadRoles()
        this.closeEditModal()
      },
      error: (error:any) => {
        console.error("Error updating role:", error)
      },
    })
  }

  openDeleteModal(role: Role): void {
    this.selectedRole = role
    this.showDeleteModal = true
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false
    this.selectedRole = null
  }

  confirmDelete(): void {
    if (!this.selectedRole) return

    this.roleService.deleteRole(this.selectedRole.id).subscribe({
      next: () => {
        this.loadRoles()
        this.closeDeleteModal()
      },
      error: (error:any) => {
        console.error("Error deleting role:", error)
      },
    })
  }
}
