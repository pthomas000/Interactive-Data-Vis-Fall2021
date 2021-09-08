// console.log('hello world');

// let accumulator = 1;

// // const clickCount = count = (accumulator, currentValue) => {
// //     return accumulator + currentValue;
// //     displayBoard.innerText = `Number of clicks: ${clickCount}`
// // }

// let displayBoard = document.getElementById("displayBoard");

// const clickCount = function count() {
//     let number = 1;
//     let accumulator;
//     return accumulator +1;
// }

// console.log(clickCount);

// const currentValue = count(previousValue); {
//     return previousValue + 1;
// }
// let previousValue = 0;

// const currentValue = function count(previousValue) {
//     return previousValue + 1;
// }

// document.getElementById("displayBoard").innerText = `${currentValue()}`;
// console.log(currentValue());


//Declaring button parameters, and then using anonymous function syntax

let button = document.getElementById("clickme"), count = 0;

button.onclick = function() { 
    count += 1;
    displayBoard.innerHTML = "Clicker Count: " + count;
};
