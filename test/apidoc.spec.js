/*
require('babel-core/register');
const Apidoc = require('../src/index.js').default


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
*/

// include some file to test
import Apidoc from '../src/apidoc.js';
// include some lib for test
import chai from 'chai';
// include some data for test
import data from './data';
// Object.keys(data).forEach(v => console.log(v))

let expect = chai.expect;
// ----test----
let doc = new Apidoc('some doc');
let __data = Object.assign({}, data);

Object.keys(__data).forEach(v => doc.property(v, __data[v]));

doc.registerMethod();

function shortExpect(key) {
  describe(key, function() {
    it(`expect ${key} to equal ${__data[key]}`, function() {
      expect(doc.property(key)).to.be.equal(__data[key]);
    });
  });
}
function shortexpect2(key) {
  describe(key, function() {
    it(`expect ${key} to equal ${__data[key]}`, function() {
      expect(doc[key]()).to.be.equal(__data[key]);
    });
  });
}

// test api-style-01
describe('api-style-01', function() {
  /*
  short_expect('host')
  short_expect('port')
  short_expect('api')
  */
  Object.keys(__data).forEach(v => shortExpect(v));
});
// test api-style-02
describe('api-style-02', function() {
  /*
  short_expect2('host')
  short_expect2('port')
  */
  Object.keys(__data).forEach(v => shortexpect2(v));
});
// update data and test some branch for coverage
// delete data.define
