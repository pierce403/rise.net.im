import React, { useState, useEffect } from 'react';
import { useXmtp } from '../contexts/XmtpContext';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const { isConnected, connect } = useXmtp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // For demo purposes, we'll use a simulated chat
  useEffect(() => {
    if (!isConnected) {
      connect();
    }

    // Simulate some initial messages
    const demoMessages = [
      { id: '1', sender: 'Alice', content: 'Hello everyone!', timestamp: new Date(Date.now() - 3600000) },
      { id: '2', sender: 'Bob', content: 'Hi Alice, welcome to the community!', timestamp: new Date(Date.now() - 3000000) },
      { id: '3', sender: 'Charlie', content: 'Hey folks, anyone have a ladder I could borrow this weekend?', timestamp: new Date(Date.now() - 1800000) },
    ];
    
    setMessages(demoMessages);
  }, [isConnected, connect]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex flex-col ${message.sender === 'You' ? 'items-end' : 'items-start'}`}
          >
            <div className={`px-4 py-2 rounded-lg ${message.sender === 'You' ? 'bg-rise-green text-white' : 'bg-gray-200'}`}>
              <div className="font-bold">{message.sender}</div>
              <div>{message.content}</div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rise-green"
          />
          <button
            type="submit"
            className="bg-rise-green text-white px-4 py-2 rounded-r-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-rise-green"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
