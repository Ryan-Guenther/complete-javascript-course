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
