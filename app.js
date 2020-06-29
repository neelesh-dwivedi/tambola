const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")
const appUtils = require("./utils");
const methodOverride = require("method-override");
const db = require('./config/database')

db.connectDb(err => {
  if (err) return;

const app = express();

// for handling cors error
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true,
}));
// parses application/json bodies
app.use(bodyParser.json());
// use queryString lib to parse urlencoded bodies
// parses application/x-www-form-urlencoded bodies
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === "object" && "_method" in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use((req, res, next) => {
  appUtils.setHeadersForCrossDomainIssues(res);
  next();
});
 // attach the routes to the app
 require("./routes/index")(app);

// wrong url path
 app.use(function (req, res, next) {
    let err = {}
    err.res = false;
    err.status = 404;
    err.message = "Route Not Found"
    res.send(err)
    next(err);
  });

const port = 3000;
app.listen(port, () => console.log("Server Up and Running on port " + port));
})
