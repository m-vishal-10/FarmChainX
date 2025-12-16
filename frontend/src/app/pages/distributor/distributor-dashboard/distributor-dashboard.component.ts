import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-distributor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, DecimalPipe],
  templateUrl: './distributor-dashboard.component.html'
})
export class DistributorDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('inventoryChart') inventoryChartRef!: ElementRef;
  @ViewChild('salesChart') salesChartRef!: ElementRef;

  stats = {
    connectedFarmers: 12,
    activeBatches: 45,
    pendingOrders: 8,
    revenue: 124500
  };

  recentActivities = [
    { type: 'purchase', text: 'Purchased 200kg Wheat from Farmer Ravi', time: '2 hours ago' },
    { type: 'logistics', text: 'Shipment #SH-829 delivered to Retailer Metro', time: '5 hours ago' },
    { type: 'alert', text: 'Low stock warning: Basmati Rice', time: '1 day ago' }
  ];

  inventoryChart: any;
  salesChart: any;

  constructor() { }

  ngOnInit(): void {
    // In real app, fetch stats from Service
  }

  ngAfterViewInit() {
    this.initInventoryChart();
    this.initSalesChart();
  }

  initInventoryChart() {
    const ctx = this.inventoryChartRef.nativeElement.getContext('2d');
    this.inventoryChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Wheat', 'Rice', 'Corn', 'Cotton'],
        datasets: [{
          data: [35, 25, 20, 20],
          backgroundColor: [
            '#10B981', // Emerald 500
            '#3B82F6', // Blue 500
            '#F59E0B', // Amber 500
            '#8B5CF6'  // Purple 500
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        cutout: '70%'
      }
    });
  }

  initSalesChart() {
    const ctx = this.salesChartRef.nativeElement.getContext('2d');
    this.salesChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue (₹)',
          data: [65000, 59000, 80000, 81000, 56000, 124500],
          backgroundColor: '#059669', // Emerald 600
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
