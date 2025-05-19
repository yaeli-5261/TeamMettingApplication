import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUser();

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    if (user.role?.roleName !== 'Admin') {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
