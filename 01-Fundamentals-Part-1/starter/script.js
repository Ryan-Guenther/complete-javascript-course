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