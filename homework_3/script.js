"use strict";

const prompt = require("prompt-sync")();

const year = prompt("Enter the year: ");
yearChecker(year);

function yearChecker(year) {
  if (year < 0) {
    console.log(`${year} isn't a positive number!`);
  } else if (year % 4 === 0) {
    console.log(`${year} is Leap year!`);
  } else {
    console.log(`${year} isn't Leap year!`);
  }
}
