import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  FaUserFriends,
  FaLock,
  FaComments,
  FaRegCalendarCheck,
  FaUsers,
} from "react-icons/fa";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import therapySession from "../assets/therapySession.jpeg";
import carosal1 from "../assets/005.jpeg";
import carosal2 from "../assets/007.jpeg";
import carosal3 from "../assets/009.jpeg";
import axios from "axios";

const LandingPage = () => {
  const [reviews, setReviews] = useState([]);
  const splideRef = useRef(null);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/reviews`
        );
        const sortedReviews = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setReviews(sortedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();

    if (splideRef.current) {
      const splide = new Splide(splideRef.current, {
        type: "loop",
        drag: "free",
        focus: "center",
        perPage: 3,
        gap: "2rem",
        arrows: false,
        pagination: false,
        autoScroll: {
          speed: 1,
          pauseOnHover: true,
        },
        breakpoints: {
          1024: {
            perPage: 2,
          },
          640: {
            perPage: 1,
          },
        },
      });

      splide.mount({ AutoScroll });

      return () => {
        splide.destroy();
      };
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Image Carousel Section */}
        <section className="w-full">
          <Carousel autoPlay infiniteLoop showThumbs={false}>
            <div>
              <img src={carosal1} alt="Carousel Image 1" className="w-full h-[400px] object-cover" />
            </div>
            <div>
              <img src={carosal2} alt="Carousel Image 2" className="w-full h-[400px] object-cover" />
            </div>
            <div>
              <img src={carosal3} alt="Carousel Image 3" className="w-full h-[400px] object-cover" />
            </div>
          </Carousel>
        </section>

        {/* Introduction Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl text-center font-bold text-gray-800 max-w-4xl mx-auto">
              Talkmind is a mental health-focused therapy platform that helps you find the right support and resources to improve your well-being.
            </h1>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-around items-center">
              {/* Feature: Friendly Support */}
              <div className="w-full sm:w-1/5 mb-8 flex flex-col items-center">
                <div className="bg-white rounded-full p-6 mb-4 shadow-lg">
                  <FaUserFriends className="text-xl text-blue-500" />
                </div>
                <p className="text-center text-gray-800">Friendly Support</p>
              </div>
              {/* Feature: Private Chats */}
              <div className="w-full sm:w-1/5 mb-8 flex flex-col items-center">
                <div className="bg-white rounded-full p-6 mb-4 shadow-lg">
                  <FaLock className="text-4xl text-blue-500" />
                </div>
                <p className="text-center text-gray-800">Your chats and talks are private</p>
              </div>
              {/* Feature: Free Chats */}
              <div className="w-full sm:w-1/5 mb-8 flex flex-col items-center">
                <div className="bg-white rounded-full p-6 mb-4 shadow-lg">
                  <FaComments className="text-4xl text-blue-500" />
                </div>
                <p className="text-center text-gray-800">Free Chats</p>
              </div>
              {/* Feature: Book a Meeting */}
              <div className="w-full sm:w-1/5 mb-8 flex flex-col items-center">
                <div className="bg-white rounded-full p-6 mb-4 shadow-lg">
                  <FaRegCalendarCheck className="text-4xl text-blue-500" />
                </div>
                <p className="text-center text-gray-800">Book a Meeting</p>
              </div>
              {/* Feature: 1m+ Users */}
              <div className="w-full sm:w-1/5 mb-8 flex flex-col items-center">
                <div className="bg-white rounded-full p-6 mb-4 shadow-lg">
                  <FaUsers className="text-4xl text-blue-500" />
                </div>
                <p className="text-center text-gray-800">1m+ Users</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Reviews Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Recent 5-Star Reviews
            </h2>

            <div className="splide" ref={splideRef}>
              <div className="splide__track">
                <ul className="splide__list">
                  {reviews.map((review) => (
                    <li key={review._id} className="splide__slide px-4">
                      <div className="bg-white rounded-lg shadow-lg p-8 h-[420px] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center mb-6">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className="text-yellow-400 text-xl" />
                            ))}
                          </div>
                          <p className="text-gray-600 text-lg mb-6 line-clamp-6">
                            &quot;{review.comment}&quot;
                          </p>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-xl">- {review.name}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                to="/reviews"
                className="inline-block bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              >
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
