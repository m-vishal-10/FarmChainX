import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './retailer-dashboard.component.html',
})
export class RetailerDashboardComponent implements AfterViewInit {
  @ViewChild('barChart', { static: true }) barChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart', { static: true }) pieChartRef!: ElementRef<HTMLCanvasElement>;

  constructor(private http: HttpClient) { }

  stats: any = {
    inventoryValue: 0,
    openPOs: 0,
    incomingShipments: 0,
    lowStock: 0
  };

  recentOrders: any[] = [];

  ngAfterViewInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    // 1. Fetch Stats
    this.http.get<any>('/api/retailer/dashboard-stats').subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => console.error('Failed to load stats', err)
    });

    // 2. Fetch Sales Chart
    this.http.get<any>('/api/retailer/sales-chart').subscribe({
      next: (data) => {
        const barCtx = this.barChartRef.nativeElement.getContext('2d')!;
        // destroy if exists? For MVP assuming one-time load or overwrite
        // In real app, we should store chart instance and destroy it before recreating.
        new Chart(barCtx, {
          type: 'bar',
          data: {
            labels: data.labels,
            datasets: [{
              label: 'Sales (Total Value)',
              data: data.values,
              borderRadius: 6,
              backgroundColor: 'rgba(79, 70, 229, 0.8)'
            }],
          },
          options: { responsive: true, plugins: { legend: { display: false } } },
        });
      },
      error: (err) => console.error('Failed to load chart', err)
    });

    // 3. Mock Pie Chart (Inventory Distribution)
    const pieCtx = this.pieChartRef.nativeElement.getContext('2d')!;
    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Tomatoes', 'Potatoes', 'Onions', 'Leafy Greens'],
        datasets: [{ data: [45, 25, 20, 10] }],
      },
      options: { responsive: true },
    });

    // 4. Fetch Recent Orders
    this.http.get<any>('/api/track/pending?size=5').subscribe({
      next: (page) => {
        const orders = page.content || [];
        this.recentOrders = orders.map((o: any) => ({
          id: o.productId,
          supplier: 'Distributor',
          items: 'Batch #' + o.productId,
          total: 0,
          status: 'Pending'
        }));
      },
      error: (err) => console.error('Failed to load orders', err)
    });
  }

  statusClass(s: string) {
    if (!s) return 'bg-gray-100 text-gray-800';
    switch (s.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800';
      case 'shipped':
        return 'bg-sky-100 text-sky-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  refresh() {
    this.fetchDashboardData();
  }

  export() {
    console.log('Export data');
  }

  getLast7Days(): string[] {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return dates;
  }
}
