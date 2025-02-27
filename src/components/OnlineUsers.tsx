import React from 'react';
import { useOnline } from '../contexts/OnlineContext';

const OnlineUsers: React.FC = () => {
  const { onlineUsers } = useOnline();
  
  // Calculate how long ago a user was last seen
  const getLastSeenText = (lastSeen: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - lastSeen.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    
    if (diffSec < 60) {
      return 'Just now';
    } else if (diffMin < 60) {
      return `${diffMin} min ago`;
    } else {
      return lastSeen.toLocaleTimeString();
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-bold mb-4">Online Users</h2>
      <div className="space-y-2">
        {onlineUsers.map(user => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span>{user.name}</span>
            </div>
            <span className="text-xs text-gray-500">{getLastSeenText(user.lastSeen)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;
