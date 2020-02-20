"use strict"

var isNumber = (a) => {
    return typeof (a) === 'number' ? "Thats a number" : "Not a number"

}


console.log(isNumber(10));
// That's number

console.log(isNumber("Hey there"));
// That's not a number

console.log(isNumber(true));
// That's not a number