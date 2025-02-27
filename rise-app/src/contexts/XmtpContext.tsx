import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Client } from '@xmtp/xmtp-js';
import { ethers } from 'ethers';

interface XmtpContextType {
  client: Client | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
  isConnecting: boolean;
}

const XmtpContext = createContext<XmtpContextType | undefined>(undefined);

export const XmtpProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = async () => {
    if (client) return;
    
    setIsConnecting(true);
    try {
      // Create a random wallet for demo purposes
      // In a real app, you would use a wallet provider like MetaMask
      const wallet = ethers.Wallet.createRandom();
      
      // Create the XMTP client
      const xmtp = await Client.create(wallet, { env: 'dev' });
      setClient(xmtp);
    } catch (error) {
      console.error('Error connecting to XMTP:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setClient(null);
  };

  return (
    <XmtpContext.Provider
      value={{
        client,
        connect,
        disconnect,
        isConnected: !!client,
        isConnecting,
      }}
    >
      {children}
    </XmtpContext.Provider>
  );
};

export const useXmtp = () => {
  const context = useContext(XmtpContext);
  if (context === undefined) {
    throw new Error('useXmtp must be used within an XmtpProvider');
  }
  return context;
};
