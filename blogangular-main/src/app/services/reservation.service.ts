// src/app/services/reservation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationDTO } from '../models/reservation.model';
import { AuthService } from './auth.service'; // Import the AuthService

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8092/api/reservations';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper method to get headers with the JWT token
  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken(); // Get the JWT token from AuthService
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token || '' // Include the JWT token in the Authorization header
    });
  }

  getAllReservations(): Observable<ReservationDTO[]> {
    const headers = this.getHeaders(); // Include headers with the JWT token
    return this.http.get<ReservationDTO[]>(this.baseUrl, { headers });
  }

  getReservationById(id: number): Observable<ReservationDTO> {
    const headers = this.getHeaders(); // Include headers with the JWT token
    return this.http.get<ReservationDTO>(`${this.baseUrl}/${id}`, { headers });
  }

  createReservation(reservation: ReservationDTO): Observable<ReservationDTO> {
    const headers = this.getHeaders(); // Include headers with the JWT token
    return this.http.post<ReservationDTO>(this.baseUrl, reservation, { headers });
  }

  updateReservation(id: number, reservation: ReservationDTO): Observable<ReservationDTO> {
    const headers = this.getHeaders(); // Include headers with the JWT token
    return this.http.put<ReservationDTO>(`${this.baseUrl}/${id}`, reservation, { headers });
  }

  deleteReservation(id: number): Observable<void> {
    const headers = this.getHeaders(); // Include headers with the JWT token
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }

  getReservationsByUserId(userId: number): Observable<ReservationDTO[]> {
    const headers = this.getHeaders(); // Include headers with the JWT token
    return this.http.get<ReservationDTO[]>(`${this.baseUrl}/user/${userId}`, { headers });
  }

  getReservationsByCarId(carId: number): Observable<ReservationDTO[]> {
    const headers = this.getHeaders(); // Include headers with the JWT token
    return this.http.get<ReservationDTO[]>(`${this.baseUrl}/car/${carId}`, { headers });
  }
}
