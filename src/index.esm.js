import Apidoc from './apidoc.js';
// import __toStr from './parser.js';
import writer from './writer.js';

/*
class Engine extends sugar {
    toStr() {
        let that = this;
        return __toStr(that);
    }
}
*/
const doc = writer(new Apidoc());
doc.apidoc = (name = null, data = {}) => new Apidoc(name, data);
export default doc;
