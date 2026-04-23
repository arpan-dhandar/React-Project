import React from 'react'
import { Menu, ChevronsRight, ListChecks, CalendarDays, ScrollText, Settings, LogOut, Search } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`
      bg-gray-50 h-screen p-6 flex flex-col border-r border-gray-200
      transition-all duration-300 ease-in-out
      ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full p-0 border-none'}
    `}>
      
      {/* Wrapping content in a div with opacity ensures text doesn't 
         get squished during the width animation 
      */}
      <div className={`${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200 h-full flex flex-col`}>
        
        {/* Header Part */}
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <Menu 
              className="cursor-pointer text-gray-500 hover:text-black" 
              onClick={toggleSidebar} 
            />
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-gray-300"
            />
        </div>

        {/* Task List */}
        <div className="flex-1">
            <h4 className="text-xs font-bold text-gray-400 mb-4 tracking-widest">TASKS</h4>
            <ul className="space-y-2">
                <li className="flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                    <ChevronsRight size={20} /> Upcoming
                </li>
                <li className="flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                    <ListChecks size={20} /> Today
                </li>
                <li className="flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                    <CalendarDays size={20} /> Calendar
                </li>
                {/* Active state for Sticky Wall */}
                <li className="flex items-center gap-3 p-2 bg-gray-200 text-black font-semibold rounded-lg cursor-pointer">
                    <ScrollText size={20} /> Sticky Wall
                </li>
            </ul>
        </div>

        {/* Footer Part */}
        <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-600 cursor-pointer hover:text-black transition-colors">
                <Settings size={20} /> <span>Settings</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 cursor-pointer hover:text-black transition-colors">
                <LogOut size={20} /> <span>Sign out</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar