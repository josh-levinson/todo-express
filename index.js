const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

require('dotenv').config();

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
});

database.once('connected', () => {
  console.log('Database Connected');
});

const app = express ();
app.use(express.json());
app.use(cors());
app.use('/api', routes)

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

