// import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaUserFriends, FaLock, FaComments, FaStar } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Image Carousel */}
        <section className="w-full">
          <Carousel autoPlay infiniteLoop showThumbs={false}>
            <div>
              <img src="/placeholder.svg?height=400&width=800" alt="Carousel 1" className="w-full h-[400px] object-cover" />
            </div>
            <div>
              <img src="/placeholder.svg?height=400&width=800" alt="Carousel 2" className="w-full h-[400px] object-cover" />
            </div>
            <div>
              <img src="/placeholder.svg?height=400&width=800" alt="Carousel 3" className="w-full h-[400px] object-cover" />
            </div>
          </Carousel>
        </section>

        {/* Quote Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl text-center font-bold text-gray-800 max-w-4xl mx-auto">
              Talkmind is a mental health-focused therapy platform that helps you find the right support and resources to help improve your well-being.
            </h1>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">What we do</h2>
              <p className="text-lg text-gray-600 mb-6">
                As a Talkmind patient who experiences mental health difficulties, you will
                receive a comprehensive treatment plan appropriate to your diagnosis,
                to help improve your quality of life.
              </p>
              <Link to="/about" className="inline-block bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
                About us
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-10-15%20at%2000.51.33_7f73c1fb-nQCAKjsr7eJy3uid9dFmduOMSUepnO.jpg" alt="Therapy session" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-around items-center">
              <div className="w-full sm:w-1/3 mb-8 sm:mb-0 flex flex-col items-center">
                <div className="bg-white rounded-full p-6 mb-4 shadow-lg">
                  <FaUserFriends className="text-4xl text-blue-500" />
                </div>
                <p className="text-center text-gray-800">Friendly Support</p>
              </div>
              <div className="w-full sm:w-1/3 mb-8 sm:mb-0 flex flex-col items-center">
                <div className="bg-white rounded-full p-6 mb-4 shadow-lg">
                  <FaLock className="text-4xl text-blue-500" />
                </div>
                <p className="text-center text-gray-800">Your chats and talks are private</p>
              </div>
              <div className="w-full sm:w-1/3 flex flex-col items-center">
                <div className="bg-white rounded-full p-6 mb-4 shadow-lg">
                  <FaComments className="text-4xl text-blue-500" />
                </div>
                <p className="text-center text-gray-800">Free Chats</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-around">
              <div className="w-full sm:w-1/3 mb-8 sm:mb-0">
                <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col justify-between">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Chat with Us</h3>
                  <p className="text-gray-600 mb-4">Connect with our professionals for immediate support.</p>
                  <Link to="/chat" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 text-center">
                    Start Chatting
                  </Link>
                </div>
              </div>
              <div className="w-full sm:w-1/3 mb-8 sm:mb-0">
                <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col justify-between">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Book a Meeting</h3>
                  <p className="text-gray-600 mb-4">Schedule a one-on-one session with our experts.</p>
                  <Link to="/booking" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 text-center">
                    Book Now
                  </Link>
                </div>
              </div>
              <div className="w-full sm:w-1/3">
                <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col justify-between">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Read Reviews</h3>
                  <p className="text-gray-600 mb-4">See what others are saying about our services.</p>
                  <Link to="/reviews" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 text-center">
                    View Reviews
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Reviews Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Recent 5-Star Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((review) => (
                <div key={review} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                    ipsum vel justo fermentum faucibus. Donec vel arcu in enim
                    consectetur fermentum.
                  </p>
                  <p className="font-bold text-gray-800">- Happy Client</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/reviews" className="inline-block bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
                See More Reviews
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;