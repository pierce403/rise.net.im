import React, { useState } from 'react';
import { useInvitation } from '../contexts/InvitationContext';

const Invitation: React.FC = () => {
  const { invitations, createInvitation, useInvitation: useInviteCode } = useInvitation();
  const [inviteCode, setInviteCode] = useState('');
  const [joinError, setJoinError] = useState('');
  
  const handleCreateInvite = () => {
    const invitation = createInvitation();
    // In a real app, you would share this code with others
    console.log('Created invitation with code:', invitation.code);
  };
  
  const handleJoinCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) {
      setJoinError('Please enter an invitation code');
      return;
    }
    
    const success = useInviteCode(inviteCode);
    if (success) {
      setInviteCode('');
      setJoinError('');
      // In a real app, you would redirect to the community page
      console.log('Successfully joined community with code:', inviteCode);
    } else {
      setJoinError('Invalid invitation code');
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-bold mb-4">Community Invitations</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Invite Others</h3>
        <button
          onClick={handleCreateInvite}
          className="bg-rise-green text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-rise-green"
        >
          Generate Invitation Code
        </button>
        
        {invitations.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Your Invitation Codes:</h4>
            <ul className="space-y-2">
              {invitations.map(inv => (
                <li key={inv.id} className="flex justify-between items-center text-sm">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">{inv.code}</span>
                  <span className="text-xs text-gray-500">
                    {inv.usedBy ? 'Used' : 'Available'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Join a Community</h3>
        <form onSubmit={handleJoinCommunity}>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="Enter invitation code"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rise-green"
            />
            {joinError && <p className="text-red-500 text-sm">{joinError}</p>}
            <button
              type="submit"
              className="bg-rise-green text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-rise-green"
            >
              Join Community
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Invitation;
