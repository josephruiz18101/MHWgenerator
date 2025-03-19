// File: /server/routes/buildRoutes.js

const express = require('express');
const router = express.Router();
const { generateBuild } = require('./controllers/buildController');

// POST /api/build
router.post('/', generateBuild);

module.exports = router;
