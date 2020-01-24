export default {
  define: ['MyError', 'blog-api', 'for my blog api'],
  fail: [
    ['-200', 'Number', 'code', 'The status of the return.'],
    ['-200', 'Object', 'data', 'The data of the return.'],
    ['-200', 'String', 'message', ' The message of the return.']
  ],
  api: ['get', '/admin/list', 'R-get admin list'],
  use: 'MyError'
};
