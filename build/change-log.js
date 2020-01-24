const fs = require('fs');
const conventionalChangelog = require('conventional-changelog');
let hasHim = fs.existsSync('CHANGELOG.md')
// 缓存旧的
let cache
if (hasHim) {
  console.log('read old')
  cache = fs.readFileSync('CHANGELOG.md');
}
//console.log(cache.toString())
// 获取新的
const newData = conventionalChangelog({ preset: 'angular', releaseCount: 1 });
const result = fs.createWriteStream('CHANGELOG.md', { encoding: 'utf-8', flags: 'w' });
// 写入新的
newData.pipe(result);
// 写入旧的
result.on('finish', () => {
  // console.log('写入完成。');
  let a
  if (cache) {
    a = fs.createWriteStream('CHANGELOG.md', { encoding: 'utf-8', flags: 'a' }).write(cache);
  }
});

/*
const newData = conventionalChangelog({ preset: 'angular', releaseCount: 0 });
const result = fs.createWriteStream('CHANGELOG.md', { encoding: 'utf-8', flags: 'w' });
newData.pipe(result);
*/
//file-usage
//node ./build/change-log.js
//note:i prefer to run in cm
