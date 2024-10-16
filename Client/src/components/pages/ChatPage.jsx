import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';  // Adjust path as needed
import Footer from '../Footer';  // Adjust path as needed

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/messages');
      if (Array.isArray(response.data)) {
        setMessages(response.data);
      } else {
        setError('Received invalid data from server');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to fetch messages');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        const response = await axios.post('/api/messages', { content: newMessage });
        setMessages(prevMessages => [...prevMessages, response.data]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
        setError('Failed to send message');
      }
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Chat</h1>
            <div className="bg-white shadow sm:rounded-lg overflow-hidden">
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${
                      msg.sender === 'You' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-xs ${
                        msg.sender === 'You'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="font-semibold">{msg.sender}</p>
                      <p>{msg.content}</p>
                      <p className="text-xs mt-1 opacity-75">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ChatPage;
