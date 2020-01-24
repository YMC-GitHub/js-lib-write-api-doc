/* eslint-disable global-require */
//include some lib
const path = require('path');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
//include some data
const dirMapConfig = require('../config/dir.map.config');
const package = require('../package.json')

const libName = process.env.NAME || package.name;
const yearNow = (new Date()).getFullYear()
const author = process.env.AUTHOR || package.author;
const version = process.env.VERSION || package.version;
const yearStart = '2018'
const year = yearNow === yearStart ? yearStart : `${yearStart}-${yearNow}`

const banner = `/**
 * ${libName} v${version}
 * (c) ${year} ${author}
 * @license MIT
 */`;


const rootPath = path.resolve(__dirname, '../');
const resolve = _path => path.resolve(rootPath, _path);

/**
 * 输入输出配置
 */
const configs = {
  umdDev: {
    /**
     * @prop input 输入文件
     */
    input: resolve(`${dirMapConfig.src}/index.js`),
    /**
     * @prop file 输出文件
     */
    file: resolve(`${dirMapConfig.dist}/${libName}.js`),
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
    input: resolve(`${dirMapConfig.src}/index.js`),
    file: resolve(`${dirMapConfig.dist}/${libName}.min.js`),
    format: 'umd',
    env: 'production'
  },
  commonjs: {
    input: resolve(`${dirMapConfig.src}/index.js`),
    file: resolve(`${dirMapConfig.dist}/${libName}.common.js`),
    format: 'cjs'
  },
  esm: {
    input: resolve(`${dirMapConfig.src}/index.esm.js`),
    file: resolve(`${dirMapConfig.dist}/${libName}.esm.js`),
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
      name: libName
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
  Object.keys(obj).forEach((key) => {
    res[key] = fn(obj[key], key);
  });
  return res;
}

module.exports = mapValues(configs, genConfig);
