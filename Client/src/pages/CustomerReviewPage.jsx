// import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Emily Johnson',
    rating: 5,
    comment: 'Digi Friend has been a game-changer for me. I&apos;ve made genuine connections and found incredible support here.',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 4,
    comment: 'The chat feature is fantastic, and the support groups have been incredibly helpful. Highly recommend!',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    name: 'Sarah Thompson',
    rating: 5,
    comment: 'I love how easy it is to schedule meetings and connect with like-minded individuals. Digi Friend is amazing!',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  // Add more reviews as needed
];

export default function CustomerReviewPage() {
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
            <div key={review.id} className="bg-gray-50 rounded-lg p-6 shadow-sm">
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