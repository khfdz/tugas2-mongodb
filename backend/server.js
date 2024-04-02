require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bukuRoutes = require('./routes/bukuRoutes');
const cors = require('cors');


// express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Middleware Logging
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/buku', bukuRoutes);


// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to MongoDB and listening for requests on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
