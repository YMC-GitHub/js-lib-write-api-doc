// ---------- helper ----------
// this is the helper file
// ---------- helper ----------
// tasks:
// 01.some sugar function for apidoc  lib
// 02.make json object to string
// get detail on https://apidocjs.com/#param-api

export const api = (method, path, title) => `* @api {${method}} ${path} ${title}`;
export const apiName = name => `* @apiName ${name}`;
export const apiGroup = group => `* @apiGroup ${group}`;
export const apiVersion = apiVersion => `* @apiVersion ${apiVersion}`;
export const apiDescription = apiDescription => `* @apiDescription ${apiDescription}`;
export const apiPermission = apiPermission => `* @apiPermission ${apiPermission}`;
export const apiHeader = (key, val) => `* @apiHeader ${key} ${val}`;
// feat:adds desc
export const apiParam = (type, name, desc) => `* @apiParam {${type}} ${name} ${desc}`;
export const apiParamExample = (type, desc) => `* @apiParamExample {${type}} ${desc}:`;
export const apiSuccess = (status, type, name, desc) => `* @apiSuccess (${status}) {${type}} ${name} ${desc}`;
export const apiSuccessExample = (type, desc) => `* @apiSuccessExample {${type}} ${desc}:`;
// feat:adds apiError
export const apiError = (status, type, name, desc) => `* @apiError (${status}) {${type}} ${name} ${desc}`;
export const apiErrorExample = (type, desc) => `* @apiErrorExample {${type}} ${desc}:`;
export const apiSampleRequest = url => `* @apiSampleRequest ${url}`;

export const objToJsonStr = obj =>
  '* ' +
  JSON.stringify(obj, null, 2)
    .split('\n')
    .join('\n* ');

// feat:define and use some block
export const apiDefine = (name, title, desc) => `* @apiDefine ${name} ${title} ${desc}`;
export const apiUse = name => `* @apiUse ${name}`;
// feat:mark an API Method as deprecated
export const apiDeprecated = (text = '') => `* @apiDeprecated ${text}`;
// feat:a block with @apiIgnore will not be parsed
export const apiIgnore = (text = '') => `* @apiIgnore ${text}`;
// feat:a block with @apiPrivate will be privated
export const apiPrivate = () => '* @apiPrivate';
