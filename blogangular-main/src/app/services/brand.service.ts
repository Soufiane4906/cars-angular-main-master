// src/app/services/brand.service.ts
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { BrandDTO } from '../models/brand.model';
  import { AuthService } from './auth.service'; // Import the AuthService

  @Injectable({
    providedIn: 'root'
  })
  export class BrandService {
    private baseUrl = 'http://localhost:8092/api/brands';

    constructor(private http: HttpClient, private authService: AuthService) {}

    // Helper method to get headers with the JWT token
    private getHeaders(): HttpHeaders {
      const token = this.authService.getAuthToken(); // Get the JWT token from AuthService
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token || '' // Include the JWT token in the Authorization header
      });
    }

    getAllBrands(): Observable<BrandDTO[]> {
      const headers = this.getHeaders(); // Include headers with the JWT token
      return this.http.get<BrandDTO[]>(this.baseUrl, { headers });
    }

    getBrandById(id: number): Observable<BrandDTO> {
      const headers = this.getHeaders(); // Include headers with the JWT token
      return this.http.get<BrandDTO>(`${this.baseUrl}/${id}`, { headers });
    }

    createBrand(brand: BrandDTO): Observable<BrandDTO> {
      const headers = this.getHeaders(); // Include headers with the JWT token
      return this.http.post<BrandDTO>(this.baseUrl, brand, { headers });
    }

    updateBrand(id: number, brand: BrandDTO): Observable<BrandDTO> {
      const headers = this.getHeaders(); // Include headers with the JWT token
      return this.http.put<BrandDTO>(`${this.baseUrl}/${id}`, brand, { headers });
    }

    deleteBrand(id: number): Observable<void> {
      const headers = this.getHeaders(); // Include headers with the JWT token
      return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
    }
  }
