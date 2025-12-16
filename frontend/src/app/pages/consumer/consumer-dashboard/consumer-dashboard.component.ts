import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-consumer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consumer-dashboard.component.html',
})
export class ConsumerDashboardComponent implements AfterViewInit {
  @ViewChild('spendChart') spendChartRef!: ElementRef;

  userProfile = {
    name: 'Subhash Kumawat',
    memberSince: 'Jan 2024',
    location: 'Rajasthan, India',
    ecoPoints: 450
  };

  stats = {
    totalScans: 24,
    verifiedProducts: 22,
    carbonOffset: '12kg',
    localSupport: '₹8,500' // Amount spent on local farmers
  };

  recentScans = [
    { id: 'BATCH-101', product: 'Organic Wheat', date: '2 hrs ago', status: 'Verified', image: 'assets/wheat.jpg' },
    { id: 'BATCH-105', product: 'Fresh Tomato', date: '1 day ago', status: 'Verified', image: 'assets/tomato.jpg' },
    { id: 'BATCH-99', product: 'Basmati Rice', date: '3 days ago', status: 'Suspicious', image: 'assets/rice.jpg' }
  ];

  constructor() { }

  ngAfterViewInit() {
    this.initSpendChart();
  }

  initSpendChart() {
    const ctx = this.spendChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Vegetables', 'Grains', 'Fruits', 'Dairy'],
        datasets: [{
          data: [40, 30, 20, 10],
          backgroundColor: [
            '#10B981', // Emerald
            '#F59E0B', // Amber
            '#EF4444', // Red (Fruits)
            '#3B82F6'  // Blue
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        cutout: '75%',
        plugins: {
          legend: { position: 'right' }
        }
      }
    });
  }

  getStatusColor(status: string): string {
    return status === 'Verified' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50';
  }
}