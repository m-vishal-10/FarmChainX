export const environment = {
    production: true,
    apiUrl: 'https://farmchainx-backend.onrender.com/api',
    baseUrl: 'https://farmchainx-backend.onrender.com', // Base URL for static assets (images, QR codes)

    enableDebugMode: false,
    enableConsoleLogging: false,

    // Feature flags
    features: {
        qrScanner: true,
        aiQualityCheck: true,
        notifications: true
    }
};
