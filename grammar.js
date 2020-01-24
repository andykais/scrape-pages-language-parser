// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main$ebnf$1", "symbols": []},
    {"name": "main$ebnf$1$subexpression$1", "symbols": ["comment"]},
    {"name": "main$ebnf$1$subexpression$1", "symbols": ["scrapeBlock"]},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "main$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["main$ebnf$1"]},
    {"name": "comment$ebnf$1", "symbols": []},
    {"name": "comment$ebnf$1", "symbols": ["comment$ebnf$1", /[^\n\r]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "comment", "symbols": [{"literal":"#"}, "comment$ebnf$1", "NL"], "postprocess": () => "COMMENT"},
    {"name": "scrapeBlock$ebnf$1", "symbols": []},
    {"name": "scrapeBlock$ebnf$1", "symbols": ["scrapeBlock$ebnf$1", "scrapeBlockMeat"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "scrapeBlock", "symbols": [{"literal":"("}, "NL", "scrapeBlock$ebnf$1", {"literal":")"}, "NL"], "postprocess": 
        steps => ({
           block: 'scrapeBlock',
           steps: steps
           .slice(2, steps.length - 2)[0]
           .filter(step => step)
        })
        },
    {"name": "scrapeBlockMeat$subexpression$1", "symbols": ["WSNL+"]},
    {"name": "scrapeBlockMeat$subexpression$1", "symbols": ["request"]},
    {"name": "scrapeBlockMeat$subexpression$1", "symbols": ["parse"]},
    {"name": "scrapeBlockMeat", "symbols": ["scrapeBlockMeat$subexpression$1"], "postprocess": 
        steps => 
           steps
           .filter(step => step)
           .map(step => step[0])[0]
        },
    {"name": "request", "symbols": ["httpVerb", "_", "url", "NL"], "postprocess":  ([[method], _, url]) => ({
          method,
          url
        })},
    {"name": "httpVerb$string$1", "symbols": [{"literal":"G"}, {"literal":"E"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "httpVerb", "symbols": ["httpVerb$string$1"]},
    {"name": "httpVerb$string$2", "symbols": [{"literal":"P"}, {"literal":"O"}, {"literal":"S"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "httpVerb", "symbols": ["httpVerb$string$2"]},
    {"name": "httpVerb$string$3", "symbols": [{"literal":"P"}, {"literal":"U"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "httpVerb", "symbols": ["httpVerb$string$3"]},
    {"name": "httpVerb$string$4", "symbols": [{"literal":"D"}, {"literal":"E"}, {"literal":"L"}, {"literal":"E"}, {"literal":"T"}, {"literal":"E"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "httpVerb", "symbols": ["httpVerb$string$4"]},
    {"name": "url$macrocall$2$ebnf$1", "symbols": [/./]},
    {"name": "url$macrocall$2$ebnf$1", "symbols": ["url$macrocall$2$ebnf$1", /./], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "url$macrocall$2", "symbols": ["url$macrocall$2$ebnf$1"]},
    {"name": "url$macrocall$1", "symbols": [{"literal":"'"}, "url$macrocall$2", {"literal":"'"}], "postprocess": quoted => quoted[1][0].join('')},
    {"name": "url", "symbols": ["url$macrocall$1"], "postprocess": data => data[0]},
    {"name": "parse$string$1", "symbols": [{"literal":"P"}, {"literal":"A"}, {"literal":"R"}, {"literal":"S"}, {"literal":"E"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "parse$ebnf$1$subexpression$1$string$1", "symbols": [{"literal":"A"}, {"literal":"T"}, {"literal":"T"}, {"literal":"R"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "parse$ebnf$1$subexpression$1", "symbols": ["_", "parse$ebnf$1$subexpression$1$string$1", "attrStr"]},
    {"name": "parse$ebnf$1", "symbols": ["parse$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "parse$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "parse", "symbols": ["parse$string$1", "_", "parseStr", "parse$ebnf$1", "NL"], "postprocess": 
        parser => ({
          command: 'PARSE',
          selector: parser[2],
          attr: parser[3]
        })
        },
    {"name": "parseStr$macrocall$2$ebnf$1", "symbols": []},
    {"name": "parseStr$macrocall$2$ebnf$1", "symbols": ["parseStr$macrocall$2$ebnf$1", /[^\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "parseStr$macrocall$2", "symbols": ["parseStr$macrocall$2$ebnf$1"]},
    {"name": "parseStr$macrocall$1", "symbols": [{"literal":"'"}, "parseStr$macrocall$2", {"literal":"'"}], "postprocess": quoted => quoted[1][0].join('')},
    {"name": "parseStr", "symbols": ["parseStr$macrocall$1"], "postprocess": data => data[0]},
    {"name": "attrStr$macrocall$2$ebnf$1", "symbols": []},
    {"name": "attrStr$macrocall$2$ebnf$1", "symbols": ["attrStr$macrocall$2$ebnf$1", /[^\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "attrStr$macrocall$2", "symbols": ["attrStr$macrocall$2$ebnf$1"]},
    {"name": "attrStr$macrocall$1", "symbols": [{"literal":"'"}, "attrStr$macrocall$2", {"literal":"'"}], "postprocess": quoted => quoted[1][0].join('')},
    {"name": "attrStr", "symbols": ["attrStr$macrocall$1"], "postprocess": data => data[0]},
    {"name": "WSNL$ebnf$1", "symbols": []},
    {"name": "WSNL$ebnf$1", "symbols": ["WSNL$ebnf$1", /[\s\n\r]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "WSNL", "symbols": ["WSNL$ebnf$1"], "postprocess": () => null},
    {"name": "WSNL+$ebnf$1", "symbols": [/[\s\n\r]/]},
    {"name": "WSNL+$ebnf$1", "symbols": ["WSNL+$ebnf$1", /[\s\n\r]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "WSNL+", "symbols": ["WSNL+$ebnf$1"], "postprocess": () => null},
    {"name": "_+$ebnf$1", "symbols": [/[\s]/]},
    {"name": "_+$ebnf$1", "symbols": ["_+$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_+", "symbols": ["_+$ebnf$1"], "postprocess": () => null},
    {"name": "_$ebnf$1", "symbols": [{"literal":" "}]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", {"literal":" "}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null},
    {"name": "NL", "symbols": [/[\n\r]/], "postprocess": () => 'NL'}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
