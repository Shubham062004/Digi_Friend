const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(100);
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

// Create a new review
router.post('/', async (req, res) => {
  try {
    const { name, rating, comment, avatar } = req.body;
    
    // Validation
    if (!name || !rating || !comment) {
      return res.status(400).json({ message: 'Name, rating, and comment are required' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    const newReview = new Review({
      name,
      rating,
      comment,
      avatar: avatar || null
    });
    
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
});

// Get a single review by ID
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ message: 'Error fetching review', error: error.message });
  }
});

// Update a review
router.put('/:id', async (req, res) => {
  try {
    const { name, rating, comment, avatar } = req.body;
    
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { name, rating, comment, avatar },
      { new: true, runValidators: true }
    );
    
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
});

// Delete a review
router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json({ message: 'Review deleted successfully', review: deletedReview });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
});

module.exports = router;
