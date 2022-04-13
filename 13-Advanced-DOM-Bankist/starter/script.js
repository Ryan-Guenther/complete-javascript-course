'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

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
// Button Scrolling

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

///////////////////////////////////////
// Page Navigation

// This creates a copy of the function for each element, instead we can use event delegation
// Move the listener onto the parent container
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log('LINK', e.target);
//     // Grabs the href attribute which we can use to find the element
//     const id = this.getAttribute('href');
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Two steps are needed
// 1. Add event listener to common parent element
// 2. Determine which element originated the event, then work with that
document.querySelector('.nav__links').addEventListener('click', function (el) {
  el.preventDefault();
  // Matching Strategy to ignore clicks not on the links
  if (el.target.classList.contains('nav__link')) {
    console.log('LINK', el.target);
    const id = el.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed Component
tabsContainer.addEventListener('click', function (el) {
  // finds the closest element that has the class
  // when no parent we get a null
  const clicked = el.target.closest('.operations__tab');

  // Adds a guard clause to escape if the condition hits and nothing was clicked
  if (!clicked) return;

  // deactivate current tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Set the new tab active
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
  const link = e.target;

  if (e.target.classList.contains('nav__link')) {
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
};

// we can use bind to pass an "argument" into a handler function
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky Navigation - Scroll event
// Scroll event fires very often, not very efficient
// the event is not very useful, window.scrollY gets you the position
/*
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function () {
  console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

///////////////////////////////////////
// Sticky Navigation: Intersection Observer API
// entries and the observer gets passed into the callback function
// entries is the array of threshold
/* 
// sample exercise
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null, // when root is null it uses the viewport
  threshold: [0, 0.2], // percentage of the element that we want intersecting
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

const headerObsCallback = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const navHeight = nav.getBoundingClientRect().height;

const headerObsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // 90 pixels outside the header
};

const headerObserver = new IntersectionObserver(
  headerObsCallback,
  headerObsOptions
);
headerObserver.observe(header);

///////////////////////////////////////
// Revealing Elements on Scroll

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  // This stops monitoring them as they get revealed
  observer.unobserve(entry.target);
};

const sectionObsOptions = {
  root: null,
  threshold: 0.2,
};

const sectionObserver = new IntersectionObserver(
  revealSection,
  sectionObsOptions
);

const allSections = document.querySelectorAll('.section');
allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

///////////////////////////////////////
/* Selecting Creating and Deleting Elements */
///////////////////////////////////////
/*
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
*/
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

///////////////////////////////////////
/* MouseEnter Event */
///////////////////////////////////////
/*

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
*/
///////////////////////////////////////
/* MouseEnter Event */
///////////////////////////////////////

///////////////////////////////////////
/* Event Propogation in pratice */
///////////////////////////////////////

/*
// Generate a random color in this format
// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// With this we can see the clicks bubble up, so the .nav fires first, then .nav__links then .nav__link
// In this case it fires in all the elements that are listening to it
// event.target is where the event triggered, .currentTarget is the place the event is firing from
// currentTarget is the same as the this, target is only going to be the same on the specific one
// Event propgation can be stopped as well event.stopPropagation()
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  // Stops the event propogation to other elements, but not a good practice
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  }
  // Third parameter will define that they will happen on the capture phase (first) (defaults to false)
  // ,true
);
*/

///////////////////////////////////////
/* Event Propogation in pratice */
///////////////////////////////////////

///////////////////////////////////////
/* DOM Traversing */
///////////////////////////////////////
/*
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
// This returns all the child nodes of the element
console.log(h1.childNodes);
// Here we get the actual HTMLCollection **Only direct children
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode); // Similar to childNodes
console.log(h1.parentElement);

// grabs closest parent element with the class .header
h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
// in JS you can only access direct siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// Or you can go up to the parent element and get all the children
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.75)';
  }
});
*/
///////////////////////////////////////
/* DOM Traversing */
///////////////////////////////////////
