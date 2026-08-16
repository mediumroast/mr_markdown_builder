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

  test('cb wraps text in triple backticks', () => {
    expect(cb('word')).toBe('```word```')
  })
})
