'use strict';

/*
---------------------------------------------
Functions accepting Callback Functions
---------------------------------------------
*/

const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// because this takes in a function it's a higher order function
const transformer = function (str, fn) {
  console.log(str);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

// When we invoke we only pass in the fucntion we do not call it with ()
transformer('JavaScript is the best!', upperFirstWord);

transformer('JavaScript is the best!', oneWord);

const high5 = function () {
  console.log('👋');
};

document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

/*
---------------------------------------------
Functions accepting Callback Functions
---------------------------------------------
*/

/*
---------------------------------------------
First-Class and Higher-Order Functions
---------------------------------------------
*/

// JavaScirpt treats functions as first-class citizens
// Functions are simply values
// Functions are just another "type" of funcitons

// Because of this you can store functions in variables or properties

// higher order function is a function that receives another function as an argument
// or a function that returns a function

// when you add an event AudioListener, the addEventListener is the higher order function
// the function that you pass in is the callback function

/*
---------------------------------------------
First-Class and Higher-Order Functions
---------------------------------------------
*/

/*
---------------------------------------------
How Passing Arguments Works: Value vs Reference
---------------------------------------------


const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  // Primitives are passed by value, if they are mutated here it doesn't ripple out
  // Objects are passed by value but the value is the reference ot the object in the heap, so if you mutate them they mutate everywhere
  // Javascirpt is always pass by value, just value of objects are memory addresses.  It's not passing byref
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, jonas);
console.log(flight, jonas);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(jonas);
checkIn(flight, jonas);
console.log(jonas);


---------------------------------------------
How Passing Arguments Works: Value vs Reference
---------------------------------------------
*/

/*
---------------------------------------------
Default Parameters
---------------------------------------------


const bookings = [];

// In ES6 we can just specify the defaults in the function declaration
// Calculated parameters like this are only for default values
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // Old way of setting default - ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);

// Passing a parameter as undefined will use the default value
createBooking('LH123', undefined, 1000);


---------------------------------------------
Default Parameters
---------------------------------------------
*/
