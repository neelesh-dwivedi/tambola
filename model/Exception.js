

//= ========================= Class Definitions Start =====================

class Exception {
  constructor(errorCode, msg, errStackTrace, title) {
    this.errorCode = errorCode;
    this.msg = msg;
    if (errStackTrace) {
      this.err = errStackTrace;
    }
    if (title) {
      this.title = title;
    }
  }
}

//= ========================= Class Definitions End =======================

//= ========================= Export module start ==================================

module.exports = Exception;

//= ========================= Export module end ==================================
