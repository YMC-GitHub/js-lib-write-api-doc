import parser from './parser.js';
export default class Apidoc {
  constructor(docId, data = null) {
    this.id = docId;
    this.__data = data || {};
  }
  property(key, val = null, def = null) {
    let hasVal;
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
  }
  registerMethod() {
    let that = this;
    Object.keys(that.__data).forEach(key => {
      let thatHasPro = key in that;
      let dataHasKey = key in that.__data;
      if (!thatHasPro && dataHasKey) {
        // register metord
        that[key] = (val, def) => that.property(key, val, def);
        // if (key === 'ignore') console.log(key)
      }
    });
    return that;
  }
  // after registerMethod(), we can use as below:
  // when set:
  // (new Apidoc('123')).registerMethod().host('127.0.0.1').port(8080').api('/')
  // when get:
  // (new Apidoc('123')).registerMethod().host()
  toStr() {
    return parser(this);
  }
}
