// src/app/models/reservation.model.ts
import {CarDTO} from './car.model';

export interface ReservationDTO {
  car: CarDTO;
  id?: number;
  reservationDate: Date;
  returnDate: Date;
  userId: number;
  carId: number;
}
