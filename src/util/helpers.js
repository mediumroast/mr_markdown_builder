/**
 * Utility functions & helpers

 */

const withPrefix = (prefix, text) => prefix + ' ' + text

const surround = (prefix, text) => prefix + text + prefix

const codeBlock = (prefix, blockType, text) => prefix + blockType + '\n' + text + '\n' + prefix

// Like withPrefix, but indents every line after the first to align under the
// first line's content instead of the left margin. Lets a caller nest a list
// (or any other multi-line block) inside a list item, or footnote definition,
// by simply embedding its rendered text -- the continuation lines stay part
// of the same item instead of breaking out of it, per CommonMark's rules.
const withIndentedPrefix = (prefix, text) => {
  const indent = ' '.repeat(prefix.length + 1)
  return text
    .split('\n')
    .map((line, i) => (i === 0 ? `${prefix} ${line}` : `${indent}${line}`))
    .join('\n')
}

module.exports = { withPrefix, surround, codeBlock, withIndentedPrefix }
