import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8091/auth/login'; 

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(this.apiUrl, credentials).subscribe({
        next: response => {
          localStorage.removeItem('token');
          localStorage.setItem('token', response.token);
          
          observer.next(response);
          observer.complete();
        },
        error: error => {
          observer.error(error);
        }
      });
    });
  }
}
