// Importing mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  gameId: {
    type: Schema.Types.ObjectId,
    ref: 'Game'
  },
  userName: {
    type: String,
    trim: true
  },
  ticketSequence: {
    type: Array
  }
});

// Export newsroom module
module.exports = mongoose.model("Ticket", ticketSchema);