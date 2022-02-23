'use strict';

/*
---------------------------------------------
Default Parameters
---------------------------------------------
*/

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

/*
---------------------------------------------
Default Parameters
---------------------------------------------
*/
