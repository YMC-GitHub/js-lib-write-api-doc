const path = require('path');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const version = process.env.VERSION || require('../package.json').version;
const banner = `/**
 * write-api-doc v${version}
 * (c) 2018 Ye Miancheng
 * @license MIT
 */`;

/**
 * 获取绝对路径
 * @param {*} _path 路径
 * @returns {*}
 * 传入相对于工程目录的某一路径，返回绝对路径
 */
const resolve = _path => path.resolve(__dirname, '../', _path);

/**
 * 输入输出配置
 */
const configs = {
  umdDev: {
    /**
     * @prop input 输入文件
     */
    input: resolve('src/index.js'),
    /**
     * @prop file 输出文件
     */
    file: resolve('dist/write-api-doc.js'),
    /**
     * @prop format 类库规范
     */
    format: 'umd',
    /**
     * @prop env 当前环境
     */
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
};

/**
 * 生成rollup配置
 * @param {*} opts 配置
 * @returns {*} config
 */
function genConfig(opts) {
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
  };

  if (opts.env) {
    config.input.plugins.unshift(
      replace({
        'process.env.NODE_ENV': JSON.stringify(opts.env)
      })
    );
  }

  return config;
}

/**
 * 遍历执函
 * @param {*} obj 对象
 * @param {*} fn 函数
 * @returns {Object} 对象
 * @description
 * 遍历对象键值，执行某一函数，返回一个对象，它带有键和值，值为函数结果
 */
function mapValues(obj, fn) {
  const res = {};
  Object.keys(obj).forEach(key => {
    res[key] = fn(obj[key], key);
  });
  return res;
}

module.exports = mapValues(configs, genConfig);
