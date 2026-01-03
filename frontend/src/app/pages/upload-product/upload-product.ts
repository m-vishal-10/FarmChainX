import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-upload-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-product.html'
})
export class UploadProduct {
  cropName = '';
  soilType = '';
  pesticides = '';
  harvestDate = '';             // yyyy-MM-dd
  gpsLocation = '';
  price: number | null = null;
  quantity: number = 1000;  // Default quantity
  quantityUnit: string = 'kg';  // Default unit
  imageFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  loading = false;
  today = this.getTodayString(); // used as max for date input

  // AI Prediction properties
  showPrediction = false;
  aiPrediction: any = null;
  productId: number | null = null;

  constructor(private productService: ProductService, private router: Router) { }

  // helper to produce today's date in yyyy-MM-dd
  private getTodayString(): string {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  onFileSelected(event: any) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      alert(
        '⚠️ Invalid File Type\n\n' +
        'Please select a valid image file.\n\n' +
        'Accepted formats: JPG, JPEG, PNG, WEBP'
      );
      return;
    }

    // Validate file size (max 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      alert(
        '⚠️ File Too Large\n\n' +
        `File size: ${(file.size / 1024 / 1024).toFixed(2)} MB\n` +
        'Maximum allowed size: 5 MB\n\n' +
        'Please compress your image or choose a smaller file.'
      );
      return;
    }

    this.imageFile = file;
    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result;
    reader.readAsDataURL(file);
  }

  detectGPS() {
    if (!navigator.geolocation) {
      alert("GPS not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      this.gpsLocation = `${lat},${lng}`;
      alert('GPS detected');
    }, (err) => {
      console.warn('GPS error', err);
      alert('Unable to detect GPS');
    });
  }

  uploadProduct() {
    if (!this.imageFile) {
      alert("Please select an image");
      return;
    }

    // Prevent future-date uploads
    if (this.harvestDate) {
      if (this.harvestDate > this.today) {
        alert('Harvest date cannot be in the future.');
        return;
      }
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('cropName', this.cropName.trim());
    formData.append('soilType', this.soilType.trim());
    formData.append('pesticides', this.pesticides.trim());
    // ensure backend-friendly date format yyyy-MM-dd (input already gives it)
    formData.append('harvestDate', this.harvestDate);
    formData.append('gpsLocation', this.gpsLocation.trim());
    formData.append('price', this.price ? String(this.price) : '0');
    formData.append('quantity', String(this.quantity));
    formData.append('quantityUnit', this.quantityUnit);
    formData.append('image', this.imageFile);

    this.productService.uploadProduct(formData)
      .subscribe({
        next: (res) => {
          this.loading = false;
          if (res.success && res.aiPrediction) {
            // Store AI prediction and show modal
            this.aiPrediction = res.aiPrediction;
            this.productId = res.id;
            this.showPrediction = true;
          } else {
            // Fallback if no AI prediction
            alert(`Product uploaded! ID = ${res.id}`);
            this.router.navigate(['/farmer/products']);
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('Upload error full:', err);
          console.error('Status:', err?.status);
          console.error('Error body:', err?.error);

          let errorMessage = '❌ Upload Failed\n\n';

          if (err?.status === 0) {
            errorMessage += 'Network Error\n\n' +
              'Unable to connect to the server. Please check:\n' +
              '• Your internet connection\n' +
              '• Server is running\n' +
              '• No firewall blocking the connection';
          } else if (err?.status === 401 || err?.status === 403) {
            errorMessage += 'Authentication Error\n\n' +
              'You are not authorized to upload products.\n' +
              'Please log in again as a Farmer.';
          } else if (err?.status === 413) {
            errorMessage += 'File Too Large\n\n' +
              'The image file is too large for the server.\n' +
              'Please compress your image and try again.';
          } else if (err?.status === 415) {
            errorMessage += 'Unsupported File Type\n\n' +
              'The server does not accept this file type.\n' +
              'Please upload a JPG, PNG, or WEBP image.';
          } else if (err?.status === 500) {
            errorMessage += 'Server Error\n\n' +
              'The server encountered an error.\n' +
              'This might be a temporary issue. Please try again.\n\n' +
              (err?.error?.message || err?.error?.error || 'Internal server error');
          } else {
            const serverMsg = err?.error?.message || err?.error?.error || err?.statusText || 'Unknown error';
            errorMessage += `Error: ${serverMsg}`;
          }

          alert(errorMessage);
        }
      });
  }

  closePredictionModal() {
    this.showPrediction = false;
    this.router.navigate(['/farmer/dashboard']);
  }

  getQualityColor(grade: string): string {
    if (!grade) return 'slate';
    const gradeUpper = grade.toUpperCase();
    if (gradeUpper.includes('A+') || gradeUpper === 'A') return 'emerald';
    if (gradeUpper.includes('B+') || gradeUpper === 'B') return 'yellow';
    if (gradeUpper === 'C') return 'orange';
    return 'slate';
  }
}
