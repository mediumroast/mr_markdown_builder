// Desc: index file for components
const headers = require('./headers')
const emphasis = require('./emphasis')
const lists = require('./lists')
const misc = require('./misc')
const tables = require('./tables')
const geoblocks = require('./geoblocks')

module.exports = { ...headers, ...emphasis, ...lists, ...misc, ...tables, ...geoblocks }
