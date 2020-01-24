# MACROS
inQuotes[X] -> "'" $X "'" {% quoted => quoted[1][0].join('') %}


# MAIN
main -> (comment | scrapeBlock):*
# main -> comment scrapeBlock
comment -> "#" [^\n\r]:* NL {% () => "COMMENT" %}

# scrapeBlock -> "(" _ "GET" _ ")" WSNL
scrapeBlock -> "(" NL scrapeBlockMeat:* ")" NL {%
  steps => ({
     block: 'scrapeBlock',
     steps: steps
     .slice(2, steps.length - 2)[0]
     .filter(step => step)
  })
%}
scrapeBlockMeat -> (WSNL+ | request | parse) {%
  steps => 
     steps
     .filter(step => step)
     .map(step => step[0])[0]
%}

request -> httpVerb _ url NL {% ([[method], _, url]) => ({
  method,
  url
})%}
httpVerb -> "GET" | "POST" | "PUT" | "DELETE"
url -> inQuotes[.:+] {% data => data[0]%}

parse -> "PARSE" _ parseStr (_ "ATTR=" attrStr):? NL {%
  parser => ({
    command: 'PARSE',
    selector: parser[2],
    attr: parser[3]
  })
%}
parseStr -> inQuotes[[^\s]:*] {% data => data[0] %}
attrStr -> inQuotes[[^\s]:*] {% data => data[0] %}

# Whitespace. The important thing here is that the postprocessor
# is a null-returning function. This is a memory efficiency trick.

WSNL -> [\s\n\r]:* {% () => null %}
WSNL+ -> [\s\n\r]:+ {% () => null %}
# _ -> [\s]:*     {% () => null %}
_+ -> [\s]:+     {% () => null %}
_ -> " ":+ {% () => null %}
NL -> [\n\r] {% () => 'NL'%}
