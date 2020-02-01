module.exports = {
  'src/*.{js,json,css}': [
    // tells lint-staged to run prettier lib
    // "prettier --write",
    // tells lint-staged to run eslint lib with --fix arg
    'eslint --fix'
    // tells lint-staged  to git add all
    // 'git add .'
  ]
};
