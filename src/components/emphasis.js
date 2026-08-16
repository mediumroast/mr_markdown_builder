/**
 * Emphasis and code formatting components
*/
// Desc: emphasis.js
const { surround, codeBlock } = require('../util/helpers')
const { EMPHASIS_ITALICS, EMPHASIS_BOLD, EMPHASIS_STRIKETHROUGH, INLINE_CODE, CODE_BLOCK } = require('../util/constants')


/**
 * Produces italic text
 * @param {string} text 
 */
const i = (text) => surround(EMPHASIS_ITALICS, text)


/**
 * Produces bold text
 * @param {string} text 
 */
const b = (text) => surround(EMPHASIS_BOLD, text)

/**
 * Produces strikethroughed text
 * @param {string} text 
 */
const s = (text) => surround(EMPHASIS_STRIKETHROUGH, text)

/**
 * Produces inline code text
 * @param {string} text 
 */
const ic = (text) => surround(INLINE_CODE, text)

/**
 * Produces a fenced code block, optionally with a language tag for syntax highlighting.
 * @param {string} text
 * @param {string} [lang]
 */
const cb = (text, lang = '') => codeBlock(CODE_BLOCK, lang, text)

module.exports = { i, b, s, ic, cb }
