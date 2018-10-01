export default (sugar) =>
sugar.property('host', '127.0.0.1')
    .property('port', '8080')
    .property('api', ['post', '/backend/admin/login', '管理人员登录'])
    .property('name', '/api/backend/admin/list')
    .property('group', '/api/backend/admin/list')
    .property('version', 'ver1.0.0')
    .property('description', '/backend/admin/login')
    .property('permision', 'none')
    .property('header', {
        'Accept-Encoding': 'Accept-Encoding: gzip, deflate'
    })
    .property('param', [
        ['Number', 'page', '第几页起'],
        ['Number', 'limit', '每页几条']
    ])
    .property('success', [
        ['200', 'Number', 'code', '返回代码'],
        ['200', 'String', 'msg', ' 返回描述']
    ])
    .property('fail', [
        ['404', 'Number', 'code', '返回代码'],
        ['404', 'String', 'msg', ' 返回描述']
    ])
    .property('paramExample', ['json', '请求例子', {
        "page": 5,
        "limit": 10
    }])
    .property('successExample', ['json', '返回样例', {
        code: 0,
        msg: '操作成功'
    }])
    .property('failExample', ['json', '错误返回', {
        code: -1,
        msg: '操作失败'
    }])
    .property('sampleRequest', '127.0.0.1:8080/api/backend/admin/list')
    .registerMethod()
