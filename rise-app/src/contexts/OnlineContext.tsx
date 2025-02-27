import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OnlineUser {
  id: string;
  name: string;
  lastSeen: Date;
}

interface OnlineContextType {
  onlineUsers: OnlineUser[];
  currentUser: OnlineUser | null;
  setCurrentUser: (user: OnlineUser) => void;
}

const OnlineContext = createContext<OnlineContextType | undefined>(undefined);

export const OnlineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [currentUser, setCurrentUser] = useState<OnlineUser | null>(null);

  // Simulate online users for demo purposes
  useEffect(() => {
    if (!currentUser) return;
    
    // Add current user to online users
    setOnlineUsers(prev => {
      const filtered = prev.filter(user => user.id !== currentUser.id);
      return [...filtered, { ...currentUser, lastSeen: new Date() }];
    });

    // Simulate other online users
    const demoUsers = [
      { id: '1', name: 'Alice', lastSeen: new Date() },
      { id: '2', name: 'Bob', lastSeen: new Date() },
      { id: '3', name: 'Charlie', lastSeen: new Date() },
    ];
    
    setOnlineUsers(prev => {
      const filtered = prev.filter(user => user.id !== currentUser.id);
      return [...filtered, ...demoUsers, { ...currentUser, lastSeen: new Date() }];
    });

    // Update online status periodically
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        return prev.map(user => ({
          ...user,
          lastSeen: user.id === currentUser.id ? new Date() : user.lastSeen,
        }));
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [currentUser]);

  return (
    <OnlineContext.Provider
      value={{
        onlineUsers,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </OnlineContext.Provider>
  );
};

export const useOnline = () => {
  const context = useContext(OnlineContext);
  if (context === undefined) {
    throw new Error('useOnline must be used within an OnlineProvider');
  }
  return context;
};
