/**
 * Misc
 */

const { withPrefix, surround } = require('../util/helpers')
const {
  HORIZONTAL_RULE,
  SECTION_LINE_BREAK,
  QUOTE,
  LINE_BREAK,
  INLINE_CODE,
  MENTION_PREFIX,
  ISSUE_REF_PREFIX,
  EMOJI_DELIMITER,
  MATH_INLINE_DELIMITER,
  MATH_BLOCK_DELIMITER,
  ALERT_TYPES
} = require('../util/constants')

const hr = () => surround(SECTION_LINE_BREAK, HORIZONTAL_RULE)

const collapsible = (summary, content) =>
  SECTION_LINE_BREAK +
  `
<details>
<summary>${summary}</summary>

${content}
</details>
`

const anchor = (val) => {
  const re = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g;
  const replacement = '-'
  const whitespace = /\s/g

  if (typeof val !== 'string') return ''
  const anchor = val.replace(/[A-Z]+/g, str => str.toLowerCase())
  return '#' + anchor
    .trim()
    .replace(re, '')
    .replace(whitespace, replacement)
}

const link = (title, url) => {
  if (url === null) {
    url = anchor(title)
  }
  return ` [${title}](${url}) `
}

const image = (alt, url, title = '') =>
  `![${alt}](${url}${title !== '' ? ` "${title}"` : ''})`

// Create a function, using HTML, that will take siz in px and create an image with the specified size
const imageWithSize = (alt, url, size, title = '') =>
  `<img src="${url}" alt="${alt}" height="${size}px"${title !== '' ? ` title="${title}"` : ''} />`

// Create quote function; prefixes every line so multi-line text is fully quoted
const quote = (text) => text.split('\n').map(line => withPrefix(QUOTE, line)).join('\n')

// Create a GitHub alert: a blockquote whose first line is a [!TYPE] marker.
// type must be one of ALERT_TYPES (NOTE, TIP, IMPORTANT, WARNING, CAUTION).
const alert = (type, text) => {
  if (!ALERT_TYPES.includes(type)) {
    throw new Error(`alert type must be one of ${ALERT_TYPES.join(', ')}, got "${type}"`)
  }
  return quote(`[!${type}]\n${text}`)
}

// Create a static badge function
const badge = (label, message, color='blue', style='?style=for-the-badge') => {
  label = encodeURIComponent(label)
  const url = `https://img.shields.io/badge/${label}-${message}-${color}${style}`
  return image(label, url)
}

// Create a static badge function
const tag = (label, color='blue', style='?style=for-the-badge') => {
  label = encodeURIComponent(label)
  const url = `https://img.shields.io/badge/${label}-${color}${style}`
  return image(label, url)
}

// Create an up arrow function
const upArrow = () => '&#8593;'
// Create a down arrow function
const downArrow = () => '&#8595;'
// Create a right arrow function
const rightArrow = () => '&#8594;'
// Create a left arrow function
const leftArrow = () => '&#8592;'

// Create a space function
const space = () => '&nbsp;'

// Create a carriage return function
const cr = () => '\n'

// Force a hard line break within a paragraph (two trailing spaces + a newline)
const br = () => LINE_BREAK + SECTION_LINE_BREAK

// Hide content from the rendered output
const comment = (text) => `<!-- ${text} -->`

// Underline, subscript, and superscript have no dedicated markdown syntax; GitHub renders these HTML tags instead
const ins = (text) => `<ins>${text}</ins>`
const sub = (text) => `<sub>${text}</sub>`
const sup = (text) => `<sup>${text}</sup>`

// Mention a user or team
const mention = (name) => `${MENTION_PREFIX}${name}`

// Reference an issue or pull request by number
const issueRef = (num) => `${ISSUE_REF_PREFIX}${num}`

// Render an emoji shortcode
const emoji = (name) => surround(EMOJI_DELIMITER, name)

// Render a color value GitHub will show a swatch for (hex, rgb, or hsl)
const colorSwatch = (color) => surround(INLINE_CODE, color)

// Create a manually-named anchor to link to, independent of any heading
const namedAnchor = (name) => `<a name="${name}"></a>`

// Render inline and block mathematical expressions (LaTeX)
const mathInline = (expr) => surround(MATH_INLINE_DELIMITER, expr)

// Unlike fenced code blocks, GitHub's $$ math delimiter does not interrupt a
// paragraph -- without a blank line before it, it's swallowed into whatever
// text precedes it instead of rendering as a display math block. Guarantee
// that isolation here (mirroring how collapsible() guarantees its own),
// rather than relying on every caller to remember to add one.
const mathBlock = (expr) => `${SECTION_LINE_BREAK}${SECTION_LINE_BREAK}${MATH_BLOCK_DELIMITER}\n${expr}\n${MATH_BLOCK_DELIMITER}${SECTION_LINE_BREAK}`

module.exports = {
  hr,
  collapsible,
  anchor,
  link,
  image,
  quote,
  alert,
  badge,
  tag,
  imageWithSize,
  upArrow,
  downArrow,
  rightArrow,
  leftArrow,
  space,
  cr,
  br,
  comment,
  ins,
  sub,
  sup,
  mention,
  issueRef,
  emoji,
  colorSwatch,
  namedAnchor,
  mathInline,
  mathBlock
}
