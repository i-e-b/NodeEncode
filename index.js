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
// take a single number and return an array encoding of the fibonacci code. Returns null on error
function fibEncodeNum(n) {
    if (n < 1) return null;
    if (fibonacciEncodings[n]) return fibonacciEncodings[n]; // comment in for memoizing

    var res = [1];

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

// take an array encoding of a fibonacci code and return a single number. Final `1` must have been removed. Returns null on error
function fibDecodeNum(arr) {
    if (arr.length < 1 || arr.slice(-1)[0] != 1) return null; //badly encoded
    return arr.reduce(function(prev, curr, idx) {
        return prev + (curr * fibonacci(idx+2));
    }, 0);
}

function bitsToBuf(arr) { // return a buffer given a array of `0` and `1`. TODO: optimise this crap!
    var len = Math.ceil(arr.length / 8);
    var outp = new Buffer(len);
    var i = 0;
    while(arr.length >= 8) { // bytes at a time
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
            outp[i] += arr.shift() << j--;
        }
    }
    return outp;
}

// convert a buffer to an array of `0` and `1`
function bufToBits(buf) {
    var outp = [];
    for (var n = 0; n < buf.length; n++) {
        outp.push((buf[n] & (1<<7)) >> 7);
        outp.push((buf[n] & (1<<6)) >> 6);
        outp.push((buf[n] & (1<<5)) >> 5);
        outp.push((buf[n] & (1<<4)) >> 4);
        outp.push((buf[n] & (1<<3)) >> 3);
        outp.push((buf[n] & (1<<2)) >> 2);
        outp.push((buf[n] & (1<<1)) >> 1);
        outp.push((buf[n] & (1   ))     );
    }
    return outp;
}

// array of num into buffer
function fibEncodeArray(arr) {
    return bitsToBuf(Array.prototype.concat.apply([], arr.map(fibEncodeNum)));
}

// buffer into array of num
function fibDecodeBuffer(buf) {
    var arr = bufToBits(buf);
    if (arr.length < 1) return [];
    var outp = [];
    // scan through looking for [1,1]. Decode left and repeat. last bits may not have the [1,1] marker and should be ignored
    var left = 0, right = 0, len = arr.length, prev = 0;
    while (right < len) {
        if (arr[right] > 0 && prev > 0) { // got a match
            outp.push(fibDecodeNum(arr.slice(left, right)));
            left = right + 1;
            right++;
        }
        prev = arr[right];
        right++;
    }
    return outp;
}

console.log(JSON.stringify(fibDecodeBuffer(fibEncodeArray([1,2,3,4,3,2,1]))));
/*
var original = 1547;
var e = fibEncodeNum(original);
console.log(original + " --> " + e.length + " bits to encode");
console.log(JSON.stringify(e));
var b = bitsToBuf(e);
console.log(JSON.stringify(b));
var x = bufToBits(b).slice(0, e.length-1);
console.log(JSON.stringify(x));
var de = fibDecodeNum(x);
console.log(JSON.stringify(de));
*/


//-------------------- EXPORTS ------------------------------//  
(function (provides) {

    provides.fibonacci = {
        /** Encode an array of numbers into a buffer */
        encode: fibEncodeArray,
        /** Decode a buffer into an array of numbers */
        decode: fibDecodeBuffer
    }

/* istanbul ignore next */ // `this` branch doesn't get followed
})(global || exports || this);
