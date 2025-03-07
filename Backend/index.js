// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// // CORS Configuration
// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === 'production'
//         ? 'https://digifriend.vercel.app'
//         : 'http://localhost:3000',
//     credentials: true,
//   })
// );

// app.use(express.json());

// // MongoDB Connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected successfully');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   }
// };
// connectDB();

// // Message Schema
// const messageSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true, index: true },
//     content: { type: String, required: true, trim: true },
//     role: { type: String, enum: ['user', 'assistant'], required: true },
//   },
//   { timestamps: true }
// );

// // Review Schema
// const reviewSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     rating: { type: Number, required: true, min: 1, max: 5 },
//     comment: { type: String, required: true, trim: true, maxlength: 500 },
//     avatar: { type: String, trim: true },
//   },
//   { timestamps: true }
// );

// const Message = mongoose.model('Message', messageSchema);
// const Review = mongoose.model('Review', reviewSchema);

// // Message Routes
// app.get('/api/messages/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const messages = await Message.find({ userId }).sort({ createdAt: 1 }).limit(100);
//     res.json(messages);
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     res.status(500).json({ message: 'Error fetching messages', error: error.message });
//   }
// });

// app.post('/api/messages', async (req, res) => {
//   try {
//     const { userId, content, role } = req.body;
//     if (!userId || !content || !role) return res.status(400).json({ message: 'All fields are required' });

//     const newMessage = new Message({ userId, content, role });
//     const savedMessage = await newMessage.save();
//     res.status(201).json(savedMessage);
//   } catch (error) {
//     console.error('Error creating message:', error);
//     res.status(500).json({ message: 'Error creating message', error: error.message });
//   }
// });

// // Review Routes
// app.get('/api/reviews', async (req, res) => {
//   try {
//     const reviews = await Review.find().sort({ createdAt: -1 }).limit(100);
//     res.json(reviews);
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//     res.status(500).json({ message: 'Error fetching reviews', error: error.message });
//   }
// });

// app.post('/api/reviews', async (req, res) => {
//   try {
//     const { name, rating, comment, avatar } = req.body;
//     if (!name || !rating || !comment) return res.status(400).json({ message: 'All fields are required' });

//     const newReview = new Review({ name, rating, comment, avatar });
//     const savedReview = await newReview.save();
//     res.status(201).json(savedReview);
//   } catch (error) {
//     console.error('Error creating review:', error);
//     res.status(500).json({ message: 'Error creating review', error: error.message });
//   }
// });

// // Delete Review
// app.delete('/api/reviews/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedReview = await Review.findByIdAndDelete(id);
//     if (!deletedReview) return res.status(404).json({ message: 'Review not found' });

//     res.json({ message: 'Review deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting review:', error);
//     res.status(500).json({ message: 'Error deleting review', error: error.message });
//   }
// });

// // Update Review
// app.put('/api/reviews/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, rating, comment, avatar } = req.body;
//     if (!name || !rating || !comment) return res.status(400).json({ message: 'All fields are required' });

//     const updatedReview = await Review.findByIdAndUpdate(
//       id,
//       { name, rating, comment, avatar },
//       { new: true, runValidators: true }
//     );

//     if (!updatedReview) return res.status(404).json({ message: 'Review not found' });
//     res.json(updatedReview);
//   } catch (error) {
//     console.error('Error updating review:', error);
//     res.status(500).json({ message: 'Error updating review', error: error.message });
//   }
// });

// // Global Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal server error', error: err.message });
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://digifriend.vercel.app'
        : 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
connectDB();


// Review Schema
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true, maxlength: 500 },
    avatar: { type: String, trim: true },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

// Root route to check if server is running
app.get('/', (req, res) => {
  res.json({ message: 'Server connected successfully' });
});

// Fetch all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(100);
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
