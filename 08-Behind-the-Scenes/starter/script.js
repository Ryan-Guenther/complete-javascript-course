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
