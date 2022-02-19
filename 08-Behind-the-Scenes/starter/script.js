'use strict';

/*

JavaScript Definition breakdown

*/

// High Level Language
// Do not need to manage resources as there are abstractions
// These are not as optimized as low level

// Garbage Collection
// CLeans up memory automatically

// Interpreted or just in time compiled
// Conversion happens in the javascript engine

// Multi-paradigm
// Paradigm - approach/mindset of structuring code
// Procedural, Object Oriented, or Functional

// Prototype-based object-oriented
// Everything is an object, arryas are created from array template(prototype) which has all the blueprint methods

// First-class functions
// FUnctions are treated as varriables, can pass in functions and return them from functions

// Dynamically typed language
// No data type definitions, data types on variables can be changed on the fly
// Look into typescript for javascript with types

// Single-threaded
// Non-blocking event loop

// Concurrency model
// how javascirpt handles multiple tasks happening at the same time
// Since javascript runs ina  single thread it can only do one thing at a time
// By using an event loop and runnign long running tasks in the background and pushes them back on the main thread when they are finished

/*

JavaScript Engine and Runtime

*/

// Engine is a program that executes JavaScript code
// Google v8 engine powers Google Chrome and Node.js
// Other browsers have other engines that power JavaScript

// Engine is made up of the Call Stack and the Heap
// Call Stack - Execution context
// Heap - where objects are stored in memory

// Compliation - Entire code is converted into machine code at once and written to a binary file that can be executed by a computer
// With this execution can happen way after the compliation has occured

// Interpretation - Interpreter runs through the source cod eand executes it line by line
// Source code gets converted right before execution
// JavaScript used to be purely Interpreted but that caused performance issue
// Modern Engines use a mix of Compilation and Interpretation using Just in time Compilation

// Parsing - Code is parsed (Into AST Abstract Syntax Tree)

// Compilation - Generated AST is compiled into Machine Code

// Execution - Machine code is executed right away (Because of Just in Time compliation)

// **Note Optimization is being performed during execution, starts up poorly optimized and then the compilation is replaced in real time as the code is executed

// JavaScript Runtimme in the Browser

// Engine (Heap, Call Stack)

// WEB APIs (DOM, Timers, Fetch API, ...) - Functionallity provided to the engine on the window object

// Callbaack Queue (Click, Timer, Data, ...) - event handlers are callback functions

// Event loop takes functions from the Callback Queue and puts them into the Call Stack

// Javascript can exist outside of browsers in Node.js

// In this case you don't have WEB APIs
// Instead you have C++ BINDINGS & Thread Pool

/*

Execution contexts and the call stack

*/

// Global execution context is created for top-level code
// This is only code that is not inside a function (Functions are only executed when they are called)

// Variables and Functions will be declared in the Global Execution Context

// The execution context is basically an environment in which a peice of JavaScript will be executed

// There is only ever one global execution context (EC) for code that is not in a function

// Once the Global EC hass been created it is Executed

// Once that has been completed the functions will create an execution context per function, as well as waiting for callbacks

// When all functions are done executing in the call stack, the engine waits for new functions to execute

// Inside an execution context we have the following
// 1) Variable environment (let, const and var) && (functions) && (Arguments object)
// 2) Scope chain (Consists of references to varaibles outside the current function, stored in each EC)
// 3) this keyword
// Arrow functions do not get an arguments object or a this keyword, they use arguments/this from the closest parent

/*

Scope and Scope Chain 

*/

// Scoping - How our variables are organized and access

// Lexical Scoping -  Scoping is controlled by the placement of functions and blocks in the code

// Scope - Space or environment in which a certain variable is declared
// global scope // function scope // block scope

// Scope of a variable - the region of our code where a varialbe can be accessed

// Global Scope
// Top level code
// Variables declared otuside any function or block, they are accessible everywhere

// Function Scope
// Any variables declared in a function
// Also called local scope

// Block Scope
// Block is anything between { } // If Statements or FOR statements
// Only let/const variables are restricted to the block
// Variables declared with var are not block scope and would go up to the Function/Global Scope

// Functions are block scoped as well

// Example of scope types

/*

// Global Scoped
const myName = 'Ryan';

// Global Scoped
function first() {
  // local/function scope
  const age = 38;

  if (age >= 30) {
    // block scope
    const decade = 3;
    // local/function scope
    var millenial = true;
  }

  // Function scoped
  function second() {
    // function scoped
    const job = 'teacher';

    console.log(`${myName} is a ${age}-old ${job}`);
  }

  second();
}

first();

*/

/* Scope Chain vs Call Stack */

// Scope chain gets the context based on the way it was written
// Not based on the order that it is called
// For the above exaample for second() to have access to age it needs to be neseted in first() function

/* 

Scoping in Practice

*/

