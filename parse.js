const { inspect } = require('util')
const nearley = require("nearley");
const fs = require('fs')
const grammar = require("./grammar.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
const input = fs.readFileSync('./input.txt')
parser.feed(input.toString());

// parser.results is an array of possible parsings.
console.log(inspect(parser.results, { depth: null })); // [[[[ "foo" ],"\n" ]]]
