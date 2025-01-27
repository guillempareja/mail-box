const express = require('express');

const { PORT } = require('./config');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// API routes
app.use('/mineco-api', require('./routes/mineco-api.js'));


app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
})