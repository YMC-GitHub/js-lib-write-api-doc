export default {
  port: '8080',
  host: '127.0.0.1',
  api: ['get', '/admin/list', 'R-get admin list'],
  name: '/api/backend/admin/list',
  group: '/api/backend/admin/list',
  version: '1.0.0',
  description: 'R-get admin list',
  permision: 'none',
  header: {
    'Accept-Encoding': 'Accept-Encoding: gzip, deflate'
  },
  param: [
    ['Number', 'page', 'The crruent page id.'],
    ['Number', 'limit', 'The max number of per page.']
  ],
  success: [
    ['200', 'Array', 'list', 'The data of admin list.'],
    ['200', 'Number', 'total', ' the number of total admin.'],
    ['200', 'Number', 'hasNext', 'the number of total page is large than 1?true 1,false 0.'],
    ['200', 'Number', 'hasPrev', ' the number of curruent page is large than 1?true 1,false 0']
  ],
  fail: [
    ['-200', 'Number', 'code', 'The status of the return.'],
    ['-200', 'Object', 'data', 'The data of the return.'],
    ['-200', 'String', 'message', ' The message of the return.']
  ],
  sampleRequest: '127.0.0.1:8080/api/backend/admin/list',
  paramExample: [
    'json',
    'request param sample',
    {
      page: 1,
      limit: 10
    }
  ],
  successExample: [
    'json',
    'return data sample when success',
    {
      list: 'The data of admin list.',
      total: ' the number of total admin.',
      hasNext: 'the number of total page is large than 1?true 1,false 0.',
      hasPrev: ' the number of curruent page is large than 1?true 1,false 0'
    }
  ],
  failExample: [
    'json',
    'return data sample when fail',
    {
      code: '-200',
      message: 'the fail desc',
      data: 'the err data'
    }
  ]
};
