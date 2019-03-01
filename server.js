'use strict';

const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

const requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/a', (req,res) => {
  res.status(200).send('Route A');
  res.send(`${req.requestTime}`);
});

app.get('/b', (req,res) => {
  res.status(200).send('Route B');
  res.send(`${req.requestTime}`);
});

app.get('/c', (req,res) => {
  res.status(200).send('Route C');
  res.send(`${req.requestTime}`);
});

app.get('/d', (req,res) => {
  res.status(200).send('Route D');
  res.send(`${req.requestTime}`);
});

// app.use((req, res, error, next) => {
//   console.log('ERROR!!!');
//   res.status(500);
//   res.send('Error!');
// });

app.get('/*', (req, res) => {
  res.status(404).send('Route Not Found');

});

app.get('/', function(req, res) {
  throw new Error('You broke me!');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
