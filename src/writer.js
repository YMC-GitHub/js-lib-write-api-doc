// ---------- index ----------
// this is the index file
// ---------- index ----------
// task:
// 01.pass his
// 02.use his.property and his.registerMethod methord

export default his =>
  his
    .property('host', '127.0.0.1')
    .property('port', '8080')
    .property('api', ['get', '/backend/admin/list', 'R-get admin list'])
    .property('name', '/api/backend/admin/list')
    .property('group', '/api/backend/admin/list')
    .property('version', '1.0.0')
    .property('description', 'R-get admin list')
    .property('permission', 'none')
    .property('header', {
      'Accept-Encoding': 'Accept-Encoding: gzip, deflate'
    })
    .property('param', [
      ['Number', 'page', 'The crruent page id.'],
      ['Number', 'limit', 'The max number of per page.']
    ])
    .property('success', [
      ['200', 'Array', 'list', 'The data of admin list.'],
      ['200', 'Number', 'total', ' the number of total admin.'],
      ['200', 'Number', 'hasNext', 'the number of total page is large than 1?true 1,false 0.'],
      ['200', 'Number', 'hasPrev', ' the number of curruent page is large than 1?true 1,false 0']
    ])
    .property('fail', [
      ['-200', 'Number', 'code', 'The status of the return.'],
      ['-200', 'Object', 'data', 'The data of the return.'],
      ['-200', 'String', 'message', ' The message of the return.']
    ])
    .property('paramExample', [
      'json',
      'request param sample',
      {
        page: 1,
        limit: 10
      }
    ])
    .property('successExample', [
      'json',
      'return data sample when success',
      {
        list: 'The data of admin list.',
        total: ' the number of total admin.',
        hasNext: 'the number of total page is large than 1?true 1,false 0.',
        hasPrev: ' the number of curruent page is large than 1?true 1,false 0'
      }
    ])
    .property('failExample', [
      'json',
      'return data sample when fail',
      {
        code: '-200',
        message: 'the fail desc',
        data: 'the err data'
      }
    ])
    .property('sampleRequest', '127.0.0.1:8080/api/backend/admin/list')
    .registerMethod();
// next export default his => his.registerMethod();
