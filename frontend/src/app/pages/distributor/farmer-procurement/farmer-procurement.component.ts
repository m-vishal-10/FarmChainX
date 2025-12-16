import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-farmer-procurement',
  standalone: true,
  imports: [CommonModule, DecimalPipe, DatePipe],
  templateUrl: './farmer-procurement.component.html'
})
export class FarmerProcurementComponent implements OnInit {
  availableCrops: any[] = [];
  loading = true;
  buyingId: number | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadMarketplace();
  }

  loadMarketplace() {
    this.loading = true;
    // FETCH ALL PRODUCTS (In real app, filter by status='AVAILABLE')
    this.http.get<any>('/api/products/my?page=0&size=20').subscribe({
      next: (res) => {
        // Mock filter: Only show items that are NOT sold
        // Since backend might not have 'sold' flag yet, we treat all as available for demo
        this.availableCrops = res.content || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Marketplace error', err);
        this.loading = false;
      }
    });
  }

  buyCrop(crop: any) {
    if (confirm(`Confirm purchase of ${crop.cropName} for ₹${this.estimatePrice(crop)}?`)) {
      this.buyingId = crop.id;

      // Simulate API call to buy
      setTimeout(() => {
        alert(`✅ Automatically transferred Ownership of Batch #${crop.id} to your inventory.\n\nBlockchain Transaction: 0x7f2...9a1`);

        // Remove from list locally to simulate "Sold"
        this.availableCrops = this.availableCrops.filter(c => c.id !== crop.id);
        this.buyingId = null;
      }, 1500);
    }
  }

  estimatePrice(crop: any): number {
    // Mock price calc based on quality
    let base = 2000;
    if (crop.qualityGrade?.includes('A')) base *= 1.5;
    if (crop.qualityGrade?.includes('B')) base *= 1.2;
    return base;
  }

  getQualityColor(grade: string): string {
    if (!grade) return 'bg-gray-100 text-gray-800';
    const g = grade.toUpperCase();
    if (g.includes('A') || g.includes('A+')) return 'bg-emerald-100 text-emerald-800';
    if (g.includes('B')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  }
}
