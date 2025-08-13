const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors({
    origin: NODE_ENV === 'production' 
        ? ['https://your-frontend-domain.com'] // Replace with your actual frontend domain
        : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5000'],
    credentials: true
}));
app.use(bodyParser.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        environment: NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// Initialize SQLite database
const dbPath = NODE_ENV === 'production' ? '/tmp/users.db' : './users.db';
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log(`Connected to SQLite database at ${dbPath}`);
    }
});

// Create users table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
    if (err) {
        console.error('Error creating users table:', err);
    } else {
        console.log('Users table ready');
    }
});

// Register user endpoint
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }
    
    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    
    const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    stmt.run(name, email, password, function (err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
            }
            return res.status(500).json({ error: 'Database error occurred.' });
        }
        res.status(201).json({ 
            id: this.lastID, 
            name, 
            email,
            message: 'User registered successfully'
        });
    });
    stmt.finalize();
});

// Get all users endpoint
app.get('/api/users', (req, res) => {
    db.all('SELECT id, name, email, created_at FROM users ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to retrieve users.' });
        }
        res.json(rows);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error occurred.' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found.' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Vitalae Backend Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`📊 Database: ${dbPath}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});
