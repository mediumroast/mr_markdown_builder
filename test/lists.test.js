const { ul, ol, tl } = require('../src/index')

describe('lists', () => {
  const items = ['Item 1', 'Item 2']

  test('ul creates an unordered list', () => {
    expect(ul(items)).toBe('* Item 1\n* Item 2\n')
  })

  test('ul applies an optional callback to each item', () => {
    expect(ul(items, (item) => item.toUpperCase())).toBe('* ITEM 1\n* ITEM 2\n')
  })

  test('ol creates a numbered list', () => {
    expect(ol(items)).toBe('1. Item 1\n2. Item 2\n')
  })

  test('ol applies an optional callback to each item', () => {
    expect(ol(items, (item) => item.toUpperCase())).toBe('1. ITEM 1\n2. ITEM 2\n')
  })

  test('tl creates an unchecked task list', () => {
    expect(tl(items)).toBe('- [ ] Item 1\n- [ ] Item 2\n')
  })

  test('tl applies an optional callback to each item', () => {
    expect(tl(items, (item) => item.toUpperCase())).toBe('- [ ] ITEM 1\n- [ ] ITEM 2\n')
  })

  test('tl renders { text, checked } items as checked or unchecked', () => {
    const tasks = [
      { text: 'Done', checked: true },
      { text: 'Not done', checked: false },
      { text: 'Also not done' },
    ]
    expect(tl(tasks)).toBe('- [x] Done\n- [ ] Not done\n- [ ] Also not done\n')
  })

  test('tl applies a callback to the text of { text, checked } items', () => {
    const tasks = [{ text: 'done', checked: true }]
    expect(tl(tasks, (item) => item.toUpperCase())).toBe('- [x] DONE\n')
  })

  test('ul/ol/tl return an empty string for an empty array', () => {
    expect(ul([])).toBe('')
    expect(ol([])).toBe('')
    expect(tl([])).toBe('')
  })

  test('ul nests a sub-list by embedding a rendered ul() in an item', () => {
    const nested = ul(['Sub A', 'Sub B'])
    expect(ul([`Parent item\n${nested.trimEnd()}`, 'Sibling'])).toBe(
      '* Parent item\n  * Sub A\n  * Sub B\n* Sibling\n'
    )
  })

  test('ol nests a sub-list, indenting to match the parent marker width', () => {
    const nested = ol(['Step 1', 'Step 2'])
    expect(ol([`Phase\n${nested.trimEnd()}`, 'Other phase'])).toBe(
      '1. Phase\n   1. Step 1\n   2. Step 2\n2. Other phase\n'
    )
  })

  test('ol indents further for double-digit markers', () => {
    const nested = ol(['Nested'])
    const items = Array.from({ length: 9 }, () => 'Item')
    items.push(`Tenth\n${nested.trimEnd()}`)
    const result = ol(items)
    expect(result).toContain('10. Tenth\n    1. Nested\n')
  })

  test('ul indents a nested task list embedded in an item', () => {
    const nested = tl(['Sub task'])
    expect(ul([`Parent\n${nested.trimEnd()}`])).toBe('* Parent\n  - [ ] Sub task\n')
  })
})
