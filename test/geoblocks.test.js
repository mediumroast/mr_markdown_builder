const { geojson, topojson } = require('../src/index')

describe('geoblocks', () => {
  const feature = { type: 'FeatureCollection', features: [] }

  test('geojson renders a fenced geojson code block', () => {
    expect(geojson(feature)).toBe('```geojson\n' + JSON.stringify(feature, null, 2) + '\n```')
  })

  // Regression test: topojson() used to call an unimported `surround` helper
  // and threw `ReferenceError: surround is not defined` on every call.
  test('topojson renders a fenced topojson code block without throwing', () => {
    expect(() => topojson(feature)).not.toThrow()
    expect(topojson(feature)).toBe('```topojson\n' + JSON.stringify(feature, null, 2) + '\n```')
  })
})
