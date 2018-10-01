/**
 * write-api-doc v1.0.0
 * (c) 2018 Ye Miancheng
 * @license MIT
 */
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
var objToJsonStr = function (obj) { return "* "+JSON.stringify(obj, null, 2).split("\n").join("\n* "); };

var parser = function (sugar) {
    var result = [];
    result.push('/**');
    if (sugar.api) {
        result.push(api.apply(void 0, sugar.api()));
    }
    if (sugar.name) {
        result.push(apiName(sugar.name()));
    }
    if (sugar.group) {
        result.push(apiGroup(sugar.group()));
    }
    if (sugar.version) {
        result.push(apiVersion(sugar.version()));
    }
    if (sugar.description) {
        result.push(apiDescription(sugar.description()));
    }
    if (sugar.permission) {
        result.push(apiPermission(sugar.permission()));
    }
    if (sugar.header) {
        //console.log(sugar.header())
        result.push(apiHeader(sugar.header()));
    }
    if (sugar.sampleRequest) {
        result.push(apiSampleRequest(sugar.sampleRequest()));
    }
    if (sugar.paramExample) {
        result.push(apiParamExample.apply(void 0, sugar.paramExample().slice(0, 2)));
        result.push(objToJsonStr.apply(void 0, sugar.paramExample().slice(2)));
    }
    if (sugar.param) {
        //console.log(sugar.param())
        sugar.param().forEach(function (v) {
            result.push(apiParam.apply(void 0, v));
        });
    }
    if (sugar.success) {
        sugar.success().forEach(function (v) {
            result.push(apiSuccess.apply(void 0, v));
        });
    }
    if (sugar.successExample) {
        result.push(apiSuccessExample.apply(void 0, sugar.successExample().slice(0, 2)));
        result.push(objToJsonStr.apply(void 0, sugar.successExample().slice(2)));
    }
    if (sugar.failExample) {
        result.push(apiErrorExample.apply(void 0, sugar.failExample().slice(0, 2)));
        result.push(objToJsonStr.apply(void 0, sugar.failExample().slice(2)));
    }
    result.push('*/');
    return result.join('\n')
};

//----make----
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
        //return def
    }
    // get when (key)
    else {
        return (key in this.__data && this.__data[key]) || null
    }
    return this
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
    return that
};
//after registerMethod(), we can use as below:
// when set:
//(new Apidoc('123')).registerMethod().host('127.0.0.1').port(8080').api('/')
// when get:
//(new Apidoc('123')).registerMethod().host()
Apidoc.prototype.toStr = function toStr (){
    return parser(this)
};

var writer = function (sugar) { return sugar.property('host', '127.0.0.1')
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
    .registerMethod(); };

//import __toStr from './parser.js';
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

    return (new Apidoc(name,data));
};

export default doc;
