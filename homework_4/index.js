const prompt = require("prompt-sync")();
const { getFruits, addFruit } = require("./fruits");

console.log("1. არჩეული ხილების ჩამონათვალი");
console.log("2. ახალი ხილის დამატება");

const choice = prompt("Please enter your choice: ");

if (choice === "1") {
  console.log(getFruits());
} else if (choice === "2") {
  const newFruit = prompt("შეიტანეთ ახალი ხილის სახელი: ");
  console.log(addFruit(newFruit));
  console.log("ხილი დაემატა წარმატებით! 👍");
} else {
  console.log("ხილის დამატება ვერ მოხერხდა! ☹️!");
}
