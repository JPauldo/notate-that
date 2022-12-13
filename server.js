// Imports
const express = require('express');
const api = require('./routes/api/index');
const html = require('./routes/html/index');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use('/', html);

// Posts a message upon server load
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
