var expect = require('chai').expect;

var bin = require("../bin");

describe("When pushing and popping bits", function() {
    it("should store and retrieve bits as expected", function(){
        console.dir(bin);
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
        console.dir(bin);
        var inp = new bin();
        inp.push(1);
        inp.push(1);
        inp.push(0);
        inp.push(1);
        
        var r = inp.extract(0,4);
        expect(r).to.deep.equal([1,1,0,1]);
    });

});

describe("When reversing a bitwise array", function() {
    it("should result in a reversal of the original input", function(){
        console.dir(bin);
        var inp = new bin();
        inp.push(1);
        inp.push(1);
        inp.push(0);
        inp.push(1);
        inp.reverse();

        expect(inp.extract(0,4)).to.deep.equal([1,0,1,1]);
    });
});


