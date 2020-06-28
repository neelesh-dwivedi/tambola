
//= ========================= Load Modules Start =======================

const gameRoute = require("./game");

//= ========================= Export Module Start ==============================

module.exports = function (app) {
    app.use(`/api/game`, gameRoute);

};

//= ========================= Export Module End ===============================
