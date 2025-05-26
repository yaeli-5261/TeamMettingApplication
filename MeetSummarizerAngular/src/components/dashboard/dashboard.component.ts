import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { NgxChartsModule } from "@swimlane/ngx-charts"
import { Router, RouterModule } from "@angular/router"
import { AuthService } from "../../Service/auth.service"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { UserRoleChartComponent } from "../../user-role-chart/user-role-chart.component";
import { environment } from "../../environments/environment.prod"

interface TeamMeetingData {
  name: string
  value: number
}

interface RecentActivity {
  id: number
  type: string
  title: string
  team: string
  date: string
  user: string
}

@Component({
  selector: "app-dashboard",
  imports: [NgxChartsModule, CommonModule, RouterModule,  MatProgressSpinnerModule, UserRoleChartComponent],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  meetingsPerTeam: TeamMeetingData[] = []
  totalMeetings = 0
  totalTeams = 0
  totalUsers = 0
  isLoading = true
  error = ""
  apiUrl = `${environment.apiUrl}/api`

  view: [number, number] = [700, 400]
  showXAxis = true
  showYAxis = true
  gradient = true
  showLegend = false
  showXAxisLabel = true
  xAxisLabel = "Teams"
  showYAxisLabel = true
  yAxisLabel = "Meetings"
  colorScheme = {
    domain: ["#10a37f", "#3498db", "#9b59b6", "#e74c3c", "#f1c40f", "#1abc9c"],
  }
 

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData()
  }

  loadDashboardData(): void {
    this.isLoading = true
    
    this.authService.getAllUsers().subscribe({
      next: (users) => {
        this.totalUsers = users.length
        this.loadMeetingsPerTeam()
      },
      error: (err) => {
        console.error("Error loading users:", err)
        this.error = "Failed to load dashboard data"
        this.isLoading = false
      }
    })
  }


  loadMeetingsPerTeam(): void {
    this.authService.getAllTeams().subscribe({
      next: (teams) => {
        this.totalTeams = teams.length
        
        this.meetingsPerTeam = teams.map((team, index) => {
          const meetingCount = Math.floor(Math.random() * 12) + 3
          this.totalMeetings += meetingCount
          
          return {
            name: team.name,
            value: meetingCount
          }
        })
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error loading teams:", err)
        this.error = "Failed to load dashboard data"
        this.isLoading = false
      }
    })
  }
  
  onSelect(event: any): void {
    console.log("Item clicked", event)
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

}


