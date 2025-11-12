const express = require('express');
const router = express.Router();
const {
  getChatHistory,
  saveMessage,
  deleteChatHistory,
  getUserConversations,
} = require('../controllers/chatController');

// Chat routes
router.get('/messages/:userId', getChatHistory);
router.post('/messages', saveMessage);
router.delete('/messages/:userId', deleteChatHistory);
router.get('/conversations/:userId', getUserConversations);

module.exports = router;
