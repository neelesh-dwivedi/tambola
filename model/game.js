// Importing mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  index: {
    type: Number,
    default: 0
  },
  drawSequence: {
    type: Array
  }
});

// Export newsroom module
module.exports = mongoose.model("Game", gameSchema);