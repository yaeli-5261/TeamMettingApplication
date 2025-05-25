import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import {  Router, RouterLink } from "@angular/router"
import { TeamService, TeamPostDTO } from "../../Service/team.service"

@Component({
  selector: "app-add-team",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./add-team.component.html",
  styleUrls: ["./add-team.component.css"],
})
export class AddTeamComponent {
  teamForm: FormGroup
  isLoading = false
  errorMessage = ""
  successMessage = ""
  currentYear = new Date().getFullYear()

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private router: Router,
  ) {
    this.teamForm = this.fb.group({
      name: ["", Validators.required],
      description: [""],
    })
  }

  onSubmit(): void {
    if (this.teamForm.invalid) return

    this.isLoading = true
    this.errorMessage = ""
    this.successMessage = ""

    const teamData: TeamPostDTO = {
      name: this.teamForm.value.name,
      description: this.teamForm.value.description || "",
    }

    this.teamService.addTeam(teamData).subscribe({
      next: (response:any) => {
        this.successMessage = "Team created successfully!"
        this.isLoading = false
        setTimeout(() => {
          this.router.navigate(["/management"])
        }, 2000)
      },
      error: (err:any) => {
        this.errorMessage = "Failed to create team. Please try again."
        this.isLoading = false
        console.error("Team creation error:", err)
      },
    })
  }

  goBack(): void {
    this.router.navigate(["/management"])
  }
}
