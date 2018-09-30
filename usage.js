/**
 * write apidoc with js like this
 * eg:
 */
import apiDoc from '../apidoc.js'
let apidoc = new apiDoc()
apidoc
.host('127.0.0.1')
.port('8080')
.api('/api/')
.name('backend/admin/login')
.group('backend/admin')
.version('1.0.0')
.desc('backend admin login')
.permision('none')
.header({'Accept-Encoding':'Accept-Encoding: gzip, deflate'})
.param({"acount": 5, "password": 10})
.sucess({code: 200, msg: '登录成功'})
.fail({code:-200, msg:'登录失败'})
.toStr()