// 1
for (let i = 1; i <= 100; i++) {
  if ((i % 3 === 0) & (i % 5 === 0)) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}

// 2

function factorialCalculator(number) {
  let result = 1;
  for (let i = number; i > 1; i--) {
    result *= i;
  }
  console.log(result);
}

factorialCalculator(3);

// 3

function capitalize(string) {
  let check = blankStringChecker(string);
  return check ? check : string.charAt(0).toUpperCase() + string.slice(1);
}

console.log(capitalize("merabi"));
// console.log(capitalize(""));

// 4

function blankStringChecker(testString) {
  return testString.trim().length
    ? "this string is not blank"
    : "this string is blank";
}

// console.log(blankStringChecker("sometestString"));
console.log(blankStringChecker(""));

// 5

let names = ["John", "Nick", "Bob", "Mary", "Bob", "Sue", "Ann", "Bob", "Bob"];

for (let i = names.length - 1; i >= 0; i--) {
  if (names[i] === "Bob") {
    names.splice(i, 1);
  }
}
console.log(names);

// other way without loop
let names2 = ["John", "Nick", "Bob", "Mary", "Bob", "Sue", "Ann", "Bob", "Bob"];
names2 = [...new Set(names2)];

let index = names2.indexOf("Bob");
names2.splice(index, 1);
console.log(names2);
