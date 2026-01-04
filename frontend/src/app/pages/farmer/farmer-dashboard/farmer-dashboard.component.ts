import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface AIPrediction {
  id: number;
  productId: number;
  productName: string | null;
  qualityGrade: string | null;
  qualityScore: number | null;
  confidence: number | null;
  marketReadiness: string | null;
  storageRecommendation: string | null;
  optimalSellingWindow: string | null;
  priceEstimate: string | null;
  certificationEligibility: string | null;
  createdAt: string;
  fullPrediction?: any;
}

interface FarmerStats {
  totalProducts: number;
  soldProducts: number;
  activeProducts: number;
  totalRevenue: number;
  estimatedValue: number;
  farmerName: string;
}

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farmer-dashboard.component.html',
})
export class FarmerDashboardComponent implements OnInit {
  private http = inject(HttpClient);

  // Statistics data
  stats: FarmerStats | null = null;
  statsLoading = true;
  statsError: string | null = null;

  // Predictions data
  predictions: AIPrediction[] = [];
  predictionsLoading = true;
  predictionsError: string | null = null;

  ngOnInit(): void {
    this.loadStats();
    this.loadPredictions();
  }

  loadStats(): void {
    this.statsLoading = true;
    this.statsError = null;

    this.http.get<FarmerStats>(`${environment.apiUrl}/farmer/stats`).subscribe({
      next: (data) => {
        this.stats = data;
        this.statsLoading = false;
      },
      error: (err) => {
        this.statsError = err.error?.error || 'Failed to load statistics';
        this.statsLoading = false;
        console.error('Error loading stats:', err);
      },
    });
  }

  loadPredictions(): void {
    this.predictionsLoading = true;
    this.predictionsError = null;

    this.http.get<{ predictions: AIPrediction[]; total: number }>(`${environment.apiUrl}/predictions/my`).subscribe({
      next: (response) => {
        this.predictions = response.predictions || [];
        this.predictionsLoading = false;
      },
      error: (err) => {
        this.predictionsError = err.error?.error || 'Failed to load predictions';
        this.predictionsLoading = false;
        console.error('Error loading predictions:', err);
      },
    });
  }

  formatCurrency(value: number | null | undefined): string {
    if (!value) return '₹0';
    return '₹' + value.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getQualityGradeColor(grade: string | null): string {
    if (!grade) return 'bg-gray-100 text-gray-800';
    const g = grade.toUpperCase();
    if (g.includes('A+') || g.includes('A')) return 'bg-green-100 text-green-800';
    if (g.includes('B+') || g.includes('B')) return 'bg-blue-100 text-blue-800';
    if (g.includes('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  }

  getConfidenceColor(confidence: number | null): string {
    if (!confidence) return 'bg-gray-100 text-gray-800';
    if (confidence >= 80) return 'bg-green-100 text-green-800';
    if (confidence >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  }
}


