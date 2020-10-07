const config = require('./utils/config');
const middleware = require('./utils/middleware');
const express = require('express');
const app = express();
const cors = require('cors');
require('express-async-errors');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('error connecting to MongoDB', error.message);
  });

  app.use(cors());
  app.use(express.json());
  // app.use(middleware.tokenExtractor);
  
  app.use('/api/login', loginRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/blogs', blogsRouter);


  module.exports = app;