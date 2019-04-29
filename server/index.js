const express = require('express');
let app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const math = require('mathjs');

//global obects to use to track game
let startingGameState = {
  currentPlayer: null,
  boardState: [[null, null, null], [null, null, null], [null, null, null]],
  turnNumber: 0
};
let gameState = {
  currentPlayer: null,
  boardState: [[null, null, null], [null, null, null], [null, null, null]],
  turnNumber: 0
};

//logging
app.use(morgan('dev'));

//static middleware
app.use(express.static(path.join(__dirname, '../public')));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//my two routes
app.get('/api/', (req, res, next) => {
  res.json(gameState);
});

app.post('/api/', (req, res, next) => {
  let recievedData = req.body;
  console.log(recievedData, 'recievedDatafromFrontEnd');
  updateState(recievedData);
  res.status(200);
  res.json(recievedData);
});

const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function() {
  console.log(`Your server, listening on port ${port}`);
});

function updateState(recievedData) {
  let { centralPointsArr, coinCentersArr } = recievedData;
  console.log(centralPointsArr, 'central Points - inside update state');
  console.log(coinCentersArr, 'coin centers - inside update state');

  //figure out the order of the points
  // sort on x lowest to highest
  centralPointsArr = centralPointsArr.sort(function(a, b) {
    return a.x - b.x;
  });

  console.log(centralPointsArr, 'centralPointsArr SORT');
}
