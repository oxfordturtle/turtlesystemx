const create = require('../../dom/create');
const highlight = require('../../languages/highlight');
const session = require('../../state/session');
const signals = require('../../state/signals');

const BASIC = [
  create('h3', { content: 'Arithmetical Operators' }),
  create('p', { content: 'The four main arithemetical operators are represented as:' }),
  create('table', {
    classes: ['tsx-help-table'],
    content: [
      create('tr', { content: `<td><code>${highlight('+', 'BASIC')}</code></td><td>addition (also used for string concatenation)</td>` }),
      create('tr', { content: `<td><code>${highlight('-', 'BASIC')}</code></td><td>subtraction</td>` }),
      create('tr', { content: `<td><code>${highlight('*', 'BASIC')}</code></td><td>multiplication</td>` }),
      create('tr', { content: `<td><code>${highlight('/', 'BASIC')}</code></td><td>division</td>` })
    ]
  }),
  create('p', { content: `<code>${highlight('/', 'BASIC')}</code> is <em>integer</em> division, with the remainder discarded (e.g. <code>${highlight('14 / 3 = 4', 'BASIC')}</code>). Remainders are given by:` }),
  create('table', {
    classes: ['tsx-help-table'],
    content: [
      create('tr', { content: `<td><code>${highlight('MOD', 'BASIC')}</code></td><td>remainder</td>` })
    ]
  }),
  create('p', { content: `(e.g. <code>${highlight('14 MOD 3 = 2', 'BASIC')}</code>; <code>${highlight('67 MOD 10 = 7', 'BASIC')}</code>).` }),
  create('h3', { content: 'Doing Fractional (e.g. Decimal) Arithmetic' }),
  create('p', { content: `The Turtle Machine is designed to handle memory simply and transparently for the learning of computer science, and so has no special type for representing fractional numbers; which is why <code>${highlight('/', 'BASIC')}</code> is integer division. But the Turtle System can handle fractional numbers by treating them explicitly as fractions, with both a numerator (above the line) and a denominator (below the line). A denominator of <code>${highlight('1000000', 'BASIC')}</code>, for instance, allows decimal arithmetic to 6 decimal places.` }),
  create('p', { content: `Thus to get the sine of 34.56 degrees to 6 decimal places, you could use <code>${highlight('n% = SIN(3456, 100, 1000000)', 'BASIC')}</code> – this makes <code>${highlight('n%', 'BASIC')}</code> equal to the sine of the angle <code>${highlight('3456 / 100', 'BASIC')}</code>, multiplied by <code>${highlight('1000000', 'BASIC')}</code> (and rounded). <code>${highlight('WRITELN(QSTR$(n%, 1000000, 6))', 'BASIC')}</code> will then print <code>${highlight('n% / 1000000', 'BASIC')}</code> to six decimal places, i.e. <code>${highlight('"0.567269"', 'BASIC')}</code>. For more illustrations of this sort of decimal arithmetic, see the example program &lsquo;Mathematical functions&rsquo;.` }),
  create('h3', { content: 'Boolean Operators' }),
  create('p', { content: 'The four main boolean operators are represented in the standard way:' }),
  create('table', {
    classes: ['tsx-help-table'],
    content: [
      create('tr', { content: `<td><code>${highlight('NOT', 'BASIC')}</code></td><td>negation</td>` }),
      create('tr', { content: `<td><code>${highlight('AND', 'BASIC')}</code></td><td>conjunction</td>` }),
      create('tr', { content: `<td><code>${highlight('OR', 'BASIC')}</code></td><td>disjunction (inclusive)</td>` }),
      create('tr', { content: `<td><code>${highlight('EOR', 'BASIC')}</code></td><td>exclusive disjunction</td>` })
    ]
  }),
  create('p', { content: `These are used between integers, where zero stands for false and any other number stands for true. <code>${highlight('FALSE', 'BASIC')}</code> stands for <code>${highlight('0', 'BASIC')}</code> and <code>${highlight('TRUE', 'BASIC')}</code> for <code>${highlight('-1', 'BASIC')}</code>. The Boolean operators can also be used in a bitwise fashion (i.e. each binary bit in the result is calculated as the result of the relevant boolean operation on the corresponding bits of the inputs, e.g. <code>${highlight('21 AND 6 = 4', 'BASIC')}</code> (binary <code>${highlight('10101 AND 00110 = 100', 'BASIC')}</code>); <code>${highlight('21 OR 6 = 23', 'BASIC')}</code> (<code>${highlight('10111', 'BASIC')}</code>); <code>${highlight('21 EOR 6 = 19', 'BASIC')}</code> (<code>${highlight('10011', 'BASIC')}</code>).` }),
  create('h3', { content: 'Comparison Operators' }),
  create('p', { content: 'The six comparison operators are applicable to all types (with strings compared alphabetically):' }),
  create('table', {
    classes: ['tsx-help-table'],
    content: [
      create('tr', { content: `<td><code>${highlight('=', 'BASIC')}</code></td><td>equality</td>` }),
      create('tr', { content: `<td><code>${highlight('<>', 'BASIC')}</code></td><td>inequality</td>` }),
      create('tr', { content: `<td><code>${highlight('<', 'BASIC')}</code></td><td>less than</td>` }),
      create('tr', { content: `<td><code>${highlight('<=', 'BASIC')}</code></td><td>less than or equal</td>` }),
      create('tr', { content: `<td><code>${highlight('>', 'BASIC')}</code></td><td>greater than</td>` }),
      create('tr', { content: `<td><code>${highlight('>=', 'BASIC')}</code></td><td>greater than or equal</td>` })
    ]
  }),
  create('h3', { content: 'Bracketing' }),
  create('p', { content: 'Complex expressions require brackets, e.g.' }),
  create('pre', { content: `<code>${highlight('IF (n% < 0) OR (n% > 9) THEN\n  n% = ((a% + 1) * (b% + 3) + c%) MOD 10', 'BASIC')}</code>` }),
];

