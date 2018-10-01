/**
 * refer:https://github.com/vuejs/vuex/blob/dev/build/rollup.dev.config.js
 */
const { input, output } = require('./configs').commonjs

module.exports = Object.assign({}, input, { output })