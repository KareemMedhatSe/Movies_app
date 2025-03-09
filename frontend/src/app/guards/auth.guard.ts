import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("AuthGuard - No token found, redirecting to login.");
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);  
      console.log("AuthGuard - Decoded Token:", decodedToken);

      const userRole = decodedToken.role || 'UNKNOWN';
      const expectedRole = route.data['role']; 

      if (!expectedRole) {
        console.warn("AuthGuard - No expected role found");
        return true; 
      }

      if (userRole !== expectedRole) {
        
        if (userRole === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
        return false;
      }

      return true;

    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
