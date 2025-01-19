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
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

// Image imports
import therapySession from "../assets/therapySession.jpeg";
import carosal1 from "../assets/005.jpeg";
import carosal2 from "../assets/007.jpeg";
import carosal3 from "../assets/009.jpeg";
import carosal4 from "../assets/007.jpeg";
import carosal5 from "../assets/011.jpeg";

/**
 * Feature items configuration for the features section
 */
const FEATURE_ITEMS = [
  { icon: FaUserFriends, text: "Friendly Support" },
  { icon: FaLock, text: "Your chats and talks are private" },
  { icon: FaComments, text: "Free Chats" },
  { icon: FaRegCalendarCheck, text: "Book a Meeting" },
  { icon: FaUsers, text: "1m+ Users" },
];

/**
 * Service items configuration for the services section
 */
const SERVICE_ITEMS = [
  {
    title: "Chat with Us",
    description:
      "Connect with our experienced professionals who are ready to provide immediate support and guidance tailored to your needs.",
    link: "/chatpage",
    buttonText: "Start Chatting",
    isExternal: false,
  },
  {
    title: "Book a Meeting",
    description:
      "Schedule a one-on-one session with our experts at your convenience.",
    link: "https://cal.com/shubham-kumar-chaurasia-fll1ki",
    buttonText: "Book Now",
    isExternal: true,
  },
  {
    title: "Read Reviews",
    description:
      "Explore testimonials from our satisfied clients who have experienced our services.",
    link: "/reviews",
    buttonText: "View Reviews",
    isExternal: false,
  },
];

/**
 * LandingPage Component
 * 
 * A comprehensive landing page featuring:
 * - Image carousel with navigation
 * - Introduction section
 * - Services overview
 * - Features showcase
 * - Customer reviews
 */
const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reviews, setReviews] = useState([]);
  const splideRef = useRef(null);

  // Fetch reviews and initialize Splide carousel
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/api/reviews`
        );
        const sortedReviews = response.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setReviews(sortedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
    initializeSplide();

    return () => {
      if (splideRef.current) {
        splideRef.current.destroy();
      }
    };
  }, []);

  /**
   * Initialize Splide carousel with configurations
   */
  const initializeSplide = () => {
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
          1024: { perPage: 2 },
          640: { perPage: 1 },
        },
      });

      splide.mount({ AutoScroll });
    }
  };

  /**
   * Renders a service card
   * @param {Object} service - Service information object
   * @param {number} index - Index of the service
   */
  const renderServiceCard = (service, index) => (
    <div
      key={index}
      className="bg-gray-50 rounded-lg shadow-lg p-6 flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-6">{service.description}</p>
      </div>
      <div className="flex justify-center">
        {service.isExternal ? (
          <a
            href={service.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300 text-center w-full md:w-auto"
          >
            {service.buttonText}
          </a>
        ) : (
          <Link
            to={service.link}
            className="inline-block bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300 text-center w-full md:w-auto"
          >
            {service.buttonText}
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="box-border m-0 p-0">
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow">
          {/* Hero Section with Carousel */}
          <section className="relative h-[500px]">
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-white text-center">
                  <h1 className="text-6xl font-bold mb-4">DIGI FRIEND</h1>
                  <p className="text-xl mb-8">
                    Experience professional therapy from the comfort of your
                    home. Our expert therapists are here to support your mental
                    well-being journey.
                  </p>
                  <Link
                    to="/chatpage"
                    className="inline-block bg-black text-white font-bold py-3 px-8 rounded-none hover:bg-gray-800 transition duration-300"
                  >
                    CHAT →
                  </Link>
                </div>
              </div>
            </div>

            {/* Carousel Navigation */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 hover:bg-gray-100 transition duration-300"
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? 4 : prev - 1))}
            >
              <FaChevronLeft className="text-gray-800 text-xl" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 hover:bg-gray-100 transition duration-300"
              onClick={() => setCurrentSlide((prev) => (prev === 4 ? 0 : prev + 1))}
            >
              <FaChevronRight className="text-gray-800 text-xl" />
            </button>

            {/* Main Carousel */}
            <Carousel
              selectedItem={currentSlide}
              onChange={setCurrentSlide}
              showStatus={false}
              showThumbs={false}
              showArrows={false}
              showIndicators={false}
              infiniteLoop
              autoPlay
              className="h-[90vh]"
            >
              {[carosal1, carosal2, carosal3, carosal4, carosal5].map(
                (img, index) => (
                  <div key={index} className="h-[500px]">
                    <div className="absolute inset-0 bg-black/30 z-[5]" />
                    <img
                      src={img}
                      alt={`Carousel Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )
              )}
            </Carousel>
          </section>

          {/* Introduction Section */}
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl text-center font-bold text-gray-800 max-w-4xl mx-auto">
                Digi Friend is a mental health-focused therapy platform that
                helps you find the right support and resources to improve your
                well-being.
              </h1>
            </div>
          </section>

          {/* Services Overview Section */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-gray-800 mb-4">
                  What We Do
                </h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Transforming mental healthcare through personalized support
                  and innovative solutions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Image Section */}
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full opacity-50"></div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-50 rounded-full opacity-50"></div>
                  <img
                    src={therapySession}
                    alt="Therapy session"
                    className="relative z-10 w-full h-[400px] object-cover rounded-lg shadow-2xl"
                  />
                </div>

                {/* Service Details */}
                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Personalized Treatment Plans
                    </h3>
                    <p className="text-gray-600">
                      Experience tailored mental health support designed
                      specifically for your unique needs and challenges.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Expert Therapists
                    </h3>
                    <p className="text-gray-600">
                      Connect with licensed professionals who specialize in
                      various areas of mental health care.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Continuous Support
                    </h3>
                    <p className="text-gray-600">
                      Access ongoing care and resources to help you maintain and
                      improve your mental well-being.
                    </p>
                  </div>

                  <div className="inline-flex items-center bg-black text-white py-3 px-8 rounded-none hover:bg-gray-800 transition duration-300">
                    Learn More About Us →
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {FEATURE_ITEMS.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="bg-white rounded-full p-6 mb-4 shadow-lg">
                      <feature.icon className="text-4xl text-blue-500" />
                    </div>
                    <p className="text-center text-gray-800">{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12">
                  Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SERVICE_ITEMS.map((service, index) => renderServiceCard(service, index))}
                </div>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Our Happy Customers
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
                                <FaStar
                                  key={i}
                                  className="text-yellow-400 text-xl"
                                />
                              ))}
                            </div>
                            <p className="text-gray-600 text-lg mb-6 line-clamp-6">
                              &quot;{review.comment}&quot;
                            </p>
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-xl">
                              - {review.name}
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
    </div>
  );
};

export default LandingPage;
