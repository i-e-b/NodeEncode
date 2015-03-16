"use strict";
var global, exports;


//-------------------- FIBONNACI ------------------------------//
var fibonacciSeq = [0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765,10946,17711,28657,46368,75025,121393,196418];
function fibonacci (n) {
    if (fibonacciSeq.length > n) { return fibonacciSeq[n]; } 
    var res = fibonacci(n-2) + fibonacci(n-1);
    fibonacciSeq.push(res);
    return res;
}

var fibonacciEncodings = {};
function fibEncodeNum(n) {
    if (n < 1) return null;
    //if (fibonacciEncodings[n]) return fibonacciEncodings[n]; // comment in for memoizing

    var res = "1"; // strings for initial tests

    // find the smallest fibonacci number greater than `n`
    var f = 1, k = 1;
    while (f <= n) {f = fibonacci(++k);}

    // decompose back through the sequence
    while(--k > 1) {
        f = fibonacci(k);
        if (f <= n) {
            res = "1"+res;
            n -= f;
        } else {
            res = "0"+res;
        }
    }
    return res;
}


//-------------------- EXPORTS ------------------------------//  
(function (provides) {

    provides.fibonacci = {
        encode: function(i){return i;},
        decode: function(i){return i;}
    }

/* istanbul ignore next */ // `this` branch doesn't get followed
})(global || exports || this);
