export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080/api',
    baseUrl: 'http://localhost:8080', // Base URL for static assets (images, QR codes)

    // Optional configurations
    enableDebugMode: true,
    enableConsoleLogging: true,

    // Feature flags
    features: {
        qrScanner: true,
        aiQualityCheck: true,
        notifications: true
    }
};
