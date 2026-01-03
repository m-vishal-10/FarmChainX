# 🌾 FarmChainX Frontend

![Angular](https://img.shields.io/badge/Angular-20-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

A cutting-edge **Agricultural Supply Chain Frontend** built with **Angular 20** and **Tailwind CSS 4**. Features a premium, responsive UI with modern glassmorphism effects, professional typography, and seamless role-based dashboards.

🌐 **Live Demo**: [https://farmchainx.vercel.app](https://farmchainx.vercel.app)

---

## ✨ UI/UX Features

### 🎨 Modern Design System
- **Glassmorphism Effects**: Premium backdrop-blur with semi-transparent backgrounds
- **Professional Color Palette**: Emerald (#10b981) and Teal (#14b8a6)
- **Typography**: Google Fonts - Outfit (headings), Inter (body)
- **Animations**: Smooth transitions, floating orbs, gradient shifts
- **Responsive**: Optimized for all screen sizes (mobile-first)

### 🔐 Enhanced Security UX
- **Password Visibility Toggle**: Eye icons on all password fields
- **Real-time Validation**: Instant feedback with visual indicators
- **Form Icons**: Left-aligned icons for better UX
- **Focus States**: Emerald glow on active inputs

### 📱 Pages & Features

#### Home Page
- Hero section with gradient background
- Animated floating orbs
- Statistics showcase
- CTA buttons with hover effects

#### Login & Register
- Glassmorphism form cards
- Icon-decorated input fields  
- Password strength indicators
- Smooth page transitions
- Social sharing meta tags

#### Dashboard (Role-Based)
- **Farmer**: Product upload, QR generation, sales analytics
- **Distributor**: Marketplace, inventory, procurement
- **Retailer**: Orders, dispatches, inventory management
- **Consumer**: Product search, purchase history, QR scanner
- **Admin**: User management, analytics, settings

---

## 🛠️ Technology Stack

### Core Framework
- **Angular** 20 (Standalone Components)
- **TypeScript** 5.7+
- **RxJS** 7.8+ (Reactive programming)

### Styling & UI
- **Tailwind CSS** 4 (Utility-first)
- **Google Fonts** (Outfit, Inter)
- **Custom SCSS** (Animations, themes)
- **CSS Variables** (Design tokens)

### Libraries & Tools
- **Chart.js** - Statistical charts
- **ApexCharts** - Advanced visualizations
- **ZXing** - QR code scanning
- **Lucide Icons** - Modern icon set
- **Angular Router** - Navigation
- **Angular Forms** - Template-driven & Reactive

---

## 📦 Installation

### Prerequisites
- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**

### Setup

1. **Clone & Navigate**
```bash
git clone https://github.com/Subashkumawat34/FarmChainX.git
cd FarmChainX/frontend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Configuration**

Create/update `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

For production (`environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://farmchainx.onrender.com/api'
};
```

4. **Run Development Server**
```bash
npx ng serve
```
Navigate to `http://localhost:4200/`

5. **Build for Production**
```bash
npm run build
```
Output in `dist/` folder ready for deployment.

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel --prod
```

### Alternative: Netlify
```bash
npm run build
# Drag & drop dist/farmchainx-frontend/browser folder
```

### Configuration Files
- `vercel.json` - Vercel routing configuration
- `angular.json` - Build settings
- `tailwind.config.js` - Tailwind customization

---

## 🧪 Testing

### Unit Tests
```bash
ng test
```

### End-to-End Tests
```bash
ng e2e
```
Uses Cypress for E2E testing.

### Code Coverage
```bash
ng test --code-coverage
```

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable components
│   │   │   └── navbar/          # Navigation component
│   │   ├── pages/               # Page components
│   │   │   ├── home/            # Landing page
│   │   │   ├── login/           # Login page
│   │   │   ├── register/        # Registration
│   │   │   ├── farmer/          # Farmer dashboard
│   │   │   ├── distributor/     # Distributor portal
│   │   │   ├── retailer/        # Retailer interface
│   │   │   ├── consumer/        # Consumer pages
│   │   │   └── admin/           # Admin panel
│   │   ├── services/            # API services
│   │   │   ├── auth.service.ts
│   │   │   └── product.service.ts
│   │   └── guards/              # Route guards
│   ├── assets/                  # Static files
│   ├── styles.scss              # Global styles
│   └── environments/            # Environment configs
├── public/                      # Public assets
│   └── favicon.png              # Custom favicon
├── tailwind.config.js           # Tailwind configuration
├── angular.json                 # Angular CLI config
└── package.json                 # Dependencies
```

---

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: { ... },      // Emerald shades
      secondary: { ... }     // Teal shades
    }
  }
}
```

### Fonts  
Update `src/styles.scss`:
```scss
@import url('https://fonts.googleapis.com/css2?family=YourFont');

:root {
  --font-heading: 'YourFont', sans-serif;
}
```

### Animations
Extend in `styles.scss`:
```scss
@keyframes yourAnimation {
  from { ... }
  to { ... }
}
```

---

## 📱 Features Breakdown

### Authentication
- ✅ JWT-based login/register
- ✅ Role-based routing
- ✅ Session management
- ✅ Password visibility toggles

### Forms
- ✅ Real-time validation
- ✅ Icon-decorated inputs
- ✅ Error messaging
- ✅ Success feedback
- ✅ Loading states

### Navigation
- ✅ Sticky navbar with reduced height
- ✅ Role-based menu items
- ✅ Mobile hamburger menu
- ✅ User profile dropdown

### Dashboards
- ✅ Interactive charts
- ✅ Statistics cards
- ✅ Data tables
- ✅ Action buttons
- ✅ Export functionality

---

## 🔧 Development

### Code Style
- **ESLint**: Linting rules
- **Prettier**: Code formatting
- **TypeScript**: Strict mode enabled

### Best Practices
- Standalone components (Angular 20+)
- Lazy loading for routes
- OnPush change detection
- Service-based state management
- Reactive forms where applicable

---

## 📊 Performance

- ✅ **Lazy Loading**: Route-based code splitting
- ✅ **Tree Shaking**: Removes unused code
- ✅ **Font Optimization**: Preconnect to Google Fonts
- ✅ **Image Optimization**: Cloudinary CDN
- ✅ **Minification**: Production builds minified
- ✅ **Gzip**: Compressed assets

---

## 🆕 Recent Updates (January 2026)

- ✨ Modern glassmorphism UI design
- 🎨 Professional emerald/teal color scheme
- 👁️ Password visibility toggles
- 🔤 Google Fonts integration (Outfit, Inter)
- 📱 Enhanced mobile responsiveness
- 🚀 Optimized for Vercel deployment
- 🎯 Custom geometric favicon
- 🔍 SEO meta tags and Open Graph
- 🎭 Smooth animations and transitions

---

## 📄 License

MIT License - See root LICENSE file

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📧 Support

For issues or questions:
- **GitHub Issues**: [Create Issue](https://github.com/Subashkumawat34/FarmChainX/issues)
- **Email**: farmchainx@example.com

---

*Built with ❤️ using Angular 20 & Tailwind CSS 4*
