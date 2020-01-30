# MACROS
inQuotes[X]     -> "'" $X "'" {% quoted => quoted[1][0].join('') %}
KeywordArg[Key, Value] -> _ $Key "=" $Value


# MAIN
Main            -> (Comment | nl_ | Input):* Program (Comment | nl_):*

Program         -> FirstBlock
                 | Program DotBlock

FirstBlock      -> Flow

DotBlock        -> "." ("map" | "reduce" | "loop" | "catch") Flow
                 | ".branch(" FlowList ")"
                 | ".until(" _star BooleanLogic _star ")"

# Various flows
FlowList        -> ws Flow ws
                 | FlowList "," ws Flow ws
Flow            -> "(" FlowSteps:? ws ")"
FlowSteps       -> ws FlowStep
                 | FlowSteps ws FlowStep
FlowStep        -> Request | Parse | Comment | Tag


# COMMANDS
Input           -> "INPUT" _ inQuotes[Slug]

Tag             -> "TAG" _ inQuotes[Slug]

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
BooleanLogic    -> Any _ "==" _ Any
StringTemplate  -> inQuotes[[^'\n\r]:*]
Slug            -> [a-zA-Z0-9-]:+
Number          -> [0-9]:+
Boolean         -> "true" | "false"
Any             -> StringTemplate | Number | Boolean | Slug


# COMMENTS
Comment         -> "#" [^\n\r]:* nl {% () => "COMMENT" %}


# Whitespace. The important thing here is that the postprocessor
# is a null-returning function. This is a memory efficiency trick.
ws              -> [\s]:* {% () => null %}
_               -> " ":+ {% () => null %}
_star               -> " ":* {% () => null %}
nl              -> [\r\n] {% () => 'nl'%}
nl_             -> [\r\n] " ":* {% () => 'nl'%}
