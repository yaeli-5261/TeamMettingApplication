import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterLink, RouterModule } from "@angular/router"
import { AuthService } from "../../Service/auth.service"

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  isAdmin = false
  userName = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser()
    if (!user) {
      this.router.navigate(["/login"])
      return
    }

    this.isAdmin = user?.role?.roleName === "Admin"
    this.userName = user?.userName || ""
  }

  goToRegister(): void {
    this.router.navigate(["/register"])
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
