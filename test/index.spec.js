/**
 * write apidoc with js like this
 * eg:apidoc.host().port().api().name().group().version().desc().permision().header().param().sucess().fail()
 */

// include some file to test
import Doc from '../src/index.js';
// include some lib for test
import chai from 'chai';
// include some data for test
import data from './data';
import fs from 'fs';
import path from 'path';

let expect = chai.expect;
let doc = Doc;

// need to use the style-01 first and register method
Object.keys(data).forEach(v => doc.property(v, data[v]));
doc.registerMethod();
// now you can use the style-02
// Object.keys(data).forEach(v => doc[v](data[v]))

// console.log(doc.toStr());
//fs.writeFileSync(path.join(__dirname, './data-expect.txt'), doc.toStr())

let expectData = fs.readFileSync(path.join(__dirname, './data-expect.txt')).toString();
describe('data', function () {
  it('expect json-format-data to equal apidoc-str-format-data', function () {
    expect(doc.toStr()).to.be.equal(expectData);
  });
});

//create apidoc with engine
doc = Doc.apidoc('hi', data).registerMethod()
describe('pass name and data', function () {
  it('expect json-format-data to equal apidoc-str-format-data', function () {
    expect(doc.id).to.be.equal('hi');
  });
});

let A = Doc.apidoc('hi', null).registerMethod()
describe('pass name', function () {
  it('expect json-format-data to equal apidoc-str-format-data', function () {
    expect(A.toStr()).includes('/**\n*/')
  });
});




