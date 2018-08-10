'use strict';

function updateQuestions(arr, correct) {
  const newArr = arr.slice(1);
  arr[0].attempts = parseInt(arr[0].attempts) + 1;
  if (correct) {
    arr[0].correct = parseInt(arr[0].correct) + 1;
  }
  newArr.push(arr[0]);
  return {
    newQuestions: newArr,
    updatedQuestion: arr[0]
  };
}

module.exports = updateQuestions;