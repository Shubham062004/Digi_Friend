const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://digifriend.vercel.app'], // Allow both local and production origins
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Review Schema
const reviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  avatar: String,
  timestamp: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

// Review Routes
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ timestamp: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const newReview = new Review({
      name: req.body.name,
      rating: req.body.rating,
      comment: req.body.comment,
      avatar: req.body.avatar
    });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
