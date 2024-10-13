import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

// This is a mock function. In a real application, you would use a real-time solution like Socket.io
const mockFetchMessages = () => {
  return Promise.resolve([
    { id: 1, sender: 'John', message: 'Hey, how are you?', timestamp: new Date().toISOString() },
    { id: 2, sender: 'You', message: 'I&apos;m doing great, thanks! How about you?', timestamp: new Date().toISOString() },
    { id: 3, sender: 'John', message: 'I&apos;m good too. Want to catch up later?', timestamp: new Date().toISOString() },
  ]);
};

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    mockFetchMessages().then(setMessages);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'You',
        message: newMessage,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Chat</h1>
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
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
                  <p>{msg.message}</p>
                  <p className="text-xs mt-1 opacity-75">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex">
              <Input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow mr-2"
              />
              <Button type="submit">
                <Send className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}