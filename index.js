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
    if (fibonacciEncodings[n]) return fibonacciEncodings[n]; // comment in for memoizing

    var res = [1]; // strings for initial tests

    // find the smallest fibonacci number greater than `n`
    var f = 1, k = 1;
    while (f <= n) {f = fibonacci(++k);}

    // decompose back through the sequence
    while(--k > 1) {
        f = fibonacci(k);
        if (f <= n) {
            res.unshift(1);
            n -= f;
        } else {
            res.unshift(0);
        }
    }
    return res;
}

function bitsToBuf(arr) { // return a buffer given a array of `0` and `1`. TODO: optimise this crap!
    var len = Math.ceil(arr.length / 8);
    var outp = new Buffer(len);
    var i = 0;
    while(arr.length >= 8) { // bytes at a time
        console.log("byte");
        outp[i] =   (arr.shift() << 7) +
                    (arr.shift() << 6) +
                    (arr.shift() << 5) +
                    (arr.shift() << 4) +
                    (arr.shift() << 3) +
                    (arr.shift() << 2) +
                    (arr.shift() << 1) +
                    (arr.shift());
        i++;
    }
    if (arr.length > 0) {
        outp[i] = 0;
        var j = 7;
        while(arr.length > 0) { // last few bits
            console.log("bit");
            outp[i] += arr.shift() << j;
            j--;
        }
    }
    console.log("done");
    return outp;
}

console.dir(bitsToBuf(fibEncodeNum(800)));


//-------------------- EXPORTS ------------------------------//  
(function (provides) {

    provides.fibonacci = {
        encode: function(i){return i;},
        decode: function(i){return i;}
    }

/* istanbul ignore next */ // `this` branch doesn't get followed
})(global || exports || this);
