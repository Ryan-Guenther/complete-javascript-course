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