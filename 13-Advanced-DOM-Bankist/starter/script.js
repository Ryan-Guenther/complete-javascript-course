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

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// get the first instance of header class
const header = document.querySelector('.header');

// Get all sections
const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// Get the element by an id
document.getElementById('section--1');

// Get elements with the name of button
// Retures an HTMLCollection rather than a NodeList (Updates when the DOM changes automatically)
const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// Gets all elements with a className
// Also returns an HTMLCollection
// console.log(document.getElementsByClassName('btn'));

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

///////////////////////////////////////
/* Styles Attributes and Classes */
///////////////////////////////////////
/*
// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// You can output out any styles that are InLine, but you cannot pull styles from a class inheritence
console.log(message.style);

// You can get these another way though using getComputedStyle
console.log(getComputedStyle(message).height);

// ParseFloat to only take the number from the value of the style
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// With this you can mutate the customProperties in the CSS specifying name and the value
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
// Absolute path
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiul minamlist logo';

// Non-Standard
// properties are not created automatically for non-standard attributes
console.log(logo.designer);

// You can access them this way or set custom ones
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

// relative path of src
console.log(logo.getAttribute('src'));

// Works the same for HRef
const link = document.querySelector('.nav__link--btn');
console.log(link.getAttribute('href'));
console.log(link.href);

// Data attributes - need to start with "data-"
// Intellisence doesn't like dataset
console.log(logo.dataset.versionNumber);

// Classes, can add, remove, toggle or check if it contains
logo.classList.add('test');
logo.classList.remove('test');
logo.classList.toggle('test');
logo.classList.contains('test'); // not includes

// This will replace all existing classes and limits you to a single class
// logo.className = 'jonas';
*/
///////////////////////////////////////
/* Styles Attributes and Classes */
///////////////////////////////////////

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // get the coords of where we are scrolling to
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log('Current scroll (X/Y)', window.scrollX, scrollY);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling, need to pass the left and top of element to scrollto
  // Should ensure to always add the current scroll position to make sure you are accounting for that
  // window.scrollTo(s1coords.left + scrollX, s1coords.top + scrollY);

  // Using this as an object we can do a nice smooth scroll effect
  // window.scrollTo({
  //   left: s1coords.left + scrollX,
  //   top: s1coords.top + scrollY,
  //   behavior: 'smooth',
  // });

  // More modern way using just an element and passing in the object
  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading! :)');

  // This will remove the listener, but we need to have exported function into a variable
  h1.removeEventListener('mouseenter', alertH1);
};

// fires when mouse enters the element
h1.addEventListener('mouseenter', alertH1);

// This removes it after 3 seconds
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// can also be done in this fashion (older method)
// with this you can only have one function on the listener, vs using the addEventListener
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading! :)');
// };
