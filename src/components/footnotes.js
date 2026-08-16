/**
 * Footnotes
 */

const { withIndentedPrefix } = require('../util/helpers')

// Inline marker pointing at a footnote definition rendered elsewhere on the page
const footnoteRef = (id) => `[^${id}]`

// Renders the block of footnote definitions the refs point at. entries is an
// array of { id, text }; text may be multi-line, and continuation lines are
// indented to stay part of the same definition. There's no auto-numbering --
// the caller supplies each id, keeping this function (like the rest of the
// module) a pure function of its arguments rather than hidden shared state.
const footnoteDefs = (entries) =>
  entries.map(({ id, text }) => withIndentedPrefix(`[^${id}]:`, text)).join('\n')

module.exports = {
  footnoteRef,
  footnoteDefs
}
