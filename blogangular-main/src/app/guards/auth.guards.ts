// src/app/guards/auth.guards.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn() && !this.authService.isTokenExpired()) {
      const userRole = this.authService.getUserRole();
      const expectedRole = route.data['role'];

      // Handle case where expectedRole is an array of roles
      if (Array.isArray(expectedRole)) {
        if (expectedRole.includes(userRole)) {
          return true; // User has one of the required roles
        } else {
          this.router.navigate(['/error']); // Redirect to error page
          return false;
        }
      }
      // Handle case where expectedRole is a single role
      else if (userRole === expectedRole) {
        return true; // User has the required role
      } else {
        this.router.navigate(['/error']); // Redirect to error page
        return false;
      }
    } else {
      this.router.navigate(['/error']); // Redirect to error page if not logged in or token is expired
      return false;
    }
  }
}
