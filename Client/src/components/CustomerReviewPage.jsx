import React, { useState, useEffect } from 'react';
import { useUser, SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, isSignedIn } = useUser();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';


  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/reviews`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      
      const data = await response.json();
      setReviews(data);
      setError(null);
    } catch (error) {
      setError('Failed to load reviews. Please try again later.');
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isSignedIn) {
      setShowLoginModal(true);
      return;
    }

    if (!newReview.comment.trim()) {
      setError('Please write a comment');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newReview,
          name: user.fullName || user.firstName || 'Anonymous',
          avatar: user.imageUrl || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const savedReview = await response.json();
      setReviews((prev) => [savedReview, ...prev]);
      setNewReview({ rating: 5, comment: '' });
      setError(null);
    } catch (error) {
      setError('Failed to submit review. Please try again.');
      console.error('Error submitting review:', error);
    }
  };

  const LoginModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={() => setShowLoginModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Sign in to leave a review</h2>
        <SignIn routing="hash" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Customer Reviews
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Review Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Rating
              </label>
              <select
                name="rating"
                value={newReview.rating}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Comment
              </label>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                placeholder="Share your experience..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No reviews yet. Be the first to review!
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200"
              >
                <div className="flex items-start space-x-4">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {review.name}
                      </h3>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xl ${
                              i < review.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{review.comment}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showLoginModal && <LoginModal />}
    </div>
  );
};

export default ReviewPage;
