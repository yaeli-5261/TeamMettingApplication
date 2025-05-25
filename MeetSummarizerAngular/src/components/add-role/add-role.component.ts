import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Router, RouterLink } from "@angular/router"
import { RoleService, RoleDTO } from "../../Service/role.service"

@Component({
  selector: "app-add-role",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.css"],
})
export class AddRoleComponent {
  roleForm: FormGroup
  isLoading = false
  errorMessage = ""
  successMessage = ""
  currentYear = new Date().getFullYear()

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private router: Router,
  ) {
    this.roleForm = this.fb.group({
      roleName: ["", Validators.required],
      description: [""],
    })
  }

  onSubmit(): void {
    if (this.roleForm.invalid) return

    this.isLoading = true
    this.errorMessage = ""
    this.successMessage = ""

    const roleData: RoleDTO = {
      roleName: this.roleForm.value.roleName,
      description: this.roleForm.value.description || "",
    }

    this.roleService.addRole(roleData).subscribe({
      next: (response:any) => {
        this.successMessage = "Role created successfully!"
        this.isLoading = false
        setTimeout(() => {
          this.router.navigate(["/management"])
        }, 2000)
      },
      error: (err:any) => {
        this.errorMessage = "Failed to create role. Please try again."
        this.isLoading = false
        console.error("Role creation error:", err)
      },
    })
  }

  goBack(): void {
    this.router.navigate(["/management"])
  }
  Home():void{
    this.router.navigate(["/home"])
}
}
