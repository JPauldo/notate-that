const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json')

const PORT = 3001;
const app = express();
const file = './db/db.json';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  
  const noteObj = {
    id: Math.floor((Math.random() + 1) * 0x10000).toString(16).substring(1),
    title,
    text
  };
  notes.push(noteObj);
  
  const notesStr = JSON.stringify(notes, null, '\t');

  fs.writeFile(file, notesStr, (err) => {
    err ? console.error(err) : res.json(`Note ${noteObj.id} was added to the database`);
  });
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  const noOfNotes = notes.length;
  
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    
    if (note.id === noteId) {
      notes.splice(i, 1);
      break;
    }
  }

  if (noOfNotes === notes.length) {
    res.json(`There is no note with an id of ${ noteId }`)
  }
  
  const notesStr = JSON.stringify(notes, null, '\t');

  fs.writeFile(file, notesStr, (err) => {
    err ? console.error(err) : res.json(`${noteId} was removed from the database`);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
