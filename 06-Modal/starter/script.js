'use strict';

// Store the results of the selector into a variable for reuse
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnShowModal = document.querySelectorAll('.show-modal');

// console.log(modal);
// console.log(overlay);
// console.log(btnCloseModal);
// console.log(btnShowModal);

// Reusable function to open the modal
const openModal = function () {
  // console.log(`Button Clicked: ${btnShowModal[i].textContent}`);
  // console.log(modal.classList);
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Reusable function to close the modal
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Add the same event listenenr to each showModal button to show the modal
for (let i = 0; i < btnShowModal.length; i++) {
  btnShowModal[i].addEventListener('click', openModal);
}

// Add the event listener to the close modal button to hide the modal again
// To indicate it only executes on click do not specify the () for the function
btnCloseModal.addEventListener('click', closeModal);

// Clicking outside the modal should also close it
overlay.addEventListener('click', closeModal);

// In order to listen to keyboard events we still use add event listeners
// They are global events, we listen on the document level
// keyup - when you lift your finger
// keypress - while holding
// keydown - when you press down - usuallly use this
// In order to find out what is happening we need to give the function a parameter, can call this whatever (e) is standard to reference the event
// Javascript will call it with the event Parameter
document.addEventListener('keydown', function (e) {
  // gets executed for every keypress by the user
  // console.log('A key was pressed!');
  // console.log(e);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
