const api = (method, path, title) => `* @api {${method}} ${path} ${title}`
const apiName = name => `* @apiName ${name}`
const apiGroup = group => `* @apiGroup ${group}`
const apiVersion = apiVersion => `* @apiVersion ${apiVersion}`
const apiDescription = apiDescription => `* @apiDescription ${apiDescription}`
const apiPermission = apiPermission => `* @apiPermission ${apiPermission}`
const apiHeader = (key, val) => `* @apiHeader ${key} ${val}`
const apiSampleRequest = url => `* @apiSampleRequest ${url}`
const apiParamExample = (type, desc) => `* @apiParamExample {${type}} ${desc}:`
const apiParam = (type, name, value) => `* @apiParam {${type}} ${name} ${value}`
const apiSuccess = (status, type, name, desc) => `* @apiSuccess (${status}) {${type}} ${name} ${desc}`
const apiSuccessExample = (type, desc) => `* @apiSuccessExample {${type}} ${desc}:`
const apiErrorExample = (type, desc) => `* @apiErrorExample {${type}} ${desc}:`
const objToJsonStr = obj =>"* "+JSON.stringify(obj, null, 2).split(`\n`).join(`\n* `)
const toStr = apiDocInstance => {
    let result = []
    result.push('/**')
    if (apiDocInstance.api) {
        result.push(api(...apiDocInstance.api()))
    }
    if (apiDocInstance.name) {
        result.push(apiName(apiDocInstance.name()))
    }
    if (apiDocInstance.group) {
        result.push(apiGroup(apiDocInstance.group()))
    }
    if (apiDocInstance.version) {
        result.push(apiVersion(apiDocInstance.version()))
    }
    if (apiDocInstance.description) {
        result.push(apiDescription(apiDocInstance.description()))
    }
    if (apiDocInstance.permission) {
        result.push(apiPermission(apiDocInstance.permission()))
    }
    if (apiDocInstance.header) {
        console.log(apiDocInstance.header())
        result.push(apiHeader(apiDocInstance.header()))
    }
    if (apiDocInstance.sampleRequest) {
        result.push(apiSampleRequest(apiDocInstance.sampleRequest()))
    }
    if (apiDocInstance.paramExample) {
        result.push(apiParamExample(...apiDocInstance.paramExample().slice(0, 2)))
        result.push(objToJsonStr(...apiDocInstance.paramExample().slice(2)))
    }
    if (apiDocInstance.param) {
        //console.log(apiDocInstance.param())
        apiDocInstance.param().forEach(v => {result.push(apiParam(...v))})
    }
    if (apiDocInstance.success) {
        apiDocInstance.success().forEach(v => {result.push(apiSuccess(...v))})
    }
    if (apiDocInstance.successExample) {
        result.push(apiSuccessExample(...apiDocInstance.successExample().slice(0, 2)))
        result.push(objToJsonStr(...apiDocInstance.successExample().slice(2)))
    }
    if (apiDocInstance.failExample) {
        result.push(apiErrorExample(...apiDocInstance.failExample().slice(0, 2)))
        result.push(objToJsonStr(...apiDocInstance.failExample().slice(2)))
    }
    result.push('*/')
    return result.join('\n')
}
exports = {
    api,
    apiName,
    apiGroup,
    apiVersion,
    apiDescription,
    apiPermission,
    apiHeader,
    apiSampleRequest,
    apiParam,
    apiParamExample,
    apiSuccess,
    apiSuccessExample,
    apiErrorExample,
    objToJsonStr,
    toStr
}