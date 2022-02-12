// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/*

const x = '23';

const calcAge = birthYear => 237 - birthYear;

// installs live-server globally on the pc
// npm install live-server -g

console.log('test');

// can now start live-server from terminal with live-server.ps1
// Change your user execution policy
// Set-Executionpolicy -Scope CurrentUser -ExecutionPolicy UnRestricted

console.log(calcAge(x));

*/

//Problem:
/*
We work for a company building a samrt home thermometer.  our most recent task is this:

Given an array of temperatures of one day, calcuate the temperature amplitude.  

Keep in mind that sometimes there might be a sensor error.
*/

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

const calcTempAmplitude = function (temps) {
  // Temperature Amplitude = A = Tmax - Tmin
  let tMax, tMin;

  for (let i = 0; i < temps.length; i++) {
    // On error continue
    if (temps[i] === 'error') continue;

    // First iteration set values
    if (!tMax && !tMin) {
      tMax = tMin = temps[i];
      continue;
    }

    // Update max/min values when we find a new max or min
    if (temps[i] > tMax) tMax = temps[i];
    if (temps[i] < tMin) tMin = temps[i];
  }

  // console.log(tMax);
  // console.log(tMin);

  return tMax - tMin;
};

console.log(`The temperater amplitude is ${calcTempAmplitude(temperatures)}`);

// Problem 2, now function gets two arrays of integers

// merge the arrays then process

const t1 = [3, 5, 1];
const t2 = [9, 0, 5];

const calcTempAmplitudeNew = function (temps1, temps2) {
  // Merge the arrays, use concat
  const temps = temps1.concat(temps2);

  // Temperature Amplitude = A = Tmax - Tmin
  let tMax, tMin;

  for (let i = 0; i < temps.length; i++) {
    // On error continue
    if (temps[i] === 'error') continue;

    // First iteration set values
    if (!tMax && !tMin) {
      tMax = tMin = temps[i];
      continue;
    }

    // Update max/min values when we find a new max or min
    if (temps[i] > tMax) tMax = temps[i];
    if (temps[i] < tMin) tMin = temps[i];
  }

  // console.log(tMax);
  // console.log(tMin);

  return tMax - tMin;
};

console.log(`The temperater amplitude is ${calcTempAmplitudeNew(t1, t2)}`);
