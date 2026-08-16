/**
 * Markdown Lists utilities
 */

const { withIndentedPrefix } = require('../util/helpers')
const { UNORDERED_LIST_PREFIX, TASK_LIST_PREFIX, TASK_LIST_PREFIX_CHECKED } = require('../util/constants')

// Nested lists aren't a separate API: embed a rendered ul()/ol()/tl() call
// inside an item's text (e.g. `Parent\n${ul(['Child A', 'Child B'])}`) and
// the continuation lines are automatically indented to stay part of that
// item, per CommonMark's list-nesting rules.
const ul = (items, callback) => {
  let list = ''
  for (let val of items) {
    const content = callback ? callback(val) : val
    list += withIndentedPrefix(UNORDERED_LIST_PREFIX, content) + '\n'
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
    list += withIndentedPrefix(prefix, content) + '\n'
  }
  return list
}


const ol = (items, callback) => {
  let list = ''
  let counter = 1

  for (let val of items) {
    const content = callback ? callback(val) : val
    list += withIndentedPrefix(`${counter}.`, content) + '\n'
    counter++
  }
  return list
}

module.exports = { ul, ol, tl }
