/**
 * convert a number to css colour #000000 format
 */
const pad = string =>
  ((string.length < 6) ? pad(`0${string}`) : string);

module.exports = colour =>
  `#${pad(colour.toString(16))}`;
