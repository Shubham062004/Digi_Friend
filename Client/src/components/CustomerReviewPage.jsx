import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';

export default function CustomerReviewPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reviews'); // Adjust API endpoint as needed
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What our users are saying
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Don&apos;t just take our word for it - hear from some of our satisfied users!
          </p>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review._id} className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <img className="h-12 w-12 rounded-full" src={review.avatar} alt={review.name} />
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">{review.name}</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
