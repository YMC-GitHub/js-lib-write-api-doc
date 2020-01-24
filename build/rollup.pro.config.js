/**
 * refer:https://github.com/vuejs/vuex/blob/dev/build/build.main.js
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const uglify = require('uglify-js');
const rollup = require('rollup');
const baseConfig = require('./rollup.bas.config');
const dirConstrutorConfig = require('../config/dir.construtor.config');
const utils = require('./utils');
// 创建输出目录
utils.mkdirsSync(dirConstrutorConfig.dist)

// 构建输出脚本
// eslint-disable-next-line no-use-before-define
build(Object.keys(baseConfig).map(key => baseConfig[key]));

/**
 * 构建输出脚本
 * @param {*} builds 一个数组，元素为rollup的配置选项
 * @description
 * 通过递归，生产构建脚本
 */
function build(builds) {
  // 当前构建序号
  let built = 0;
  // 最大构建序号
  const total = builds.length;
  // 遍历序号构建
  const next = () => {
    // eslint-disable-next-line no-use-before-define
    buildEntry(builds[built])
      .then(() => {
        // eslint-disable-next-line no-plusplus
        built++;
        if (built < total) {
          next();
        }
      })
      // eslint-disable-next-line no-use-before-define
      .catch(logError);
  };

  next();
}

/**
 *
 */
function buildEntry({ input, output }) {
  // 检查环境：开发模式还是生产模式
  const isProd = /min\.js$/.test(output.file);
  return (
    rollup
      // 编译
      .rollup(input)
      // 生成
      .then(bundle => bundle.generate(output))
      // 压缩
      // 写入
      .then((bundleOutput) => {
        // eslint-disable-next-line no-mixed-operators
        const code = bundleOutput.output[0] && !bundleOutput.output[0].isAsset && bundleOutput.output[0].code || '';
        // eslint-disable-next-line no-use-before-define
        return writeToFile({ isProd, output, code });
      })
  );
}

function write(dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report(extra) {
      // eslint-disable-next-line
      console.log(`${blue(path.relative(process.cwd(), dest))} ${getSize(code)}${extra || ''}`);
      resolve();
    }

    // eslint-disable-next-line consistent-return
    fs.writeFile(dest, code, (err) => {
      if (err) return reject(err);
      if (zip) {
        // eslint-disable-next-line
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err);
          // eslint-disable-next-line no-use-before-define
          report(` (gzipped: ${getSize(zipped)})`);
        });
      } else {
        report();
      }
    });
  });
}

function getSize(code) {
  return `${(code.length / 1024).toFixed(2)}kb`;
}

function logError(e) {
  // eslint-disable-next-line no-console
  console.log(e);
}

function blue(str) {
  return `\x1b[1m\x1b[34m${str}\x1b[39m\x1b[22m`;
}
function writeToFile({ isProd, output, code }) {
  if (isProd) {
    const minified = (output.banner ? `${output.banner}\n` : '')
      + uglify.minify(code, {
        output: {
          ascii_only: true
        }
      }).code;
    return write(output.file, minified, true);
  }
  return write(output.file, code);
}
