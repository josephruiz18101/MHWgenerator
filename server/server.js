// File: /server/server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const buildRoutes = require('./routes/buildRoutes');
//const chatRoutes = require('./routes/chatRoutes');
app.use('/api/build', buildRoutes);
//app.use('/api/chat', chatRoutes);

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'MHWGenerator backend is live!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
