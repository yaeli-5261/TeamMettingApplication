import { Component } from '@angular/core';
import {  RouterModule, RouterOutlet } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgxChartsModule ],
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