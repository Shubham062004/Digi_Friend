import React, { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { useChat } from 'ai/react';
import axios from 'axios';

function ChatPage() {
  const { user, isLoaded } = useUser();
  const [isBlurred, setIsBlurred] = useState(true);
  const { messages, input, handleInputChange, handleSubmit: sendMessage } = useChat();

  useEffect(() => {
    if (isLoaded) {
      setIsBlurred(!user);
    }
  }, [isLoaded, user]);

  const apiUrl = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const userMessage = { userId: user.id, content: input, role: 'user' };
      await axios.post(`${apiUrl}/api/messages`, userMessage);
      sendMessage(e);
    } catch (error) {
      console.error('Error storing user message:', error);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow flex flex-col max-w-4xl w-full mx-auto">
        <div className="flex flex-col flex-grow">
          <div className="bg-blue-500 text-white py-4 px-6">
            <h2 className="text-3xl font-bold">Chat App</h2>
          </div>
          {!user ? (
            <div className="flex-grow flex items-center justify-center">
              <SignInButton mode="modal">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Sign In to Chat
                </button>
              </SignInButton>
            </div>
          ) : (
            <div className={`flex-grow flex flex-col justify-between ${isBlurred ? 'filter blur-sm' : ''}`}>
              <div className="flex-grow p-4 space-y-4">
                {messages.map(m => (
                  <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-4 py-2 rounded-lg ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="p-4">
                <div className="flex space-x-4">
                  <input
                    className="flex-grow border rounded-md p-2"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                  />
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    Send
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
