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

let currentAccount;

///
/// Receives an array of movements to populate in the UI
///
const displayMovements = function (movements) {
  // Empty the container first
  containerMovements.innerHTML = '';

  // Iterate through all the movements, getting the amount and the index
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // use template string to format the div the way you want
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    // afterbegin always appends to existing children
    containerMovements.insertAdjacentHTML('afterBegin', html);
  });
};

///
/// Calculates the current balance and displays it
/// Stores the current balance into the currentAccount
///
const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce((acc, mov) => acc + mov);
  account.balance = balance;
  labelBalance.textContent = `${balance}€`;
};

///
/// Calculates the summary of Depsoits, withdrawals and interest
///
const calcDisplaySummary = function (acc) {
  const deposits = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const withdrawals = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);

  // Pays 1.2% interest on deposits where the interest is > 1 Euro
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(dep => dep * (acc.interestRate / 100))
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumIn.textContent = `${deposits}€`;
  labelSumOut.textContent = `${withdrawals}€`;
  labelSumInterest.textContent = `${interest}€`;
};

///
/// Create Usernames for all of the accounts
///
const createUsernames = function (accs) {
  // Doing the forEach so we trigger a SideEffect of mutating the original array
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

///
/// Refresh the UI for an account
///
const refreshUIElements = function (account) {
  // Display Movements
  displayMovements(account.movements);

  // Display Balance
  calcDisplayBalance(account);

  // Display Summary
  calcDisplaySummary(account);
};

///
/// Attempt to login the current user
///
const loginUser = function (event) {
  // need this to prevent the default behavior of button on a form
  this && event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin == Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();

    // Refresh Transfers, Summary and Balance
    refreshUIElements(currentAccount);
  }
};

///
/// Transfers funds from current account to a new account
/// Cannot send to an invalid account
/// Cannot send a negative value
/// Cannot send more then is in the account
///
const transferFunds = function (event) {
  // Also in a form so neeed to do this to prevent refresh
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Add the amount to the target account as well as ensure that the amount is positive and not greater than balance
  if (
    receiverAcc &&
    receiverAcc?.username !== currentAccount.username &&
    amount > 0 &&
    amount <= currentAccount.balance
  ) {
    receiverAcc.movements.push(amount);
    currentAccount.movements.push(-amount);

    // Clear Inputs
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
    inputTransferTo.blur();

    // Refresh Transfers, Summary and Balance
    refreshUIElements(currentAccount);
  }
};

const logoutUser = function () {
  // Logout the user
  labelWelcome.textContent = 'Log in to get started';
  containerApp.style.opacity = 0;
  currentAccount = '';
};

///
/// We need to remove the account from the account array
/// UserName needs to match and PIN needs to match
const closeAccount = function (event) {
  event.preventDefault();

  const closeUsername = inputCloseUsername.value;
  const closePIN = Number(inputClosePin.value);

  if (
    closeUsername === currentAccount.username &&
    closePIN === currentAccount.pin
  ) {
    const accIndex = accounts.findIndex(acc => acc.username === closeUsername);
    accounts.splice(accIndex, 1);

    // Empty the fields
    inputCloseUsername.value = inputClosePin.value = '';

    // Logout the user
    logoutUser();
  }
};

/// For the loan to be approved there needs to be a deposit > 10% of the loan amount
const requestLoan = function (event) {
  event.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.movements
      .filter(mov => mov > 0)
      .some(mov => mov >= loanAmount * 0.1)
  ) {
    currentAccount.movements.push(loanAmount);
    inputLoanAmount.value = '';
    inputLoanAmount.blur();

    refreshUIElements(currentAccount);
  }
};

// Add Event Listeners
btnLogin.addEventListener('click', loginUser.bind(btnLogin));
btnTransfer.addEventListener('click', transferFunds.bind(btnTransfer));
btnClose.addEventListener('click', closeAccount.bind(btnClose));
btnLoan.addEventListener('click', requestLoan.bind(btnLoan));

// Call required functions
createUsernames(accounts);

// Automate login for testing
// (inputLoginUsername.value = 'js'), (inputLoginPin.value = 1111);
// loginUser();

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
-------------------------------------------------
flat and flatMap
-------------------------------------------------
*/

// flat, completely flattens a nested array one level deep only
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

// two level array won't get flattened unless you pass in the number of nesting
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// here we can map just account movements to a new array and then flatten them
const accountMovmements = accounts.map(acc => acc.movements).flat();
console.log(accountMovmements);

const overallBalance = accountMovmements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// Using flat and map seperatly
const cleanerBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov);

console.log(cleanerBalance);

// You can use flatMap as they combine flat and map

const flatMapBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(flatMapBalance);

/*
-------------------------------------------------
flat and flatMap
-------------------------------------------------
*/

/*
-------------------------------------------------
some and every function
-------------------------------------------------

// some
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Includes return true if any value is exaclty equal to -130
console.log(movements.includes(-130));

// If we want to test for condition we can do some
const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

// every
// only returns true if all elements satisfy the condition
console.log(account4.movements.every(mov => mov > 0));

// Separate callback that we would pass into a method
const deposit = mov => mov > 0;
console.log(account4.movements.some(deposit));
console.log(account4.movements.every(deposit));
console.log(account4.movements.filter(deposit));


-------------------------------------------------
some and every function
-------------------------------------------------
*/

/*
-------------------------------------------------
The findIndex Method
Returns index of the found element, not the value itself
-------------------------------------------------
*/

