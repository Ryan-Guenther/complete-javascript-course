'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out.toFixed(2))}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
// Dates and Times
/////////////////////////////////////////////////

// Create a date (4 ways)
// const now = new Date();
// console.log(now);

// console.log(new Date('Aug 02 2020 13:01:23'));
// console.log(new Date('Dec 25 2015 00:00:00'));
// console.log(new Date(account1.movementsDates[0]));

// // Year, Month, Day, Hour, Minute, Second // Month is 0 based here
// console.log(new Date(2037, 10, 19, 15, 23, 5));
// console.log(new Date(2037, 10, 33)); // using the date like this will roll over extra days into next month

// // get UNIX Time Start Dec 31 1969
// console.log(new Date(0));
// // 3 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds 3 days after unix time start
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// Working with Dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth()); // 0 Based Month
console.log(future.getDate()); // returns the Day #
console.log(future.getDay()); // Day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // gives into UTC time so you can store safely
console.log(future.getTime()); // UNIX Time milliseconds since Jan 1 1970

console.log(Date.now()); // current time

// Can mutate the year directly using this
future.setFullYear(2040); // also have the setters for all the other values and do autocorection
console.log(future);

/////////////////////////////////////////////////
// Dates and Times
/////////////////////////////////////////////////

/////////////////////////////////////////////////
// Working with BigInts
/////////////////////////////////////////////////
/*
// Biggest number JS can represent
console.log(2 ** 53 - 1); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// the output is wrong as you add up beyond this
console.log(2 ** 53 + 9); // 9007199254741000
console.log(2 ** 53 + 10); // 9007199254741002
console.log(2 ** 53 + 11); // 9007199254741004
console.log(2 ** 53 + 12); // 9007199254741004

// now we have bigInt to work with these larger numbers
// adding n to the end of the number casts it as a bigInt
console.log(54654648484234243545343543543543543545n);
// This seems to not work as expected, still need to pass n with big numbers
console.log(BigInt(54654648484234243545343543543543543545n));

// Operations
console.log(10000n + 10000n);
console.log(5634654654354021351051608486165121n + 9n);

// no type mixing.  you would need to convert the other number to a bigInt
// console.log(5634654654354021351051608486165121n + 9);

// can do comparison operators
console.log(20n > 15);

// but not === as the types are different
console.log(20n === 20);
console.log(typeof 20n, typeof 20);
// This would handle the type coersion
console.log(20n == 20);

const huge = 51654654654646846846878765451231651651n;
console.log(huge + ' is REALLY big!!!');

// Divisions
console.log(10n / 3n); // returns 3 , closest bigInt
console.log(10n % 3n); // returns 1 the remainder
*/
/////////////////////////////////////////////////
// Working with BigInts
/////////////////////////////////////////////////

/////////////////////////////////////////////////
// Numeric Separators
/////////////////////////////////////////////////
/*
// We usually use 1000 separator , to read this 287,460,000,000
// We can insert _ in place of the comma in our code, JS will interpret
const diameter = 287_460_000_000;
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

// Underscore has to be between numbers, not beginning, end or beside decimal
const PI = 3.1415;
console.log(PI);

// Doesn't work if you use type coersion
console.log(Number('4_000'));
console.log(parseInt('230_142')); // ignores everything passed the _
*/
/////////////////////////////////////////////////
// Numeric Separators
/////////////////////////////////////////////////

/////////////////////////////////////////////////
// Remainder Operator
/////////////////////////////////////////////////
/*
console.log(5 % 2); // 5 = 2 * 2 + 1 // 1 is the remainder
console.log(8 % 3); // 8 = 2 * 3 + 2 // 2 is the remainder

// Simple isEven function, my version
const isEven = number => number % 2 === 0;

console.log(isEven(2));
console.log(isEven(3));
console.log(isEven(315));
console.log(isEven(4918));

//  Can paint every nth row using the remainder to evaluate what row you are on
labelBalance.addEventListener('click', () => {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
*/
/////////////////////////////////////////////////
// Remainder Operator
/////////////////////////////////////////////////

/////////////////////////////////////////////////
// Math and Rounding
/////////////////////////////////////////////////
/*
console.log(Math.sqrt(25)); // Square Root
console.log(25 ** (1 / 2)); // Square Root
console.log(8 ** (1 / 3)); // Cubic Root

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2)); // will do typeCoersion but will not parse

console.log(Math.min(5, 18, 23, 11, 2));

// area = PI * radius squared
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Generates a good random number between 0 and 1
// Math.Random number between 0 and 1
// Times by the number that you want and add 1 to make sure you are able to hit the max
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

// Round an integer
console.log(Math.trunc(23.3));

// Also rounds the integer either up or down
console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

// Works the same as trunc when dealing with negatives
console.log(Math.floor(23.3));
console.log(Math.floor(23.9));

console.log(Math.trunc(-23.4)); // Rounds to -23
console.log(Math.floor(-23.4)); // Rounds to -24 ** this is better practice

// Rounding floats
// toFixed with 0 will convert it to 3 and outputs as a String
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3)); // 3 decimal places
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2)); // Add a plus to convert it to a number
*/
/////////////////////////////////////////////////
// Math and Rounding
/////////////////////////////////////////////////

/////////////////////////////////////////////////
// Converting and Checking Numbers
/////////////////////////////////////////////////
/*
// numbers are stored in binary form and are all decimals
console.log(23 === 23.0);

// Base 10 - 0 to 9
// Binary base 2 - 0 1 (JavaScript)
// Cannot do scientific calculations in JavaScript
console.log(0.1 + 0.2);
console.log(3 / 10);

// This should be true but will never be true in JavaScript
console.log(0.1 + 0.2 === 0.3);

// Both of these will convert to a Number by doing type coercison
console.log(Number('23'));
console.log(+'23');

// We can also parse a number from a string
// You can have combination text/numbers and it will parse it as long as it starts with a number
console.log(Number.parseInt('30psi', 10));
// Doesn't work
console.log(Number.parseInt('psi345'));

// You can also parse a float
console.log(Number.parseFloat('2.5rem'));
// console.log(Number.parseInt('2.5rem')); this stops at the decimal since it's an int

console.log(Number.isNaN(20)); // False
console.log(Number.isNaN('20')); // False
console.log(Number.isNaN(+'20x')); // This is the only case that returns NaN that would return true
console.log(Number.isNaN(23 / 0)); // It won't consider Infinite values 23/0

// isFinite is a better way to see if you have a number
console.log(Number.isFinite(20)); // True
console.log(Number.isFinite('20')); // False
console.log(Number.isFinite(+'20x')); // False
console.log(Number.isFinite(23 / 0)); // False

// Check if you have an integer
console.log(Number.isInteger(23)); // True
console.log(Number.isInteger(23.0)); // True
console.log(Number.isInteger(23 / 0)); // False
*/
/////////////////////////////////////////////////
// Converting and Checking Numbers
/////////////////////////////////////////////////
