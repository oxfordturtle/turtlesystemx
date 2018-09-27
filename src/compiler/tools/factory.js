/*
factory for the language-specific parsers - creates objects for routines, constants, and variables;
using this module in the language-specific parsers ensures the same basic structure for the output
of the different parsers
*/

// create main program object
module.exports.program = (name, language) =>
  ({
    language,
    name,
    index: 0,
    indent: 0, // base level of indent, for Python routines only
    constants: [],
    variables: [],
    subroutines: [],
    lexemes: [],
    turtleAddress: null, // fixed later by the main parser module
    memoryNeeded: null // fixed later by the main parser module
  })

// create subroutine object
module.exports.subroutine = (name, type, parent) =>
  ({
    name,
    type, // "procedure|function"
    level: -1, // needed for the usage data table
    index: null, // set after initial construction
    indent: null, // Python only; set after initial construction
    globals: [], // Python only
    nonlocals: [], // Python only
    constants: [], // Pascal only
    parameters: [],
    variables: [],
    parent,
    subroutines: [],
    lexemes: [],
    memoryNeeded: null // fixed later by the main parser module
  })

// create constant object
module.exports.constant = (name, type, value) =>
  ({ name, type, value })

// create variable (and parameter) object
module.exports.variable = (lexeme, routine, byref = false) =>
  ({
    name: lexeme.content,
    lexeme, // keep this around in case type cannot be deduced and an error message is needed
    routine,
    byref: byref, // true only for parameters (potentially)
    index: null, // fixed later by the main parser module
    fulltype: null, // set after initial construction
    private: null // routine for private variables (BASIC only)
  })

module.exports.fulltype = (type, length = null, start = null, fulltype = null) =>
  (type === 'string')
    ? { type, length: 33, start, fulltype }
    : { type, length, start, fulltype }