/*

// Global Scoped Function
function calcAge(birthYear) {
  // Function Scope created here
  const age = 2022 - birthYear;
  // console.log(firstName);

  function printAge() {
    // Is able to walk up to the function scope and global scope to access these variables
    const output = `${firstName} are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      //New Block Scope here

      // You can re-declare variables in a child scope
      const firstName = 'NotRyan';

      const str = `Oh, and you're a millenial, ${firstName}`;
      var millenial = true;
      console.log(str);

      // this is also block scoped in strict mode
      function add(a, b) {
        return a + b;
      }
    }

    // const and let are block scoped cannot access here
    // console.log(str);

    // Var are function scoped they ignore block scoping
    console.log(millenial);

    // if strict mode was not enabled this would work
    // add(2, 3);
  }

  printAge();

  return age;
}

//Global scoped first name
const firstName = 'Ryan';
calcAge(1984);
// Cannot access child scopes
//console.log(age);
//printAge();

*/

/*

Hoisting in javascript
makes variables accessible/usable in the code before they are declared
"Lifted to the top of their scope"

*/

// Code is scanned for variable declarations and creates a new property

// function declarations
// Hoisted = True
// Initial Value = Actual Function
// Scope = Block

// var variables
// Hoisted = Yes
// Initial Value = undefined // This can cause bugs
// Scope = Function

// let and const
// Hoisted = No
// Initial Value = <uninitialized>, TDZ (Temporal Dead Zone)
// Scope = Block

// function expressions and arrows
// Hoisted =
// Initial Value = Depends if using var or let/const
// Scope =

// Temporal Dead Zone, Let and Const

// Region of the scope before the variable is defined, you will get ReferenceErrors if you try to access prior to definition
// Cannot access before intialization
// If you don't have definition the ReferenceError is is not defined

// Hoisting was implemented to allow to use functions before actual declaration
// This helps make code more variable
// Had to work with Var to make it work at the time

/* Hoisting and TDZ in Practice */

/*

// Hoisting with Varaibles

//undefined
console.log(me);
//cannot access before initialization
// console.log(job);
//cannot access before initialization
//console.log(year);
//This is not defined
//console.log(whatsThis);

var me = 'Ryan';
let job = 'developer';
const year = 1991;

// Hoisting with Functions

// Can access and use before declaration
console.log(addDecl(2, 3));

// cannot access before initialzation
//console.log(addExpr(4, 3));

// this is undefined so it cannot be accessed as funciton
//console.log(addArrow(1, 2));

// This is the only function you can use before it is declared
function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Example

// right now numProducts is undefined because of hosting var allowing execution
if (!numProducts) deleteShoppingCard();

var numProducts = 10;

function deleteShoppingCard() {
  console.log('All products are deleted!');
}

// Var gets created as a property on the window object
var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

*/

/*

The This Keyword

*/

// Created for every execution context (every function)

// Points to the owner of the function

// the value of this is not static, it depends on how the function is called and only assigned when the function is called

// Four different ways to call a function

// Call as Method
// this = object that is calling the method

/*
  const jonas = {
    name: 'Jonas',
    year: 2989,
    calcAge: function () {
      // In this case this === jonas
      return 2037 - this.year;
    },
  };

  jonas.calcAge();
    */
// Simple function call
// this = undefined -- Strict mode
// without strict is the global object

// Arrow fnction call
// this = this of surrounding function
// doesn't get it's own this keyword

// Event Listener
// this = dom element that the handler is attached to

// This will never point to the function itself or the variable environment

// This is the Window
// console.log(this);

/*

const calcAge = function (birthYear) {
  console.log(2022 - birthYear);
  // This is undefined
  console.log(this);
};

// calcAge(1984);

const calcAgeArrow = birthYear => {
  console.log(2022 - birthYear);
  // Because this is an arrow function and doesn't get it's own this, it  uses lexical this (window in this case - this in global scope)
  console.log(this);
};

// calcAgeArrow(1984);

const ryan = {
  year: 1984,
  calcAge: function () {
    //Returns the object calling the method
    // if this is copied into another object it will be the object it is being called in
    console.log(this);
    console.log(2022 - this.year);
  },
};

ryan.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = ryan.calcAge;

matilda.calcAge();

// Copy the function into a new variable
const f = ryan.calcAge;

// This is now a regular funciton call, no owner and this is undefined
// f();

*/

// this creates the variable on the window and now is accessible from this
var firstName = 'Lindsey';

const ryan = {
  firstName: 'Ryan',
  year: 1984,
  calcAge: function () {
    console.log(this);
    console.log(2022 - this.year);

    // you can create a variable to hold this so you can use it in child functions
    // This is the pre-es6 solution **Solution 1
    // const self = this;
    // const isMillenial = function () {
    //   // now this is undefined cause we are in a function not being called as a method
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // ES6 Solution
    // Arrow function won't get it's own this keyword
    const isMillenial = () => {
      // now this is undefined cause we are in a function not being called as a method
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillenial();
  },
  // Arrow function uses the parent, the object is not a code block so it goes to global from here
  greet: () => {
    console.log(`Hey ${this.firstName}`);
    console.log(this);
  },
};

ryan.greet();
ryan.calcAge();

// Arguments Keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
//you could pass more agruments then exepcted
// You could iterate through them as an array
addExpr(2, 5, 7);

var addArrow = (a, b) => {
  //more then one line of code need explicit return
  //no arguments for arrow function
  //console.log(arguments);
  return a + b;
};

addArrow(1, 3);
