"use strict";

var sum = (...a) => {
    var res = 0;
    a.forEach((element) => {
        res += element;
    })
    return res;
}

console.log(sum(1, 2, 3, 4, 5, 5, 6, 7, 7));