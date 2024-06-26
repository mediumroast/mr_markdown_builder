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

const SPACE = '&nbsp;'

const TABLE_CELL_DIV = ' | '
const TABLE_HEADER_SEP = ' --- '

const INLINE_CODE = '`'
const CODE_BLOCK = '```'
const CODE_BLOCK_LANG_JS = 'js'
const CODE_BLOCK_LANG_PYTHON = 'python'
const CODE_BLOCK_LANG_BASH = 'bash'
const CODE_BLOCK_GEOJSON = 'geojson'
const CODE_BLOCK_LANG_JSON = 'json'
const CODE_BLOCK_LANG_YAML = 'yaml'
const CODE_BLOCK_LANG_SQL = 'sql'
const CODE_BLOCK_LANG_MARKDOWN = 'markdown'
const CODE_BLOCK_LANG_HTML = 'html'
const CODE_BLOCK_LANG_CSS = 'css'
const CODE_BLOCK_TOPOJSON = 'topojson'

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
  SPACE,
  TABLE_CELL_DIV,
  TABLE_HEADER_SEP,
  INLINE_CODE,
  CODE_BLOCK,
  CODE_BLOCK_LANG_JS,
  CODE_BLOCK_LANG_PYTHON,
  CODE_BLOCK_LANG_BASH,
  CODE_BLOCK_GEOJSON,
  CODE_BLOCK_LANG_JSON,
  CODE_BLOCK_TOPOJSON,
  TASK_LIST_PREFIX
}
