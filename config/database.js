

//= ================================== Load Modules start ===================================

//= ================================== Load external modules=================================
const mongoose = require("mongoose");
// Import logger
// plugin bluebird promise in mongoose
mongoose.Promise = require("bluebird");

//= ================================== Load Modules end =====================================


// Connect to Db
function connectDb(callback) {
  const dbName = 'tambola';
  let dbUrl = 'mongodb://mongo:27017/';
  let dbOptions;
    dbOptions = {
    //   user: process.env.MONGODB_USER,
    //   pass: process.env.MONGODB_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true ,
      useFindAndModify: false
    };
    dbUrl += dbName;

  console.log(`connecting to -> ${dbUrl}`);
  mongoose.connect(dbUrl, dbOptions);

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on("connected", () => {
    console.log("connected to DB", dbName, "at", dbUrl);
    callback();
  });

  // If the connection throws an error
  mongoose.connection.on("error", (err) => {
    console.log(`DB connection error: ${err}`);
    callback(err);
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", () => {
    console.log("DB connection disconnected");
    callback("DB connection disconnected");
  });
}

module.exports = {
  connectDb,
};
