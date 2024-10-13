const express = require('express');
const router = express.Router();
const { 
  createEvent, 
  getEvents, 
  updateEvent, 
  deleteEvent 
} = require('../controllers/ownerController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/event', authMiddleware, createEvent);
router.get('/events', authMiddleware, getEvents);
router.put('/event/:id', authMiddleware, updateEvent);
router.delete('/event/:id', authMiddleware, deleteEvent);

module.exports = router;