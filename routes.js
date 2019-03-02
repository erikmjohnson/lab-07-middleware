
const express = require('express');
const router = express.Router();

const randomNumber = (req, res, next) => {
  let num = Math.round(Math.random() * 100);
  console.log(`${num}`);
  next();
};

router.get('/c', randomNumber, (req,res) => {
  res.status(200).send(`Route C`);
});

router.get('/d', (req,res) => {
  next();
  res.status(200).send(`Route D`);
});

module.exports = router;