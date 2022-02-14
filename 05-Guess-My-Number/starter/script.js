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

document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = '13';
document.querySelector('.score').textContent = '10';

console.log(document.querySelector('.number').textContent);
console.log(document.querySelector('.score').textContent);

// On inputs we use the value property
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
