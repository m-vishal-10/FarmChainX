import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consumer-history',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,     // ✅ Required for ngModel
    DecimalPipe,     // ✅ Will be used in HTML
    DatePipe         // ✅ Will be used in HTML
  ],
  templateUrl: './consumer-history.component.html',
})
export class ConsumerHistoryComponent implements OnInit {

  filterStatus = 'All';
  searchQuery = '';

  allOrders = [
    {
      id: 'ORD-2025-1001',
      items: [
        { name: 'Organic Apples (Kashmir)', qty: '2kg', price: 400, image: 'assets/apple.jpg' },
        { name: 'Raw Honey', qty: '500g', price: 350, image: 'assets/honey.jpg' }
      ],
      total: 750,
      date: '2025-12-14',
      status: 'Delivered',
      ecoScore: 92,
      vendor: 'Green Earth Organics'
    },
    {
      id: 'ORD-2025-1005',
      items: [
        { name: 'Fresh Spinach', qty: '1kg', price: 80, image: 'assets/spinach.jpg' }
      ],
      total: 80,
      date: '2025-12-15',
      status: 'Processing',
      ecoScore: 88,
      vendor: 'Local Farm Co-op'
    },
    {
      id: 'ORD-2025-0998',
      items: [
        { name: 'Basmati Rice (Premium)', qty: '5kg', price: 600, image: 'assets/rice.jpg' },
        { name: 'Red Lentils', qty: '1kg', price: 120, image: 'assets/dal.jpg' }
      ],
      total: 720,
      date: '2025-12-10',
      status: 'Delivered',
      ecoScore: 95,
      vendor: 'Sikar Agro'
    }
  ];

  filteredOrders = [...this.allOrders];

  ngOnInit(): void {}

  filter(): void {
    this.filteredOrders = this.allOrders.filter(order => {
      const matchStatus =
        this.filterStatus === 'All' || order.status === this.filterStatus;

      const matchSearch =
        order.items.some(item =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        ) ||
        order.vendor.toLowerCase().includes(this.searchQuery.toLowerCase());

      return matchStatus && matchSearch;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-700';
      case 'Processing':
        return 'bg-blue-100 text-blue-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
