import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';

const AdminChatPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const response = await axios.get(`/api/messages/${userId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    fetchMessages(user._id);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      try {
        await axios.post('/api/messages', {
          sender: 'admin',
          recipient: selectedUser._id,
          content: newMessage
        });
        setNewMessage('');
        fetchMessages(selectedUser._id);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* User list */}
      <div className="w-1/4 bg-white border-r">
        <h2 className="text-2xl font-bold p-4">Chats</h2>
        <ul>
          {users.map(user => (
            <li
              key={user._id}
              className={`p-4 hover:bg-gray-100 cursor-pointer ${selectedUser && selectedUser._id === user._id ? 'bg-blue-100' : ''}`}
              onClick={() => handleUserSelect(user)}
            >
              <div className="flex items-center">
                <FaUser className="mr-2" />
                <span>{user.firstName}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedUser && (
          <>
            <div className="bg-white p-4 border-b">
              <h3 className="text-xl font-bold">{selectedUser.firstName} {selectedUser.lastName}</h3>
              <p>{selectedUser.email}</p>
              <p>{selectedUser.phoneNumber}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map(message => (
                <div
                  key={message._id}
                  className={`mb-4 ${message.sender === 'admin' ? 'text-right' : 'text-left'}`}
                >
                  <div className={`inline-block p-2 rounded-lg ${message.sender === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
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
          </>
        )}
      </div>
    </div>
  );
};

export default AdminChatPage;