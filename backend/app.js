const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const colors = require('colors');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

const { summary } = require('./api/controllers/orders');
const { adminAuth } = require('./api/middleware/check-auth');

// Load ENV variable
dotenv.config({ path: './config/config.env' });

// Connect to DB
const mongoDB = require('./config/db');
mongoDB();

const app = express();

// Setup CORS
app.use(cors());

// Use  incoming requests
app.use(express.json());

// Dev Logging Middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Setup static files path
app.use('/uploads', express.static('uploads'));
app.use('/', express.static('public'));

// Mount Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Upload
app.use('/api/uploads*', (req, res, next) => {
  try {
    res.sendFile(__dirname + '/uploads' + req.params[0]);
    

  } catch (error) {
    next();
  }
});

app.use('/*', (req, res, next) => {
  try {
      res.sendFile(__dirname + '/public/index.html')
  } catch (error) {
      next();
  }
})
// Handle Error Requests
app.use((req, res, next) => {
  const error = new Error();
  error.message = 'Not Found';
  error.status = 404;

  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).json({
    error,
  });
});

module.exports = app;
