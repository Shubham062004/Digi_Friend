// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import CustomerReviewPage from './components/pages/CustomerReviewPage';
import BookingPage from './components/pages/BookingPage';
import ChatPage from './components/pages/ChatPage';
import PaymentPage from './components/pages/PaymentPage';
import './index.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reviews" element={<CustomerReviewPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/chatpage" element={<ChatPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
