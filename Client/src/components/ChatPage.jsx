import React, { useState, useEffect, useRef } from "react";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { Send, Trash2, MessageSquare, Loader2 } from "lucide-react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Local storage utility
const chatStorage = {
  getMessages: () => {
    try {
      const messages = localStorage.getItem("digi_friend_chat_messages");
      return messages ? JSON.parse(messages) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  },

  saveMessage: (message) => {
    try {
      const messages = chatStorage.getMessages();
      const newMessage = {
        ...message,
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
      };
      messages.push(newMessage);
      localStorage.setItem(
        "digi_friend_chat_messages",
        JSON.stringify(messages.slice(-100))
      );
      return newMessage;
    } catch (error) {
      console.error("Error writing to localStorage:", error);
      return null;
    }
  },

  clearMessages: () => {
    try {
      localStorage.removeItem("digi_friend_chat_messages");
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  },

  getConversationId: () => {
    try {
      return (
        localStorage.getItem("digi_friend_current_conversation") ||
        `conv_${Date.now()}`
      );
    } catch (error) {
      return `conv_${Date.now()}`;
    }
  },

  setConversationId: (conversationId) => {
    try {
      localStorage.setItem("digi_friend_current_conversation", conversationId);
      return true;
    } catch (error) {
      return false;
    }
  },
};

function ChatPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(
    chatStorage.getConversationId()
  );

  const messagesEndRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isLoaded) {
      loadMessages();
    }
  }, [isLoaded, isSignedIn]);

  const loadMessages = async () => {
    setIsFetching(true);
    try {
      if (isSignedIn && user) {
        const response = await axios.get(
          `${API_URL}/api/chat/messages/${user.id}`
        );
        if (response.data.success) {
          setMessages(response.data.data);
        }
      } else {
        const localMessages = chatStorage.getMessages();
        setMessages(localMessages);
      }
    } catch (error) {
      console.error("Error loading messages:", error);
      const localMessages = chatStorage.getMessages();
      setMessages(localMessages);
    } finally {
      setIsFetching(false);
    }
  };

  const saveMessage = async (message) => {
    try {
      if (isSignedIn && user) {
        await axios.post(`${API_URL}/api/chat/messages`, {
          userId: user.id,
          content: message.content,
          role: message.role,
          conversationId,
        });
      } else {
        chatStorage.saveMessage(message);
      }
    } catch (error) {
      console.error("Error saving message:", error);
      chatStorage.saveMessage(message);
    }
  };

  const getMockAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes("anxious") || message.includes("anxiety")) {
      return "I hear that you're feeling anxious. Anxiety is a common experience. Would you like to try some breathing exercises that might help calm your mind?";
    }

    if (message.includes("sad") || message.includes("depressed")) {
      return "I'm sorry you're feeling this way. Your feelings are valid and important. Have you been able to talk to anyone about how you're feeling?";
    }

    if (message.includes("stress") || message.includes("stressed")) {
      return "Stress can be overwhelming. Let's work together to identify some healthy coping strategies. What usually helps you relax?";
    }

    const responses = [
      "I understand you're going through a difficult time. Can you tell me more about what you're feeling?",
      "Thank you for sharing that with me. Your feelings are valid. How long have you been experiencing this?",
      "It's important to acknowledge your emotions. Have you tried any coping strategies that have helped in the past?",
      "I'm here to support you. Would you like to explore some techniques that might help you feel better?",
      "That sounds challenging. Remember, seeking help is a sign of strength. Have you considered talking to a professional therapist?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage = {
      content: input.trim(),
      role: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    await saveMessage(userMessage);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const aiResponse = {
        content: getMockAIResponse(userMessage.content),
        role: "assistant",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      await saveMessage(aiResponse);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setError("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    if (!window.confirm("Are you sure you want to clear all chat history?")) {
      return;
    }

    try {
      if (isSignedIn && user) {
        await axios.delete(`${API_URL}/api/chat/messages/${user.id}`, {
          params: { conversationId },
        });
      }

      chatStorage.clearMessages();
      setMessages([]);

      const newConvId = `conv_${Date.now()}`;
      chatStorage.setConversationId(newConvId);
      setConversationId(newConvId);
    } catch (error) {
      console.error("Error clearing chat:", error);
      setError("Failed to clear chat history");
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-t-lg shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <MessageSquare className="text-blue-600" size={24} />
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Mental Health Chat
              </h1>
              <p className="text-sm text-gray-600">
                {isSignedIn
                  ? `Welcome, ${user.firstName || "User"}!`
                  : "Guest Mode - Sign in to save history"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClearChat}
            className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center space-x-1"
          >
            <Trash2 size={16} />
            <span className="text-sm">Clear</span>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-white shadow-md overflow-y-auto p-4 space-y-4 min-h-[400px] max-h-[600px]">
          {isFetching ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              {!isSignedIn ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md">
                  <MessageSquare
                    className="mx-auto mb-4 text-yellow-600"
                    size={48}
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Sign in to save your chat history
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Messages are currently saved locally. Sign in to access your
                    chat history from any device.
                  </p>
                  <SignInButton mode="modal">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                      Sign In
                    </button>
                  </SignInButton>
                </div>
              ) : (
                <div>
                  <MessageSquare
                    className="mx-auto mb-4 text-gray-400"
                    size={48}
                  />
                  <p className="text-gray-600">
                    No messages yet. Start a conversation!
                  </p>
                </div>
              )}
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(
                      message.timestamp || message.createdAt
                    ).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                <Loader2 className="animate-spin" size={20} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-lg mb-2 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-700 hover:text-red-900"
            >
              ✕
            </button>
          </div>
        )}

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-b-lg shadow-md p-4 flex space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
            maxLength={2000}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Send size={20} />
                <span>Send</span>
              </>
            )}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default ChatPage;
