import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from "../components/dashboard/dashboard.component";
// import { RegisterComponent } from '../components/register/register.component';
// import { LoginComponent } from '../components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgxChartsModule,RouterLink ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularAdmin';
  isLoggedIn = !!localStorage.getItem('token');

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }
}