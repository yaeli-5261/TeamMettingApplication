// import { Component, OnInit } from '@angular/core'
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
// import { ChartData, ChartType } from 'chart.js'
// import { forkJoin } from 'rxjs'
// import { map } from 'rxjs/operators'
// import { AuthService } from '../../Service/auth.service'
// import { NgChartsModule } from 'ng2-charts'

// @Component({
//   standalone: true,
//   imports: [MatProgressSpinnerModule,NgChartsModule],
    
//   templateUrl: './user-role-chart.component.html',
//   styleUrls: ['./user-role-chart.component.css'],
// })
// export class UserRoleChartComponent implements OnInit {
//   public pieChartData: ChartData<'pie', number[], string | string[]> = {
//     labels: [],
//     datasets: [
//       {
//         data: [],
//       },
//     ],
//   }

//   public pieChartType: ChartType = 'pie'
//   public loading = true

//   constructor(private authService: AuthService) {}

//   ngOnInit(): void {
//     this.authService.getAllRoles().subscribe({
//       next: (roles: any[]) => {
//         const requests = roles.map((role) =>
//           this.authService.getAllUsers().pipe(
//             map((users: any[]) => ({
//               role: role.roleName,
//               count: users.filter((u) => u.role?.roleName === role.roleName).length,
//             }))
//           )
//         )

//         forkJoin(requests).subscribe({
//           next: (results: { role: string; count: number }[]) => {
//             this.pieChartData.labels = results.map((r) => r.role)
//             this.pieChartData.datasets[0].data = results.map((r) => r.count)
//             this.loading = false
//           },
//           error: (err) => {
//             console.error('שגיאה בטעינת משתמשים לפי תפקיד', err)
//             this.loading = false
//           },
//         })
//       },
//       error: (err) => {
//         console.error('שגיאה בטעינת תפקידים', err)
//         this.loading = false
//       },
//     })
//   }
// }







import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { ChartData, ChartType } from 'chart.js'
import { forkJoin } from 'rxjs'
import { map } from 'rxjs/operators'
import { NgChartsModule } from 'ng2-charts'
import { CommonModule } from '@angular/common'
import { AuthService } from '../Service/auth.service'

@Component({
  selector: 'app-user-role-chart',
  standalone: true,
  imports: [MatProgressSpinnerModule, NgChartsModule, CommonModule],
  templateUrl: './user-role-chart.component.html',
  styleUrls: ['./user-role-chart.component.css'],
})
export class UserRoleChartComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef | undefined;
  
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#10a37f', 
          '#3498db', 
          '#9b59b6', 
          '#e74c3c', 
          '#f1c40f', 
        ],
        borderWidth: 0,
        hoverOffset: 10
      },
    ],
  }

  public pieChartType: ChartType = 'pie'
  public loading = true
  public totalUsers = 0
  public roleDistribution: { role: string; count: number; percentage: number }[] = []
  public error: string | null = null

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadRoleDistribution();
  }

  loadRoleDistribution(): void {
    this.loading = true;
    this.error = null;
    
    this.authService.getAllRoles().subscribe({
      next: (roles: any[]) => {
        const requests = roles.map((role) =>
          this.authService.getAllUsers().pipe(
            map((users: any[]) => {
              const count = users.filter((u) => u.role?.roleName === role.roleName).length;
              return {
                role: role.roleName,
                count: count,
              };
            })
          )
        );

        forkJoin(requests).subscribe({
          next: (results: { role: string; count: number }[]) => {
            this.totalUsers = results.reduce((sum, item) => sum + item.count, 0);
            
            // Filter out roles with zero users
            const nonZeroResults = results.filter(item => item.count > 0);
            
            this.roleDistribution = nonZeroResults.map(item => ({
              ...item,
              percentage: this.totalUsers > 0 ? Math.round((item.count / this.totalUsers) * 100) : 0
            }));
            
            this.pieChartData.labels = nonZeroResults.map((r) => r.role);
            this.pieChartData.datasets[0].data = nonZeroResults.map((r) => r.count);
            
            this.loading = false;
          },
          error: (err) => {
            console.error('Error loading users by role', err);
            this.error = 'Failed to load user data';
            this.loading = false;
          },
        });
      },
      error: (err:any) => {
        console.error('Error loading roles', err);
        this.error = 'Failed to load roles';
        this.loading = false;
      },
    });
  }

  refreshData(): void {
    this.loadRoleDistribution();
  }
}

