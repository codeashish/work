"use strict";
var sum = (...a) => {
    var res = 0;
    for (var i = 0; i < a.length; i++) {
        res += a[i];
    }
    return res;
}

console.log(sum(1, 2, 3));