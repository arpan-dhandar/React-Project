import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import StickyWall from './components/StickyWall/StickyWall.jsx'

const App = () => {
  // State to track if sidebar is visible
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notes, setNotes] = useState([])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to add a new note
  const addNote = ()=>{
    const newNote = {
      id: Date.now(),
      title: "",
      content: "",
      color: "bg-yellow-100",
      isEditing: true
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id, feild, value)=> {
    setNotes(notes.map(note => {
      note.id===id ? { ...note, [feild]: value} : note
    }))
  }

  return (
    <div className="flex h-screen w-full bg-[#f0f2f5] overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Sticky Wall</h1>
        <StickyWall 
          notes={notes} 
          addNote={addNote} 
          updateNote={updateNote} 
        />
      </main>
    </div>
  )
}

export default App