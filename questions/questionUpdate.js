'use strict';


//unfinished
function updateQuestions(arr, correct, head) {
  //set current to point to next
  const newHead = arr[head].next;
  //set tail to wrap to new head
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current = arr[current].next;
  }
  arr[current].next = arr[head].next;
  arr[head].attempts = arr[head].attempts + 1;
  if (correct) {
    //double the value of memory 
    arr[head].memory = arr[head].memory * 2;
    arr[head].correct = arr[head].correct + 1;
  } else {
    arr[head].memory = 1;
  }
  //start at current(head)
  //track prev
  let prev = head;
  current = head;
  const m = arr[head].memory;
  //follow next m times
  //update next of previous and current
  for (let i = 0; i <= m; i++) {
    prev = current;
    current = arr[current].next;
  }

  arr[prev].next = head;
  arr[head].next = current;

  return {
    newQuestions: arr,
    updatedQuestion: arr[head],
    newHead
  };
}

// const questionArray = [
//   {
//     question: 'morning',
//     attempts: 0,
//     correct: 0,
//     next: 1,
//     memory: 1
//   },
//   {
//     question: 'night',
//     attempts: 0,
//     correct: 0,
//     next: 2,
//     memory: 1
//   },
//   {
//     question: 'hello',
//     attempts: 0,
//     correct: 0,
//     next: 3,
//     memory: 1
//   },
//   {
//     question: 'book',
//     attempts: 0,
//     correct: 0,
//     next: 4,
//     memory: 1
//   },
//   {
//     question: 'computer',
//     attempts: 0,
//     correct: 0,
//     next: 5,
//     memory: 1
//   },
//   {
//     question: 'ten',
//     attempts: 0,
//     correct: 0,
//     next: 6,
//     memory: 1
//   },
//   {
//     question: 'question',
//     attempts: 0,
//     correct: 0,
//     next: 7,
//     memory: 1
//   },
//   {
//     question: 'ocean',
//     attempts: 0,
//     correct: 0,
//     next: 8,
//     memory: 1
//   },
//   {
//     question: 'glasses',
//     attempts: 0,
//     correct: 0,
//     next: 9,
//     memory: 1
//   },
//   {
//     question: 'tea',
//     attempts: 0,
//     correct: 0,
//     next: 0,
//     memory: 1
//   }
// ];

// console.log(updateQuestions(questionArray, true, 0));

module.exports = updateQuestions;