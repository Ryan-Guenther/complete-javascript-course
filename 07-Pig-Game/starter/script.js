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

// Define the current player
let currentPlayer = 0;

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

  return nextPlayer;
};

// Rolls the dice
const rollDice = function () {
  // Generate random die roll
  const number = Math.trunc(Math.random() * 6 + 1);
  // console.log(number);

  // Display number
  dice.setAttribute('src', `dice-${number}.png`);

  // If 1 Switch Player and reset current
  if (number === 1) {
    document.querySelector(`#current--${currentPlayer}`).textContent = 0;
    currentPlayer = changeActivePlayer();
  } else {
    // Add Die roll to current score
    const newScore =
      Number(document.querySelector(`#current--${currentPlayer}`).textContent) +
      number;
    //Display New Score
    document.querySelector(`#current--${currentPlayer}`).textContent = newScore;
  }
};

// Holds the score
const holdScore = function () {
  // Add current score to total score
  const score = Number(
    document.querySelector(`#score--${currentPlayer}`).textContent
  );
  const current = Number(
    document.querySelector(`#current--${currentPlayer}`).textContent
  );

  const newScore = score + current;
  console.log(score, current, newScore);
  document.querySelector(`#score--${currentPlayer}`).textContent = newScore;
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;

  // If Score >= 100 We have a winner
  if (newScore >= 100) {
    console.log('We have a winner!');
    // Switch PLayer
  } else {
    currentPlayer = changeActivePlayer();
  }
};

// Reset the game
const resetGame = function () {
  // Set all scores to 0
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;

  // Set player 1 as starting player
  if (currentPlayer === 1) {
    currentPlayer = changeActivePlayer(0);
  }

  //Clear the die
  console.log(dice);
  dice.setAttribute('src', '');
};

// Attach event listeneners
newButton.addEventListener('click', resetGame);
rollButton.addEventListener('click', rollDice);
holdButton.addEventListener('click', holdScore);

// Setup the game for playing
resetGame();
