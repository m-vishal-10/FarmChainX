import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

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

  allOrders: any[] = [];
  filteredOrders: any[] = [];
  loading = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getConsumerHistory().subscribe({
      next: (data) => {
        this.allOrders = data;
        this.filteredOrders = data;
        this.loading = false;

        // Debug: Log order structure to see what fields are available
        if (data && data.length > 0) {
          console.log('Sample order data:', data[0]);
          console.log('Available UUID fields:', {
            publicUuid: data[0].publicUuid,
            uuid: data[0].uuid,
            productId: data[0].productId,
            id: data[0].id
          });
        }
      },
      error: (err) => {
        console.error('Failed to load history', err);
        this.loading = false;
      }
    });
  }

  filter(): void {
    this.filteredOrders = this.allOrders.filter(order => {
      const matchStatus =
        this.filterStatus === 'All' || order.status === this.filterStatus;

      const matchSearch =
        (order.items && order.items.some((item: any) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )) ||
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

  showNoTrackingMessage(orderId: string): void {
    alert(`Tracking information is not available for order #${orderId}. Please contact support for assistance.`);
  }

  writeReview(order: any): void {
    // TODO: Implement review modal or navigate to review page
    console.log('Write review for order:', order);
    alert(`Review feature coming soon! You can write a review for order #${order.id}`);
  }

  trackOrder(order: any): void {
    const uuid = order.publicUuid || order.uuid || order.productId;
    console.log('Tracking order with UUID:', uuid);

    if (!uuid) {
      this.showNoTrackingMessage(order.id);
    }
  }
}
