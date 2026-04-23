import React from 'react';

const NoteCard = ({ note, updateNote }) => {
  // Logic: When user clicks the card, turn on Edit mode
  const handleEdit = () => updateNote(note.id, 'isEditing', true);
  
  // Logic: When user clicks away, turn off Edit mode
  const handleBlur = () => updateNote(note.id, 'isEditing', false);

  return (
    <div 
      onClick={handleEdit}
      className={`${note.color} p-8 rounded-3xl h-72 shadow-sm hover:shadow-md transition-all flex flex-col`}
    >
      {note.isEditing ? (
        <>
          <input
            autoFocus
            className="bg-transparent text-2xl font-bold text-gray-800 outline-none border-none placeholder-gray-400 mb-4"
            placeholder="Title"
            value={note.title}
            onChange={(e) => updateNote(note.id, 'title', e.target.value)}
            onBlur={handleBlur}
          />
          <textarea
            className="bg-transparent text-gray-700 leading-relaxed outline-none border-none resize-none flex-1 placeholder-gray-400"
            placeholder="Type your note here..."
            value={note.content}
            onChange={(e) => updateNote(note.id, 'content', e.target.value)}
            onBlur={handleBlur}
          />
        </>
      ) : (
        <>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 truncate">
            {note.title || "Untitled Note"}
          </h3>
          <p className="text-gray-700 leading-relaxed overflow-hidden line-clamp-5">
            {note.content || "Click to add content..."}
          </p>
          <div className="mt-auto text-xs text-gray-400 font-medium">
            CLICK TO EDIT
          </div>
        </>
      )}
    </div>
  );
};

export default NoteCard;