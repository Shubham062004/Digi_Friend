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

  const API_URL = import.meta.env.REACT_APP_API_URL;

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
      const sortedReviews = data.sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
      );
      setReviews(sortedReviews);
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

    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newReview,
          name: user.fullName || 'Anonymous',
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

  // Login Modal Component
  const LoginModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={() => setShowLoginModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Sign In to Submit Review</h2>
        <SignIn afterSignInUrl={window.location.href} />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white shadow-md p-4 flex items-center">
        <Link to="/" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold text-center flex-grow">Reviews</h1>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="top-16 z-30 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-4 my-2" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Scrollable Reviews Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="divide-y divide-gray-200">
              {reviews.map((review) => (
                <li key={review._id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        review.avatar ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`
                      }
                      alt={`${review.name}'s avatar`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.comment}</p>
                      <div className="mt-1">{'⭐'.repeat(review.rating)}</div>
                    </div>
                    <time className="text-xs text-gray-500">
                      {new Date(review.timestamp).toLocaleDateString()}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sticky Form at Bottom */}
      <div className="sticky bottom-0 z-40 bg-white shadow-md p-4 mt-auto">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto flex items-center gap-2"
        >
          <select
            name="rating"
            value={newReview.rating}
            onChange={handleInputChange}
            className="border rounded-md p-2"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num !== 1 ? 's' : ''}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="comment"
            value={newReview.comment}
            onChange={handleInputChange}
            placeholder="Write your review..."
            className="flex-1 border rounded-md p-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Login Modal */}
      {showLoginModal && <LoginModal />}
    </div>
  );
};

export default ReviewPage;
