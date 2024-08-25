const fs = require("fs");

function getFruits() {
  const data = fs.readFileSync("fruits.json");
  const fruitsData = JSON.parse(data);
  return fruitsData.fruits;
}

function addFruit(newFruit) {
  const data = fs.readFileSync("fruits.json");
  const fruitsData = JSON.parse(data);

  if (newFruit && !fruitsData.fruits.includes(newFruit)) {
    fruitsData.fruits.push(newFruit);
    fs.writeFileSync("fruits.json", JSON.stringify(fruitsData, null, 2));
    return `${newFruit} has been added to the list.`;
  } else {
    return `Fruit already exists or invalid input.`;
  }
}

module.exports = { getFruits, addFruit };
