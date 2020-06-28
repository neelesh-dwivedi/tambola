const resHndlr = require("../resHandler");
const gameDao = require("../service/gameDao");
const ticketGenerator = require("../service/ticketGenerator");
const mongoose = require("mongoose");
const customException = require("../customExceptions");
const resHandler = require("../resHandler");
//= ========================= Load Modules End ==============================================

const createGame = async (req, res, next) => {
  try {
    const drawSequence = ticketGenerator.getDrawSequence();
    let result = await gameDao.createGame({drawSequence});
    resHndlr.sendSuccess(res, {_id: result._id, message: "Game created successfully"});
  } catch (error) {
    resHndlr.sendError(res, error)
  }
}

const generateTicket = async (req, res, next) => {
  try {
    const checkGameExists = await gameDao.checkGameExists({_id: mongoose.Types.ObjectId(req.params.game_id)});
    console.log()
    if (!checkGameExists) {
      throw customException.gameDoesNotExists();
    }
    const params = {
      ticketSequence: ticketGenerator.generateTicket(),
      userName: req.params.user_name,
      gameId: mongoose.Types.ObjectId(req.params.game_id)
    }
    const result = await gameDao.generateTicket(params);
    resHndlr.sendSuccess(res, {_id: result._id, message: "Ticket generated successfully"});
  } catch (error) {
    resHndlr.sendError(res, error)
  }
}

const pickRandomNumber = async (req, res, next) => {
  try {
    const checkGameExists = await gameDao.checkGameExists({_id: mongoose.Types.ObjectId(req.params.game_id)});
    if (!checkGameExists) {
      throw customException.gameDoesNotExists();
    }
    await gameDao.updateGameIndex({_id: mongoose.Types.ObjectId(req.params.game_id)});
    resHndlr.sendSuccess(res, {randomNumber: checkGameExists.drawSequence[checkGameExists.index]});
  } catch (error) {
    resHndlr.sendError(res, error)
  }
}

const getGeneratedSequence = async (req, res, next) => {
  try {
    const checkGameExists = await gameDao.checkGameExists({_id: mongoose.Types.ObjectId(req.params.game_id)});
    if (!checkGameExists) {
      throw customException.gameDoesNotExists();
    }
    resHandler.sendSuccess(res, {generatedSequence: checkGameExists.drawSequence.slice(0, checkGameExists.index)});
  } catch (error) {
    resHndlr.sendError(res, error);
  }
}

const getStatistics = async (req, res, next) => {
  try {
    const checkGameExists = await gameDao.checkGameExists({_id: mongoose.Types.ObjectId(req.params.game_id)});
    if (!checkGameExists) {
      throw customException.gameDoesNotExists();
    }
    const stats = await gameDao.getStatistics({_id: mongoose.Types.ObjectId(req.params.game_id)});
    const result = {
      totalNumbersDraws: stats[0].index,
      totalUsers: stats[0].users.length,
      totalTickets: stats[0].tickets.length
    }
    resHndlr.sendSuccess(res, result);
  } catch (error) {
    resHndlr.sendError(res, error)
  }
}

const getTicket = async (req, res, next) => {
  try {
    const checkTicketExists = await gameDao.checkTicketExists({_id: mongoose.Types.ObjectId(req.params.ticket_id)});
    if (!checkTicketExists) {
      throw customException.ticketDoesNotExists();
    }
    let ticketHtml = `<!DOCTYPE html><html><head><style>table, td{width: "100%";border: 1px solid black;border-collapse: collapse;}</style></head><body><table>-ticket-</table></body></html>`;
    let row = '<tr>';
    for (let i of checkTicketExists.ticketSequence) {
      for (let j of i) {
        row += `<td>${j}</td>`;
      }
      row += '</tr>';
    }
    ticketHtml = ticketHtml.replace('-ticket-', row);
    resHndlr.sendSuccess(res, {html: ticketHtml});
  } catch (error) {
    resHndlr.sendError(res, error);
  }
}
//= =======================================Export module====================================
module.exports = {
    createGame,
    generateTicket,
    pickRandomNumber,
    getGeneratedSequence,
    getStatistics,
    getTicket
  };
  
  //= ======================================= END ==============================================
  