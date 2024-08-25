const prompt = require("prompt-sync")();
const { getFruits, addFruit, deleteFruit } = require("./fruits");

console.log("1. არჩეული ხილების ჩამონათვალი");
console.log("2. ახალი ხილის დამატება");
console.log("3. ხილის სიიდან ამოშლა");

const choice = prompt("Please enter your choice: ");

if (choice === "1") {
  console.log(getFruits());
} else if (choice === "2") {
  const newFruit = prompt("შეიტანეთ ახალი ხილის სახელი: ");
  console.log(addFruit(newFruit));
} else if (choice === "3") {
  const fruitToDelete = prompt("შეიტანეთ წასაშლელი ხილის სახელი: ");
  console.log(deleteFruit(fruitToDelete));
} else {
  console.log("მოთხოვნილი მოქმედება ვერ მოიძებნა! ");
}
