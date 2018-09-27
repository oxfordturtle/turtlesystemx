/*
tokenizer for Turtle Python

splits code into lexemes and whitespace used by the code highlighting module and by the lexer
*/

module.exports = (code) => {
  let tokens = []
  while (code.length > 0) {
    let token = linebreak(code) ||
      spaces(code) ||
      comment(code) ||
      operator(code) ||
      punctuation(code) ||
      string(code) ||
      boolean(code) ||
      binary(code) ||
      octal(code) ||
      hexadecimal(code) ||
      decimal(code) ||
      keyword(code) ||
      command(code) ||
      turtle(code) ||
      colour(code) ||
      keycode(code) ||
      query(code) ||
      identifier(code) ||
      illegal(code)
    tokens.push(token)
    code = code.slice(token.content.length)
  }
  return tokens
}

// whitespace
const linebreak = (code) => {
  const test = (code[0] === '\n')
  return test ? { type: 'linebreak', content: '\n' } : false
}

const spaces = (code) => {
  const test = code.match(/^( +)/)
  return test ? { type: 'spaces', content: test[0] } : false
}

// comments
const comment = (code) => {
  const start = code.match(/^#/)
  if (start) return { type: 'comment', content: code.split('\n')[0] }
  return false
}

// operators
const operator = (code) => {
  const test = code.match(/^(\+|-|\*|\/\/|\/|%|==|!=|<=|>=|=|<|>|not\b|and\b|or\b|xor\b)/)
  return test ? { type: 'operator', content: test[0] } : false
}

// punctuation
const punctuation = (code) => {
  const test = code.match(/^(\(|\)|,|:)/)
  return test ? { type: 'punctuation', content: test[0] } : false
}

// string literals
const string = (code) => {
  const start1 = code[0] === '\''
  const start2 = code[0] === '"'
  const end1 = code.match(/[^\\](')/)
  const end2 = code.match(/[^\\](")/)
  if (start1 && end1) return { type: 'string', content: code.slice(0, end1.index + 2) }
  if (start1) return { type: 'unterminated-string', content: code.split('\n')[0] }
  if (start2 && end2) return { type: 'string', content: code.slice(0, end2.index + 2) }
  if (start2) return { type: 'unterminated-string', content: code.split('\n')[0] }
  return false
}

// boolean literals
const boolean = (code) => {
  const test = code.match(/^(True|False)\b/)
  return test ? { type: 'boolean', content: test[0] } : false
}

// integer literals
const binary = (code) => {
  const good = code.match(/^(0b[01]+)\b/)
  const bad = code.match(/^(%[01]+)\b/)
  if (good) return { type: 'binary', content: good[0] }
  if (bad) return { type: 'bad-binary', content: bad[0] }
  return false
}

const octal = (code) => {
  const good = code.match(/^(0o[0-7]+)\b/)
  const bad = code.match(/^(&[0-7]+)\b/)
  if (good) return { type: 'octal', content: good[0] }
  if (bad) return { type: 'bad-octal', content: bad[0] }
  return false
}

const hexadecimal = (code) => {
  const good = code.match(/^(0x[A-Fa-f0-9]+)\b/)
  const bad = code.match(/^((&|#|\$)[A-Fa-f0-9]+)\b/)
  if (good) return { type: 'hexadecimal', content: good[0] }
  if (bad) return { type: 'bad-hexadecimal', content: bad[0] }
  return false
}

const decimal = (code) => {
  const bad = code.match(/^(\d+\.\d+)/)
  const good = code.match(/^(\d+)\b/)
  if (bad) return { type: 'bad-decimal', content: bad[0] }
  if (good) return { type: 'decimal', content: good[0] }
  return false
}

// keywords
const keyword = (code) => {
  const test = code.match(/^(def|else|for|global|if|in|nonlocal|pass|range|return|while)\b/)
  return test ? { type: 'keyword', content: test[0] } : false
}

// native turtle commands
const command = (code) => {
  const test = code.match(/^(abs|acos|angles|antilog|asin|atan|back|blank|blot|boolint|box|canvas|chr|circle|colou?r|console|copy|cos|cursor|dec|detect|direction|divmult|drawxy|dump|ellblot|ellipse|exp|fill|find|forget|forward|heapreset|hex|home|hypot|inc|input|insert|int|intdef|keybuffer|keyecho|keystatus|left|len|ln|log10|lower|max|maxint|min|mixcols|movexy|newturtle|noupdate|oldturtle|ord|output|pause|pendown|penup|pi|pixcol|pixset|polygon|polyline|power|print|qstr|qval|randcol|randint|read|readline|recolour|remember|reset|resolution|rgb|right|root|setx|setxy|sety|sign|sin|sqrt|str|tan|thickness|time|timeset|trace|turnxy|update|upper|watch|write|writeline)\b/)
  return test ? { type: 'command', content: test[0] } : false
}

// built-in turtle property variables
const turtle = (code) => {
  const test = code.match(/^(turt[xydtc])\b/)
  return test ? { type: 'turtle', content: test[0] } : false
}

// native colour constants
const colour = (code) => {
  const test = code.match(/^(green|darkgreen|lightgreen|seagreen|greengrey|greengray|red|darkred|lightred|maroon|redgrey|redgray|blue|darkblue|lightblue|royal|bluegrey|yellow|ochre|cream|gold|yellowgrey|yellowgray|violet|indigo|lilac|purple|darkgrey|darkgray|lime|olive|yellowgreen|emerald|midgrey|midgray|orange|orangered|peach|salmon|lightgrey|lightgray|skyblue|teal|cyan|turquoise|silver|brown|darkbrown|lightbrown|coffee|white|pink|magenta|lightpink|rose|black)\b/)
  return test ? { type: 'colour', content: test[0] } : false
}

// native keycode constants
const keycode = (code) => {
  const test = code.match(/^(\\[#a-z0-9]+)/i)
  return test ? { type: 'keycode', content: test[0] } : false
}

// native query codes
const query = (code) => {
  const test = code.match(/^(\?[a-z]+)\b/)
  return test ? { type: 'query', content: test[0] } : false
}

// identifiers (i.e. variable, or subroutine names)
const identifier = (code) => {
  const test = code.match(/^([_a-zA-Z][_a-zA-Z0-9]*)\b/)
  return test ? { type: 'identifier', content: test[0] } : false
}

// illegal (anything that isn't one of the above)
const illegal = (code) =>
  ({ type: 'illegal', content: code.split(/\b/)[0] })
