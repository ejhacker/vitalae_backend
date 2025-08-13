// Configuration file for Vitalae frontend
// This file allows easy switching between development and production environments

const config = {
    // Development environment (localhost)
    development: {
        apiBaseUrl: 'http://localhost:3001',
        environment: 'development'
    },
    
    // Production environment (deployed)
    production: {
        apiBaseUrl: 'https://your-backend-domain.com', // Replace with your actual backend URL
        environment: 'production'
    }
};

// Auto-detect environment based on current URL
function getCurrentConfig() {
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname === '';
    
    return isLocalhost ? config.development : config.production;
}

// Export the current configuration
const currentConfig = getCurrentConfig();

// Make config available globally
window.vitalaeConfig = currentConfig;

console.log('Vitalae Frontend Config:', currentConfig);