// To delete something from an array ou need the index

/*
-------------------------------------------------
The findIndex Method
Returns index of the found element, not the value itself
-------------------------------------------------
*/

/*
-------------------------------------------------
The Find Method
Returns the first element that satisfies a comparison
-------------------------------------------------


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find(mov => mov < 0);

console.log(firstWithdrawal);

console.log(accounts);

const jdAccount = accounts.find(account => account.username === 'jd');

console.log(jdAccount);

// Same logic using the ForOf loop
let jdAccountForOf;
for (const acc of accounts) {
  if (acc.username === 'jd') {
    jdAccountForOf = acc;
    continue;
  }
}

console.log(jdAccountForOf);


-------------------------------------------------
The Find Method
-------------------------------------------------
*/

/*
-------------------------------------------------
Coding Challenge #3

Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time 
as an arrow function, and using chaining!
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
-------------------------------------------------


const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, _, arr) => acc + age / arr.length, 0);
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);


-------------------------------------------------
Coding Challenge #3
-------------------------------------------------
*/

/*
-------------------------------------------------
Chaining Methods
As long as each method contains an array you can chain another after
you can't chain an array after reduce cause you are left with a single value
-------------------------------------------------

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * eurToUsd)
  // You can do this to debug the arrays in the chain by accessing current array in next method
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);


-------------------------------------------------
Chaining Methods
-------------------------------------------------
*/

/*
-------------------------------------------------
Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert 
dog ages to human ages and calculate the average age of the dogs in their study.

Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's 
ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is 
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, 
humanAge = 16 + dogAge * 4

2. Exclude all dogs that are less than 18 human years old (which is the same as 
keeping dogs that are at least 18 years old)

3. Calculate the average human age of all adult dogs (you should already know 
from other challenges how we calculate averages �)

4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]

-------------------------------------------------


const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

  console.log(humanAges);

  const adultAges = humanAges.filter(age => age >= 18);
  console.log(adultAges);

  // const averageAdultAge =
  //   adultAges.reduce((acc, age) => acc + age, 0) / adultAges.length;

  const averageAdultAge = adultAges.reduce(
    (acc, age, _, arr) => acc + age / arr.length,
    0
  );

  return averageAdultAge;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);


-------------------------------------------------
Coding Challenge #2
-------------------------------------------------
*/

/*
-------------------------------------------------
Reduce Method
-------------------------------------------------


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// accumulator, current value, index, array
// need to return the new value of the accumulator

// const total = movements.reduce((acc, curr, i, arr) => {
//   console.log(`Iteration ${i}: ${acc} + ${curr}`);
//   return acc + curr;
//   // 0 is the starting value of the accumulator, this is optional
// }, 0);

const total = movements.reduce((acc, curr) => acc + curr);
console.log(total);

// Maximum value of the movments array using reduce
// default value should always be first value of the array if you do this
const max = movements.reduce(
  (acc, curr) => (acc < curr ? curr : acc),
  movements[0]
);
console.log(max);

-------------------------------------------------
Reduce Method
-------------------------------------------------
*/

/*
-------------------------------------------------
Filter Method
-------------------------------------------------


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

// same logic with a for of loop
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);


-------------------------------------------------
Filter Method
-------------------------------------------------
*/

/*
-------------------------------------------------
Map Method
-------------------------------------------------

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Convert the movements to USD
const eurToUsd = 1.1;

// This could be an arrow function
// const movementsUSD = movements.map(function (movement) {
//   return movement * eurToUsd;
// });

// Simple arrow function callback
const movementsUSD = movements.map(movement => movement * eurToUsd);

// // Doing the same thing with for of loop
// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

console.log(movementsUSD);

// Map has all three parameters (value, index, array)
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);


-------------------------------------------------
Map Method
-------------------------------------------------
*/

/*
-------------------------------------------------
Data Transformations map, filter, reduce
-------------------------------------------------
*/

// map - Takes an array, loops over it and applies callback to each element
//        Makes a new Array (Maps from existing array to new array)

// filter - filters for elements that satisfy a specific condition
//        Returns a new array with the applied filter criteria

// reduce - boil down elements of an original array to one single value
//        would make an accumulator and add the current element to it and will //
//        keep building off that

/*
-------------------------------------------------
Data Transformations map, filter, reduce
-------------------------------------------------
*/

/*
-------------------------------------------------
Coding Challenge #1

Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners 
about their dog's age, and stored the data into an array (one array for each). For 
now, they are just interested in knowing whether a dog is an adult or a puppy.

A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years 
old.

Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have 
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat 
ages from that copied array (because it's a bad practice to mutate function 
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 
�
")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
-------------------------------------------------

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice(1, -2);
  const allDogs = dogsJulia.concat(dogsKate);
  console.log(dogsJulia, dogsJuliaCorrected);
  console.log(allDogs);
  allDogs.forEach(function (age, i) {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

-------------------------------------------------
Coding Challenge #1
-------------------------------------------------
*/

/*
-------------------------------------------------
forEach with Maps and Sets
-------------------------------------------------


// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// Also has three parameters value, the index and the full map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR', 'CAD']);

// sets don't have keys or indexes so value and key will return the same
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}: ${value}`);
});


-------------------------------------------------
forEach with Maps and Sets
-------------------------------------------------
*/

/*
-------------------------------------------------
Looping Arrays forEach
-------------------------------------------------


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
