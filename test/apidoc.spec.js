import Apidoc from '../Apidoc.js'
//----test----
let doc = (new Apidoc('123'))
//test api-style-01
//set
doc.property('host','127.0.0.1').property('port','8080').property('api','/')
//get
console.log(doc.property('host'))
//test api-style-02
doc.registerMethod()
//set
doc.host('127.0.0.2')
//get
console.log(doc.host())
//or
//console.log(doc.host('127.0.0.2').host())


//-----tips----
//tip 01: return context when setting ,val when getting.
//tip 02: return context when style-01 with param more than 2,val only one.
//tip 03: return context when style-02 with param more than 1,val only zero.
