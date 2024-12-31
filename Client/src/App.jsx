import React from 'react';
import {Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
// import LoginPage from "./components/LoginPage";
// import SignupPage from "./components/SignupPage";
// import BookingPage from "./components/BookingPage";
import CustomerReviewPage from "./components/CustomerReviewPage";
import ChatPage from "./components/ChatPage";
import PaymentPage from "./components/PaymentPage";
import "./index.css";

function App() {
  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="/signup" element={<SignupPage />} /> */} 
            {/* <Route path="/booking" element={<BookingPage />} /> */}
            <Route path="/reviews" element={<CustomerReviewPage />} />
            <Route path="/chatpage" element={<ChatPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </main>
      </div>
  );
}

export default App;
