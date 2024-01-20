/**
 * Utility functions & helpers

 */

const withPrefix = (prefix, text) => prefix + ' ' + text

const surround = (prefix, text) => prefix + text + prefix

const codeBlock = (prefix, blockType, text) => prefix + blockType + '\n' + text + '\n' + prefix

module.exports = { withPrefix, surround, codeBlock }
