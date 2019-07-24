/**
 * refer:https://github.com/vuejs/vuex/blob/dev/build/build.main.js
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const uglify = require('uglify-js');
const rollup = require('rollup');
const configs = require('./configs');

// 创建输出目录
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}
// 构建输出脚本
build(Object.keys(configs).map(key => configs[key]));

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
        buildEntry(builds[built])
            .then(() => {
                built++;
                if (built < total) {
                    next();
                }
            })
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
                const code = bundleOutput.output[0] && !bundleOutput.output[0].isAsset && bundleOutput.output[0].code ||""
                return writeToFile({isProd,output,code:code})
            })
    );
}

function write(dest, code, zip) {
    return new Promise((resolve, reject) => {
        function report(extra) {
            console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''));
            resolve();
        }

        fs.writeFile(dest, code, err => {
            if (err) return reject(err);
            if (zip) {
                zlib.gzip(code, (err, zipped) => {
                    if (err) return reject(err);
                    report(' (gzipped: ' + getSize(zipped) + ')');
                });
            } else {
                report();
            }
        });
    });
}

function getSize(code) {
    return (code.length / 1024).toFixed(2) + 'kb';
}

function logError(e) {
    console.log(e);
}

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}
function writeToFile({isProd,output,code}){
  if (isProd) {
    var minified =
        (output.banner ? output.banner + '\n' : '') +
        uglify.minify(code, {
            output: {
                /* eslint-disable camelcase */
                ascii_only: true
                /* eslint-enable camelcase */
            }
        }).code;
    return write(output.file, minified, true);
} else {
    return write(output.file, code);
}
}

