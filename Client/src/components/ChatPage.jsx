import React, { useState, useEffect, useRef } from 'react';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { useChat } from 'ai/react';
import { Send, Menu, X } from 'lucide-react';
import axios from 'axios';

function ChatPage() {
  const { user, isLoaded } = useUser();
  const [isBlurred, setIsBlurred] = useState(true);
  const [messageHistory, setMessageHistory] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit: sendMessage } = useChat();
  const messagesEndRef = useRef(null);

  const apiUrl = import.meta.env.REACT_APP_API_URL || 'http://localhost:5001';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, messageHistory]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (user) {
        try {
          const response = await axios.get(`${apiUrl}/api/messages/${user.id}`);
          setMessageHistory(response.data);
        } catch (error) {
          console.error('Error fetching message history:', error);
        }
      }
    };

    if (isLoaded && user) {
      fetchMessages();
    }
  }, [isLoaded, user, apiUrl]);

  useEffect(() => {
    if (isLoaded) {
      setIsBlurred(!user);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    const storeAssistantMessage = async (message) => {
      if (user && message.role === 'assistant') {
        try {
          await axios.post(`${apiUrl}/api/messages`, {
            userId: user.id,
            content: message.content,
            role: 'assistant'
          });
        } catch (error) {
          console.error('Error storing assistant message:', error);
        }
      }
    };

    const latestMessage = messages[messages.length - 1];
    if (latestMessage?.role === 'assistant') {
      storeAssistantMessage(latestMessage);
    }
  }, [messages, user, apiUrl]);

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
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const allMessages = [...messageHistory, ...messages];

  const renderMessage = (m, index) => (
    <div 
      key={m.id || index} 
      className={`flex items-start space-x-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      {m.role === 'assistant' && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
          AI
        </div>
      )}
      <div 
        className={`px-4 py-2 rounded-lg max-w-[80%] break-words shadow-sm ${
          m.role === 'user' 
            ? 'bg-blue-500 text-white rounded-br-none' 
            : 'bg-white text-gray-800 rounded-bl-none'
        }`}
      >
        {m.content}
      </div>
      {m.role === 'user' && user?.imageUrl && (
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
          <img src={user.imageUrl} alt="User" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex flex-col w-full mx-auto lg:max-w-6xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-white border-b shadow-sm">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <h2 className="text-xl font-semibold text-gray-800">Chat Assistant</h2>
              </div>
              {user && (
                <div className="flex items-center space-x-4">
                  <span className="hidden sm:block text-sm text-gray-600">
                    {user.fullName || user.username}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    {user.imageUrl && (
                      <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {!user ? (
            <div className="flex-grow flex items-center justify-center p-4">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-medium text-gray-700">Welcome to Chat Assistant</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Sign in to start a conversation and access your message history.
                </p>
                <SignInButton mode="modal">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                    Sign In to Chat
                  </button>
                </SignInButton>
              </div>
            </div>
          ) : (
            <div className={`flex flex-col flex-grow ${isBlurred ? 'filter blur-sm' : ''}`}>
              {/* Message area */}
              <div className="flex-grow overflow-hidden relative bg-gray-200">
                <div className="absolute inset-0 p-4">
                  <div className="h-full overflow-y-auto space-y-6 scroll-smooth">
                    {allMessages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 text-center">
                          No messages yet. Start a conversation!
                        </p>
                      </div>
                    ) : (
                      allMessages.map((m, index) => renderMessage(m, index))
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>

              {/* Input form */}
              <div className="p-4 bg-white border-t">
                <form onSubmit={handleSubmit} className="flex space-x-4 max-w-4xl mx-auto">
                  <input
                    className="flex-grow px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                  />
                  <button 
                    type="submit" 
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center w-12"
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;