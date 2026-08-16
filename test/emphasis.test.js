const { i, b, s, ic, cb } = require('../src/index')

describe('emphasis', () => {
  test('i wraps text in underscores', () => {
    expect(i('word')).toBe('_word_')
  })

  test('b wraps text in double asterisks', () => {
    expect(b('word')).toBe('**word**')
  })

  test('s wraps text in double tildes', () => {
    expect(s('word')).toBe('~~word~~')
  })

  test('ic wraps text in backticks', () => {
    expect(ic('word')).toBe('`word`')
  })

  test('cb renders a fenced code block on its own lines', () => {
    expect(cb('word')).toBe('```\nword\n```')
  })

  test('cb accepts an optional language for syntax highlighting', () => {
    expect(cb('const x = 1', 'js')).toBe('```js\nconst x = 1\n```')
  })
})
