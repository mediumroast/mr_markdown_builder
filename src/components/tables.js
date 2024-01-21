// Import constants and helpers from the util folder
const { surround } = require('../util')
const { TABLE_CELL_DIV, TABLE_HEADER_SEP, SECTION_LINE_BREAK } = require('../util/constants')

/**
 * @function tableRow
 * @description Creates a table row based upon an array of cells
 * @param {Array[]} cells - array of cells
 * @returns {string} table row
 */
const tableRows = (rows) => {
    let myRows = []
    for (const row of rows) {
        if (row.length !== rows[0].length) {
            throw new Error('Table rows must all be the same length')
        }
        // Join the cells with the table cell divider
        let myRow = row.join(TABLE_CELL_DIV)
        // Surround the row with the table cell divider
        myRow = surround(TABLE_CELL_DIV, myRow)
        // Add the row to the rows array
        myRows.push(myRow)
    }
    const markdownRows = myRows.join(SECTION_LINE_BREAK)
    return markdownRows + SECTION_LINE_BREAK
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