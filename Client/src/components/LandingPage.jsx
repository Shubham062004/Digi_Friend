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
    <div className="box-border m-0 p-0">
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow">
          {/* Image Carousel Section */}
          <section className="relative">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              className="max-h-[620px] overflow-hidden"
            >
              {[carosal1, carosal2, carosal3].map((img, index) => (
                <div key={index} className="h-[620px]">
                  <img
                    src={img}
                    alt={`Carousel Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Carousel>
          </section>

          {/* Introduction Section */}
          <section className="py-16 bg-gray-50">
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
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    What We Do
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    As a Talkmind patient experiencing mental health challenges,
                    you will receive a comprehensive treatment plan tailored to
                    your diagnosis, designed to enhance your quality of life.
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
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {[
                  { icon: FaUserFriends, text: "Friendly Support" },
                  { icon: FaLock, text: "Your chats and talks are private" },
                  { icon: FaComments, text: "Free Chats" },
                  { icon: FaRegCalendarCheck, text: "Book a Meeting" },
                  { icon: FaUsers, text: "1m+ Users" },
                ].map((feature, index) => (
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
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12">
                  Services We Provide
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Chat with Us",
                      description:
                        "Connect with our experienced professionals who are ready to provide immediate support and guidance tailored to your needs.",
                      link: "/chatpage",
                      buttonText: "Start Chatting",
                    },
                    {
                      title: "Book a Meeting",
                      description:
                        "Schedule a one-on-one session with our experts at your convenience.",
                      link: "https://cal.com/shubham-kumar-chaurasia-fll1ki",
                      buttonText: "Book Now",
                    },
                    {
                      title: "Read Reviews",
                      description:
                        "Explore testimonials from our satisfied clients who have experienced our services.",
                      link: "/reviews",
                      buttonText: "View Reviews",
                    },
                  ].map((service, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg shadow-lg p-6 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Link
                          to={service.link}
                          className="inline-block bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300 text-center w-full md:w-auto"
                        >
                          {service.buttonText}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Recent Reviews Section */}
          <section className="py-16 bg-gray-50">
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
