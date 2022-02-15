'use strict';
// because this is a class we area acessing we use '.', use '#' for id
console.log(document.querySelector('.message').textContent);

/*

What is the DOM and DOM Manipulation
  Document Object Model
  Allows Javascript to access HTML elements/styles in order to manipulate them

*/

/*

Selecting and manipulating elements

*/

// document.querySelector('.message').textContent = '🎉 Correct Number!';

// document.querySelector('.number').textContent = '13';
// document.querySelector('.score').textContent = '10';

// console.log(document.querySelector('.number').textContent);
// console.log(document.querySelector('.score').textContent);

// // On inputs we use the value property
// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

// In order to trigger something when it happens we need an event listener

// Need to define a randon number between 1-20
const secretNumber = Math.trunc(Math.random() * 20);
let score = (document.querySelector('.score').textContent = 20);

// Display number for debugging
document.querySelector('.number').textContent = secretNumber;

// Select the element and use addEventListenener
document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  console.log(typeof guess, guess);

  // Error if invalid guess entry
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number!';

    // When the player wins
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';

    // When the guess is too high
  } else if (score > 1 && guess > secretNumber) {
    document.querySelector('.message').textContent = '📈 Too high!';
    score--;
    document.querySelector('.score').textContent = score;

    // When the Guess is too low
  } else if (score > 1 && guess < secretNumber) {
    document.querySelector('.message').textContent = '📉 Number is too low!';
    score--;
    document.querySelector('.score').textContent = score;

    // When the player loses the game
  } else {
    score--;
    document.querySelector('.score').textContent = score;
    document.querySelector('.message').textContent = '💥 You lost the game!';
  }
});
