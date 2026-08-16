const {
  hr,
  collapsible,
  anchor,
  link,
  image,
  imageWithSize,
  quote,
  alert,
  badge,
  tag,
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
  mathBlock,
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

  test('alert renders a GitHub alert with a [!TYPE] marker line', () => {
    expect(alert('NOTE', 'Something worth calling out.')).toBe(
      '>  [!NOTE]\n>  Something worth calling out.'
    )
  })

  test('alert quotes every line of a multi-line body', () => {
    expect(alert('WARNING', 'Line 1.\nLine 2.')).toBe(
      '>  [!WARNING]\n>  Line 1.\n>  Line 2.'
    )
  })

  test('alert accepts all five GitHub alert types', () => {
    for (const type of ['NOTE', 'TIP', 'IMPORTANT', 'WARNING', 'CAUTION']) {
      expect(alert(type, 'x')).toBe(`>  [!${type}]\n>  x`)
    }
  })

  test('alert throws for an unrecognized type', () => {
    expect(() => alert('BOGUS', 'x')).toThrow('alert type must be one of')
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

  test('br forces a hard line break (two trailing spaces plus a newline)', () => {
    expect(br()).toBe('  \n')
  })

  test('comment renders a hidden HTML comment', () => {
    expect(comment('hidden note')).toBe('<!-- hidden note -->')
  })

  test('ins, sub, and sup wrap text in their HTML tags', () => {
    expect(ins('underlined')).toBe('<ins>underlined</ins>')
    expect(sub('subscript')).toBe('<sub>subscript</sub>')
    expect(sup('superscript')).toBe('<sup>superscript</sup>')
  })

  test('mention prefixes a name with @', () => {
    expect(mention('octocat')).toBe('@octocat')
  })

  test('issueRef prefixes a number with #', () => {
    expect(issueRef(42)).toBe('#42')
  })

  test('emoji wraps a shortcode in colons', () => {
    expect(emoji('tada')).toBe(':tada:')
  })

  test('colorSwatch wraps a color value in backticks', () => {
    expect(colorSwatch('#FF5733')).toBe('`#FF5733`')
  })

  test('namedAnchor renders an HTML anchor with a name attribute', () => {
    expect(namedAnchor('my-anchor')).toBe('<a name="my-anchor"></a>')
  })

  test('mathInline wraps an expression in single dollar signs', () => {
    expect(mathInline('E=mc^2')).toBe('$E=mc^2$')
  })

  test('mathBlock wraps an expression in double dollar signs on their own lines', () => {
    expect(mathBlock('E=mc^2')).toBe('\n\n$$\nE=mc^2\n$$\n')
  })

  test('mathBlock is preceded by a blank line so GitHub renders it as a display block instead of swallowing it into the preceding paragraph', () => {
    const doc = mathInline('E=mc^2') + '\n' + mathBlock('x')
    const paragraphBeforeBlock = doc.split(/\n\s*\n/)[0]
    expect(paragraphBeforeBlock).toBe(mathInline('E=mc^2'))
  })
})
