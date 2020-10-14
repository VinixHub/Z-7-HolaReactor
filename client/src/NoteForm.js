import React, { useState } from 'react';

const NoteForm = ({ addNote }) => {

  // state hooks para el form
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  // handler para el submit
  const handleSubmit = e => {
    e.preventDefault();
    addNote({
      title: title,
      text: text
    });
    // blanquear formulario
    setTitle('');
    setText('');
  };

  // render JSX
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Título</label>
        <input
          id="title"
          className="form-control"
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="text">Texto</label>
        <textarea
          id="text"
          className="form-control"
          value={text}
          rows="4"
          onChange={e => setText(e.target.value)}
        >
        </textarea>
      </div>
      <input
        className="btn btn-primary"
        type="submit"
        value="Guardar"
      />
    </form>
  );
};

export default NoteForm;