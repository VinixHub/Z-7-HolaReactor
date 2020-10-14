// imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import NotesList from './NotesList';
import NoteForm from './NoteForm';
import Footer from './Footer';

const App = () => {

  // useState hook (las notas de la lista)
  const [notes, setNotes] = useState([]);

  // useEffect hook (para fetchear la data al cargar)
  useEffect(() => {
    axios.get('/api/notes')
      .then(res => {
        setNotes(res.data.notes);
      });
  }, []);

  // CRUD functions
  // crear nota
  const addNote = note => {
    axios.post('/api/notes', note)
      .then(res => {
        const newNotes = [res.data, ...notes];
        setNotes(newNotes);
      });
  };

  // actualizar nota
  const updateNote = (id, title, text) => {
    const updatedNote = {
      title: title,
      text: text
    };
    axios.put('/api/notes/' + id, updatedNote)
      .then(res => {
        const newNotes = notes.map(note =>
          note.id === id ? updatedNote : note
        );
        setNotes(newNotes);
      });
  };

  // eliminar nota
  const removeNote = (id) => {
    axios.delete('/api/notes/' + id)
      .then(res => {
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
    });
  };

  // render JSX
  return (
    <div>
      <Header title='Notas'/>
      <div className="container mt-3">
        <NoteForm
          addNote={addNote}
        />
        <hr />
        <NotesList
          notes={notes}
          removeNote={removeNote}
          updateNote={updateNote}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;