// Import constants and helpers from the util folder
const { surround } = require('../util')
const {
    TABLE_CELL_DIV,
    TABLE_HEADER_SEP,
    TABLE_HEADER_SEP_LEFT,
    TABLE_HEADER_SEP_CENTER,
    TABLE_HEADER_SEP_RIGHT,
    SECTION_LINE_BREAK
} = require('../util/constants')

const ALIGNMENT_SEPARATORS = {
    left: TABLE_HEADER_SEP_LEFT,
    center: TABLE_HEADER_SEP_CENTER,
    right: TABLE_HEADER_SEP_RIGHT
}

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
 * @param {string[]} [alignments] - optional per-column alignment: 'left', 'center', or 'right'
 * @returns {string} table header
 */
const tableHeader = (headerCells, alignments) => {
    let myHeader = headerCells.join(TABLE_CELL_DIV)
    myHeader = surround(TABLE_CELL_DIV, myHeader)
    // Build one separator cell per header cell, using the requested alignment
    // when one was given and falling back to the unaligned separator otherwise
    let headerSeparator = headerCells.map((_, i) => ALIGNMENT_SEPARATORS[alignments && alignments[i]] || TABLE_HEADER_SEP)
    headerSeparator = headerSeparator.join(TABLE_CELL_DIV)
    headerSeparator = surround(TABLE_CELL_DIV, headerSeparator)
    return myHeader + '\n' + headerSeparator
}

// Export the tableRow and tableHeader functions
module.exports = { tableRows, tableHeader }