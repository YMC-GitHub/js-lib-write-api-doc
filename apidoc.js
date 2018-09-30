//----make----
export default class Apidoc {
    constructor(docId, data = null) {
        this.id = docId
        this.__data = data || {}
    }
    property(key, val = null, def = null) {
        /*
        if (key in this.__data ){
            console.log(`--key:${key}---val:${val}--def:${def}`)
        }
        */
        // set when (key,val)
        if (val || val === '' || val === 0 || val === false) {
            this.__data[key] = val
        }
        // set when (key,null,def)
        else if (def) {
            this.__data[key] = def
            //return def
        }
        // get when (key)
        else {
            return (key in this.__data && this.__data[key]) || null
        }
        return this
    }
    // (new Apidoc('123')).property('host','127.0.0.1').property('port','8080').property('api','/')
    registerMethod() {
        Object.keys(this.__data).forEach(key => {
            if (!(key in this) && this.__data[key]) {
                this[key] = (val, def) => this.property(key, val, def)
            }
        })
        return this
    }
    //after registerMethod(), we can use as below:
    // when set:
    //(new Apidoc('123')).registerMethod().host('127.0.0.1').port(8080').api('/')
    // when get:
    //(new Apidoc('123')).registerMethod().host()
}