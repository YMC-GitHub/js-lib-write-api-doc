module.exports = {
  // https://github.com/istanbuljs/nyc#readme
  // https://github.com/istanbuljs/babel-plugin-istanbul
  // https://istanbul.js.org/docs/tutorials/es2015/
  // "extends": "@istanbuljs/nyc-config-babel",
  all: true,
  'check-coverage': true,
  branches: 80,
  lines: 80,
  functions: 80,
  statements: 80,
  reporter: ['lcov', 'html', 'text'],
  extension: ['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx'],
  include: ['src/**/*.js'],
  exclude: ['build/', 'src/index.esm.js'],
  'report-dir': './coverage',
  'temp-dir': './.nyc_output',
  sourceMap: true,
  instrument: true
};
