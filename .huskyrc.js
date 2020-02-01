module.exports = {
  "hooks": {
    // tells git to run lint-staged lib before committing
    "pre-commit": "lint-staged",
    // tells git to run commitlint lib
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}