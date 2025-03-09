import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            const decodedToken = this.decodeToken(response.token);
            const userRole = decodedToken?.role || '';
  
            if (userRole === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else if (userRole === 'USER') {
              this.router.navigate(['/user']);
            } else {
              console.error('Unknown role, staying on login page.');
            }
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
      });
    }
  }
  
  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }
  
}
