import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from './utils/logger.js';
import cors from 'cors'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import productRoutes from './routes/productRoutes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors())

app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', productRoutes)

app.get('/', (req, res) => res.send('Ecommerce API is running'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  if (logger && typeof logger.error === 'function') {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl}`);
  } else {
    console.error('Winston logger missing:', err);
  }

  res.status(err.status || 500).json({
    status: "error",
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

export default app
