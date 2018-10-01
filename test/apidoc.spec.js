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
import Apidoc from '../src/apidoc.js';
import chai from 'chai';

let expect = chai.expect;
//----test----
let doc = (new Apidoc('123'))
//test api-style-01
doc.property('host', '127.0.0.1').property('port', '8080').registerMethod()
describe('api-style-01', function () {
    describe('host', function () {
        it('expect host to be equal 127.0.0.1', function () {
            expect(doc.property('host')).to.be.equal('127.0.0.1');
        });
    });
    describe('port', function () {
        it('expect port to be equal 8080', function () {

            expect(doc.property('port')).to.be.equal('8080');
        });
    });
})
describe('api-style-02', function () {
    describe('host', function () {
        it('expect host to be equal 127.0.0.1', function () {
            expect(doc.host()).to.be.equal('127.0.0.1');
        });
    });
    describe('port', function () {
            it('expect port to be equal 8080', function () {
                    expect(doc.port()).to.be.equal('8080');
            });
    });
})
