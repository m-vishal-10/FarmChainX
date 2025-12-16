import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './farmer-dashboard.html'
})
export class FarmerDashboard implements OnInit {
  stats = {
    totalProducts: 0,
    activeBatches: 0,
    totalSales: 0,
    avgQuality: 'A'
  };

  recentUploads: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // In a real app, this would be a dedicated dashboard endpoint.
    // We will simulate it by fetching my products.
    this.http.get<any>('/api/products/my?page=0&size=5&sort=id,desc').subscribe({
      next: (res) => {
        const products = res.content || [];
        this.recentUploads = products;
        
        // Calculate basic stats
        this.stats.totalProducts = res.totalElements || products.length;
        this.stats.activeBatches = products.filter((p: any) => !p.sold).length;
        
        // Mock sales data for now
        this.stats.totalSales = Math.floor(this.stats.totalProducts * 0.4 * 1000); // Dummy calc
        
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load farmer data', err);
        this.loading = false;
      }
    });
  }

  getQualityColor(grade: string): string {
    if (!grade) return 'bg-gray-100 text-gray-800';
    const g = grade.toUpperCase();
    if (g.includes('A') || g.includes('A+')) return 'bg-emerald-100 text-emerald-800';
    if (g.includes('B')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  }
}
