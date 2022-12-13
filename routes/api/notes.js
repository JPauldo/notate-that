const router = require('express').Router();
const fs = require('fs');
const notes = require('./../../db/db.json');

const file = './db/db.json';

// Gets for the notes from the database
router.get('/', (req, res) => {
  console.log(`${ req.method } request received for notes`);

  res.json(notes);
});

// Posts a new note to the database
router.post('/', (req, res) => {
  console.log(`${ req.method } request received for notes`);
  const { title, text } = req.body;
  
  // Adds notes
  const noteObj = {
    id: Math.floor((Math.random() + 1) * 0x10000).toString(16).substring(1),
    title,
    text
  };
  notes.push(noteObj);
  
  const notesStr = JSON.stringify(notes, null, '\t');

  // Adds the updated list back to the database
  fs.writeFile(file, notesStr, (err) => {
    err ? console.error(err) : res.json(`Note ${noteObj.id} was added to the database`);
  });
});

// Deletes a note based on their id from the database
router.delete('/:id', (req, res) => {
  console.log(`${ req.method } request received for notes`);
  const noteId = req.params.id;
  const noOfNotes = notes.length;
  
  // Cycles through the notes to find the note to delete
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    
    if (note.id === noteId) {
      notes.splice(i, 1);
      break;
    }
  }

  // If no ID matches the one provided, it lets the user know 
  if (noOfNotes === notes.length) {
    res.json(`There is no note with an id of ${ noteId }`)
  }
  
  const notesStr = JSON.stringify(notes, null, '\t');

  // Adds the updated list back to the database
  fs.writeFile(file, notesStr, (err) => {
    err ? console.error(err) : res.json(`${noteId} was removed from the database`);
  });
});

module.exports = router;
