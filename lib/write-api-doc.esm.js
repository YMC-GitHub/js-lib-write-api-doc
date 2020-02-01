/**
 * write-api-doc v1.1.0
 * (c) 2018-2020 yemiancheng <ymc.github@gmail.com> (https://github.com/YMC-GitHub)
 * @license MIT
 */
// ---------- helper ----------
// this is the helper file
// ---------- helper ----------
// tasks:
// 01.some sugar function for apidoc  lib
// 02.make json object to string
// get detail on https://apidocjs.com/#param-api

var api = function (method, path, title) { return ("* @api {" + method + "} " + path + " " + title); };
var apiName = function (name) { return ("* @apiName " + name); };
var apiGroup = function (group) { return ("* @apiGroup " + group); };
var apiVersion = function (apiVersion) { return ("* @apiVersion " + apiVersion); };
var apiDescription = function (apiDescription) { return ("* @apiDescription " + apiDescription); };
var apiPermission = function (apiPermission) { return ("* @apiPermission " + apiPermission); };
var apiHeader = function (key, val) { return ("* @apiHeader " + key + " " + val); };
// feat:adds desc
var apiParam = function (type, name, desc) { return ("* @apiParam {" + type + "} " + name + " " + desc); };
var apiParamExample = function (type, desc) { return ("* @apiParamExample {" + type + "} " + desc + ":"); };
var apiSuccess = function (status, type, name, desc) { return ("* @apiSuccess (" + status + ") {" + type + "} " + name + " " + desc); };
var apiSuccessExample = function (type, desc) { return ("* @apiSuccessExample {" + type + "} " + desc + ":"); };
// feat:adds apiError
var apiError = function (status, type, name, desc) { return ("* @apiError (" + status + ") {" + type + "} " + name + " " + desc); };
var apiErrorExample = function (type, desc) { return ("* @apiErrorExample {" + type + "} " + desc + ":"); };
var apiSampleRequest = function (url) { return ("* @apiSampleRequest " + url); };

var objToJsonStr = function (obj) { return '* ' +
  JSON.stringify(obj, null, 2)
    .split('\n')
    .join('\n* '); };

// feat:define and use some block
var apiDefine = function (name, title, desc) { return ("* @apiDefine " + name + " " + title + " " + desc); };
var apiUse = function (name) { return ("* @apiUse " + name); };
// feat:mark an API Method as deprecated
var apiDeprecated = function (text) {
  if ( text === void 0 ) text = '';

  return ("* @apiDeprecated " + text);
};
// feat:a block with @apiIgnore will not be parsed
var apiIgnore = function (text) {
  if ( text === void 0 ) text = '';

  return ("* @apiIgnore " + text);
};
// feat:a block with @apiPrivate will be privated
var apiPrivate = function () { return '* @apiPrivate'; };

// ---------- parser ----------
//
function parser (its) {
  var result = [];
  result.push('/**');
  if (its.ignore && its.ignore()) {
    result.push(apiIgnore(its.ignore()));
  }
  if (its.define && its.define()) {
    result.push(apiDefine.apply(void 0, its.define()));
  }
  if (its.api) {
    result.push(api.apply(void 0, its.api()));
  }
  if (its.name) {
    result.push(apiName(its.name()));
  }
  if (its.group) {
    result.push(apiGroup(its.group()));
  }
  if (its.version) {
    result.push(apiVersion(its.version()));
  }
  if (its.description) {
    result.push(apiDescription(its.description()));
  }
  if (its.permision) {
    result.push(apiPermission(its.permision()));
  }
  if (its.header) {
    var data = its.header();
    Object.keys(data).forEach(function (v) { return result.push(apiHeader(v, data[v])); });
  }
  if (its.sampleRequest) {
    result.push(apiSampleRequest(its.sampleRequest()));
  }
  if (its.paramExample) {
    result.push(apiParamExample.apply(void 0, its.paramExample().slice(0, 2)));
    result.push(objToJsonStr.apply(void 0, its.paramExample().slice(2)));
  }
  if (its.param) {
    its.param().forEach(function (v) {
      result.push(apiParam.apply(void 0, v));
    });
  }
  if (its.success) {
    its.success().forEach(function (v) {
      result.push(apiSuccess.apply(void 0, v));
    });
  }
  if (its.successExample) {
    result.push(apiSuccessExample.apply(void 0, its.successExample().slice(0, 2)));
    result.push(objToJsonStr.apply(void 0, its.successExample().slice(2)));
  }
  // feat:
  if (its.fail) {
    its.fail().forEach(function (v) {
      result.push(apiError.apply(void 0, v));
    });
  }
  if (its.failExample) {
    result.push(apiErrorExample.apply(void 0, its.failExample().slice(0, 2)));
    result.push(objToJsonStr.apply(void 0, its.failExample().slice(2)));
  }
  if (its.use && its.use()) {
    result.push(apiUse(its.use()));
  }
  if (its.deprecated && its.deprecated()) {
    result.push(apiDeprecated(its.deprecated()));
  }
  if (its.private && its.private()) {
    result.push(apiPrivate());
  }
  result.push('*/');
  return result.join('\n');
}

var Apidoc = function Apidoc(docId, data) {
  if ( data === void 0 ) data = null;

  this.id = docId;
  this.__data = data || {};
};
Apidoc.prototype.property = function property (key, val, def) {
    if ( val === void 0 ) val = null;
    if ( def === void 0 ) def = null;

  var hasVal;
  if (val || val === '' || val === 0 || val === false) {
    hasVal = true;
  } else {
    hasVal = false;
  }

  // set when (key,val)
  if (hasVal) {
    this.__data[key] = val;
  }
  // set with default value (key,null,def)
  else if (def) {
    this.__data[key] = def;
  }
  // get when (key)
  else {
    return key in this.__data ? this.__data[key] : null;
  }
  return this;
};
Apidoc.prototype.registerMethod = function registerMethod () {
  var that = this;
  Object.keys(that.__data).forEach(function (key) {
    var thatHasPro = key in that;
    var dataHasKey = key in that.__data;
    if (!thatHasPro && dataHasKey) {
      // register metord
      that[key] = function (val, def) { return that.property(key, val, def); };
      // if (key === 'ignore') console.log(key)
    }
  });
  return that;
};
// after registerMethod(), we can use as below:
// when set:
// (new Apidoc('123')).registerMethod().host('127.0.0.1').port(8080').api('/')
// when get:
// (new Apidoc('123')).registerMethod().host()
Apidoc.prototype.toStr = function toStr () {
  return parser(this);
};

// ---------- index ----------
// this is the index file
// ---------- index ----------
// task:
// 01.pass his
// 02.use his.property and his.registerMethod methord

function writer (his) { return his
    .property('host', '127.0.0.1')
    .property('port', '8080')
    .property('api', ['get', '/backend/admin/list', 'R-get admin list'])
    .property('name', '/api/backend/admin/list')
    .property('group', '/api/backend/admin/list')
    .property('version', '1.0.0')
    .property('description', 'R-get admin list')
    .property('permision', 'none')
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
    .property('ignore', false)
    .property('define', false)
    .property('use', false)
    .property('deprecated', false)
    .property('private', false)
    .registerMethod(); }// next export default his => his.registerMethod();

var doc = writer(new Apidoc());
doc.apidoc = function (name, data) {
	if ( name === void 0 ) name = null;
	if ( data === void 0 ) data = {};

	return new Apidoc(name, data);
};

export default doc;
