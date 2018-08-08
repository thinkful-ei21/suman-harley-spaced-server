'use strict';


//unfinished
function updateQuestions(arr, correct, current) {
  //set current to point to next
  const newCurrent = arr[current].next;
  if (correct) {
    //double the value of memory 
    arr[current].memory = arr[current].memory * 2;
  } else {
    arr[current].memory = 1;
  }
  const newLocation = (current + arr[current].memory) % arr.length;
  const newArr = arr.slice(1);
  arr[0].attempts = arr[0].attempts + 1;
  if (correct) {
    arr[0].correct = arr[0].correct + 1;
  }
  newArr.push(arr[0]);
  return {
    newQuestions: arr,
    updatedQuestion: arr[0],
    newCurrent
  };
}

module.exports = updateQuestions;