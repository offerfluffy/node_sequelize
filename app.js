const express = require("express");
const router = require("./routers");
const ErrorHandlers = require("./middlewares/errors");

const app = express();

const bodyParser = express.json();

app.use(bodyParser);

app.use(router);

app.use(
  ErrorHandlers.sequelizeUniqueConstraintHandler,
  ErrorHandlers.basicHandler
);

module.exports = app;
