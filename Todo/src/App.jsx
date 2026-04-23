import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import StickyWall from './components/StickyWall/StickyWall.jsx'

const App = () => {
  // State to track if sidebar is visible
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-[#f0f2f5] overflow-hidden">
      {/* Pass state and toggle function to Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* If sidebar is closed, show a floating button to open it */}
        {!isSidebarOpen && (
          <button 
            onClick={toggleSidebar}
            className="mb-6 p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl">☰</span>
          </button>
        )}
        
       < StickyWall/>
        
        
      </main>
    </div>
  )
}

export default App