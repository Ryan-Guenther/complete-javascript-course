'use strict';

// Players take turns rolling dice
// When a score of 0 is rolled the Current Score is Reset and turn is passed to the next player
// When a player selects Hold their current score is marked as their score
// First player to 100 points wins the game

// Get all the buttons
const newButton = document.querySelector('.btn--new');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

// Get the Die Image
const dice = document.querySelector('.dice');

// Define the current player and starting scores
let currentPlayer = 0;
const scores = [0, 0];
let currentScore = 0;

// Function to switch Active players
// Returns the number of the new player
const changeActivePlayer = function () {
  const nextPlayer = currentPlayer === 0 ? 1 : 0;

  document
    .querySelector(`.player--${nextPlayer}`)
    .classList.add('player--active');

  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');

  currentPlayer = nextPlayer;
};

const addCurrentToScore = function (player) {
  scores[player] += currentScore;

  document.querySelector(`#score--${player}`).textContent = scores[player];
};

const addToCurrent = function (player, amount) {
  currentScore += amount;

  document.querySelector(`#current--${player}`).textContent = currentScore;
};

const resetScore = function (player) {
  document.querySelector(`#score--${player}`).textContent = 0;
};

const resetCurrent = function (player) {
  currentScore = 0;
  document.querySelector(`#current--${player}`).textContent = currentScore;
};

// Rolls the dice
const rollDice = function () {
  // Show the die
  dice.classList.remove('hidden');

  // Generate random die roll
  const number = Math.trunc(Math.random() * 6 + 1);
  // console.log(number);

  // Display number
  dice.setAttribute('src', `dice-${number}.png`);

  // If 1 Switch Player and reset current
  if (number === 1) {
    resetCurrent(currentPlayer);
    changeActivePlayer();
  } else {
    // Add Die roll to current score
    addToCurrent(currentPlayer, number);
  }
};

// Holds the score
const holdScore = function () {
  // Add current score to total score
  addCurrentToScore(currentPlayer);
  resetCurrent(currentPlayer);

  // If Score >= 100 We have a winner
  if (scores[currentPlayer] >= 100) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    // Switch PLayer
  } else {
    changeActivePlayer();
  }
};

// Reset the game
const resetGame = function () {
  // Set all scores to 0
  resetScore(0);
  resetScore(1);
  resetCurrent(0);
  resetCurrent(1);

  // Remove winning class
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');

  // Set player 1 as starting player
  if (currentPlayer === 1) {
    changeActivePlayer();
  }

  //Clear the die
  dice.classList.add('hidden');
};

// Attach event listeneners
newButton.addEventListener('click', resetGame);
rollButton.addEventListener('click', rollDice);
holdButton.addEventListener('click', holdScore);

// Setup the game for playing
resetGame();
