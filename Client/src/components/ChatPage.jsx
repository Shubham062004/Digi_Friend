// ChatPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Trash2,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Menu,
  Heart,
  CheckCircle
} from 'lucide-react';
import axios from 'axios';

// Local storage utility
const chatStorage = {
  getMessages: () => {
    try {
      const messages = localStorage.getItem('digi_friend_chat_messages');
      return messages ? JSON.parse(messages) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
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
      localStorage.setItem('digi_friend_chat_messages', JSON.stringify(messages.slice(-100)));
      return newMessage;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return null;
    }
  },

  clearMessages: () => {
    try {
      localStorage.removeItem('digi_friend_chat_messages');
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  getConversationId: () => {
    try {
      return localStorage.getItem('digi_friend_current_conversation') || `conv_${Date.now()}`;
    } catch (error) {
      return `conv_${Date.now()}`;
    }
  },

  setConversationId: (conversationId) => {
    try {
      localStorage.setItem('digi_friend_current_conversation', conversationId);
      return true;
    } catch (error) {
      return false;
    }
  },

  getHasGreeted: () => {
    try {
      return localStorage.getItem('digi_friend_has_greeted') === 'true';
    } catch (error) {
      return false;
    }
  },

  setHasGreeted: (value) => {
    try {
      localStorage.setItem('digi_friend_has_greeted', value.toString());
      return true;
    } catch (error) {
      return false;
    }
  },
};

function ChatPage() {
  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(chatStorage.getConversationId());
  const [showMenu, setShowMenu] = useState(false);
  const [geminiWorking, setGeminiWorking] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => scrollToBottom(), [messages]);

  // Load messages on auth state ready
  useEffect(() => {
    if (isLoaded) loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn]);

  // Focus input on mount
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, []);

  // Persist conversationId whenever it changes
  useEffect(() => {
    if (conversationId) chatStorage.setConversationId(conversationId);
  }, [conversationId]);

  const loadMessages = async () => {
    setIsFetching(true);
    setError(null);
    try {
      if (isSignedIn && user?.id) {
        const resp = await axios.get(`${API_URL}/api/chat/messages/${user.id}`, { timeout: 10000 });
        if (resp?.data?.success && Array.isArray(resp.data.data) && resp.data.data.length > 0) {
          setMessages(resp.data.data);
          chatStorage.setHasGreeted(true);
        } else {
          await sendInitialGreeting();
        }
      } else {
        const localMessages = chatStorage.getMessages();
        if (localMessages.length > 0) {
          setMessages(localMessages);
        } else {
          await sendInitialGreeting();
        }
      }
    } catch (err) {
      console.error('Error loading messages:', err);
      const localMessages = chatStorage.getMessages();
      if (localMessages.length > 0) setMessages(localMessages);
      else await sendInitialGreeting();
    } finally {
      setIsFetching(false);
    }
  };

  const sendInitialGreeting = async () => {
    const hasGreeted = chatStorage.getHasGreeted();
    if (!hasGreeted) {
      const userName = user?.firstName || 'friend';
      const greetingMessage = {
        content: `Hi ${userName}! 👋 I'm really glad you're here.\n\nI'm your mental health companion - think of me as a supportive friend who's always here to listen. This is a completely safe and confidential space.\n\n**Why talk to me?**\n• I'm here 24/7, judgment-free\n• Everything stays private - never shared anywhere\n• Sometimes it's easier to open up to someone neutral\n• You can be completely honest without worry\n\nHow are you feeling today? 💙`,
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      setMessages([greetingMessage]);
      await saveMessage(greetingMessage);
      chatStorage.setHasGreeted(true);
    }
  };

  const saveMessage = async (message) => {
    try {
      if (isSignedIn && user?.id) {
        await axios.post(
          `${API_URL}/api/chat/messages`,
          {
            userId: user.id,
            content: message.content,
            role: message.role,
            conversationId,
          },
          { timeout: 10000 }
        );
      } else {
        chatStorage.saveMessage(message);
      }
    } catch (err) {
      console.error('Error saving message (server), falling back to local:', err);
      chatStorage.saveMessage(message);
    }
  };

  const getGeminiResponse = async (userMessage, conversationHistory = []) => {
    if (!GEMINI_API_KEY) {
      console.warn('⚠️ No Gemini API key');
      throw new Error('API key missing');
    }

    // Indicate AI activity
    setGeminiWorking(true);

    // Build conversation context (safe length)
    const recentMessages = Array.isArray(conversationHistory) ? conversationHistory.slice(-6) : [];
    let conversationContext = '';
    if (recentMessages.length > 0) {
      conversationContext = '\n\nRecent conversation:\n' + recentMessages
        .map(msg => `${msg.role === 'user' ? 'User' : 'You (AI)'}: ${msg.content}`)
        .join('\n');
    }

    const systemPrompt = `You are a wise, deeply empathetic mental health counselor and life coach. You have the warmth of a best friend, the wisdom of a therapist, and the insight of someone who truly understands human struggles.

YOUR PERSONALITY & APPROACH:
- Warm, genuine, and deeply understanding
- Share relevant stories, research, or wisdom when appropriate
- Offer hope and perspective without toxic positivity
- Be motivational but realistic and grounded
- Listen deeply and respond thoughtfully
- Use natural, conversational language with warmth
- Show that you truly "get" what they're going through

RESPONSE STYLE:
1. First, acknowledge and validate their feelings deeply
2. Share relevant insight, perspective, or a brief story if helpful
3. Offer practical wisdom or gentle guidance
4. End with hope, encouragement, or a thoughtful question
5. Keep responses concise, typically 2-6 sentences (occasionally longer if needed)
6. Use emojis sparingly but meaningfully

KEY RULES:
- Always read and respond to what they ACTUALLY said
- Never give generic "I'm here to help" responses unless truly appropriate
- Offer practical coping strategies when suitable
- Create a sense of hope without dismissing their pain
- If they ask specific questions, answer them first
- Use metaphors or analogies when helpful`;

    const fullPrompt = `${systemPrompt}${conversationContext}

User's NEW message: "${userMessage}"

Respond with deep empathy, wisdom, and support:`;

    try {
      console.log('🚀 Calling Gemini API with enhanced prompt...');
      const resp = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            { parts: [{ text: fullPrompt }] }
          ],
          generationConfig: {
            temperature: 0.9,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 1500,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
          ]
        },
        { headers: { 'Content-Type': 'application/json' }, timeout: 30000 }
      );

      // Safe parsing of response text
      const candidates = resp?.data?.candidates;
      let aiText = null;
      if (Array.isArray(candidates) && candidates.length > 0) {
        // Try multiple possible shapes
        const first = candidates[0];
        aiText = first?.content?.parts?.[0]?.text ?? first?.content?.parts?.text ?? null;
      } else if (candidates && candidates.content) {
        aiText = candidates.content?.parts?.[0]?.text ?? candidates.content?.parts?.text ?? null;
      }

      if (!aiText) {
        console.error('❌ Invalid Gemini response format:', resp?.data);
        throw new Error('Invalid response format from Gemini');
      }

      aiText = String(aiText).trim();
      console.log('✅ Gemini replied (snippet):', aiText.substring(0, 120));
      return aiText;
    } finally {
      // Always clear geminiWorking flag after attempt (success or fail)
      setGeminiWorking(false);
    }
  };

  const getIntelligentFallback = (userMessage = '') => {
    const msg = userMessage.toLowerCase().trim();

    if (msg.includes('trust') || msg.includes('why share') || msg.includes('why tell')) {
      return `That's a really valid question, and I appreciate you asking! 🤔

You're right - you don't know me like a friend or family member. But sometimes that's actually helpful. I'm a neutral space where you can be completely honest without fear of judgment or consequences. Everything here stays private — it's never shared with anyone.

I'm not trying to replace your real relationships. Think of me as a supportive listener who's always available when you need someone to talk to. Does that make sense?`;
    }

    if (msg.includes('not my friend') || msg.includes('not family') || msg.includes('why not')) {
      return `You're absolutely right - I'm not your friend or family member. 💙

But sometimes it's easier to open up to someone who's not in your personal circle. There's freedom in anonymity and neutrality — no gossip, no changing how people see you.

Your real relationships matter. This is simply an extra space to process your thoughts without consequence.`;
    }

    if (msg.includes('school') || msg.includes('daily life') || msg.includes('college')) {
      return `School can be really overwhelming — between workload, expectations, and social pressure, it's a lot. 📚

What's been hardest for you lately? Is it the workload, social stuff, or pressure from others? Let's break it down together.`;
    }

    if (msg.includes('not good') || msg.includes('bad day') || msg.includes('terrible')) {
      return `I'm really sorry you're having a rough time. Thank you for being honest about it — that takes real courage. 💙

If you want, tell me one thing that made today hard. Sometimes naming it helps us find a small next step.`;
    }

    if (msg.includes('anxious') || msg.includes('anxiety') || msg.includes('worried') || msg.includes('panic')) {
      return `I hear you — anxiety can feel overwhelming, like your mind won't stop racing. 💙

One simple technique: name the thought when it shows up — "I notice I'm having the thought that..." — which creates a bit of distance and reduces its power. What tends to trigger your anxiety most?`;
    }

    if (msg.includes('sad') || msg.includes('depressed') || msg.includes('depression') || msg.includes('empty')) {
      return `I'm so sorry you're carrying that heaviness. Depression can feel like an invisible weight. 💙

You don't have to explain everything right now, but if you can, tell me how long you've been feeling this way or one small example — that helps me give more useful support.`;
    }

    if (msg === 'hi' || msg === 'hello' || msg === 'hey') {
      return `Hello! 😊 I'm really glad you reached out.

This is a safe space — tell me how you're doing, or share whatever's on your mind.`;
    }

    return `Thank you for sharing that with me. 💙

Could you tell me a bit more about what you're feeling or thinking right now? There's no rush — share what you feel comfortable sharing.`;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      content: input.trim(),
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    const currentInput = input.trim();
    setInput('');
    setIsLoading(true);
    setError(null);

    // Save user message (local or server)
    await saveMessage(userMessage);

    // keep input focused
    setTimeout(() => inputRef.current?.focus(), 50);

    try {
      let aiResponseText = null;
      try {
        console.log('💬 User:', currentInput);
        aiResponseText = await getGeminiResponse(currentInput, currentMessages);
        console.log('✅ Received Gemini response');
      } catch (gemErr) {
        console.warn('⚠️ Gemini failed, using fallback:', gemErr?.message || gemErr);
        aiResponseText = getIntelligentFallback(currentInput);
      }

      const aiResponse = {
        content: aiResponseText,
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiResponse]);
      await saveMessage(aiResponse);
    } catch (err) {
      console.error('❌ Error in handleSubmit:', err);
      setError('I had trouble responding. Please try again.');
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleClearChat = async () => {
    if (!window.confirm('🗑️ Clear all messages and start fresh?\n\nThis cannot be undone.')) return;

    try {
      if (isSignedIn && user?.id) {
        await axios.delete(`${API_URL}/api/chat/messages/${user.id}`, {
          params: { conversationId },
          timeout: 10000,
        });
      }
    } catch (err) {
      console.warn('Server delete failed (continuing to clear local):', err);
    } finally {
      chatStorage.clearMessages();
      chatStorage.setHasGreeted(false);
      const newConvId = `conv_${Date.now()}`;
      chatStorage.setConversationId(newConvId);
      setConversationId(newConvId);
      setMessages([]);
      setShowMenu(false);
      setGeminiWorking(false);
      setError(null);
      // show greeting for fresh start
      await sendInitialGreeting();
    }
  };

  const handleBack = () => navigate('/');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading your safe space...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Top Bar */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={handleBack} className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center space-x-2">
            <Heart className="text-pink-600" size={24} />
            <h1 className="text-lg font-bold text-gray-800">Your Safe Space</h1>
          </div>

          <div className="relative">
            <button onClick={() => setShowMenu(s => !s)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Menu size={24} className="text-gray-700" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {isSignedIn && user ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        {user.imageUrl ? (
                          <img src={user.imageUrl} alt={user.firstName || 'User'} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {(user.firstName?.charAt(0) || 'U').toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{user.fullName || user.firstName || 'User'}</p>
                          <p className="text-xs text-gray-600 truncate">{user.primaryEmailAddress?.emailAddress}</p>
                        </div>
                      </div>
                    </div>
                    <button onClick={handleClearChat} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                      <Trash2 size={16} />
                      <span>Start New Conversation</span>
                    </button>
                  </>
                ) : (
                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-600 mb-3">Sign in to save conversations</p>
                    <SignInButton mode="modal">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">Sign In</button>
                    </SignInButton>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 pb-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              100% Private & Confidential
            </span>

            {geminiWorking && (
              <span className="text-blue-600 flex items-center text-xs">
                <CheckCircle size={14} className="mr-1" />
                AI Active
              </span>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="container mx-auto px-4 pt-3">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 px-4 py-3 rounded-r-lg flex items-center justify-between shadow-sm">
            <div className="flex items-center">
              <AlertCircle className="mr-3" size={20} />
              <span className="text-sm">{error}</span>
            </div>
            <button onClick={() => setError(null)} className="text-yellow-700 hover:text-yellow-900 font-bold">✕</button>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 h-full flex flex-col max-w-4xl">
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {isFetching ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 className="animate-spin text-blue-600 mx-auto mb-3" size={40} />
                  <p className="text-gray-600">Loading...</p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={message.id ?? index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                  <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-md ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                  }`}>
                    <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {new Date(message.timestamp || message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-md border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="animate-spin text-blue-600" size={18} />
                    <span className="text-sm text-gray-600">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <form onSubmit={handleSubmit} className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share what's on your mind..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                disabled={isLoading}
                rows={2}
                style={{ minHeight: '60px', maxHeight: '150px' }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg disabled:shadow-none"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            💡 <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> to send • <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Shift + Enter</kbd> for new line
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}

export default ChatPage;
