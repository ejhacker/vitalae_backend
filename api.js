// API service for Vitalae frontend
// Handles all communication with the backend server

class VitalaeAPI {
    constructor() {
        this.baseUrl = window.vitalaeConfig?.apiBaseUrl || 'http://localhost:3001';
        this.endpoints = {
            register: '/api/register',
            users: '/api/users'
        };
    }

    // Helper method to make HTTP requests
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        };

        try {
            const response = await fetch(url, defaultOptions);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    // Register a new user
    async registerUser(userData) {
        const { name, email, password } = userData;
        
        if (!name || !email || !password) {
            throw new Error('All fields are required');
        }

        return this.makeRequest(this.endpoints.register, {
            method: 'POST',
            body: JSON.stringify({ name, email, password })
        });
    }

    // Get all users (for admin purposes)
    async getUsers() {
        return this.makeRequest(this.endpoints.users, {
            method: 'GET'
        });
    }

    // Test connection to backend
    async testConnection() {
        try {
            await this.makeRequest(this.endpoints.users, { method: 'GET' });
            return { success: true, message: 'Backend connection successful' };
        } catch (error) {
            return { 
                success: false, 
                message: 'Backend connection failed', 
                error: error.message 
            };
        }
    }
}

// Create and export API instance
const vitalaeAPI = new VitalaeAPI();
window.vitalaeAPI = vitalaeAPI;

console.log('Vitalae API Service initialized');
