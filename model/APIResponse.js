//= ========================= Class Definitions Start =====================

class APIResponse {
  constructor(sc, result) {
    this.sc = sc;
    if (sc === 1) {
      result ? this.result = result : appConst.EMPTY;
    } else {
      result ? this.error = result : appConst.EMPTY;
    }
    this.time = new Date().getTime();
  }
}

//= ========================= Class Definitions End =======================

//= ========================= Export module start ==================================

module.exports = APIResponse;

//= ========================= Export module end ==================================
