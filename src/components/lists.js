/**
 * Markdown Lists utilities
 */

import { UNORDERED_LIST_PREFIX, TASK_LIST_PREFIX, withPrefix } from '../util';

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

// Create a function for task lists called `tl`
const tl = (items, callback) => {
  let list = ''
  for (let val of items) {
    if (callback) {
      list += withPrefix(TASK_LIST_PREFIX, callback(val)) + '\n'
    } else {
      list += withPrefix(TASK_LIST_PREFIX, val) + '\n'
    }
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

export { ul, ol }
