const express = require('express');
const Note    = require('../models/Note');

const router = express.Router();

// GET /notes (todas las notas)
router.get('/notes', (req, res, next) => {
  Note.find()                  // todos los docs de notes
    .select('_id title text')  // como SELECT en SQL
    .sort('-updatedAt')        // ordena por modificacion descendente
    .exec((err, notes) => {
      if (err) return next(err);
      // modifico un poco el resultado antes de mandarlo
      notes = notes.map(note => ({
        _id: note._id,
        title: note.title,
        text: note.text,
        details: {
          method: 'GET',
          url: `${req.protocol}://${req.hostname}:3000/api/notes/${note._id}`
        }
      }));
      res.status(200).json({
        count: notes.length,
        notes: notes,
        create: {
          method: 'POST',
          url: `${req.protocol}://${req.hostname}:3000/api/notes`
        }
      });
    });
});

// GET /notes/id
router.get('/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .select('_id title text createdAt updatedAt')  // todo menos __v
    .exec((err, note) => {
      if (err) return next(err);
      if (!note) return res.status(404).json({ msg: 'Not found' });
      res.status(200).json({
        note: note,
        links: {
          update: {
            method: 'PUT',
            url: `${req.protocol}://${req.hostname}:3000/api/notes/${note._id}`
          },
          delete: {
            method: 'DELETE',
            url: `${req.protocol}://${req.hostname}:3000/api/notes/${note._id}`
          }
        }
      });
    });
});

// POST /notes
router.post('/notes', (req, res, next) => {
  const note = new Note({
    title: req.body.title,
    text: req.body.text
  });
  note.save((err, note) => {
    if (err) return next(err);
    res.status(201).json(note);
  });
});

// PUT /notes/id
router.put('/notes/:id', (req, res, next) => {
  const note = {
    title: req.body.title,
    text: req.body.text,
    updatedAt: Date.now()
  };
  const options = {
    new: true,
    omitUndefined: true
  };
  Note.findByIdAndUpdate(req.params.id, note, options).exec((err, note) => {
    if (err) return next(err);
    if (!note) return res.status(404).json({ msg: 'Not found' });
    res.status(200).json(note);
  });
});

// DELETE /notes/id
router.delete('/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id).exec((err, note) => {
    if (err) return next(err);
    if (!note) return res.status(404).json({ msg: 'Not found' });
    res.status(200).json({ msg: 'Delete OK' });
  });
});

module.exports = router;