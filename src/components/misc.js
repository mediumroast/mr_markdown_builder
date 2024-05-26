/**
 * Misc
 */

const { withPrefix, surround } = require('../util/helpers')
const {HORIZONTAL_RULE, SECTION_LINE_BREAK, QUOTE} = require('../util/constants')

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

// Create quote function
const quote = (text) => withPrefix(QUOTE, text) 

// Create a static badge function
const badge = (label, message, color='blue', style='?style=for-the-badge') => {
  label = encodeURIComponent(label)
  const url = `https://img.shields.io/badge/${label}-${message}-${color}${style}`
  return image(label, url)
}

// Create a static badge function
const tag = (label, color='purple', style='?style=for-the-badge') => {
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

module.exports = { 
  hr, 
  collapsible, 
  anchor, 
  link, 
  image, 
  quote, 
  badge,
  tag, 
  imageWithSize,
  upArrow,
  downArrow,
  rightArrow,
  leftArrow 
}
