'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const openingHours = {
  // You can compute propertynames in ES6
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // Pre ES6 you would have to do this
  // openingHours: openingHours,

  // With Enhanced Object Literals - ES6
  // Creates new property using the same name
  openingHours,

  // With ES6 we don't need to createa a property and assign a function
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // can destructure right in the function
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order recived! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}.`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

console.log(restaurant);

/*
///////////////////////////////////////////////////////////
Sets
///////////////////////////////////////////////////////////
*/

// Set of unique values, duplicates are not added
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

console.log(ordersSet);

// Can get the length
console.log(ordersSet.size);

// Can check if exists
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));

// Can add and delete
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');

// clears the values of the sets
//ordersSet.clear();
console.log(ordersSet);

// Can still iterate through a set
for (const order of ordersSet) {
  console.log(order);
}

// with Sets you cannot retrieve a value, just check if its in there
// If you need to retrieve data use an array

// Example use case is to remove duplicates of arrays
const staff = ['Water', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const positions = [...new Set(staff)];
console.log(positions);

console.log(new Set('ryanguenther').size);

// You can change this back to an array easily

/*
///////////////////////////////////////////////////////////
Sets
///////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////
Coding Challenge #2
Let's continue with our football betting app! Keep using the 'game' variable from 
before.
Your tasks:
1. Loop over the game.scored array and print each player name to the console, 
along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already 
studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them 
(except for "draw"). Hint: Note how the odds and the game objects have the 
same property names �
4. Bonus: Create an object called 'scorers' which contains the names of the 
players who scored as properties, and the number of goals as the value. In this 
game, it will look like this:
{
 Gnarby: 1,
 Hummels: 1,
 Lewandowski: 2
}
///////////////////////////////////////////////////////////

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// Loop over the game.scored array and print each player name to the console,
// along with the goal number (Example: "Goal 1: Lewandowski")
for (const [key, name] of game.scored.entries()) {
  console.log(`Goal ${key + 1}: ${name}`);
}

// Use a loop to calculate the average odd and log it to the console (We already
// studied how to calculate averages, you can go check if you don't remember)

let average = 0;
const odds = Object.entries(game.odds);
for (const odd of odds) {
  average += odd[1];
}

average /= odds.length;

console.log(`Average Odds calculates to: ${average}`);

// Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them
// (except for "draw"). Hint: Note how the odds and the game objects have the
// same property names �
for (const [team, odd] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${(game[team] && 'victory ' + game[team]) ?? 'draw'}: ${odd}`
  );
}

// Bonus: Create an object called 'scorers' which contains the names of the
// players who scored as properties, and the number of goals as the value. In this
// game, it will look like this:
// {
//   Gnarby: 1,
//   Hummels: 1,
//   Lewandowski: 2
//  }
// console.log(game.scored);
const scorers = {};

for (const scorer of game.scored) {
  console.log(scorer);
  scorers[scorer] ? scorers[scorer]++ : (scorers[scorer] = 1);
}

console.log(scorers);


///////////////////////////////////////////////////////////
Coding Challenge # 2
///////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////
Looping Objects
///////////////////////////////////////////////////////////


