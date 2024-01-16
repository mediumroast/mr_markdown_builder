/**
 * Utility functions & helpers

 */

const withPrefix = (prefix, text) => prefix + ' ' + text

const surround = (prefix, text) => prefix + text + prefix

module.exports = { withPrefix, surround }
