// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); // Make sure to adjust the path if your index.html is in a different folder

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Define a simple route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust the path as necessary
});

// User Registration Route
app.post('/api/register', (req, res) => {
    const { fname, lname, email, password } = req.body;

    const query = 'INSERT INTO users (fname, lname, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [fname, lname, email, password], (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ message: 'User  registered successfully' });
    });
});

// Project Request Route
app.post('/api/request', (req, res) => {
    const projectData = req.body;

    const query = 'INSERT INTO projects (orgHeadFirstName, orgHeadLastName, orgName, orgType, projectType, projectDuration, projectBudget, projectLocation, projectDescription, rawMaterials, dealers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [
        projectData.orgHeadFirstName,
        projectData.orgHeadLastName,
        projectData.orgName,
        projectData.orgType,
        projectData.projectType,
        projectData.projectDuration,
        projectData.projectBudget,
        projectData.projectLocation,
        projectData.projectDescription,
        projectData.rawMaterials,
        projectData.dealers
    ], (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ message: 'Project request submitted successfully' });
    });
});

app.get('/api/projects', (req, res) => {
    const query = 'SELECT * FROM listings'; // Adjust the table name if necessary
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});