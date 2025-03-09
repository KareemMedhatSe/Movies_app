import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class SignupPageComponent {
  signupForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['USER', Validators.required]  
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.http.post('http://localhost:8091/auth/register', this.signupForm.value, { responseType: 'text' }).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.message = 'User registered successfully!';
          setTimeout(() => this.router.navigate(['/login']), 1500); 
        },
        error: (error) => {
          console.error('Signup failed:', error);
          if (error.status === 400) {
            this.message = 'Error: Username is already taken!';
          } else {
            this.message = 'An unexpected error occurred!';
          }
        }
      });
    }
  }
  
}
