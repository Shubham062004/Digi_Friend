import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaymentPage = () => {
  const [amount, setAmount] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    // Here you would typically integrate with a payment gateway like Razorpay or PayU
    console.log('Processing payment for amount:', amount);
    // After successful payment, you might want to redirect the user or show a success message
    alert(`Payment of ${amount} INR processed successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Make a Payment
        </h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <form onSubmit={handlePayment} className="px-4 py-5 sm:p-6">
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount (in INR)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Pay Now
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Secure payments powered by Razorpay and PayU
        </p>
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

export default PaymentPage;