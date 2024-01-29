const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const routes = require('./routes');
app.use('/api', routes);

app.get("/", (req, res) => {
    res.json({ message: "Hello" });
  });