// Local storage utility for chat messages
const STORAGE_KEY = 'digi_friend_chat_messages';
const CONVERSATION_KEY = 'digi_friend_current_conversation';

export const chatStorage = {
  // Get all messages from local storage
  getMessages: () => {
    try {
      const messages = localStorage.getItem(STORAGE_KEY);
      return messages ? JSON.parse(messages) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  // Save message to local storage
  saveMessage: (message) => {
    try {
      const messages = chatStorage.getMessages();
      const newMessage = {
        ...message,
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
      };
      messages.push(newMessage);
      
      // Keep only last 100 messages
      const recentMessages = messages.slice(-100);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentMessages));
      return newMessage;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return null;
    }
  },

  // Clear all messages
  clearMessages: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // Get current conversation ID
  getConversationId: () => {
    try {
      return localStorage.getItem(CONVERSATION_KEY) || `conv_${Date.now()}`;
    } catch (error) {
      console.error('Error reading conversation ID:', error);
      return `conv_${Date.now()}`;
    }
  },

  // Set conversation ID
  setConversationId: (conversationId) => {
    try {
      localStorage.setItem(CONVERSATION_KEY, conversationId);
      return true;
    } catch (error) {
      console.error('Error saving conversation ID:', error);
      return false;
    }
  },

  // Start new conversation
  startNewConversation: () => {
    const newConversationId = `conv_${Date.now()}`;
    chatStorage.setConversationId(newConversationId);
    return newConversationId;
  },
};
