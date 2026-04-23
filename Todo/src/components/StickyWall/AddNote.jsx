import React from 'react';
import { Plus } from 'lucide-react';

const AddNote = ({ onAdd }) => {
  return (
    <div 
      onClick={onAdd}
      className="bg-gray-100 border-2 border-dashed border-gray-200 rounded-3xl h-72 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all group"
    >
      <Plus size={48} className="text-gray-300 group-hover:text-gray-500 transition-colors" strokeWidth={1.5} />
    </div>
  );
};

export default AddNote;