const {
  hr,
  collapsible,
  anchor,
  link,
  image,
  imageWithSize,
  quote,
  badge,
  tag,
  upArrow,
  downArrow,
  rightArrow,
  leftArrow,
  space,
  cr,
} = require('../src/index')

describe('misc', () => {
  test('hr renders a horizontal rule surrounded by line breaks', () => {
    expect(hr()).toBe('\n---\n')
  })

  test('collapsible renders a details/summary block', () => {
    expect(collapsible('Summary', 'content')).toBe(
      '\n\n<details>\n<summary>Summary</summary>\n\ncontent\n</details>\n'
    )
  })

  test('anchor lowercases, strips special characters, and dashes whitespace', () => {
    expect(anchor('A header with /*() special-characters!')).toBe(
      '#a-header-with--special-characters'
    )
  })

  test('anchor returns an empty string for non-string input', () => {
    expect(anchor(null)).toBe('')
    expect(anchor(undefined)).toBe('')
  })

  test('link renders an explicit url', () => {
    expect(link('Github', 'https://github.com/flxwu')).toBe(' [Github](https://github.com/flxwu) ')
  })

  test('link falls back to an anchor when url is null', () => {
    expect(link('Section', null)).toBe(' [Section](#section) ')
  })

  test('image renders with and without a title', () => {
    expect(image('alt', 'url')).toBe('![alt](url)')
    expect(image('alt', 'url', 'title')).toBe('![alt](url "title")')
  })

  test('imageWithSize renders an HTML img tag with a pixel height', () => {
    expect(imageWithSize('alt', 'url', 50)).toBe('<img src="url" alt="alt" height="50px" />')
  })

  test('quote prefixes the text with a blockquote marker', () => {
    expect(quote('A quote')).toBe('>  A quote')
  })

  test('quote prefixes every line of a multi-line string', () => {
    expect(quote('Line 1\nLine 2')).toBe('>  Line 1\n>  Line 2')
  })

  test('badge builds a shields.io badge URL wrapped in an image', () => {
    expect(badge('Role', 'Owner')).toBe(
      '![Role](https://img.shields.io/badge/Role-Owner-blue?style=for-the-badge)'
    )
  })

  test('tag builds a shields.io tag URL wrapped in an image', () => {
    expect(tag('Label')).toBe('![Label](https://img.shields.io/badge/Label-blue?style=for-the-badge)')
  })

  test('directional arrow and whitespace helpers', () => {
    expect(upArrow()).toBe('&#8593;')
    expect(downArrow()).toBe('&#8595;')
    expect(rightArrow()).toBe('&#8594;')
    expect(leftArrow()).toBe('&#8592;')
    expect(space()).toBe('&nbsp;')
    expect(cr()).toBe('\n')
  })
})
