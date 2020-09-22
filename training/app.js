import React from 'react'
import Note from './training/Note'

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note, i) => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App