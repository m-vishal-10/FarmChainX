import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService, AdminAnalytics as AdminAnalyticsData } from '../../../services/admin.service';

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-analytics.html',
    styleUrl: './admin-analytics.scss',
    selector: 'app-admin-analytics'
})
export class AdminAnalytics implements OnInit {
    analytics?: AdminAnalyticsData;
    isLoading = false;

    constructor(private adminService: AdminService) { }

    ngOnInit(): void {
        this.loadAnalytics();
    }

    loadAnalytics(): void {
        this.isLoading = true;
        this.adminService.getAnalytics().subscribe({
            next: (data) => {
                this.analytics = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Failed to load analytics', err);
                this.isLoading = false;
            }
        });
    }

    getProductStatusKeys(): string[] {
        return this.analytics?.productsByStatus ? Object.keys(this.analytics.productsByStatus) : [];
    }

    getRoleKeys(): string[] {
        return this.analytics?.supplyChainMetrics?.transfersByRole ? Object.keys(this.analytics.supplyChainMetrics.transfersByRole) : [];
    }

    getProductStatusPercent(status: string): number {
        if (!this.analytics?.productsByStatus) return 0;
        const total = Object.values(this.analytics.productsByStatus).reduce((a, b) => a + b, 0);
        return total > 0 ? (this.analytics.productsByStatus[status] / total) * 100 : 0;
    }

    formatUptime(hours: number): string {
        return `${hours.toFixed(1)}h`;
    }
}
