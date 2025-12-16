import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {
  // In a real app, this would be fetched from API
  inventoryItems = [
    {
      id: 101,
      cropName: 'Wheat (Sharbati)',
      quantity: 5000,
      unit: 'kg',
      qualityGrade: 'A+',
      warehouse: 'Central Storage - Zone A',
      status: 'In Stock',
      value: 125000
    },
    {
      id: 102,
      cropName: 'Basmati Rice',
      quantity: 3200,
      unit: 'kg',
      qualityGrade: 'A',
      warehouse: 'North Wing Cold Storage',
      status: 'Reserved',
      value: 192000
    },
    {
      id: 105,
      cropName: 'Organic Cotton',
      quantity: 1500,
      unit: 'kg',
      qualityGrade: 'B',
      warehouse: 'Dry Storage Unit 4',
      status: 'In Stock',
      value: 90000
    },
    {
      id: 108,
      cropName: 'Sweet Corn',
      quantity: 800,
      unit: 'kg',
      qualityGrade: 'A',
      warehouse: 'Perishable Zone 2',
      status: 'Low Stock',
      value: 24000
    }
  ];

  totalValue = 0;

  ngOnInit() {
    this.totalValue = this.inventoryItems.reduce((acc, item) => acc + item.value, 0);
  }

  getGradeColor(grade: string): string {
    if (grade.includes('A')) return 'bg-emerald-100 text-emerald-800';
    if (grade.includes('B')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  }

  getStatusColor(status: string): string {
    if (status === 'In Stock') return 'bg-blue-100 text-blue-800';
    if (status === 'Reserved') return 'bg-purple-100 text-purple-800';
    if (status === 'Low Stock') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  }
}
