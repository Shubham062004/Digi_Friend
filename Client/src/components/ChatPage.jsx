// import React from 'react';
import React, { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { useChat } from 'ai/react';

function ChatPage() {
  const { user, isLoaded } = useUser();
  const [isBlurred, setIsBlurred] = useState(true);
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  useEffect(() => {
    if (isLoaded) {
      setIsBlurred(!user);
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-extrabold text-gray-900">Chat App</h2>
                {!user && (
                  <div className="mt-8">
                    <SignInButton mode="modal">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Sign In to Chat
                      </button>
                    </SignInButton>
                  </div>
                )}
              </div>
              <div className={`py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 ${isBlurred ? 'filter blur-sm' : ''}`}>
                <div className="h-[60vh] overflow-y-auto mb-4">
                  {messages.map(m => (
                    <div key={m.id} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <span className={`inline-block p-2 rounded-lg ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                        {m.content}
                      </span>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="flex space-x-4">
                  <input
                    className="flex-1 border rounded-md p-2"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Say something..."
                  />
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;

