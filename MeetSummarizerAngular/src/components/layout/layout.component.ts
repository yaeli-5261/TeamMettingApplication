import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { AuthService } from "../../Service/auth.service"

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"],
})
export class AppLayoutComponent implements OnInit {
  isAdmin = false
  userName = ""
  isSidebarOpen = true
  searchQuery = ""
  currentYear: number = new Date().getFullYear();
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser()
    this.isAdmin = user?.role?.roleName === "Admin"
    this.userName = user?.userName || "User"
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }

  search(): void {
    console.log("Searching for:", this.searchQuery)
    // Implement search functionality
    // This could navigate to a search results page or filter current content
  }
}
