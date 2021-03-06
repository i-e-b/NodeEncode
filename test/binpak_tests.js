var expect = require('chai').expect;

var bin = require("../bin");

describe("When pushing and popping bits", function() {
    it("should store and retrieve bits as expected", function(){
        var inp = new bin();
        inp.push(1);
        inp.push(1);
        inp.push(0);
        inp.push(1);

        var r = [];
        r.push(inp.pop());
        r.push(inp.pop());
        r.push(inp.pop());
        r.push(inp.pop());

        expect(r).to.deep.equal([1,0,1,1]);
    });
    it("should extract bits in correct order", function(){
        var inp = new bin();
        inp.push(1);
        inp.push(1);
        inp.push(0);
        inp.push(1);

        var r = inp.extract(0,4);
        expect(r).to.deep.equal([1,1,0,1]);
    });
    it("should push arrays in the correct order", function(){
        var inp = new bin();
        inp.push([1,1,0,1]);

        var r = inp.extract(0,4);
        expect(r).to.deep.equal([1,1,0,1]);
    });
});

describe("When setting a bit",function(){
    it("should be able to set ones to zeros", function(){
        var inp = new bin();
        inp.push([1,1,1,1]);

        inp.set(2, 0);
        var r = inp.extract(0,4);
        expect(r).to.deep.equal([1,1,0,1]);
    });
    it("should be able to set ones to ones", function(){
        var inp = new bin();
        inp.push([1,1,1,1]);

        inp.set(2, 1);
        var r = inp.extract(0,4);
        expect(r).to.deep.equal([1,1,1,1]);
    });
    it("should be able to set zeros to ones", function(){
        var inp = new bin();
        inp.push([1,0,0,1]);

        inp.set(1,1);
        var r = inp.extract(0,4);
        expect(r).to.deep.equal([1,1,0,1]);
    });
    it("should be able to set zeros to zeros", function(){
        var inp = new bin();
        inp.push([1,0,0,1]);

        inp.set(1,0);
        var r = inp.extract(0,4);
        expect(r).to.deep.equal([1,0,0,1]);
    });
    it("should extend the container with zeros to accept the new position",function(){
        var inp = new bin();
        inp.push(1);

        inp.set(10,1);
        var r = inp.extract(0,11);
        expect(r).to.deep.equal([1,0,0,0,0,0,0,0,0,0,1]);
    });
});

describe("When reversing a bitwise array", function() {
    it("should result in a reversal of the original input", function(){
        var inp = new bin();
        inp.push(1);
        inp.push(1);
        inp.push(0);
        inp.push(1);
        inp.push(0);
        inp.push(0);
        inp.push(0);
        inp.push(0);
        inp.push(0);
        inp.push(1);
        inp.reverse();

        expect(inp.extract(0,10)).to.deep.equal([1,0,0,0,0,0,1,0,1,1]);
    });
    it("should reverse a string of zeros to a string of zeroes of the same length", function(){
        var inp = new bin();
        inp.push(0);
        inp.push(0);
        inp.push(0);
        inp.push(0);
        inp.push(0);
        inp.push(0);
        inp.push(0);
        inp.push(0);
        inp.push(0);
        inp.push(0);

        inp.reverse();

        expect(inp.extract(0,10)).to.deep.equal([0,0,0,0,0,0,0,0,0,0]);
    });
});


