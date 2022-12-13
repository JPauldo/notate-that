const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

// Routes the user to the notes file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './../../public/notes.html'));
});

// Routes all dead endpoints to the homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../../public/index.html'));
});

module.exports = app;
