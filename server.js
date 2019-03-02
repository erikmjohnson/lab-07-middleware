'use strict';

//SETUP, NPM PACKAGES, & MODULES

const express = require('express');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 8080;

//GLOBAL MIDDLEWARE FUNCTIONS

const numSq = (number) => {
  return function (req, res, next) {
    req.number = Math.sqrt(number);
    next();
  };
};

//APPS

app.use((req, res, next) => {
  req.requestTime = Date();
  console.log(`${req.requestTime}`);
  next();
});

app.get('/a', (req,res) => {
  res.status(200).send(`Route A`);
});

app.get('/b', numSq(4), (req,res) => {
  res.status(200).send(`Route B , ${req.number}`);
});

app.use('/', routes);

app.get('/*', (req, res) => {
  res.status(404).send('Route Not Found');

});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('oh god, what have you done!');
  next();
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
