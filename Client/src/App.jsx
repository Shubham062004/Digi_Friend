import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CustomerReviewPage from './components/CustomerReviewPage';
import ChatPage from './components/ChatPage';
import PaymentPage from './components/PaymentPage';
import './index.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/reviews" element={<CustomerReviewPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
              <a href="/" className="text-blue-600 hover:underline">Go back home</a>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;
