import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

// 🔥 Lucide icons
import {
  LucideAngularModule,
  ScanLine,
  Upload,
  ShieldCheck,
  Lightbulb,
  LightbulbOff,
  XCircle,
  Loader2,
  X,
  CheckCircle2,
  Scan,
  ArrowRight,
  Smartphone,
  Image as ImageIcon,
  Zap,
} from 'lucide-angular';

// Enum for camera status
export type CameraStatus = 'initializing' | 'scanning' | 'denied' | 'error';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule, LucideAngularModule],
  templateUrl: './qr-scanner.html',
  styleUrl: './qr-scanner.scss',
})
export class QrScanner {
  private router = inject(Router);

  // ⭐ Register icons for template use
  readonly ScanLine = ScanLine;
  readonly Upload = Upload;
  readonly ShieldCheck = ShieldCheck;
  readonly Lightbulb = Lightbulb;
  readonly LightbulbOff = LightbulbOff;
  readonly XCircle = XCircle;
  readonly Loader2 = Loader2;
  readonly X = X;
  readonly CheckCircle2 = CheckCircle2;
  readonly Scan = Scan;
  readonly ArrowRight = ArrowRight;
  readonly Smartphone = Smartphone;
  readonly ImageIcon = ImageIcon;
  readonly Zap = Zap;

  // ⭐ Component State
  formats = [BarcodeFormat.QR_CODE];
  isScanning = false; // user picks method first
  torchEnabled = false;
  hasTorch = false;
  usingFileUpload = false;
  uploadedImageUrl: string | null = null;
  scanResult: string | null = null;
  cameraStatus: CameraStatus = 'initializing'; // New state property
  isNavigating = false; // New: loading state for navigation

  constructor() { }

  // Start camera scanning
  startCameraScan() {
    this.isScanning = true;
    this.usingFileUpload = false;
    this.uploadedImageUrl = null;
    this.cameraStatus = 'initializing'; // Set status when starting
  }

  // Stop scanning
  stopScanning() {
    this.isScanning = false;
    this.usingFileUpload = false;
    this.torchEnabled = false;
    this.uploadedImageUrl = null;
    this.cameraStatus = 'initializing'; // Reset status
  }

  // Navigate to product details
  viewDetails() {
    if (this.scanResult) {
      this.isNavigating = true;
      // Improved matching: Checks for the UUID structure and handles both full URLs and just the UUID
      const match = this.scanResult.match(
        /verify\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i
      );
      const uuidMatch = this.scanResult.match(
        /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i
      );

      const idToNavigate = match ? match[1] : uuidMatch ? uuidMatch[1] : null;

      if (idToNavigate) {
        // Use a relative path to ensure it works correctly
        this.router.navigate(['/verify', idToNavigate]).then(
          (success) => {
            if (!success) {
              this.isNavigating = false;
              alert(
                'Navigation failed. Please try scanning the QR code again or check your internet connection.'
              );
            }
          },
          (error) => {
            this.isNavigating = false;
            console.error('Navigation error:', error);
            alert(
              'An error occurred while navigating to the product details. Please try again.'
            );
          }
        );
      } else {
        this.isNavigating = false;
        // Fallback for non-standard QR codes (e.g., just a URL/text without the expected format)
        alert(
          '⚠️ Invalid QR Code Format\n\n' +
          'This QR code does not contain a valid FarmChainX product verification code.\n\n' +
          'Expected format: A UUID like "12345678-1234-1234-1234-123456789abc"\n\n' +
          'Scanned result: ' + this.scanResult.substring(0, 100) +
          (this.scanResult.length > 100 ? '...' : '')
        );
      }
    }
  }

  // Successful scan
  onScanSuccess(result: string) {
    this.scanResult = result;
    this.isScanning = false;
    this.usingFileUpload = false;
  }

  // Error scanning
  onScanError(err: any) {
    console.error('Scan error:', err);
    this.cameraStatus = 'error'; // Set status on error
    // Only show alert for critical errors, not for "NotFoundException" which is normal when no QR is in view
    if (err && err.name && err.name !== 'NotFoundException') {
      alert(
        '⚠️ Camera Error\n\n' +
        'There was an issue accessing your camera. Please ensure:\n' +
        '1. You have granted camera permissions\n' +
        '2. No other application is using the camera\n' +
        '3. Your camera is properly connected'
      );
    }
  }

  // If camera permission denied or granted
  onPermission(granted: boolean) {
    if (!granted) {
      alert('Camera access denied. Please use the "Upload Photo" option instead.');
      this.stopScanning();
      this.cameraStatus = 'denied'; // Set status on denial
    } else {
      // Permission granted, now we are waiting for the camera feed
      // We can transition to 'scanning' once the feed is detected, but for now, 'initializing' is fine.
      this.cameraStatus = 'scanning';
    }
  }

  // Detect if device has torch
  onCamerasFound(devices: MediaDeviceInfo[]) {
    this.hasTorch = devices.some(d => !!(d as any).getCapabilities?.()?.torch);
  }

  // Upload image file & scan
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.uploadedImageUrl = e.target.result;
      this.isScanning = false;
      this.usingFileUpload = true;

      // Dynamic import remains a good practice for larger libraries
      import('@zxing/library').then(zxing => {
        const codeReader = new zxing.BrowserQRCodeReader();
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          // This promise handles the actual decoding from the image
          codeReader
            .decodeFromImageElement(img)
            .then(r => this.onScanSuccess(r.getText()))
            .catch((error) => {
              console.error('QR decode error:', error);
              alert(
                '⚠️ No QR Code Found\n\n' +
                'The uploaded image does not contain a valid QR code or the QR code is not clear enough.\n\n' +
                'Tips for better results:\n' +
                '• Ensure good lighting\n' +
                '• Keep the camera steady\n' +
                '• Make sure the entire QR code is visible\n' +
                '• Avoid glare or reflections on the QR code'
              );
              this.restart();
            });
        };
      });
    };

    reader.readAsDataURL(file);
  }

  // Reset to main menu
  restart() {
    this.isScanning = false;
    this.usingFileUpload = false;
    this.uploadedImageUrl = null;
    this.torchEnabled = false;
    this.scanResult = null;
    this.isNavigating = false; // Reset navigation state
    this.cameraStatus = 'initializing'; // Reset status
  }
}

export default QrScanner;