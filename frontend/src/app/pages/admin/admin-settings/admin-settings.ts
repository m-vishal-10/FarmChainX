import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

interface SystemSettings {
    applicationVersion: string;
    databaseStatus: string;
    uptime: number;
    totalUsers: number;
    totalProducts: number;
    totalTransactions: number;
    registrationEnabled: boolean;
    maintenanceMode: boolean;
    emailNotificationsEnabled: boolean;
    maxUploadSize: number;
    sessionTimeout: number;
    defaultUserRole: string;
}

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-settings.html',
    styleUrl: './admin-settings.scss',
    selector: 'app-admin-settings'
})
export class AdminSettings implements OnInit {
    settings?: SystemSettings;
    isLoading = false;
    isSaving = false;
    saveMessage = '';

    constructor(private adminService: AdminService) { }

    ngOnInit(): void {
        this.loadSettings();
    }

    loadSettings(): void {
        this.isLoading = true;
        this.adminService.getSettings().subscribe({
            next: (data) => {
                this.settings = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Failed to load settings', err);
                this.isLoading = false;
            }
        });
    }

    saveSettings(): void {
        if (!this.settings) return;

        this.isSaving = true;
        this.saveMessage = '';

        this.adminService.updateSettings(this.settings).subscribe({
            next: (data) => {
                this.settings = data;
                this.isSaving = false;
                this.saveMessage = 'Settings saved successfully!';
                setTimeout(() => this.saveMessage = '', 3000);
            },
            error: (err) => {
                console.error('Failed to save settings', err);
                this.isSaving = false;
                this.saveMessage = 'Failed to save settings. Please try again.';
                setTimeout(() => this.saveMessage = '', 3000);
            }
        });
    }

    formatUptime(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    }
}
