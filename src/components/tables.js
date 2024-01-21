// Import constants and helpers from the util folder
const { surround } = require('../util')
const { TABLE_CELL_DIV, TABLE_HEADER_SEP, SECTION_LINE_BREAK } = require('../util/constants')

/**
 * @function tableRow
 * @description Creates a table row based upon an array of cells
 * @param {Array[]} cells - array of cells
 * @returns {string} table row
 */
const tableRows = (cells) => {
    const myCells = cells.join(TABLE_CELL_DIV)
    const row = surround(TABLE_CELL_DIV, myCells)
    return row + SECTION_LINE_BREAK
}

/**
 * @function tableHeader
 * @description Creates a table header based upon an array of cells
 * @param {string[]} headerCells - array of header cells
 * @returns {string} table header
 */
const tableHeader = (headerCells) => {
    let myHeader = headerCells.join(TABLE_CELL_DIV)
    myHeader = surround(TABLE_CELL_DIV, myHeader)
    // Get the total length of the header cells and create a separator that repeats that many times
    const headerSeparator = TABLE_HEADER_SEP.repeat(headerCells.length)
    return myHeader + '\n' + headerSeparator
}

// Export the tableRow and tableHeader functions
module.exports = { tableRows, tableHeader }