const Pascal = [
  create('h3', { content: 'Arithmetical Operators' }),
  create('p', { content: 'The four main arithemetical operators are represented as:' }),
  create('table', {
    classes: ['tsx-help-table'],
    content: [
      create('tr', { content: `<td><code>${highlight('+', 'Pascal')}</code></td><td>addition (also used for string concatenation)</td>` }),
      create('tr', { content: `<td><code>${highlight('-', 'Pascal')}</code></td><td>subtraction</td>` }),
      create('tr', { content: `<td><code>${highlight('*', 'Pascal')}</code></td><td>multiplication</td>` }),
      create('tr', { content: `<td><code>${highlight('/', 'Pascal')}</code></td><td>division</td>` })
    ]
  }),
  create('p', { content: `<code>${highlight('/', 'Pascal')}</code> is <em>integer</em> division, with the remainder discarded (e.g. <code>${highlight('14 / 3 = 4', 'Pascal')}</code>). Remainders are given by:` }),
  create('table', {
    classes: ['tsx-help-table'],
    content: [
      create('tr', { content: `<td><code>${highlight('mod', 'Pascal')}</code></td><td>remainder</td>` })
    ]
  }),
  create('p', { content: `(e.g. <code>${highlight('14 mod 3 = 2', 'Pascal')}</code>; <code>${highlight('67 mod 10 = 7', 'Pascal')}</code>).` }),
  create('h3', { content: 'Doing Fractional (e.g. Decimal) Arithmetic' }),
  create('p', { content: `The Turtle Machine is designed to handle memory simply and transparently for the learning of computer science, and so has no special type for representing fractional numbers; which is why <code>${highlight('/', 'Pascal')}</code> is integer division. But the Turtle System can handle fractional numbers by treating them explicitly as fractions, with both a numerator (above the line) and a denominator (below the line). A denominator of <code>${highlight('1000000', 'Pascal')}</code>, for instance, allows decimal arithmetic to 6 decimal places.` }),
  create('p', { content: `Thus to get the sine of 34.56 degrees to six decimal places, you could use <code>${highlight('n := sin(3456, 100, 1000000)', 'Pascal')}</code> – this makes <code>${highlight('n', 'Pascal')}</code> equal to the sine of the angle <code>${highlight('3456 / 100', 'Pascal')}</code>, multiplied by <code>${highlight('1000000', 'Pascal')}</code> (and rounded). <code>${highlight('writeln(qstr(n, 1000000, 6))', 'Pascal')}</code> will then print <code>${highlight('n / 1000000', 'Pascal')}</code> to six decimal places, i.e. <code>${highlight('"0.567269"', 'Pascal')}</code>. For more illustrations of this sort of decimal arithmetic, see the example program &lsquo;Mathematical functions&rsquo;.` }),
  create('h3', { content: 'Boolean Operators' }),
  create('p', { content: 'The four main boolean operators are represented in the standard way:' }),
  create('table', {
    classes: ['tsx-help-table'],
    content: [
      create('tr', { content: `<td><code>${highlight('not', 'Pascal')}</code></td><td>negation</td>` }),
      create('tr', { content: `<td><code>${highlight('and', 'Pascal')}</code></td><td>conjunction</td>` }),
      create('tr', { content: `<td><code>${highlight('or', 'Pascal')}</code></td><td>disjunction (inclusive)</td>` }),
      create('tr', { content: `<td><code>${highlight('xor', 'Pascal')}</code></td><td>exclusive disjunction</td>` })
    ]
  }),
  create('p', { content: `These can also be used between integers, in a <em>bitwise</em> fashion (i.e. each binary bit in the result is calculated as the result of the relevant boolean operation on the corresponding bits of the inputs), e.g. <code>${highlight('21 and 6 = 4', 'Pascal')}</code> (binary <code>${highlight('10101 and 00110 = 100', 'Pascal')}</code>); <code>${highlight('21 or 6 = 23', 'Pascal')}</code> (<code>${highlight('10111', 'Pascal')}</code>); <code>${highlight('21 xor 6 = 19', 'Pascal')}</code> (<code>${highlight('10011', 'Pascal')}</code>).` }),
  create('h3', { content: 'Comparison Operators' }),
  create('p', { content: 'The six comparison operators are applicable to all types (with strings compared alphabetically):' }),
  create('table', {
    classes: ['tsx-help-table'],
    content: [
      create('tr', { content: `<td><code>${highlight('=', 'Pascal')}</code></td><td>equality</td>` }),
      create('tr', { content: `<td><code>${highlight('<>', 'Pascal')}</code></td><td>inequality</td>` }),
      create('tr', { content: `<td><code>${highlight('<', 'Pascal')}</code></td><td>less than</td>` }),
      create('tr', { content: `<td><code>${highlight('<=', 'Pascal')}</code></td><td>less than or equal</td>` }),
      create('tr', { content: `<td><code>${highlight('>', 'Pascal')}</code></td><td>greater than</td>` }),
      create('tr', { content: `<td><code>${highlight('>=', 'Pascal')}</code></td><td>greater than or equal</td>` })
    ]
  }),
  create('h3', { content: 'Bracketing' }),
  create('p', { content: 'Complex expressions require brackets, e.g.' }),
  create('pre', { content: `<code>${highlight('if (n < 0) or (n > 9) then\n  n := ((a + 1) * (b + 3) + c) mod 10', 'Pascal')}</code>` }),
];

