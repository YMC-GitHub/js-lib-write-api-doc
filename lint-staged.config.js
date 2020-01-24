module.exports = {
  "src/*.{js,json,css}": [
    "prettier --write",
    "eslint --fix",
    "git add ."
  ]
}
