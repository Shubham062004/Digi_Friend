import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth(); // Get the current user from your auth context

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/messages/${user._id}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        await axios.post('/api/messages', {
          sender: user._id,
          recipient: 'admin',
          content: newMessage
        });
        setNewMessage('');
        fetchMessages();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(message => (
          <div
            key={message._id}
            className={`mb-4 ${message.sender === user._id ? 'text-right' : 'text-left'}`}
          >
            <div className={`inline-block p-2 rounded-lg ${message.sender === user._id ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="bg-white p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border rounded-l-lg p-2"
            placeholder="Type a message..."
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;