const Python = [
  create('h3', { content: 'Arithmetical Operators' }),
  create('p', { content: 'The four main arithemetical operators are represented as:' }),
  create('table', {
    classes: ['tsx-help-table'],
    content: [
      create('tr', { content: `<td><code>${highlight('+', 'Python')}</code></td><td>addition (also used for string concatenation)</td>` }),
      create('tr', { content: `<td><code>${highlight('-', 'Python')}</code></td><td>subtraction</td>` }),
      create('tr', { content: `<td><code>${highlight('*', 'Python')}</code></td><td>multiplication</td>` }),
      create('tr', { content: `<td><code>${highlight('//', 'Python')}</code></td><td>division</td>` })
    ]
  }),
  create('p', { content: `<code>${highlight('//', 'Python')}</code> is <em>integer</em> division, with the remainder discarded (e.g. <code>${highlight('14 // 3 = 4', 'Python')}</code>). Remainders are given by:` }),
  create('table', {
    classes: ['tsx-help-table'],
    content: [
      create('tr', { content: `<td><code>${highlight('mod', 'Python')}</code></td><td>remainder</td>` })
    ]
  }),
  create('p', { content: `(e.g. <code>${highlight('14 mod 3 == 2', 'Python')}</code>; <code>${highlight('67 mod 10 == 7', 'Python')}</code>).` }),
  create('h3', { content: 'Doing Fractional (e.g. Decimal) Arithmetic' }),
  create('p', { content: `The Turtle Machine is designed to handle memory simply and transparently for the learning of computer science, and so has no special type for representing fractional numbers; which is why <code>${highlight('//', 'Python')}</code> is integer division. But the Turtle System can handle fractional numbers by treating them explicitly as fractions, with both a numerator (above the line) and a denominator (below the line). A denominator of <code>${highlight('1000000', 'Python')}</code>, for instance, allows decimal arithmetic to 6 decimal places.` }),
  create('p', { content: `Thus to get the sine of 34.56 degrees to six decimal places, you could use <code>${highlight('n = sin(3456, 100, 1000000)', 'Python')}</code> – this makes <code>${highlight('n', 'Python')}</code> equal to the sine of the angle <code>${highlight('3456 / 100', 'Python')}</code>, multiplied by <code>${highlight('1000000', 'Python')}</code> (and rounded). <code>${highlight('writeln(qstr(n, 1000000, 6))', 'Python')}</code> will then print <code>${highlight('n / 1000000', 'Python')}</code> to six decimal places, i.e. <code>${highlight('0.567269', 'Python')}</code>. For more illustrations of this sort of decimal arithmetic, see the example program &lsquo;Mathematical functions&rsquo;.` }),
  create('h3', { content: 'Boolean Operators' }),
  create('p', { content: 'The four main boolean operators are represented in the standard way:' }),
  create('table', {
    classes: ['tsx-help-table'],
    content: [
      create('tr', { content: `<td><code>${highlight('not', 'Python')}</code></td><td>negation</td>` }),
      create('tr', { content: `<td><code>${highlight('and', 'Python')}</code></td><td>conjunction</td>` }),
      create('tr', { content: `<td><code>${highlight('or', 'Python')}</code></td><td>disjunction (inclusive)</td>` }),
      create('tr', { content: `<td><code>${highlight('xor', 'Python')}</code></td><td>exclusive disjunction</td>` })
    ]
  }),
  create('p', { content: `These can also be used between integers, in a <em>bitwise</em> fashion (i.e. each binary bit in the result is calculated as the result of the relevant boolean operation on the corresponding bits of the inputs), e.g. <code>${highlight('21 and 6 = 4', 'Python')}</code> (binary <code>${highlight('10101 and 00110 = 100', 'Python')}</code>); <code>${highlight('21 or 6 = 23', 'Python')}</code> (<code>${highlight('10111', 'Python')}</code>); <code>${highlight('21 xor 6 = 19', 'Python')}</code> (<code>${highlight('10011', 'Python')}</code>).` }),
  create('h3', { content: 'Comparison Operators' }),
  create('p', { content: 'The six comparison operators are applicable to all types (with strings compared alphabetically):' }),
  create('table', {
    classes: ['tsx-help-table'],
    content: [
      create('tr', { content: `<td><code>${highlight('==', 'Python')}</code></td><td>equality</td>` }),
      create('tr', { content: `<td><code>${highlight('!=', 'Python')}</code></td><td>inequality</td>` }),
      create('tr', { content: `<td><code>${highlight('<', 'Python')}</code></td><td>less than</td>` }),
      create('tr', { content: `<td><code>${highlight('<=', 'Python')}</code></td><td>less than or equal</td>` }),
      create('tr', { content: `<td><code>${highlight('>', 'Python')}</code></td><td>greater than</td>` }),
      create('tr', { content: `<td><code>${highlight('>=', 'Python')}</code></td><td>greater than or equal</td>` })
    ]
  }),
  create('h3', { content: 'Bracketing' }),
  create('p', { content: 'Complex expressions require brackets, e.g.' }),
  create('pre', { content: `<code>${highlight('if (n < 0) or (n > 9):\n  n = ((a + 1) * (b + 3) + c) mod 10', 'Python')}</code>` })
];

const text = { BASIC, Pascal, Python };

const operators = create('div');

const refresh = (language) => {
  operators.innerHTML = '';
  text[language].forEach(x => operators.appendChild(x));
};

// load the text for the current language, and subscribe to keep it in sync
refresh(session.language.get());
signals.on('language-changed', refresh);

// export the div
module.exports = operators;
