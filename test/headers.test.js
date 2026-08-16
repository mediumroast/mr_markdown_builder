const { h1, h2, h3, h4, h5, h6, hX } = require('../src/index')

describe('headers', () => {
  test('h1 through h6 produce the right number of #', () => {
    expect(h1('Title')).toBe('\n# Title\n')
    expect(h2('Title')).toBe('\n## Title\n')
    expect(h3('Title')).toBe('\n### Title\n')
    expect(h4('Title')).toBe('\n#### Title\n')
    expect(h5('Title')).toBe('\n##### Title\n')
    expect(h6('Title')).toBe('\n###### Title\n')
  })

  test('hX is exported and produces the requested level', () => {
    expect(hX).toBeDefined()
    expect(hX(3, 'Title')).toBe('\n### Title\n')
  })

  test('hX clamps levels above 6 down to an h6', () => {
    expect(hX(9, 'Title')).toBe(h6('Title'))
  })
})
