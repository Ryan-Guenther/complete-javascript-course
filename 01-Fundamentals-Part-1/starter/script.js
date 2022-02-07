/*
let js = 'amazing';
console.log(40 + 8 + 23 - 10);

console.log('Jonas');
console.log(23);

//Variable name conventions
let firstName = 'Ryan';

console.log(firstName);
console.log(firstName);
console.log(firstName);



let javascriptIsFun = true;
console.log(javascriptIsFun);

console.log(typeof javascriptIsFun);
javascriptIsFun = 23;
console.log(typeof javascriptIsFun);
javascriptIsFun = "true";
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

console.log(typeof null);


// Block Scoped
let age = 30;
age = 31;

const birthDate = "1984/09/27";
// birthDate = "1999/01/01";

// console.log(birthDate);

// Function Scoped
var job = 'programmer';
job = 'teacher';

// Not in current scope, is created on global object
lastName = "Guenther";
console.log(lastName);


const year = 2022;

const ageRyan = year - 1984;
const ageLindsey = year - 1988;

console.log(ageRyan, ageLindsey);

console.log(ageRyan * 2, ageRyan / 2, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 x 2 x 2

const firstName = 'Ryan';
const lastName = 'Guenther';
console.log(firstName + ' ' + lastName);

// Assignment Operators
let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x++; // x = x + 1
x--; // x = x - 1
x--; // x = x - 1
console.log(x);

//Comparison Operators
console.log(ageRyan > ageLindsey); // >, <, >=, <=
console.log(ageLindsey >= 18);



//Operator Precedence
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
const year = 2022;

const ageRyan = year - 1984;
const ageLindsey = year - 1988;

console.log(year - 1991 > year - 2018);

let x, y;
x = y = 25 - 10 - 5;
console.log(x, y);

const averageAge = (ageRyan + ageLindsey) / 2;
console.log(ageRyan, ageLindsey, averageAge);

*/

// Coding Challenge #1
/*
Mark and John are trying to compare their BMI (Body Mass Index), which is 
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg 
and height in meter).
Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both 
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about 
whether Mark has a higher BMI than John.
Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 
m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 
m tall.
*/

/*
let markHeight, markMass, johnHeight, johnMass, markBMI, johnBMI, markHigherBMI;

markHeight = 1.69;
markMass = 78;
johnHeight = 1.95;
johnMass = 92;

markBMI = markMass / markHeight ** 2;
johnBMI = johnMass / johnHeight ** 2;
markHigherBMI = markBMI > johnBMI;

console.log("Mark's BMI is: ", markBMI);
console.log("John's BMI is: ", johnBMI);
console.log("Mark has a higher BMI: ", markHigherBMI);

markHeight = 1.88;
markMass = 95;
johnHeight = 1.76;
johnMass = 85;

markBMI = markMass / markHeight ** 2;
johnBMI = johnMass / johnHeight ** 2;
markHigherBMI = markBMI > johnBMI;

console.log("Mark's BMI is: ", markBMI);
console.log("John's BMI is: ", johnBMI);
console.log("Mark has a higher BMI: ", markHigherBMI);

*/


/*

const firstName = 'Ryan';
const job = 'Developer';
const birthYear = 1984;
const currentYear = 2022;

// Template Strings like this were added in ES6, need to use backticks
const ryan = `I'm ${firstName}, a ${currentYear - birthYear} year old ${job}!`;
console.log(ryan);

// Multi line without template literal
console.log('String with \n\
multiple \n\
lines');

// Template string with multi line using backticks
console.log(`String with
multiple
lines!`);

*/

/*
const age = 15;

if (age >= 18) {
  console.log('Sarah can start driving license.');
}
else {
  const yearsLeft = 18 - age;
  console.log(`Sarah needs to wait another ${yearsLeft} years to get her drivers license!`);
}

const birthYear = 1991;
let century;
if (birthYear <= 2000) {
  century = 20;
}
else {
  century = 21;
}

console.log(century);
*/

/*
Coding Challenge #2
Use the BMI example from Challenge #1, and the code you already wrote, and 
improve it.
Your tasks:
1. Print a nice output to the console, saying who has the higher BMI. The message 
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!"
*/

/*

// const markHeight = 1.69;
// const markMass = 78;
// const johnHeight = 1.95;
// const johnMass = 92;

const markHeight = 1.88;
const markMass = 95;
const johnHeight = 1.76;
const johnMass = 85;

const markBMI = markMass / markHeight ** 2;
const johnBMI = johnMass / johnHeight ** 2;
const markHigherBMI = markBMI > johnBMI;

if (markBMI > johnBMI) {
  console.log(`Mark's BMI (${markBMI}) is higher than John's (${johnBMI})!`)
}
else {
  console.log(`John's BMI (${johnBMI}) is higher than Mark's (${markBMI})!`)
}

*/

/*

// type conversion
const inputYear = "1991";
console.log(Number(inputYear));
console.log(Number(inputYear) + 18);

console.log(Number('Ryan'));
console.log(typeof NaN);

console.log(String(23) + 12);

// type coercion
console.log('I am ' + 23 + ' years old');
console.log('23' - '10' - 3);
console.log('23' * '2');
console.log('23' / '2');

*/

/*
// 5 falsy values 0, '', undefined, null, NaN
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
console.log(Boolean('Ryan'));
console.log(Boolean({}));
console.log(Boolean(''));

const money = 0;

// automatic type coercion to a boolean in an if statement
if (money) {
  console.log("Don't spend it all)");
}
else {
  console.log("You should get a job.");
}

// This can run into a bug if height is 0 since height has a value but 0 is falsy
let height = 0;
if (height) {
  console.log('YAY! Height is defined!');
}
else {
  console.log('Height is undefined!');
}

*/

const age = 18;

// === is strict equality does not do type coercion '18' is not the same as 18
// == does type coercion '18' is the same as 18
if (age === 18) console.log('You are now an adult!');

if (!(age === '18')) console.log('These are not equal (strict)');
if (age == '18') console.log('These are now equal (loose)');

let favoriteNumber = Number(prompt("What's your favorite number?"));

if (favoriteNumber && favoriteNumber === 42) {
  console.log("42 is an amazing number.");
} else if (favoriteNumber === 7) {
  console.log('I guess 7 is cool too!');
} else {
  console.log('What were you thinking?');
}