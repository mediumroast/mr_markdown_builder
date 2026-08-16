/**
 * Non-geospatial diagram code blocks
 */

const { codeBlock } = require('../util/helpers')
const { CODE_BLOCK, CODE_BLOCK_LANG_MERMAID } = require('../util/constants')

// Create a function for mermaid diagrams, that takes the diagram definition text and returns a code block
const mermaid = (definition) => codeBlock(CODE_BLOCK, CODE_BLOCK_LANG_MERMAID, definition)

module.exports = {
  mermaid
}
