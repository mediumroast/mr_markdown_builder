/**
 * Markdown Lists utilities
 */

const { withPrefix } = require('../util/helpers')
const { UNORDERED_LIST_PREFIX, TASK_LIST_PREFIX, TASK_LIST_PREFIX_CHECKED } = require('../util/constants')

const ul = (items, callback) => {
  let list = ''
  for (let val of items) {
    if (callback) {
      list += withPrefix(UNORDERED_LIST_PREFIX, callback(val)) + '\n'
    } else {
      list += withPrefix(UNORDERED_LIST_PREFIX, val) + '\n'
    }
  }
  return list
}

// Create a function for task lists called `tl`. Items may be plain strings
// (rendered unchecked) or { text, checked } objects to mark them done.
const tl = (items, callback) => {
  let list = ''
  for (let val of items) {
    const isTaskObject = typeof val === 'object' && val !== null && 'text' in val
    const text = isTaskObject ? val.text : val
    const checked = isTaskObject && !!val.checked
    const prefix = checked ? TASK_LIST_PREFIX_CHECKED : TASK_LIST_PREFIX
    const content = callback ? callback(text) : text
    list += withPrefix(prefix, content) + '\n'
  }
  return list
}


const ol = (items, callback) => {
  let list = ''
  let counter = 1

  for (let val of items) {
    if (callback) {
      list += withPrefix(`${counter}.`, callback(val)) + '\n'
    } else {
      list += withPrefix(`${counter}.`, val) + '\n'
    }
    counter++
  }
  return list
}

module.exports = { ul, ol, tl }
