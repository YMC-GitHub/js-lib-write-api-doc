export const api = (method, path, title) => `* @api {${method}} ${path} ${title}`;
export const apiName = name => `* @apiName ${name}`;
export const apiGroup = group => `* @apiGroup ${group}`;
export const apiVersion = apiVersion => `* @apiVersion ${apiVersion}`;
export const apiDescription = apiDescription => `* @apiDescription ${apiDescription}`;
export const apiPermission = apiPermission => `* @apiPermission ${apiPermission}`;
export const apiHeader = (key, val) => `* @apiHeader ${key} ${val}`;
export const apiSampleRequest = url => `* @apiSampleRequest ${url}`;
export const apiParamExample = (type, desc) => `* @apiParamExample {${type}} ${desc}:`;
export const apiParam = (type, name, value) => `* @apiParam {${type}} ${name} ${value}`;
export const apiSuccess = (status, type, name, desc) => `* @apiSuccess (${status}) {${type}} ${name} ${desc}`;
export const apiSuccessExample = (type, desc) => `* @apiSuccessExample {${type}} ${desc}:`;
export const apiErrorExample = (type, desc) => `* @apiErrorExample {${type}} ${desc}:`;
export const objToJsonStr = obj =>
  '* ' +
  JSON.stringify(obj, null, 2)
    .split('\n')
    .join('\n* ');
