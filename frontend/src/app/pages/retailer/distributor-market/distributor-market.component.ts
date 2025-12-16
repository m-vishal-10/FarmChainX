import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-distributor-market',
    standalone: true,
    imports: [CommonModule, DecimalPipe, RouterModule],
    templateUrl: './distributor-market.component.html'
})
export class DistributorMarketComponent implements OnInit {
    // Mock data: items listed by distributors
    marketItems = [
        {
            id: 501,
            cropName: 'Premium Wheat',
            distributor: 'Sikar Agro Distributors',
            quantity: 500,
            unit: 'kg',
            pricePerUnit: 25,
            quality: 'A+',
            location: 'Sikar, RJ',
            verified: true
        },
        {
            id: 502,
            cropName: 'Organic Rice',
            distributor: 'Green Earth Supply',
            quantity: 1000,
            unit: 'kg',
            pricePerUnit: 60,
            quality: 'A',
            location: 'Punjab',
            verified: true
        },
        {
            id: 505,
            cropName: 'Potatoes (Large)',
            distributor: 'Metro Wholesalers',
            quantity: 2000,
            unit: 'kg',
            pricePerUnit: 18,
            quality: 'B',
            location: 'Agra, UP',
            verified: true
        }
    ];

    purchasingId: number | null = null;

    ngOnInit(): void { }

    placeOrder(item: any) {
        if (confirm(`Place order for ${item.quantity} ${item.unit} of ${item.cropName} from ${item.distributor}?`)) {
            this.purchasingId = item.id;

            // Simulating API call
            setTimeout(() => {
                alert(`✅ Order Placed Successfully!\n\nOrder ID: PO-${Date.now()}\nSupplier: ${item.distributor}`);
                // Remove item to simulate purchase
                this.marketItems = this.marketItems.filter(i => i.id !== item.id);
                this.purchasingId = null;
            }, 1500);
        }
    }
}
