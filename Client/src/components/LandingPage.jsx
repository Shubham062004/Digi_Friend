import React from 'react';
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  FaUserFriends,
  FaLock,
  FaComments,
  FaStar,
  FaRegCalendarCheck,
  FaUsers,
} from "react-icons/fa";
import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import { getCalApi } from "@calcom/embed-react";
import therapySession from "../assets/therapySession.jpeg";

const LandingPage = () => {
  const splideRef = useRef(null);

  useEffect(() => {
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

  const reviews = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ipsum vel justo fermentum faucibus.",
      author: "Happy Client 1",
    },
    {
      id: 2,
      text: "Amazing service! The therapists are very professional and understanding. Highly recommend to anyone seeking support.",
      author: "Happy Client 2",
    },
    {
      id: 3,
      text: "This platform has been a game-changer for my mental health journey. The convenience and quality of care is outstanding.",
      author: "Happy Client 3",
    },
    {
      id: 4,
      text: "Very impressed with the personalized attention and care. The booking process is smooth and the therapists are excellent.",
      author: "Happy Client 4",
    },
    {
      id: 5,
      text: "Found exactly the support I needed. The chat feature is particularly helpful when you need immediate assistance.",
      author: "Happy Client 5",
    },
  ];
  
  const handleScheduleMeeting = () => {
    window.location.href = 'https://cal.com/your-organization'; // Replace with your actual Cal.com link
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Image Carousel Section */}
        <section className="w-full">
          <Carousel autoPlay infiniteLoop showThumbs={false}>
            <div>
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="Carousel Image 1"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="Carousel Image 2"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="Carousel Image 3"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </Carousel>
        </section>

        {/* Introduction Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl text-center font-bold text-gray-800 max-w-4xl mx-auto">
              Talkmind is a mental health-focused therapy platform that helps
              you find the right support and resources to improve your
              well-being.
            </h1>
          </div>
        </section>

        {/* Our Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                What We Do
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                As a Talkmind patient experiencing mental health challenges, you
                will receive a comprehensive treatment plan tailored to your
                diagnosis, designed to enhance your quality of life.
              </p>
              <Link
                to="/about"
                className="inline-block bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                About Us
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src={therapySession}
                alt="Therapy session"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
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
                <p className="text-center text-gray-800">
                  Your chats and talks are private
                </p>
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

        {/* Services Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-12">
                Services We Provide
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Chat with Us
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Connect with our experienced professionals who are ready
                      to provide immediate support and guidance tailored to your
                      needs. Whether you have questions or need assistance,
                      We&#39;re here to help you navigate your challenges
                      efficiently.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Link
                      to="/chatpage"
                      className="inline-block bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300 text-center w-full md:w-auto"
                    >
                      Start Chatting
                    </Link>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Book a Meeting
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Schedule a one-on-one session with our experts at your
                      convenience. We understand that your time is valuable, and
                      we aim to provide focused attention to address your
                      specific needs and questions effectively.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Link
                      // to="/booking"
                      onClick={handleScheduleMeeting}
                      className="inline-block bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300 text-center w-full md:w-auto"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Read Reviews
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Explore testimonials from our satisfied clients who have
                      experienced our services. Their feedback serves as a
                      testament to our commitment to quality and client
                      satisfaction, and we invite you to see how we can assist
                      you too.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Link
                      to="/reviews"
                      className="inline-block bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300 text-center w-full md:w-auto"
                    >
                      View Reviews
                    </Link>
                  </div>
                </div>
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
                    <li key={review.id} className="splide__slide px-4">
                      <div className="bg-white rounded-lg shadow-lg p-8 h-[420px] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center mb-6">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className="text-yellow-400 text-xl"
                              />
                            ))}
                          </div>
                          <p className="text-gray-600 text-lg mb-6 line-clamp-6">
                            &quot;{review.text}&quot;
                          </p>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-xl">
                            - {review.author}
                          </p>
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
