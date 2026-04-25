import { useState } from "react";

const COLORS = [
  { bg: 'bg-amber-400',   text: 'text-amber-950',   badge: 'bg-amber-950 text-amber-300' },
  { bg: 'bg-emerald-400', text: 'text-emerald-950', badge: 'bg-emerald-950 text-emerald-300' },
  { bg: 'bg-sky-400',     text: 'text-sky-950',     badge: 'bg-sky-950 text-sky-300' },
  { bg: 'bg-rose-400',    text: 'text-rose-950',    badge: 'bg-rose-950 text-rose-300' },
  { bg: 'bg-violet-400',  text: 'text-violet-950',  badge: 'bg-violet-950 text-violet-300' },
];

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tab, setTab] = useState('all');
  const [colorIdx, setColorIdx] = useState(0);

  // ➕ ADD NOTE
  function addNote() {
    if (!title.trim()) return;
    const newNote = {
      id: Date.now(),
      title,
      content,
      isStarred: false,
      isEditing: false,
      editTitle: '',
      editContent: '',
      colorIdx,
    };
    setNotes([...notes, newNote]);
    setTitle('');
    setContent('');
    setColorIdx((colorIdx + 1) % COLORS.length);
  }

  // 🗑️ DELETE NOTE
  function deleteNote(id) {
    setNotes(notes.filter(note => note.id !== id));
  }

  // ⭐ TOGGLE STAR
  function toggleStar(id) {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isStarred: !note.isStarred } : note
    ));
  }

  // ✎ START EDITING
  function startEdit(id) {
    setNotes(notes.map(note =>
      note.id === id
        ? { ...note, isEditing: true, editTitle: note.title, editContent: note.content }
        : { ...note, isEditing: false }
    ));
  }

  // 💾 SAVE EDIT
  function saveEdit(id) {
    setNotes(notes.map(note =>
      note.id === id
        ? { ...note, title: note.editTitle || note.title, content: note.editContent, isEditing: false }
        : note
    ));
  }

  // ✕ CANCEL EDIT
  function cancelEdit(id) {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isEditing: false } : note
    ));
  }

  // UPDATE EDIT FIELDS WHILE TYPING
  function updateField(id, field, value) {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, [field]: value } : note
    ));
  }

  const filtered = tab === 'starred' ? notes.filter(n => n.isStarred) : notes;
  const starredCount = notes.filter(n => n.isStarred).length;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-10 font-sans">
      <div className="max-w-2xl mx-auto">

        {/* ── HEADER ── */}
        <div className="mb-8">
          <h1 className="text-5xl font-black tracking-tight mb-1">
            my notes<span className="text-amber-400">.</span>
          </h1>
          <p className="text-zinc-500 text-sm">
            {notes.length} notes · {starredCount} starred
          </p>
        </div>

        {/* ── ADD NOTE FORM ── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && document.getElementById('content-ta').focus()}
            placeholder="Note title..."
            className="w-full bg-zinc-800 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm mb-3 border border-zinc-700 focus:border-zinc-500 focus:outline-none transition-colors"
          />
          <textarea
            id="content-ta"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="What's on your mind..."
            rows={3}
            className="w-full bg-zinc-800 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm mb-4 border border-zinc-700 focus:border-zinc-500 focus:outline-none transition-colors resize-none"
          />

          {/* Color Picker + Add Button */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {COLORS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setColorIdx(i)}
                  className={`w-6 h-6 rounded-full ${c.bg} transition-transform ${
                    colorIdx === i
                      ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-zinc-900'
                      : 'opacity-50 hover:opacity-80'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={addNote}
              disabled={!title.trim()}
              className="bg-white text-black font-semibold text-sm px-5 py-2 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              + Add note
            </button>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="flex gap-2 mb-6">
          {['all', 'starred'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                tab === t
                  ? 'bg-white text-black'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600'
              }`}
            >
              {t === 'all' ? `All (${notes.length})` : `Starred (${starredCount})`}
            </button>
          ))}
        </div>

        {/* ── EMPTY STATE ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-600">
            <div className="text-5xl mb-3">{tab === 'starred' ? '★' : '+'}</div>
            <p className="text-sm">
              {tab === 'starred' ? 'No starred notes yet' : 'Add your first note!'}
            </p>
          </div>
        ) : (

          /* ── NOTES GRID ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(note => {
              const c = COLORS[note.colorIdx % COLORS.length];
              return (
                <div key={note.id} className={`${c.bg} rounded-2xl p-5 flex flex-col gap-3 relative`}>

                  {/* Starred Badge */}
                  {note.isStarred && (
                    <span className={`absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>
                      ★ starred
                    </span>
                  )}

                  {/* ── EDIT MODE ── */}
                  {note.isEditing ? (
                    <>
                      <input
                        value={note.editTitle}
                        onChange={e => updateField(note.id, 'editTitle', e.target.value)}
                        className={`w-full bg-black/20 ${c.text} rounded-xl px-3 py-2 text-sm font-semibold border border-black/20 focus:outline-none`}
                        placeholder="Title..."
                      />
                      <textarea
                        value={note.editContent}
                        onChange={e => updateField(note.id, 'editContent', e.target.value)}
                        rows={3}
                        className={`w-full bg-black/20 ${c.text} rounded-xl px-3 py-2 text-sm border border-black/20 focus:outline-none resize-none`}
                        placeholder="Content..."
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => cancelEdit(note.id)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-black/20 font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveEdit(note.id)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-black/40 text-white font-semibold"
                        >
                          Save
                        </button>
                      </div>
                    </>
                  ) : (

                  /* ── VIEW MODE ── */
                    <>
                      <div>
                        <h3 className={`font-bold text-base leading-tight ${c.text} pr-12`}>
                          {note.title}
                        </h3>
                        {note.content && (
                          <p className={`text-sm mt-1 ${c.text} opacity-80 leading-relaxed`}>
                            {note.content}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => toggleStar(note.id)}
                          className={`flex-1 py-1.5 rounded-xl text-sm font-medium bg-black/20 hover:bg-black/30 transition-colors ${c.text}`}
                        >
                          {note.isStarred ? '★ Unstar' : '☆ Star'}
                        </button>
                        <button
                          onClick={() => startEdit(note.id)}
                          className={`flex-1 py-1.5 rounded-xl text-sm font-medium bg-black/20 hover:bg-black/30 transition-colors ${c.text}`}
                        >
                          ✎ Edit
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="flex-1 py-1.5 rounded-xl text-sm font-medium bg-black/20 hover:bg-black/40 transition-colors text-red-900 font-bold"
                        >
                          ✕ Del
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;