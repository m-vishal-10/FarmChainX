import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  productId: number;
  action: string;
  timestamp: string;
  actorId: number;
  details: string;
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

export interface AdminAnalytics {
  userGrowth: { date: string; count: number }[];
  productsByStatus: { [key: string]: number };
  supplyChainMetrics: {
    totalTransfers: number;
    confirmedTransfers: number;
    pendingTransfers: number;
    rejectedTransfers: number;
    transfersByRole: { [key: string]: number };
  };
  activitySummary: {
    todayRegistrations: number;
    todayProducts: number;
    todayTransactions: number;
    averageTransferTime: number;
  };
}

export interface SystemSettings {
  applicationVersion: string;
  databaseStatus: string;
  uptime: number;
  totalUsers: number;
  totalProducts: number;
  totalTransactions: number;
  registrationEnabled: boolean;
  maintenanceMode: boolean;
  emailNotificationsEnabled: boolean;
  maxUploadSize: number;
  sessionTimeout: number;
  defaultUserRole: string;
}



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = `${environment.apiUrl}/admin`;

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

  getAnalytics(): Observable<AdminAnalytics> {
    return this.http.get<AdminAnalytics>(`${this.baseUrl}/analytics`);
  }

  getSettings(): Observable<SystemSettings> {
    return this.http.get<SystemSettings>(`${this.baseUrl}/settings`);
  }

  updateSettings(settings: SystemSettings): Observable<SystemSettings> {
    return this.http.post<SystemSettings>(`${this.baseUrl}/settings`, settings);
  }


}