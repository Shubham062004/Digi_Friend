import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const { user } = useUser();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('https://server-digi-friend.vercel.app/api/reviews', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const sortedReviews = response.data.sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      );
      setReviews(sortedReviews);
      setError(null);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to submit a review');
      return;
    }

    try {
      const response = await axios.post('https://server-digi-friend.vercel.app/api/reviews', {
        ...newReview,
        name: user.fullName,
        avatar: user.profileImageUrl,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setReviews([response.data, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
      setError(null);
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review. Please try again.');
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4 flex items-center">
        <Link to="/" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-center flex-grow">Reviews</h1>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 text-center">
          {error}
        </div>
      )}

      <div className="flex-grow overflow-y-auto p-4">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              {reviews.map((review) => (
                <li key={review._id} className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img 
                        className="w-8 h-8 rounded-full"
                        src={review.avatar}
                        alt={`${review.name}'s avatar`}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/40';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {review.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {review.comment}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md p-4">
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="flex-grow relative">
            <select
              name="rating"
              value={newReview.rating}
              onChange={handleInputChange}
              className="absolute left-0 top-0 h-full border border-gray-300 rounded-l-full p-2 bg-white"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <input
              type="text"
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              placeholder="Write your review..."
              className="w-full p-2 pl-16 border rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;
