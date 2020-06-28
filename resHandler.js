//= ========================= Load Modules Start ===========================

//= ========================= Load Internal Module=========================

// Load exceptions
const APIResponse = require("./model/APIResponse");
const excep = require("./customExceptions");

//= ========================= Load Modules End =============================

function sendResponse(res, rslt) {
  if (rslt && rslt.error && (rslt.error.errorCode === 1)) { // Internal server error
    return res.send(500, rslt);
  }
  else if (rslt && rslt.error && (rslt.error.errorCode === 2)) { // Un-authorized
    return res.status(401).send(rslt);
  }
  // send status code 200
  return res.status(200).send(rslt);
}


function sendError(res, err) {
  // if error doesn't has sc than it is an unhandled error,
  // log error, and throw intrnl server error
  if (!err.errorCode) {
    console.log("unhandled error = ", err);
    err = excep.intrnlSrvrErr(err);
  }
  const result = new APIResponse(0, err);
  sendResponse(res, result);
}
function hndlError(err, req, res, next) {
  // unhandled error
  sendError(res, err);
}

function sendSuccessWithMsg(res, msg) {
  const rslt = { message: msg };
  const result = new APIResponse(1, rslt);
  sendResponse(res, result);
}

function sendSuccess(res, rslt = {}, message) {
  if (message) {
    rslt.message = message;
  }
  const result = new APIResponse(1, rslt);
  sendResponse(res, result);
}


//= ========================= Exposed Action Start ==========================

module.exports = {
  hndlError, sendError, sendSuccess, sendSuccessWithMsg,
};
