// import { Component } from "@angular/core"
// import { CommonModule } from "@angular/common"
// import { RouterLink } from "@angular/router"

// @Component({
//   selector: "app-management-dashboard",
//   standalone: true,
//   imports: [CommonModule, RouterLink],
//   templateUrl: "./management-dashboard.component.html",
//   styleUrls: ["./management-dashboard.component.css"],
// })
// export class ManagementDashboardComponent {
//   currentYear = new Date().getFullYear()
// }




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

  managementCards = [
    {
      title: "Users",
      description: "Manage user accounts and permissions",
      icon: "users",
      addRoute: "/register",
      viewRoute: "/users-list",
      color: "blue",
      stats: "Active users in system",
    },
    {
      title: "Teams",
      description: "Organize and manage team structures",
      icon: "team",
      addRoute: "/add-team",
      viewRoute: "/teams-list",
      color: "green",
      stats: "Teams created",
    },
    {
      title: "Roles",
      description: "Define roles and access levels",
      icon: "role",
      addRoute: "/add-role",
      viewRoute: "/roles-list",
      color: "purple",
      stats: "Role definitions",
    },
  ]
}
