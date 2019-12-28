import Apidoc from './apidoc.js';
import writer from './writer.js';
const doc = writer(new Apidoc());
doc.apidoc = (name = null, data = {}) => new Apidoc(name, data);
export default doc;
