
const path = require('path')
const dirMapConfig = require('./dir.map.config')
const rootPath = path.resolve(__dirname, '..')
const resolve = file => path.resolve(rootPath, file)

module.exports = {
  //save the source code (for dev)
  src: resolve(dirMapConfig.src),
  //save the test source code (for test)
  test: resolve(dirMapConfig.test),
  //save the build ouput code by rollup
  dist: resolve(dirMapConfig.dist),
}
