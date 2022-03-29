'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(button => button.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
/* Selecting Creating and Deleting Elements */
///////////////////////////////////////

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// get the first instance of header class
const header = document.querySelector('.header');

// Get all sections
const allSections = document.querySelectorAll('.section');
console.log(allSections);

// Get the element by an id
document.getElementById('section--1');

// Get elements with the name of button
// Retures an HTMLCollection rather than a NodeList (Updates when the DOM changes automatically)
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// Gets all elements with a className
// Also returns an HTMLCollection
console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
//  .insertAdjacentHTML // Easy way to create elements // Demo'd in bankist for adding transactions

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.'
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// Prepend adds as the first child of the element
// header.prepend(message);

// This adds it as the last element
// Note the element cannot be added into two places at the same time, the append moved the element when this occured
header.append(message);

// This will append a copy of the message
// header.append(message.cloneNode(true));

// Sets it as a sibling either before or after the element
// header.before(message);
// header.after(message);

// Delete ELements using the remove method
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
  // legacy way to remove elements, you needed to invoke removeChild on the parent
  // message.parentElement.removeChild(message);
});

///////////////////////////////////////
/* Selecting Creating and Deleting Elements */
///////////////////////////////////////
