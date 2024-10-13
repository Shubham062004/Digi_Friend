// import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Calendar, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-white">
      <main>
        {/* Hero section */}
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="/placeholder.svg?height=600&width=1200"
                  alt="People connecting"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply"></div>
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">Connect, Chat, and Grow with</span>
                  <span className="block text-indigo-200">Digi Friend</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                  Your digital companion for meaningful connections, support, and personal growth. Join our community today and experience the power of digital friendship.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                    <Link to="/sign-up">
                      <Button variant="default" size="lg" className="flex items-center justify-center px-8 py-3">
                        Get started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/about">
                      <Button variant="outline" size="lg" className="flex items-center justify-center px-8 py-3 bg-white text-indigo-700 hover:bg-indigo-50">
                        Learn more
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
          <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="relative">
              <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A better way to connect and grow
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
                Digi Friend offers a suite of features designed to help you build meaningful connections, find support, and achieve personal growth in a safe and welcoming digital environment.
              </p>
            </div>

            <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                  Connect with like-minded individuals
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Our platform brings together people from all walks of life, allowing you to form genuine connections based on shared interests, experiences, and goals.
                </p>

                <dl className="mt-10 space-y-10">
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Real-time chat</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Engage in meaningful conversations through our real-time chat feature, allowing you to connect instantly with friends and support groups.
                    </dd>
                  </div>

                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Schedule meetings</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Easily schedule one-on-one or group meetings with our integrated calendar system, making it simple to plan virtual hangouts or support sessions.
                    </dd>
                  </div>

                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <Users className="h-6 w-6" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Join support groups</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Find and join support groups tailored to your needs, where you can share experiences, offer advice, and receive support from others who understand.
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
                <img className="relative mx-auto" width="490" src="/placeholder.svg?height=490&width=490" alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="bg-indigo-700">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block">Join Digi Friend today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">
              Start your journey towards meaningful connections and personal growth. Sign up now and experience the power of digital friendship.
            </p>
            <Link to="/sign-up">
              <Button variant="default" size="lg" className="mt-8 w-full sm:w-auto">
                Sign up for free
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}