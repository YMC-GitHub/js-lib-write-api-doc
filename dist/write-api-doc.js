/**
 * write-api-doc v1.0.5
 * (c) 2018 Ye Miancheng
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['write-api-doc'] = factory());
}(this, function () { 'use strict';

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
  var apiSampleRequest = function (url) { return ("* @apiSampleRequest " + url); };
  var apiParamExample = function (type, desc) { return ("* @apiParamExample {" + type + "} " + desc + ":"); };
  var apiParam = function (type, name, value) { return ("* @apiParam {" + type + "} " + name + " " + value); };
  var apiSuccess = function (status, type, name, desc) { return ("* @apiSuccess (" + status + ") {" + type + "} " + name + " " + desc); };
  var apiSuccessExample = function (type, desc) { return ("* @apiSuccessExample {" + type + "} " + desc + ":"); };
  var apiErrorExample = function (type, desc) { return ("* @apiErrorExample {" + type + "} " + desc + ":"); };
  var objToJsonStr = function (obj) { return '* ' +
    JSON.stringify(obj, null, 2)
      .split('\n')
      .join('\n* '); };

  // ---------- parser ----------
  //
  function parser (its) {
    var result = [];
    result.push('/**');
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
    if (its.permission) {
      result.push(apiPermission(its.permission()));
    }
    if (its.header) {
      // fix:* @apiHeader [object Object] undefined
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
    if (its.failExample) {
      result.push(apiErrorExample.apply(void 0, its.failExample().slice(0, 2)));
      result.push(objToJsonStr.apply(void 0, its.failExample().slice(2)));
    }
    result.push('*/');
    return result.join('\n');
  }

  // ----make----
  var Apidoc = function Apidoc(docId, data) {
    if ( data === void 0 ) data = null;

    this.id = docId;
    this.__data = data || {};
  };
  Apidoc.prototype.property = function property (key, val, def) {
      if ( val === void 0 ) val = null;
      if ( def === void 0 ) def = null;

    /*
        if (key in this.__data ){
            console.log(`--key:${key}---val:${val}--def:${def}`)
        }
        */
    // set when (key,val)
    if (val || val === '' || val === 0 || val === false) {
      this.__data[key] = val;
    }
    // set when (key,null,def)
    else if (def) {
      this.__data[key] = def;
      // return def
    }
    // get when (key)
    else {
      return (key in this.__data && this.__data[key]) || null;
    }
    return this;
  };
  // (new Apidoc('123')).property('host','127.0.0.1').property('port','8080').property('api','/')

  Apidoc.prototype.registerMethod = function registerMethod () {
    /*
        Object.keys(this.__data).forEach(key => {
            if (!(key in this) && this.__data[key]) {
                this[key] = (val, def) => this.property(key, val, def)
            }
        })
        return this
        */
    var that = this;
    Object.keys(that.__data).forEach(function (key) {
      if (!(key in that) && that.__data[key]) {
        that[key] = function (val, def) { return that.property(key, val, def); };
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
      .registerMethod(); }// next export default his => his.registerMethod();

  /*
  class Engine extends sugar {
      toStr() {
          let that = this;
          return __toStr(that);
      }
  }
  */
  var doc = writer(new Apidoc());
  doc.apidoc = function (name, data) {
      if ( name === void 0 ) name = null;
      if ( data === void 0 ) data = {};

      return new Apidoc(name, data);
  };

  return doc;

}));
