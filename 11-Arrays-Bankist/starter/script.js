'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
-------------------------------------------------
Looping Arrays forEach
-------------------------------------------------
*/

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [key, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${key + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${key + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('--------FOREACH METHOD -----------');

// callback function is invoked for each iteration of the array
// With foreach there is the value iterated on, index and array which are optional
// continue and break statements won't work in a foreach
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

/*
-------------------------------------------------
Looping Arrays forEach
-------------------------------------------------
*/

/*
-------------------------------------------------
The new at Method
-------------------------------------------------


const arr = [23, 11, 64];

// With this we can use the array method rather than [] notation
console.log(arr[0]);
console.log(arr.at(0));

// Get the last element of the array without knowing the length
console.log(arr.at(-1));
console.log(arr.at(-2));


-------------------------------------------------
The new at Method
-------------------------------------------------
*/

/*
-------------------------------------------------
Simple Array Methods
-------------------------------------------------


// arrays have built in methods we can access

let arr = ['a', 'b', 'c', 'd', 'e'];

// Slice begin parameter and end parameter
console.log(arr.slice(2, 4));
// Negative slice starts from the end
console.log(arr.slice(-2));
// Always gets last element
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
// makes shallow copy - same as [...arr]
console.log(arr.slice());

// Splice Method, similar to Slice but changes the original array
// console.log(arr.splice(2));
// Removes last element -- same as pop
arr.splice(-1);
// This goes to position 1 and deletes 2 elemtns
arr.splice(1, 2);
console.log(arr);

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
// reverse does mutate the array
console.log(arr2.reverse());
console.log(arr2);

// Concat - doesn't mutate
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// Join - doesn't mutate
console.log(letters.join(' - '));


-------------------------------------------------
Simple Array Methods
-------------------------------------------------
*/
