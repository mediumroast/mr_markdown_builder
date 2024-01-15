/**
 * Markdown Header utilities
 */

import { HEADER_PREFIX, withPrefix, SECTION_LINE_BREAK } from '../util'

/**
 * Header of specific level
 * @param {number} headerLevel 
 * @param {string} text 
 */
const hX = (headerLevel, text) =>
  headerLevel > 6
    ? h6(text)
    : SECTION_LINE_BREAK + withPrefix(HEADER_PREFIX.repeat(headerLevel), text) + SECTION_LINE_BREAK

const h1 = (text) => hX(1, text);
const h2 = (text) => hX(2, text);
const h3 = (text) => hX(3, text);
const h4 = (text) => hX(4, text);
const h5 = (text) => hX(5, text);
const h6 = (text) => hX(6, text);

export { hX, h1, h2, h3, h4, h5, h6 }
