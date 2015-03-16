"use strict";
var global, exports;

(function (provides) {

    provides.fibonacci = {
        encode: function(i){return i;},
        decode: function(i){return i;}
    }

/* istanbul ignore next */ // `this` branch doesn't get followed
})(global || exports || this);
