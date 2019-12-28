// ---------- parser ----------
// this is the parser file
// ---------- parser ----------
// tasks:
// 01.include some helper files
// 02.makes apidoc str with engine as his arg

// include some helper files
import {
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
  apiError,
  apiErrorExample,
  apiDefine,
  apiUse,
  apiDeprecated,
  apiIgnore,
  apiPrivate,
  objToJsonStr
} from './helper.js';
//
export default its => {
  let result = [];
  result.push('/**');
  if (its.ignore && its.ignore()) {
    result.push(apiIgnore(its.ignore()));
  }
  if (its.define && its.define()) {
    result.push(apiDefine(...its.define()));
  }
  if (its.api) {
    result.push(api(...its.api()));
  }
  if (its.name) {
    result.push(apiName(its.name()));
  }
  if (its.group) {
    result.push(apiGroup(its.group()));
  }
  if (its.version) {
    result.push(apiVersion(its.version()));
  }
  if (its.description) {
    result.push(apiDescription(its.description()));
  }
  if (its.permision) {
    result.push(apiPermission(its.permision()));
  }
  if (its.header) {
    let data = its.header();
    Object.keys(data).forEach(v => result.push(apiHeader(v, data[v])));
  }
  if (its.sampleRequest) {
    result.push(apiSampleRequest(its.sampleRequest()));
  }
  if (its.paramExample) {
    result.push(apiParamExample(...its.paramExample().slice(0, 2)));
    result.push(objToJsonStr(...its.paramExample().slice(2)));
  }
  if (its.param) {
    its.param().forEach(v => {
      result.push(apiParam(...v));
    });
  }
  if (its.success) {
    its.success().forEach(v => {
      result.push(apiSuccess(...v));
    });
  }
  if (its.successExample) {
    result.push(apiSuccessExample(...its.successExample().slice(0, 2)));
    result.push(objToJsonStr(...its.successExample().slice(2)));
  }
  // feat:
  if (its.fail) {
    its.fail().forEach(v => {
      result.push(apiError(...v));
    });
  }
  if (its.failExample) {
    result.push(apiErrorExample(...its.failExample().slice(0, 2)));
    result.push(objToJsonStr(...its.failExample().slice(2)));
  }
  if (its.use && its.use()) {
    result.push(apiUse(its.use()));
  }
  if (its.deprecated && its.deprecated()) {
    result.push(apiDeprecated(its.deprecated()));
  }
  if (its.private && its.private()) {
    result.push(apiPrivate());
  }
  result.push('*/');
  return result.join('\n');
};
