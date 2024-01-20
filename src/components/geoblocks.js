/**
 * Geospatial code blocks
 */

const { codeBlock } = require('../util/helpers')
const {CODE_BLOCK, CODE_BLOCK_GEOJSON, CODE_BLOCK_TOPOJSON} = require('../util/constants')

// Create a function for geojson code blocks, that takes a geojson object and returns a code block
const geojson = (geojson) => {
  const code = JSON.stringify(geojson, null, 2)
  return codeBlock(CODE_BLOCK, CODE_BLOCK_GEOJSON, code)
}

// Create a function for topojson code blocks, that takes a topojson object and returns a code block
const topojson = (topojson) => {
  const code = JSON.stringify(topojson, null, 2)
  return surround(CODE_BLOCK, CODE_BLOCK_TOPOJSON, code)
}

// Export the geojson and topojson functions
module.exports = { 
    geojson, 
    topojson 
}