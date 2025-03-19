const express = require('express');
const router = express.Router();
const { someController } = require('./controllers/chatController');

router.post('/', someController);  // if not used, comment out

module.exports = router;
