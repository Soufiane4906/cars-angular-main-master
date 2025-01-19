// src/app/services/car.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarDTO } from '../models/car.model';
import { AuthService } from './auth.service'; // Import the AuthService

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'http://localhost:8092/api/cars';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper method to get headers with the JWT token
  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken(); // Get the JWT token from AuthService
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token || '' // Include the JWT token in the Authorization header
    });
  }

  getAllCars(): Observable<CarDTO[]> {
    const headers = this.getHeaders(); // Include headers with the JWT token
    return this.http.get<CarDTO[]>(this.baseUrl, { headers });
  }

  getCarById(id: number): Observable<CarDTO> {
    const headers = this.getHeaders(); // Include headers with the JWT token
    return this.http.get<CarDTO>(`${this.baseUrl}/${id}`, { headers });
  }

  createCar(car: CarDTO): Observable<CarDTO> {
    const headers = this.getHeaders(); // Include headers with the JWT token
    return this.http.post<CarDTO>(this.baseUrl, car, { headers });
  }

  updateCar(id: number, car: CarDTO): Observable<CarDTO> {
    const headers = this.getHeaders(); // Include headers with the JWT token
    return this.http.put<CarDTO>(`${this.baseUrl}/${id}`, car, { headers });
  }

  deleteCar(id: number): Observable<void> {
    const headers = this.getHeaders(); // Include headers with the JWT token
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
}