// Property Names
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open ${properties.length} days of the week. Days: `;

for (const day of properties) {
  openStr += `${day}, `;
}

console.log(openStr);

// Property Values
const values = Object.values(openingHours);
console.log(values);

// Entire Object
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`on ${key} we open at ${open} and close at ${close}`);
}


///////////////////////////////////////////////////////////
Looping Objects
///////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////
Chaining ?
///////////////////////////////////////////////////////////


// you would need to do this to check to see if all optional properties exist
//if(restaurant.openingHours && restaurant.openingHours.mon)
// Instead you can do this optional chaining to make this much more readable, it will return unndefined if any don't exist
console.log(restaurant.openingHours?.mon?.open);

// Only if the property before the ? exists then the following one will be read otherwise undefined will be return

// it exists if not null and not defined, 0 or '' do exist

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  // console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Optional chaining on Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist.');

// Checks if orderRisotto exist, its undefined so with nullish operator it falls back
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist.');

// Optional chaining Arrays -- empty check
//const users = [{ name: 'Ryan', email: 'no@email.com' }];
const users = [];

console.log(users[0]?.name ?? 'User array empty');


///////////////////////////////////////////////////////////
Chaining ?
///////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////
Enhanced Object Literals
///////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////
Enhanced Object Literals
///////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////
Looping Arrays: The for-of Loop
///////////////////////////////////////////////////////////


const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for of loop
// automatically loops overr entire array, gives access to current element
for (const item of menu) console.log(item);

// if you need the index in the loop you have to use the entries method
// You can destructure here
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

// Returns an array iterator
// console.log([...menu.entries()]);


///////////////////////////////////////////////////////////
Looping Arrays: The for-of Loop
///////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////
Coding Challenge 1

We're building a football betting app (soccer for my American friends �)!
Suppose we get data from a web service about a certain game ('game' variable on 
next page). In this challenge we're gonna work with that data.
Your tasks:

1. Create one player array for each team (variables 'players1' and 
'players2')

2. The first player in any player array is the goalkeeper and the others are field 
players. For Bayern Munich (team 1) create one variable ('gk') with the 
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 
field players

3. Create an array 'allPlayers' containing all players of both teams (22 
players)

4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a 
new array ('players1Final') containing all the original team1 players plus 
'Thiago', 'Coutinho' and 'Perisic'

5. Based on the game.odds object, create one variable for each odd (called 
'team1', 'draw' and 'team2')

6. Write a function ('printGoals') that receives an arbitrary number of player 
names (not an array) and prints each of them to the console, along with the 
number of goals that were scored in total (number of player names passed in)

7. The team with the lower odd is more likely to win. Print to the console which 
team is more likely to win, without using an if/else statement or the ternary 
operator.

Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. 
Then, call the function again with players from game.scored
GOOD LUCK �

///////////////////////////////////////////////////////////


const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//Create one player array for each team (variables 'players1' and 'players2')
const [players1, players2] = [...game.players];

console.log(players1);
console.log(players2);

//The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the
// goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// Create an array 'allPlayers' containing all players of both teams (22 players)
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus
// 'Thiago', 'Coutinho' and 'Perisic'
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
const {
  odds: { team1: team1, x: draw, team2: team2 },
} = game;
console.log(team1, draw, team2);

// Write a function ('printGoals') that receives an arbitrary number of player names (not an array) and prints each of them to the console, along with the
// number of goals that were scored in total (number of player names passed in)
const printGoals = function (...names) {
  for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
  }
  console.log(`Players scored ${names.length} goals.`);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// The team with the lower odd is more likely to win. Print to the console which team is more likely to win, without using an if/else statement or the ternary
// operator.
console.log(
  (game.odds.team1 > game.odds.team2 && game.team1) || game.team2,
  ' is more likely to win.'
);


///////////////////////////////////////////////////////////
Coding Challenge 1
///////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////
Logical Assignment Operators
///////////////////////////////////////////////////////////


const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// Set default num of guests for all restaurants that don't have it
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests = rest1.numGuests || 10;

// Or assignment operator
// this will assign a value if the value is currently falsey
// problematic if you have a 0 value
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// Nullish assignment operator will handle for 0 and behave the same as \\=
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// And assignment operator
// anonymize the owners

// Results in undefined if and operator short circuits
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';

// This won't result in undefined
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1, rest2);


///////////////////////////////////////////////////////////
Logical Assignment Operators
///////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////
Nullish Coalescing Operator ??
///////////////////////////////////////////////////////////


restaurant.numGuests = 0;
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// Nullish operator uses nullish values not falsey
// Nullish are Null and Undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);


///////////////////////////////////////////////////////////
Nullish Coalescing Operator ??
///////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////
Short Circuting && and ||
///////////////////////////////////////////////////////////


// Use ANY data type with logical operators
// Return any data type with logical operators
// They do short-circuiting

// With ||, if first value is truthy it will return that
console.log('------ OR -----');
console.log(3 || 'Ryan');
console.log('' || 'Jonas');
console.log(true || 'Lindsey');
console.log(undefined || null);

// Hello is truthy so short circuits the rest
console.log(undefined || 0 || '' || null || 'Hello' || 23 || null);

// this doesn't work if 0 is the actual number, you need to do a 0 check
// restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// With &&, if the first value is not falsey it will stop
console.log('------ AND -----');
console.log(0 && 'Ryan');
console.log(7 && 'Ryan');

// Null breaks the rest of the evaluation
console.log('Hello' && 23 && null && 'ryan');

if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('Cheese', 'Bacon');


///////////////////////////////////////////////////////////
Short Circuting && and ||
///////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////
The Rest Operator
///////////////////////////////////////////////////////////


// Destructuring

// Spread syntax, because on the right side of the = operator
const arr = [1, 2, ...[3, 4]];

const [] = [1, 2, 3, 4, 5];

// This is the rest operator, you can see first and second get scored and  rest get dumped into a new array
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

// the rest opearotr collects unused items in destructuring

// Does not include skipped elements, Pasta was skipped here, it just grabs everything else
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

console.log(pizza, risotto, otherFood);

// Also works for objects

const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

// Functions -- This will take multiple values and package into an array
const add = function (...numbers) {
  // console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('Pepperoni', 'Mushrooms', 'Bacon');

restaurant.orderPizza('Cheese');

///////////////////////////////////////////////////////////
The Rest Operator
///////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////
The Spread Operator (...)
///////////////////////////////////////////////////////////


const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];

// ... Expands the array into all of its elements
// If we don't spread then it would just put the full array as one element
const goodNewArr = [1, 2, ...arr];

console.log(badNewArr);
console.log(goodNewArr);

console.log(...goodNewArr);

// This creates a brand new array from scratch [] indicates that
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// can only use spread where you would take values separated by commas

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// Join two arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// ... works on Iterables
// Iterables: arrays, strings, maps, sets. Not objects
const str = 'Guenther';
const letters = [...str, ' ', 'R.'];
console.log(letters);

// Real-world example
// you can escape a single string with '\
const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3?'),
];

console.log(ingredients);

restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

// Allows us to make an easy shallow copy
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';

console.log(restaurantCopy.name, restaurant.name);


///////////////////////////////////////////////////////////
The Spread Operator (...)
///////////////////////////////////////////////////////////
/*

/*
///////////////////////////////////////////////////////////
Destructuring objects
///////////////////////////////////////////////////////////


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

///////////////////////////////////////////////////////////
Destructuring objects
///////////////////////////////////////////////////////////
*/

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
