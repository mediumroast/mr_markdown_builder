const { tableHeader, tableRows } = require('../src/index')

describe('tables', () => {
  test('tableHeader creates a header row and separator', () => {
    expect(tableHeader(['Name', 'Role'])).toBe(' | Name | Role | \n |  ---  |  ---  | ')
  })

  test('tableRows creates one row per array entry', () => {
    const rows = [
      ['Mediumroast', 'Owner'],
      ['Atlassian', 'Competitor'],
    ]
    expect(tableRows(rows)).toBe(
      ' | Mediumroast | Owner | \n | Atlassian | Competitor | \n'
    )
  })

  test('tableRows throws when rows are not all the same length', () => {
    const rows = [
      ['Mediumroast', 'Owner'],
      ['Atlassian'],
    ]
    expect(() => tableRows(rows)).toThrow('Table rows must all be the same length')
  })
})
