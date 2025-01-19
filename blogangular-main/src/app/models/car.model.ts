// src/app/models/car.model.ts
export interface CarDTO {
  imageUrl?: string;
  id?: number;
  model: string;
  color: string;
  price: number;
  registrationDate: string;
  brandId: number;
}
