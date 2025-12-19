import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminOverview {
  totalUsers: number;
  totalProducts: number;
  totalLogs: number;
  totalFeedbacks: number;

  salesVolume: number;
  pendingOrders: number;
  newUsersToday: number;
  averageRating: number;
}

export interface SupplyChainLog {
  id: number;
  product_id: number;
  action: string;
  timestamp: string;
  actor_id: number;
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
  roles: string[];
}



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = '/api/admin';

  constructor(private http: HttpClient) { }

  getOverview(): Observable<AdminOverview> {
    return this.http.get<AdminOverview>(`${this.baseUrl}/overview`);
  }

  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.baseUrl}/users`);
  }

  getSystemLogs(): Observable<SupplyChainLog[]> {
    return this.http.get<SupplyChainLog[]>(`${this.baseUrl}/logs`);
  }

  promoteUser(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/promote/${userId}`, {});
  }


}