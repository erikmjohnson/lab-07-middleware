'use strict';

const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

const randomNumber = (req, res, next) => {
  let num = Math.round(Math.random() * 100);
  console.log(`${num}`);
  next();
};

const numSq = ( num, req, res, next) => {
  let number = Math.sqrt(num);
  return number;
  next();
};

app.use((req, res, next) => {
  req.requestTime = Date();
  console.log(`${req.requestTime}`);
  next();
});

app.get('/a', (req,res) => {
  res.status(200).send(`Route A`);
});

app.get('/b', (req,res) => {
  res.status(200).send(`Route B`);
});

app.get('/c', randomNumber, (req,res) => {
  res.status(200).send(`Route C`);
});

app.get('/d', numSq, (req,res) => {
  res.status(200).send(`${numSq(4)}`);
});

app.get('/*', (req, res) => {
  res.status(404).send('Route Not Found');

});

app.get('/', function(req, res) {
  throw new Error('You broke me!');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
