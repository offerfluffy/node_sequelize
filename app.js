const express = require("express");
const cors = require("cors");
const router = require("./routers");
const CONSTANS = require("./constant");
const ErrorHandlers = require("./middlewares/errors");

const app = express();

const bodyParser = express.json();

app.use(cors());

app.use(bodyParser);

app.use(express.static(CONSTANS.FILES_PATH));

app.use(router);

app.use(
  ErrorHandlers.sequelizeUniqueConstraintHandler,
  ErrorHandlers.basicHandler
);

module.exports = app;
