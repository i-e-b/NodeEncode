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

        it("should give `null` for negative inputs", function(){
            var output = fib.encode([0, -1, 0]);
            expect(output).to.be.null;
        });

        it("should resynchronise stream if input is damaged");
        /* Something like `fib.encode([...long string...])[0] |= 0xF000` -- the end of the `decode` output should be OK */
    });
});
