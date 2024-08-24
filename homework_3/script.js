"use strict";

//task 1

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

//task 2

let number_1 = prompt("Number 1 : ");
let number_2 = prompt("Number 2 : ");
let operator = prompt("Enter operator : ");
easyCalculator(number_1, number_2, operator);
function easyCalculator(num1, num2, operator) {
  if (operator === "+") {
    console.log(num1 + num2);
  } else if (operator === "-") {
    console.log(num1 - num2);
  } else if (operator === "*") {
    console.log(num1 * num2);
  } else if (operator === "/") {
    console.log(num1 / num2);
  } else {
    console.log("Operator is unvalid!");
  }
}
