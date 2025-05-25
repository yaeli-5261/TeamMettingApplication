import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-management-dashboard",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./management-dashboard.component.html",
  styleUrls: ["./management-dashboard.component.css"],
})
export class ManagementDashboardComponent {
  currentYear = new Date().getFullYear()
}
