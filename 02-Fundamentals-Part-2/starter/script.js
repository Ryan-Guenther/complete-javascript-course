'use strict';
//This needs to be the first line of every script file
//Helps avoid accidental errors, forbidding certain actions and raise errors

/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) {
  hasDriversLicense = true;
}

if (hasDriversLicense) {
  console.log('I can drive.');
}

//strict mode reserves words automatically
// const interface = 'Audio';
// const private = 534;

*/

/*

//function definiton
//does not need to accept parameters or return parameters but could do non, either or both
function logger() {
  console.log('My name is Ryan');
}

//calling//running/invoking function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  // console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const orangeJuice = fruitProcessor(0, 5);
console.log(orangeJuice);

const mixedJuice = fruitProcessor(2, 2)
console.log(mixedJuice);

*/

/*

// generic function declaration
// this can be called before this declaration
function calcAge1(birthYear) {
  return 2037 - birthYear;
}

const age1 = calcAge1(1991);

// function expression, this works because a function is treated as a value so you can store it in a variable
// expressions can't be accessed until they are initialzied
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
}

const age2 = calcAge2(1991)

console.log(age1, age2);

*/

/*
// Arrow Functions
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
}

const calcAge3 = birthYear => 2037 - birthYear;

const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2022 - birthYear;
  const retirementYears = 65 - age;
  return `${firstName} retires in ${retirementYears} years!`;
}

console.log(yearsUntilRetirement(1984, 'Ryan'));
console.log(yearsUntilRetirement(1988, 'Lindsey'));

*/

/*
// Functions calling other functions

function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of orange.`;
  return juice;
}

console.log(fruitProcessor(2, 3));
*/

/*
const calcAge = function (birthYear) {
  return 2022 - birthYear;
}

const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear)
  const retirementYears = 65 - age;

  if (retirementYears > 0) {
    console.log(`${firstName} retires in ${retirementYears} years!.`)
    return retirementYears;
  }
  else {
    console.log(`${firstName} has already retired!.`)
    return -1;
  }
}

console.log(yearsUntilRetirement(1984, 'Ryan'));
console.log(yearsUntilRetirement(1988, 'Lindsey'));
console.log(yearsUntilRetirement(1946, 'John'));

*/

/*

Coding Challenge #1

Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new
gymnastics discipline, which works differently.

Each team competes 3 times, and then the average of the 3 scores is calculated (so
one average score per team).

A team only wins if it has at least double the average score of the other team.
Otherwise, no team wins!

Your tasks:
1. Create an arrow function 'calcAverage' to calculate the average of 3 scores

2. Use the function to calculate the average for both teams

3. Create a function 'checkWinner' that takes the average score of each team
as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner
to the console, together with the victory points, according to the rule above.
Example: "Koalas win (30 vs. 13)"

4. Use the 'checkWinner' function to determine the winner for both Data 1 and
Data 2

5. Ignore draws this time
Test data:
§ Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
§ Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

Hints:
§ To calculate average of 3 values, add them all together and divide by 3

§ To check if number A is at least double number B, check for A >= 2 * B.
Apply this to the team's average scores �

GOOD LUCK

*/

/*

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3

const checkWinner = function (avgDolphins, avgKoalas) {
  if (avgKoalas >= 2 * avgDolphins)
    console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
  else if (avgDolphins >= 2 * avgKoalas)
    console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
  else
    console.log(`No Winner! (Koalas ${avgKoalas} vs. Dolphins ${avgDolphins})`);
}

checkWinner(calcAverage(44, 23, 71), calcAverage(65, 54, 49));
checkWinner(calcAverage(85, 54, 41), calcAverage(23, 34, 27));

*/

/*

//Arrays

const friend1 = 'Donald';
const friend2 = 'Robyn';
const friend3 = 'Rob';

// Arrays defined with [] with comma separated values // literal syntax
const friends = ['Donald', 'Robyn', 'Rob'];

// can also be created using the array function, have to specify new keyword when doing this
const y = new Array(1991, 1984, 2008, 2020);

console.log(friends[0]);
console.log(friends[2]);

// can access length from property, need to ensure to subtract 1 since arrays are 0 based
console.log(friends.length);
console.log(friends[friends.length - 1]);

// arrays can be mutated they are not primitive values (string, number)
friends[2] = 'Calvin';
console.log(friends);

// can't reassign a const array
//friends = ['Bob', 'Alice'];

// arrays can hold different types
const firstName = 'Ryan';
const ryan = [firstName, 'Guenther', 2022 - 1984, 'Developer', friends]

console.log(ryan);

// Exercise

const calcAge = function (birthYear) {
  return 2022 - birthYear;
}

const years = [1990, 1967, 2002, 2010, 2018];

// can't do this will return NaN
//console.log(calcAge(years));

const age1 = calcAge(years[0]);
const age2 = calcAge(years[2]);
const age3 = calcAge(years[years.length - 1]);

console.log(age1, age2, age3);

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];

console.log(ages);

*/

// Basic Array Operations (Methods)

const friends = ['Donald', 'Robyn', 'Rob'];
// Adds an element to an array -- returns length of new array
let newLength = friends.push('Calvin');
console.log(newLength);
console.log(friends);

// Adds new element to start of the array
newLength = friends.unshift('Lindsey');
console.log(newLength);
console.log(friends);

// Remove the Last Element of the Array and Returns the Removed Element
let popped = friends.pop();
console.log(popped);
popped = friends.pop();
console.log(popped);
console.log(friends);

// Remove the first eleemnt
friends.shift();
console.log(friends);

// Find the index of the record -1 if not exists
console.log(friends.indexOf('Robyn'));
console.log(friends.indexOf('Matt'));

// Search for an element in an array - Strict Equality
console.log(friends.includes('Robyn'));
console.log(friends.includes('Matt'));
friends.push(23);
console.log(friends.includes('23')); // False
console.log(friends.includes(23)); // True

