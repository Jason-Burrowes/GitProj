import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';  // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Login method which includes username, password, and role
  login(username: string, password: string, role: string): Observable<any> {
    const loginData = { username, password, role };
    return this.http.post<any>(`${this.apiUrl}/login`, loginData);
  }

  // User registration method (create user)
  createUser(username: string, password: string, role: string): Observable<any> {
    const userData = { username, password, role };
    return this.http.post<any>(`${this.apiUrl}/register`, userData);  // Replace with your registration endpoint
  }

  // Password reset method
  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { email });
  }

  // Logout method
  logout(): void {
    // Logic to clear session, tokens, etc.
    console.log('User logged out');
  }
}
