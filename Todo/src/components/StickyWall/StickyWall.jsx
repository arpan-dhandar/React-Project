import React from 'react';
import NoteCard from './NoteCard';
import AddNote from './AddNote';

const StickyWall = ({ notes, addNote, updateNote }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard 
          key={note.id} 
          note={note} 
          updateNote={updateNote} 
        />
      ))}
      <AddNote onAdd={addNote} />
    </div>
  );
};

export default StickyWall;