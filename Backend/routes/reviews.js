// File: server/routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ timestamp: -1 }).limit(10);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
});

module.exports = router;