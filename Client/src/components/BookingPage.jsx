// import { getCalApi } from "@calcom/embed-react";
// import React from 'react';
import { Link } from 'react-router-dom';

const BookingPage = () => {
  const handleScheduleMeeting = () => {
    window.location.href = 'https://cal.com/your-organization'; // Replace with your actual Cal.com link
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Book a Meeting
        </h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Ready to schedule a meeting?
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Click the button below to be redirected to our scheduling page.</p>
            </div>
            <div className="mt-5">
              <button
                onClick={handleScheduleMeeting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Schedule a Meeting
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;