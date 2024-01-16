/**
 * These are the constants used in the markdown parser.
 */

const HEADER_PREFIX  = '#'

const EMPHASIS_ITALICS = '_'
const EMPHASIS_BOLD = '**'
const EMPHASIS_STRIKETHROUGH = '~~'

const UNORDERED_LIST_PREFIX = '*'

const TASK_LIST_PREFIX = '- [ ]'

const LINE_BREAK = '  '
const SECTION_LINE_BREAK = '\n'

const HORIZONTAL_RULE = '---'

const QUOTE = '> '

const TABLE_CELL_DIV = '|'
const TABLE_HEADER_SEP = '|---|'

const INLINE_CODE = '`'
const CODE_BLOCK = '```'

module.exports = {
  HEADER_PREFIX,
  EMPHASIS_ITALICS,
  EMPHASIS_BOLD,
  EMPHASIS_STRIKETHROUGH,
  UNORDERED_LIST_PREFIX,
  LINE_BREAK,
  SECTION_LINE_BREAK,
  HORIZONTAL_RULE,
  QUOTE,
  TABLE_CELL_DIV,
  TABLE_HEADER_SEP,
  INLINE_CODE,
  CODE_BLOCK,
  TASK_LIST_PREFIX
}
