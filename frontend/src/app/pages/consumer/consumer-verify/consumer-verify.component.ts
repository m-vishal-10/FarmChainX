import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consumer-verify',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './consumer-verify.component.html',
})
export class ConsumerVerifyComponent {
  codeInput: string = '';
  loading = false;
  verificationResult: any = null;

  timeline = [
    {
      title: 'Harvested & Registered',
      role: 'Farmer',
      actor: 'Ravi Kumar (Certified)',
      date: '2025-10-15',
      location: 'Sikar Farms, Rajasthan',
      icon: '👨‍🌾',
      status: 'completed',
      details: 'Quality Grade A+ verified by AI'
    },
    {
      title: 'Procured & Processed',
      role: 'Distributor',
      actor: 'Sikar Agro Distributors',
      date: '2025-10-18',
      location: 'Regional Hub, Jaipur',
      icon: '🚚',
      status: 'completed',
      details: 'Batch #8821 quality check passed'
    },
    {
      title: 'Retail Store Arrival',
      role: 'Retailer',
      actor: 'GreenStore Supermarket',
      date: '2025-10-20',
      location: 'Vaishali Nagar, Jaipur',
      icon: '🏪',
      status: 'completed',
      details: 'Shelf stocked. Freshness maintained.'
    },
    {
      title: 'Verified Consumer Purchase',
      role: 'Consumer',
      actor: 'You',
      date: 'Now',
      location: 'Online Check',
      icon: '✅',
      status: 'active',
      details: 'Authenticity confirmed.'
    }
  ];

  verifyManual(): void {
    if (!this.codeInput) return;
    this.loading = true;

    // Simulate API delay
    setTimeout(() => {
      this.verificationResult = {
        productName: 'Organic Wheat (Sharbati)',
        batchId: this.codeInput,
        origin: 'Sikar, India',
        carbonFootprint: '0.4kg CO2',
        nutritionalInfo: 'High Fiber, Protein Rich'
      };
      this.loading = false;
    }, 1500);
  }

  scanQR(): void {
    alert('Camera permission required for QR scanning. Using manual mode for demo.');
    this.codeInput = 'BATCH-2025-8821';
  }

  clear(): void {
    this.codeInput = '';
    this.verificationResult = null;
  }
}
