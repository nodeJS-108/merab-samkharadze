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
    return `${newFruit} დაემატა წარმატებით! 👍`;
  } else {
    return `ხილის დამატება ვერ მოხერხდა! ☹️`;
  }
}

function deleteFruit(fruitToDelete) {
  const data = fs.readFileSync("fruits.json");
  const fruitsData = JSON.parse(data);

  const index = fruitsData.fruits.indexOf(fruitToDelete);
  if (index !== -1) {
    fruitsData.fruits.splice(index, 1);
    fs.writeFileSync("fruits.json", JSON.stringify(fruitsData, null, 2));
    return `${fruitToDelete} წაიშალა წარმატებით! 👍`;
  } else {
    return `${fruitToDelete} ხილის სიაში ვერ მოიძებნა! ☹️`;
  }
}

module.exports = { getFruits, addFruit, deleteFruit };
