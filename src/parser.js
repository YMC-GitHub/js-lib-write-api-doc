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
  apiErrorExample,
  objToJsonStr
} from './helper.js';
export default sugar => {
  let result = [];
  result.push('/**');
  if (sugar.api) {
    result.push(api(...sugar.api()));
  }
  if (sugar.name) {
    result.push(apiName(sugar.name()));
  }
  if (sugar.group) {
    result.push(apiGroup(sugar.group()));
  }
  if (sugar.version) {
    result.push(apiVersion(sugar.version()));
  }
  if (sugar.description) {
    result.push(apiDescription(sugar.description()));
  }
  if (sugar.permission) {
    result.push(apiPermission(sugar.permission()));
  }
  if (sugar.header) {
    // console.log(sugar.header())
    result.push(apiHeader(sugar.header()));
  }
  if (sugar.sampleRequest) {
    result.push(apiSampleRequest(sugar.sampleRequest()));
  }
  if (sugar.paramExample) {
    result.push(apiParamExample(...sugar.paramExample().slice(0, 2)));
    result.push(objToJsonStr(...sugar.paramExample().slice(2)));
  }
  if (sugar.param) {
    // console.log(sugar.param())
    sugar.param().forEach(v => {
      result.push(apiParam(...v));
    });
  }
  if (sugar.success) {
    sugar.success().forEach(v => {
      result.push(apiSuccess(...v));
    });
  }
  if (sugar.successExample) {
    result.push(apiSuccessExample(...sugar.successExample().slice(0, 2)));
    result.push(objToJsonStr(...sugar.successExample().slice(2)));
  }
  if (sugar.failExample) {
    result.push(apiErrorExample(...sugar.failExample().slice(0, 2)));
    result.push(objToJsonStr(...sugar.failExample().slice(2)));
  }
  result.push('*/');
  return result.join('\n');
};
