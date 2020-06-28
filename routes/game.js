const gameRoute = require("express").Router();
const gameController = require('../controller/gameController')

//= =============================== Load module end =====================
gameRoute.route("/create")
  .post([], gameController.createGame);

gameRoute.route("/:game_id/ticket/:user_name/generate")
  .post([], gameController.generateTicket);

gameRoute.route("/:game_id/number/random")
  .get([], gameController.pickRandomNumber);

gameRoute.route("/:game_id/numbers")
  .get([], gameController.getGeneratedSequence);

gameRoute.route("/:game_id/stats")
  .get([], gameController.getStatistics);

gameRoute.route("/ticket/:ticket_id")
  .get([], gameController.getTicket);

//= =============================== Export route ================================
module.exports = gameRoute;
