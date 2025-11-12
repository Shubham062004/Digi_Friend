const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
      maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    avatar: {
      type: String,
      trim: true,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
reviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);
