import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { Team, TeamService, TeamPostDTO } from "../../Service/team.service"

@Component({
  selector: "app-teams-list",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: "./teams-list.component.html",
  styleUrls: ["./teams-list.component.css"],
})
export class TeamsListComponent implements OnInit {
  teams: Team[] = []
  filteredTeams: Team[] = []
  isLoading = true
  searchTerm = ""
  selectedTeam: Team | null = null
  showEditModal = false
  showDeleteModal = false
  editForm = {
    name: "",
    description: "",
  }

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.loadTeams()
  }

  loadTeams(): void {
    this.isLoading = true
    this.teamService.getAllTeams().subscribe({
      next: (teams) => {
        this.teams = teams
        this.filteredTeams = [...teams]
        this.isLoading = false
      },
      error: (error) => {
        console.error("Error loading teams:", error)
        this.isLoading = false
      },
    })
  }

  filterTeams(): void {
    if (!this.searchTerm) {
      this.filteredTeams = [...this.teams]
    } else {
      this.filteredTeams = this.teams.filter(
        (team) =>
          team.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          (team.description && team.description.toLowerCase().includes(this.searchTerm.toLowerCase())),
      )
    }
  }

  openEditModal(team: Team): void {
    this.selectedTeam = team
    this.editForm = {
      name: team.name,
      description: team.description || "",
    }
    this.showEditModal = true
  }

  closeEditModal(): void {
    this.showEditModal = false
    this.selectedTeam = null
  }

  saveTeam(): void {
    if (!this.selectedTeam) return

    const updateData: TeamPostDTO = {
      name: this.editForm.name,
      description: this.editForm.description,
    }

    this.teamService.updateTeam(this.selectedTeam.id, updateData).subscribe({
      next: () => {
        this.loadTeams()
        this.closeEditModal()
      },
      error: (error:any) => {
        console.error("Error updating team:", error)
      },
    })
  }

  openDeleteModal(team: Team): void {
    this.selectedTeam = team
    this.showDeleteModal = true
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false
    this.selectedTeam = null
  }

  confirmDelete(): void {
    if (!this.selectedTeam) return

    this.teamService.deleteTeam(this.selectedTeam.id).subscribe({
      next: () => {
        this.loadTeams()
        this.closeDeleteModal()
      },
      error: (error:any) => {
        console.error("Error deleting team:", error)
      },
    })
  }
}
