const path = require('path')
const fs = require('fs')
exports.banner = function (opts) {
  let {
    libName,
    version,
    yearNow,
    author
  } = opts
  return `/**
 * ${libName} v${version}
 * (c) 2018-${yearNow} ${author}
 * @license MIT
 */`;
}

exports.mkdirsSync = function (dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (exports.mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
