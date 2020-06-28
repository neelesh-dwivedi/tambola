//= ========================= Load Modules Start ===========================

//= ========================= Load Internal Module =========================

// Load exceptions
const Exception = require("./model/Exception");

//= ========================= Load Modules End =============================

//= ========================= Export Module Start ==========================

module.exports = {
  intrnlSrvrErr(err) {
    return new Exception(2, "internal Server Error", err);
  },
  gameDoesNotExists(err) {
    return new Exception(2, "Invalid game id", err);
  },
  ticketDoesNotExists(err) {
    return new Exception(2, "Invalid ticket id", err);
  }
};

//= ========================= Export Module End ===========================
