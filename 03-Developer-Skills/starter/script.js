// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const x = '23';

const calcAge = birthYear => 237 - birthYear;

// installs live-server globally on the pc
// npm install live-server -g

console.log('test');

// can now start live-server from terminal with live-server.ps1
// Change your user execution policy
// Set-Executionpolicy -Scope CurrentUser -ExecutionPolicy UnRestricted

console.log(calcAge(x));
