// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CustomerReviewPage from './pages/CustomerReviewPage';
import BookingPage from './pages/BookingPage';
import ChatPage from './pages/ChatPage';
import PaymentPage from './pages/PaymentPage';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/reviews" element={<CustomerReviewPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;