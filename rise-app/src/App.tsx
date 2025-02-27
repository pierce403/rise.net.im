import { useState, useEffect } from 'react'
import './App.css'
import { XmtpProvider } from './contexts/XmtpContext'
import { OnlineProvider } from './contexts/OnlineContext'
import { InvitationProvider } from './contexts/InvitationContext'
import Chat from './components/Chat'
import OnlineUsers from './components/OnlineUsers'
import Invitation from './components/Invitation'

function App() {
  const [username, setUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  // Check if the app can be installed
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Show the install button
      setShowInstallPrompt(true)
    })
  }, [])

  const handleInstallClick = () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()
    
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
      // Clear the deferredPrompt variable
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    })
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return
    
    // In a real app, you would authenticate the user
    setIsLoggedIn(true)
  }

  return (
    <XmtpProvider>
      <OnlineProvider>
        <InvitationProvider>
          <div className="min-h-screen bg-gray-100">
            <header className="bg-rise-green text-white p-4 shadow-md">
              <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Rise.net.im</h1>
                {showInstallPrompt && (
                  <button 
                    onClick={handleInstallClick}
                    className="bg-white text-rise-green px-4 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    Add to Home Screen
                  </button>
                )}
              </div>
            </header>

            <main className="container mx-auto p-4">
              {!isLoggedIn ? (
                <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 mt-10">
                  <h2 className="text-2xl font-bold mb-6 text-center">Join Your Local Community</h2>
                  <p className="mb-6 text-gray-600 text-center">
                    Rise.net.im helps you connect with your neighbors, share resources, and build a stronger community.
                  </p>
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rise-green"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-rise-green text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-rise-green"
                    >
                      Get Started
                    </button>
                  </form>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <div className="bg-white rounded-lg shadow h-[600px] flex flex-col">
                      <div className="p-4 border-b">
                        <h2 className="text-lg font-bold">Community Chat</h2>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <Chat />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <OnlineUsers />
                    <Invitation />
                  </div>
                </div>
              )}
            </main>

            <footer className="bg-gray-200 p-4 mt-8">
              <div className="container mx-auto text-center text-gray-600">
                <p>&copy; {new Date().getFullYear()} Rise.net.im - Building Unstoppable Communities</p>
              </div>
            </footer>
          </div>
        </InvitationProvider>
      </OnlineProvider>
    </XmtpProvider>
  )
}

export default App
