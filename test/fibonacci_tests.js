var expect = require('chai').expect;

var fib = require("../index.js").fibonacci;

describe("Using the fibonacci encoder", function() {
    describe("When encoding and decoding arrays of natural numbers", function() {
        it("should result in the original input after an encode and decode", function(){
            var input_array = [1,2,3,4,5,100, 200];
            var output = fib.decode(fib.encode(input_array));

            expect(output).to.equal(input_array);
        });

        it("should produce a single buffer as output", function(){
            var output = fib.encode([1,2,3]);

            expect(output).to.be.an.instanceof(Buffer);

        });
    });
});
