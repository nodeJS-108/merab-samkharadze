"use strict";

function longestWordInString(string) {
  if (!string) {
    return "String is empty!";
  }
  const words = string.replace(/[^\w\s]/g, "").split(" "); // remove punctuation marks
  let longestWord = "";

  for (let word of words) {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }
  return longestWord;
}

module.exports = { longestWordInString };
