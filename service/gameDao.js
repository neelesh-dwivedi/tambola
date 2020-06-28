const game = require("../model/game");
const ticket = require("../model/ticket");

// =========================================================================
const createGame = (params) => {
  return game.create(params);
}

const generateTicket = params => {
  return ticket.create(params);
}

const checkGameExists = params => {
  return game.findOne(params);
}

const updateGameIndex = params => {
  return game.findOneAndUpdate({_id: params._id}, {$inc: {index: 1}});
}

const getStatistics = params => {
  return game.aggregate([
    {$match:{_id: params._id}},
    {$lookup: {from: "tickets", as: "tickets", localField: "_id", foreignField:"gameId"}},
    {$unwind: "$tickets"}, 
    {$group:{_id: "$_id", users:{$addToSet:"$tickets.userName"}, index: {$first: "$index"}, tickets: {$addToSet:"$tickets"}}}]);
}

const checkTicketExists = params => {
  return ticket.findOne(params);
}
// ===========================================================================
module.exports = {
  createGame,
  generateTicket,
  checkGameExists,
  updateGameIndex,
  getStatistics,
  checkTicketExists
}