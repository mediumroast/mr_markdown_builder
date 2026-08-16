const { mermaid } = require('../src/index')

describe('diagrams', () => {
  test('mermaid renders a fenced mermaid code block', () => {
    expect(mermaid('graph TD;\n  A-->B;')).toBe('```mermaid\ngraph TD;\n  A-->B;\n```')
  })
})
