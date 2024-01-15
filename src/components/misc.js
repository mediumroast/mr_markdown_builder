/**
 * Misc
 */

import { HORIZONTAL_RULE, SECTION_LINE_BREAK, QUOTE, surround, withPrefix } from '../util'

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
  return `[${title}](${url})`
};

const image = (alt, url, title = '') =>
  `![${alt}](${url}${title !== '' ? ` "${title}"` : ''})`

// Create quote function
const quote = (text) => withPrefix(QUOTE, text) 

export { hr, collapsible, anchor, link, image, quote }
