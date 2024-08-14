"use strict";

// 1

const myFncs = require("./mymodule");

let longestestword = myFncs.longestWordInString("Hello, world!");
console.log(longestestword);

// 2
// part 1
function stringToArray(testString) {
  if (!testString) {
    return "String is empty!";
  }
  const wordsArr = testString.replace(/[^\w\s]/g, "").split(" ");
  return wordsArr;
}

// part 2

function emailDefender(email) {
  if (!email) {
    return "The Email fild is empty!";
  }
  let userName = email.split(".")[0] + ".";
  let lengtOfUserName = email.split(".")[1].split("@")[0].length;
  let hiddenUserName = "";
  for (let i = 0; i < lengtOfUserName; i++) {
    hiddenUserName += ".";
  }
  return `${userName}${hiddenUserName}@gmail.com`;
}
let result3 = emailDefender("beqa.beqauri@gmail.com");
console.log(result3);
