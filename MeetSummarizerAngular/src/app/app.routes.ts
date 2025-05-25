import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { AdminGuard } from '../gaurds/auth.guard';
import { HeatmapCalendarComponent } from '../components/heatmap-calendar/heatmap-calendar.component';
import { ListUsersComponent } from '../components/list-users/list-users.component';
import { UserRoleChartComponent } from '../user-role-chart/user-role-chart.component';
import { AddRoleComponent } from '../components/add-role/add-role.component';
import { AddTeamComponent } from '../components/add-team/add-team.component';
import { ManagementDashboardComponent } from '../components/management-dashboard/management-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AdminGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'users', component: ListUsersComponent, canActivate: [AdminGuard] },
  { path: 'user-role', component: UserRoleChartComponent, canActivate: [AdminGuard] },


  { path: 'heatmap-calendar', component: HeatmapCalendarComponent, canActivate: [AdminGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AdminGuard]  // רק אדמין יוכל לגשת
  },
  { path: "", redirectTo: "/management", pathMatch: "full" },
  { path: "management", component: ManagementDashboardComponent },
  { path: "register", component: RegisterComponent },
  { path: "add-team", component: AddTeamComponent },
  { path: "add-role", component: AddRoleComponent },
];
