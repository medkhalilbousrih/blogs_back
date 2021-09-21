const logger = require("../logger/logger");

const unknownEndPoint = async (req, res, next) => {
  res.status(404).end();
};

const errorHandler = async (err, req, res, next) => {
  switch (err.name) {
    case "ValidationError":
      res.status(400).end();
      break;
    case "JsonWebTokenError":
      res.status(401).end();
    default:
      res.status(500).end();
  }
  logger.error(err.name, err.message);
};

module.exports = { unknownEndPoint, errorHandler };
