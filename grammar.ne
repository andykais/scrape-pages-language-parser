# MACROS
inQuotes[X]     -> "'" $X "'" {% quoted => quoted[1][0].join('') %}
KeywordArg[Key, Value] -> _ $Key "=" $Value


# MAIN
Main            -> (Comment | nl_):* Program (Comment | nl_):*

Program         -> FirstBlock
                 | Program DotBlock

FirstBlock      -> Flow

DotBlock        -> "." ("map" | "reduce" | "loop") Flow
                 | ".branch(" FlowList ")"

# Various flows
FlowList        -> ws Flow ws
                 | FlowList "," ws Flow ws
Flow            -> "(" FlowSteps:? ws ")"
FlowSteps       -> ws FlowStep
                 | FlowSteps ws FlowStep
FlowStep        -> Request | Parse | Comment | Input | Tag


# COMMANDS
Input           -> "INPUT" _ Slug

Tag             -> "TAG" _ Slug

Request         -> HttpVerb _ Url
                   (KeywordArg["READ", Boolean]
                    | KeywordArg["WRITE", Boolean]):* nl
HttpVerb        -> "GET" | "POST" | "PUT" | "DELETE"
Url             -> StringTemplate

Parse           -> "PARSE" _ Selector
                   (KeywordArg["ATTR", Attribute]
                    | KeywordArg["MAX", Number]):* nl
Selector        -> StringTemplate
Attribute       -> StringTemplate


# PRIMITIVES
StringTemplate  -> inQuotes[[^'\n\r]:*]
Slug            -> inQuotes[[a-zA-Z0-9-]:*]
Number          -> [0-9]:+
Boolean         -> "true" | "false"


# COMMENTS
Comment         -> "#" [^\n\r]:* nl {% () => "COMMENT" %}


# Whitespace. The important thing here is that the postprocessor
# is a null-returning function. This is a memory efficiency trick.
ws              -> [\s]:* {% () => null %}
_               -> " ":+ {% () => null %}
nl              -> [\r\n] {% () => 'nl'%}
nl_             -> [\r\n] " ":* {% () => 'nl'%}
