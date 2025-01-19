// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { AdminComponent } from './components/admin/admin.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './guards/auth.guards';
import {CarDetailComponent} from './components/car-detail/car-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'auth', component: AuthComponent },

  // Role-based routes
  { path: 'cars', component: CarComponent, canActivate: [AuthGuard], data: { role: ['USER', 'ADMIN'] } },
  { path: 'brands', component: BrandComponent, canActivate: [AuthGuard], data: { role: ['USER', 'ADMIN'] } },
  { path: 'reservations', component: ReservationComponent, canActivate: [AuthGuard], data: { role: ['USER', 'ADMIN'] } },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' } },
  { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
  { path: 'car/:id', component: CarDetailComponent },


  // Error page
  { path: 'error', component: ErrorComponent },

  // Default redirect
  { path: '**', redirectTo: '/dashboard' }
];
