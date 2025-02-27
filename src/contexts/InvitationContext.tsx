import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Invitation {
  id: string;
  code: string;
  createdBy: string;
  createdAt: Date;
  usedBy?: string;
  usedAt?: Date;
}

interface InvitationContextType {
  invitations: Invitation[];
  createInvitation: () => Invitation;
  useInvitation: (code: string) => boolean;
}

const InvitationContext = createContext<InvitationContextType | undefined>(undefined);

export const InvitationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const createInvitation = () => {
    // Generate a random invitation code
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    const newInvitation: Invitation = {
      id: Date.now().toString(),
      code,
      createdBy: 'currentUser', // In a real app, this would be the current user's ID
      createdAt: new Date(),
    };
    
    setInvitations(prev => [...prev, newInvitation]);
    return newInvitation;
  };

  const useInvitation = (code: string) => {
    const invitation = invitations.find(inv => inv.code === code && !inv.usedBy);
    
    if (!invitation) return false;
    
    setInvitations(prev => 
      prev.map(inv => 
        inv.id === invitation.id 
          ? { ...inv, usedBy: 'newUser', usedAt: new Date() } 
          : inv
      )
    );
    
    return true;
  };

  return (
    <InvitationContext.Provider
      value={{
        invitations,
        createInvitation,
        useInvitation,
      }}
    >
      {children}
    </InvitationContext.Provider>
  );
};

export const useInvitation = () => {
  const context = useContext(InvitationContext);
  if (context === undefined) {
    throw new Error('useInvitation must be used within an InvitationProvider');
  }
  return context;
};
