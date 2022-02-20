'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // can destructure right in the function
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order recived! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

/*
///////////////////////////////////////////////////////////
Destructuring arrays
///////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////
Destructuring objects
///////////////////////////////////////////////////////////
*/

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

// If we dont' pass in the time and mainIndex it would either be undefined or default value
restaurant.orderDelivery({ address: 'Via del Sole, 21', starterIndex: 1 });

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Can setup default values for destructured parts of an object to avoid undefined
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, cc: 14 };

// if you start with { it expects a code block - you have to wrap in paranthesis
({ a, b } = obj);
console.log(a, b);

// nested objects this is how you can destructure
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

/*
///////////////////////////////////////////////////////////
Destructuring arrays
///////////////////////////////////////////////////////////

// Destructuring is a ES6 feature to break down into smaller structures (variables)

// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// const [x, y, z] = arr;

// console.log(a, b, c);
// console.log(x, y, z);
// console.log(arr);

// You can skip or only take partial array when destructuring
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// Switching variables traditional method
// const temp = main;
// main = secondary;
// secondary = temp;

// Switching variables using destructuring
// No intermediate variable needed
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Lets order - Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested Destructuring
const nested = [2, 4, [5, 6]];

// destruct two values one variable (i) and one for an array (j)
// const [i, , j] = nested;
// console.log(i, j);

//instead we can destructure in destructure
const [i, , [j, k]] = nested;
console.log(i, j, k);

// If we don't know the length of the array
// We can specify default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);


///////////////////////////////////////////////////////////
Destructuring arrays
///////////////////////////////////////////////////////////
*/
