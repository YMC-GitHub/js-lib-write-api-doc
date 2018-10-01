## 使用文档

#### \#**安装**
```
# npm：
yarn install write-api-doc

# cdn:
<script src=""> </script>

```
#### \#**使用**
```
let doc = Doc.host('127.0.0.1')
    .port('8080')
    .api(['post', '/backend/admin/login', '管理人员登录'])
    .name('/api/backend/admin/list')
    .group('/api/backend/admin/list')
    .version('ver1.0.0')
    .description('/backend/admin/login')
    .permision('none')
    .header({
        'Accept-Encoding': 'Accept-Encoding: gzip, deflate'
    })
    .sampleRequest('127.0.0.1:8080/api/backend/admin/list')
    .param([
        ['Number', 'page', '第几页起'],
        ['Number', 'limit', '每页几条']
    ])
    .success([
        ['200', 'Number', 'code', '返回代码'],
        ['200', 'String', 'msg', ' 返回描述']
    ])
    .fail([
        ['404', 'Number', 'code', '返回代码'],
        ['404', 'String', 'msg', ' 返回描述']
    ])
    .paramExample(['json', '请求例子', {
        "page": 5,
        "limit": 10
    }])
    .successExample(['json', '返回样例', {
        code: 0,
        msg: '操作成功'
    }])
    .failExample(['json', '错误返回', {
        code: -1,
        msg: '操作失败'
    }]).toStr()
console.log(doc)
```
