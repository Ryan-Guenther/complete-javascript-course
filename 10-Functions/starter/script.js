'use strict';

/*
---------------------------------------------
The bind Method
---------------------------------------------
*/

// Bind returns a new function with the this keyword bouund

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, passengerName) {
    console.log(
      `${passengerName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      passengerName,
    });
  },
};

// can steal the function this way
const book = lufthansa.book;

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

// Returns the book function for eurowings
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookSW = book.bind(swiss);

// Now can call normally
bookEW(123, 'Ryan Guenther');
console.log(eurowings);

// you can also bind arguments to be fixed
// Since number is preset only need to pass the name
// This is called partial application
const bookEW23 = book.bind(eurowings, 23);

bookEW23('Ryan Guenther');
bookEW23('Lindsey Guenther');

// When you use objects with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// Event listener takes over the this keyword so this won't work
// Here you need to bind to the object
// you can't use call here since call would call the funciton, bind returns a new function
const button = document.querySelector('.buy');
button.addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application with bind
// If we dont' care abbout this but still want to preset we can do this

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// Leave the bind as null when you don't care about this keyowrd
const addGST = addTax.bind(null, 0.05);
console.log(addGST(100));

// Funciton to return a function in a similar way
const addTax2 = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addGST2 = addTax2(0.05);
console.log(addGST2(100));

/*
---------------------------------------------
The bind Method
---------------------------------------------
*/

/*
---------------------------------------------
The call and apply methods
---------------------------------------------


const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, passengerName) {
    console.log(
      `${passengerName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      passengerName,
    });
  },
};

lufthansa.book(239, 'Ryan Guenther');
lufthansa.book(635, 'John Smith');
// console.log(lufthansa);

// can steal the function this way
const book = lufthansa.book;

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// This doesn't work
// book(23, 'Sarah Williams');

// When you use call you can specify the this keyword
// Regular arguments folllow what the this keyword should be
book.call(eurowings, 23, 'Sarah Willaims');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');

// Apply method -- Does not receive arguments after this, instead takes array of arguments
const flightData = [583, 'George Cooper'];

book.apply(swiss, flightData);
console.log(swiss);

// you could also spread into a call rather than using apply
book.call(swiss, ...flightData);


---------------------------------------------
The call and apply methods
---------------------------------------------
*/

/*
---------------------------------------------
Functions Returning Functions
---------------------------------------------


// This works because of closures (covered lateron in course)
// Greet returns a new function into the variable that can then be called
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// Rewritten using arrow functions
// can be more confusing to interpret
const greet2 = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('Hey');
greeterHey('Ryan');
greeterHey('Lindsey');

greet('Hello')('Rob');

greet2('Sup')('Ryan');


---------------------------------------------
Functions Returning Functions
---------------------------------------------
*/

/*
---------------------------------------------
Functions accepting Callback Functions
---------------------------------------------


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
