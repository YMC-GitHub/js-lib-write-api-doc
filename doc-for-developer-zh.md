## 开发者使用文档

### \#**安装**
```sh
::<<eof
# 设置配置
MY_PROJECT_NAME="write-api-doc"
MY_PROJECTS_DIR="./code-store"
MY_REMOTE_PROJECT_URL="https://github.com/YMC-GitHub/js-lib-write-api-doc.git"
# 切换目录
cd ${MY_PROJECTS_DIR}
# 下拉代码
git clone ${MY_REMOTE_PROJECT_URL} ${MY_PROJECT_NAME}
eof
```

### \#**安装依赖**
```sh
::<<eof
npm run install
eof
```


### \#**开发**
```sh
::<<eof
npm run dev
eof
```
想了解详情，点击[这里](./note/note-using-rollup-for-lib-zh.md)

### \#**测试**
```sh
::<<eof
npm run test
npm run test:unit
eof
```
想了解详情，点击这里：[rollup](./note/note-using-rollup-for-lib-zh.md)、[mocha]()

### \#**构建**
```sh
::<<eof
npm run build
eof
```
想了解详情，点击[这里](./note/note-using-rollup-for-lib-zh.md)

### \#**发布**
```sh
::<<eof
npm run release
eof
```
想了解详情，点击[这里]()

### \#**代码校验**
```sh
::<<eof
npm run lint
eof
```
想了解详情，点击[这里]()

### \#**代码美化**
```sh
::<<eof
npm run format
eof
```
想了解详情，点击[这里]()

