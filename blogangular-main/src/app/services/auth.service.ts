// src/app/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoginDTO, UserRegistrationDTO, UserResponseDTO } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8092/api/auth';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if running in the browser
  }

  login(loginData: UserLoginDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(`${this.baseUrl}/login`, loginData);
  }

  register(registrationData: UserRegistrationDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(`${this.baseUrl}/register`, registrationData);
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  isLoggedIn(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem('authToken');
    }
    return false; // Return false if not in the browser
  }

  getAuthToken(): string | null {
    if (this.isBrowser) {
      const token = localStorage.getItem('authToken');
      return token ? `Bearer ${token}` : null;
    }
    return null; // Return null if not in the browser
  }

  getUserRole(): string | null {
    if (this.isBrowser) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user).role : null;
    }
    return null; // Return null if not in the browser
  }

  isTokenExpired(): boolean {
    const token = this.getAuthToken();
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return expirationTime < Date.now();
  }

  getProtectedData(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.getAuthToken() || '' // Include the Bearer token in the headers
    });
    return this.http.get(`${this.baseUrl}/protected`, { headers });
  }

  getUserId() {
    if (this.isBrowser) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user).id : null;
    }
    return null; // Return null if not in the browser
  }
}
