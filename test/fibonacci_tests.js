var expect = require('chai').expect;

var fib = require("../index.js").fibonacci;

describe("Using the fibonacci encoder", function() {
    describe("When encoding and decoding arrays of natural numbers", function() {
        it("should result in the original input after an encode and decode", function(){
            var input_array = [1,2,3,4,5,100, 200];
            var output = fib.decode(fib.encode(input_array));

            expect(output).to.deep.equal(input_array);
        });

        it("should produce a single buffer as output", function(){
            var output = fib.encode([1,2,3]);

            expect(output).to.be.an.instanceof(Buffer);
        });

        it("should ignore zero or negative inputs", function(){
            var output = fib.decode(fib.encode([0, -1, 1, 0]));
            expect(output).to.deep.equal([1]);
        });

        it("should resynchronise stream if input is damaged", function(){
            var input = [100,200,300,200,100];
            var buf = fib.encode(input);
            buf[1] = buf[1] | 3; // break some bits -- add [1,1] into the middle of the first `200`

            var result = fib.decode(buf);
            expect(result[0]).to.equal(100); // first number OK
            expect(result.slice(-3,result.length)).to.deep.equal([300,200,100]); // rest of the undamaged numbers OK
        });
    });
});
