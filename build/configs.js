/**
 * refer:https://github.com/vuejs/vuex/blob/dev/build/configs.js
 */
const path = require('path')
const buble = require('rollup-plugin-buble')
const replace = require('rollup-plugin-replace')
const version = process.env.VERSION || require('../package.json').version
const banner =
`/**
 * write-api-doc v${version}
 * (c) ${new Date().getFullYear()} Ye Miancheng
 * @license MIT
 */`

const resolve = _path => path.resolve(__dirname, '../', _path)

// 输入输出以及开发环境
const configs = {
  umdDev: {
    input: resolve('src/index.js'),
    file: resolve('dist/write-api-doc.js'),
    format: 'umd',
    env: 'development'
  },
  umdProd: {
    input: resolve('src/index.js'),
    file: resolve('dist/write-api-doc.min.js'),
    format: 'umd',
    env: 'production'
  },
  commonjs: {
    input: resolve('src/index.js'),
    file: resolve('dist/write-api-doc.common.js'),
    format: 'cjs'
  },
  esm: {
    input: resolve('src/index.esm.js'),
    file: resolve('dist/write-api-doc.esm.js'),
    format: 'es'
  }
}

function genConfig (opts) {
  const config = {
    input: {
      input: opts.input,
      plugins: [
        replace({
          __VERSION__: version
        }),
        buble()
      ]
    },
    output: {
      banner,
      file: opts.file,
      format: opts.format,
      name: 'write-api-doc'
    }
  }

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  return config
}

function mapValues (obj, fn) {
  const res = {}
  Object.keys(obj).forEach(key => {
    res[key] = fn(obj[key], key)
  })
  return res
}

module.exports = mapValues(configs, genConfig)