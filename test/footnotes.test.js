const { footnoteRef, footnoteDefs } = require('../src/index')

describe('footnotes', () => {
  test('footnoteRef renders an inline marker', () => {
    expect(footnoteRef('1')).toBe('[^1]')
    expect(footnoteRef('long-note')).toBe('[^long-note]')
  })

  test('footnoteDefs renders one definition per entry', () => {
    expect(footnoteDefs([
      { id: '1', text: 'First note.' },
      { id: '2', text: 'Second note.' },
    ])).toBe('[^1]: First note.\n[^2]: Second note.')
  })

  test('footnoteDefs indents continuation lines of a multi-line definition', () => {
    expect(footnoteDefs([
      { id: 'note', text: 'First line.\nSecond line.' },
    ])).toBe('[^note]: First line.\n         Second line.')
  })

  test('footnoteDefs returns an empty string for no entries', () => {
    expect(footnoteDefs([])).toBe('')
  })
})
